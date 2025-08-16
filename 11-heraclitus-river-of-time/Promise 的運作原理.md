# Promise 的運作原理

## 前言

在 JavaScript 的世界裡，非同步操作是無所不在的。從發送 HTTP 請求、讀取本地檔案，到設定定時器，無一不需要花上一些時間來完成。Promise 是一種代表非同步運算結果的物件，可以讓我們以更直觀、更一致的方式來處理非同步運算。在本篇文章中，我們將會探討 Promise 的運作原理。

## Promise 的基本運作

Promise 是一個代表非同步運算的「擔保」，它有三個狀態：pending（待定）、fulfilled（已實現）、rejected（已拒絕）。

一個新的 Promise 創建時，其狀態為 pending。然後，當非同步運算完成時，Promise 會變為 fulfilled 或 rejected 狀態。一旦 Promise 的狀態改變，就不能再改變。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise fulfilled!');
  }, 1000);
});

promise.then(result => {
  console.log(result); // 'Promise fulfilled!'
});
```

## Promise 的鏈接與錯誤處理

當我們在 Promise 上調用 `then` 或 `catch` 方法時，會創建並返回一個新的 Promise。這使我們可以將 Promise 串連起來，形成一個 Promise 鏈。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 1 fulfilled!');
  }, 1000);
});

promise
  .then(result => {
    console.log(result); // 'Promise 1 fulfilled!'
    return 'Promise 2 fulfilled!';
  })
  .then(result => {
    console.log(result); // 'Promise 2 fulfilled!'
  });
```

如果在 Promise 鏈中發生錯誤（即一個 Promise 被 rejected），則該錯誤將會「跳過」所有後續的 `then` 處理程序，直到被一個 `catch` 處理程序捕獲。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise rejected!');
  }, 1000);
});

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error); // 'Promise rejected!'
  });
```

## 結語

Promise 提供了一種統一的接口來處理非同步運算。透過 Promise，我們可以將非同步運算包裝成具有一定規範的物件，並使用 `then` 和 `catch` 方法來進行非同步程式碼的組織和錯誤處理。理解 Promise 的運作原理，對於編寫高效與可讀性高的 JavaScript 程式碼是非常重要的。

希望這篇文章對於理解 Promise 的運作原理有所幫助，並期待在下一篇文章中與大家繼續探討 JavaScript 的非同步處理模式。