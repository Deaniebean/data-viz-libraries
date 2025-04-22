/** @module node-ordering/count-crossings */
/**
 * Count the total number of crossings between 2 layers.
 *
 * This is the sum of the countBetweenCrossings and countLoopCrossings.
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
export declare function countCrossings(G: any, orderA: any, orderB: any): number;
/**
 * Count the number of crossings of edges passing between 2 layers.
 *
 * Algorithm from
 * http://jgaa.info/accepted/2004/BarthMutzelJuenger2004.8.2.pdf
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
export declare function countBetweenCrossings(G: any, orderA: any, orderB: any): number;
/**
 * Count the number of crossings from within-layer edges.
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
export declare function countLoopCrossings(G: any, orderA: any, orderB: any): number;
