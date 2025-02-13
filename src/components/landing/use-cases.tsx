import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Globe, Pencil, Code, Music, Heart } from "lucide-react";
import { Button } from "../ui/button";

const useCases = [
  {
    icon: Github,
    title: "Open Source Projects",
    description:
      "Add a sponsor button to your GitHub repos and get funded for your work.",
    example: "Perfect for: Library maintainers, tool creators",
    gradient: "from-github to-github/60",
    delay: 0,
    demoLink: "soljar.xyz/demo/opensource",
  },
  {
    icon: Globe,
    title: "Content Creators",
    description: "Embed tip buttons in your blog, newsletter, or social media.",
    example: "Perfect for: Writers, streamers, educators",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1,
    demoLink: "soljar.xyz/demo/creator",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description: "Monetize your APIs, services, and developer tools.",
    example: "Perfect for: API providers, tool developers",
    gradient: "from-violet-500 to-purple-500",
    delay: 0.2,
    demoLink: "soljar.xyz/demo/devtools",
  },
  {
    icon: Music,
    title: "Artists & Musicians",
    description: "Accept tips during live streams or for digital content.",
    example: "Perfect for: Musicians, digital artists",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.3,
    demoLink: "soljar.xyz/demo/artist",
  },
  {
    icon: Heart,
    title: "Non-Profits",
    description: "Collect donations transparently and without middlemen.",
    example: "Perfect for: Charities, community projects",
    gradient: "from-red-500 to-orange-500",
    delay: 0.4,
    demoLink: "soljar.xyz/demo/nonprofit",
  },
  {
    icon: Pencil,
    title: "Writers & Journalists",
    description: "Get paid directly by readers for your articles.",
    example: "Perfect for: Journalists, newsletter writers",
    gradient: "from-emerald-500 to-green-500",
    delay: 0.5,
    demoLink: "soljar.xyz/demo/writer",
  },
];

export function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
            Who Uses Soljar?
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover how different creators monetize their work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: useCase.delay }}
              style={{ y }}
              className="group relative"
            >
              {/* Card with hover effects */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-accent-purple/10 rounded-xl p-6 h-full transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:border-accent-purple/20">
                <div className="flex flex-col space-y-4">
                  {/* Icon with gradient background */}
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${useCase.gradient} opacity-20 blur`}
                    />
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="relative p-3 rounded-lg bg-card/50 w-fit"
                    >
                      <useCase.icon className="w-6 h-6" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                  <p className="text-sm text-muted-foreground/80 italic">
                    {useCase.example}
                  </p>

                  {/* Interactive demo button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto pt-4"
                  >
                    <Button
                      variant="ghost"
                      className="w-full bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple"
                    >
                      View Example
                    </Button>
                  </motion.div>

                  {/* Decorative gradient line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
