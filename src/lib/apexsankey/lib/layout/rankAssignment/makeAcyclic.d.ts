import { Graph } from 'graphlib';
/**
 * Reverse edges in G to make it acyclic
 */
export declare function makeAcyclic(G: any, v0: any): any;
export declare function findSpanningTree(G: any, v0: any): Graph;
/**
 * Returns 1 if w is a descendent of v, -1 if v is a descendent of w, and 0 if
 * they are unrelated.
 */
export declare function nodeRelationship(tree: any, v: any, w: any): 0 | 1 | -1;
