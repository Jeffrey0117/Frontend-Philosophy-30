# ES6 Class 語法糖解析

在JavaScript的世界裡，「Class」可能是讓人感到混淆的一個概念，尤其是對於來自Java或C#等傳統物件導向編程語言的開發者來說。在ES6之前，JavaScript並沒有Class這個概念，但在ES6中，Class被引入作為一種語法糖（Syntactic Sugar）。那麼，這個語法糖到底是什麼？它又如何工作呢？這就是我們今天要探討的議題。

## ES6 Class 與 Prototype

先來看一下ES6 Class的基本語法：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const alice = new Person('Alice');
alice.sayHello();  // "Hello, my name is Alice"
```

在這個例子中，我們定義了一個Class `Person`，並且在其中定義了一個constructor（建構子）和一個方法 `sayHello`。接著，我們用 `new` 關鍵字創建了一個新的 `Person` 實例 `alice`，並呼叫了其 `sayHello` 方法。從這個範例中，我們看到的似乎是一種非常簡單直觀的物件導向程式設計風格。

然而，JavaScript的實際運作方式並不是像我們看到的那樣。在JavaScript的底層，其實是以Prototype（原型）為基礎的。每一個JavaScript物件都有一個指向它的原型物件的內部連結。當我們試圖訪問一個物件的屬性時，JavaScript會首先在該物件本身尋找，如果找不到，它就會去該物件的原型物件中尋找，以此類推，直到找到該屬性或達到原型鏈的終點。

那麼，ES6 Class到底如何與Prototype掛鉤呢？讓我們看看下面的程式碼：

```javascript
console.log(typeof Person);  // "function"
console.log(Person.prototype);  // {constructor: ƒ, sayHello: ƒ, ...}
```

從這裡我們可以看到， `Person` 其實就是一個函式（也就是物件），並且它有一個 `prototype` 屬性，這個屬性是一個物件，包含了我們在Class中定義的所有方法。當我們創建一個新的 `Person` 實例時，這個實例的內部連結就會指向 `Person.prototype`。因此，我們可以說，ES6 Class實際上只是JavaScript原型繼承模型的一種語法糖。

## 結語

希望透過這篇文章，我們能對ES6 Class和JavaScript的原型鏈有一個更深入的理解。我們需要記住的是，即使ES6 Class提供了一種更直觀的語法，但JavaScript的底層運作方式並沒有改變，它仍然是基於Prototype的。理解這一點，對於我們進一步學習和掌握JavaScript將是非常有幫助的。