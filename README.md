# Nuxt2ShoppingCart

> My praiseworthy Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

---

## API

|URL||
|:-:|:-:|
|/api/v1/items|商品一覧||
|||
|||
|||

## Actionの定義

|タイプ|ペイロード|
|:-:|:-|
|商品データの取得が開始された|-|
|商品データの取得が失敗した|エラーの内容|
|商品データの取得が成功した|商品の配列|
|カートに商品が追加された|追加された商品|
|カートから商品が削除された|削除された商品|

(Web+DB Press Vol106「Fluxアーキテクチャで状態管理」P.33を参考にしている)