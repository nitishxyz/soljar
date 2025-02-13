import { motion } from "framer-motion";

export function ReceiveAnimation() {
  return (
    <div className="w-full h-32 relative bg-card/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Wallet Balance Card */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-48 h-20 rounded-lg bg-green-500/10 p-4"
        >
          <div className="space-y-3">
            <div className="w-16 h-2 rounded bg-green-500/20" />
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-4 rounded bg-green-500/30"
            />
          </div>

          {/* Incoming Transaction Indicators */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-500/40"
          />
        </motion.div>
      </div>
    </div>
  );
}
