import { Range, range } from "@windi/shared";

export const gridAutoColumnsConfig = {
  auto: "auto",
  min: "min-content",
  max: "max-content",
  fr: "minmax(0, 1fr)",
};

export const gridAutoFlowConfig = {
  row: {
    DEFAULT: "row",
    dense: "row dense",
  },
  col: {
    DEFAULT: "column",
    dense: "column dense",
  },
};

export const gridAutoRowsConfig = gridAutoColumnsConfig;

export const gridColumnConfig = {
  auto: "auto",
  span: {
    ...Object.fromEntries(range(1, 13).map(i => [i, `span ${i} / span ${i}`])),
    full: "1 / -1",
  },
} as {
  auto: string,
  span: Record<"full" | Range<1, 13>, string>
};

export const gridRowConfig = gridColumnConfig;

export const gridColumnEndConfig = {
  auto: "auto",
  ...Object.fromEntries(range(1, 14).map(i => [i, i + ""])),
} as Record<"auto" | Range<1, 14>, string>;

export const gridColumnStartConfig = gridColumnEndConfig;

export const gridRowStartConfig = gridColumnEndConfig;

export const gridRowEndConfig = gridColumnEndConfig;

export const gridTemplateColumnsConfig = {
  none: "none",
  ...Object.fromEntries(range(1, 13).map(i => [i, `repeat(${i}, minmax(0, 1fr))`])),
} as Record<"none" | Range<1, 13>, string>;

export const gridTemplateRowsConfig = gridTemplateColumnsConfig;
