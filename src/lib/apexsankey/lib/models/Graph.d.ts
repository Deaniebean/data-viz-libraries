import { G } from '@svgdotjs/svg.js';
import { Graph } from 'graphlib';
import { Paper } from './Paper';
import { SankeyOptions } from './Options';
export interface GraphPoint {
    readonly x: number;
    readonly y: number;
}
export interface Node {
    readonly id: string;
    readonly title: string;
    readonly color?: string;
}
export interface Edge {
    readonly source: string;
    readonly target: string;
    readonly type: string;
    readonly value: number;
}
export interface GraphData {
    readonly nodes: Node[];
    readonly edges: Edge[];
    readonly options: SankeyOptions;
}
export declare class SankeyGraph extends Paper {
    graph: Graph;
    maxRank: number;
    element: HTMLElement;
    options: SankeyOptions;
    constructor(element: HTMLElement, options: SankeyOptions);
    construct(data: GraphData): void;
    renderEdge(edgeObj: any, group: G): void;
    render({ keepOldPosition }?: {
        keepOldPosition?: boolean;
    }): void;
}
