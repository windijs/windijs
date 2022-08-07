import { degrees, fractions, negative, range, scales } from "utils";

import { spacingConfig } from "./spacing";

export const degreeConfig = degrees<0|1|2|3|6|12|15|30|45|60|90|180>([0, 1, 2, 3, 6, 12, 15, 30, 45, 60, 90, 180]);

export const rotateConfig = {
  ...negative(degreeConfig),
  ...degreeConfig,
};

export const scaleConfig = scales(range(0, 41).map(i => i * 5) as [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]);

export const skewConfig = rotateConfig;

export const translateConfig = {
  full: "100%",
  "-full": "-100%",
  ...spacingConfig,
  ...negative(spacingConfig),
  ...fractions(2, 5),
  ...negative(fractions(2, 5)),
};
