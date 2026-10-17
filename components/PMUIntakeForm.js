"use client";

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
  return (
    <div id="pmu-intake" className="relative overflow-hidden bg-[#351A07] text-[#F7EED7]">
      <div className="pointer-events-none absolute -left-40 top-20 h-[430px] w-[430px] rounded-full bg-[#DAA755]/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-36 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DAA755]">
              <span className="service-ornament-line" aria-hidden="true" />
              PMU client intake
            </div>
            <h2 className="mt-6 font-forum text-[45px] leading-[0.98] sm:text-[58px] lg:text-[66px]">
              Let us prepare for
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

          <form className="rounded-[30px] border border-white/12 bg-[#261005]/78 p-5 shadow-[0_28px_80px_rgba(12,5,1,0.28)] sm:p-8 lg:p-10" onSubmit={(event) => event.preventDefault()}>
            <fieldset>
              <legend className="font-forum text-[29px] text-[#FFF9EB]">Your information</legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className={`${labelClass} sm:col-span-2`}>
                  Full name <span aria-hidden="true">*</span>
                  <input className={inputClass} type="text" name="fullName" autoComplete="name" required placeholder="Your full name" />
                </label>
                <label className={labelClass}>
                  Date of birth <span aria-hidden="true">*</span>
                  <input className={inputClass} type="date" name="dateOfBirth" autoComplete="bday" required />
                </label>
                <label className={labelClass}>
                  Phone number <span aria-hidden="true">*</span>
                  <input className={inputClass} type="tel" name="phone" autoComplete="tel" required placeholder="(000) 000-0000" />
                </label>
                <label className={labelClass}>
                  Email address <span aria-hidden="true">*</span>
                  <input className={inputClass} type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
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
                  Allergies or skin sensitivities
                  <textarea className={`${inputClass} min-h-28 resize-y`} name="allergies" placeholder="List any allergies, sensitivities, or reactions. Write None if not applicable." />
                </label>
                <label className={labelClass}>
                  Medical conditions and current medications
                  <textarea className={`${inputClass} min-h-28 resize-y`} name="medicalDetails" placeholder="Include relevant medical conditions, medications, or anything your artist should know." />
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
                <input className={inputClass} type="text" name="typedSignature" required placeholder="Full legal name" />
              </label>
            </fieldset>

            <div className="mt-8 rounded-[20px] border border-[#E9C579]/25 bg-[#E9C579]/[0.08] p-5">
              <button type="submit" disabled className="flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#E9C579]/45 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#351A07]/70" aria-describedby="telegram-pending">
                Submit form — Telegram setup pending
              </button>
              <p id="telegram-pending" className="mt-3 text-center text-[12px] leading-5 text-[#F7EED7]/50">
                The form layout is ready. Submission will be enabled after the private Telegram bot is connected.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
