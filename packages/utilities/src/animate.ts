import {
  backInDownKeyframes,
  backInLeftKeyframes,
  backInRightKeyframes,
  backInUpKeyframes,
  backOutDownKeyframes,
  backOutLeftKeyframes,
  backOutRightKeyframes,
  backOutUpKeyframes,
  bounceInDownKeyframes,
  bounceInKeyframes,
  bounceInLeftKeyframes,
  bounceInRightKeyframes,
  bounceInUpKeyframes,
  bounceKeyframes,
  bounceOutDownKeyframes,
  bounceOutKeyframes,
  bounceOutLeftKeyframes,
  bounceOutRightKeyframes,
  bounceOutUpKeyframes,
  bubbleKeyframes,
  fadeInBottomLeftKeyframes,
  fadeInBottomRightKeyframes,
  fadeInDownBigKeyframes,
  fadeInDownKeyframes,
  fadeInKeyframes,
  fadeInLeftBigKeyframes,
  fadeInLeftKeyframes,
  fadeInRightBigKeyframes,
  fadeInRightKeyframes,
  fadeInTopLeftKeyframes,
  fadeInTopRightKeyframes,
  fadeInUpBigKeyframes,
  fadeInUpKeyframes,
  fadeOutDownBigKeyframes,
  fadeOutDownKeyframes,
  fadeOutKeyframes,
  fadeOutLeftBigKeyframes,
  fadeOutLeftKeyframes,
  fadeOutRightBigKeyframes,
  fadeOutRightKeyframes,
  fadeOutUpBigKeyframes,
  fadeOutUpKeyframes,
  flashKeyframes,
  flipInXKeyframes,
  flipInYKeyframes,
  flipKeyframes,
  flipOutXKeyframes,
  flipOutYKeyframes,
  headShakeKeyframes,
  heartBeatKeyframes,
  hingeKeyframes,
  jackInTheBoxKeyframes,
  jelloKeyframes,
  lightSpeedInLeftKeyframes,
  lightSpeedInRightKeyframes,
  lightSpeedOutLeftKeyframes,
  lightSpeedOutRightKeyframes,
  pingKeyframes,
  pulseKeyframes,
  rollInKeyframes,
  rollOutKeyframes,
  rotateInDownLeftKeyframes,
  rotateInDownRightKeyframes,
  rotateInKeyframes,
  rotateInUpLeftKeyframes,
  rotateInUpRightKeyframes,
  rotateOutDownLeftKeyframes,
  rotateOutDownRightKeyframes,
  rotateOutKeyframes,
  rotateOutUpLeftKeyframes,
  rotateOutUpRightKeyframes,
  rubberBandKeyframes,
  shakeXKeyframes,
  shakeYKeyframes,
  shockKeyframes,
  slideInDownKeyframes,
  slideInLeftKeyframes,
  slideInRightKeyframes,
  slideInUpKeyframes,
  slideOutDownKeyframes,
  slideOutLeftKeyframes,
  slideOutRightKeyframes,
  slideOutUpKeyframes,
  spinKeyframes,
  swingKeyframes,
  tadaKeyframes,
  wobbleKeyframes,
  zoomInDownKeyframes,
  zoomInKeyframes,
  zoomInLeftKeyframes,
  zoomInRightKeyframes,
  zoomInUpKeyframes,
  zoomOutDownKeyframes,
  zoomOutKeyframes,
  zoomOutLeftKeyframes,
  zoomOutRightKeyframes,
  zoomOutUpKeyframes,
} from "@windijs/config";
import { animateHandler, createUtility } from "@windijs/core";

export default createUtility("animate")
  .use(animateHandler("none", "none"))
  .use(animateHandler("spin", "spin 1s linear infinite", spinKeyframes))
  .use(animateHandler("ping", "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", pingKeyframes))
  .use(animateHandler("pulse", "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", pulseKeyframes))
  .use(animateHandler("bounce", "bounce 1s infinite", bounceKeyframes))
  .use(animateHandler("shock", { animation: "shock", transformOrigin: "center bottom" }, shockKeyframes))
  .use(animateHandler("flash", "flash", flashKeyframes))
  .use(animateHandler("bubble", "bubble", bubbleKeyframes))
  .use(animateHandler("rubberBand", "rubberBand", rubberBandKeyframes))
  .use(animateHandler("shakeX", "shakeX", shakeXKeyframes))
  .use(animateHandler("shakeY", "shakeY", shakeYKeyframes))
  .use(animateHandler("headShake", "headShake 1s ease-in-out", headShakeKeyframes))
  .use(animateHandler("swing", { animation: "swing", transformOrigin: "top center" }, swingKeyframes))
  .use(animateHandler("tada", "tada", tadaKeyframes))
  .use(animateHandler("wobble", "wobble", wobbleKeyframes))
  .use(animateHandler("jello", "jello", jelloKeyframes))
  .use(animateHandler("heartBeat", "heartBeat 1s ease-in-out", heartBeatKeyframes))
  .use(animateHandler("hinge", "hinge 2s", hingeKeyframes))
  .use(animateHandler("jackIn", "jackInTheBox", jackInTheBoxKeyframes))
  .use(animateHandler("lightSpeedInLeft", "lightSpeedInLeft", lightSpeedInLeftKeyframes))
  .use(animateHandler("lightSpeedInRight", "lightSpeedInRight", lightSpeedInRightKeyframes))
  .use(animateHandler("lightSpeedOutLeft", "lightSpeedOutLeft", lightSpeedOutLeftKeyframes))
  .use(animateHandler("lightSpeedOutRight", "lightSpeedOutRight", lightSpeedOutRightKeyframes))
  .use(animateHandler("flip", { animation: "flip", backfaceVisibility: "visible" }, flipKeyframes))
  .use(animateHandler("flipInX", { animation: "flipInX", backfaceVisibility: "visible" }, flipInXKeyframes))
  .use(animateHandler("flipInY", { animation: "flipInY", backfaceVisibility: "visible" }, flipInYKeyframes))
  .use(animateHandler("flipOutX", { animation: "flipOutX", backfaceVisibility: "visible" }, flipOutXKeyframes))
  .use(animateHandler("flipOutY", { animation: "flipOutY", backfaceVisibility: "visible" }, flipOutYKeyframes))
  .use(animateHandler("rotateIn", "rotateIn", rotateInKeyframes))
  .use(animateHandler("rotateInDownLeft", "rotateInDownLeft", rotateInDownLeftKeyframes))
  .use(animateHandler("rotateInDownRight", "rotateInDownRight", rotateInDownRightKeyframes))
  .use(animateHandler("rotateInUpLeft", "rotateInUpLeft", rotateInUpLeftKeyframes))
  .use(animateHandler("rotateInUpRight", "rotateInUpRight", rotateInUpRightKeyframes))
  .use(animateHandler("rotateOut", "rotateOut", rotateOutKeyframes))
  .use(animateHandler("rotateOutDownLeft", "rotateOutDownLeft", rotateOutDownLeftKeyframes))
  .use(animateHandler("rotateOutDownRight", "rotateOutDownRight", rotateOutDownRightKeyframes))
  .use(animateHandler("rotateOutUpLeft", "rotateOutUpLeft", rotateOutUpLeftKeyframes))
  .use(animateHandler("rotateOutUpRight", "rotateOutUpRight", rotateOutUpRightKeyframes))
  .use(animateHandler("rollIn", "rollIn", rollInKeyframes))
  .use(animateHandler("rollOut", "rollOut", rollOutKeyframes))
  .use(animateHandler("zoomIn", "zoomIn", zoomInKeyframes))
  .use(animateHandler("zoomInDown", "zoomInDown", zoomInDownKeyframes))
  .use(animateHandler("zoomInLeft", "zoomInLeft", zoomInLeftKeyframes))
  .use(animateHandler("zoomInRight", "zoomInRight", zoomInRightKeyframes))
  .use(animateHandler("zoomInUp", "zoomInUp", zoomInUpKeyframes))
  .use(animateHandler("bounceIn", "bounceIn 750ms", bounceInKeyframes))
  .use(animateHandler("bounceInDown", "bounceInDown", bounceInDownKeyframes))
  .use(animateHandler("bounceInLeft", "bounceInLeft", bounceInLeftKeyframes))
  .use(animateHandler("bounceInRight", "bounceInRight", bounceInRightKeyframes))
  .use(animateHandler("bounceInUp", "bounceInUp", bounceInUpKeyframes))
  .use(animateHandler("bounceOut", "bounceOut 750ms", bounceOutKeyframes))
  .use(animateHandler("bounceOutDown", "bounceOutDown", bounceOutDownKeyframes))
  .use(animateHandler("bounceOutLeft", "bounceOutLeft", bounceOutLeftKeyframes))
  .use(animateHandler("bounceOutRight", "bounceOutRight", bounceOutRightKeyframes))
  .use(animateHandler("bounceOutUp", "bounceOutUp", bounceOutUpKeyframes))
  .use(animateHandler("zoomOut", "zoomOut", zoomOutKeyframes))
  .use(animateHandler("zoomOutDown", "zoomOutDown", zoomOutDownKeyframes))
  .use(animateHandler("zoomOutLeft", "zoomOutLeft", zoomOutLeftKeyframes))
  .use(animateHandler("zoomOutRight", "zoomOutRight", zoomOutRightKeyframes))
  .use(animateHandler("zoomOutUp", "zoomOutUp", zoomOutUpKeyframes))
  .use(animateHandler("slideInDown", "slideInDown", slideInDownKeyframes))
  .use(animateHandler("slideInLeft", "slideInLeft", slideInLeftKeyframes))
  .use(animateHandler("slideInRight", "slideInRight", slideInRightKeyframes))
  .use(animateHandler("slideInUp", "slideInUp", slideInUpKeyframes))
  .use(animateHandler("slideOutDown", "slideOutDown", slideOutDownKeyframes))
  .use(animateHandler("slideOutLeft", "slideOutLeft", slideOutLeftKeyframes))
  .use(animateHandler("slideOutRight", "slideOutRight", slideOutRightKeyframes))
  .use(animateHandler("slideOutUp", "slideOutUp", slideOutUpKeyframes))
  .use(animateHandler("fadeIn", "fadeIn", fadeInKeyframes))
  .use(animateHandler("fadeInDown", "fadeInDown", fadeInDownKeyframes))
  .use(animateHandler("fadeInDownBig", "fadeInDownBig", fadeInDownBigKeyframes))
  .use(animateHandler("fadeInLeft", "fadeInLeft", fadeInLeftKeyframes))
  .use(animateHandler("fadeInLeftBig", "fadeInLeftBig", fadeInLeftBigKeyframes))
  .use(animateHandler("fadeInRight", "fadeInRight", fadeInRightKeyframes))
  .use(animateHandler("fadeInRightBig", "fadeInRightBig", fadeInRightBigKeyframes))
  .use(animateHandler("fadeInUp", "fadeInUp", fadeInUpKeyframes))
  .use(animateHandler("fadeInUpBig", "fadeInUpBig", fadeInUpBigKeyframes))
  .use(animateHandler("fadeInTopLeft", "fadeInTopLeft", fadeInTopLeftKeyframes))
  .use(animateHandler("fadeInTopRight", "fadeInTopRight", fadeInTopRightKeyframes))
  .use(animateHandler("fadeInBottomLeft", "fadeInBottomLeft", fadeInBottomLeftKeyframes))
  .use(animateHandler("fadeInBottomRight", "fadeInBottomRight", fadeInBottomRightKeyframes))
  .use(animateHandler("fadeOut", "fadeOut", fadeOutKeyframes))
  .use(animateHandler("fadeOutDown", "fadeOutDown", fadeOutDownKeyframes))
  .use(animateHandler("fadeOutDownBig", "fadeOutDownBig", fadeOutDownBigKeyframes))
  .use(animateHandler("fadeOutLeft", "fadeOutLeft", fadeOutLeftKeyframes))
  .use(animateHandler("fadeOutLeftBig", "fadeOutLeftBig", fadeOutLeftBigKeyframes))
  .use(animateHandler("fadeOutRight", "fadeOutRight", fadeOutRightKeyframes))
  .use(animateHandler("fadeOutRightBig", "fadeOutRightBig", fadeOutRightBigKeyframes))
  .use(animateHandler("fadeOutUp", "fadeOutUp", fadeOutUpKeyframes))
  .use(animateHandler("fadeOutUpBig", "fadeOutUpBig", fadeOutUpBigKeyframes))
  .use(animateHandler("backInUp", "backInUp", backInUpKeyframes))
  .use(animateHandler("backInDown", "backInDown", backInDownKeyframes))
  .use(animateHandler("backInLeft", "backInLeft", backInLeftKeyframes))
  .use(animateHandler("backInRight", "backInRight", backInRightKeyframes))
  .use(animateHandler("backOutUp", "backOutUp", backOutUpKeyframes))
  .use(animateHandler("backOutDown", "backOutDown", backOutDownKeyframes))
  .use(animateHandler("backOutLeft", "backOutLeft", backOutLeftKeyframes))
  .use(animateHandler("backOutRight", "backOutRight", backOutRightKeyframes))
  .init();
