const express= require ('express')
const dbConnect=require('./helpers/dbConnect')
const config=require('config')
const cors = require('cors')
const app = express()
dbConnect()

//middlewares
app.use(cors()) 
// maximum send format JSON
app.use(express.json({ limit:'50mb'}))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/trip',require('./routes/tripRoutes'))

//production
// if (config.get("HEROKU_CONFIG.NODE_ENV") === "production")
// {
//     app.use(express.static('client/build'))
// }

//express connect
const PORT=config.get("SERVER_CONFIG.PORT")
app.listen(PORT || 6000 ,()=>{
    console.log(`Application is running on http://localhost:${PORT}`)
})