let promise = new Promise((resolve, reject) => {
  //excutor : promise가 지켜낼 약속
  //성공하면 resolve(결과), 실패하면 reject(에러)
  setTimeout(() => resolve('완료'), 3000);

});

//then() promise가 실행되고 나서 호출해야하는 함수
promise.then(
  function (result) { console.log(result) },
  function (error) { console.log(error) }
);
