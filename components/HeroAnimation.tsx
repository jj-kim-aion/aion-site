"use client"

import {motion, useReducedMotion} from "framer-motion"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
                          gradientColor = "rgba(201,168,76,0.10)",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
    gradientColor?: string
}) {
    const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
        initial={
            prefersReducedMotion
                ? {opacity: 0}
                : {opacity: 0, y: -150, rotate: rotate - 15}
        }
        animate={{opacity: 1, y: 0, rotate: rotate}}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
          animate={prefersReducedMotion ? {} : {y: [0, 15, 0]}}
        transition={{
          duration: 12,
            repeat: Infinity,
          ease: "easeInOut",
        }}
          style={{width, height}}
        className="relative"
      >
        <div
            className="absolute inset-0 rounded-full border border-white/[0.07]"
            style={{
                background: `linear-gradient(to right, ${gradientColor}, transparent)`,
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.2)",
            }}
        />
      </motion.div>
    </motion.div>
  )
}

export function HeroAnimation() {
  return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
          {/* Subtle brand atmosphere overlay */}
          <div
              className="absolute inset-0"
              style={{
                  background:
                      "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,168,76,0.03) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 70%, rgba(126,200,227,0.025) 0%, transparent 60%)",
              }}
          />

          {/* Mirai gold shape — left upper */}
      <ElegantShape
        delay={0.3}
        width={560}
        height={130}
        rotate={11}
        gradientColor="rgba(201,168,76,0.09)"
        className="left-[-8%] md:left-[-3%] top-[18%] md:top-[22%]"
      />

          {/* Chelsea copper shape — right lower */}
      <ElegantShape
        delay={0.5}
        width={480}
        height={110}
        rotate={-14}
        gradientColor="rgba(212,149,106,0.09)"
        className="right-[-4%] md:right-[1%] top-[68%] md:top-[72%]"
      />

          {/* JJ cyan shape — left lower */}
      <ElegantShape
        delay={0.4}
        width={280}
        height={75}
        rotate={-7}
        gradientColor="rgba(126,200,227,0.08)"
        className="left-[6%] md:left-[12%] bottom-[8%] md:bottom-[12%]"
      />

          {/* Mirai small — right upper */}
      <ElegantShape
        delay={0.6}
        width={190}
        height={55}
        rotate={18}
        gradientColor="rgba(201,168,76,0.07)"
        className="right-[16%] md:right-[22%] top-[12%] md:top-[16%]"
      />

          {/* Chelsea small — left upper */}
      <ElegantShape
          delay={0.75}
          width={140}
          height={38}
          rotate={-22}
          gradientColor="rgba(212,149,106,0.07)"
          className="left-[22%] md:left-[28%] top-[6%] md:top-[9%]"
      />
    </div>
  )
}
