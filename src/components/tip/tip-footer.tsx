import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function TipFooter() {
  const router = useRouter();

  return (
    <footer className="mt-12 py-8 border-t border-accent-purple/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-4"
        >
          <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
            Want to accept tips too?
          </h3>
          <p className="text-muted-foreground">
            Create your own SolJar and start accepting crypto tips in minutes.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-accent-purple hover:bg-accent-purple/90"
          >
            Create Your SolJar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
