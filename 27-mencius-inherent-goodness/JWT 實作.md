# JWT實作：前端工程師的身分認證利器

大家好，我是一位資深前端工程師。今天要講解的主題是「JWT，Json Web Token」，是一種在web中用來身分驗證的方法。我們會從基本的概念開始，然後進入實際的程式碼範例，讓大家可以更清楚理解如何在實際的專案中使用JWT。讓我們開始吧!

## JWT是什麼?

JWT，全名為Json Web Token，是一種用於身分驗證的機制。在前後端分離的架構中，我們需要一種方法來確認使用者的身份，JWT就是一個解決方案。我們可以將用户的一些信息加密到JWT中，然後將其作為一個Token發送給前端。前端在之後的請求中將此Token附在Request Header中，後端就可以通過驗證這個Token來確定使用者的身份。

## JWT如何構成？

JWT主要由三個部分構成：Header、Payload、Signature。

- Header: 通常包含token的類型和所使用的加密算法。
- Payload: 存放有效訊息的地方，例如身份驗證資訊、Token的發行和到期時間。
- Signature: 以header、payload和秘鑰為基礎生成的一段數據，用於確保token在傳輸過程中沒有被篡改。

這三部分用點（.）連接在一起就形成了我們的JWT：`header.payload.signature`

## JWT的實作

現在我們來看一下如何使用Node.js實作JWT。我們以`jsonwebtoken`這個npm套件為例。

首先，我們需要安裝`jsonwebtoken`這個套件：

```bash
npm install jsonwebtoken
```

然後在我們的程式中引入這個套件：

```javascript
const jwt = require('jsonwebtoken');
```

我們可以使用`jwt.sign`來生成一個新的JWT：

```javascript
const payload = {
  username: 'John Doe',
  id: 123
};
const secret = 'mysecretkey';
const token = jwt.sign(payload, secret);
```

在這裡，`payload`是我們想要放在token中的資訊，`secret`則是我們的秘鑰，用來生成Signature。

當我們收到含有Token的請求時，可以使用`jwt.verify`來驗證Token：

```javascript
const receivedToken = req.headers.authorization;
try {
  const decoded = jwt.verify(receivedToken, secret);
  console.log(decoded);  // { username: 'John Doe', id: 123, iat: 1616669534 }
} catch(err) {
  console.error('Token is not valid');
}
```

在這裡，我們從請求的header中取出Token，然後用秘鑰驗證。如果驗證成功，`jwt.verify`會回傳解碼後的payload；如果驗證失敗，則會拋出錯誤。

## 總結

在這篇文章中，我們學到了什麼是JWT，以及如何在Node.js中使用`jsonwebtoken`來實作JWT。希望這篇文章可以幫助你更好地理解JWT，並在你的專案中順利實行身分驗證！