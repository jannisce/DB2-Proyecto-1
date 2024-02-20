import express from 'express'
import cors from 'cors'
import { connect } from './db/db.js'
import petsRoutes from './routes/petsRoutes.js'
import ownersRoutes from './routes/ownersRoutes.js'

const PORT = 5005
const app = express()

// Middleware para parsear JSON
app.use(express.json())

// Middleware para cors
app.use(cors())

// Conectar a la base de datos MongoDB
connect()

// Usar las rutas de tareas
app.use('/pets', petsRoutes)
app.use('/owners', ownersRoutes)

// Manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

// Manejar errores internos del servidor
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Error interno del servidor' })
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`\nServidor en ejecución en el puerto ${PORT}`)
})
