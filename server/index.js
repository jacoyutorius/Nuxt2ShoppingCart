
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// GET http://localhost:3000/api/v1/
app.get('/api/v1/items',function(req,res){
  res.json([
    {id: 20239023, name: "Ruby入門", image: "https://images-na.ssl-images-amazon.com/images/I/51nY-YLt2ZL._SX395_BO1,204,203,200_.jpg", price: 2980},
    {id: 99230931, name: "やってはいけないデザイン", image: "https://images-fe.ssl-images-amazon.com/images/I/51bZHdnkGPL._SY346_.jpg", price: 1944},
    {id: 76912056, name: "ソラリス", image: "https://images-fe.ssl-images-amazon.com/images/I/41WiQOvQaLL._SY346_.jpg", price: 972},
    {id: 23849016, name: "映画大好きポンポさん2", image: "https://images-na.ssl-images-amazon.com/images/I/51p233qMEpL._SX350_BO1,204,203,200_.jpg", price: 950},
    {id: 58230121, name: "幼年期の終わり", image: "https://images-fe.ssl-images-amazon.com/images/I/514blw0RETL.jpg", price: 702},
    {id: 00000000, name: "", image: "", price: 200}
  ]);
});

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
