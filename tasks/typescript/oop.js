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
var Employee = /** @class */ (function () {
    function Employee() {
        var _this = this;
        this.printEmp = function () {
            console.log(_this.empName);
            console.log(_this.age);
            console.log(_this.empJob);
        };
    }
    return Employee;
}());
var emp1 = new Employee();
emp1.empName = 'kim';
emp1.age = 20;
emp1.empJob = 'developer';
emp1.printEmp();
