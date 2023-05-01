import { Vertex2D } from "../Vertex2D";

export type Triangle = [Vertex2D, Vertex2D, Vertex2D];

function isInsideTriangle([v1, v2, v3]: Triangle, x: number, y: number) {
  const b1 = sign(x, y, v1.x, v1.y, v2.x, v2.y) < 0;
  const b2 = sign(x, y, v2.x, v2.y, v3.x, v3.y) < 0;
  const b3 = sign(x, y, v3.x, v3.y, v1.x, v1.y) < 0;

  return ((b1 === b2) && (b2 === b3));
}

function sign(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
  const z = ((x - x2) * (y1 - y2) - (x1 - x2) * (y - y2));
  return z;
}

const math = {
  identity(n: number) {
    const matrix = new Array<number[]>(n);
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array<number>(n);
      for (let j = 0; j < n; j++) {
        matrix[i][j] = (i === j) ? 1 : 0;
      }
    }
    return matrix;
  },
  multiply(a: number[][], b: number[][]) {
    if (a[0].length !== b.length) {
      throw new Error('Matrix dimensions do not match');
    }

    const rows = a.length;
    const cols = b[0].length;
    const result = new Array<number[]>(rows);

    for (let i = 0; i < rows; i++) {
      result[i] = new Array<number>(cols);
      for (let j = 0; j < cols; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }

    return result;
  },

  inv(a: number[][]) {
    if (a.length !== a[0].length) {
      throw new Error('Matrix is not square');
    }

    const n = a.length;
    const b = new Array<number[]>(n);
    const identity = math.identity(n);

    for (let i = 0; i < n; i++) {
      b[i] = new Array<number>(n);
      for (let j = 0; j < n; j++) {
        b[i][j] = a[i][j];
      }
    }

    for (let k = 0; k < n; k++) {
      const pivot = b[k][k];
      if (pivot === 0) {
        throw new Error('Matrix is singular');
      }
      for (let j = 0; j < n; j++) {
        b[k][j] /= pivot;
        identity[k][j] /= pivot;
      }
      for (let i = 0; i < n; i++) {
        if (i !== k) {
          const factor = b[i][k];
          for (let j = 0; j < n; j++) {
            b[i][j] -= factor * b[k][j];
            identity[i][j] -= factor * identity[k][j];
          }
        }
      }
    }

    return identity;
  }
}

function calcAffineMatrix(src: Triangle, dst: Triangle) {
  // ソース座標を列ベクトルとして定義
  let srcVectors = [
    [src[0].x, src[1].x, src[2].x],
    [src[0].y, src[1].y, src[2].y],
    [1, 1, 1]
  ];

  // デスティネーション座標を列ベクトルとして定義
  let dstVectors = [
    [dst[0].x, dst[1].x, dst[2].x],
    [dst[0].y, dst[1].y, dst[2].y],
    [1, 1, 1]
  ];

  // 行列Aを計算
  const A = math.multiply(dstVectors, math.inv(srcVectors));

  // アフィン変換の行列を返す
  return [A[0][0], A[1][0], A[0][1], A[1][1], A[0][2], A[1][2]] as const;
}

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

export function createRenderer(width: number, height: number) {
  const buf = document.createElement("canvas");
  // const buf = document.getElementById("buf") as HTMLCanvasElement;
  const bufc = buf.getContext("2d", { willReadFrequently: true })!;
  function renderImage(srcImg: HTMLImageElement, srcPoints: Triangle, dst: CanvasRenderingContext2D, dstPoints: Triangle) {
    const trDstPoints = dstPoints.map(it => ({ x: Math.floor(it.x + (width / 2)), y: Math.floor(-it.y + (height / 2)) })) as Triangle
    buf.width = width;
    buf.height = height;
    bufc.clearRect(0, 0, buf.width, buf.height);
    bufc.setTransform(...calcAffineMatrix(srcPoints, trDstPoints));
    bufc.drawImage(srcImg, 0, 0);

    const yMin = Math.min(...trDstPoints.map(it => it.y)),
          yMax = Math.max(...trDstPoints.map(it => it.y)),
          xMin = Math.min(...trDstPoints.map(it => it.x)),
          xMax = Math.max(...trDstPoints.map(it => it.x));
    const imageData = bufc.getImageData(0, 0, buf.width, buf.height);
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        if (x >= buf.width || y >= buf.height) continue;
        if (isInsideTriangle(trDstPoints, x, y)) {

        } else {
          imageData.data.set([0, 0, 0, 0], (x + (y * imageData.width)) * 4);
        }
      }
    }
    bufc.putImageData(imageData, 0, 0);
    dst.drawImage(buf, xMin, yMin, xMax - xMin, yMax - yMin, xMin, yMin, xMax - xMin, yMax - yMin);
  }
  return renderImage;
}
