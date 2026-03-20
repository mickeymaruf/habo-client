import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";

const faqData = [
  {
    question: "What is Habo?",
    answer:
      'Habo is a minimalist productivity timer based on the Pomodoro Technique. It\'s designed to help you focus on deep work while ensuring you take the necessary rest to prevent "productivity burnout."',
  },
  {
    question: "How do I use the timer?",
    answer:
      "Simply set your work interval (typically 25 minutes) and your break time. Start the session and focus on a single task until the chime sounds.",
  },
  {
    question: "Is Habo free to use?",
    answer:
      "Yes, Habo offers a comprehensive free tier for individual users, with optional premium features for advanced tracking.",
  },
  {
    question: "Does the app work offline?",
    answer:
      "Absolutely. Once downloaded, the core timer functionality works without an internet connection so you can stay focused anywhere.",
  },
];

export default function FAQSection() {
  return (
    <section className="min-h-screen">
      <div className="bg-linear-to-b from-white to-[#CBEFFD] p-6 pt-0">
        <div className="mx-auto mt-10 w-full max-w-4xl rounded-b-[40px] bg-white p-12 shadow-blue-100">
          {/* Header Section */}
          <div className="mb-12 flex flex-col items-center">
            <span className="mb-6 flex items-center gap-2 rounded-full bg-[#f0f9ff] px-3 py-2 text-sm font-bold text-blue-700">
              <img
                className="w-5"
                src="https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f4ac.svg"
                alt=""
              />
              F.A.Q
            </span>
            <h2 className="text-center text-3xl font-bold text-[#111827] md:text-4xl">
              Always ready to support you
            </h2>
          </div>

          {/* Accordion Section */}
          <Accordion type="single" collapsible className="border-none">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="data-open:bg-muted/0"
              >
                <AccordionTrigger className="cursor-pointer py-6 font-semibold text-black transition-all hover:no-underline md:text-[18px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-10 overflow-hidden bg-linear-to-b from-[#CBEFFD] to-[#B9E8FA]">
        {/* Left Image */}
        <div className="w-[500px] shrink-0">
          <img
            src="/Gemini_Generated_Image_vfr5j3vfr5j3vfr5.png"
            alt=""
            className="w-full object-contain"
          />
        </div>

        {/* --- Floating CTA Content --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-20 text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Ready to start?
          </h2>
          <p className="mb-8 max-w-md font-medium text-slate-700">
            Join Habo today and start building the habits <br /> that lead to a
            better life.
          </p>
          <Button className="border-0 px-8 py-6 text-lg text-white shadow-sm">
            Get Started Now
          </Button>
        </div>

        {/* Right Image */}
        <div className="w-[500px] shrink-0">
          <img
            src="/Gemini_Generated_Image_gukusagukusaguku.png"
            alt=""
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
