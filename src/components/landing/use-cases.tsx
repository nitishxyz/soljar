import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Code2,
  Palette,
  Users,
  Webhook,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: Globe,
    title: "Content Creators & Streamers",
    description:
      "Accept instant tips during streams and monetize your content seamlessly.",
    features: [
      "Supporter tracking",
      "Multiple currency support",
      "Customizable tip buttons",
      "Stream overlay integration",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Code2,
    title: "Open Source Developers",
    description:
      "Add sustainable funding to your GitHub repositories and track sponsors.",
    features: [
      "README.md integration",
      "Sponsor tracking",
      "Automated distributions",
      "Transparent funding",
    ],
    gradient: "from-github to-github/60",
  },
  {
    icon: Palette,
    title: "Digital Artists & NFT Creators",
    description:
      "Accept commissions and project funding in multiple currencies.",
    features: [
      "Customizable tip buttons",
      "Project funding",
      "Gallery tip buttons",
      "Royalty tracking",
    ],
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Community Projects",
    description: "Manage community funding with complete transparency.",
    features: [
      "Treasury management",
      "Transparent funding",
      "Contributor list",
      "Community analytics",
    ],
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Non-Profit Organizations",
    description: "Manage donations and track supporter contributions.",
    features: [
      "Donation tracking",
      "Supporter list",
      "Easy fundraising",
      "Customizable tip buttons",
    ],
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: GraduationCap,
    title: "Web3 Educators",
    description: "Process payments for courses and workshops with ease.",
    features: [
      "Course payments",
      "Workshop funding",
      "Resource monetization",
      "Student support",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
];

export function UseCases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const [dragStart, setDragStart] = useState(0);
  const DRAG_THRESHOLD = 50; // Minimum drag distance to trigger slide change
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  const [direction, setDirection] = useState("right");

  // Auto advance slides
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const handleDragStart = (event: PointerEvent, info: PanInfo) => {
    setDragStart(info.point.x);
    // Pause autoplay while dragging
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    const dragDistance = info.point.x - dragStart;
    const dragThresholdMet = Math.abs(dragDistance) > DRAG_THRESHOLD;

    if (dragThresholdMet) {
      if (dragDistance > 0) {
        setDirection("left");
        prevSlide();
      } else {
        setDirection("right");
        nextSlide();
      }
    }

    // Resume autoplay
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  return (
    <section
      className="py-24 relative overflow-hidden min-h-screen flex items-center"
      ref={containerRef}
    >
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
            Who Uses Soljar?
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover how different creators monetize their work
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 rounded-full bg-card/50 backdrop-blur-sm border border-accent-purple/10 hover:border-accent-purple/20 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 rounded-full bg-card/50 backdrop-blur-sm border border-accent-purple/10 hover:border-accent-purple/20 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[500px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction === "right" ? 300 : -300,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: direction === "right" ? -300 : 300,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 cursor-grab active:cursor-grabbing"
              >
                <div className="w-full max-w-4xl">
                  <div className="bg-card/50 backdrop-blur-sm border border-accent-purple/10 rounded-2xl relative overflow-hidden group hover:border-accent-purple/20 transition-all duration-300">
                    <div
                      className={cn(
                        "absolute inset-0 opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20",
                        `bg-gradient-to-r ${useCases[currentIndex].gradient}`
                      )}
                    />

                    <div className="relative z-10 p-6 sm:p-8 md:p-12">
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl mb-6 md:mb-8",
                          `bg-gradient-to-r ${useCases[currentIndex].gradient}`
                        )}
                      >
                        {(() => {
                          const Icon = useCases[currentIndex].icon;
                          return (
                            <Icon className="w-full h-full p-4 sm:p-5 md:p-6 text-white" />
                          );
                        })()}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                        {useCases[currentIndex].title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 mb-8 md:mb-12 leading-relaxed">
                        {useCases[currentIndex].description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-16 sm:gap-y-6">
                        {useCases[currentIndex].features.map(
                          (feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 sm:gap-4"
                            >
                              <div
                                className={cn(
                                  "w-2 h-2 sm:w-3 sm:h-3 rounded-full",
                                  `bg-gradient-to-r ${useCases[currentIndex].gradient}`
                                )}
                              />
                              <span className="text-base sm:text-lg md:text-xl text-muted-foreground/80">
                                {feature}
                              </span>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-accent-purple w-8"
                    : "bg-accent-purple/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
