'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 MOTION WRAPPER COMPONENTS
 * Composants réutilisables pour animations scroll et hover
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { 
  scrollAnimations, 
  hoverEffects, 
  viewportSettings,
  animationConfig 
} from '@/lib/animations';

// ═══════════════════════════════════════════════════════════════
// 🔄 SCROLL REVEAL WRAPPER
// ═══════════════════════════════════════════════════════════════

interface ScrollRevealProps {
  children: ReactNode;
  variant?: keyof typeof scrollAnimations;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'span';
}

export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  className = '',
  delay = 0,
  once = true,
  amount = 0.3,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();
  
  const MotionComponent = motion[as] as typeof motion.div;
  
  const baseVariant = scrollAnimations[variant];
  const variantWithDelay: Variants = {
    ...baseVariant,
    visible: {
      ...(typeof baseVariant.visible === 'object' ? baseVariant.visible : {}),
      transition: {
        ...(typeof baseVariant.visible === 'object' && typeof baseVariant.visible.transition === 'object' 
          ? baseVariant.visible.transition 
          : {}),
        delay,
      },
    },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantWithDelay}
    >
      {children}
    </MotionComponent>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎨 STAGGER CONTAINER
// ═══════════════════════════════════════════════════════════════

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  childDelay = 0.2,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: childDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎯 STAGGER ITEM
// ═══════════════════════════════════════════════════════════════

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof scrollAnimations;
}

export function StaggerItem({
  children,
  className = '',
  variant = 'staggerItem',
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={scrollAnimations[variant]}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ✨ HOVER CARD
// ═══════════════════════════════════════════════════════════════

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale';
  enableTap?: boolean;
}

export function HoverCard({
  children,
  className = '',
  hoverEffect = 'lift',
  enableTap = true,
}: HoverCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={hoverEffects[hoverEffect]}
      whileTap={enableTap ? hoverEffects.press : undefined}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🔤 ANIMATED TEXT - Character by Character
// ═══════════════════════════════════════════════════════════════

interface AnimatedTextProps {
  text: string;
  className?: string;
  charDelay?: number;
  startDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function AnimatedText({
  text,
  className = '',
  charDelay = 0.03,
  startDelay = 0,
  as = 'span',
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const Tag = as;

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const characters = text.split('');

  return (
    <Tag ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: startDelay + index * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

// ═══════════════════════════════════════════════════════════════
// 📝 ANIMATED WORDS
// ═══════════════════════════════════════════════════════════════

interface AnimatedWordsProps {
  text: string;
  className?: string;
  wordDelay?: number;
  startDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function AnimatedWords({
  text,
  className = '',
  wordDelay = 0.1,
  startDelay = 0,
  as = 'span',
}: AnimatedWordsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const Tag = as;

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`${className} flex flex-wrap`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.25em]"
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(5px)' }}
          transition={{
            duration: 0.5,
            delay: startDelay + index * wordDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎬 PARALLAX WRAPPER
// ═══════════════════════════════════════════════════════════════

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function Parallax({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 0 }}
      whileInView={{
        y: direction === 'up' ? -50 * speed : 50 * speed,
      }}
      transition={{
        duration: 0,
        ease: 'linear',
      }}
      viewport={{ once: false, amount: 0 }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🌟 MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 💫 FLOATING ELEMENT
// ═══════════════════════════════════════════════════════════════

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function Floating({
  children,
  className = '',
  duration = 6,
  distance = 20,
}: FloatingProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎪 SPOTLIGHT EFFECT
// ═══════════════════════════════════════════════════════════════

interface SpotlightEffectProps {
  className?: string;
  color?: string;
  size?: number;
}

export function SpotlightEffect({
  className = '',
  color = 'rgba(255, 107, 53, 0.3)',
  size = 400,
}: SpotlightEffectProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
      }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎭 CURTAIN REVEAL
// ═══════════════════════════════════════════════════════════════

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function CurtainReveal({
  children,
  className = '',
  duration = 1.2,
}: CurtainRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 50% 0 50%)' }}
      animate={isInView ? { clipPath: 'inset(0 0% 0 0%)' } : { clipPath: 'inset(0 50% 0 50%)' }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 📊 COUNT UP ANIMATION
// ═══════════════════════════════════════════════════════════════

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{prefix}{end}{suffix}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      >
        {isInView ? (
          <CountUpNumber end={end} duration={duration} />
        ) : (
          0
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function CountUpNumber({ end, duration }: { end: number; duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      onAnimationStart={() => {
        const node = nodeRef.current;
        if (!node) return;
        
        const startTime = Date.now();
        const updateNumber = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.round(end * easeOutQuart);
          node.textContent = current.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        };
        updateNumber();
      }}
    >
      0
    </motion.span>
  );
}
