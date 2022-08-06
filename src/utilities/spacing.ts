import { useCSSHandler, useStaticHandler } from "./handler";

import { css } from "helpers";

export const paddingUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "padding"),
);

export const paddingYUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, ["paddingTop", "paddingBottom"]),
);

export const paddingXUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, ["paddingLeft", "paddingRight"]),
);

export const paddingTopUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "paddingTop"),
);

export const paddingLeftUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "paddingLeft"),
);

export const paddingBottomUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "paddingBottom"),
);

export const paddingRightUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "paddingRight"),
);

export const marginUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "margin"),
);

export const marginYUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, ["marginTop", "marginBottom"]),
);

export const marginXUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, ["marginLeft", "marginRight"]),
);

export const marginTopUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "marginTop"),
);

export const marginLeftUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "marginLeft"),
);

export const marginBottomUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "marginBottom"),
);

export const marginRightUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, "marginRight"),
);

export const spaceBetweenYReverseUtility = useCSSHandler(css => css({
  "& > :not([hidden]) ~ :not([hidden])": {
    "--w-space-y-reverse": "1",
  },
}),
);

export const spaceBetweenYUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, (v) => css({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--w-space-y-reverse": "0",
      marginBottom: `calc(${v} * var(--w-space-y-reverse))`,
      marginTop: `calc(${v} * calc(1 - var(--w-space-y-reverse)))`,
    },
  })),
);

export const spaceBetweenXReverseUtility = useCSSHandler(css => css({
  "& > :not([hidden]) ~ :not([hidden])": {
    "--w-space-x-reverse": "1",
  },
}),
);

export const spaceBetweenXUtility = useStaticHandler((handle, spacings) =>
  handle(spacings, (v) => css({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--w-space-x-reverse": "0",
      marginRight: `calc(${v} * var(--w-space-x-reverse))`,
      marginLeft: `calc(${v} * calc(1 - var(--w-space-x-reverse)))`,
    },
  })),
);
