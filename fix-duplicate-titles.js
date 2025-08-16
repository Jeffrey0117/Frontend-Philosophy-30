const fs = require('fs').promises;
const path = require('path');

// 定義章節標題映射
const chapterTitles = {
  '01-platos-trichotomy-of-learning': '柏拉圖的學習三分法：主動、被動與清單的辯證',
  '02-aristotles-arrow-of-time': '亞里斯多德的時間之箭：async 與 defer 的平行與順序',
  '03-heideggers-being-and-flickering': '海德格的存在與閃爍：Reflow 與 Repaint 的形而上學',
  '04-kants-spatial-order': '康德的空間秩序：z-index 與 Stacking Context 的先驗法則',
  '05-foucaults-discipline-system': '福柯的規訓體系：CSS 選取器與瀏覽器的權力網絡',
  '06-gauss-aesthetic-of-order': '高斯的秩序美學：快速排序的演算真理',
  '07-russells-relational-logic': '羅素的關係邏輯：DOM 事件代理的思辨',
  '08-sartres-existence-and-waiting': '莎特的存在與等待：一秒間的非同步詩學',
  '09-descartes-i-closure-therefore-i-am': '笛卡兒的「我閉包故我在」',
  '10-wittgensteins-language-games': '維根斯坦的語言遊戲：一般函式與箭頭函式的界線',
  '11-heraclitus-river-of-time': '赫拉克利特的時間之河：非同步的三種形態',
  '12-platos-forms-and-shadows': '柏拉圖的物與影：為何 typeof new Array() 是物件？',
  '13-poppers-falsifiability': '波普爾的可證偽性：為何雙等號不可靠？',
  '14-hegels-dialectical-copying': '黑格爾的辯證複製法：深拷貝的正反合',
  '15-nietzsches-eternal-recurrence': '尼采的永恆輪迴：原型鏈的傳承',
  '16-spinozas-multiplicity': '斯賓諾莎的多樣性：瀏覽器差異的必然與偶然',
  '17-marxs-productive-forces': '馬克思的生產力：框架如何改變前端世界',
  '18-platos-divided-line': '柏拉圖的雙世界論：SPA 與 SSR 的兩種存在',
  '19-socratic-method-seo': '蘇格拉底的提問法：SEO 的正向因子',
  '20-laozi-subtractive-optimization': '老子的無為而治：效能優化的減法哲學',
  '21-fords-assembly-line': '福特的裝配線：Webpack 與工程化的必然',
  '22-lockes-social-contract': '洛克的契約論：跨域限制的社會契約',
  '23-newtons-law-of-inertia': '牛頓的慣性定律：網頁快取的時間機制',
  '24-smiths-invisible-hand': '史密斯的市場秩序：npm 套件管理的隱形之手',
  '25-copernican-heliocentrism': '哥白尼的日心說：Node.js 與 JavaScript 的關係',
  '26-rawls-veil-of-ignorance': '羅爾斯的公平原則：用 POST 拿資料的爭議',
  '27-mencius-inherent-goodness': '孟子的性善論：Cookie & Session 的信任基礎',
  '28-hobbes-leviathan': '霍布斯的利維坦：HTTPS 的權威與暴力',
  '29-socratic-self-examination': '蘇格拉底的審視生活：常見網站資安問題的自我檢視',
  '30-xunzis-craft-theory': '荀子的工藝論：從輸入網址到渲染的全鏈路'
};

async function fixDuplicateTitles() {
  try {
    const baseDir = __dirname;
    
    for (const [dir, title] of Object.entries(chapterTitles)) {
      const filePath = path.join(baseDir, dir, 'README.md');
      
      try {
        // 讀取文件內容
        let content = await fs.readFile(filePath, 'utf-8');
        
        // 移除 BOM 字符（如果存在）
        if (content.charCodeAt(0) === 0xFEFF) {
          content = content.substring(1);
        }
        
        // 移除重複的標題行（包含可能的中文破折號）
        // 首先移除 BOM 字符（如果存在）
        if (content.charCodeAt(0) === 0xFEFF) {
          content = content.substring(1);
        }
        
        // 將文件按行分割
        const lines = content.split('\n');
        let newContent = [];
        let foundFirstTitle = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // 檢查是否為標題行
          if (line.startsWith('# ')) {
            if (!foundFirstTitle) {
              // 保留第一個標題
              newContent.push(`# ${title}`);
              foundFirstTitle = true;
              
              // 跳過後續的空行和標題行
              while (i + 1 < lines.length) {
                const nextLine = lines[i + 1].trim();
                if (nextLine === '' || nextLine.startsWith('#')) {
                  i++;
                } else {
                  break;
                }
              }
            }
            // 跳過其他標題行
            continue;
          } else {
            newContent.push(line);
          }
        }
        
        content = newContent.join('\n');
        
        // 確保開頭是正確的標題
        if (!content.startsWith(`# ${title}`)) {
          // 如果開頭不是正確的標題，則替換第一個標題行
          content = content.replace(/^# .*\n/, `# ${title}\n`);
          // 如果沒有找到標題行，則在開頭添加
          if (!content.startsWith(`# ${title}`)) {
            content = `# ${title}\n\n${content}`;
          }
        }
        
        // 寫回文件
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`✅ 已修復 ${dir} 的標題`);
        
      } catch (error) {
        console.error(`❌ 處理 ${dir} 時出錯:`, error.message);
      }
    }
    
    console.log('\n✅ 所有章節標題修復完成！');
    
  } catch (error) {
    console.error('發生錯誤:', error);
  }
}

// 執行修復
fixDuplicateTitles();
