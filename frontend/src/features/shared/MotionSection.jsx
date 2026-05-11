import { motion, useReducedMotion } from 'framer-motion';

const MotionSection = ({ children, className = '', delay = 0 }) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <section className={className}>{children}</section>;
    }

    return (
        <motion.section
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay }}
        >
            {children}
        </motion.section>
    );
};

export default MotionSection;