"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type RoadmapItem = {
  readonly title: string;
  readonly description: string;
  readonly icon: any;
  readonly status: "completed" | "in-progress" | "planned" | "future";
  readonly details?: readonly string[];
};

type FeatureCardProps = {
  item: RoadmapItem;
  delay: number;
};

const statusConfig = {
  completed: {
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: CheckCircle2,
  },
  "in-progress": {
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: Clock,
  },
  planned: {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: Zap,
  },
  future: {
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: Zap,
  },
};

export function FeatureCard({ item, delay }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = statusConfig[item.status];
  const StatusIcon = config.icon;
  const ItemIcon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative p-6 rounded-xl border backdrop-blur-sm
        ${config.bg} ${config.border}
        hover:shadow-lg transition-all duration-300
        ${item.details ? "cursor-pointer" : ""}
      `}
      onClick={() => item.details && setIsExpanded(!isExpanded)}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <StatusIcon className={`w-5 h-5 ${config.color}`} />
      </div>

      {/* Icon and Title */}
      <div className="mb-4">
        <ItemIcon className={`w-8 h-8 ${config.color} mb-3`} />
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Expandable Details */}
      {item.details && (
        <>
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-border/50">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-border/50"
            >
              <ul className="space-y-2">
                {item.details.map((detail, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${config.color.replace(
                        "text-",
                        "bg-"
                      )} mt-2 flex-shrink-0`}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent hover:from-primary/5 hover:to-purple-600/5 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
