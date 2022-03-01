const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'book-manager-api';

  // Use connect method to connect to the server
   client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');
const auth = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
       // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await collection.findOne({username:username,password:password})

        if (!user) {
            throw new Error()
        }
        
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;