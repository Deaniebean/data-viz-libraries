# ApexSankey

A JavaScript library to create Sankey diagrams built on SVG

<img width="752" alt="apex-sankey-chart" src="https://github.com/apexcharts/projects/assets/17950663/51e00ff0-79d1-45eb-8815-f8d11e2dd981">


## Installation

To add the ApexSankey to your project and its dependencies, install the package from npm.

```bash
npm install apexsankey
```

## Usage

```js
import ApexSankey from 'apexsankey';
```

To create a basic sankey with minimal configuration, write as follows:

```html
<div id="sankey-container"></div>
```

```js
 const data = {
   ...(data with format provided below)
 }
 const options = {
    width: 800,
    height: 800,
    canvasStyle: 'border: 1px solid #caced0; background: #f6f6f6;',
    spacing: 100,
    nodeWidth: 20,
 };
 const sankey = new ApexSankey(document.getElementById('sankey-container'), options);
 const graph = sankey.render(data);
```

## ApexSankey Options

The layout can be configured by either setting the properties in the table below by passing a second arg to ApexSankey with these properties set. The latter takes precedence.

Options | Default                      | Description
--- |------------------------------| ---
width | 800 | The width of graph container
height | 800 | The height of graph container
canvasStyle | None | The css styles for canvas root container
spacing | 100 | The spacing from top and left of graph container
nodeWidth | 20 | The width of graph nodes
nodeBorderWidth | 1 | The border width of the nodes in pixels
nodeBorderColor | none | The border color of the nodes
onNodeClick | empty function | The callback function for node click. Node object will be parameter for callback.
edgeOpacity | 0.4 | The opacity value for edges. Values must be between 0 to 1 and in fraction.
enableTooltip | false | Enable tooltip on hover of nodes
tooltipId | `sankey-tooltip-container` | The tooltip HTML element id
tooltipTemplate | tooltipTemplate | The HTML template for tooltip
tooltipBorderColor | `#BCBCBC` | The border color of tooltip
tooltipBGColor | `#FFFFFF` | The background color of tooltip
fontSize | `14px` | The size of font of nodes
fontFamily | None | The font family of nodes
fontWeight | 400 | The font weight of nodes
fontColor | `#000000` | The font color of nodes

Default tooltip template

```js
const tooltipTemplate = ({source, target, value}) => {
    return `
      <div style='display:flex;align-items:center;gap:5px;'>
        <div style='width:12px;height:12px;background-color:${source.color}'></div>
        <div>${source.title}</div>
        <div>=></div>
        <div style='width:12px;height:12px;background-color:${target.color}'></div>
        <div>${target.title}</div>
        <div>: ${value}</div> 
      </div>
    `;
  },
```

### Expected data format

Passed data should be an object containing nodes, edges and options. Nodes, edges and options should be in below format.

- *nodes* : Passed node object should contain id and title. *Id* is for uniquely identifying nodes and *title* is for node titles. It will be also used for showing tooltips for node-to-node connections.

```json
{
  "id": "1",      // required
  "title": "A",   // required
  
}
```

- *edges* : Passed edge object should contain source, target, value and type. *source* is id value of source node for edge, *target* is id value of target node for edge, *value* indicates edge size and *type* is for grouping nodes.

```json
{
    "source": "a",    // required  
    "target": "b",    // required
    "value": 1,       // required
    "type": "x",      // optional
},
```

- *options* : ApexSankey supports two options order and alightLinkTypes.

    - *order*: optional list of layers
    
        If order is not specified, the nodes are automatically assigned to layers. If order is specified, it is used directly and no rank assignment or ordering algorithm takes place.

        The order structure has three nested lists: order is a list of layers, each of which is a list of bands, each of which is a list of node ids. 
        For example,

        ```json
        {
            "order": [
                [["a", "b"]],
                [["c"]],
            ],
        },
        ```
    - *alignLinkTypes*: boolean (default false). Whether to align link types across nodes, or order links to minimise crossings.

**Example**
```js
const data = {
    "nodes": [
        {
            "id": "a",
            "title": "AAA",
        },
        {
            "id": "b",
            "title": "BBB",
        },
        {
            "id": "c",
            "title": "CCC",
        },
    ],
    "edges": [
        {
            "source": "a",
            "target": "c",
            "value": 1,
            "type": "A",
        },
        {
            "source": "b",
            "target": "c",
            "value": 2,
            "type": "A",
        }
    ],
    "options": {
        "order": [
            [["a", "b"]],
            [["c"]],
        ],
    },
};
```
