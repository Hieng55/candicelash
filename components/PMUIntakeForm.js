"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-[16px] border border-[#E9C579]/20 bg-white/[0.07] px-4 py-3.5 text-[15px] text-[#FFF9EB] outline-none transition placeholder:text-[#F7EED7]/32 focus:border-[#E9C579]/65 focus:bg-white/[0.1] focus:ring-2 focus:ring-[#E9C579]/10";

const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E9C579]";

const yesNoQuestions = [
  ["previousPmu", "Have you had permanent makeup before?"],
  ["pregnant", "Are you pregnant or nursing?"],
  ["bloodThinners", "Are you currently taking blood thinners?"],
  ["keloid", "Do you have a history of keloid scarring?"],
  ["recentTreatment", "Have you had Botox, fillers, peels, or laser treatment recently?"],
];

const isValidUsDate = (value) => {
  const match = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/.exec(value);
  if (!match) return false;

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && date <= today;
};

const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length >= 5) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const getDateError = (value, requireComplete = false) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length >= 2) {
    const month = Number(digits.slice(0, 2));
    if (month < 1 || month > 12) return "Month must be between 01 and 12.";
  }

  if (digits.length >= 4) {
    const month = Number(digits.slice(0, 2));
    const day = Number(digits.slice(2, 4));
    const daysInMonth = new Date(2024, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return "Enter a valid day for this month.";
  }

  if (requireComplete && digits.length !== 8) return "Enter all 8 digits in MM/DD/YYYY format.";
  if (digits.length === 8 && !isValidUsDate(formatDateInput(digits))) return "Enter a valid date that is not in the future.";
  return "";
};

const formatPhoneInput = (value) => {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const getPhoneError = (value, requireComplete = false) => {
  const digits = value.replace(/\D/g, "");
  if ((requireComplete || digits.length >= 10) && digits.length !== 10) return "Enter a 10-digit phone number.";
  return "";
};

const invalidInputClass = "border-[#FF8F80] focus:border-[#FF8F80] focus:ring-[#FF8F80]/15";

function YesNoQuestion({ name, question }) {
  return (
    <fieldset className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
      <legend className="px-1 text-[14px] leading-6 text-[#F7EED7]/76">{question}</legend>
      <div className="mt-3 flex gap-5">
        {["Yes", "No"].map((answer) => (
          <label key={answer} className="flex cursor-pointer items-center gap-2 text-[14px] text-[#F7EED7]/70">
            <input
              type="radio"
              name={name}
              value={answer}
              required
              className="h-4 w-4 accent-[#DAA755]"
            />
            {answer}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function PMUIntakeForm() {
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const updateFieldError = (name, message) => {
    setFieldErrors((current) => ({ ...current, [name]: message }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const dateOfBirthInput = form.elements.namedItem("dateOfBirth");
    const phoneInput = form.elements.namedItem("phone");
    const dateError = dateOfBirthInput instanceof HTMLInputElement ? getDateError(dateOfBirthInput.value, true) : "";
    const phoneError = phoneInput instanceof HTMLInputElement ? getPhoneError(phoneInput.value, true) : "";

    updateFieldError("dateOfBirth", dateError);
    updateFieldError("phone", phoneError);

    if (dateError && dateOfBirthInput instanceof HTMLInputElement) {
      dateOfBirthInput.setCustomValidity(dateError);
      dateOfBirthInput.reportValidity();
      return;
    }

    if (phoneError && phoneInput instanceof HTMLInputElement) {
      phoneInput.setCustomValidity(phoneError);
      phoneInput.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload.informationAccurate = formData.has("informationAccurate");
    payload.artistReview = formData.has("artistReview");
    payload.contactConsent = formData.has("contactConsent");

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/pmu-intake.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Your form could not be sent. Please try again.");
      }

      form.reset();
      setFieldErrors({});
      setSubmitState("success");
      setSubmitMessage("Thank you. Your PMU intake form was sent to Candice Beauty Studio.");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error.message || "Your form could not be sent. Please try again or call the studio.");
    }
  };

  return (
    <div id="pmu-intake" className="relative overflow-hidden bg-[#351A07] text-[#F7EED7]">
      <div className="pointer-events-none absolute -left-40 top-20 h-[430px] w-[430px] rounded-full bg-[#DAA755]/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-36 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DAA755]">
              <span className="service-ornament-line" aria-hidden="true" />
              PMU client intake
            </div>
            <h2 className="mt-6 font-forum text-[45px] leading-[0.98] sm:text-[58px] lg:text-[66px]">
              Let me prepare for
              <span className="mt-2 block italic text-[#E9C579]">your best result.</span>
            </h2>
            <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-[#F7EED7]/62">
              Complete this form before your permanent makeup appointment. Your answers help your artist review suitability, sensitivities, and service preferences.
            </p>

            <div className="mt-8 rounded-[22px] border border-[#E9C579]/20 bg-[#E9C579]/[0.07] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E9C579]">Before you begin</p>
              <p className="mt-3 text-[14px] leading-6 text-[#F7EED7]/64">
                Please answer every required question honestly. Your artist may contact you if more information is needed before confirming treatment.
              </p>
            </div>
          </div>

          <form className="rounded-[30px] border border-white/12 bg-[#261005]/78 p-5 shadow-[0_28px_80px_rgba(12,5,1,0.28)] sm:p-8 lg:p-10" onSubmit={handleSubmit}>
            <fieldset>
              <legend className="font-forum text-[29px] text-[#FFF9EB]">Your information</legend>
              <p className="mt-2 text-[12px] text-[#F7EED7]/48"><span className="text-[#E9C579]">*</span> Required field</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className={`${labelClass} sm:col-span-2`}>
                  Full name <span aria-hidden="true">*</span>
                  <input className={inputClass} type="text" name="fullName" autoComplete="name" required minLength={2} maxLength={120} placeholder="Your full name" />
                </label>
                <label className={labelClass}>
                  Date of birth (MM/DD/YYYY) <span aria-hidden="true">*</span>
                  <input
                    className={`${inputClass} ${fieldErrors.dateOfBirth ? invalidInputClass : ""}`}
                    type="text"
                    name="dateOfBirth"
                    autoComplete="bday"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                    placeholder="MM/DD/YYYY"
                    title="Enter the date as MM/DD/YYYY, for example 04/25/1995."
                    aria-invalid={Boolean(fieldErrors.dateOfBirth)}
                    aria-describedby={fieldErrors.dateOfBirth ? "dateOfBirth-error" : undefined}
                    onInput={(event) => {
                      const input = event.currentTarget;
                      input.value = formatDateInput(input.value);
                      const error = getDateError(input.value);
                      input.setCustomValidity(error);
                      updateFieldError("dateOfBirth", error);
                    }}
                    onBlur={(event) => {
                      const error = getDateError(event.currentTarget.value, true);
                      event.currentTarget.setCustomValidity(error);
                      updateFieldError("dateOfBirth", error);
                    }}
                  />
                  {fieldErrors.dateOfBirth && <span id="dateOfBirth-error" role="alert" className="mt-2 block text-[12px] normal-case tracking-normal text-[#FFB4A8]">{fieldErrors.dateOfBirth}</span>}
                </label>
                <label className={labelClass}>
                  Phone number <span aria-hidden="true">*</span>
                  <input
                    className={`${inputClass} ${fieldErrors.phone ? invalidInputClass : ""}`}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    required
                    maxLength={14}
                    placeholder="(000) 000-0000"
                    title="Enter a 10-digit phone number."
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    onInput={(event) => {
                      const input = event.currentTarget;
                      input.value = formatPhoneInput(input.value);
                      const error = getPhoneError(input.value);
                      input.setCustomValidity(error);
                      updateFieldError("phone", error);
                    }}
                    onBlur={(event) => {
                      const error = getPhoneError(event.currentTarget.value, true);
                      event.currentTarget.setCustomValidity(error);
                      updateFieldError("phone", error);
                    }}
                  />
                  {fieldErrors.phone && <span id="phone-error" role="alert" className="mt-2 block text-[12px] normal-case tracking-normal text-[#FFB4A8]">{fieldErrors.phone}</span>}
                </label>
                <label className={labelClass}>
                  Email address <span aria-hidden="true">*</span>
                  <input className={inputClass} type="email" name="email" autoComplete="email" required maxLength={180} placeholder="you@example.com" />
                </label>
                <label className={labelClass}>
                  PMU service <span aria-hidden="true">*</span>
                  <select className={inputClass} name="service" required defaultValue="">
                    <option value="" disabled className="text-[#462506]">Select a service</option>
                    <option value="Powder / Ombre Brows" className="text-[#462506]">Powder / Ombre Brows</option>
                    <option value="Nano Brows" className="text-[#462506]">Nano Brows</option>
                    <option value="Lip Blush" className="text-[#462506]">Lip Blush</option>
                    <option value="Eyeliner" className="text-[#462506]">Eyeliner</option>
                    <option value="Other" className="text-[#462506]">Other / Consultation</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-10 border-t border-white/10 pt-9">
              <legend className="font-forum text-[29px] text-[#FFF9EB]">Health & treatment history</legend>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {yesNoQuestions.map(([name, question], index) => (
                  <div key={name} className={index === yesNoQuestions.length - 1 ? "sm:col-span-2" : ""}>
                    <YesNoQuestion name={name} question={question} />
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-5">
                <label className={labelClass}>
                  Allergies or skin sensitivities <span aria-hidden="true">*</span>
                  <textarea className={`${inputClass} min-h-28 resize-y`} name="allergies" required minLength={2} maxLength={800} placeholder="List any allergies, sensitivities, or reactions. Write None if not applicable." />
                </label>
                <label className={labelClass}>
                  Medical conditions and current medications <span aria-hidden="true">*</span>
                  <textarea className={`${inputClass} min-h-28 resize-y`} name="medicalDetails" required minLength={2} maxLength={800} placeholder="Include relevant conditions and medications. Write None if not applicable." />
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-10 border-t border-white/10 pt-9">
              <legend className="font-forum text-[29px] text-[#FFF9EB]">Acknowledgment</legend>
              <div className="mt-6 space-y-4">
                <label className="flex cursor-pointer items-start gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 text-[14px] leading-6 text-[#F7EED7]/70">
                  <input type="checkbox" name="informationAccurate" required className="mt-1 h-4 w-4 shrink-0 accent-[#DAA755]" />
                  <span>I confirm that the information provided is complete and accurate to the best of my knowledge.</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 text-[14px] leading-6 text-[#F7EED7]/70">
                  <input type="checkbox" name="artistReview" required className="mt-1 h-4 w-4 shrink-0 accent-[#DAA755]" />
                  <span>I understand that my artist may request more information, postpone, or decline treatment when necessary for safety.</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 text-[14px] leading-6 text-[#F7EED7]/70">
                  <input type="checkbox" name="contactConsent" required className="mt-1 h-4 w-4 shrink-0 accent-[#DAA755]" />
                  <span>I agree that Candice Beauty Studio may contact me regarding this intake form and my appointment.</span>
                </label>
              </div>

              <label className={`${labelClass} mt-6`}>
                Type your full name as acknowledgment <span aria-hidden="true">*</span>
                <input className={inputClass} type="text" name="typedSignature" required minLength={2} maxLength={120} placeholder="Full legal name" />
              </label>
            </fieldset>

            <div className="mt-8 rounded-[20px] border border-[#E9C579]/25 bg-[#E9C579]/[0.08] p-5">
              <button type="submit" disabled={submitState === "submitting"} className="flex w-full items-center justify-center rounded-full bg-[#E9C579] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#351A07] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F1DEA8] disabled:cursor-wait disabled:opacity-55 disabled:hover:translate-y-0" aria-describedby="pmu-submit-status">
                {submitState === "submitting" ? "Sending securely…" : "Submit PMU intake form"}
              </button>
              <p id="pmu-submit-status" role="status" aria-live="polite" className={`mt-3 text-center text-[12px] leading-5 ${submitState === "error" ? "text-[#FFB4A8]" : submitState === "success" ? "text-[#F1DEA8]" : "text-[#F7EED7]/50"}`}>
                {submitMessage || "Your answers will be sent directly to Candice Beauty Studio."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
