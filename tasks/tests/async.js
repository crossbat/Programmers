//async_await : promise 객체를 쓰기 쉽게 사용하는 문법
//비동기 처리가 쉽다

//async 함수 
async function f() {
  return 7; //promise 객체 반환 중
}

f().then(
  function (result) {
    console.log(result)
  },
  function (error) {
    console.log(err)
  }
);
