const workerCode = () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = function (e) {
    const {
      canvas,
      width,
      height,
      rowHeight,
      rowInnerPadding,
      leftMargin,
      values,
    } = e.data;

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = 'black';
    values.forEach((value, index) => {
      const w = 50;
      const y = index * rowHeight;

      ctx.fillText(`${index}`, 0, y + rowHeight - rowInnerPadding);
      ctx.rect(
        leftMargin,
        y + rowInnerPadding,
        w,
        rowHeight - rowInnerPadding * 2,
      );
      ctx.fill();
    });
  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const workerScript = URL.createObjectURL(blob);

module.exports = workerScript;
