import { useStaticHandler } from "./handler";

export const widthUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "width"),
);

export const minWidthUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "minWidth"),
);

export const maxWidthUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "maxWidth"),
);

export const heightUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "height"),
);

export const minHeightUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "minHeight"),
);

export const maxHeightUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "maxHeight"),
);
