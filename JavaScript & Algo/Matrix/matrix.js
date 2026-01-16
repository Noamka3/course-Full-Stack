// const dimensions = 5;
// let counter = 1;
// let matrix = [];

// for(let r =0; r < dimensions; r++){
//     let row = [];
//     for(let c = 0; c < dimensions; c++){
//         row.push(counter++);
//     }
//     matrix.push(row);
// }
// console.log(matrix);


/* ---------------------------- Matrix exercise 1 ---------------------- */

class Matrix {
  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.matrix = this.generateMatrix()
  }

  generateMatrix() {
    const mat = []
    let counter = 1

    for (let r = 0; r < this.rows; r++) {
      mat[r] = []
      for (let c = 0; c < this.columns; c++) {
        mat[r][c] = counter++
      }
    }

    return mat
  }

  get(row, col) {
    return this.matrix[row][col]
  }

  alter(row, col, value) {
    this.matrix[row][col] = value
  }

  print() {
    for (let r = 0; r < this.rows; r++) {
      console.log(this.matrix[r].join("\t"))
    }
  }

  // separate lines
  printRow(row) {
    for (let c = 0; c < this.columns; c++) {
      console.log(this.matrix[row][c])
    }
  }

  // separate lines
  printColumn(col) {
    for (let r = 0; r < this.rows; r++) {
      console.log(this.matrix[r][col])
    }
  }

  findCoordinate(value){
    for(let r = 0; r < this.rows; r++){
        for(let c =0; c < this.columns; c++){
            if(this.matrix[r][c] === value){
                return {c,r};
            }
        }
    }
    return null;
  }
}

/* ===== test (same file) ===== */
// let m = new Matrix(3, 4)
// m.alter(0, 0, m.get(1, 1))
// m.printColumn(0) // prints: 6 \n 5 \n 9
// m.printRow(0)    // prints: 6 \n 2 \n 3 \n 4


// let m = new Matrix(3, 4)
// console.log(m.findCoordinate(12)) //prints {x: 3, y: 2}
// console.log(m.findCoordinate(7)) //prints {x: 2, y: 1}



class EmployeeMatrix extends Matrix {
  constructor(rows = 0, columns = 0) {
    super(rows, columns)
  }

  loadData(salaryData) {
    const keys = Object.keys(salaryData[0] || {}) // {} אם אין אובייקט אז יחזיר ריק

    const newMatrix = salaryData.map(emp => keys.map(k => emp[k])) // לוקח את המערך של האובייקטים ויוצר מערך חדש של מערכים

    this.matrix = newMatrix
    this.rows = newMatrix.length
    this.columns = keys.length
  }

  getEmployees(department){
    const employess = [];
    for(let r = 0; r < this.rows; r++){
        if(this.matrix[r][2] === department){
            employess.push(this.matrix[r][1]);
        }
    }
    return employess;
    
  }
  getTotalSalary(department){
    return this.matrix.filter(row => row[2] === department).map( row => row[3]).reduce((sum,salary) => sum + salary,0);
  }

findRichest() {
  if (this.matrix.length === 0) return null

  const richestRow = this.matrix.reduce((bestRow, currentRow) => {
    return currentRow[3] > bestRow[3] ? currentRow : bestRow
  })

  return richestRow[1]
}
}

let data = [
  { _id: "e10021", name: "Gillian", department: "Finance", salary: 2000 },
  { _id: "e10725", name: "Tibor", department: "Design", salary: 1200 },
  { _id: "e10041", name: "Anisha", department: "Finance", salary: 2300 },
  { _id: "e10411", name: "Jakub", department: "Design", salary: 1600 },
  { _id: "e11995", name: "Mar", department: "Design", salary: 1300 },
  { _id: "e10732", name: "Nisha", department: "Design", salary: 1200 }
]

let m = new EmployeeMatrix()
m.loadData(data)
m.print()
console.log(m.getEmployees("Finance"));
console.log(m.getEmployees("Design"))
console.log(m.getTotalSalary("Finance")) //prints 4300
console.log(m.getTotalSalary("Design")) //prints 5300

console.log(m.findRichest())