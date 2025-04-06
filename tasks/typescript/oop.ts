////직원 정보
//class Employee {
//  empName: string;
//  age: number;
//  empJob: string;
//
//  function pringEmp(): void {
//  console.log(empName);
//  console.log(age);
//  console.log(empJob);
//}
//
//}

class Employee {
  empName: string;
  age: number;
  empJob: string;

  printEmp = () => {
    console.log(this.empName);
    console.log(this.age);
    console.log(this.empJob);
  }
}

let emp1 = new Employee();
emp1.empName = 'kim';
emp1.age = 20;
emp1.empJob = 'developer';
emp1.printEmp();
