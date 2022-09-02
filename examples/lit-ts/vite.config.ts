import { defineConfig } from 'vite'

const fileRegex = /\.(js|ts)$/

function injectDepend(src: string) {
  const depends = [
    "accentColor", "additiveSymbols", "alignContent", "color", "alignItems", "alignSelf", "alignTracks", "all", "alt", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimeline", "animationTimingFunction", "appearance", "ascentOverride", "aspectRatio", "azimuth", "backdropFilter", "backfaceVisibility", "background", "backgroundAttachment", "backgroundBlendMode", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPosition", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize", "behavior", "bleed", "blockSize", "border", "borderBlock", "borderBlockColor", "borderBlockEnd", "borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth", "borderBlockStart", "borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth", "borderBlockStyle", "borderBlockWidth", "borderBottom", "borderBottomColor", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStyle", "borderBottomWidth", "borderCollapse", "borderColor", "borderEndEndRadius", "borderEndStartRadius", "borderImage", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderInline", "borderInlineColor", "borderInlineEnd", "borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth", "borderInlineStart", "borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth", "borderInlineStyle", "borderInlineWidth", "borderLeft", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRadius", "borderRight", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderSpacing", "borderStartEndRadius", "borderStartStartRadius", "borderStyle", "borderTop", "borderTopColor", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStyle", "borderTopWidth", "borderWidth", "bottom", "boxAlign", "boxDecorationBreak", "boxDirection", "boxFlex", "boxFlexGroup", "boxLines", "boxOrdinalGroup", "boxOrient", "boxPack", "boxShadow", "boxSizing", "breakAfter", "breakBefore", "breakInside", "captionSide", "caretColor", "clear", "clip", "clipPath", "clipRule", "colorInterpolationFilters", "colorScheme", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "contain", "content", "contentVisibility", "counterIncrement", "counterReset", "counterSet", "cursor", "descentOverride", "direction", "display", "emptyCells", "enableBackground", "fallback", "fill", "fillOpacity", "fillRule", "filter", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "float", "floodColor", "floodOpacity", "font", "fontDisplay", "fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontOpticalSizing", "fontSize", "fontSizeAdjust", "fontSmooth", "fontStretch", "fontStyle", "fontSynthesis", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontVariationSettings", "fontWeight", "forcedColorAdjust", "gap", "glyphOrientationHorizontal", "glyphOrientationVertical", "grid", "gridArea", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridColumn", "gridColumnEnd", "gridColumnGap", "gridColumnStart", "gridGap", "gridRow", "gridRowEnd", "gridRowGap", "gridRowStart", "gridTemplate", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows", "hangingPunctuation", "height", "hyphenateCharacter", "hyphens", "imageOrientation", "imageRendering", "imageResolution", "imeMode", "inherits", "initialLetter", "initialLetterAlign", "initialValue", "inlineSize", "inputSecurity", "insetBlock", "insetBlockEnd", "insetBlockStart", "insetInline", "insetInlineEnd", "insetInlineStart", "isolation", "justifyContent", "justifyItems", "justifySelf", "justifyTracks", "kerning", "left", "letterSpacing", "lightingColor", "lineBreak", "lineClamp", "lineGapOverride", "lineHeight", "lineHeightStep", "listStyle", "listStyleImage", "listStylePosition", "listStyleType", "margin", "marginBlock", "marginBlockEnd", "marginBlockStart", "marginBottom", "marginInline", "marginInlineEnd", "marginInlineStart", "marginLeft", "marginRight", "marginTop", "marginTrim", "marker", "markerEnd", "markerMid", "markerStart", "marks", "mask", "maskBorder", "maskBorderMode", "maskBorderOutset", "maskBorderRepeat", "maskBorderSlice", "maskBorderSource", "maskBorderWidth", "maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPosition", "maskRepeat", "maskSize", "maskType", "masonryAutoFlow", "mathStyle", "maxBlockSize", "maxHeight", "maxInlineSize", "maxLines", "maxWidth", "maxZoom", "minBlockSize", "minHeight", "minInlineSize", "minWidth", "minZoom", "mixBlendMode", "motion", "motionOffset", "motionPath", "motionRotation", "navDown", "navIndex", "navLeft", "navRight", "navUp", "negative", "objectFit", "objectPosition", "offset", "offsetAnchor", "offsetBlockEnd", "offsetBlockStart", "offsetDistance", "offsetInlineEnd", "offsetInlineStart", "offsetPath", "offsetPosition", "offsetRotate", "order", "orphans", "outline", "outlineColor", "outlineOffset", "outlineStyle", "outlineWidth", "overflow", "overflowAnchor", "overflowBlock", "overflowClipBox", "overflowClipMargin", "overflowInline", "overflowWrap", "overflowX", "overflowY", "overscrollBehavior", "overscrollBehaviorBlock", "overscrollBehaviorInline", "overscrollBehaviorX", "overscrollBehaviorY", "pad", "padding", "paddingBlock", "paddingBlockEnd", "paddingBlockStart", "paddingBottom", "paddingInline", "paddingInlineEnd", "paddingInlineStart", "paddingLeft", "paddingRight", "paddingTop", "pageBreakAfter", "pageBreakBefore", "pageBreakInside", "paintOrder", "perspectiveOrigin", "placeContent", "placeItems", "placeSelf", "pointerEvents", "position", "prefix", "printColorAdjust", "quotes", "range", "resize", "right", "rowGap", "rubyAlign", "rubyMerge", "rubyOverhang", "rubyPosition", "rubySpan", "scrollBehavior", "scrollMargin", "scrollMarginBlock", "scrollMarginBlockEnd", "scrollMarginBlockStart", "scrollMarginBottom", "scrollMarginInline", "scrollMarginInlineEnd", "scrollMarginInlineStart", "scrollMarginLeft", "scrollMarginRight", "scrollMarginTop", "scrollPadding", "scrollPaddingBlock", "scrollPaddingBlockEnd", "scrollPaddingBlockStart", "scrollPaddingBottom", "scrollPaddingInline", "scrollPaddingInlineEnd", "scrollPaddingInlineStart", "scrollPaddingLeft", "scrollPaddingRight", "scrollPaddingTop", "scrollSnapAlign", "scrollSnapCoordinate", "scrollSnapDestination", "scrollSnapPointsX", "scrollSnapPointsY", "scrollSnapStop", "scrollSnapType", "scrollSnapTypeX", "scrollSnapTypeY", "scrollbarArrowColor", "scrollbarBaseColor", "scrollbarColor", "scrollbarDarkshadowColor", "scrollbarFaceColor", "scrollbarGutter", "scrollbarHighlightColor", "scrollbarShadowColor", "scrollbarTrackColor", "scrollbarWidth", "shapeImageThreshold", "shapeMargin", "shapeOutside", "shapeRendering", "size", "sizeAdjust", "speakAs", "src", "stopColor", "stopOpacity", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "suffix", "symbols", "syntax", "system", "tabSize", "tableLayout", "textAlign", "textAlignLast", "textAnchor", "textCombineUpright", "textDecoration", "textDecorationColor", "textDecorationLine", "textDecorationSkip", "textDecorationSkipInk", "textDecorationStyle", "textDecorationThickness", "textEmphasis", "textEmphasisColor", "textEmphasisPosition", "textEmphasisStyle", "textIndent", "textJustify", "textOrientation", "textOverflow", "textRendering", "textShadow", "textSizeAdjust", "textTransform", "textUnderlineOffset", "textUnderlinePosition", "touchAction", "transform", "transformBox", "transformOrigin", "transformStyle", "transition", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction", "unicodeBidi", "unicodeRange", "userSelect", "userZoom", "verticalAlign", "viewportFit", "visibility", "whiteSpace", "widows", "width", "willChange", "wordBreak", "wordSpacing", "wordWrap", "writingMode", "zIndex", "zoom"
  ]

  const codes = []

  codes.push(`import { style } from "@windijs/style"`)
  codes.push(`const { ${depends.join(", ")} } = style`)

  return codes.map(i => i + ";").join("\n") + src;
}

function windiJS() {
  return {
    name: 'windijs',

    transform(src, id) {
      if (id.endsWith("src/windi.ts")) {
        return {
          code: ((src: string) => `\ntype Bg = typeof bg;

          declare global {
            const bg: Bg
          }` + src)(src),
          map: null
        }
      } else if (fileRegex.test(id) && !id.endsWith("src/windi.ts")) {
        return {
          code: injectDepend(src),
          map: null
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  },
  plugins: [
    windiJS()
  ]
})
