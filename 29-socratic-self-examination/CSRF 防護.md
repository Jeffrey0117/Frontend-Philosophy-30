# 徹底理解 CSRF 防護

身為前端工程師，我們經常處理與伺服器的資料交換，這其中，保護我們的網站免於 CSRF（Cross Site Request Forgery）攻擊是我們必需知道的重要議題。在本文中，我將深入解釋 CSRF 是什麼以及如何防護。

## CSRF 是什麼

CSRF，全名為 Cross Site Request Forgery，中文翻譯為跨站請求偽造。簡單地說，就是攻擊者利用使用者已登入的身分，偽造請求發送給伺服器，從而進行不合法的操作。

舉個例子來說，假設你登入了你的銀行帳戶，並且在同一個瀏覽器的另一個分頁中打開了一個受到攻擊者控制的網站，該網站包含一個自動發送 POST 請求的 JavaScript 程式碼，該請求目標是你銀行的轉帳介面，且已經設定好收款人以及金額。因為你已經登入，所以這個請求將會成功，錢就會被轉走。這就是一個典型的 CSRF 攻擊。

## CSRF 防護

了解了 CSRF 攻擊的運作原理後，我們要如何防護？主要有以下幾種方法：

### 1. SameSite Cookie

這是一種新的 Cookie 屬性，可以設定為三種值：Strict、Lax 或 None。當設定為 Strict 時，Cookie 只會在同源請求中被送出；當設定為 Lax 時，只有在導航至目標網站的 GET 請求會帶上 Cookie；而當設定為 None 時，所有請求都會帶上 Cookie。請注意，這種方法需要瀏覽器的支援。

```javascript
document.cookie = "key=value; SameSite=Strict";
```

### 2. CSRF Token

CSRF Token 是一種防護方法，是在伺服器端生成一個隨機的、唯一的 token 並嵌入到網頁中，然後每次請求都要驗證這個 token。只有合法的、由伺服器生成的頁面才會包含正確的 CSRF Token，所以攻擊者無法偽造請求。

以下是一個簡單的 CSRF Token 實作：

```javascript
// 伺服器端
const csrfToken = crypto.randomBytes(100).toString('hex');
res.cookie('CSRF-TOKEN', csrfToken);

// 客戶端
const csrfToken = document.cookie.match(/CSRF-TOKEN=([^;]+)/)[1];
fetch('/api/action', {
  method: 'POST',
  body: JSON.stringify({csrfToken, /* 其他資料... */})
});
```

在上面的例子中，我們先在伺服器端生成一個 CSRF Token 並存入 Cookie，然後在客戶端發送請求時，將 CSRF Token 從 Cookie 中取出並加入到請求中，最後在伺服器端驗證這個 CSRF Token 是否合法。

透過以上的 CSRF 防護方法，我們可以有效地保護我們的網站免於 CSRF 攻擊。請記住，網路安全是一個持續的戰鬥，我們必須時刻保持警覺，並隨著新的攻擊手法的出現，不斷更新我們的防禦策略。