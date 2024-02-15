import { MongoClient } from 'mongodb'

const MONGODB_URI = 'mongodb+srv://andresquez:12345@andresquez.iiqebxb.mongodb.net/?retryWrites=true&w=majority'

let db

export async function connect() {
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db("pr1")

    // print collection names
    console.log('\nCollections:')
    const collections = await db.listCollections().toArray()
    console.log(collections.map(collection => collection.name))

    console.log('\nConexión exitosa a MongoDB Atlas\n')
  } catch (err) {
    console.error('\nError al conectar a MongoDB Atlas:\n', err)
    process.exit(1)
  }
}

export function getDB() {
  return db
}
