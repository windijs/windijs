import type { StyleProperties } from "types";
import { useStaticHandler } from "./handler";

export const objectFitUtility = useStaticHandler((handle, cfg) => handle(cfg, ["objectFit", "-o-object-fit" as StyleProperties], undefined, true));

export const objectPositionUtility = useStaticHandler((handle, cfg) => handle(cfg, ["objectPosition", "-o-object-position" as StyleProperties], undefined, true));

export const justifyContentUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-justify-content" as StyleProperties, "justifyContent"]));

export const justifyItemsUtility = useStaticHandler((handle, cfg) => handle(cfg, "justifyItems"));

export const justifySelfUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-ms-grid-column-align" as StyleProperties, "justifySelf"]));

export const alignContentUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-align-content" as StyleProperties, "alignContent"]));

export const alignItemsUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-box-align" as StyleProperties, "-ms-flex-align" as StyleProperties, "-webkit-align-items" as StyleProperties, "alignItems"]));

export const alignSelfUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-align-self" as StyleProperties, "alignSelf"]));

export const placeContentUtility = useStaticHandler((handle, cfg) => handle(cfg, "placeContent"));

export const placeItemsUtility = useStaticHandler((handle, cfg) => handle(cfg, "placeItems"));

export const placeSelfUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-ms-grid-row-align" as StyleProperties, "-ms-grid-column-align" as StyleProperties, "placeSelf"]));
