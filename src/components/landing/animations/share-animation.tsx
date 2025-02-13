import { motion } from "framer-motion";

export function ShareAnimation() {
  return (
    <div className="w-full h-32 relative bg-card/30 rounded-lg overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1, 1, 0.8], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-4 rounded-md bg-blue-500/10 flex items-center justify-center"
      >
        {/* Link Preview */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500/20" />
          <div className="space-y-2">
            <div className="w-24 h-2 rounded bg-blue-500/20" />
            <div className="w-16 h-2 rounded bg-blue-500/20" />
          </div>
        </div>

        {/* Copy Button */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: [40, 0], opacity: [0, 1] }}
          transition={{ duration: 0.3, delay: 1 }}
          className="absolute right-4 h-8 w-20 rounded bg-blue-500/20"
        />
      </motion.div>
    </div>
  );
}
