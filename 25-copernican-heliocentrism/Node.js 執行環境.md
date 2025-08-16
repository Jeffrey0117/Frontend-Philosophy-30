# Node.js 的執行環境

熱愛 JavaScript 的您，是否曾想過 JavaScript 不只可以用在瀏覽器上呢？事實上，JavaScript 可以透過 Node.js 在伺服器端運行，開發出各種功能繁多的網路應用程式。今天，我將帶大家認識一下 Node.js 的執行環境。

## Node.js 是什麼？

Node.js 不是一種程式語言，而是一種可以讓 JavaScript 在伺服器端運行的執行環境。它基於 Google Chrome 的 V8 JavaScript 引擎，可以執行 JavaScript 並提供一系列核心模組，這些模組讓 JavaScript 能夠進行檔案 I/O、網路通訊、資料庫連線等操作，大大擴展了 JavaScript 的能力。

```javascript
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8080/');
```

以上是一個基本的 Node.js 程式，它創建了一個 HTTP 伺服器，監聽 8080 端口，當有請求時返回 "Hello World"。這樣的程式，在瀏覽器裡的 JavaScript 是無法實現的。

## Node.js 的特性

Node.js 的主要特性包含「事件驅動」、「非阻塞 I/O」、「單執行緒」、「跨平台」等。這些特性讓 Node.js 非常適合用於處理高並發的需求，應對大流量的網路服務。

```javascript
const fs = require("fs");

fs.readFile('input.txt', (err, data) => {
   if (err) return console.error(err);
   console.log(data.toString());
});

console.log("Program Ended");
```

在這個範例中，`fs.readFile()` 是非阻塞的，它會立即返回，並在讀取檔案完成後，透過回調函數處理結果。而 `console.log("Program Ended")` 將會先於讀取檔案完成前執行。這就是 Node.js 中的「事件驅動」與「非阻塞 I/O」。

## Node.js 的模組系統

Node.js 有一套完整的模組系統，可以讓開發者將程式碼分割成多個模組，每個模組擁有自己的功能與職責，使得程式的結構更為清晰，維護也更加方便。

```javascript
// hello.js
exports.world = function() {
  console.log('Hello World');
}

// main.js
var hello = require('./hello');
hello.world();
```

在這個範例中，`hello.js` 提供了一個 `world` 函數，並透過 `exports` 將它暴露出去。而在 `main.js` 中，我們可以透過 `require` 引入 `hello.js`，並調用它的 `world` 函數。

透過 Node.js，JavaScript 不再只是瀏覽器裡的腳本語言，它成為了一種全能的開發語言，無論是前端、後端，甚至是桌面應用，都可以看到 JavaScript 的身影。如果您尚未接觸過 Node.js，不妨試試看，您或許會為它的強大與便利驚訝不已。