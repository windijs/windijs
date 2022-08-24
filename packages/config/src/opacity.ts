import { range, scales } from "@windijs/shared";

export const opacityConfig = scales(range(0, 21).map(i => i * 5) as [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);
