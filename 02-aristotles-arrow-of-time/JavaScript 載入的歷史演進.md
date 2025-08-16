# JavaScript 載入的歷史演進

## 初期的 JavaScript 載入方式

JavaScript 在早期的網頁開發中，主要是透過 `script` 標籤在 HTML 文件中插入並執行。當瀏覽器在解析 HTML 文件時，遇到 `script` 標籤，就會暫停 HTML 的解析，等待 JavaScript 檔案的下載與執行。以下是一個簡單的範例：

```html
<!DOCTYPE html>
<html>
<head>
    <script src="example.js"></script>
</head>
<body>
    <!-- 網頁內容 -->
</body>
</html>
```

這種方式有一個明顯的問題，就是會阻塞網頁的渲染。當 JavaScript 檔案過大或網路連線較差時，使用者需要等待較長時間才能看到網頁內容，這對使用者體驗非常不友善。

## Defer 與 Async 屬性的引入

為了解決這樣的問題，HTML 4.01 引入了 `defer` 屬性，HTML 5 則加入了 `async` 屬性。這兩種屬性都可以讓 JavaScript 在瀏覽器解析 HTML 的同時下載，不再阻塞網頁的渲染。

`defer` 屬性讓 JavaScript 在文檔解析完成後，按照出現的順序執行。`async` 屬性則讓 JavaScript 在下載完成後立即執行，並不保證執行順序。以下是使用這兩種屬性的範例：

```html
<!DOCTYPE html>
<html>
<head>
    <script src="example1.js" defer></script>
    <script src="example2.js" async></script>
</head>
<body>
    <!-- 網頁內容 -->
</body>
</html>
```

## 模組化的 JavaScript

隨著網頁應用程式的規模不斷擴大，JavaScript 程式碼也變得越來越複雜。於是，開發者開始尋找方法來組織他們的程式碼，而模組化的概念就此誕生。ES6 引入了模組（module）的概念，讓開發者可以更容易地組織他們的程式碼。

```html
<!DOCTYPE html>
<html>
<head>
    <script src="example.js" type="module"></script>
</head>
<body>
    <!-- 網頁內容 -->
</body>
</html>
```

在 module 中，開發者可以使用 `import` 與 `export` 關鍵字來引入與匯出變數或函式。此外，module 中的程式碼預設是延遲執行的，不會阻塞網頁的渲染。

## 結語

JavaScript 的載入方式已經從最初的阻塞式載入，發展到現在的非阻塞載入與模組化。這不只改善了網頁的載入速度，也讓開發者可以更有效率地組織他們的程式碼。我們可以期待 JavaScript 在未來會有更多的演進，為我們的網頁開發帶來更多可能性。