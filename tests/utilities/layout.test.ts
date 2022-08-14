import { alignContentConfig, alignItemsConfig, alignSelfConfig, insetConfig, justifyContentConfig, justifyItemsConfig, justifySelfConfig, objectFitConfig, objectPositionConfig, placeContentConfig, placeItemsConfig, placeSelfConfig, tableDisplayConfig, zIndexConfig } from "config";
import { bind, configHandler, createUtility, stylePropertyHandler } from "core";
import { css, prop } from "helpers";

const style = createUtility("style").use(stylePropertyHandler({
  inset: insetConfig,
  top: insetConfig,
  left: insetConfig,
  right: insetConfig,
  bottom: insetConfig,
  breakAfter: { all: "all" },
  breakBefore: { all: "all" },
  backfaceVisibility: (v: string) => css({ "-webkit-backface-visibility": v, backfaceVisibility: v }),
  order: bind({ first: "-9999", last: "9999", none: "0" }, v => css({ "-webkit-box-ordinal-group": (+v + 1).toString(), "-webkit-order": v, "-ms-flex-order": v, order: v })),
  zIndex: zIndexConfig,
  boxSizing: {
    border: "border-box",
    content: "content-box",
    "border-box": null,
    "content-box": null,
  },
})).init();

test("Columns", () => {
  const columns = style.columns;
  expect(columns[0].css).toMatchSnapshot();
  expect(columns[1].css).toMatchSnapshot();
  expect(columns[3].css).toMatchSnapshot();
  expect(columns[9].css).toMatchSnapshot();
});

test("Break", () => {
  const br = {
    after: style.breakAfter,
    before: style.breakBefore,
    inside: style.breakInside,
  };

  expect(br.after.auto.css).toMatchSnapshot();
  expect(br.after["avoid-page"].css).toMatchSnapshot();
  expect(br.before["avoid-column"].css).toMatchSnapshot();
  expect(br.inside.avoid.css).toMatchSnapshot();
});

test("Break Ater", () => {
  const breakAfter = style.breakAfter;
  expect(breakAfter.auto.css).toMatchSnapshot();
  expect(breakAfter.avoid.css).toMatchSnapshot();
  expect(breakAfter.all.css).toMatchSnapshot();
  expect(breakAfter["avoid-page"].css).toMatchSnapshot();
  expect(breakAfter.page.css).toMatchSnapshot();
  expect(breakAfter.left.css).toMatchSnapshot();
  expect(breakAfter.right.css).toMatchSnapshot();
  expect(breakAfter.column.css).toMatchSnapshot();
});

test("Break Before", () => {
  const breakBefore = style.breakBefore;
  expect(breakBefore.auto.css).toMatchSnapshot();
  expect(breakBefore.avoid.css).toMatchSnapshot();
  expect(breakBefore.all.css).toMatchSnapshot();
  expect(breakBefore["avoid-page"].css).toMatchSnapshot();
  expect(breakBefore.page.css).toMatchSnapshot();
  expect(breakBefore.left.css).toMatchSnapshot();
  expect(breakBefore.right.css).toMatchSnapshot();
  expect(breakBefore.column.css).toMatchSnapshot();
});

test("Break Inside", () => {
  const breakInside = style.breakInside;
  expect(breakInside.auto.css).toMatchSnapshot();
  expect(breakInside.avoid.css).toMatchSnapshot();
  expect(breakInside["avoid-page"].css).toMatchSnapshot();
  expect(breakInside["avoid-column"].css).toMatchSnapshot();
});

test("Display", () => {
  const { block, inline, contents } = style.display;
  const inlineBlock = style.display["inline-block"];
  const flowRoot = style.display["flow-root"];
  const listItem = style.display["list-item"];
  const hidden = style.display.none;

  expect(block.css).toMatchSnapshot();
  expect(inline.css).toMatchSnapshot();
  expect(contents.css).toMatchSnapshot();
  expect(inlineBlock.css).toMatchSnapshot();
  expect(listItem.css).toMatchSnapshot();
  expect(flowRoot.css).toMatchSnapshot();
  expect(hidden.css).toMatchSnapshot();
});

test("Visibility", () => {
  const visible = style.visibility.visible;
  const invisible = style.visibility.hidden;

  expect(visible.css).toMatchSnapshot();
  expect(invisible.css).toMatchSnapshot();
});

test("Backface Visibility", () => {
  const backface = style.backfaceVisibility;
  expect(backface.visible.css).toMatchSnapshot();
  expect(backface.hidden.css).toMatchSnapshot();
});

test("Order", () => {
  const order = style.order;
  expect(order[0].css).toMatchSnapshot();
  expect(order[5].css).toMatchSnapshot();
  expect(order[-7].css).toMatchSnapshot();
  expect(order.first.css).toMatchSnapshot();
  expect(order.last.css).toMatchSnapshot();
  expect(order.none.css).toMatchSnapshot();
});

test("Justify", () => {
  const justify = createUtility("justify")
    .case("content", configHandler(justifyContentConfig, [prop`-webkit-justify-content`, "justifyContent"]))
    .case("items", configHandler(justifyItemsConfig, "justifyItems"))
    .case("self", configHandler(justifySelfConfig, [prop`-ms-grid-column-align`, "justifySelf"]))
    .init();

  expect(justify.content.evenly.css).toMatchSnapshot();
  expect(justify.content.start.css).toMatchSnapshot();
  expect(justify.items.center.css).toMatchSnapshot();
  expect(justify.self.stretch.css).toMatchSnapshot();
});

test("Align", () => {
  const align = createUtility("align")
    .case("content", configHandler(alignContentConfig, [prop`-webkit-align-content`, "alignContent"]))
    .case("items", configHandler(alignItemsConfig, [prop`-webkit-box-align`, prop`-ms-flex-align`, prop`-webkit-align-items`, "alignItems"]))
    .case("self", configHandler(alignSelfConfig, [prop`-webkit-align-self`, "alignSelf"]))
    .init();

  expect(align.content.evenly.css).toMatchSnapshot();
  expect(align.content.start.css).toMatchSnapshot();
  expect(align.items.center.css).toMatchSnapshot();
  expect(align.self.stretch.css).toMatchSnapshot();
});

test("Place", () => {
  const place = createUtility("place")
    .case("content", configHandler(placeContentConfig, "placeContent"))
    .case("items", configHandler(placeItemsConfig, "placeItems"))
    .case("self", configHandler(placeSelfConfig, [prop`-ms-grid-row-align`, prop`-ms-grid-column-align`, "placeSelf"]))
    .init();

  expect(place.content.evenly.css).toMatchSnapshot();
  expect(place.content.start.css).toMatchSnapshot();
  expect(place.items.center.css).toMatchSnapshot();
  expect(place.self.stretch.css).toMatchSnapshot();
});

test("Position", () => {
  const pos = style.position;
  expect(pos.static.css).toMatchSnapshot();
  expect(pos.fixed.css).toMatchSnapshot();
  expect(pos.absolute.css).toMatchSnapshot();
  expect(pos.relative.css).toMatchSnapshot();
  expect(pos.sticky.css).toMatchSnapshot();
});

test("Inset", () => {
  // TODO: rewrite inset

  const inset = style.inset;
  expect(inset[0].css).toMatchSnapshot();
  expect(inset[3].css).toMatchSnapshot();
  expect(inset[-5].css).toMatchSnapshot();
  expect(inset.px[1].css).toMatchSnapshot();
  expect(inset["-1/3"].css).toMatchSnapshot();
  expect(inset["-full"].css).toMatchSnapshot();
  expect(inset.rem[3].css).toMatchSnapshot();
  expect(inset.auto.css).toMatchSnapshot();
  expect(inset.full.css).toMatchSnapshot();
});

test("Top/Left/Bottom/Right", () => {
  const { top, left, bottom, right } = style;

  // TODO: there is a ts bug when trigger negative number completion
  // top["-2"]
  expect(top[0].css).toMatchSnapshot();
  expect(top[3].css).toMatchSnapshot();
  expect(top[-5].css).toMatchSnapshot();
  expect(top.px[1].css).toMatchSnapshot();
  expect(left["-1/3"].css).toMatchSnapshot();
  expect(bottom["-full"].css).toMatchSnapshot();
  expect(right.rem[3].css).toMatchSnapshot();
  expect(top.auto.css).toMatchSnapshot();
  expect(left.full.css).toMatchSnapshot();
});

test("Float", () => {
  const float = style.float;

  expect(float.left.css).toMatchSnapshot();
  expect(float.right.css).toMatchSnapshot();
  expect(float.none.css).toMatchSnapshot();
});

test("Clear", () => {
  const clear = style.clear;

  expect(clear.left.css).toMatchSnapshot();
  expect(clear.right.css).toMatchSnapshot();
  expect(clear.both.css).toMatchSnapshot();
  expect(clear.none.css).toMatchSnapshot();
});

test("Isolation", () => {
  const isolate = style.isolation.isolate;
  const isolation = style.isolation;
  expect(isolate.css).toMatchSnapshot();
  expect(isolation.auto.css).toMatchSnapshot();
});

test("Object", () => {
  const object = createUtility("object")
    .use(configHandler(objectFitConfig, ["objectFit", prop`-o-object-fit`]))
    .use(configHandler(objectPositionConfig, ["objectPosition", prop`-o-object-position`])).init();
  expect(object.contain.css).toMatchSnapshot();
  expect(object.cover.css).toMatchSnapshot();
  expect(object.fill.css).toMatchSnapshot();
  expect(object.none.css).toMatchSnapshot();
  expect(object["scale-down"].css).toMatchSnapshot();

  expect(object.bottom.css).toMatchSnapshot();
  expect(object.center.css).toMatchSnapshot();
  expect(object.left.css).toMatchSnapshot();
  expect(object.left.bottom.css).toMatchSnapshot();
  expect(object.right.top.css).toMatchSnapshot();
});

test("ZIndex", () => {
  const z = style.zIndex;
  expect(z.auto.css).toMatchSnapshot();
  expect(z[10].css).toMatchSnapshot();
  expect(z[50].css).toMatchSnapshot();
});

test("Box Sizing", () => {
  const box = style.boxSizing;
  // TODO: fix omit unused config like border-box
  expect(box.border.css).toMatchSnapshot();
  expect(box.content.css).toMatchSnapshot();
});

test("Table", () => {
  const table = createUtility("table").use(configHandler(tableDisplayConfig, "display")).init();
  const caption = style.captionSide;
  const emptyCells = style.emptyCells;

  expect(table.css).toMatchSnapshot();
  expect(table.inline.css).toMatchSnapshot();
  expect(table.caption.css).toMatchSnapshot();
  expect(table.cell.css).toMatchSnapshot();
  expect(table.row.css).toMatchSnapshot();
  expect(table.column.css).toMatchSnapshot();
  expect(table.group.column.css).toMatchSnapshot();
  expect(table.group.row.css).toMatchSnapshot();
  expect(table.group.header.css).toMatchSnapshot();
  expect(table.group.footer.css).toMatchSnapshot();
  expect(caption.top.css).toMatchSnapshot();
  expect(caption.bottom.css).toMatchSnapshot();
  expect(emptyCells.show.css).toMatchSnapshot();
  expect(emptyCells.hide.css).toMatchSnapshot();
});
