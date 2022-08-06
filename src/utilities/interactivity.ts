import { useStaticHandler } from "./handler";

export const touchAction = useStaticHandler((handle, cfg) =>
  handle(cfg, "touchAction"),
);

export const userSelect = useStaticHandler((handle, cfg) =>
  handle(cfg, "userSelect"),
);

export const willChange = useStaticHandler((handle, cfg) =>
  handle(cfg, "willChange"),
);

export const displayUtility = useStaticHandler((handle, cfg) =>
  handle(cfg, "display"),
);
