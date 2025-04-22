import { CircleAttr } from '@svgdotjs/svg.js';
import { Text } from '@svgdotjs/svg.js';
import { Path } from '@svgdotjs/svg.js';
import { Gradient } from '@svgdotjs/svg.js';
import { G } from '@svgdotjs/svg.js';
import { Line } from '@svgdotjs/svg.js';
import { ForeignObject } from '@svgdotjs/svg.js';
import { Circle } from '@svgdotjs/svg.js';
import { Rect } from '@svgdotjs/svg.js';
export declare function drawRect({ x, y, width, height, radius, color, borderColor, opacity, }?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: number;
    color?: string;
    borderColor?: string;
    opacity?: number;
}): Rect;
export declare function drawCircle(attributes?: CircleAttr): Circle;
export declare function drawText(text: string, { x, y, fontColor, textAnchor, pointerEvents }: any): Text;
export declare function drawTemplate(template: string, { nodeWidth, nodeHeight }?: any): ForeignObject;
export declare function drawGroup(x?: number, y?: number, id?: string, parent?: string): G;
export declare function drawPath(pathString: string, { id, edgeColor, opacity }?: Partial<{
    readonly id: string;
    readonly edgeColor: Gradient;
    readonly opacity: number;
}>): Path;
export declare function drawLine({ className, x1, x2, y1, y2, borderSize, borderColor, }?: {
    className?: string;
    x1?: number;
    x2?: number;
    y1?: number;
    y2?: number;
    borderSize?: number;
    borderColor?: string;
}): Line;
