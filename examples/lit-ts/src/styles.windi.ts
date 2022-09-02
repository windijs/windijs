import { $, em } from "windijs";
import { focus, focusVisible, hover, light } from "@windijs/variants";

import { css as litCSS } from "lit";

const buttonFocused = [outlineWidth.px[4], outlineStyle.auto, outlineColor["-webkit-focus-ring-color"]];

// TODO: fix variant unify problem
// TODO: @fontface?

const button = $.Button(
  borderRadius.px[8],
  borderWidth.px[1],
  borderStyle.solid,
  borderColor.transparent,
  paddingTop.em[0.6],
  paddingBottom.em[0.6],
  paddingLeft.em[1.2],
  paddingRight.em[1.2],
  fontSize.em[1],
  fontWeight[500],
  fontFamily.inherit,
  backgroundColor.rgb(26, 26, 26),
  cursor.pointer,
  transition["border-color 0.25s"],
  hover(borderColor.rgb(100, 108, 255)),
  focus(buttonFocused),
  focusVisible(buttonFocused),
  light(backgroundColor.rgb(249, 249, 249))
)

const logo = $.logo(
  height.em[6],
  padding.em[1.5],
  willChange.filter,
  hover(filter.dropShadow(0, 0, em[2], "#646cffaa")),
  // css("&.lit", hover(filter.dropShadow(0, 0, em[2], "#325cffaa")))
)

const host = $.Host(
  maxWidth.px[1280],
  marginTop[0],
  marginBottom[0],
  marginLeft.auto,
  marginRight.auto,
  padding.rem[2],
  textAlign.center
)

const others = $({
  ".card": padding.em[2],
  ".read-the-docs": color.rgb(136, 136 ,136),
  a: [
    fontWeight[500],
    color.rgb(100, 108, 255),
    textDecoration.inherit,
    hover(color.rgb(83, 91, 242)),
    light(color.rgb(116, 123, 255))
  ],
  h1: [
    fontSize.em[3.2],
    lineHeight[1.1]
  ]
})

export const styles = [
  litCSS([host] as unknown as TemplateStringsArray),
  litCSS([others] as unknown as TemplateStringsArray),
  litCSS([button] as unknown as TemplateStringsArray),
  litCSS([logo] as unknown as TemplateStringsArray),
]
