import { negative, range, spacings } from "utils";

import type { RangeTuple } from "types";

export const spacingConfig = spacings([...range(0, 9).map(i => i / 2), ...range(5, 13), 14, 16, ...range(0, 13).map(i => i * 4 + 20), 72, 80, 96] as [0.5, 1, 1.5, 2, 2.5, 3, 3.5, ...RangeTuple<4, 13>, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]);

export const spaceBetweenConfig = { ...spacingConfig, ...negative(spacingConfig) };

export const marginConfig = { auto: "auto", ...spaceBetweenConfig };

export const paddingConfig = spacingConfig;
