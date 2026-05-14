import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ModalShell = ({ isOpen, onClose, className = "", children, noPadding = false }) => {
  const shouldReduceMotion = useReducedMotion();

  const backdropVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  const panelVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.96, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 18 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          onClick={onClose}
          initial={backdropVariants.initial}
          animate={backdropVariants.animate}
          exit={backdropVariants.exit}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className={className}
            onClick={(e) => e.stopPropagation()}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalShell;