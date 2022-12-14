export const spinKeyframes = {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
};

export const pingKeyframes = {
  "0%": { transform: "scale(1)", opacity: "1" },
  "75%, 100%": { transform: "scale(2)", opacity: "0" },
};

export const pulseKeyframes = { "0%, 100%": { opacity: "1" }, "50%": { opacity: ".5" } };

export const bounceKeyframes = {
  "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
  "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
};

export const shockKeyframes = {
  "from, 20%, 53%, 80%, to": {
    animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    transform: "translate3d(0, 0, 0)",
  },
  "40%, 43%": {
    animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    transform: "translate3d(0, -30px, 0)",
  },
  "70%": {
    animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    transform: "translate3d(0, -15px, 0)",
  },
  "90%": { transform: "translate3d(0, -4px, 0)" },
};

export const flashKeyframes = { "from, 50%, to": { opacity: "1" }, "25%, 75%": { opacity: "0" } };

export const bubbleKeyframes = {
  from: { transform: "scale3d(1, 1, 1)" },
  "50%": { transform: "scale3d(1.05, 1.05, 1.05)" },
  to: { transform: "scale3d(1, 1, 1)" },
};

export const rubberBandKeyframes = {
  from: { transform: "scale3d(1, 1, 1)" },
  "30%": { transform: "scale3d(1.25, 0.75, 1)" },
  "40%": { transform: "scale3d(0.75, 1.25, 1)" },
  "50%": { transform: "scale3d(1.15, 0.85, 1)" },
  "65%": { transform: "scale3d(0.95, 1.05, 1)" },
  "75%": { transform: "scale3d(1.05, 0.95, 1)" },
  to: { transform: "scale3d(1, 1, 1)" },
};

export const shakeXKeyframes = {
  "from, to": { transform: "translate3d(0, 0, 0)" },
  "10%, 30%, 50%, 70%, 90%": { transform: "translate3d(-10px, 0, 0)" },
  "20%, 40%, 60%, 80%": { transform: "translate3d(10px, 0, 0)" },
};

export const shakeYKeyframes = {
  "from, to": { transform: "translate3d(0, 0, 0)" },
  "10%, 30%, 50%, 70%, 90%": { transform: "translate3d(0, -10px, 0)" },
  "20%, 40%, 60%, 80%": { transform: "translate3d(0, 10px, 0)" },
};

export const headShakeKeyframes = {
  "0%": { transform: "translateX(0)" },
  "6.5%": { transform: "translateX(-6px) rotateY(-9deg)" },
  "18.5%": { transform: "translateX(5px) rotateY(7deg)" },
  "31.5%": { transform: "translateX(-3px) rotateY(-5deg)" },
  "43.5%": { transform: "translateX(2px) rotateY(3deg)" },
  "50%": { transform: "translateX(0)" },
};

export const swingKeyframes = {
  "20%": { transform: "rotate3d(0, 0, 1, 15deg)" },
  "40%": { transform: "rotate3d(0, 0, 1, -10deg)" },
  "60%": { transform: "rotate3d(0, 0, 1, 5deg)" },
  "80%": { transform: "rotate3d(0, 0, 1, -5deg)" },
  to: { transform: "rotate3d(0, 0, 1, 0deg)" },
};

export const tadaKeyframes = {
  from: { transform: "scale3d(1, 1, 1)" },
  "10%, 20%": { transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)" },
  "30%, 50%, 70%, 90%": { transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)" },
  "40%, 60%, 80%": { transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)" },
  to: { transform: "scale3d(1, 1, 1)" },
};

export const wobbleKeyframes = {
  from: { transform: "translate3d(0, 0, 0)" },
  "15%": { transform: "translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)" },
  "30%": { transform: "translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)" },
  "45%": { transform: "translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)" },
  "60%": { transform: "translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)" },
  "75%": { transform: "translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const jelloKeyframes = {
  "from, 11.1% to": { transform: "translate3d(0, 0, 0)" },
  "22.2%": { transform: "skewX(-12.5deg) skewY(-12.5deg)" },
  "33.3%": { transform: "skewX(6.25deg) skewY(6.25deg)" },
  "44.4%": { transform: "skewX(-3.125deg) skewY(-3.125deg)" },
  "55.5%": { transform: "skewX(1.5625deg) skewY(1.5625deg)" },
  "66.6%": { transform: "skewX(-0.78125deg) skewY(-0.78125deg)" },
  "77.7%": { transform: "skewX(0.390625deg) skewY(0.390625deg)" },
  "88.8%": { transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)" },
};

export const heartBeatKeyframes = {
  "0%": { transform: "scale(1)" },
  "14%": { transform: "scale(1.3)" },
  "28%": { transform: "scale(1)" },
  "42%": { transform: "scale(1.3)" },
  "70%": { transform: "scale(1)" },
};

export const hingeKeyframes = {
  "0%": { transformOrigin: "top left", animationTimingFunction: "ease-in-out" },
  "20%, 60%": {
    transform: "rotate3d(0, 0, 1, 80deg)",
    transformOrigin: "top left",
    animationTimingFunction: "ease-in-out",
  },
  "40%, 80%": {
    transform: "rotate3d(0, 0, 1, 60deg)",
    transformOrigin: "top left",
    animationTimingFunction: "ease-in-out",
  },
  to: { transform: "translate3d(0, 700px, 0)", opacity: "0" },
};

export const jackInTheBoxKeyframes = {
  from: { opacity: "0", transformOrigin: "center bottom", transform: "scale(0.1) rotate(30deg)" },
  "50%": { transform: "rotate(-10deg)" },
  "70%": { transform: "rotate(3deg)" },
  to: { transform: "scale(1)" },
};

export const lightSpeedInRightKeyframes = {
  from: { opacity: "0", transform: "translate3d(100%, 0, 0) skewX(-30deg)" },
  "60%": { opacity: "1", transform: "skewX(20deg)" },
  "80%": { transform: "skewX(-5deg)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const lightSpeedInLeftKeyframes = {
  from: { opacity: "0", transform: "translate3d(100%, 0, 0) skewX(-30deg)" },
  "60%": { opacity: "1", transform: "skewX(20deg)" },
  "80%": { transform: "skewX(-5deg)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const lightSpeedOutLeftKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(100%, 0, 0) skewX(30deg)" },
};

export const lightSpeedOutRightKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(100%, 0, 0) skewX(30deg)" },
};

export const flipKeyframes = {
  from: {
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",
    animationTimingFunction: "ease-out",
  },
  "40%": {
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)",
    animationTimingFunction: "ease-out",
  },
  "50%": {
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)",
    animationTimingFunction: "ease-in",
  },
  "80%": {
    transform: "perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",
    animationTimingFunction: "ease-in",
  },
  to: {
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",
    animationTimingFunction: "ease-in",
  },
};

export const flipInXKeyframes = {
  from: {
    transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
    animationTimingFunction: "ease-in",
    opacity: "0",
  },
  "40%": {
    transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
    animationTimingFunction: "ease-in",
  },
  "60%": { transform: "perspective(400px) rotate3d(1, 0, 0, 10deg)", opacity: "1" },
  "80%": { transform: "perspective(400px) rotate3d(1, 0, 0, -5deg)" },
  to: { transform: "perspective(400px)" },
};

export const flipInYKeyframes = {
  from: {
    transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)",
    animationTimingFunction: "ease-in",
    opacity: "0",
  },
  "40%": {
    transform: "perspective(400px) rotate3d(0, 1, 0, -20deg)",
    animationTimingFunction: "ease-in",
  },
  "60%": { transform: "perspective(400px) rotate3d(0, 1, 0, 10deg)", opacity: "1" },
  "80%": { transform: "perspective(400px) rotate3d(0, 1, 0, -5deg)" },
  to: { transform: "perspective(400px)" },
};

export const flipOutXKeyframes = {
  from: { transform: "perspective(400px)" },
  "30%": { transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)", opacity: "1" },
  to: { transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)", opacity: "0" },
};

export const flipOutYKeyframes = {
  from: { transform: "perspective(400px)" },
  "30%": { transform: "perspective(400px) rotate3d(0, 1, 0, -15deg)", opacity: "1" },
  to: { transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)", opacity: "0" },
};

export const rotateInKeyframes = {
  from: { transformOrigin: "center", transform: "rotate3d(0, 0, 1, -200deg)", opacity: "0" },
  to: { transformOrigin: "center", transform: "translate3d(0, 0, 0)", opacity: "1" },
};

export const rotateInDownLeftKeyframes = {
  from: { transformOrigin: "left bottom", transform: "rotate3d(0, 0, 1, -45deg)", opacity: "0" },
  to: { transformOrigin: "left bottom", transform: "translate3d(0, 0, 0)", opacity: "1" },
};

export const rotateInDownRightKeyframes = {
  from: { transformOrigin: "right bottom", transform: "rotate3d(0, 0, 1, 45deg)", opacity: "0" },
  to: { transformOrigin: "right bottom", transform: "translate3d(0, 0, 0)", opacity: "1" },
};

export const rotateInUpLeftKeyframes = {
  from: { transformOrigin: "left top", transform: "rotate3d(0, 0, 1, 45deg)", opacity: "0" },
  to: { transformOrigin: "left top", transform: "translate3d(0, 0, 0)", opacity: "1" },
};

export const rotateInUpRightKeyframes = {
  from: { transformOrigin: "right bottom", transform: "rotate3d(0, 0, 1, -90deg)", opacity: "0" },
  to: { transformOrigin: "right bottom", transform: "translate3d(0, 0, 0)", opacity: "1" },
};

export const rotateOutKeyframes = {
  from: { transformOrigin: "center", opacity: "1" },
  to: { transformOrigin: "center", transform: "rotate3d(0, 0, 1, 200deg)", opacity: "0" },
};

export const rotateOutDownLeftKeyframes = {
  from: { transformOrigin: "left bottom", opacity: "1" },
  to: { transformOrigin: "left bottom", transform: "rotate3d(0, 0, 1, 45deg)", opacity: "0" },
};

export const rotateOutDownRightKeyframes = {
  from: { transformOrigin: "right bottom", opacity: "1" },
  to: { transformOrigin: "right bottom", transform: "rotate3d(0, 0, 1, -45deg)", opacity: "0" },
};

export const rotateOutUpLeftKeyframes = {
  from: { transformOrigin: "left bottom", opacity: "1" },
  to: { transformOrigin: "left bottom", transform: "rotate3d(0, 0, 1, -45deg)", opacity: "0" },
};

export const rotateOutUpRightKeyframes = {
  from: { transformOrigin: "right bottom", opacity: "1" },
  to: { transformOrigin: "left bottom", transform: "rotate3d(0, 0, 1, 90deg)", opacity: "0" },
};

export const rollInKeyframes = {
  from: { opacity: "0", transform: "translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const rollOutKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)" },
};

export const zoomInKeyframes = {
  from: { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  "50%": { opacity: "1" },
};

export const zoomInDownKeyframes = {
  from: {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  "60%": {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
};

export const zoomInLeftKeyframes = {
  from: {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  "60%": {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
};

export const zoomInRightKeyframes = {
  from: {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  "60%": {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
};

export const zoomInUpKeyframes = {
  from: {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  "60%": {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
};

export const bounceInKeyframes = {
  "from, 20%, 40%, 60%, 80%, to": { animationTimingFunction: "ease-in-out" },
  "0%": { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  "20%": { transform: "scale3d(1.1, 1.1, 1.1)" },
  "40%": { transform: "scale3d(0.9, 0.9, 0.9)" },
  "60%": { transform: "scale3d(1.03, 1.03, 1.03)", opacity: "1" },
  "80%": { transform: "scale3d(0.97, 0.97, 0.97)" },
  to: { opacity: "1", transform: "scale3d(1, 1, 1)" },
};

export const bounceInDownKeyframes = {
  "from, 60%, 75%, 90%, to": { animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  "0%": { opacity: "0", transform: "translate3d(0, -3000px, 0)" },
  "60%": { opacity: "1", transform: "translate3d(0, 25px, 0)" },
  "75%": { transform: "translate3d(0, -10px, 0)" },
  "90%": { transform: "translate3d(0, 5px, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const bounceInLeftKeyframes = {
  "from, 60%, 75%, 90%, to": { animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  "0%": { opacity: "0", transform: "translate3d(-3000px, 0, 0)" },
  "60%": { opacity: "1", transform: "translate3d(25px, 0, 0)" },
  "75%": { transform: "translate3d(-10px, 0, 0)" },
  "90%": { transform: "translate3d(5px, 0, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const bounceInRightKeyframes = {
  "from, 60%, 75%, 90%, to": { animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  "0%": { opacity: "0", transform: "translate3d(3000px, 0, 0)" },
  "60%": { opacity: "1", transform: "translate3d(-25px, 0, 0)" },
  "75%": { transform: "translate3d(10px, 0, 0)" },
  "90%": { transform: "translate3d(-5px, 0, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const bounceInUpKeyframes = {
  "from, 60%, 75%, 90%, to": { animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  "0%": { opacity: "0", transform: "translate3d(0, 3000px, 0)" },
  "60%": { opacity: "1", transform: "translate3d(0, -20px, 0)" },
  "75%": { transform: "translate3d(0, 10px, 0)" },
  "90%": { transform: "translate3d(0, -5px, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const bounceOutKeyframes = {
  "20%": { transform: "scale3d(0.9, 0.9, 0.9)" },
  "50%, 55%": { opacity: "1", transform: "scale3d(1.1, 1.1, 1.1)" },
  to: { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
};

export const bounceOutDownKeyframes = {
  "20%": { transform: "translate3d(0, 10px, 0)" },
  "40%, 45%": { opacity: "1", transform: "translate3d(0, -20px, 0)" },
  to: { opacity: "0", transform: "translate3d(0, 2000px, 0)" },
};

export const bounceOutLeftKeyframes = {
  "20%": { opacity: "1", transform: "translate3d(20px, 0, 0)" },
  to: { opacity: "0", transform: "translate3d(-2000px, 0, 0)" },
};

export const bounceOutRightKeyframes = {
  "20%": { opacity: "1", transform: "translate3d(-20px, 0, 0)" },
  to: { opacity: "0", transform: "translate3d(2000px, 0, 0)" },
};

export const bounceOutUpKeyframes = {
  "20%": { transform: "translate3d(0, -10px, 0)" },
  "40%, 45%": { opacity: "1", transform: "translate3d(0, 20px, 0)" },
  to: { opacity: "0", transform: "translate3d(0, -2000px, 0)" },
};

export const zoomOutKeyframes = {
  from: { opacity: "1" },
  "50%": { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  to: { opacity: "0" },
};

export const zoomOutDownKeyframes = {
  "40%": {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  to: {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",
    transformOrigin: "center bottom",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
};

export const zoomOutLeftKeyframes = {
  "40%": { opacity: "1", transform: "scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)" },
  to: {
    opacity: "0",
    transform: "scale(0.1) translate3d(-2000px, 0, 0)",
    transformOrigin: "left center",
  },
};

export const zoomOutRightKeyframes = {
  "40%": { opacity: "1", transform: "scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)" },
  to: {
    opacity: "0",
    transform: "scale(0.1) translate3d(2000px, 0, 0)",
    transformOrigin: "right center",
  },
};

export const zoomOutUpKeyframes = {
  "40%": {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  to: {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",
    transformOrigin: "center bottom",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
};

export const slideInDownKeyframes = {
  from: { transform: "translate3d(0, -100%, 0)", visibility: "visible" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const slideInLeftKeyframes = {
  from: { transform: "translate3d(-100%, 0, 0)", visibility: "visible" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const slideInRightKeyframes = {
  from: { transform: "translate3d(100%, 0, 0)", visibility: "visible" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const slideInUpKeyframes = {
  from: { transform: "translate3d(0, 100%, 0)", visibility: "visible" },
  to: { transform: "translate3d(0, 0, 0)" },
};

export const slideOutDownKeyframes = {
  from: { transform: "translate3d(0, 0, 0)" },
  to: { visibility: "hidden", transform: "translate3d(0, 100%, 0)" },
};

export const slideOutLeftKeyframes = {
  from: { transform: "translate3d(0, 0, 0)" },
  to: { visibility: "hidden", transform: "translate3d(-100%, 0, 0)" },
};

export const slideOutRightKeyframes = {
  from: { transform: "translate3d(0, 0, 0)" },
  to: { visibility: "hidden", transform: "translate3d(100%, 0, 0)" },
};

export const slideOutUpKeyframes = {
  from: { transform: "translate3d(0, 0, 0)" },
  to: { visibility: "hidden", transform: "translate3d(0, -100%, 0)" },
};

export const fadeInKeyframes = { from: { opacity: "0" }, to: { opacity: "1" } };

export const fadeInDownKeyframes = {
  from: { opacity: "0", transform: "translate3d(0, -100%, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInDownBigKeyframes = {
  from: { opacity: "0", transform: "translate3d(0, -2000px, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInLeftKeyframes = {
  from: { opacity: "0", transform: "translate3d(-100%, 0, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInLeftBigKeyframes = {
  from: { opacity: "0", transform: "translate3d(-2000px, 0, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInRightKeyframes = {
  from: { opacity: "0", transform: "translate3d(100%, 0, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInRightBigKeyframes = {
  from: { opacity: "0", transform: "translate3d(2000px, 0, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInUpKeyframes = {
  from: { opacity: "0", transform: "translate3d(0, 100%, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInUpBigKeyframes = {
  from: { opacity: "0", transform: "translate3d(0, 2000px, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInTopLeftKeyframes = {
  from: { opacity: "0", transform: "translate3d(-100%, -100%, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInTopRightKeyframes = {
  from: { opacity: "0", transform: "translate3d(100%, -100%, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInBottomLeftKeyframes = {
  from: { opacity: "0", transform: "translate3d(-100%, 100%, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeInBottomRightKeyframes = {
  from: { opacity: "0", transform: "translate3d(100%, 100%, 0)" },
  to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
};

export const fadeOutKeyframes = { from: { opacity: "1" }, to: { opacity: "0" } };

export const fadeOutDownKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(0, 100%, 0)" },
};

export const fadeOutDownBigKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(0, 2000px, 0)" },
};

export const fadeOutLeftKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(-100%, 0, 0)" },
};

export const fadeOutLeftBigKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(-2000px, 0, 0)" },
};

export const fadeOutRightKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(100%, 0, 0)" },
};

export const fadeOutRightBigKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(2000px, 0, 0)" },
};

export const fadeOutUpKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(0, -100%, 0)" },
};

export const fadeOutUpBigKeyframes = {
  from: { opacity: "1" },
  to: { opacity: "0", transform: "translate3d(0, -2000px, 0)" },
};

export const fadeOutTopLeftKeyframes = {
  from: { opacity: "1", transform: "translate3d(0, 0, 0)" },
  to: { opacity: "0", transform: "translate3d(-100%, -100%, 0)" },
};

export const fadeOutTopRightKeyframes = {
  from: { opacity: "1", transform: "translate3d(0, 0, 0)" },
  to: { opacity: "0", transform: "translate3d(100%, -100%, 0)" },
};

export const fadeOutBottomLeftKeyframes = {
  from: { opacity: "1", transform: "translate3d(0, 0, 0)" },
  to: { opacity: "0", transform: "translate3d(-100%, 100%, 0)" },
};

export const fadeOutBottomRightKeyframes = {
  from: { opacity: "1", transform: "translate3d(0, 0, 0)" },
  to: { opacity: "0", transform: "translate3d(100%, 100%, 0)" },
};

export const backInUpKeyframes = {
  "0%": { opacity: "0.7", transform: "translateY(1200px) scale(0.7)" },
  "80%": { opacity: "0.7", transform: "translateY(0px) scale(0.7)" },
  "100%": { opacity: "1", transform: "scale(1)" },
};

export const backInDownKeyframes = {
  "0%": { opacity: "0.7", transform: "translateY(-1200px) scale(0.7)" },
  "80%": { opacity: "0.7", transform: "translateY(0px) scale(0.7)" },
  "100%": { opacity: "1", transform: "scale(1)" },
};

export const backInLeftKeyframes = {
  "0%": { opacity: "0.7", transform: "translateX(-2000px) scale(0.7)" },
  "80%": { opacity: "0.7", transform: "translateX(0px) scale(0.7)" },
  "100%": { opacity: "1", transform: "scale(1)" },
};

export const backInRightKeyframes = {
  "0%": { opacity: "0.7", transform: "translateX(2000px) scale(0.7)" },
  "80%": { opacity: "0.7", transform: "translateY(0px) scale(0.7)" },
  "100%": { opacity: "1", transform: "scale(1)" },
};

export const backOutUpKeyframes = {
  "0%": { opacity: "1", transform: "scale(1)" },
  "80%": { opacity: "0.7", transform: "translateY(0px) scale(0.7)" },
  "100%": { opacity: "0.7", transform: "translateY(-700px) scale(0.7)" },
};

export const backOutDownKeyframes = {
  "0%": { opacity: "1", transform: "scale(1)" },
  "80%": { opacity: "0.7", transform: "translateY(0px) scale(0.7)" },
  "100%": { opacity: "0.7", transform: "translateY(700px) scale(0.7)" },
};

export const backOutLeftKeyframes = {
  "0%": { opacity: "1", transform: "scale(1)" },
  "80%": { opacity: "0.7", transform: "translateX(-2000px) scale(0.7)" },
  "100%": { opacity: "0.7", transform: "translateY(-700px) scale(0.7)" },
};

export const backOutRightKeyframes = {
  "0%": { opacity: "1", transform: "scale(1)" },
  "80%": { opacity: "0.7", transform: "translateY(0px) scale(0.7)" },
  "100%": { opacity: "0.7", transform: "translateX(2000px) scale(0.7)" },
};
