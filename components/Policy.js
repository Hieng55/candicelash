const pmuPreCare = [
  "No alcohol for 24 hours before your appointment.",
  "Limit caffeine on the day of your appointment.",
  "Avoid tanning, sunburn, and harsh skincare products around the brow area.",
  "Avoid waxing, threading, or exfoliating the treatment area for 1 week.",
  "Arrive with clean skin and no brow makeup.",
  "Eat a meal and stay hydrated before your appointment.",
  "Inform your artist of any allergies, medical conditions, medications, or previous PMU.",
  "Please reschedule if you have an active infection, open wounds, or irritation in the treatment area.",
];

const lashPreCare = [
  "Arrive with clean lashes, free of makeup and mascara.",
  "Avoid using oil-based products around your eyes before your appointment.",
  "Do not curl your lashes before your appointment.",
  "Avoid caffeine if it makes your eyes flutter or feel restless.",
  "Remove contact lenses before your appointment.",
  "Please inform your artist of any eye irritation, allergies, or recent eye infections.",
  "Please arrive on time to ensure your full appointment time.",
];

const lashAfterCare = [
  "Keep your lashes dry for the first 24 hours, following your artist's adhesive guidelines.",
  "Clean your lashes daily with a lash-safe cleanser.",
  "Brush your lashes gently with a clean spoolie.",
  "Avoid rubbing, pulling, or picking at your lashes.",
  "Avoid using mascara or an eyelash curler on extensions.",
  "Sleep on your back when possible to prevent lashes from rubbing against your pillow.",
  "Schedule your refill every 2–3 weeks to maintain a full set.",
];

function PolicyList({ items }) {
  return (
    <ul className="mt-5 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-7 text-[#462506]/75">
          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#DAA755]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PolicyHeading({ number, eyebrow, title }) {
  return (
    <div className="border-b border-[#9F6920]/18 pb-7">
      <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9F6920]">
        <span>{number}</span>
        <span className="h-px w-10 bg-[#DAA755]" aria-hidden="true" />
        {eyebrow}
      </div>
      <h3 className="mt-4 font-forum text-[36px] leading-none text-[#462506] sm:text-[42px]">{title}</h3>
    </div>
  );
}

export default function Policy() {
  return (
    <section id="policy" className="relative overflow-hidden bg-[#F7EED7] py-20 text-[#462506] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-36 top-12 h-96 w-96 rounded-full bg-[#DAA755]/10 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[430px] w-[430px] rounded-full bg-white/70 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9F6920]">
            <span className="luxury-line luxury-line-left max-w-14" aria-hidden="true" />
            Before your appointment
            <span className="luxury-line luxury-line-right max-w-14" aria-hidden="true" />
          </div>
          <h2 className="mt-6 font-forum text-[46px] leading-[0.98] sm:text-[60px] lg:text-[72px]">
            Care that protects
            <span className="mt-2 block italic text-[#9F6920]">your beautiful results.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[650px] text-[15px] leading-7 text-[#462506]/68 sm:text-[16px]">
            Please review the guidance for your selected service before arriving. Thoughtful preparation helps us create the best possible result for you.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-7">
          <article className="rounded-[30px] border border-[#9F6920]/18 bg-white/65 p-6 shadow-[0_22px_60px_rgba(70,37,6,0.08)] sm:p-9 lg:p-10">
            <PolicyHeading number="01" eyebrow="Permanent makeup" title="PMU pre-care policy" />
            <PolicyList items={pmuPreCare} />
            <div className="mt-8 rounded-[20px] border border-[#DAA755]/24 bg-[#F1DEA8]/38 p-5 text-[14px] leading-6 text-[#462506]/75">
              <strong className="font-semibold text-[#462506]">Important:</strong> Do not stop prescribed medications without consulting your healthcare provider.
            </div>
          </article>

          <article className="rounded-[30px] border border-[#9F6920]/18 bg-white/65 p-6 shadow-[0_22px_60px_rgba(70,37,6,0.08)] sm:p-9 lg:p-10">
            <PolicyHeading number="02" eyebrow="Lash extensions" title="Lash care policy" />

            <div className="mt-7">
              <h4 className="font-forum text-[25px] text-[#9F6920]">Before your appointment</h4>
              <PolicyList items={lashPreCare} />
            </div>

            <div className="mt-9 border-t border-[#9F6920]/18 pt-8">
              <h4 className="font-forum text-[25px] text-[#9F6920]">After your appointment</h4>
              <PolicyList items={lashAfterCare} />
            </div>

            <div className="mt-8 rounded-[20px] border border-[#DAA755]/24 bg-[#F1DEA8]/38 p-5 text-[14px] leading-6 text-[#462506]/75">
              <strong className="font-semibold text-[#462506]">Important:</strong> If you experience persistent redness, swelling, pain, or unusual discharge, seek medical advice promptly.
            </div>
          </article>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[26px] bg-[#351A07] px-6 py-7 text-center text-[#F7EED7] sm:flex-row sm:px-8 sm:text-left">
          <div>
            <p className="font-forum text-[26px]">Still have a question?</p>
            <p className="mt-1 text-[14px] text-[#F7EED7]/62">Contact Candice before your appointment and we will be happy to help.</p>
          </div>
          <a href="tel:+14026863390" className="shrink-0 rounded-full border border-[#E9C579]/45 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E9C579] transition-colors hover:bg-[#E9C579] hover:text-[#351A07]">
            Call (402) 686-3390
          </a>
        </div>
      </div>
    </section>
  );
}
