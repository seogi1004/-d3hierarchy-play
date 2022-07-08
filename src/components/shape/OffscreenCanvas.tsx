import React, { useRef, useEffect, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import workerScript from './worker.js';

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
    const bufferedCanvas = document.createElement('canvas');
    bufferedCanvas.width = canvas.width;
    bufferedCanvas.height = canvas.height;

    const offscreen = bufferedCanvas.transferControlToOffscreen();
    const worker = new Worker(workerScript);

    worker.postMessage(
      {
        canvas: offscreen,
        width,
        height,
        rowHeight,
        rowInnerPadding,
        leftMargin,
        values: SAMPLE_DATA,
      },
      [offscreen],
    );
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
