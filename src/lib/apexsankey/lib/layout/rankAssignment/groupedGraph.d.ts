import { Graph } from 'graphlib';
/**
 * Create a new graph where nodes in the same rank set are merged into one node.
 *
 * Depends on the "direction" attribute of the nodes in G, and the "delta"
 * atribute of the edges.
 *
 */
export declare function groupedGraph(G: any, rankSets: any): Graph;
