# DNS 解析過程：網路世界的導航員

當我們在瀏覽器輸入網址，比如說「www.google.com」時，電腦是如何知道要連結到哪一台伺服器呢？這就是 DNS 解析的過程。DNS，全名為 Domain Name System，是網路世界的導航員，將人們熟悉的網址轉換為機器可以讀懂的 IP 地址。本文將詳細解釋 DNS 解析的全過程。

## DNS 解析的起源

首先，當我們在瀏覽器輸入網址後，瀏覽器會先查詢本地的 DNS 快取。這是一個小型的資料庫，儲存著近期訪問過的網址和對應的 IP 地址，以便於快速尋找。以下是一個簡單的快取查詢程式碼範例：

```javascript
const dns = require('dns');
dns.lookup('www.google.com', (err, address) => {
  console.log(address);
});
```

## 當快取無法找到

如果本地快取無法找到對應的 IP 地址，瀏覽器會向配置的 DNS 伺服器發送請求。大多數情況下，我們的裝置會使用 ISP（網路服務提供商）提供的 DNS 伺服器。

## DNS 伺服器的查詢

DNS 伺服器收到請求後，會進行一系列的查詢。首先，它會查詢 root name server，這是一個全球 13 組的伺服器群組，儲存著頂級域的資訊。例如，對於「www.google.com」，頂級域就是「.com」。

在得到頂級域的資訊後，DNS 伺服器會再向該頂級域的伺服器查詢二級域（在這個例子中是「google」）的資訊，然後再查詢三級域（在這個例子中是「www」）的資訊。最後，得到「www.google.com」的 IP 地址。以下是一個 DNS 解析的程式碼範例：

```javascript
const dns = require('dns');
dns.resolve4('www.google.com', (err, addresses) => {
  console.log(addresses);
});
```

這樣，瀏覽器就可以使用該 IP 地址來連接到 Google 的伺服器，並載入網頁。

## 總結

DNS 解析是網頁載入流程的重要一環。透過 DNS，我們可以將網址轉換為 IP 地址，進而連接到正確的伺服器。這就像網路世界的導航員，幫助我們在網路海洋中找到正確的方向。