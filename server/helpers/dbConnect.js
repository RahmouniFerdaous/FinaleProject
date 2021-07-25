const mongoose= require('mongoose')
const config=require('config')
const dbConnect = () => {
    mongoose.connect(config.get("DB_CONNECTION.URI"),
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
  .then(() => console.log("DB connected ..."))
  .catch((error) => console.log(error));

}

module.exports= dbConnect