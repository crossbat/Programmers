const { faker } = require('@faker-js/faker');

const maker = (num) => {
  let fakers = [];
  for (let i = 0; i < num; i++) {
    let fakeUser = createRandomUser()
    fakers.push(fakeUser);
  }
  return fakers;
}

const createRandomUser = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    contact: faker.phone.number(),
    registeredAt: faker.date.past(),
  };
}

module.exports = maker
