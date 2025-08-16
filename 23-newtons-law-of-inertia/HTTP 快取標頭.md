# HTTP 快取標頭－你的網頁加速利器

在網頁開發中，一個重要但常被忽視的部分就是「HTTP 快取」。正確使用快取標頭，可以讓你的網頁加載更快，提供更好的用戶體驗。

## 什麼是 HTTP 快取？

HTTP 快取是一種由瀏覽器實現的機制，它可以將已請求過的資源暫存於本地，當用戶再次訪問相同資源時，瀏覽器會直接載入本地的資源，而非重新向伺服器發送請求。這樣不僅可以節省伺服器的頻寬，還能加快網頁的加載速度。

## HTTP 快取如何運作？

當瀏覽器接收到來自服務器的 HTTP 回應時，它會先檢查回應中的快取標頭。這些標頭包括 `Cache-Control`、`Expires`、`Last-Modified` 和 `ETag` 等等。瀏覽器會根據這些標頭的值來決定是否將資源儲存到快取中，以及何時從快取中刪除這些資源。

以下是一個簡單的 HTTP 回應範例：

```http
HTTP/1.1 200 OK
Date: Mon, 23 May 2018 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 138
Last-Modified: Wed, 22 May 2018 19:15:56 GMT
Cache-Control: public, max-age=3600
Expires: Tue, 22 May 2018 23:38:34 GMT
```

這個 HTTP 回應包含了 `Cache-Control` 和 `Expires` 兩個快取標頭。`Cache-Control: public, max-age=3600` 這個標頭告訴瀏覽器這個資源可以被公開快取，且在 3600 秒（即一小時）後過期。`Expires: Tue, 22 May 2018 23:38:34 GMT` 這個標頭則設定了資源的過期時間。如果在這個時間之後，瀏覽器再次需要這個資源，它會重新向伺服器發送請求。

## 如何設定 HTTP 快取標頭？

設定 HTTP 快取標頭一般在後端伺服器處理，以下是一個使用 Node.js 和 Express 設定快取標頭的範例：

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

這個 Express 應用會對所有請求設定 `Cache-Control` 標頭，讓它們在一小時後過期。

## 結語

HTTP 快取標頭是一種強大的工具，但在使用時也需要謹慎。快取的資源應該是靜態和不常改變的，像是 CSS、JavaScript、圖片等。對於動態內容，例如用戶的個人資訊或是實時的新聞內容，就應該避免使用快取。

學會使用 HTTP 快取標頭，提高網頁效能，為你的用戶帶來更好的瀏覽體驗吧！