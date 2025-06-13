"use client";
import { motion } from "framer-motion";
import { FeatureCard } from "./feature-card";

type RoadmapItem = {
  readonly title: string;
  readonly description: string;
  readonly icon: any;
  readonly status: "completed" | "in-progress" | "planned" | "future";
  readonly details?: readonly string[];
};

type RoadmapSectionData = {
  readonly title: string;
  readonly items: readonly RoadmapItem[];
};

type RoadmapSectionProps = {
  section: RoadmapSectionData;
  delay: number;
};

export function RoadmapSection({ section, delay }: RoadmapSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.items.map((item, index) => (
          <FeatureCard
            key={item.title}
            item={item}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}
