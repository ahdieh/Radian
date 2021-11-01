const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
// const url = process.env.DATABASE_URL;
const url = "mongodb+srv://Radian:Assignment@login.nbtph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("user");

        // Construct a document
        let userDocument = {
            "username": "Alan5",
            "password": '1234'
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(userDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);