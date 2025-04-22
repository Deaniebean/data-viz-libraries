/** @module edge-ordering */
/**
 * Order the edges in the graph G, with node positions already set.
 *
 * Assigns each node a list `incoming` and `outgoing`, containing the incoming
 * and outgoing edges in order.
 *
 * @param {Graph} G - The graph. Nodes must have `x` and `y` attributes.
 *
 */
export declare function orderEdges(G: any, { alignLinkTypes }?: {
    alignLinkTypes?: boolean;
}): void;
