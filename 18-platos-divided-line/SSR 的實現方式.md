# SSR的實現方式

在前一篇文章中，我們討論了SPA和SSR的差異與各自的優缺點。今天我們來深入探討一下SSR（Server Side Rendering）的實現方式。

## 什麼是SSR？

首先，讓我們來復習一下什麼是SSR。SSR，全名為Server Side Rendering，意指在伺服器端直接生成要呈現的HTML，再傳送至客戶端的技術。這種技術的好處是前端畫面能更快顯示給使用者，並且有助於SEO。

## SSR的實現方式

要實現SSR，我們需要伺服器端與客戶端的程式共享。在Node.js環境中，一個常見的實現方式是使用像是Next.js或Nuxt.js這類的框架。這兩個框架都提供了內建的SSR功能，讓開發者能輕鬆實現SSR。

以Nuxt.js為例子，我們可以透過以下步驟來實現SSR：

1. 首先，我們需要在`nuxt.config.js`中設定`mode: 'universal'`，這是Nuxt.js的內建設定，用於開啟SSR。

```javascript
export default {
  mode: 'universal',
  //...
}
```

2. 接著，在我們的Vue組件中，我們可以透過`asyncData`或`fetch`這兩個方法來取得伺服器端的資料。

```javascript
export default {
  async asyncData({ params }) {
    let { data } = await axios.get(`https://api.example.com/posts/${params.id}`)
    return { title: data.title }
  }
}
```

3. 最後，當我們的應用程式在伺服器端運行時，Nuxt.js會自動把我們在`asyncData`或`fetch`中取得的資料，渲染在生成的HTML中。

```html
<div>
  <h1>{{ title }}</h1>
</div>
```

透過這樣的方式，我們就能輕鬆地在Node.js環境中實現SSR。

## 結語

SSR是一種重要的前端技術，在某些應用場景中，它能帶來顯著的優勢。然而，實現SSR並不容易，需要前端工程師具備一定的後端開發經驗。但是有了像Next.js或Nuxt.js這類的框架，我們可以大大簡化這個過程。

還有更多關於SSR的實現方式和技術細節，這裡就不一一詳述了。希望這篇文章能幫助你對SSR有更深入的理解。