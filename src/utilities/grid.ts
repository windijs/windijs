import { useCSSHandler, useStaticHandler } from "./handler";

import { StyleProperties } from "types";

export const gridUtility = useCSSHandler(css => css({ display: ["-ms-grid", "grid"] }));

export const inlineGridUtility = useCSSHandler(css => css({ display: ["-ms-inline-grid", "inline-grid"] }));

export const gridTemplateColumnsUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridTemplateColumns"));

export const gridTemplateRowsUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridTemplateRows"));

export const gridColumnUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridColumn"));

export const gridRowUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridRow"));

export const gridColumnStartUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridColumnStart"));

export const gridColumnEndUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridColumnEnd"));

export const gridRowStartUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridRowStart"));

export const gridRowEndUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridRowEnd"));

export const gridAutoColumnsUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridAutoColumns"));

export const gridAutoRowsUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridAutoRows"));

export const gridAutoFlowUtility = useStaticHandler((handle, cfg) => handle(cfg, "gridAutoFlow"));

export const gapUtility = useStaticHandler((handle, cfg) => handle(cfg, ["gridGap", "gap"]));

export const gapXUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-column-gap" as StyleProperties, "-moz-column-gap" as StyleProperties, "gridColumnGap", "columnGap"]));

export const gapYUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-row-gap" as StyleProperties, "-moz-row-gap" as StyleProperties, "gridRowGap", "rowGap"]));
