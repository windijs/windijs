import { degrees, negative, omit, range, scales } from "utils";
import { insetConfig, positionConfig } from "./positioning";

import { spacingConfig } from "./spacing";
import { tShirtScale } from "./sizing";

export const degreeConfig = degrees<0|1|2|3|6|12|15|30|45|60|90|120|160|180>([0, 1, 2, 3, 6, 12, 15, 30, 45, 60, 90, 120, 160, 180]);

export const rotateConfig = {
  ...negative(degreeConfig),
  ...degreeConfig,
};

export const scaleConfig = scales(range(0, 41).map(i => i * 5) as [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]);

export const skewConfig = rotateConfig;

export const translateConfig = omit(insetConfig, { auto: 1 });

export const transformOriginConfig = positionConfig;

export const transformStyleConfig = {
  flat: "flat",
  box: "preserve-3d",
};

export const perspectiveConfig = {
  none: "none",
  ...tShirtScale,
  ...spacingConfig,
};

export const perspectiveOriginConfig = positionConfig;
