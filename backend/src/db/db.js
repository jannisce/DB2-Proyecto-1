import { MongoClient } from 'mongodb'

const MONGODB_URI = 'mongodb+srv://andresquez:12345@andresquez.iiqebxb.mongodb.net/pr1?retryWrites=true&w=majority'

let db

export async function connect() {
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db()
    // print collection names
    const collections = await db.listCollections().toArray()
    console.log(collections.map(collection => collection.name))

    console.log('Conexión exitosa a MongoDB Atlas')
  } catch (err) {
    console.error('Error al conectar a MongoDB Atlas:', err)
    process.exit(1)
  }
}

export function getDB() {
  return db
}
