<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.');
}

$host = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originHost = $origin !== '' ? strtolower((string) parse_url($origin, PHP_URL_HOST)) : '';
$allowedHosts = ['candicelashandbrows.com', 'www.candicelashandbrows.com'];

if ($originHost !== '' && $originHost !== $host && !in_array($originHost, $allowedHosts, true)) {
    respond(403, false, 'Request origin was not accepted.');
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    respond(400, false, 'Invalid form data.');
}

if (trim((string) ($data['companyWebsite'] ?? '')) !== '') {
    respond(200, true, 'Thank you.');
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'candice-pmu-' . hash('sha256', $clientIp);
$lastRequest = is_file($rateFile) ? (int) file_get_contents($rateFile) : 0;

if ($lastRequest > 0 && time() - $lastRequest < 30) {
    respond(429, false, 'Please wait a moment before sending another form.');
}

@file_put_contents($rateFile, (string) time(), LOCK_EX);

function cleanValue(array $data, string $key, int $maxLength = 300): string
{
    $value = trim((string) ($data[$key] ?? ''));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $maxLength);
}

function escapeTelegram(string $value): string
{
    return htmlspecialchars($value === '' ? 'Not provided' : $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$requiredFields = ['fullName', 'dateOfBirth', 'phone', 'email', 'service', 'previousPmu', 'pregnant', 'bloodThinners', 'keloid', 'recentTreatment', 'typedSignature'];
$values = [];

foreach ($requiredFields as $field) {
    $values[$field] = cleanValue($data, $field);
    if ($values[$field] === '') {
        respond(422, false, 'Please complete every required field.');
    }
}

if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
}

if (!preg_match('/^[0-9+().\-\s]{7,24}$/', $values['phone'])) {
    respond(422, false, 'Please enter a valid phone number.');
}

$allowedServices = ['Powder / Ombre Brows', 'Nano Brows', 'Lip Blush', 'Eyeliner', 'Other'];
if (!in_array($values['service'], $allowedServices, true)) {
    respond(422, false, 'Please select a valid PMU service.');
}

foreach (['previousPmu', 'pregnant', 'bloodThinners', 'keloid', 'recentTreatment'] as $field) {
    if (!in_array($values[$field], ['Yes', 'No'], true)) {
        respond(422, false, 'Please answer every health question.');
    }
}

foreach (['informationAccurate', 'artistReview', 'contactConsent'] as $consent) {
    if (($data[$consent] ?? false) !== true) {
        respond(422, false, 'Please accept every acknowledgment before submitting.');
    }
}

$allergies = cleanValue($data, 'allergies', 800);
$medicalDetails = cleanValue($data, 'medicalDetails', 800);

$configPath = dirname((string) ($_SERVER['DOCUMENT_ROOT'] ?? __DIR__), 1) . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR . 'candice-telegram.php';
$config = is_file($configPath) ? require $configPath : [];
$botToken = is_array($config) ? trim((string) ($config['bot_token'] ?? '')) : '';
$chatId = is_array($config) ? trim((string) ($config['chat_id'] ?? '-5430957270')) : '-5430957270';

if ($botToken === '' || !preg_match('/^\d+:[A-Za-z0-9_-]{20,}$/', $botToken)) {
    respond(503, false, 'The form connection is being configured. Please call the studio for assistance.');
}

$submittedAt = new DateTimeImmutable('now', new DateTimeZone('America/New_York'));
$message = implode("\n", [
    '<b>New PMU Intake Form</b>',
    '<i>' . escapeTelegram($submittedAt->format('M j, Y · g:i A T')) . '</i>',
    '',
    '<b>Client</b>',
    'Name: ' . escapeTelegram($values['fullName']),
    'Date of birth: ' . escapeTelegram($values['dateOfBirth']),
    'Phone: ' . escapeTelegram($values['phone']),
    'Email: ' . escapeTelegram($values['email']),
    'Service: ' . escapeTelegram($values['service']),
    '',
    '<b>Health & treatment history</b>',
    'Previous PMU: ' . escapeTelegram($values['previousPmu']),
    'Pregnant or nursing: ' . escapeTelegram($values['pregnant']),
    'Blood thinners: ' . escapeTelegram($values['bloodThinners']),
    'Keloid scarring: ' . escapeTelegram($values['keloid']),
    'Recent Botox, filler, peel, or laser: ' . escapeTelegram($values['recentTreatment']),
    '',
    '<b>Allergies / sensitivities</b>',
    escapeTelegram($allergies),
    '',
    '<b>Conditions / medications</b>',
    escapeTelegram($medicalDetails),
    '',
    '<b>Acknowledgment name</b>',
    escapeTelegram($values['typedSignature']),
]);

if (!function_exists('curl_init')) {
    respond(503, false, 'The server is missing a required connection module.');
}

$curl = curl_init('https://api.telegram.org/bot' . $botToken . '/sendMessage');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => 'true',
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
]);

$telegramResponse = curl_exec($curl);
$curlError = curl_errno($curl);
$httpStatus = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

$telegramData = is_string($telegramResponse) ? json_decode($telegramResponse, true) : null;
if ($curlError !== 0 || $httpStatus < 200 || $httpStatus >= 300 || !is_array($telegramData) || ($telegramData['ok'] ?? false) !== true) {
    respond(502, false, 'We could not deliver your form. Please try again or call the studio.');
}

respond(200, true, 'Your PMU intake form was sent successfully.');
