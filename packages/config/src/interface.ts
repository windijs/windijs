export type ThemeType = Record<string, unknown> | undefined;

// TODO: document this
export interface BaseTheme {
  /** The accent-color utilities like accent-green-700 */
  // accentColor: ThemeType,
  /** The sr-only and not-sr-only utilities */
  accessibility: ThemeType;
  alignContent: ThemeType;
  alignItems: ThemeType;
  alignSelf: ThemeType;
  animation: ThemeType;
  animationDelay: ThemeType;
  animationDuration: ThemeType;
  animationIterationCount: ThemeType;
  animationTimingFunction: ThemeType;
  aspectRatio: ThemeType;
  backdropBlur: ThemeType;
  backdropBrightness: ThemeType;
  backdropContrast: ThemeType;
  backdropFilter: ThemeType;
  backdropGrayscale: ThemeType;
  backdropHueRotate: ThemeType;
  backdropInvert: ThemeType;
  backdropOpacity: ThemeType;
  backdropSaturate: ThemeType;
  backdropSepia: ThemeType;
  backgroundAttachment: ThemeType;
  backgroundClip: ThemeType;
  backgroundColor: ThemeType;
  backgroundImage: ThemeType;
  backgroundOpacity: ThemeType;
  backgroundOrigin: ThemeType;
  backgroundPosition: ThemeType;
  backgroundRepeat: ThemeType;
  backgroundSize: ThemeType;
  blendMode: ThemeType;
  blur: ThemeType;
  borderColor: ThemeType;
  borderOpacity: ThemeType;
  borderRadius: ThemeType;
  borderStyle: ThemeType;
  borderWidth: ThemeType;
  boxDecorationBreak: ThemeType;
  boxShadow: ThemeType;
  boxShadowColor: ThemeType;
  brightness: ThemeType;
  caretColor: ThemeType;
  caretOpacity: ThemeType;
  colors: ThemeType;
  container: ThemeType;
  contrast: ThemeType;
  cursor: ThemeType;
  degree: ThemeType;
  divideColor: ThemeType;
  divideOpacity: ThemeType;
  divideWidth: ThemeType;
  dropShadow: ThemeType;
  fill: ThemeType;
  filter: ThemeType;
  flex: ThemeType;
  flexDirection: ThemeType;
  flexGrow: ThemeType;
  flexShrink: ThemeType;
  flexStretch: ThemeType;
  flexWrap: ThemeType;
  fontFamily: ThemeType;
  fontSize: ThemeType;
  fontStyle: ThemeType;
  fontVariantNumeric: ThemeType;
  fontWeight: ThemeType;
  gap: ThemeType;
  gradient: ThemeType;
  gradientColorStops: ThemeType;
  gradientDirection: ThemeType;
  grayscale: ThemeType;
  gridAutoColumns: ThemeType;
  gridAutoFlow: ThemeType;
  gridAutoRows: ThemeType;
  gridColumn: ThemeType;
  gridColumnEnd: ThemeType;
  gridColumnStart: ThemeType;
  gridRow: ThemeType;
  gridRowEnd: ThemeType;
  gridRowStart: ThemeType;
  gridTemplateColumns: ThemeType;
  gridTemplateRows: ThemeType;
  height: ThemeType;
  hueRotate: ThemeType;
  hyphens: ThemeType;
  imageRendering: ThemeType;
  inset: ThemeType;
  invert: ThemeType;
  justifyContent: ThemeType;
  justifyItems: ThemeType;
  justifySelf: ThemeType;
  keyframes: ThemeType;
  letterSpacing: ThemeType;
  lineClamp: ThemeType;
  lineHeight: ThemeType;
  listStylePosition: ThemeType;
  listStyleType: ThemeType;
  margin: ThemeType;
  maxHeight: ThemeType;
  maxWidth: ThemeType;
  minHeight: ThemeType;
  minWidth: ThemeType;
  motions: ThemeType;
  objectFit: ThemeType;
  objectPosition: ThemeType;
  opacity: ThemeType;
  order: ThemeType;
  orientation: ThemeType;
  orientations: ThemeType;
  outline: ThemeType;
  outlineColor: ThemeType;
  outlineOffset: ThemeType;
  overflow: ThemeType;
  overscroll: ThemeType;
  padding: ThemeType;
  perspective: ThemeType;
  perspectiveOrigin: ThemeType;
  placeContent: ThemeType;
  placeItems: ThemeType;
  placeSelf: ThemeType;
  placeholderColor: ThemeType;
  placeholderOpacity: ThemeType;
  position: ThemeType;
  ringColor: ThemeType;
  ringOffset: ThemeType;
  ringOffsetColor: ThemeType;
  ringOffsetWidth: ThemeType;
  ringOpacity: ThemeType;
  ringWidth: ThemeType;
  rotate: ThemeType;
  saturate: ThemeType;
  scale: ThemeType;
  screens: ThemeType;
  sepia: ThemeType;
  skew: ThemeType;
  snapMargin: ThemeType;
  snapPadding: ThemeType;
  space: ThemeType;
  spaceBetween: ThemeType;
  spacing: ThemeType;
  stroke: ThemeType;
  strokeDashArray: ThemeType;
  strokeDashOffset: ThemeType;
  strokeLineCap: ThemeType;
  strokeLineJoin: ThemeType;
  strokeWidth: ThemeType;
  tShirtScale: ThemeType;
  tabSize: ThemeType;
  tableDisplay: ThemeType;
  textAlign: ThemeType;
  textColor: ThemeType;
  /** The text-decoration utilities like overline */
  textDecorationColor: ThemeType;
  textDecorationLength: ThemeType;
  textDecorationOffset: ThemeType;
  textDecorationOpacity: ThemeType;
  textDecorationStyle: ThemeType;
  textDecorationThickness: ThemeType;
  textDecorationType: ThemeType;
  /** The text-indent utilities like indent-28 */
  textIndent: ThemeType;
  textOpacity: ThemeType;
  textShadow: ThemeType;
  textStrokeColor: ThemeType;
  textStrokeWidth: ThemeType;
  textTransform: ThemeType;
  /** The touch-action utilities like touch-pan-right */
  touchAction: ThemeType;
  transformOrigin: ThemeType;
  transformStyle: ThemeType;
  transitionDelay: ThemeType;
  transitionDuration: ThemeType;
  transitionProperty: ThemeType;
  transitionTimingFunction: ThemeType;
  /** The translate utilities like translate-x-full */
  translate: ThemeType;
  typography: ThemeType;
  userSelect: ThemeType;
  vars: ThemeType;
  verticalAlign: ThemeType;
  whiteSpace: ThemeType;
  /** The width utilities like w-1.5 */
  width: ThemeType;
  writingMode: ThemeType;
  writingOrientation: ThemeType;
  /** The z-index utilities like z-30 */
  zIndex: ThemeType;
}

export type Theme = Partial<BaseTheme> & {
  extend?: Partial<BaseTheme> & Record<string, ThemeType>;
} & Record<string, ThemeType>;

// export type Shortcut = string | NestObject;
