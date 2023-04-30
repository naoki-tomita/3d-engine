
type Matrix = number[][];
type Vector = { x: number, y: number, z: number };


export const Matrix = {
  move({ dx = 0, dy = 0, dz = 0 }: { dx?: number, dy?: number, dz?: number }): Matrix {
    return [
      [1, 0, 0, dx],
      [0, 1, 0, dy],
      [0, 0, 1, dz],
      [0, 0, 0,  1],
    ];
  },
  rotateY(beta: number): Matrix {
    return [
      [Math.cos(beta),  0, Math.sin(beta), 0],
      [0,               1, 0             , 0],
      [-Math.sin(beta), 0, Math.cos(beta), 0],
      [0,               0, 0,              1],
    ];
  },
  transpose(matrix: Matrix): Matrix {
    const tMatrix: Matrix = [];
    for (const i in matrix) {
      for (const j in matrix[i]) {
        tMatrix[j] = tMatrix[j] ?? []
        tMatrix[j][i] = matrix[i][j];
      }
    }
    return tMatrix;
  },
  product(matrix1: Matrix, matrix2: Matrix): Matrix {
    if (matrix1[0].length !== matrix2.length) throw Error("Not matched");

    const tMatrix2 = Matrix.transpose(matrix2);
    return matrix1.map(line1 =>
      tMatrix2.map(line2 =>
        line1.reduce((p, n, i) => (p + (n * line2[i])), 0)));
  },
}
