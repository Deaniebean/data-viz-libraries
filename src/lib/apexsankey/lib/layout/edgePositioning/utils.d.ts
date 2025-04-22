export declare function findFirst(links: any, p: any): any;
/**
 * Adjust radii of curvature to avoid overlaps, as much as possible.
 * @param links - the list of links, ordered from outside to inside of bend
 * @param rr - "r0" or "r1", the side to work on
 */
export declare function sweepCurvatureInwards(links: any, rr: any): void;
export declare function addLinkEndpoints(G: any): void;
