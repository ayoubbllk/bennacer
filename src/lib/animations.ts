/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 MOUAADH BENNACER - FRAMER MOTION ANIMATIONS LIBRARY
 * ═══════════════════════════════════════════════════════════════
 * 
 * Animations conçues pour l'univers stand-up comedy :
 * - Spotlight effects (entrées de scène)
 * - Curtain reveals (ouverture rideau)
 * - Microphone interactions
 * - Audience reactions (applaudissements, rires)
 * - Stage lighting dynamics
 */

import { Variants, Transition, TargetAndTransition, VariantLabels } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════
// 🎯 TRANSITION PRESETS - Timing Functions
// ═══════════════════════════════════════════════════════════════

export const transitions = {
  // Entrée fluide et naturelle
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    mass: 1,
  } as Transition,
  
  // Rebond énergique (rire, surprise)
  bounce: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  } as Transition,
  
  // Smooth professional
  smooth: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1], // cubic-bezier smooth
  } as Transition,
  
  // Entrée dramatique
  dramatic: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
  
  // Quick snap (punchline timing)
  snap: {
    duration: 0.3,
    ease: 'easeOut',
  } as Transition,
  
  // Slow reveal (suspense)
  suspense: {
    duration: 1.2,
    ease: [0.43, 0.13, 0.23, 0.96],
  } as Transition,
  
  // Stagger enfants
  staggerChildren: (stagger = 0.1) => ({
    staggerChildren: stagger,
    delayChildren: 0.2,
  }),
};

// ═══════════════════════════════════════════════════════════════
// 🎬 HERO SECTION ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const heroAnimations: Record<string, Variants> = {
  // Container principal - orchestre le timing
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  },

  // Titre principal - entrée spectaculaire
  title: {
    hidden: { 
      opacity: 0, 
      y: 100,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Sous-titre - glisse depuis le bas
  subtitle: {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Image artiste - fade in avec scale
  artistImage: {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      filter: 'grayscale(100%) brightness(0.5)',
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'grayscale(0%) brightness(1)',
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Effet spotlight 
  spotlight: {
    hidden: { 
      opacity: 0,
      scale: 0.5,
    },
    visible: { 
      opacity: [0, 0.8, 0.6],
      scale: [0.5, 1.2, 1],
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// 📜 SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const scrollAnimations: Record<string, Variants> = {
  // Fade In Up - Classique et élégant
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 60,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Fade In Down
  fadeInDown: {
    hidden: { 
      opacity: 0, 
      y: -60,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Slide In Left (entrée côté coulisse gauche)
  slideInLeft: {
    hidden: { 
      opacity: 0, 
      x: -100,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Slide In Right (entrée côté coulisse droite)
  slideInRight: {
    hidden: { 
      opacity: 0, 
      x: 100,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Scale Up - Effet "pop"
  scaleUp: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  },

  // Blur Reveal - Premium effect
  blurReveal: {
    hidden: { 
      opacity: 0, 
      filter: 'blur(20px)',
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Stagger Container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger Item
  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// 🎪 SHOW CARDS ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const cardAnimations: Record<string, Variants | TargetAndTransition> = {
  // Container avec stagger
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },

  // Card individuelle
  card: {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Hover state
  cardHover: {
    scale: 1.02,
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  } as TargetAndTransition,

  // Tap state
  cardTap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  } as TargetAndTransition,
};

// ═══════════════════════════════════════════════════════════════
// 🎤 MICROPHONE & STAGE ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const stageAnimations: Record<string, Variants> = {
  // Micro qui apparaît
  microphone: {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotate: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  },

  // Rideau qui s'ouvre
  curtainLeft: {
    hidden: { x: 0 },
    visible: { 
      x: '-100%',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  curtainRight: {
    hidden: { x: 0 },
    visible: { 
      x: '100%',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Spotlight pulse
  spotlightPulse: {
    initial: { 
      opacity: 0.6,
      scale: 1,
    },
    animate: { 
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// 📝 TEXT ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const textAnimations: Record<string, Variants> = {
  // Split text character reveal
  character: {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  },

  // Word by word reveal
  word: {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(5px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
    },
  },

  // Typewriter effect container
  typewriter: {
    hidden: { width: 0 },
    visible: {
      width: 'auto',
      transition: {
        duration: 2,
        ease: 'linear',
      },
    },
  },

  // Highlight text (comme un surligneur)
  highlight: {
    hidden: { 
      backgroundSize: '0% 100%',
    },
    visible: { 
      backgroundSize: '100% 100%',
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// 🚀 NAVIGATION ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const navAnimations: Record<string, Variants> = {
  // Header slide down
  header: {
    hidden: { 
      y: -100,
      opacity: 0,
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Nav links stagger
  navLinks: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },

  // Individual nav link
  navLink: {
    hidden: { 
      opacity: 0, 
      y: -20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  },

  // Mobile menu
  mobileMenu: {
    hidden: { 
      opacity: 0,
      x: '100%',
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
      },
    },
  },

  // Hamburger to X
  hamburgerTop: {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  },
  hamburgerMiddle: {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  },
  hamburgerBottom: {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  },
};

// ═══════════════════════════════════════════════════════════════
// 📋 FORM ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const formAnimations: Record<string, Variants | TargetAndTransition> = {
  // Form container
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Input field
  input: {
    hidden: { 
      opacity: 0, 
      x: -30,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  },

  // Focus state
  inputFocus: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  } as TargetAndTransition,

  // Submit button
  button: {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },

  // Success state
  success: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// ⏱️ TIMELINE ANIMATIONS (Page À Propos)
// ═══════════════════════════════════════════════════════════════

export const timelineAnimations: Record<string, Variants> = {
  // Line drawing effect
  line: {
    hidden: { 
      scaleY: 0,
      originY: 0,
    },
    visible: { 
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Timeline item
  item: {
    hidden: { 
      opacity: 0, 
      x: -50,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Timeline dot
  dot: {
    hidden: { 
      scale: 0,
      opacity: 0,
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// 🔄 PAGE TRANSITIONS
// ═══════════════════════════════════════════════════════════════

export const pageTransitions: Record<string, Variants> = {
  // Fade transition
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },

  // Slide up transition
  slideUp: {
    initial: { 
      opacity: 0, 
      y: 50,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: {
        duration: 0.3,
      },
    },
  },

  // Curtain reveal
  curtainReveal: {
    initial: { 
      clipPath: 'inset(0 50% 0 50%)',
    },
    animate: { 
      clipPath: 'inset(0 0% 0 0%)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      clipPath: 'inset(0 50% 0 50%)',
      transition: {
        duration: 0.4,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// 🎯 HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════

export const hoverEffects = {
  // Lift effect
  lift: {
    y: -5,
    transition: { duration: 0.2 },
  } as TargetAndTransition,

  // Glow effect
  glow: {
    boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)',
    transition: { duration: 0.3 },
  } as TargetAndTransition,

  // Scale effect
  scale: {
    scale: 1.05,
    transition: { duration: 0.2 },
  } as TargetAndTransition,

  // Underline expand
  underline: {
    scaleX: 1,
    transition: { duration: 0.3 },
  } as TargetAndTransition,

  // Button press
  press: {
    scale: 0.95,
    transition: { duration: 0.1 },
  } as TargetAndTransition,
};

// ═══════════════════════════════════════════════════════════════
// 🔧 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Generate stagger delay for child elements
 * @param index - Element index
 * @param baseDelay - Base delay in seconds
 * @param stagger - Stagger amount in seconds
 */
export const staggerDelay = (index: number, baseDelay = 0, stagger = 0.1): number => {
  return baseDelay + index * stagger;
};

/**
 * Create custom viewport settings for scroll animations
 * @param amount - How much of the element should be visible (0-1)
 * @param once - Should the animation only trigger once
 */
export const viewportSettings = (amount = 0.3, once = true) => ({
  once,
  amount,
  margin: '-50px',
});

/**
 * Create animation with custom delay
 * @param variants - Base variants object
 * @param delay - Delay in seconds
 */
export const withDelay = (variants: Variants, delay: number): Variants => {
  const newVariants = { ...variants };
  if (newVariants.visible && typeof newVariants.visible === 'object') {
    newVariants.visible = {
      ...newVariants.visible,
      transition: {
        ...(typeof newVariants.visible.transition === 'object' ? newVariants.visible.transition : {}),
        delay,
      },
    };
  }
  return newVariants;
};

// ═══════════════════════════════════════════════════════════════
// 📦 EXPORT DEFAULT CONFIG
// ═══════════════════════════════════════════════════════════════

export const animationConfig = {
  // Global settings
  reducedMotion: {
    transition: { duration: 0 },
  },
  
  // Default viewport for scroll animations
  defaultViewport: {
    once: true,
    amount: 0.3,
    margin: '-50px',
  },
  
  // Default transition
  defaultTransition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  },
};
