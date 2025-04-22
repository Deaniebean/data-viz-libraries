import { Element, Svg } from '@svgdotjs/svg.js';
export declare class Paper {
    private readonly width;
    private readonly height;
    private readonly spacing;
    canvas: Svg;
    constructor(element: HTMLElement, width: number, height: number, canvasStyle: string, spacing: number);
    add(element: Element): void;
    resetViewBox(): void;
    updateViewBox(x: number, y: number, width: number, height: number): void;
    zoom(zoomFactor: number): void;
    clear(): void;
}
