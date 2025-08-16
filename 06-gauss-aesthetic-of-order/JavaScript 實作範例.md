# JavaScript 快速排序演算法實作

在本篇文章中，我們將探討如何在 JavaScript 中實作快速排序演算法。快速排序是一種高效的排序演算法，它的基本概念是「分而治之」，也就是將大問題分解成小問題來解決。

## 快速排序的基本概念

快速排序的運作方式是先選擇一個基準值(pivot)，然後將數列分為兩部分：一部分是小於基準值的數列，另一部分是大於基準值的數列。接著，對這兩部分數列再進行相同的操作，直到所有的數列都已排序完成。

## 實作快速排序

現在讓我們來看看如何在 JavaScript 中實作快速排序。首先，我們需要一個函式來實現分割數列的功能，我們稱之為 `partition` 函式：

```javascript
function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
    return (i + 1);
}
```

這個 `partition` 函式的功能是將數列分割成兩部分，並返回基準值的索引。然後，我們再來實現快速排序的主函式：

```javascript
function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

這個 `quickSort` 函式的功能是對數列進行快速排序。它首先呼叫 `partition` 函式來分割數列，然後對分割後的兩個子數列進行遞迴排序。

## 測試快速排序函式

現在讓我們來測試一下我們寫的快速排序函式：

```javascript
let arr = [10, 7, 8, 9, 1, 5];
let n = arr.length;
console.log("Before sorting: ", arr);
quickSort(arr, 0, n-1);
console.log("After sorting: ", arr);
```

這段程式碼會輸出：

```
Before sorting:  [10, 7, 8, 9, 1, 5]
After sorting:  [1, 5, 7, 8, 9, 10]
```

## 結語

快速排序是一種非常高效的排序演算法，它可以在實際應用中大大提高我們的程式效能。實作快速排序可以讓我們更深入地理解「分而治之」這一演算法設計的基本原則，並將其應用在更多的問題上。