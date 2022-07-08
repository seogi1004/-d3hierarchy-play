import React, { useRef, useEffect } from 'react';
import { scaleLinear } from 'd3-scale';

interface CanvasProps {
  width: number;
  height: number;
  rowHeight: number;
  rowInnerPadding: number;
}

const SAMPLE_DATA: number[] = Array(10000)
  .fill(0)
  .map(() => Math.random() * 100);

function Canvas({ width, height, rowHeight, rowInnerPadding }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas1: HTMLCanvasElement = canvasRef.current;
    const context1 = canvas1.getContext('2d');

    // buffer canvas
    const canvas2 = document.createElement('canvas');
    canvas2.width = 250;
    canvas2.height = 250;
    const context2 = canvas2.getContext('2d');

    if (context1 !== null && context2 !== null) {
      const xFunc = scaleLinear()
        .domain([0, Math.max(...SAMPLE_DATA)])
        .range([0, width]);

      const yFunc = scaleLinear()
        .domain([0, SAMPLE_DATA.length])
        .range([0, rowHeight * SAMPLE_DATA.length]);

      context2.beginPath();
      context2.fillStyle = 'black';
      context2.save();

      SAMPLE_DATA.forEach((value, index) => {
        const w = xFunc(value);
        const y = yFunc(index);
        context2.fillText(`${index}`, 0, y + rowHeight - rowInnerPadding);
        context2.rect(
          20,
          y + rowInnerPadding,
          w - 20,
          rowHeight - rowInnerPadding * 2,
        );
        context2.fill();
      });

      const imageData = context2.getImageData(0, 60, width, height);
      context1.putImageData(imageData, 0, 0);
    }
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

Canvas.defaultProps = {
  width: 400,
  height: 200,
  rowHeight: 10,
  rowInnerPadding: 2,
};

export default Canvas;
