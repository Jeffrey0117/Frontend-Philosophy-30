# CORS - 跨域資源共享，解決跨域問題的英雄

在進行網路開發時，我們經常會遇到一個問題，就是跨域資源共享(CORS)。簡單來說，CORS就是一種機制，可以讓你的網站去取得其他網站的資源。CORS是一種新的網路標準，其主要目的就是解決跨域問題。

## 什麼是跨域？

在談CORS之前，我們要先了解何謂 "跨域"。想像你的網站在瀏覽器上運行，你希望從另一個域名（或者端口或協議）上取得一些資源，如圖片、CSS或者JavaScript。如果這個資源的網站不允許你這麼做，瀏覽器會阻止你的請求，這就是所謂的 "同源政策"，也就是導致跨域問題的主要原因。

## CORS如何解決跨域問題？

CORS的工作原理其實非常簡單。當你的網站嘗試從另一個域名取得資源時，你的瀏覽器會發送一個預檢請求(preflight request)至該域名，詢問他們是否同意你的請求。如果他們回應說同意，那麼你的請求就會被允許，否則，你的請求將被阻止。

## CORS的程式碼實作

在Node.js中，我們可以使用cors套件來很簡單地實現CORS。

首先，我們需要安裝cors套件：

```bash
npm install cors
```

然後，在我們的應用中引入並使用cors：

```javascript
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/api/resource', function(req, res, next){
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
```

在以上的範例中，我們首先引入了cors，並且使用app.use(cors())將它加入到我們的中間件棧中。這意味著每一次的請求都會經過cors中間件的處理。

當我們的服務收到請求時，cors中間件會檢查這個請求是否來自於允許的域名。如果是，則cors將添加適當的HTTP頭到回應中，告訴瀏覽器這個請求是被允許的。

## 總結

CORS是一種非常重要的網路標準，它解決了我們在開發網站時常見的跨域問題。透過簡單地在我們的服務中添加一個中間件，我們就可以讓我們的網站從其他網站取得資源，而不需要擔心同源政策的限制。希望這篇文章可以幫助你對CORS有更深的理解，並且在你的開發工作中有所幫助。