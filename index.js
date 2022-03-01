const express = require('express')
const { MongoClient } = require('mongodb');
const auth=require('./auth/auth')

const app = express()
const port = 3000
app.use(express.json())
var ObjectID = require('mongodb').ObjectID;


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'book-manager-api';

  // Use connect method to connect to the server
   client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('books');

  

app.post('/book', auth,async (req, res) => {
    
    const insertResult = await collection.insertOne({"Book_name":req.body.Book_name});
console.log('Inserted documents =>', insertResult);
      res.status(200).send('inserted book');
})

app.get('/books',async(req,res)=>{
    const find = await collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);})
})

app.put('/book/:id',auth,async(req,res)=>{
    const find = await collection.updateOne({_id:ObjectID(req.params.id)},{$set:{Book_name:req.body.Book_name}},{upsert: true}, function(err, res) {
        if (err) throw err;
        res.status(200).send("1 document updated");})
})

app.delete('/deleteBook',auth,async(req ,res)=>{
    const find = await collection.deleteOne({Book_name:req.body.Book_name}, function(err) {
        if (err) throw err;
        res.send("1 document deleted");})
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})