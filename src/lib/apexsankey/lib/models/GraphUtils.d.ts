export declare const getTooltip: (tooltipId?: string) => HTMLElement;
export declare const updateTooltip: (id?: string, styles?: string | undefined, content?: string) => void;
export declare const getTooltipStyles: (x: number, y: number, borderColor: string, bgColor: string) => string;
export declare const generateStyles: (styleObject?: Record<string, number | string>) => string;
export declare const camelToKebabCase: (str: string) => string;
