
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
    {id: 95888231, name: "銀河の死なない子供たちへ（上） (電撃コミックスNEXT) ", image: "https://images-fe.ssl-images-amazon.com/images/I/51%2Bb4NyD5pL.jpg", price: 554},
    {id: 32399513, name: "月は無慈悲な夜の女王", image: "https://images-fe.ssl-images-amazon.com/images/I/41RyO7hWdJL.jpg", price: 972},
    {id: 55034011, name: "セキュリティのためのログ分析入門 サイバー攻撃の痕跡を見つける技術", image: "https://images-na.ssl-images-amazon.com/images/I/51QlygQS8qL._SX394_BO1,204,203,200_.jpg", price: 3002},
    {id: 05941125, name: "内田裕也 俺は最低な奴さ", image: "https://images-na.ssl-images-amazon.com/images/I/41%2BPRb8B1QL._SX349_BO1,204,203,200_.jpg", price: 5850},
    {id: 85889142, name: "昭和キャバレー秘史", image: "https://images-na.ssl-images-amazon.com/images/I/51hH%2B6Ds6sL._SX362_BO1,204,203,200_.jpg", price: 421},
    {id: 59045991, name: "まぼろしの奇想建築 天才が夢みた不可能な挑戦", image: "https://images-na.ssl-images-amazon.com/images/I/61LrPk9FmXL._SX389_BO1,204,203,200_.jpg", price: 2916},
    {id: 88491545, name: "選んだ孤独はよい孤独 ", image: "https://images-na.ssl-images-amazon.com/images/I/512cLG1gBsL._SX348_BO1,204,203,200_.jpg", price: 1200},
    {id: 99848122, name: "機動戦士ガンダム・GUNDAM WEAPONS U.C.0080 機動戦士ガンダム・.ガンダムウェポンズ", image: "https://images-fe.ssl-images-amazon.com/images/I/51ABTUWOcLL.jpg", price: 1620},
    {id: 99847135, name: "機動戦士ガンダムF91 モビルスーツ・イン・アクション U.C.0123", image: "https://images-fe.ssl-images-amazon.com/images/I/51nJmkPLTvL.jpg", price: 1080}
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
