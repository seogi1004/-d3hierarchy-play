import type {
  HierarchyNode,
  HierarchyRectangularNode,
  HierarchyPointNode,
} from 'd3-hierarchy';
import React from 'react';
import { hierarchy, tree } from 'd3-hierarchy';

const data = {
  name: 'A1',
  children: [
    {
      name: 'B1',
      children: [
        {
          name: 'C1',
          value: 100,
        },
        {
          name: 'C2',
          value: 300,
        },
        {
          name: 'C3',
          value: 200,
        },
      ],
    },
    {
      name: 'B2',
      value: 200,
    },
  ],
};

function Tree() {
  const padding = 10;
  const width = 400;
  const height = 200;
  const root = hierarchy(data);

  const treeLayout = tree();
  treeLayout.size([width, height]);
  treeLayout(root);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width + padding}
      height={height + padding}
    >
      <g transform={`translate(${padding / 2}, ${padding / 2})`}>
        {root.links().map((link, index) => {
          const source = link.source as HierarchyPointNode<any>;
          const target = link.target as HierarchyPointNode<any>;
          return (
            <line
              key={index}
              stroke="black"
              x1={source.x}
              x2={target.x}
              y1={source.y}
              y2={target.y}
            ></line>
          );
        })}

        {root.descendants().map((node, index) => {
          const newNode = node as HierarchyPointNode<any>;
          return (
            <circle
              key={index}
              cx={newNode.x}
              cy={newNode.y}
              r={4}
              fill="black"
            ></circle>
          );
        })}
      </g>
    </svg>
  );
}

export default Tree;
