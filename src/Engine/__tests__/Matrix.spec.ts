import { Matrix } from "../Matrix";

describe("Matrix", () => {
  it("should calculate collectly.", () => {
    const matrix1 = [
      [1, 2, 3],
      [3, 2, 1],
      [3, 1, 2],
    ];
    const matrix2 = [
      [1],
      [2],
      [3]
    ]
    const actual = Matrix.product(matrix1, matrix2);
    expect(actual).toEqual([
      [14],
      [10],
      [11],
    ]);
  });

  it("should calculate collectly.", () => {
    const matrix1 = [
      [1, 2, 3],
      [3, 2, 1],
      [3, 1, 2],
    ];
    const matrix2 = [
      [1, 9],
      [2, 8],
      [3, 7]
    ]
    const actual = Matrix.product(matrix1, matrix2);
    expect(actual).toEqual([
      [14, 46],
      [10, 50],
      [11, 49],
    ]);
  })
});
