import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Globe = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mx-auto scale-90 md:scale-100">
      
      {/* Outer Glow */}
      <div className="absolute inset-10 rounded-full bg-primary/10 blur-[100px]" />

      {/* Ring 1 - Outer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-white/10 border-dashed z-10"
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-primary rounded-full shadow-[0_0_20px_#ea580c]" />
      </motion.div>

      {/* Ring 2 - Middle */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-20 rounded-full border border-primary/30 z-10"
        style={{ borderStyle: "dotted" }}
      >
        <div className="absolute bottom-0 right-1/4 w-4 h-4 translate-x-1/2 translate-y-1/2 bg-white rounded-full shadow-[0_0_25px_#fff]" />
        <div className="absolute top-1/4 left-0 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]" />
      </motion.div>

      {/* Ring 3 - Inner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-36 rounded-full border border-white/5 z-10"
      >
        <div className="absolute top-1/2 -right-2 w-4 h-4 -translate-y-1/2 bg-primary rounded-full shadow-[0_0_20px_#ea580c]" />
        <div className="absolute bottom-0 left-1/4 w-2 h-2 translate-y-1/2 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]" />
      </motion.div>

      {/* Connecting Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50" viewBox="0 0 500 500">
         {/* Static geometric lines from center to outer nodes */}
         <path d="M 250,250 L 250,20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
         <path d="M 250,250 L 60,390" stroke="rgba(234,88,12,0.3)" strokeWidth="1.5" strokeDasharray="6,6" />
         <path d="M 250,250 L 440,390" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="4,4" />
         <path d="M 250,250 L 40,160" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4,4" />
         <path d="M 250,250 L 460,160" stroke="rgba(234,88,12,0.2)" strokeWidth="1" strokeDasharray="4,4" />
      </svg>

      {/* Core Node */}
      <div className="absolute flex items-center justify-center w-28 h-28 rounded-full bg-black/40 border border-primary/30 backdrop-blur-md z-20">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-primary shadow-[0_0_50px_#ea580c]"
        />
        {/* Radar Ping 1 */}
        <motion.div
          animate={{ scale: [1, 3], opacity: [0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
        />
        {/* Radar Ping 2 */}
        <motion.div
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-white/20"
        />
      </div>
      
    </div>
  );
};
