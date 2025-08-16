# z-index的基礎概念

在我們的網頁設計世界裡，一切都是平面的。然而，有時我們卻需要在這個平面的世界裡創造出一種「立體」的感覺。這時候，z-index就變得非常重要。z-index就像是一個「深度」的概念，讓我們可以決定哪些元素要「站在」其他元素的上面。

在進一步談論z-index之前，我們先來瞭解一下堆疊上下文(Stacking Context)。

## 堆疊上下文

堆疊上下文是一種三維的概念，它決定了元素在網頁上的顯示順序。當我們設定一個元素的z-index時，我們實際上是在其所在的堆疊上下文中為它設定了一個位置。

## z-index的工作原理

z-index的工作原理很簡單，數字越大的元素就越在上面。例如，如果我們有兩個元素，一個的z-index是1，另一個的z-index是2，那麼z-index為2的元素就會顯示在z-index為1的元素之上。

讓我們看一個例子：

```css
.element1 {
  position: absolute;
  z-index: 1;
}

.element2 {
  position: absolute;
  z-index: 2;
}
```

在這個例子中，element2將會顯示在element1之上。

但是要注意，z-index只對設置了position屬性的元素有效。也就是說，如果你沒有為元素設置position屬性，那麼z-index就沒有任何效果。

## z-index和position

如前所述，z-index只對設置了position屬性的元素有效。這意味著，如果你想要使用z-index，你必須為元素設置一個position屬性。

position屬性有四個值：static、relative、absolute和fixed。其中，static是預設值，而其他三個值都會創建一個新的堆疊上下文。

讓我們看一個例子：

```css
.element1 {
  position: relative;
  z-index: 1;
}

.element2 {
  position: absolute;
  z-index: 2;
}
```

在這個例子中，element1和element2都有自己的堆疊上下文，所以z-index可以正常工作。

## 結論

z-index是一個非常有用的CSS屬性，它讓我們可以在網頁上創建出「立體」的效果。但是要記住，z-index只對設置了position屬性的元素有效，而且每個設置了position屬性的元素都會有自己的堆疊上下文。

希望這篇文章可以幫助你更深入地理解z-index和堆疊上下文。在下一篇文章中，我們將會談論更進階的z-index技巧，敬請期待！