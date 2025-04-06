var stdId = 1111;
var stdName = 'lee';
var age = 20;
var gender = 'male';
var course = 'typescript';
var completed = false;
var GenderType;
(function (GenderType) {
    GenderType["male"] = "male";
    GenderType["female"] = "female";
})(GenderType || (GenderType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 91011;
        this.stdName = 'park';
        this.age = 21;
        this.gender = GenderType.male;
        this.course = 'nodejs';
        this.completed = false;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log('이름 설정 : ' + this.stdName);
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName('alice');
function getInfo(id) {
    return {
        stdId: id,
        stdName: 'lee',
        gender: GenderType.female,
        course: 'typescript',
        completed: false,
    };
}
function setInfo(student) {
    console.log(student);
}
var std = {
    stdId: 91011,
    stdName: 'park',
    age: 21,
    gender: GenderType.male,
    course: 'nodejs',
    completed: false
};
setInfo(std);
console.log(getInfo(5678));
var user = {
    name: 'john',
    age: 25
};
