/** @module node-ordering */
/**
 * Return an ordering for the graph G.
 *
 * The ordering is a list of lists of node ids, corresponding to the ranks of
 * the graphs, and the order of nodes within each rank.
 *
 * @param {Graph} G - The graph. Nodes must have a `rank` attribute.
 *
 */
export declare function ordering(G: any, maxIterations?: number): any[];
