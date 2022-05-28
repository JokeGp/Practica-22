const mongoose = require(`mongoose`);
const express = require(`express`);
const personsRoutes = require(`./routes/persons`);

mongoose.Promise = global.Promise;
const app = express();

app.set(`view engine`, `ejs`);
app.use(express.urlencoded({ extended: false }));
app.use(personsRoutes);

mongoose.connect(
  //   `mongodb+srv://Heisenberg:los_pollos_hermanos@cluster0.vvh4y.mongodb.net/?retryWrites=true&w=majority`,
  `mongodb://Heisenberg:los_pollos_hermanos@cluster0-shard-00-00.vvh4y.mongodb.net:27017,cluster0-shard-00-01.vvh4y.mongodb.net:27017,cluster0-shard-00-02.vvh4y.mongodb.net:27017/?ssl=true&replicaSet=atlas-z981f1-shard-0&authSource=admin&retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error: `));
db.once(`open`, function () {
  console.log(`Connected Succefully`);
});

app.listen(3000);
