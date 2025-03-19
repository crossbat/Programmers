let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('완료'), 3000);
}).then(
  function (result) {
    console.log(result);
    return result + '!!!';
  },
  function (error) { console.log(error) }
).then(
  function (result) {
    console.log(result);
    return result + '!!!!';
  },
  function (error) { console.log(error) }
);
