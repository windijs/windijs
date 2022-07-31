import type { style } from "../plugins/style";

declare global {
  const accentColor: typeof style["accentColor"];
  const additiveSymbols: typeof style["additiveSymbols"];
  const alignContent: typeof style["alignContent"];
  const alignItems: typeof style["alignItems"];
  const alignSelf: typeof style["alignSelf"];
  const alignTracks: typeof style["alignTracks"];
  const all: typeof style["all"];
  const alt: typeof style["alt"];
  const animation: typeof style["animation"];
  const animationDelay: typeof style["animationDelay"];
  const animationDirection: typeof style["animationDirection"];
  const animationDuration: typeof style["animationDuration"];
  const animationFillMode: typeof style["animationFillMode"];
  const animationIterationCount: typeof style["animationIterationCount"];
  const animationName: typeof style["animationName"];
  const animationPlayState: typeof style["animationPlayState"];
  const animationTimeline: typeof style["animationTimeline"];
  const animationTimingFunction: typeof style["animationTimingFunction"];
  const appearance: typeof style["appearance"];
  const ascentOverride: typeof style["ascentOverride"];
  const aspectRatio: typeof style["aspectRatio"];
  const azimuth: typeof style["azimuth"];
  const backdropFilter: typeof style["backdropFilter"];
  const backfaceVisibility: typeof style["backfaceVisibility"];
  const background: typeof style["background"];
  const backgroundAttachment: typeof style["backgroundAttachment"];
  const backgroundBlendMode: typeof style["backgroundBlendMode"];
  const backgroundClip: typeof style["backgroundClip"];
  const backgroundColor: typeof style["backgroundColor"];
  const backgroundImage: typeof style["backgroundImage"];
  const backgroundOrigin: typeof style["backgroundOrigin"];
  const backgroundPosition: typeof style["backgroundPosition"];
  const backgroundPositionX: typeof style["backgroundPositionX"];
  const backgroundPositionY: typeof style["backgroundPositionY"];
  const backgroundRepeat: typeof style["backgroundRepeat"];
  const backgroundSize: typeof style["backgroundSize"];
  const behavior: typeof style["behavior"];
  const bleed: typeof style["bleed"];
  const blockSize: typeof style["blockSize"];
  const border: typeof style["border"];
  const borderBlock: typeof style["borderBlock"];
  const borderBlockColor: typeof style["borderBlockColor"];
  const borderBlockEnd: typeof style["borderBlockEnd"];
  const borderBlockEndColor: typeof style["borderBlockEndColor"];
  const borderBlockEndStyle: typeof style["borderBlockEndStyle"];
  const borderBlockEndWidth: typeof style["borderBlockEndWidth"];
  const borderBlockStart: typeof style["borderBlockStart"];
  const borderBlockStartColor: typeof style["borderBlockStartColor"];
  const borderBlockStartStyle: typeof style["borderBlockStartStyle"];
  const borderBlockStartWidth: typeof style["borderBlockStartWidth"];
  const borderBlockStyle: typeof style["borderBlockStyle"];
  const borderBlockWidth: typeof style["borderBlockWidth"];
  const borderBottom: typeof style["borderBottom"];
  const borderBottomColor: typeof style["borderBottomColor"];
  const borderBottomLeftRadius: typeof style["borderBottomLeftRadius"];
  const borderBottomRightRadius: typeof style["borderBottomRightRadius"];
  const borderBottomStyle: typeof style["borderBottomStyle"];
  const borderBottomWidth: typeof style["borderBottomWidth"];
  const borderCollapse: typeof style["borderCollapse"];
  const borderColor: typeof style["borderColor"];
  const borderEndEndRadius: typeof style["borderEndEndRadius"];
  const borderEndStartRadius: typeof style["borderEndStartRadius"];
  const borderImage: typeof style["borderImage"];
  const borderImageOutset: typeof style["borderImageOutset"];
  const borderImageRepeat: typeof style["borderImageRepeat"];
  const borderImageSlice: typeof style["borderImageSlice"];
  const borderImageSource: typeof style["borderImageSource"];
  const borderImageWidth: typeof style["borderImageWidth"];
  const borderInline: typeof style["borderInline"];
  const borderInlineColor: typeof style["borderInlineColor"];
  const borderInlineEnd: typeof style["borderInlineEnd"];
  const borderInlineEndColor: typeof style["borderInlineEndColor"];
  const borderInlineEndStyle: typeof style["borderInlineEndStyle"];
  const borderInlineEndWidth: typeof style["borderInlineEndWidth"];
  const borderInlineStart: typeof style["borderInlineStart"];
  const borderInlineStartColor: typeof style["borderInlineStartColor"];
  const borderInlineStartStyle: typeof style["borderInlineStartStyle"];
  const borderInlineStartWidth: typeof style["borderInlineStartWidth"];
  const borderInlineStyle: typeof style["borderInlineStyle"];
  const borderInlineWidth: typeof style["borderInlineWidth"];
  const borderLeft: typeof style["borderLeft"];
  const borderLeftColor: typeof style["borderLeftColor"];
  const borderLeftStyle: typeof style["borderLeftStyle"];
  const borderLeftWidth: typeof style["borderLeftWidth"];
  const borderRadius: typeof style["borderRadius"];
  const borderRight: typeof style["borderRight"];
  const borderRightColor: typeof style["borderRightColor"];
  const borderRightStyle: typeof style["borderRightStyle"];
  const borderRightWidth: typeof style["borderRightWidth"];
  const borderSpacing: typeof style["borderSpacing"];
  const borderStartEndRadius: typeof style["borderStartEndRadius"];
  const borderStartStartRadius: typeof style["borderStartStartRadius"];
  const borderStyle: typeof style["borderStyle"];
  const borderTop: typeof style["borderTop"];
  const borderTopColor: typeof style["borderTopColor"];
  const borderTopLeftRadius: typeof style["borderTopLeftRadius"];
  const borderTopRightRadius: typeof style["borderTopRightRadius"];
  const borderTopStyle: typeof style["borderTopStyle"];
  const borderTopWidth: typeof style["borderTopWidth"];
  const borderWidth: typeof style["borderWidth"];
  const bottom: typeof style["bottom"];
  const boxAlign: typeof style["boxAlign"];
  const boxDecorationBreak: typeof style["boxDecorationBreak"];
  const boxDirection: typeof style["boxDirection"];
  const boxFlex: typeof style["boxFlex"];
  const boxFlexGroup: typeof style["boxFlexGroup"];
  const boxLines: typeof style["boxLines"];
  const boxOrdinalGroup: typeof style["boxOrdinalGroup"];
  const boxOrient: typeof style["boxOrient"];
  const boxPack: typeof style["boxPack"];
  const boxShadow: typeof style["boxShadow"];
  const boxSizing: typeof style["boxSizing"];
  const breakAfter: typeof style["breakAfter"];
  const breakBefore: typeof style["breakBefore"];
  const breakInside: typeof style["breakInside"];
  const captionSide: typeof style["captionSide"];
  const caretColor: typeof style["caretColor"];
  const clear: typeof style["clear"];
  const clip: typeof style["clip"];
  const clipPath: typeof style["clipPath"];
  const clipRule: typeof style["clipRule"];
  const color: typeof style["color"];
  const colorInterpolationFilters: typeof style["colorInterpolationFilters"];
  const colorScheme: typeof style["colorScheme"];
  const columnCount: typeof style["columnCount"];
  const columnFill: typeof style["columnFill"];
  const columnGap: typeof style["columnGap"];
  const columnRule: typeof style["columnRule"];
  const columnRuleColor: typeof style["columnRuleColor"];
  const columnRuleStyle: typeof style["columnRuleStyle"];
  const columnRuleWidth: typeof style["columnRuleWidth"];
  const columnSpan: typeof style["columnSpan"];
  const columnWidth: typeof style["columnWidth"];
  const columns: typeof style["columns"];
  const contain: typeof style["contain"];
  const content: typeof style["content"];
  const contentVisibility: typeof style["contentVisibility"];
  const counterIncrement: typeof style["counterIncrement"];
  const counterReset: typeof style["counterReset"];
  const counterSet: typeof style["counterSet"];
  const cursor: typeof style["cursor"];
  const descentOverride: typeof style["descentOverride"];
  const direction: typeof style["direction"];
  const display: typeof style["display"];
  const emptyCells: typeof style["emptyCells"];
  const enableBackground: typeof style["enableBackground"];
  const fallback: typeof style["fallback"];
  const fill: typeof style["fill"];
  const fillOpacity: typeof style["fillOpacity"];
  const fillRule: typeof style["fillRule"];
  const filter: typeof style["filter"];
  const flex: typeof style["flex"];
  const flexBasis: typeof style["flexBasis"];
  const flexDirection: typeof style["flexDirection"];
  const flexFlow: typeof style["flexFlow"];
  const flexGrow: typeof style["flexGrow"];
  const flexShrink: typeof style["flexShrink"];
  const flexWrap: typeof style["flexWrap"];
  const float: typeof style["float"];
  const floodColor: typeof style["floodColor"];
  const floodOpacity: typeof style["floodOpacity"];
  const font: typeof style["font"];
  const fontDisplay: typeof style["fontDisplay"];
  const fontFamily: typeof style["fontFamily"];
  const fontFeatureSettings: typeof style["fontFeatureSettings"];
  const fontKerning: typeof style["fontKerning"];
  const fontLanguageOverride: typeof style["fontLanguageOverride"];
  const fontOpticalSizing: typeof style["fontOpticalSizing"];
  const fontSize: typeof style["fontSize"];
  const fontSizeAdjust: typeof style["fontSizeAdjust"];
  const fontSmooth: typeof style["fontSmooth"];
  const fontStretch: typeof style["fontStretch"];
  const fontStyle: typeof style["fontStyle"];
  const fontSynthesis: typeof style["fontSynthesis"];
  const fontVariant: typeof style["fontVariant"];
  const fontVariantAlternates: typeof style["fontVariantAlternates"];
  const fontVariantCaps: typeof style["fontVariantCaps"];
  const fontVariantEastAsian: typeof style["fontVariantEastAsian"];
  const fontVariantLigatures: typeof style["fontVariantLigatures"];
  const fontVariantNumeric: typeof style["fontVariantNumeric"];
  const fontVariantPosition: typeof style["fontVariantPosition"];
  const fontVariationSettings: typeof style["fontVariationSettings"];
  const fontWeight: typeof style["fontWeight"];
  const forcedColorAdjust: typeof style["forcedColorAdjust"];
  const gap: typeof style["gap"];
  const glyphOrientationHorizontal: typeof style["glyphOrientationHorizontal"];
  const glyphOrientationVertical: typeof style["glyphOrientationVertical"];
  const grid: typeof style["grid"];
  const gridArea: typeof style["gridArea"];
  const gridAutoColumns: typeof style["gridAutoColumns"];
  const gridAutoFlow: typeof style["gridAutoFlow"];
  const gridAutoRows: typeof style["gridAutoRows"];
  const gridColumn: typeof style["gridColumn"];
  const gridColumnEnd: typeof style["gridColumnEnd"];
  const gridColumnGap: typeof style["gridColumnGap"];
  const gridColumnStart: typeof style["gridColumnStart"];
  const gridGap: typeof style["gridGap"];
  const gridRow: typeof style["gridRow"];
  const gridRowEnd: typeof style["gridRowEnd"];
  const gridRowGap: typeof style["gridRowGap"];
  const gridRowStart: typeof style["gridRowStart"];
  const gridTemplate: typeof style["gridTemplate"];
  const gridTemplateAreas: typeof style["gridTemplateAreas"];
  const gridTemplateColumns: typeof style["gridTemplateColumns"];
  const gridTemplateRows: typeof style["gridTemplateRows"];
  const hangingPunctuation: typeof style["hangingPunctuation"];
  const height: typeof style["height"];
  const hyphenateCharacter: typeof style["hyphenateCharacter"];
  const hyphens: typeof style["hyphens"];
  const imageOrientation: typeof style["imageOrientation"];
  const imageRendering: typeof style["imageRendering"];
  const imageResolution: typeof style["imageResolution"];
  const imeMode: typeof style["imeMode"];
  const inherits: typeof style["inherits"];
  const initialLetter: typeof style["initialLetter"];
  const initialLetterAlign: typeof style["initialLetterAlign"];
  const initialValue: typeof style["initialValue"];
  const inlineSize: typeof style["inlineSize"];
  const inputSecurity: typeof style["inputSecurity"];
  const inset: typeof style["inset"];
  const insetBlock: typeof style["insetBlock"];
  const insetBlockEnd: typeof style["insetBlockEnd"];
  const insetBlockStart: typeof style["insetBlockStart"];
  const insetInline: typeof style["insetInline"];
  const insetInlineEnd: typeof style["insetInlineEnd"];
  const insetInlineStart: typeof style["insetInlineStart"];
  const isolation: typeof style["isolation"];
  const justifyContent: typeof style["justifyContent"];
  const justifyItems: typeof style["justifyItems"];
  const justifySelf: typeof style["justifySelf"];
  const justifyTracks: typeof style["justifyTracks"];
  const kerning: typeof style["kerning"];
  const left: typeof style["left"];
  const letterSpacing: typeof style["letterSpacing"];
  const lightingColor: typeof style["lightingColor"];
  const lineBreak: typeof style["lineBreak"];
  const lineClamp: typeof style["lineClamp"];
  const lineGapOverride: typeof style["lineGapOverride"];
  const lineHeight: typeof style["lineHeight"];
  const lineHeightStep: typeof style["lineHeightStep"];
  const listStyle: typeof style["listStyle"];
  const listStyleImage: typeof style["listStyleImage"];
  const listStylePosition: typeof style["listStylePosition"];
  const listStyleType: typeof style["listStyleType"];
  const margin: typeof style["margin"];
  const marginBlock: typeof style["marginBlock"];
  const marginBlockEnd: typeof style["marginBlockEnd"];
  const marginBlockStart: typeof style["marginBlockStart"];
  const marginBottom: typeof style["marginBottom"];
  const marginInline: typeof style["marginInline"];
  const marginInlineEnd: typeof style["marginInlineEnd"];
  const marginInlineStart: typeof style["marginInlineStart"];
  const marginLeft: typeof style["marginLeft"];
  const marginRight: typeof style["marginRight"];
  const marginTop: typeof style["marginTop"];
  const marginTrim: typeof style["marginTrim"];
  const marker: typeof style["marker"];
  const markerEnd: typeof style["markerEnd"];
  const markerMid: typeof style["markerMid"];
  const markerStart: typeof style["markerStart"];
  const marks: typeof style["marks"];
  const mask: typeof style["mask"];
  const maskBorder: typeof style["maskBorder"];
  const maskBorderMode: typeof style["maskBorderMode"];
  const maskBorderOutset: typeof style["maskBorderOutset"];
  const maskBorderRepeat: typeof style["maskBorderRepeat"];
  const maskBorderSlice: typeof style["maskBorderSlice"];
  const maskBorderSource: typeof style["maskBorderSource"];
  const maskBorderWidth: typeof style["maskBorderWidth"];
  const maskClip: typeof style["maskClip"];
  const maskComposite: typeof style["maskComposite"];
  const maskImage: typeof style["maskImage"];
  const maskMode: typeof style["maskMode"];
  const maskOrigin: typeof style["maskOrigin"];
  const maskPosition: typeof style["maskPosition"];
  const maskRepeat: typeof style["maskRepeat"];
  const maskSize: typeof style["maskSize"];
  const maskType: typeof style["maskType"];
  const masonryAutoFlow: typeof style["masonryAutoFlow"];
  const mathStyle: typeof style["mathStyle"];
  const maxBlockSize: typeof style["maxBlockSize"];
  const maxHeight: typeof style["maxHeight"];
  const maxInlineSize: typeof style["maxInlineSize"];
  const maxLines: typeof style["maxLines"];
  const maxWidth: typeof style["maxWidth"];
  const maxZoom: typeof style["maxZoom"];
  const minBlockSize: typeof style["minBlockSize"];
  const minHeight: typeof style["minHeight"];
  const minInlineSize: typeof style["minInlineSize"];
  const minWidth: typeof style["minWidth"];
  const minZoom: typeof style["minZoom"];
  const mixBlendMode: typeof style["mixBlendMode"];
  const motion: typeof style["motion"];
  const motionOffset: typeof style["motionOffset"];
  const motionPath: typeof style["motionPath"];
  const motionRotation: typeof style["motionRotation"];
  const navDown: typeof style["navDown"];
  const navIndex: typeof style["navIndex"];
  const navLeft: typeof style["navLeft"];
  const navRight: typeof style["navRight"];
  const navUp: typeof style["navUp"];
  const negative: typeof style["negative"];
  const objectFit: typeof style["objectFit"];
  const objectPosition: typeof style["objectPosition"];
  const offset: typeof style["offset"];
  const offsetAnchor: typeof style["offsetAnchor"];
  const offsetBlockEnd: typeof style["offsetBlockEnd"];
  const offsetBlockStart: typeof style["offsetBlockStart"];
  const offsetDistance: typeof style["offsetDistance"];
  const offsetInlineEnd: typeof style["offsetInlineEnd"];
  const offsetInlineStart: typeof style["offsetInlineStart"];
  const offsetPath: typeof style["offsetPath"];
  const offsetPosition: typeof style["offsetPosition"];
  const offsetRotate: typeof style["offsetRotate"];
  const opacity: typeof style["opacity"];
  const order: typeof style["order"];
  // const orientation: typeof style["orientation"]
  const orphans: typeof style["orphans"];
  const outline: typeof style["outline"];
  const outlineColor: typeof style["outlineColor"];
  const outlineOffset: typeof style["outlineOffset"];
  const outlineStyle: typeof style["outlineStyle"];
  const outlineWidth: typeof style["outlineWidth"];
  const overflow: typeof style["overflow"];
  const overflowAnchor: typeof style["overflowAnchor"];
  const overflowBlock: typeof style["overflowBlock"];
  const overflowClipBox: typeof style["overflowClipBox"];
  const overflowClipMargin: typeof style["overflowClipMargin"];
  const overflowInline: typeof style["overflowInline"];
  const overflowWrap: typeof style["overflowWrap"];
  const overflowX: typeof style["overflowX"];
  const overflowY: typeof style["overflowY"];
  const overscrollBehavior: typeof style["overscrollBehavior"];
  const overscrollBehaviorBlock: typeof style["overscrollBehaviorBlock"];
  const overscrollBehaviorInline: typeof style["overscrollBehaviorInline"];
  const overscrollBehaviorX: typeof style["overscrollBehaviorX"];
  const overscrollBehaviorY: typeof style["overscrollBehaviorY"];
  const pad: typeof style["pad"];
  const padding: typeof style["padding"];
  const paddingBlock: typeof style["paddingBlock"];
  const paddingBlockEnd: typeof style["paddingBlockEnd"];
  const paddingBlockStart: typeof style["paddingBlockStart"];
  const paddingBottom: typeof style["paddingBottom"];
  const paddingInline: typeof style["paddingInline"];
  const paddingInlineEnd: typeof style["paddingInlineEnd"];
  const paddingInlineStart: typeof style["paddingInlineStart"];
  const paddingLeft: typeof style["paddingLeft"];
  const paddingRight: typeof style["paddingRight"];
  const paddingTop: typeof style["paddingTop"];
  const pageBreakAfter: typeof style["pageBreakAfter"];
  const pageBreakBefore: typeof style["pageBreakBefore"];
  const pageBreakInside: typeof style["pageBreakInside"];
  const paintOrder: typeof style["paintOrder"];
  const perspective: typeof style["perspective"];
  const perspectiveOrigin: typeof style["perspectiveOrigin"];
  const placeContent: typeof style["placeContent"];
  const placeItems: typeof style["placeItems"];
  const placeSelf: typeof style["placeSelf"];
  const pointerEvents: typeof style["pointerEvents"];
  const position: typeof style["position"];
  const prefix: typeof style["prefix"];
  const printColorAdjust: typeof style["printColorAdjust"];
  const quotes: typeof style["quotes"];
  const range: typeof style["range"];
  const resize: typeof style["resize"];
  const right: typeof style["right"];
  const rotate: typeof style["rotate"];
  const rowGap: typeof style["rowGap"];
  const rubyAlign: typeof style["rubyAlign"];
  const rubyMerge: typeof style["rubyMerge"];
  const rubyOverhang: typeof style["rubyOverhang"];
  const rubyPosition: typeof style["rubyPosition"];
  const rubySpan: typeof style["rubySpan"];
  const scale: typeof style["scale"];
  const scrollBehavior: typeof style["scrollBehavior"];
  const scrollMargin: typeof style["scrollMargin"];
  const scrollMarginBlock: typeof style["scrollMarginBlock"];
  const scrollMarginBlockEnd: typeof style["scrollMarginBlockEnd"];
  const scrollMarginBlockStart: typeof style["scrollMarginBlockStart"];
  const scrollMarginBottom: typeof style["scrollMarginBottom"];
  const scrollMarginInline: typeof style["scrollMarginInline"];
  const scrollMarginInlineEnd: typeof style["scrollMarginInlineEnd"];
  const scrollMarginInlineStart: typeof style["scrollMarginInlineStart"];
  const scrollMarginLeft: typeof style["scrollMarginLeft"];
  const scrollMarginRight: typeof style["scrollMarginRight"];
  const scrollMarginTop: typeof style["scrollMarginTop"];
  const scrollPadding: typeof style["scrollPadding"];
  const scrollPaddingBlock: typeof style["scrollPaddingBlock"];
  const scrollPaddingBlockEnd: typeof style["scrollPaddingBlockEnd"];
  const scrollPaddingBlockStart: typeof style["scrollPaddingBlockStart"];
  const scrollPaddingBottom: typeof style["scrollPaddingBottom"];
  const scrollPaddingInline: typeof style["scrollPaddingInline"];
  const scrollPaddingInlineEnd: typeof style["scrollPaddingInlineEnd"];
  const scrollPaddingInlineStart: typeof style["scrollPaddingInlineStart"];
  const scrollPaddingLeft: typeof style["scrollPaddingLeft"];
  const scrollPaddingRight: typeof style["scrollPaddingRight"];
  const scrollPaddingTop: typeof style["scrollPaddingTop"];
  const scrollSnapAlign: typeof style["scrollSnapAlign"];
  const scrollSnapCoordinate: typeof style["scrollSnapCoordinate"];
  const scrollSnapDestination: typeof style["scrollSnapDestination"];
  const scrollSnapPointsX: typeof style["scrollSnapPointsX"];
  const scrollSnapPointsY: typeof style["scrollSnapPointsY"];
  const scrollSnapStop: typeof style["scrollSnapStop"];
  const scrollSnapType: typeof style["scrollSnapType"];
  const scrollSnapTypeX: typeof style["scrollSnapTypeX"];
  const scrollSnapTypeY: typeof style["scrollSnapTypeY"];
  // const scrollbar-3dlight-color: typeof style["scrollbar-3dlight-color"]
  const scrollbarArrowColor: typeof style["scrollbarArrowColor"];
  const scrollbarBaseColor: typeof style["scrollbarBaseColor"];
  const scrollbarColor: typeof style["scrollbarColor"];
  const scrollbarDarkshadowColor: typeof style["scrollbarDarkshadowColor"];
  const scrollbarFaceColor: typeof style["scrollbarFaceColor"];
  const scrollbarGutter: typeof style["scrollbarGutter"];
  const scrollbarHighlightColor: typeof style["scrollbarHighlightColor"];
  const scrollbarShadowColor: typeof style["scrollbarShadowColor"];
  const scrollbarTrackColor: typeof style["scrollbarTrackColor"];
  const scrollbarWidth: typeof style["scrollbarWidth"];
  const shapeImageThreshold: typeof style["shapeImageThreshold"];
  const shapeMargin: typeof style["shapeMargin"];
  const shapeOutside: typeof style["shapeOutside"];
  const shapeRendering: typeof style["shapeRendering"];
  const size: typeof style["size"];
  const sizeAdjust: typeof style["sizeAdjust"];
  const speakAs: typeof style["speakAs"];
  const src: typeof style["src"];
  const stopColor: typeof style["stopColor"];
  const stopOpacity: typeof style["stopOpacity"];
  const stroke: typeof style["stroke"];
  const strokeDasharray: typeof style["strokeDasharray"];
  const strokeDashoffset: typeof style["strokeDashoffset"];
  const strokeLinecap: typeof style["strokeLinecap"];
  const strokeLinejoin: typeof style["strokeLinejoin"];
  const strokeMiterlimit: typeof style["strokeMiterlimit"];
  const strokeOpacity: typeof style["strokeOpacity"];
  const strokeWidth: typeof style["strokeWidth"];
  const suffix: typeof style["suffix"];
  const symbols: typeof style["symbols"];
  const syntax: typeof style["syntax"];
  const system: typeof style["system"];
  const tabSize: typeof style["tabSize"];
  const tableLayout: typeof style["tableLayout"];
  const textAlign: typeof style["textAlign"];
  const textAlignLast: typeof style["textAlignLast"];
  const textAnchor: typeof style["textAnchor"];
  const textCombineUpright: typeof style["textCombineUpright"];
  const textDecoration: typeof style["textDecoration"];
  const textDecorationColor: typeof style["textDecorationColor"];
  const textDecorationLine: typeof style["textDecorationLine"];
  const textDecorationSkip: typeof style["textDecorationSkip"];
  const textDecorationSkipInk: typeof style["textDecorationSkipInk"];
  const textDecorationStyle: typeof style["textDecorationStyle"];
  const textDecorationThickness: typeof style["textDecorationThickness"];
  const textEmphasis: typeof style["textEmphasis"];
  const textEmphasisColor: typeof style["textEmphasisColor"];
  const textEmphasisPosition: typeof style["textEmphasisPosition"];
  const textEmphasisStyle: typeof style["textEmphasisStyle"];
  const textIndent: typeof style["textIndent"];
  const textJustify: typeof style["textJustify"];
  const textOrientation: typeof style["textOrientation"];
  const textOverflow: typeof style["textOverflow"];
  const textRendering: typeof style["textRendering"];
  const textShadow: typeof style["textShadow"];
  const textSizeAdjust: typeof style["textSizeAdjust"];
  const textTransform: typeof style["textTransform"];
  const textUnderlineOffset: typeof style["textUnderlineOffset"];
  const textUnderlinePosition: typeof style["textUnderlinePosition"];
  // const top: typeof style["top"]
  const touchAction: typeof style["touchAction"];
  const transform: typeof style["transform"];
  const transformBox: typeof style["transformBox"];
  const transformOrigin: typeof style["transformOrigin"];
  const transformStyle: typeof style["transformStyle"];
  const transition: typeof style["transition"];
  const transitionDelay: typeof style["transitionDelay"];
  const transitionDuration: typeof style["transitionDuration"];
  const transitionProperty: typeof style["transitionProperty"];
  const transitionTimingFunction: typeof style["transitionTimingFunction"];
  const translate: typeof style["translate"];
  const unicodeBidi: typeof style["unicodeBidi"];
  const unicodeRange: typeof style["unicodeRange"];
  const userSelect: typeof style["userSelect"];
  const userZoom: typeof style["userZoom"];
  const verticalAlign: typeof style["verticalAlign"];
  const viewportFit: typeof style["viewportFit"];
  const visibility: typeof style["visibility"];
  const whiteSpace: typeof style["whiteSpace"];
  const widows: typeof style["widows"];
  const width: typeof style["width"];
  const willChange: typeof style["willChange"];
  const wordBreak: typeof style["wordBreak"];
  const wordSpacing: typeof style["wordSpacing"];
  const wordWrap: typeof style["wordWrap"];
  const writingMode: typeof style["writingMode"];
  const zIndex: typeof style["zIndex"];
  const zoom: typeof style["zoom"];
}
