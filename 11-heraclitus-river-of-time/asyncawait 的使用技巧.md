# Async/Await 的使用技巧：一次搞懂非同步處理

在 JavaScript 的世界裡，非同步（asynchronous）是一件我們無法避免的事情。無論是 AJAX 請求、讀取檔案、或是設定定時器，只要涉及到 I/O, 網路等等待時間較長的操作，我們就需要使用非同步的方式來處理。在 ES2017 中，JavaScript 引入了一種新的語法：`async/await`，讓我們可以更直觀、更簡單的處理非同步。

## 使用 Async/Await 的基本語法

`async` 與 `await` 是一對好夥伴，`async` 宣告一個函式是非同步的，而 `await` 則是等待一個 Promise 完成（resolve）。下面是一個基本的例子：

```javascript
async function fetchUser() {
  const response = await fetch("https://api.github.com/users/octocat");
  const data = await response.json();
  console.log(data);
}

fetchUser();
```

在這個例子中，我們首先使用 `fetch` 來發送網路請求。由於 `fetch` 是一個回傳 Promise 的函式，我們需要使用 `await` 來等待請求完成。接著，我們再次使用 `await` 來等待將回應的內容（response）轉換成 JSON 格式。

## Async/Await 處理錯誤的方式

在使用 `async/await` 的時候，我們也需要處理可能發生的錯誤。這時候，我們可以用 try/catch 來包裹我們的程式碼：

```javascript
async function fetchUser() {
  try {
    const response = await fetch("https://api.github.com/users/octocat");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchUser();
```

## 平行處理 Async/Await

當我們有多個非同步的操作需要執行，而這些操作之間又不相依賴的時候，我們可以使用 `Promise.all` 來平行處理這些操作：

```javascript
async function fetchUsers() {
  const responses = await Promise.all([
    fetch("https://api.github.com/users/octocat"),
    fetch("https://api.github.com/users/mojombo"),
  ]);
  const datas = await Promise.all(
    responses.map((response) => response.json())
  );
  console.log(datas);
}

fetchUsers();
```

在這個例子中，我們同時發送兩個 `fetch` 請求，然後使用 `Promise.all` 來等待所有的請求都完成。接著，我們再次使用 `Promise.all` 來等待所有的回應都被轉換成 JSON 格式。

## 結語

如此，我們就可以輕鬆地使用 `async/await` 來處理非同步操作了。雖然 `async/await` 是一種簡單、直觀的語法，但我們還是需要注意錯誤處理及平行處理的方式，才能充分發揮它的威力。希望這篇文章能對你有所幫助，讓我們一同掌握 `async/await`，成為非同步大師吧！