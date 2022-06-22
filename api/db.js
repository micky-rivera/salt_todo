const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

const getTodoList = async (id) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("TodoDb");
  const collection = database.collection("todoLists");

  const query = {id: id};
  const result = await collection.findOne(query);
  await client.close();
  return result;
};

const addTodoList = async (newTodoList) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("TodoDb");
  const collection = database.collection("todoLists");

  const query = newTodoList;
  await collection.insertOne(query);
  await client.close();
  return newTodoList;
};

module.exports.getTodoList = getTodoList;
module.exports.addTodoList = addTodoList;