# 前端三十：從 HTML 到瀏覽器渲染的形上學探究

一口氣踏上前端進階的求知之路。
那些在開發中縈繞心頭、似懂非懂的問題，這裡都有它的答案——或至少，給你一個新的提問方式。

---

## 你是否也曾沉思…

* **CSS 選取器**，究竟如何在瀏覽器的秩序中找到它的對象？
* 網站的**效能優化**，是工程還是藝術？
* **瀏覽器差異**，是必然的多元還是歷史的偶然？
* 為什麼我們會依賴**前端框架**，如同依賴工具般依賴思想？
* **HTTPS** 的安全，是信任的契約還是數學的壁壘？
* 當你輸入一個網址，**整個世界是如何從虛無到顯現**？

這本書（或說這場對話）將以三十個前端命題為起點，從最基礎的三兄弟——**HTML、CSS、JavaScript** 出發，穿越 **瀏覽器渲染原理**、**JavaScript 特性**、**演算法**、**網路基礎**、**前後端分離**、**效能優化**、**SEO 實踐**等領域，邀你踏上一次知識與思考交錯的旅程。

---

## 三大哲學範疇

### 1. 從陌生到熟悉 —— 認識的形上學

什麼是閉包？框架？SPA？SSR？SEO？
如同柏拉圖洞穴中初見光明，我們將重新定義那些似曾相識卻未曾真正理解的專有名詞，整理你的知識疆界。

### 2. 從疑惑到解答 —— 提問與反駁的辯證法

每一章的標題如同面試的尖銳提問，而內文則是蘇格拉底式的對話，引導你抵達關鍵知識點，擊破三十道前端世界的思考關卡。

### 3. 從入門到進階 —— 技術的世界觀

涵蓋 **HTML、CSS、JavaScript、Frontend、Backend、Web** 六大領域，像亞里斯多德的分類學一樣，循序展開、彼此關聯，讓你建立完整的知識體系與觀點。

---

## 誰適合閱讀這本「技術哲學集」？

* **初學者** —— 對前端的世界充滿好奇，想要建立堅實的思想與技能基礎。
* **進階開發者** —— 想用更深層的思考理解熟悉的技術。
* **架構師與技術領導** —— 希望能在決策時，有哲學家的遠見與工程師的精準。
* **任何熱愛提問的人** —— 因為真正的答案，往往從好的問題開始。

---

如果你尋找的，不只是「如何做」的技巧，而是「為什麼這麼做」的思維，**那麼這就是你該打開的卷首頁**。

---
好，那我幫你把剛剛的哲學版目錄，直接排成 **GitHub README 可折疊的章節目錄**，方便 repo 用 Markdown 一鍵展開/收合，看起來乾淨又專業：

---

## 📜 目錄

<details>
<summary><strong>Chapter 01 — 柏拉圖的學習三分法：主動、被動與清單的辯證</strong></summary>  
你最近學會了什麼新東西？  
</details>  

<details>
<summary><strong>Chapter 02 — 亞里斯多德的時間之箭：<code>async</code> 與 <code>defer</code> 的平行與順序</strong></summary>  
[HTML] script tag 加上 async & defer 的功能及差異？  
</details>  

<details>
<summary><strong>Chapter 03 — 海德格的存在與閃爍：Reflow 與 Repaint 的形而上學</strong></summary>  
[CSS] Reflow 及 Repaint 是什麼？  
</details>  

<details>
<summary><strong>Chapter 04 — 康德的空間秩序：z-index 與 Stacking Context 的先驗法則</strong></summary>  
[CSS] z-index 與 Stacking Context 的關係是什麼？  
</details>  

<details>
<summary><strong>Chapter 05 — 福柯的規訓體系：CSS 選取器與瀏覽器的權力網絡</strong></summary>  
[CSS] 元素選取器是如何運作的？  
</details>  

<details>
<summary><strong>Chapter 06 — 高斯的秩序美學：快速排序的演算真理</strong></summary>  
[JS] 請你在白板寫個快速排序演算法  
</details>  

<details>
<summary><strong>Chapter 07 — 羅素的關係邏輯：DOM 事件代理的思辨</strong></summary>  
[JS] 瀏覽器 DOM 元素的事件代理是指什麼？  
</details>  

<details>
<summary><strong>Chapter 08 — 莎特的存在與等待：一秒間的非同步詩學</strong></summary>  
[JS] 間隔一秒印出 1, 2, 3, 4, 5 的程式碼  
</details>  

<details>
<summary><strong>Chapter 09 — 笛卡兒的「我閉包故我在」</strong></summary>  
[JS] 什麼是閉包？  
</details>  

<details>
<summary><strong>Chapter 10 — 維根斯坦的語言遊戲：一般函式與箭頭函式的界線</strong></summary>  
[JS] 一般函式與箭頭函式的差異？  
</details>  

<details>
<summary><strong>Chapter 11 — 赫拉克利特的時間之河：非同步的三種形態</strong></summary>  
[JS] 如何處理網頁中的非同步？  
</details>  

<details>
<summary><strong>Chapter 12 — 柏拉圖的物與影：為何 <code>typeof new Array()</code> 是物件？</strong></summary>  
[JS] 為什麼 typeof new Array() === 'object'？  
</details>  

<details>
<summary><strong>Chapter 13 — 波普爾的可證偽性：為何雙等號不可靠？</strong></summary>  
[JS] 為什麼判斷相等時不能用雙等號？  
</details>  

<details>
<summary><strong>Chapter 14 — 黑格爾的辯證複製法：深拷貝的正反合</strong></summary>  
[JS] 深拷貝是什麼？如何實現？  
</details>  

<details>
<summary><strong>Chapter 15 — 尼采的永恆輪迴：原型鏈的傳承</strong></summary>  
[JS] 什麼是原型鏈？  
</details>  

<details>
<summary><strong>Chapter 16 — 斯賓諾莎的多樣性：瀏覽器差異的必然與偶然</strong></summary>  
[FE] 為何會有瀏覽器差異？怎麼處理？  
</details>  

<details>
<summary><strong>Chapter 17 — 馬克思的生產力：框架如何改變前端世界</strong></summary>  
[FE] 為什麼現在的前端都在用「框架」？  
</details>  

<details>
<summary><strong>Chapter 18 — 柏拉圖的雙世界論：SPA 與 SSR 的兩種存在</strong></summary>  
[FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？  
</details>  

<details>
<summary><strong>Chapter 19 — 蘇格拉底的提問法：SEO 的正向因子</strong></summary>  
[FE] 如何實現網站 SEO？  
</details>  

<details>
<summary><strong>Chapter 20 — 老子的無為而治：效能優化的減法哲學</strong></summary>  
[FE] 如何提升網站效能？  
</details>  

<details>
<summary><strong>Chapter 21 — 福特的裝配線：Webpack 與工程化的必然</strong></summary>  
[FE] 用過 Webpack 之類的打包工具嗎？為什麼需要？  
</details>  

<details>
<summary><strong>Chapter 22 — 洛克的契約論：跨域限制的社會契約</strong></summary>  
[FE] 為什麼跨域請求會產生錯誤？如何處理？  
</details>  

<details>
<summary><strong>Chapter 23 — 牛頓的慣性定律：網頁快取的時間機制</strong></summary>  
[FE] 網頁的快取機制是怎麼運作的？  
</details>  

<details>
<summary><strong>Chapter 24 — 史密斯的市場秩序：npm 套件管理的隱形之手</strong></summary>  
[BE] npm 的套件管理機制  
</details>  

<details>
<summary><strong>Chapter 25 — 哥白尼的日心說：Node.js 與 JavaScript 的關係</strong></summary>  
[BE] Node.js 與 JavaScript 的關係是什麼？  
</details>  

<details>
<summary><strong>Chapter 26 — 羅爾斯的公平原則：用 POST 拿資料的爭議</strong></summary>  
[BE] API 設計拿資料要透過 POST，會有什麼問題嗎？  
</details>  

<details>
<summary><strong>Chapter 27 — 孟子的性善論：Cookie & Session 的信任基礎</strong></summary>  
[WEB] Cookie & Session 是什麼？  
</details>  

<details>
<summary><strong>Chapter 28 — 霍布斯的利維坦：HTTPS 的權威與暴力</strong></summary>  
[WEB] HTTP 和 HTTPS 的差別是什麼？  
</details>  

<details>
<summary><strong>Chapter 29 — 蘇格拉底的審視生活：常見網站資安問題的自我檢視</strong></summary>  
[WEB] 網站常見的資安問題有哪些？  
</details>  

<details>
<summary><strong>Chapter 30 — 荀子的工藝論：從輸入網址到渲染的全鏈路</strong></summary>  
[WEB] 從輸入網址列到渲染畫面，過程經歷了什麼事情？  
</details>  

---

這樣放到 README 直接就能點開/收起章節，超適合技術筆記＋哲學命名的風格。
我可以幫你把這套目錄 **自動生成連到每章檔案的連結**，這樣點章節就直接打開內容，你要我幫你加嗎？
