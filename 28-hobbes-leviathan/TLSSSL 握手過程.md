# TLS/SSL 握手過程：網路安全的基石

在我們進行網路通訊時，如何確保資訊的安全傳輸一直是個重要的議題，為了解決這個問題，我們便有了 HTTPS。然而，HTTPS 的基礎建立在 TLS/SSL 上，而這兩者又是如何工作的呢？在這篇文章中，我們將探討 TLS/SSL 的握手過程。

## 什麼是 TLS/SSL？

TLS (Transport Layer Security，傳輸層安全) 與 SSL (Secure Sockets Layer，安全通訊協定)，是為了保護網路通訊而設計的協定，它們可以確保資料在網路中的傳輸過程中不會被竊取或修改。

## TLS/SSL 握手過程

TLS/SSL 握手過程是一種協商機制，其目的是確定雙方都能夠接受的密鑰。以下是一個簡化的握手過程：

1. 客戶端發送一個 "hello" 訊息給伺服器，訊息中包含了客戶端支援的 TLS 版本、加密套件等資訊。
2. 伺服器回應一個 "hello" 訊息給客戶端，選擇一個客戶端也支援的加密套件，並且傳送伺服器的公鑰和證書。
3. 客戶端確認伺服器的證書有效，然後使用伺服器的公鑰加密一個 "pre-master secret"，並將之傳送給伺服器。
4. 伺服器使用自己的私鑰解密得到 "pre-master secret"，然後雙方根據這個 "pre-master secret" 生成一組 "master secret"。
5. 最後，雙方都使用這個 "master secret" 來加密和解密通訊的資料。

## 程式碼範例

以下是一個 Python 程式碼範例，使用 OpenSSL 實現了 TLS 握手過程：

```python
from OpenSSL import SSL

# 建立一個新的 SSL Context
ctx = SSL.Context(SSL.TLSv1_2_METHOD)

# 載入伺服器的證書和私鑰
ctx.use_certificate_file("server.crt")
ctx.use_privatekey_file("server.key")

# 建立一個 SSL Connection
conn = SSL.Connection(ctx, socket)

# 進行 SSL 握手
conn.do_handshake()
```

上述程式碼是一個非常基礎的 TLS 握手示範，實際使用時，可能還需要加入錯誤處理機制、證書驗證等步驟。

## 結論

TLS/SSL 握手過程是 HTTPS 及許多其他安全通訊協定的基礎，它確保了我們在網路中傳輸的資訊不會被其他人竊取或修改。然而，為了確保安全，我們不僅需要了解其運作方式，更需要正確地實現和使用。