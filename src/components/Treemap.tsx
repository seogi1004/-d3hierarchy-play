import type { HierarchyNode, HierarchyRectangularNode } from 'd3-hierarchy';
import React from 'react';
import { hierarchy, stratify, tree, treemap } from 'd3-hierarchy';

interface SimpleNode {
  name: string;
  parent: string;
  value: number;
}

// set the dimensions and margins of the graph
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = 445 - margin.left - margin.right;
const height = 445 - margin.top - margin.bottom;

// Read data
const data1: SimpleNode[] = [
  { name: 'Origin', parent: '', value: 0 },
  { name: 'grp1asfasdfasdfadsfasfasdfasdf', parent: 'Origin', value: 1000 },
  { name: 'grp2', parent: 'Origin', value: 200 },
  { name: 'grp3', parent: 'Origin', value: 300 },
  { name: 'grp4', parent: 'Origin', value: 400 },
  { name: 'grp5', parent: 'Origin', value: 500 },
];

var root = stratify<SimpleNode>()
  .id((d: SimpleNode) => {
    return d.name;
  }) // Name of the entity (column name is name in csv)
  .parentId((d: SimpleNode) => {
    return d.parent;
  })(
  // Name of the parent (column name is parent in csv)
  data1,
);

root.sum((d: SimpleNode) => {
  return +d.value;
}); // Compute the numeric value for each entity

// Then d3.treemap computes the position of each element of the hierarchy
// The coordinates are added to the root object above
treemap().size([width, height]).padding(4)(root);

const nodes = root.leaves() as HierarchyRectangularNode<SimpleNode>[];

function Treemap() {
  return (
    <div
      className="treemap"
      style={{
        marginLeft: margin.left,
        marginRight: margin.right,
        marginTop: margin.top,
        marginBottom: margin.bottom,
        width: width,
        height: height,
      }}
    >
      {nodes.map(
        (node: HierarchyRectangularNode<SimpleNode>, index: number) => {
          return (
            <div
              key={index}
              className="node"
              style={{
                left: node.x0,
                top: node.y0,
                width: node.x1 - node.x0,
                height: node.y1 - node.y0,
              }}
            ></div>
          );
        },
      )}
    </div>
  );
}

export default Treemap;
