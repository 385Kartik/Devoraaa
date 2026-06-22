import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: any;
  to?: string;
}

export default function MagneticButton({ children, className = "", onClick, as, to, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.05, y: middleY * 0.05 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as || "button";

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      to={to}
      className={`relative inline-flex items-center justify-center transition-all ${className}`}
      {...props}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </Component>
  );
}
