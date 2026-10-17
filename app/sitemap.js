const siteUrl = "https://candicelashandbrows.com";

export const dynamic = "force-static";

const pages = [
  ["", "weekly", 1],
  ["/about/", "monthly", 0.8],
  ["/services/", "weekly", 0.9],
  ["/gallery/", "weekly", 0.8],
  ["/reviews/", "monthly", 0.7],
  ["/contact/", "monthly", 0.8],
];

export default function sitemap() {
  return pages.map(([path, changeFrequency, priority]) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
