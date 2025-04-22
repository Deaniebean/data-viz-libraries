export interface CommonOptions {
    readonly width: number | string;
    readonly height: number | string;
    readonly canvasStyle: string;
    readonly spacing: number;
    readonly viewPortWidth: number;
    readonly viewPortHeight: number;
}
export interface NodeOptions {
    readonly nodeWidth: number;
    readonly nodeBorderWidth: number;
    readonly nodeBorderColor: string;
    readonly onNodeClick?: (node: any) => void;
}
export interface EdgeOptions {
    readonly edgeOpacity: number;
    readonly edgeGradientFill: boolean;
}
export interface FontOptions {
    readonly fontSize: string;
    readonly fontFamily: string;
    readonly fontWeight: number;
    readonly fontColor: string;
}
export interface TooltipOptions {
    readonly enableTooltip: boolean;
    readonly tooltipId: string;
    readonly tooltipTemplate?: (content: any) => any;
    readonly tooltipBorderColor: string;
    readonly tooltipBGColor: string;
}
export type SankeyOptions = CommonOptions & NodeOptions & TooltipOptions & EdgeOptions & FontOptions;
export declare const DefaultOptions: SankeyOptions;
