import type { HierarchyNode, HierarchyRectangularNode } from 'd3-hierarchy';
import React from 'react';
import { hierarchy, partition } from 'd3-hierarchy';

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

function Partition() {
  const padding = 10;
  const width = 400;
  const height = 200;
  const root = hierarchy(data);
  const partitionLayout = partition().size([width, height]).padding(5);

  root.sum((data: any) => {
    return data.value;
  });

  partitionLayout(root);

  const nodes = root.descendants();
  const list: any = [];
  const maxDepth = Math.max(...nodes.map(node => node.depth));

  nodes.forEach(node => {
    const newNode = node as HierarchyRectangularNode<any>;
    list[newNode.depth] = {
      y0: newNode.y0,
      y1: newNode.y1
    }
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width + padding}
      height={height + padding}
    >
      <g transform={`translate(${padding / 2}, ${padding / 2})`}>
        {nodes.map((node, index) => {
          const newNode = node as HierarchyRectangularNode<any>;
          const top = list[maxDepth - newNode.depth];

          return (
            <rect
              key={index}
              fill="white"
              stroke="black"
              x={newNode.x0}
              y={top.y0}
              width={newNode.x1 - newNode.x0}
              height={top.y1 - top.y0}
            ></rect>
          );
        })}
      </g>
    </svg>
  );
}

export default Partition;
