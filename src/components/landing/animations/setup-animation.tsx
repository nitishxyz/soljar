import { motion } from "framer-motion";

export function SetupAnimation() {
  return (
    <div className="w-full h-32 relative bg-card/30 rounded-lg overflow-hidden">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: [-100, 0, 0, 0, -100] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.2, 0.6, 0.8, 1],
        }}
        className="absolute top-4 left-4 flex items-center gap-3"
      >
        {/* Wallet Button */}
        <div className="h-10 px-4 rounded-md bg-accent-purple/20 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-accent-purple/40" />
          <div className="w-20 h-3 rounded bg-accent-purple/40" />
        </div>

        {/* Username Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative h-10 w-48 rounded-md bg-accent-purple/10 overflow-hidden"
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [0, 80] }}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-3 rounded bg-accent-purple/30"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-4 bg-accent-purple/40 animate-pulse"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
