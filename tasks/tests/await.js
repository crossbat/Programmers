//await = async 함수 안에서만 사용 가능
//await은 then을 대체함
//async의 첫번째 기능 then을 이용해서 결과를 밖으로 보낼 수 있음.
//async의 두번째 기능 promise 객체가 일이 끝날 때까지 기다릴 수 있는 공간을 제공함.
async function f() {
  let promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('완료1'), 3000);
  });
  let result1 = await promise1;
  console.log(result1)
  let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('완료2' + result1), 3000);
  });
  let result2 = await promise2;
  console.log(result2)
  let promise3 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('완료3' + result2), 3000);
  });
  let result3 = await promise3;
  console.log(result3)
}

f();

//f().then(
//  function (result) {
//    console.log(result)
//  },
//  function (error) {
//    console.log(err)
//  }
//);
