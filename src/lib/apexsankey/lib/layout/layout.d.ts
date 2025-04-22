/**
 * Sankey layout
 *
 * @module layout
 */
/// <reference types="node_modules/@types/graphlib" />
import { SankeyOptions } from '../models/Options';
/**
 * Sankey layout
 * @constructor sankey
 */
export declare function sankey(options: Partial<SankeyOptions>): {
    (linksIn?: any, nodesIn?: any, data?: any): import("graphlib").Graph;
    nodes(): any[];
    links(): any[];
    order(): any;
    /**
     * Set size of layout.
     * @method size
     * @param size {[width, height]} - size
     * @returns {sankeyLayout|Number[]}
     */
    size(x: any): {
        (G: any, order: any): any[];
        scaleToFit(G: any, order: any): void;
        size(x?: any): any | number[];
        separation(x?: any): any | ((a: any, b: any, c: any) => number);
        whitespace(x?: number): number | any;
        scale(x?: number): any;
    } | any | number[];
    separation(x: any): {
        (G: any, order: any): any[];
        scaleToFit(G: any, order: any): void;
        size(x?: any): any | number[];
        separation(x?: any): any | ((a: any, b: any, c: any) => number);
        whitespace(x?: number): number | any;
        scale(x?: number): any;
    } | any | ((a: any, b: any, c: any) => number);
    whitespace(x: any): number | {
        (G: any, order: any): any[];
        scaleToFit(G: any, order: any): void;
        size(x?: any): any | number[];
        separation(x?: any): any | ((a: any, b: any, c: any) => number);
        whitespace(x?: number): number | any;
        scale(x?: number): any;
    } | any;
    edgeValue(_x: any): any;
    scale(x: any): any;
};
