'use client';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎤 ANIMATED SVG COMPONENTS - Stage Elements
 * ═══════════════════════════════════════════════════════════════
 */

import { motion, useReducedMotion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════
// 🎤 ANIMATED MICROPHONE
// ═══════════════════════════════════════════════════════════════

interface MicrophoneProps {
  className?: string;
  color?: string;
  glowColor?: string;
  animate?: boolean;
}

export function AnimatedMicrophone({
  className = '',
  color = '#f5f5f0',
  glowColor = '#ff6b35',
  animate = true,
}: MicrophoneProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: 20, rotate: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: shouldAnimate ? [0, -3, 3, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.8 },
        y: { duration: 0.8 },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      {/* Glow effect */}
      <defs>
        <filter id="micGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Microphone head */}
      <motion.ellipse
        cx="50"
        cy="35"
        rx="30"
        ry="35"
        stroke={color}
        strokeWidth="3"
        fill="none"
        filter="url(#micGlow)"
        animate={shouldAnimate ? {
          filter: ['url(#micGlow)', 'none', 'url(#micGlow)'],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Microphone grille lines */}
      {[15, 25, 35, 45, 55].map((y, i) => (
        <motion.line
          key={i}
          x1="25"
          y1={y}
          x2="75"
          y2={y}
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Microphone stand connector */}
      <motion.rect
        x="42"
        y="70"
        width="16"
        height="15"
        rx="3"
        fill={color}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* Microphone stand */}
      <motion.line
        x1="50"
        y1="85"
        x2="50"
        y2="170"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Stand base */}
      <motion.path
        d="M 25 170 Q 50 180 75 170"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
    </motion.svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 💡 ANIMATED SPOTLIGHT
// ═══════════════════════════════════════════════════════════════

interface SpotlightProps {
  className?: string;
  color?: string;
}

export function AnimatedSpotlight({
  className = '',
  color = '#ff6b35',
}: SpotlightProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spotlightBeam" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="spotGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Light beam */}
      <motion.path
        d="M 100 30 L 40 280 Q 100 300 160 280 L 100 30"
        fill="url(#spotlightBeam)"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={prefersReducedMotion ? { opacity: 0.6, scaleY: 1 } : {
          opacity: [0.4, 0.8, 0.4],
          scaleY: 1,
        }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scaleY: {
            duration: 1,
          },
        }}
        style={{ transformOrigin: 'top center' }}
      />

      {/* Light source */}
      <motion.circle
        cx="100"
        cy="25"
        r="20"
        fill={color}
        filter="url(#spotGlow)"
        animate={prefersReducedMotion ? {} : {
          r: [18, 22, 18],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Light fixture */}
      <rect x="85" y="0" width="30" height="15" rx="3" fill="#2d2d2d" />
      <rect x="70" y="10" width="60" height="20" rx="5" fill="#3d3d3d" />
    </motion.svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎭 ANIMATED CURTAIN
// ═══════════════════════════════════════════════════════════════

interface CurtainProps {
  className?: string;
  side: 'left' | 'right';
  color?: string;
}

export function AnimatedCurtain({
  className = '',
  side,
  color = '#4a0404',
}: CurtainProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`curtainGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          {side === 'left' ? (
            <>
              <stop offset="0%" stopColor={color} />
              <stop offset="70%" stopColor={color} />
              <stop offset="100%" stopColor="#1a0202" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#1a0202" />
              <stop offset="30%" stopColor={color} />
              <stop offset="100%" stopColor={color} />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Main curtain */}
      <motion.path
        d={side === 'left' 
          ? "M 0 0 Q 20 50 10 100 Q 30 150 15 200 Q 35 250 20 300 L 100 300 L 100 0 Z"
          : "M 100 0 Q 80 50 90 100 Q 70 150 85 200 Q 65 250 80 300 L 0 300 L 0 0 Z"
        }
        fill={`url(#curtainGrad-${side})`}
        animate={prefersReducedMotion ? {} : {
          d: side === 'left'
            ? [
                "M 0 0 Q 20 50 10 100 Q 30 150 15 200 Q 35 250 20 300 L 100 300 L 100 0 Z",
                "M 0 0 Q 25 50 15 100 Q 35 150 20 200 Q 40 250 25 300 L 100 300 L 100 0 Z",
                "M 0 0 Q 20 50 10 100 Q 30 150 15 200 Q 35 250 20 300 L 100 300 L 100 0 Z",
              ]
            : [
                "M 100 0 Q 80 50 90 100 Q 70 150 85 200 Q 65 250 80 300 L 0 300 L 0 0 Z",
                "M 100 0 Q 75 50 85 100 Q 65 150 80 200 Q 60 250 75 300 L 0 300 L 0 0 Z",
                "M 100 0 Q 80 50 90 100 Q 70 150 85 200 Q 65 250 80 300 L 0 300 L 0 0 Z",
              ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Curtain folds - highlights */}
      {[50, 120, 190, 260].map((y, i) => (
        <motion.line
          key={i}
          x1={side === 'left' ? 15 + i * 3 : 85 - i * 3}
          y1={y - 20}
          x2={side === 'left' ? 25 + i * 3 : 75 - i * 3}
          y2={y + 20}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
      ))}
    </motion.svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 😄 LAUGH LINES / SOUND WAVES
// ═══════════════════════════════════════════════════════════════

interface LaughLinesProps {
  className?: string;
  color?: string;
}

export function LaughLines({
  className = '',
  color = '#ff6b35',
}: LaughLinesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M ${10 + i * 20} 30 Q ${15 + i * 20} ${20 - i * 2} ${20 + i * 20} 30 Q ${25 + i * 20} ${40 + i * 2} ${30 + i * 20} 30`}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { pathLength: 1, opacity: 0.6 } : {
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// ⭐ ANIMATED STARS (Audience applause)
// ═══════════════════════════════════════════════════════════════

interface StarsProps {
  className?: string;
  count?: number;
  color?: string;
}

export function AnimatedStars({
  className = '',
  count = 5,
  color = '#ffd700',
}: StarsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg className={className} viewBox="0 0 200 50" fill="none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.path
          key={i}
          d={`M ${20 + i * 35} 25 l 3 9 h 10 l -8 6 3 9 -8 -6 -8 6 3 -9 -8 -6 h 10 z`}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { scale: 1, opacity: 1 } : {
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0.8],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            repeat: prefersReducedMotion ? 0 : Infinity,
            repeatDelay: 3,
          }}
          style={{ transformOrigin: `${20 + i * 35}px 30px` }}
        />
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎬 STAGE FLOOR PATTERN
// ═══════════════════════════════════════════════════════════════

interface StageFloorProps {
  className?: string;
}

export function StageFloor({ className = '' }: StageFloorProps) {
  return (
    <svg className={className} viewBox="0 0 400 100" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="stageFloorGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#3d2914" />
          <stop offset="50%" stopColor="#2a1d0e" />
          <stop offset="100%" stopColor="#1a1208" />
        </linearGradient>
      </defs>
      
      {/* Main floor */}
      <rect width="400" height="100" fill="url(#stageFloorGrad)" />
      
      {/* Wood planks pattern */}
      {[0, 80, 160, 240, 320].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="0"
          width="78"
          height="100"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="2"
          fill="none"
        />
      ))}
      
      {/* Wood grain lines */}
      {[20, 50, 80].map((y, i) => (
        <line
          key={i}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🌟 DECORATIVE SPARK
// ═══════════════════════════════════════════════════════════════

interface SparkProps {
  className?: string;
  color?: string;
}

export function AnimatedSpark({
  className = '',
  color = '#ff6b35',
}: SparkProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      className={className}
      viewBox="0 0 50 50"
      fill="none"
      animate={prefersReducedMotion ? {} : {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <defs>
        <filter id="sparkGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 4-point star */}
      <motion.path
        d="M 25 0 L 28 20 L 50 25 L 28 30 L 25 50 L 22 30 L 0 25 L 22 20 Z"
        fill={color}
        filter="url(#sparkGlow)"
        animate={prefersReducedMotion ? {} : {
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}
