const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


//middelware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oq15n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
      try {
            await client.connect();
            const itemsCollection = client.db('CarWarehouse').collection('items');

            app.get('/items', async (req, res) => {
                  const query = {};
                  const cursor = itemsCollection.find(query);
                  const item = await cursor.toArray();
                  res.send(item);
            });
            app.get('/items/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) };
                  const items = await itemsCollection.findOne(query);
                  res.send(items);
            });
            app.post('/items', async (req, res) => {
                  const newItems = req.body;
                  const result = await itemsCollection.insertOne(newItems);
                  res.send(result);
            });
            app.delete('/items/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId };
                  const result = await itemsCollection.deleteOne(query);
                  res.send(result);
            })
      }
      finally {

      }
}
run().catch(console.dir);


app.get('/', (req, res) => {
      res.send('car warehouse start ')
});


app.listen(port, () => {
      console.log('listening to port', port);
})
