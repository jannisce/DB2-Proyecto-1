import { MongoClient } from 'mongodb'

const MONGODB_URI = 'mongodb+srv://andresquez:12345@andresquez.iiqebxb.mongodb.net/nombre_de_tu_base_de_datos?retryWrites=true&w=majority'

let db

export async function connect() {
  try {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()
    db = client.db()
    console.log('Conexión exitosa a MongoDB Atlas')
  } catch (err) {
    console.error('Error al conectar a MongoDB Atlas:', err)
    process.exit(1)
  }
}

export function getDB() {
  return db
}
