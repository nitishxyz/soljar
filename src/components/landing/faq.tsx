import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does Soljar work?",
    answer:
      "Soljar creates an on-chain treasury linked to your Solana wallet. Share your unique payment link anywhere, and customers or supporters can send SOL, USDC, or USDT directly to your treasury. Access and withdraw your funds anytime with the wallet that created the treasury.",
  },
  {
    question: "What are the fees?",
    answer:
      "Soljar itself is free to use. Users only pay standard Solana network fees for creating the on-chain treasury account and transactions. These are one-time fees for account creation and minimal transaction fees (typically < $0.01), far lower than traditional payment processors.",
  },
  {
    question: "Is it secure?",
    answer:
      "Yes! Soljar is 100% on-chain and non-custodial. Your funds are stored in a secure on-chain treasury that only you can access with the wallet that created it. All transactions are powered by secure Solana smart contracts.",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "Soljar works with all major Solana wallets including Phantom, Solflare, and Glow. Connect your preferred wallet to create your treasury and manage your funds.",
  },
  {
    question: "What can I use Soljar for?",
    answer:
      "Soljar can be used for a wide range of payment scenarios: online businesses accepting crypto payments, freelancers receiving compensation, content creators collecting tips, non-profits processing donations, and more. Our flexible platform adapts to various payment needs.",
  },
  {
    question: "Can I convert my crypto to USD?",
    answer:
      "We're working on an off-ramp feature that will allow direct conversion of USDC and USDT to your bank account. This feature is expected to launch in Q2 2025. This will make it even easier for businesses and creators to manage their earnings.",
  },
  {
    question: "What currencies are supported?",
    answer:
      "Soljar currently supports SOL, USDC, and USDT. All funds are stored securely in your on-chain treasury until you withdraw them. We're planning to add support for more SPL tokens in the future.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isOpen ? "rgba(124, 58, 237, 0.05)" : "transparent",
      }}
      className="border border-accent-purple/10 rounded-lg overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium">{question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-6 pb-4 text-muted-foreground">{answer}</div>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, transparent 70%)",
          opacity,
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent pb-[2px]">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Soljar
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-4" style={{ y }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
