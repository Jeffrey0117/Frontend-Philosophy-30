# Webpack 核心概念

Webpack 是一個強大的模組打包工具，主要用於前端資源的模組化管理和包裝。讓我們透過這篇文章，來深度理解其核心概念。

## 1. Entry (入口)

Webpack 執行打包的過程是從 Entry 開始的，它指明了 webpack 應該從哪裡開始去建立依賴圖表(dependency graph)。

```JavaScript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

在上面的例子中，'./path/to/my/entry/file.js' 就是我們的入口檔案。

## 2. Output (輸出)

Output 屬性告訴 webpack 在哪裡輸出它所創建的 bundles，以及如何命名這些檔案。

```JavaScript
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在此例子中，我們的 bundle 將被命名為 'my-first-webpack.bundle.js' 並將被輸出到 'dist' 目錄中。

## 3. Loaders (加載器)

Webpack 本身只能理解 JavaScript 和 JSON 檔案。Loaders 讓 webpack 能夠處理其他類型的檔案，並將它們轉換為有效的模組。

```JavaScript
module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

在這個範例中，`raw-loader` 被定義為對 `.txt` 文件進行轉換的 loader。

## 4. Plugins (插件)

如果 Loaders 是用於轉換某些類型的模組，那麼 Plugins 則可以用於執行範圍更廣的任務。例如，插件可以用於打包優化、資源管理以及環境變量注入等。

```JavaScript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 透過 npm 安裝

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

在此例中，`HtmlWebpackPlugin` 會產生一個全新的 HTML 文件，其中所有的 bundle 會自動添加到此文件。

## 5. Mode (模式)

Mode 參數可以讓你設定 webpack 應該如何優化你的專案。你可以設定 mode 參數為 'development', 'production' 或 'none'。

```JavaScript
module.exports = {
  mode: 'production'
};
```

這個設定將會讓 webpack 使用內建在 'production' mode 中的許多優化。

以上就是 Webpack 的五個核心概念，每個概念都有其獨特的用途，只有熟練掌握這些核心概念，才能更好的使用 Webpack。