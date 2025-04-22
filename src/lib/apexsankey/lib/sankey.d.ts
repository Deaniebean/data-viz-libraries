import { GraphData, SankeyGraph } from './models/Graph';
import { SankeyOptions } from './models/Options';
export declare class ApexSankey {
    element: HTMLElement;
    graph: SankeyGraph;
    options: SankeyOptions;
    constructor(element: HTMLElement, options: SankeyOptions);
    render(data: GraphData): SankeyGraph;
}
