import { CSSStyleData } from "../types";
import { useGenericHandler } from "./handler";

// TODO, more types for other css properties, like transform, suggest opacity...

export const styleProperty = useGenericHandler<CSSStyleData>((prop, proxy) => proxy(value => ({ [prop]: value })));
