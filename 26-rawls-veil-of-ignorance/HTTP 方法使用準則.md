# HTTP 方法使用準則

大家好，我是一位資深前端工程師。今天我將會為大家介紹 HTTP 方法的使用準則，這也是 RESTful API 設計的一部分。在開始之前，讓我們先了解一下 HTTP 方法是什麼。

## 什麼是 HTTP 方法？

HTTP 方法，也被稱為「請求方法」，是 HTTP 協議中定義的一種操作請求的方式。每次我們在瀏覽器輸入網址並按下回車，或者在 AJAX 裡面發送一個請求時，都會用到 HTTP 方法。

## HTTP 方法有哪些？

HTTP 方法主要有以下幾種：
- GET：獲取資訊
- POST：新增資訊
- PUT：更新全部資訊
- PATCH：更新部分資訊
- DELETE：刪除資訊

## HTTP 方法的使用準則

### 1. GET 方法

GET 方法主要用於獲取資訊。例如，我們要獲取一個用戶的資訊，就可以使用 GET 方法。

```javascript
fetch('https://api.example.com/users/1', {
  method: 'GET',
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

### 2. POST 方法

POST 方法主要用於新增資訊。例如，我們要新增一個用戶，就可以使用 POST 方法。

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

### 3. PUT 方法

PUT 方法主要用於更新全部資訊。例如，我們要更新一個用戶的所有資訊，就可以使用 PUT 方法。

```javascript
fetch('https://api.example.com/users/1', {
  method: 'PUT',
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

### 4. PATCH 方法

PATCH 方法主要用於更新部分資訊。例如，我們只要更新一個用戶的名字，就可以使用 PATCH 方法。

```javascript
fetch('https://api.example.com/users/1', {
  method: 'PATCH',
  body: JSON.stringify({
    name: 'John Doe'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

### 5. DELETE 方法

DELETE 方法主要用於刪除資訊。例如，我們要刪除一個用戶，就可以使用 DELETE 方法。

```javascript
fetch('https://api.example.com/users/1', {
  method: 'DELETE',
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

以上就是 HTTP 方法的使用準則。希望透過這篇文章，大家能更加理解 HTTP 方法的使用方式。