import React, { useRef, useEffect, useState } from 'react';
import { scaleLinear } from 'd3-scale';

interface CanvasProps {
  width: number;
  height: number;
  rowHeight: number;
  rowInnerPadding: number;
  leftMargin: number;
}

const SAMPLE_DATA: number[] = Array(10000)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100));

function Canvas({
  width,
  height,
  rowHeight,
  rowInnerPadding,
  leftMargin,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const translated = -10000;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx !== null) {
      const xFunc = scaleLinear()
        .domain([0, Math.max(...SAMPLE_DATA)])
        .range([0, width - leftMargin]);

      const yFunc = scaleLinear()
        .domain([0, SAMPLE_DATA.length])
        .range([0, rowHeight * SAMPLE_DATA.length]);

      ctx.clearRect(0, -translated, width, height);
      ctx.beginPath();
      ctx.fillStyle = 'black';
      SAMPLE_DATA.forEach((value, index) => {
        const w = xFunc(value);
        const y = yFunc(index);

        ctx.fillText(`${index}`, 0, y + rowHeight - rowInnerPadding);
        ctx.rect(
          leftMargin,
          y + rowInnerPadding,
          w,
          rowHeight - rowInnerPadding * 2,
        );
        ctx.fill();
      });

      ctx.translate(0, translated);
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
  leftMargin: 60,
};

export default Canvas;
