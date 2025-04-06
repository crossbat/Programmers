let stdId: number = 1111;
let stdName: string = 'lee';
let age: number = 20;
let gender: string = 'male';
let course: string = 'typescript';
let completed: boolean = false;

enum GenderType {
  male = 'male',
  female = 'female'
}

interface Student {
  stdId: number;
  stdName: string;
  age?: number;
  gender: GenderType;
  course: string;
  completed: boolean;
  setName?: (name: string) => void;
  getName?: () => string;
}

class MyStudent implements Student {
  stdId = 91011;
  stdName = 'park';
  age = 21;
  gender = GenderType.male;
  course = 'nodejs';
  completed = false;

  setName(name: string): void {
    this.stdName = name;
    console.log('이름 설정 : ' + this.stdName);
  }
}

const myInstance = new MyStudent();
myInstance.setName('alice');

function getInfo(id: number): Student {
  return {
    stdId: id,
    stdName: 'lee',
    gender: GenderType.female,
    course: 'typescript',
    completed: false,
  }
}

function setInfo(student: Student) {
  console.log(student);
}

let std = {
  stdId: 91011,
  stdName: 'park',
  age: 21,
  gender: GenderType.male,
  course: 'nodejs',
  completed: false
}

setInfo(std);

console.log(getInfo(5678));

const user: { name: string, age: number } = {
  name: 'john',
  age: 25
};
