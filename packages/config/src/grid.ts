import { range } from "@windijs/shared";

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
  span: Record<"full" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, string>
};

export const gridRowConfig = gridColumnConfig;

export const gridColumnEndConfig = {
  auto: "auto",
  ...Object.fromEntries(range(1, 14).map(i => [i, i + ""])),
} as Record<"auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13, string>;

export const gridColumnStartConfig = gridColumnEndConfig;

export const gridRowStartConfig = gridColumnEndConfig;

export const gridRowEndConfig = gridColumnEndConfig;

export const gridTemplateColumnsConfig = {
  none: "none",
  ...Object.fromEntries(range(1, 13).map(i => [i, `repeat(${i}, minmax(0, 1fr))`])),
} as Record<"none" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, string>;

export const gridTemplateRowsConfig = gridTemplateColumnsConfig;
