import type { HierarchyPointNode } from 'd3-hierarchy';
import type { DefaultLinkObject } from 'd3-shape';
import { hierarchy, tree } from 'd3-hierarchy';
import { linkHorizontal } from 'd3-shape';

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
  treeLayout.size([height, width]);
  treeLayout(root);

  const linkFunc = linkHorizontal();

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

          const defaultLinkObject: DefaultLinkObject = {
            source: [source.y, source.x],
            target: [target.y, target.x],
          };

          return (
            <path
              key={index}
              fill="none"
              stroke="black"
              d={linkFunc(defaultLinkObject) || ''}
            ></path>
          );
        })}

        {root.descendants().map((node, index) => {
          const newNode = node as HierarchyPointNode<any>;
          return (
            <circle
              key={index}
              cx={newNode.y}
              cy={newNode.x}
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
