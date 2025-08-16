# OAuth 2.0 流程探析：一步一步理解Web認證機制

OAuth 2.0 是一種安全的認證機制，被廣泛應用在各種網路服務上，例如妳經常使用的 Facebook 或 Google 登入。為了讓大家更透徹的理解 OAuth 2.0，本文將帶你從零開始，一步一步的解析 OAuth 2.0 的運作流程。

## 什麼是 OAuth 2.0？

OAuth 2.0 是一種授權框架，提供了一套詳細的授權流程。客戶端可以透過擁有者的授權，獲取特定資源的訪問權限。這種機制讓使用者不需要告訴應用程式他們的帳號密碼，而是通過授權代碼，讓應用程式能夠以使用者的名義執行操作。

## OAuth 2.0 的運作流程

OAuth 2.0 的運作流程可以分為以下幾個步驟：

1. **授權請求**：客戶端向資源擁有者（通常是使用者）發出授權請求。
2. **授權回應**：資源擁有者批准了授權請求後，會回傳一個授權代碼給客戶端。
3. **授權代碼交換**：客戶端用授權代碼向授權伺服器請求存取令牌。
4. **存取令牌回應**：授權伺服器確認授權碼有效後，將回傳一個存取令牌給客戶端。
5. **資源請求**：客戶端帶著存取令牌向資源伺服器請求資源。
6. **資源回應**：資源伺服器驗證存取令牌無誤後，將資源送回客戶端。

讓我們透過一個實際的例子來理解 OAuth 2.0 的運作流程。

## OAuth 2.0 實際應用流程

假設你正在開發一個應用程式，需要讓使用者透過 Google 帳號登入。首先，你需要在 Google API Console 註冊你的應用程式，並獲得 `Client ID` 和 `Client Secret`。

1. **授權請求**

```html
<a href="https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=profile">Google 登入</a>
```

2. **授權回應**

使用者點擊 "Google 登入" 連結後，會被重導至 Google 的登入頁面。在使用者確認授權後，Google 會將使用者重導回你的網站，並在 URL 中附上一個授權碼。

3. **授權代碼交換**

```javascript
fetch('https://accounts.google.com/o/oauth2/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `code=AUTHORIZATION_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=YOUR_REDIRECT_URI&grant_type=authorization_code`
})
```

4. **存取令牌回應**

Google 回應給你的應用程式一個存取令牌。

5. **資源請求**

```javascript
fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=ACCESS_TOKEN')
```

6. **資源回應**

Google 回應給你的應用程式使用者的資訊。

以上就是 OAuth 2.0 的運作流程。希望透過這篇文章，你能更透徹的理解 OAuth 2.0，並運用在你的應用程式上。