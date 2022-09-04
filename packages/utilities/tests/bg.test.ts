import { backgroundClipConfig, gradientDirectionConfig } from "@windijs/config";
import { backgroundGenericHandler, colorHandler, configHandler, createUtility } from "@windijs/core";
import { bg, colors, from, to, via } from "../src";
import { percent, prop } from "@windijs/helpers";

test("Background Color", () => {
  expect(bg.current.css).toMatchSnapshot();
  expect(bg.white.css).toMatchSnapshot();
  expect(bg.blue[700].css).toMatchSnapshot();
  expect(bg.red[500].css).toMatchSnapshot();
});

test("Background Color With Opacity", () => {
  expect(bg.black.opacity(50).css).toMatchSnapshot();
  expect(bg.amber[100].opacity(50).css).toMatchSnapshot();
});

test("Background Color With Gradient", () => {
  expect(bg.black.gradient.css).toMatchSnapshot();
  expect(bg.amber[100].gradient.css).toMatchSnapshot();
  expect(bg.black.opacity(90).gradient.css).toMatchSnapshot();
  expect(bg.amber[300].opacity(90).gradient.css).toMatchSnapshot();
});

test("Background Color With Different Opacity Name", () => {
  const bg = createUtility("bg")
    .use(colorHandler(colors, "backgroundColor", "--my-opacity"))
    .init();
  expect(bg.black.opacity(50).css).toMatchSnapshot();
  expect(bg.amber[100].opacity(50).css).toMatchSnapshot();
});

test("Background Color Without Opacity", () => {
  const bg = createUtility("bg")
    .use(colorHandler(colors, "backgroundColor"))
    .init();
  expect(bg.black.css).toMatchSnapshot();
  expect(bg.amber[100].css).toMatchSnapshot();
});

test("Background Color With Different Color Value Type", () => {
  const customColors = {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000",
    dark: "#1c1c1e",
    rgb: "rgb(22, 13, 14)",
    rgba: "rgba(22, 13, 14, 0.5)",
    hsl: "hsl(360, 100%, 50%)",
    hsla: "hsla(360, 100%, 50%, 0.3)",
    hwb: "hwb(194 0% 0%)",
    hwba: "hwb(194 0% 0% / .5)",
  };
  const bg = createUtility("bg")
    .use(colorHandler(customColors, "backgroundColor", "--w-bg-opacity"))
    .init();

  expect(bg.inherit.css).toMatchSnapshot("inherit");
  expect(bg.current.css).toMatchSnapshot("current");
  expect(bg.transparent.css).toMatchSnapshot("transparent");
  expect(bg.black.css).toMatchSnapshot("black");
  expect(bg.black.opacity(50).css).toMatchSnapshot("black-opacity");
  expect(bg.dark.css).toMatchSnapshot("dark");
  expect(bg.dark.opacity(50).css).toMatchSnapshot("dark-opacity");
  expect(bg.rgb.css).toMatchSnapshot("rgb");
  expect(bg.rgb.opacity(50).css).toMatchSnapshot("rgb-opacity");
  expect(bg.rgba.css).toMatchSnapshot("rgba");
  expect(bg.rgba.opacity(50).css).toMatchSnapshot("rgba-opacity");
  expect(bg.hsl.css).toMatchSnapshot("hsl");
  expect(bg.hsl.opacity(50).css).toMatchSnapshot("hsl-opacity");
  expect(bg.hsla.css).toMatchSnapshot("hsla");
  expect(bg.hsla.opacity(50).css).toMatchSnapshot("hsla-opacity");
  expect(bg.hwb.css).toMatchSnapshot("hwb");
  expect(bg.hwb.opacity(50).css).toMatchSnapshot("hwb-opacity");
  expect(bg.hwba.css).toMatchSnapshot("hwba");
  expect(bg.hwba.opacity(50).css).toMatchSnapshot("hwba-opacity");
});

test("Background Color Without Opacity With Different Color Value Type", () => {
  const customColors = {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000",
    dark: "#1c1c1e",
    rgb: "rgb(22, 13, 14)",
    rgba: "rgba(22, 13, 14, 0.5)",
    hsl: "hsl(360, 100%, 50%)",
    hsla: "hsla(360, 100%, 50%, 0.3)",
    hwb: "hwb(194 0% 0%)",
    hwba: "hwb(194 0% 0% / .5)",
  };
  const bg = createUtility("bg")
    .use(colorHandler(customColors, "backgroundColor"))
    .init();

  expect(bg.inherit.css).toMatchSnapshot("inherit");
  expect(bg.current.css).toMatchSnapshot("current");
  expect(bg.transparent.css).toMatchSnapshot("transparent");
  expect(bg.black.css).toMatchSnapshot("black");
  expect(bg.dark.css).toMatchSnapshot("dark");
  expect(bg.rgb.css).toMatchSnapshot("rgb");
  expect(bg.rgba.css).toMatchSnapshot("rgba");
  expect(bg.hsl.css).toMatchSnapshot("hsl");
  expect(bg.hsla.css).toMatchSnapshot("hsla");
  expect(bg.hwb.css).toMatchSnapshot("hwb");
  expect(bg.hwba.css).toMatchSnapshot("hwba");
});

test("Background Opacity", () => {
  expect(bg.blue[300].css).toMatchSnapshot();
  expect(bg.opacity[0].css).toMatchSnapshot();
  expect(bg.opacity[20].css).toMatchSnapshot();
});

test("Background Attachment", () => {
  expect(bg.fixed.css).toMatchSnapshot();
  expect(bg.local.css).toMatchSnapshot();
  expect(bg.scroll.css).toMatchSnapshot();
});

test("Background Clip", () => {
  expect(bg.clip.border.css).toMatchSnapshot();
  expect(bg.clip.padding.css).toMatchSnapshot();
  expect(bg.clip.content.css).toMatchSnapshot();
  expect(bg.clip.text.css).toMatchSnapshot();
});

test("Background Clip With Different Key", () => {
  const bg = createUtility("bg")
    .case("clipped", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
    .init();
  expect(bg.clipped.border.css).toMatchSnapshot();
  expect(bg.clipped.padding.css).toMatchSnapshot();
  expect(bg.clipped.content.css).toMatchSnapshot();
  expect(bg.clipped.text.css).toMatchSnapshot();
});

test("Background Position", () => {
  expect(bg.bottom.css).toMatchSnapshot();
  expect(bg.left.bottom.css).toMatchSnapshot();
});

test("Background Repeat", () => {
  expect(bg.repeat.css).toMatchSnapshot();
  expect(bg.repeat.x.css).toMatchSnapshot();
  expect(bg.repeat.y.css).toMatchSnapshot();
  expect(bg.repeat.round.css).toMatchSnapshot();
  expect(bg.repeat.space.css).toMatchSnapshot();
  expect(bg.noRepeat.css).toMatchSnapshot();
});

test("Background Size", () => {
  expect(bg.auto.css).toMatchSnapshot();
  expect(bg.cover.css).toMatchSnapshot();
  expect(bg.contain.css).toMatchSnapshot();
});

test("Background Origin", () => {
  expect(bg.origin.border.css).toMatchSnapshot();
  expect(bg.origin.padding.css).toMatchSnapshot();
  expect(bg.origin.content.css).toMatchSnapshot();
});

test("Background Blend Mode", () => {
  expect(bg.blend.luminosity.css).toMatchSnapshot();
  expect(bg.blend.softLight.css).toMatchSnapshot();
  expect(bg.blend.color.css).toMatchSnapshot();
  expect(bg.blend.color.burn.css).toMatchSnapshot();
  expect(bg.blend.color.dodge.css).toMatchSnapshot();
});

test("Background Generic", () => {
  const bg = createUtility("bg")
    .use(backgroundGenericHandler())
    .init();
  expect(bg["rgb(22, 22, 22)"].css).toMatchSnapshot();
  expect(bg.red.css).toMatchSnapshot();
  expect(bg.aliceBlue.css).toMatchSnapshot();
  expect(bg[0xffffff].css).toMatchSnapshot();
});

test("Background With Deep Nested Color", () => {
  const nestedColors = {
    white: "#fff",
    rose: {
      50: "#fff1f2",
      dark: {
        100: "#fff",
        night: {
          300: "#1c1c1e",
          blue: {
            600: "#222222",
          },
        },
      },
    },
  };

  const bg = createUtility("bg")
    .use(colorHandler(nestedColors, "backgroundColor", "--w-bg-opacity"))
    .init();

  expect(bg.white.css).toMatchSnapshot();
  expect(bg.rose[50].css).toMatchSnapshot();
  expect(bg.rose.dark[100].css).toMatchSnapshot();
  expect(bg.rose.dark.night[300].css).toMatchSnapshot();
  expect(bg.rose.dark.night.blue[600].css).toMatchSnapshot();

  expect(bg.white.meta.props).toMatchSnapshot();
  expect(bg.rose[50].meta.props).toMatchSnapshot();
  expect(bg.rose.dark[100].meta.props).toMatchSnapshot();
  expect(bg.rose.dark.night[300].meta.props).toMatchSnapshot();
  expect(bg.rose.dark.night.blue[600].meta.props).toMatchSnapshot();
});

// TODO: support radial gradient

test("Gradients", () => {
  expect(bg.none.css).toMatchSnapshot();
  expect(bg.gradient.to.t.css).toMatchSnapshot();
  expect(bg.gradient.to.tr.css).toMatchSnapshot();
  expect(bg.gradient.to.r.css).toMatchSnapshot();
  expect(bg.gradient.to.br.css).toMatchSnapshot();
  expect(bg.gradient.to.b.css).toMatchSnapshot();
  expect(bg.gradient.to.bl.css).toMatchSnapshot();
  expect(bg.gradient.to.l.css).toMatchSnapshot();
  expect(bg.gradient.to.tl.css).toMatchSnapshot();
  expect(bg.gradient.deg[15].css).toMatchSnapshot();
  expect(bg.gradient.deg[90].css).toMatchSnapshot();
  expect(bg.gradient.deg[120].css).toMatchSnapshot();
  expect(bg.gradient.aqua.css).toMatchSnapshot();
  expect(bg.gradient.sky.css).toMatchSnapshot();
});

test("Gradient Function", () => {
  const to = gradientDirectionConfig.to;
  expect(bg.gradient.to.tl.css).toMatchSnapshot();
  expect(bg.gradient.deg[15].css).toMatchSnapshot();
  expect(bg.gradient.aqua.css).toMatchSnapshot();
  expect(bg.gradient(to.br, colors.red[500], [colors.blue[500], percent[10]]).css).toMatchSnapshot();
  expect(bg.gradient(to.br, colors.amber[200], colors.green[200], colors.dark[100], colors.gray[200]).css).toMatchSnapshot();
});

test("Gradient From", () => {
  expect(from.yellow[500].css).toMatchSnapshot();
  expect(from.blue[500].opacity(10).css).toMatchSnapshot();
});

test("Gradient Via", () => {
  expect(via.yellow[500].css).toMatchSnapshot();
  expect(via.blue[500].opacity(10).css).toMatchSnapshot();
});

test("Gradient To", () => {
  expect(to.yellow[500].css).toMatchSnapshot();
  expect(to.yellow[500].opacity(20).css).toMatchSnapshot();
});
