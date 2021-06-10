console.clear('Helo!!!');
const ratioUSD = 73;

class Person {
  constructor({ name, age, gender, salary = 100000 }) {
    this.name = name;
    this.age = age || 30;
    this.gender = gender;
    this.salary = salary;
  }

  salaryInUSD() {
    return Math.round(this.salary / ratioUSD);
  }

  get salaryInUSDgetter() {
    return Math.round(this.salary / ratioUSD);
  }

  set salaryInUsd(salaryInUsd) {
    this.salary = salaryInUsd * ratioUSD;
  }
}

const ivan = new Person({
  name: 'Ivan',
  salary: 100000,
  gender: 'male',
});

const maria = new Person({
  name: 'Maria',
  age: 32,
  gender: 'female',
});
console.log(ivan);
console.log('MARIA==>');
console.log(maria);

console.log(' salaryInUSD ==>', maria.salaryInUSD());

maria.salaryInUsd = 3002222;

console.log(' salaryInUSD ==>', maria.salaryInUSDgetter);
