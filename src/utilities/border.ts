import { useColorHandler, useStaticHandler } from "./handler";

import type { StyleProperties } from "types";

export const borderRadius = useStaticHandler((handle, radius) =>
  handle(radius, "borderRadius", undefined, true),
);

export const borderWidth = useStaticHandler((handle, width) =>
  handle(width, "borderWidth", undefined, true),
);

export const borderOpacity = useStaticHandler("opacity", (handle, opacity, trigger) =>
  handle(opacity, "--w-border-opacity" as StyleProperties, trigger),
);

export const borderStyle = useStaticHandler((handle, styles) =>
  handle(styles, "borderStyle"),
);

export const borderColor = useColorHandler((handle, colors, withOpacity = true, opacityName = "--w-border-opacity") =>
  handle(colors, "borderColor", withOpacity ? opacityName : undefined),
);
