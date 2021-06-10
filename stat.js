console.log('Start!!!!!');

const { connect, disconnect, model, Schema } = require('mongoose');
connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('DataBase is Connected!!!!');
    main();
  }
);

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: Number,
  favouriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

userSchema.statics.findPerson = function (name) {
  return this.find({ name: name });
};

userSchema.methods.addPhone = function (phoneNumber) {
  this.phone = phoneNumber;
  return this;
};

const User = model('User', userSchema);

const Product = model('Product', {
  name: { type: String, require: true },
  price: { type: Number, default: 0 },
});

const prodArray = [
  { name: 'Banana', price: 100 },
  { name: 'Kiwi', price: 150 },
  { name: 'Orange', price: 120 },
  { name: 'Watermelon', price: 200 },
  { name: 'Cucumber', price: 40 },
  { name: 'Tomato', price: 250 },
];
const userArray = [
  {
    name: 'Ivan',
    email: 'ivan@mail.ru',
  },
  { name: 'Damir', email: 'Damir@mail.ru' },
  { name: 'Petr', email: 'Petr@mail.ru' },
  { name: 'Alex', email: 'Alex@mail.ru' },
  { name: 'Diana', email: 'Diana@mail.ru' },
];

const prodRnd = (inputArray = []) => {
  const rndIndex = Math.round(Math.random() * (inputArray.length - 1));
  return inputArray[rndIndex]._id;
};

const main = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Product.insertMany(prodArray);
    const prodList = await Product.find();
    // console.log(prodList);

    userArray.forEach(
      (el, index) => (el.favouriteProducts = [prodRnd(prodList)])
    );

    // console.log('==userArray===>');
    // console.log(userArray);
    await User.insertMany(userArray);
    const userList = await User.find().populate('favouriteProducts');
    // console.log('====>>>>');
    // console.log(userList[0]);
    // await Promise.all(userArray.map((el) => User.create(el)));
    const alex = await User.findPerson('Alex');
    // console.log('alex STAT RES=>', alex);
    const kiril = await User.create({ name: 'Kiril', email: 'kiril@mail.ru' });
    // console.log('  kiril  =>');
    // console.log(kiril);
    const res = await kiril.addPhone('32131231231231');
    console.log(res);
  } catch (err) {
    console.log('ERRORR===>');
    console.log(err);
  } finally {
    disconnect();
  }
};
