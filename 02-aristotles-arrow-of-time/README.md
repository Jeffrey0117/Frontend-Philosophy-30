# 亞里斯多德的時間之箭：async 與 defer 的平行與順序
亞里斯多德認為，時間是一種「運動的度量」，它有明確的先後順序，過去不可逆，未來尚未到來。
在前端世界中，JavaScript 的載入與執行順序，正好是一種時間秩序的縮影。
`async` 與 `defer` 便是我們操控「時間箭頭」的方式——決定腳本在網頁生命週期中，何時被觸發、何時被執行。

---

## 技術主題 (Technical Topic)

在 HTML 中，`<script>` 標籤預設會**同步下載並阻塞渲染**，直到腳本載入與執行完成。
為了優化載入效率，HTML5 引入了 `async` 與 `defer` 屬性：

* **async**

  * 腳本下載與 HTML 解析**同時進行**（平行下載）。
  * 下載完成後，會**立即中斷渲染**來執行腳本。
  * 適合**獨立、不依賴 DOM** 的腳本（如統計、廣告）。

* **defer**

  * 腳本下載與 HTML 解析**同時進行**（平行下載）。
  * 會等 HTML 解析完成後才執行，且執行順序依 HTML 出現的順序。
  * 適合**依賴 DOM 結構**的初始化腳本。

---

## 程式範例 (Code Examples)

```html
<!-- 預設（阻塞） -->
<script src="main.js"></script>

<!-- async -->
<script src="analytics.js" async></script>

<!-- defer -->
<script src="app.js" defer></script>
```javascript
執行時序示意：

```plaintext
async : 下載完成 → 立即執行（可能打斷 HTML 解析）
defer : HTML 完成解析後 → 按順序執行
```

---

## 哲學與技術的對話 (Philosophy-Tech Dialogue)

> **哲學家**：時間是不可逆的，你只能沿著時間的方向前行。
> **工程師**：但在程式中，我可以決定事件何時觸發，就像操縱時間本身。
> **哲學家**：那麼，`async` 就像自由意志，隨時插入你的生活；`defer` 則像命運的安排——順序既定，但會在適當時刻發生。
> **工程師**：而預設的 `<script>`，就是你不得不面對的現實：所有事都要先停下來處理它，才能繼續。

---

## 延伸思考 (Further Thoughts)

* 在單頁應用（SPA）中，過度使用 `async` 可能導致初始化邏輯無法保證順序，產生隱藏 bug。
* 在多腳本依賴的情況下，`defer` 更能保持可預測性。
* 在哲學上，`async` 更接近混沌事件（不可預測），`defer` 更像秩序（可預測）。

---

## 參考資料 (References)

* [HTML Standard - The script element](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async)
* [MDN Web Docs - Script tag async & defer](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/script)

