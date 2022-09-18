import { createUtility, animateHandler, configHandler, cssHandler, numberHandler, genericHandler, buildBackdropFilter, colorHandler, callHandler, buildLinearGradient, meld, buildGradientDirection, buildContainer, guard, divideXReverseHandler, buildDivideX, divideYReverseHandler, buildDivideY, buildDivideOpacity, buildDivideStyle, buildDivideColor, buildFilter, buildFlexDirection, buildFlexStretch, fontFamilyHandler, buildGradientFrom, buildImageRendering, buildPlaceholder, buildRingWidth, buildBoxShadowSize, buildBoxShadowColor, spaceBetweenXReverseHandler, buildSpaceBetweenX, spaceBetweenYReverseHandler, buildSpaceBetweenY, fontSizeHandler, pxHandler, buildGradientTo, buildTransform, buildTransition, buildGradientVia, buildWritingMode } from '@windijs/core';
import { spinKeyframes, pingKeyframes, pulseKeyframes, bounceKeyframes, shockKeyframes, flashKeyframes, bubbleKeyframes, rubberBandKeyframes, shakeXKeyframes, shakeYKeyframes, headShakeKeyframes, swingKeyframes, tadaKeyframes, wobbleKeyframes, jelloKeyframes, heartBeatKeyframes, hingeKeyframes, jackInTheBoxKeyframes, lightSpeedInLeftKeyframes, lightSpeedInRightKeyframes, lightSpeedOutLeftKeyframes, lightSpeedOutRightKeyframes, flipKeyframes, flipInXKeyframes, flipInYKeyframes, flipOutXKeyframes, flipOutYKeyframes, rotateInKeyframes, rotateInDownLeftKeyframes, rotateInDownRightKeyframes, rotateInUpLeftKeyframes, rotateInUpRightKeyframes, rotateOutKeyframes, rotateOutDownLeftKeyframes, rotateOutDownRightKeyframes, rotateOutUpLeftKeyframes, rotateOutUpRightKeyframes, rollInKeyframes, rollOutKeyframes, zoomInKeyframes, zoomInDownKeyframes, zoomInLeftKeyframes, zoomInRightKeyframes, zoomInUpKeyframes, bounceInKeyframes, bounceInDownKeyframes, bounceInLeftKeyframes, bounceInRightKeyframes, bounceInUpKeyframes, bounceOutKeyframes, bounceOutDownKeyframes, bounceOutLeftKeyframes, bounceOutRightKeyframes, bounceOutUpKeyframes, zoomOutKeyframes, zoomOutDownKeyframes, zoomOutLeftKeyframes, zoomOutRightKeyframes, zoomOutUpKeyframes, slideInDownKeyframes, slideInLeftKeyframes, slideInRightKeyframes, slideInUpKeyframes, slideOutDownKeyframes, slideOutLeftKeyframes, slideOutRightKeyframes, slideOutUpKeyframes, fadeInKeyframes, fadeInDownKeyframes, fadeInDownBigKeyframes, fadeInLeftKeyframes, fadeInLeftBigKeyframes, fadeInRightKeyframes, fadeInRightBigKeyframes, fadeInUpKeyframes, fadeInUpBigKeyframes, fadeInTopLeftKeyframes, fadeInTopRightKeyframes, fadeInBottomLeftKeyframes, fadeInBottomRightKeyframes, fadeOutKeyframes, fadeOutDownKeyframes, fadeOutDownBigKeyframes, fadeOutLeftKeyframes, fadeOutLeftBigKeyframes, fadeOutRightKeyframes, fadeOutRightBigKeyframes, fadeOutUpKeyframes, fadeOutUpBigKeyframes, backInUpKeyframes, backInDownKeyframes, backInLeftKeyframes, backInRightKeyframes, backOutUpKeyframes, backOutDownKeyframes, backOutLeftKeyframes, backOutRightKeyframes, aspectRatioConfig, gridAutoRowsConfig, gridAutoColumnsConfig, blurConfig, brightnessConfig, contrastConfig, grayscaleConfig, hueRotateConfig, invertConfig, opacityConfig, saturateConfig, sepiaConfig, backgroundAttachmentConfig, backgroundPositionConfig, backgroundRepeatConfig, backgroundSizeConfig, backgroundImageConfig, backgroundClipConfig, blendModeConfig, backgroundOriginConfig, gradientDirectionConfig, gradientConfig, borderStyleConfig, borderWidthConfig, gridColumnStartConfig, gridColumnEndConfig, gridColumnConfig, screens, textDecorationTypeConfig, textDecorationStyleConfig, textDecorationThicknessConfig, boxDecorationBreakConfig, textDecorationOffsetConfig, transitionDelayConfig, dropShadowConfig, transitionDurationConfig, transitionTimingFunctionConfig, flexDirectionConfig, flexWrapConfig, flexStretchConfig, flexGrowConfig, flexShrinkConfig, fontWeightConfig, fontFamilyConfig, fontStyleConfig, fontVariantNumericConfig, spacingConfig, gridTemplateColumnsConfig, gridTemplateRowsConfig, gridAutoFlowConfig, heightConfig, hyphensConfig, imageRenderingConfig, textIndentConfig, lineHeightConfig, listStyleTypeConfig, listStylePositionConfig, marginConfig, transformOriginConfig, outlineOffsetConfig, overflowConfig, overscrollConfig, paddingConfig, perspectiveConfig, perspectiveOriginConfig, transformStyleConfig, ringOffsetConfig, rotateConfig, borderRadiusConfig, gridRowStartConfig, gridRowEndConfig, gridRowConfig, scaleConfig, boxShadowConfig, skewConfig, spaceBetweenConfig, strokeLineCapConfig, strokeLineJoinConfig, tabSizeConfig, fontSizeConfig, textAlignConfig, verticalAlignConfig, textTransformConfig, textShadowConfig, textStrokeWidthConfig, whiteSpaceConfig, letterSpacingConfig, transitionPropertyConfig, translateConfig, widthConfig, writingModeConfig, writingOrientationConfig } from '@windijs/config';
import { css, prop, filters, transforms } from '@windijs/helpers';
import { baseColors, windiColors } from '@windijs/colors';

var animate = createUtility("animate")
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

const aspectBase = {
    position: "relative",
    "> *": {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
    },
};
var aspect = createUtility("aspect")
    .use(configHandler(aspectRatioConfig, "aspectRatio"))
    .case("none", cssHandler({
    position: "static",
    paddingBottom: "0",
    "> *": {
        position: "static",
        height: "auto",
        width: "auto",
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto",
    },
}))
    .case("w", numberHandler((v) => css({
    "--w-aspect-w": v,
    paddingBottom: "calc(var(--w-aspect-h) / var(--w-aspect-w) * 100%)",
    ...aspectBase,
})))
    .case("h", numberHandler((v) => css({
    "--w-aspect-h": v,
})))
    .use(genericHandler((v) => css({
    paddingBottom: +v * 100 + "%",
    ...aspectBase,
})))
    .init();

var auto = createUtility("auto")
    .case("rows", configHandler(gridAutoRowsConfig, "gridAutoRows"))
    .case("cols", configHandler(gridAutoColumnsConfig, "gridAutoColumns"))
    .init();

var backdrop = createUtility("backdrop")
    .use(cssHandler({
    "--w-backdrop-blur": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-brightness": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-contrast": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-grayscale": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-hue-rotate": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-invert": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-opacity": "var(--tw-empty,/*!*/ /*!*/)",
    "--w-backdrop-saturate": "var(--w-empty,/*!*/ /*!*/)",
    "--w-backdrop-sepia": "var(--w-empty,/*!*/ /*!*/)",
    "-webkit-backdrop-filter": "var(--w-backdrop-blur) var(--w-backdrop-brightness) var(--w-backdrop-contrast) var(--w-backdrop-grayscale) var(--w-backdrop-hue-rotate) var(--w-backdrop-invert) var(--w-backdrop-opacity) var(--w-backdrop-saturate) var(--w-backdrop-sepia)",
    backdropFilter: "var(--w-backdrop-blur) var(--w-backdrop-brightness) var(--w-backdrop-contrast) var(--w-backdrop-grayscale) var(--w-backdrop-hue-rotate) var(--w-backdrop-invert) var(--w-backdrop-opacity) var(--w-backdrop-saturate) var(--w-backdrop-sepia)",
}))
    .case("blur", configHandler(blurConfig, v => css({ "--w-backdrop-blur": `blur(${v})` })))
    .case("brightness", configHandler(brightnessConfig, v => css({ "--w-backdrop-brightness": `brightness(${v})` })))
    .case("contrast", configHandler(contrastConfig, v => css({ "--w-backdrop-contrast": `contrast(${v})` })))
    .case("grayscale", configHandler(grayscaleConfig, v => css({ "--w-backdrop-grayscale": `grayscale(${v})` })))
    .case("hueRotate", configHandler(hueRotateConfig, v => css({ "--w-backdrop-hue-rotate": `hue-rotate(${v})` })))
    .case("invert", configHandler(invertConfig, v => css({ "--w-backdrop-invert": `invert(${v})` })))
    .case("opacity", configHandler(opacityConfig, v => css({ "--w-backdrop-opacity": `opacity(${v})` })))
    .case("saturate", configHandler(saturateConfig, v => css({ "--w-backdrop-saturate": `saturate(${v})` })))
    .case("sepia", configHandler(sepiaConfig, v => css({ "--w-backdrop-sepia": `sepia(${v})` })))
    .init(buildBackdropFilter);

var colors = { ...baseColors, ...windiColors };

var bg = createUtility("bg")
    .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
    .use(configHandler(backgroundAttachmentConfig, "backgroundAttachment"))
    .use(configHandler(backgroundPositionConfig, "backgroundPosition"))
    .use(configHandler(backgroundRepeatConfig, "backgroundRepeat"))
    .use(configHandler(backgroundSizeConfig, "backgroundSize"))
    .use(configHandler(backgroundImageConfig, "backgroundImage"))
    .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop `-webkit-background-clip`]))
    .case("blend", configHandler(blendModeConfig, "backgroundBlendMode"))
    .case("origin", configHandler(backgroundOriginConfig, "backgroundOrigin"))
    .case("opacity", configHandler(opacityConfig, prop `--w-bg-opacity`))
    .case("gradient", callHandler(buildLinearGradient, meld(configHandler(gradientDirectionConfig, buildGradientDirection), configHandler(gradientConfig, "backgroundImage"))))
    .init();

var blend = createUtility("blend")
    .use(configHandler(blendModeConfig, "mixBlendMode"))
    .init();

var blur = createUtility("blur")
    .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
    .init(filters.blur);

var border = createUtility("border")
    .use(configHandler(borderStyleConfig, "borderStyle"))
    .use(configHandler(borderWidthConfig, "borderWidth"))
    .use(colorHandler(colors, "borderColor", "--w-border-opacity"))
    .case("opacity", configHandler(opacityConfig, prop `--w-border-opacity`))
    .init();

var brightness = createUtility("brightness")
    .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
    .init(filters.brightness);

var col = createUtility("col")
    .case("start", configHandler(gridColumnStartConfig, "gridColumnStart"))
    .case("end", configHandler(gridColumnEndConfig, "gridColumnEnd"))
    .use(configHandler(gridColumnConfig, "gridColumn"))
    .init();

var container = buildContainer(screens);

var contrast = createUtility("contrast")
    .use(configHandler(contrastConfig, v => css({ "--w-contrast": `contrast(${v})` })))
    .init(filters.contrast);

var decoration = createUtility("decoration")
    .use(configHandler(textDecorationTypeConfig, [prop `-webkit-text-decoration-line`, "textDecorationLine"]))
    .use(configHandler(textDecorationStyleConfig, [prop `-webkit-text-decoration-style`, "textDecorationStyle"]))
    .use(configHandler(textDecorationThicknessConfig, "textDecorationThickness"))
    .use(configHandler(boxDecorationBreakConfig, [prop `-webkit-box-decoration-break`, prop `box-decoration-break`]))
    .use(colorHandler(colors, [prop `-webkit-text-decoration-color`, "textDecorationColor"], "--w-text-decoration-opacity"))
    .case("opacity", configHandler(opacityConfig, prop `--w-text-decoration-opacity`))
    .case("offset", configHandler(textDecorationOffsetConfig, "textUnderlineOffset"))
    .init();

var delay = createUtility("delay")
    .use(configHandler(transitionDelayConfig, [prop `-webkit-transition-delay`, prop `-o-transition-delay`, "transitionDelay"]))
    .init();

var divide = createUtility("divide")
    .case("x", meld(guard("reverse", divideXReverseHandler()), configHandler(borderWidthConfig, buildDivideX)))
    .case("y", meld(guard("reverse", divideYReverseHandler()), configHandler(borderWidthConfig, buildDivideY)))
    .case("opacity", configHandler(opacityConfig, buildDivideOpacity))
    .use(configHandler(borderStyleConfig, buildDivideStyle))
    .use(colorHandler(colors, buildDivideColor))
    .init();

var dropShadow = createUtility("dropShadow")
    .use(configHandler(dropShadowConfig, v => css({ "--w-drop-shadow": Array.isArray(v) ? v.map(i => `drop-shadow(${i})`).join(" ") : `drop-shadow(${v})` })))
    .init(filters.dropShadow);

var duration = createUtility("duration")
    .use(configHandler(transitionDurationConfig, [prop `-webkit-transition-duration`, prop `-o-transition-duration`, "transitionDuration"]))
    .init();

var ease = createUtility("ease")
    .use(configHandler(transitionTimingFunctionConfig, [prop `-webkit-transition-timing-function`, prop `-o-transition-timing-function`, "transitionTimingFunction"]))
    .init();

var fill = createUtility("fill")
    .use(colorHandler({ none: "none", ...colors }, "fill"))
    .init();

var filter = createUtility("filter")
    .use(cssHandler({
    "--w-blur": "var(--w-empty,/*!*/ /*!*/)",
    "--w-brightness": "var(--w-empty,/*!*/ /*!*/)",
    "--w-contrast": "var(--w-empty,/*!*/ /*!*/)",
    "--w-grayscale": "var(--w-empty,/*!*/ /*!*/)",
    "--w-hue-rotate": "var(--w-empty,/*!*/ /*!*/)",
    "--w-invert": "var(--w-empty,/*!*/ /*!*/)",
    "--w-saturate": "var(--w-empty,/*!*/ /*!*/)",
    "--w-sepia": "var(--w-empty,/*!*/ /*!*/)",
    "--w-drop-shadow": "var(--w-empty,/*!*/ /*!*/)",
    "-webkit-filter": "var(--w-blur) var(--w-brightness) var(--w-contrast) var(--w-grayscale) var(--w-hue-rotate) var(--w-invert) var(--w-saturate) var(--w-sepia) var(--w-drop-shadow)",
    filter: "var(--w-blur) var(--w-brightness) var(--w-contrast) var(--w-grayscale) var(--w-hue-rotate) var(--w-invert) var(--w-saturate) var(--w-sepia) var(--w-drop-shadow)",
}))
    .init(buildFilter);

var flex = createUtility("flex")
    .use(cssHandler({ display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"] }))
    .use(configHandler(flexDirectionConfig, buildFlexDirection))
    .use(configHandler(flexWrapConfig, [prop `-ms-flex-wrap`, prop `-webkit-flex-wrap`, "flexWrap"]))
    .use(configHandler(flexStretchConfig, buildFlexStretch))
    .case("grow", configHandler(flexGrowConfig, [prop `-webkit-box-flex`, prop `-ms-flex-positive`, prop `-webkit-flex-grow`, "flexGrow"]))
    .case("shrink", configHandler(flexShrinkConfig, [prop `-ms-flex-negative`, prop `-webkit-flex-shrink`, "flexShrink"]))
    .init();

var font = createUtility("font")
    .case("normal", cssHandler({ fontStyle: "normal", fontWeight: fontWeightConfig.normal }))
    .case("antialiased", meld(cssHandler({
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
}), guard("auto", cssHandler({
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
}))))
    .use(fontFamilyHandler(fontFamilyConfig))
    .use(configHandler(fontStyleConfig, "fontStyle"))
    .use(configHandler(fontWeightConfig, "fontWeight"))
    .use(configHandler(fontVariantNumericConfig, "fontVariantNumeric"))
    .init();

var from = createUtility("from")
    .use(colorHandler(colors, buildGradientFrom))
    .init();

var gap = createUtility("gap")
    .use(configHandler(spacingConfig, ["gridGap", "gap"]))
    .case("x", configHandler(spacingConfig, [prop `-webkit-column-gap`, prop `-moz-column-gap`, "gridColumnGap", "columnGap"]))
    .case("y", configHandler(spacingConfig, [prop `-webkit-row-gap`, prop `-moz-row-gap`, "gridRowGap", "rowGap"]))
    .init();

var grayscale = createUtility("grayscale")
    .use(configHandler(grayscaleConfig, v => css({ "--w-grayscale": `grayscale(${v})` })))
    .init(filters.grayscale);

var grid = createUtility("grid")
    .case("cols", configHandler(gridTemplateColumnsConfig, "gridTemplateColumns"))
    .case("rows", configHandler(gridTemplateRowsConfig, "gridTemplateRows"))
    .case("inline", cssHandler({ display: ["-ms-inline-grid", "inline-grid"] }))
    .case("flow", configHandler(gridAutoFlowConfig, "gridAutoFlow"))
    .use(cssHandler({ display: ["-ms-grid", "grid"] }))
    .init();

var h = createUtility("h")
    .case("min", configHandler(heightConfig, "minHeight"))
    .case("max", configHandler(heightConfig, "maxHeight"))
    .use(configHandler(heightConfig, "height"))
    .init();

var hueRotate = createUtility("hueRotate")
    .use(configHandler(hueRotateConfig, v => css({ "--w-hue-rotate": `hue-rotate(${v})` })))
    .init(filters.hueRotate);

var hyphens = createUtility("hyphens")
    .use(configHandler(hyphensConfig, [prop `-webkit-hyphens`, prop `-ms-hyphens`, "hyphens"]))
    .init();

var image = createUtility("image")
    .case("render", configHandler(imageRenderingConfig, buildImageRendering))
    .init();

var indent = createUtility("indent")
    .use(configHandler(textIndentConfig, "textIndent"))
    .init();

var invert = createUtility("invert")
    .use(configHandler(invertConfig, v => css({ "--w-invert": `invert(${v})` })))
    .init(filters.invert);

var leading = createUtility("leading")
    .use(configHandler(lineHeightConfig, "lineHeight"))
    .init();

var list = createUtility("list")
    .use(configHandler(listStyleTypeConfig, "listStyleType"))
    .use(configHandler(listStylePositionConfig, "listStylePosition"))
    .init();

var m = createUtility("m")
    .use(configHandler(marginConfig, "margin"))
    .init();

var mb = createUtility("mb")
    .use(configHandler(marginConfig, "marginBottom"))
    .init();

var ml = createUtility("ml")
    .use(configHandler(marginConfig, "marginLeft"))
    .init();

var mr = createUtility("mr")
    .use(configHandler(marginConfig, "marginRight"))
    .init();

var mt = createUtility("mt")
    .use(configHandler(marginConfig, "marginTop"))
    .init();

var mx = createUtility("mx")
    .use(configHandler(marginConfig, ["marginLeft", "marginRight"]))
    .init();

var my = createUtility("my")
    .use(configHandler(marginConfig, ["marginTop", "marginBottom"]))
    .init();

var opacity = createUtility("opacity")
    .use(configHandler(opacityConfig, "opacity"))
    .init();

var origin = createUtility("origin")
    .use(configHandler(transformOriginConfig, [prop `-webkit-transform-origin`, prop `-ms-transform-origin`, "transformOrigin"]))
    .init();

var outline = createUtility("outline")
    .case("offset", configHandler(outlineOffsetConfig, "outlineOffset"))
    .case("opacity", configHandler(opacityConfig, prop `--w-outline-opacity`))
    .use(configHandler(borderWidthConfig, "outlineWidth"))
    .use(configHandler(borderStyleConfig, "outlineStyle"))
    .use(colorHandler(colors, "outlineColor", "--w-outline-opacity"))
    .init();

var overflow = createUtility("overflow")
    .use(configHandler(overflowConfig, "overflow"))
    .case("truncate", cssHandler({ overflow: "hidden", "-o-text-overflow": "ellipsis", textOverflow: "ellipsis", whiteSpace: "nowrap" }))
    .case("ellipsis", cssHandler({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }))
    .case("x", configHandler(overflowConfig, "overflowX"))
    .case("y", configHandler(overflowConfig, "overflowY"))
    .init();

var overscroll = createUtility("overscroll")
    .use(configHandler(overscrollConfig, "overscrollBehavior"))
    .case("x", configHandler(overscrollConfig, "overscrollBehaviorX"))
    .case("y", configHandler(overscrollConfig, "overscrollBehaviorY"))
    .init();

var p = createUtility("p")
    .use(configHandler(paddingConfig, "padding"))
    .init();

var pb = createUtility("pb")
    .use(configHandler(paddingConfig, "paddingBottom"))
    .init();

var perspect = createUtility("perspect")
    .use(configHandler(perspectiveConfig, [prop `-webkit-perspective`, "perspective"]))
    .case("origin", configHandler(perspectiveOriginConfig, [prop `-webkit-perspective-origin`, "perspectiveOrigin"]))
    .init();

var pl = createUtility("pl")
    .use(configHandler(paddingConfig, "paddingLeft"))
    .init();

var placeholder = createUtility("placeholder")
    .use(colorHandler(colors, buildPlaceholder))
    .case("opacity", configHandler(opacityConfig, prop `--w-placeholder-opacity`))
    .init();

var pr = createUtility("pr")
    .use(configHandler(paddingConfig, "paddingRight"))
    .init();

var preserve = createUtility("preserve")
    .use(configHandler(transformStyleConfig, [prop `-webkit-transform-style`, "transformStyle"]))
    .init();

var pt = createUtility("pt")
    .use(configHandler(paddingConfig, "paddingTop"))
    .init();

var px = createUtility("px")
    .use(configHandler(paddingConfig, ["paddingLeft", "paddingRight"]))
    .init();

var py = createUtility("py")
    .use(configHandler(paddingConfig, ["paddingTop", "paddingBottom"]))
    .init();

var ring = createUtility("ring")
    .case("opacity", configHandler(opacityConfig, prop `--w-ring-opacity`))
    .case("inset", cssHandler({ "--w-ring-inset": "inset" }))
    .case("offset", meld(colorHandler(colors, prop `--w-ring-offset-color`, "--w-ring-offset-opacity"), configHandler(ringOffsetConfig, prop `--w-ring-offset-width`), guard("opacity", configHandler(opacityConfig, prop `--w-ring-offset-opacity`))))
    .use(colorHandler(colors, prop `--w-ring-color`, "--w-ring-opacity"))
    .use(configHandler(borderWidthConfig, buildRingWidth))
    .init();

var rotate = createUtility("rotate")
    .use(configHandler(rotateConfig, prop `--w-rotate`))
    .case("x", configHandler(rotateConfig, prop `--w-rotate-x`))
    .case("y", configHandler(rotateConfig, prop `--w-rotate-y`))
    .case("z", configHandler(rotateConfig, prop `--w-rotate-z`))
    .init(transforms.rotate);

var rounded = createUtility("rounded")
    .use(configHandler(borderRadiusConfig, "borderRadius"))
    .init();

var row = createUtility("row")
    .case("start", configHandler(gridRowStartConfig, "gridRowStart"))
    .case("end", configHandler(gridRowEndConfig, "gridRowEnd"))
    .use(configHandler(gridRowConfig, "gridRow"))
    .init();

var saturate = createUtility("saturate")
    .use(configHandler(saturateConfig, v => css({ "--w-saturate": `saturate(${v})` })))
    .init(filters.saturate);

var scale = createUtility("scale")
    .use(configHandler(scaleConfig, [prop `--w-scale-x`, prop `--w-scale-y`, prop `--w-scale-z`]))
    .case("x", configHandler(scaleConfig, prop `--w-scale-x`))
    .case("y", configHandler(scaleConfig, prop `--w-scale-y`))
    .case("z", configHandler(scaleConfig, prop `--w-scale-z`))
    .init(transforms.scale);

var sepia = createUtility("sepia")
    .use(configHandler(sepiaConfig, v => css({ "--w-sepia": `sepia(${v})` })))
    .init(filters.sepia);

var shadow = createUtility("shadow")
    .use(configHandler(boxShadowConfig, buildBoxShadowSize))
    .use(colorHandler(colors, buildBoxShadowColor))
    .case("opacity", configHandler(opacityConfig, prop `--w-shadow-color-opacity`))
    .init();

var skew = createUtility("skew")
    .use(configHandler(skewConfig, [prop `--w-skew-x`, prop `--w-skew-y`]))
    .case("x", configHandler(skewConfig, prop `--w-skew-x`))
    .case("y", configHandler(skewConfig, prop `--w-skew-y`))
    .init(transforms.skew);

var space = createUtility("space")
    .case("x", meld(guard("reverse", spaceBetweenXReverseHandler()), configHandler(spaceBetweenConfig, buildSpaceBetweenX)))
    .case("y", meld(guard("reverse", spaceBetweenYReverseHandler()), configHandler(spaceBetweenConfig, buildSpaceBetweenY)))
    .init();

var sr = createUtility("sr")
    .case("only", cssHandler({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: "0",
}))
    .case("normal", cssHandler({
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    clip: "auto",
    whiteSpace: "normal",
}))
    .init();

var stroke = createUtility("stroke")
    .use(colorHandler({ none: "none", ...colors }, "stroke"))
    .case("dash", numberHandler("strokeDasharray"))
    .case("offset", numberHandler("strokeDashoffset"))
    .case("cap", configHandler(strokeLineCapConfig, "strokeLinecap"))
    .case("join", configHandler(strokeLineJoinConfig, "strokeLinejoin"))
    .use(numberHandler("strokeWidth"))
    .init();

var tab = createUtility("tab")
    .use(configHandler(tabSizeConfig, [prop `-moz-tab-size`, prop `-o-tab-size`, "tabSize"]))
    .init();

var text = createUtility("text")
    .use(fontSizeHandler(fontSizeConfig))
    .use(configHandler(textAlignConfig, "textAlign"))
    .use(configHandler(verticalAlignConfig, "verticalAlign"))
    .use(configHandler(textTransformConfig, "textTransform"))
    .use(colorHandler(colors, "color", "--w-text-opacity"))
    .case("opacity", configHandler(opacityConfig, prop `--w-text-opacity`))
    .case("shadow", configHandler(textShadowConfig, "textShadow"))
    .case("stroke", meld(configHandler(textStrokeWidthConfig, prop `-webkit-text-stroke-width`), colorHandler(colors, prop `-webkit-text-stroke-color`, "--w-text-stroke-opacity"), pxHandler(prop `-webkit-text-stroke-width`), guard("opacity", configHandler(opacityConfig, prop `--w-text-stroke-opacity`))))
    .case("space", configHandler(whiteSpaceConfig, "whiteSpace"))
    .case("break", meld(guard("normal", cssHandler({ wordBreak: "normal", overflowWrap: "normal" })), guard("words", cssHandler({ overflowWrap: "break-word" })), guard("all", cssHandler({ wordBreak: "break-all" }))))
    .init();

var to = createUtility("to")
    .use(colorHandler(colors, buildGradientTo))
    .init();

var tracking = createUtility("tracking")
    .use(configHandler(letterSpacingConfig, "letterSpacing"))
    .init();

var transform = createUtility("transform")
    .use(cssHandler({
    "--w-translate-x": "0",
    "--w-translate-y": "0",
    "--w-translate-z": "0",
    "--w-rotate": "0",
    "--w-rotate-x": "0",
    "--w-rotate-y": "0",
    "--w-rotate-z": "0",
    "--w-skew-x": "0",
    "--w-skew-y": "0",
    "--w-scale-x": "1",
    "--w-scale-y": "1",
    "--w-scale-z": "1",
    "-webkit-transform": "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
    "-ms-transform": "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
    transform: "translateX(var(--w-translate-x)) translateY(var(--w-translate-y)) translateZ(var(--w-translate-z)) rotate(var(--w-rotate)) rotateX(var(--w-rotate-x)) rotateY(var(--w-rotate-y)) rotateZ(var(--w-rotate-z)) skewX(var(--w-skew-x)) skewY(var(--w-skew-y)) scaleX(var(--w-scale-x)) scaleY(var(--w-scale-y)) scaleZ(var(--w-scale-z))",
}))
    .init(buildTransform);

var transition = createUtility("transition").use(configHandler(transitionPropertyConfig, (v) => {
    const timef = transitionTimingFunctionConfig.DEFAULT;
    const dur = transitionDurationConfig.DEFAULT;
    if (v === "none")
        return css({ transitionProperty: "none" });
    if (typeof v === "string") {
        return css({
            transitionProperty: v,
            "-webkit-transition-timing-function": timef,
            "-o-transition-timing-function": timef,
            transitionTimingFunction: timef,
            "-webkit-transition-duration": dur,
            "-o-transition-duration": dur,
            transitionDuration: dur,
        });
    }
}))
    .init(buildTransition);

var translate = createUtility("translate")
    .use(configHandler(translateConfig, [prop `--w-translate-x`, prop `--w-translate-y`, prop `--w-translate-z`]))
    .case("x", configHandler(translateConfig, prop `--w-translate-x`))
    .case("y", configHandler(translateConfig, prop `--w-translate-y`))
    .case("z", configHandler(translateConfig, prop `--w-translate-z`))
    .init(transforms.translate);

var via = createUtility("via")
    .use(colorHandler(colors, buildGradientVia))
    .init();

var w = createUtility("w")
    .case("min", configHandler(widthConfig, "minWidth"))
    .case("max", configHandler(widthConfig, "maxWidth"))
    .use(configHandler(widthConfig, "width"))
    .init();

var write = createUtility("write")
    .use(configHandler(writingModeConfig, buildWritingMode))
    .use(configHandler(writingOrientationConfig, [prop `-webkit-text-orientation`, "textOrientation"]))
    .init();

export { animate, aspect, auto, backdrop, bg, blend, blur, border, brightness, col, colors, container, contrast, decoration, delay, divide, dropShadow, duration, ease, fill, filter, flex, font, from, gap, grayscale, grid, h, hueRotate, hyphens, image, indent, invert, leading, list, m, mb, ml, mr, mt, mx, my, opacity, origin, outline, overflow, overscroll, p, pb, perspect, pl, placeholder, pr, preserve, pt, px, py, ring, rotate, rounded, row, saturate, scale, sepia, shadow, skew, space, sr, stroke, tab, text, to, tracking, transform, transition, translate, via, w, write };
