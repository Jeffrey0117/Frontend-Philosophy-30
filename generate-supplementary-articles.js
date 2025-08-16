const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

// 檢查環境變數
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ 錯誤：請在 .env 檔案中設定 OPENAI_API_KEY');
  process.exit(1);
}

// 設定 OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 章節結構
const chapterStructure = {
  '01-platos-trichotomy-of-learning': {
    main: '學習方法的三種面向',
    articles: [
      '主動學習法：如何有效規劃學習路徑',
      '被動學習：日常吸收新知的技巧',
      '技術清單管理：如何追蹤新技術'
    ]
  },
  '02-aristotles-arrow-of-time': {
    main: '理解 script 標籤的載入時機',
    articles: [
      'JavaScript 載入的歷史演進',
      'async 與 defer 的運作原理',
      '實際應用場景比較',
      '效能優化建議'
    ]
  },
  '03-heideggers-being-and-flickering': {
    main: '瀏覽器渲染流程解析',
    articles: [
      '什麼是 Reflow 與 Repaint',
      '觸發 Reflow 的常見操作',
      '優化渲染效能的實用技巧'
    ]
  },
  '04-kants-spatial-order': {
    main: '深入理解 z-index 與堆疊上下文',
    articles: [
      'z-index 的基礎概念',
      '堆疊上下文的形成條件',
      '常見的 z-index 問題與解決方案'
    ]
  },
  '05-foucaults-discipline-system': {
    main: 'CSS 選擇器效能分析',
    articles: [
      '選擇器的匹配規則',
      '選擇器效能比較',
      '高效能選擇器的最佳實踐'
    ]
  },
  '06-gauss-aesthetic-of-order': {
    main: '快速排序演算法實作',
    articles: [
      '快速排序的基本概念',
      'JavaScript 實作範例',
      '時間與空間複雜度分析'
    ]
  },
  '07-russells-relational-logic': {
    main: '事件代理模式解析',
    articles: [
      '事件冒泡與捕獲機制',
      '事件代理的實作方式',
      '實際應用案例分析'
    ]
  },
  '08-sartres-existence-and-waiting': {
    main: 'JavaScript 非同步程式設計',
    articles: [
      'setTimeout 與 setInterval 的運作原理',
      '非同步回調的執行順序',
      '常見的非同步模式'
    ]
  },
  '09-descartes-i-closure-therefore-i-am': {
    main: '深入理解閉包',
    articles: [
      '詞法作用域解析',
      '閉包的常見應用場景',
      '記憶體管理注意事項'
    ]
  },
  '10-wittgensteins-language-games': {
    main: '函式表達式比較',
    articles: [
      '一般函式的特性',
      '箭頭函式的特殊行為',
      '使用時機與注意事項'
    ]
  },
  '11-heraclitus-river-of-time': {
    main: '非同步處理模式比較',
    articles: [
      '回調函式的問題與解決方案',
      'Promise 的運作原理',
      'async/await 的使用技巧'
    ]
  },
  '12-platos-forms-and-shadows': {
    main: 'JavaScript 型別系統',
    articles: [
      '基本型別與物件型別',
      '型別轉換的規則',
      '常見的型別判斷方法'
    ]
  },
  '13-poppers-falsifiability': {
    main: 'JavaScript 相等性比較',
    articles: [
      '== 與 === 的差異',
      '型別轉換規則解析',
      '如何避免常見的比較陷阱'
    ]
  },
  '14-hegels-dialectical-copying': {
    main: '深拷貝與淺拷貝',
    articles: [
      '淺拷貝的實現方式',
      '深拷貝的實現方式',
      '效能比較與使用時機'
    ]
  },
  '15-nietzsches-eternal-recurrence': {
    main: 'JavaScript 原型鏈',
    articles: [
      '原型與原型鏈的概念',
      '繼承的實現方式',
      'ES6 class 語法糖解析'
    ]
  },
  '16-spinozas-multiplicity': {
    main: '瀏覽器相容性處理',
    articles: [
      '常見的瀏覽器差異',
      '特性檢測與優雅降級',
      'Polyfill 與轉譯器的使用'
    ]
  },
  '17-marxs-productive-forces': {
    main: '前端框架比較',
    articles: [
      '主流框架特性比較',
      '虛擬 DOM 的運作原理',
      '選擇框架的考量因素'
    ]
  },
  '18-platos-divided-line': {
    main: 'SPA 與 SSR 比較',
    articles: [
      'SPA 的優缺點分析',
      'SSR 的實現方式',
      '混合渲染策略'
    ]
  },
  '19-socratic-method-seo': {
    main: '前端 SEO 優化',
    articles: [
      '搜尋引擎爬蟲運作原理',
      'Meta 標籤設定',
      '結構化資料標記'
    ]
  },
  '20-laozi-subtractive-optimization': {
    main: '網站效能優化',
    articles: [
      '載入效能優化',
      '執行效能優化',
      '效能監控與分析工具'
    ]
  },
  '21-fords-assembly-line': {
    main: '前端建置工具',
    articles: [
      '模組打包概念',
      'Webpack 核心概念',
      '現代化建置工具比較'
    ]
  },
  '22-lockes-social-contract': {
    main: '跨域請求處理',
    articles: [
      '同源政策解析',
      'CORS 機制詳解',
      '常見的跨域解決方案'
    ]
  },
  '23-newtons-law-of-inertia': {
    main: '瀏覽器快取機制',
    articles: [
      'HTTP 快取標頭',
      'Service Worker 應用',
      '快取策略設計'
    ]
  },
  '24-smiths-invisible-hand': {
    main: 'npm 套件管理',
    articles: [
      'package.json 詳解',
      '版本控制策略',
      '依賴管理最佳實踐'
    ]
  },
  '25-copernican-heliocentrism': {
    main: 'Node.js 與 JavaScript',
    articles: [
      'Node.js 執行環境',
      'CommonJS 模組系統',
      '前後端程式碼共用'
    ]
  },
  '26-rawls-veil-of-ignorance': {
    main: 'RESTful API 設計',
    articles: [
      'HTTP 方法使用準則',
      '資源命名規範',
      '狀態碼與錯誤處理'
    ]
  },
  '27-mencius-inherent-goodness': {
    main: 'Web 認證機制',
    articles: [
      'Session 管理',
      'JWT 實作',
      'OAuth 2.0 流程'
    ]
  },
  '28-hobbes-leviathan': {
    main: 'HTTPS 安全機制',
    articles: [
      'TLS/SSL 握手過程',
      '憑證申請與管理',
      '混合內容處理'
    ]
  },
  '29-socratic-self-examination': {
    main: 'Web 安全防護',
    articles: [
      'XSS 防護',
      'CSRF 防護',
      '點擊劫持防護'
    ]
  },
  '30-xunzis-craft-theory': {
    main: '網頁載入流程',
    articles: [
      'DNS 解析過程',
      'TCP 連線建立',
      '關鍵渲染路徑優化'
    ]
  }
};

// 生成文章的提示詞模板
const PROMPT_TEMPLATE = (chapterTitle, articleTitle) => `
請用繁體中文寫一篇關於「${articleTitle}」的技術文章，這是「${chapterTitle}」的補充文章。

要求：
1. 保持專業且易於理解
2. 包含實際的程式碼範例
3. 結合技術與哲學思考
4. 字數約 1000-1500 字
5. 使用 Markdown 格式
6. 包含適當的標題層級

請直接開始撰寫文章內容，不需要回覆提示詞。
`;

// 生成單篇文章
async function generateArticle(chapterDir, chapterTitle, articleTitle) {
  try {
    const prompt = PROMPT_TEMPLATE(chapterTitle, articleTitle);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一位資深前端工程師，請用專業且生動的方式撰寫技術文章,請不要加入哲學思考,文字簡單易懂。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content;
    const safeTitle = articleTitle.replace(/[\\/:*?"<>|]/g, '');
    const filePath = path.join(chapterDir, `${safeTitle}.md`);
    
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`✅ 已生成: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ 生成文章失敗 (${articleTitle}):`, error.message);
    return false;
  }
}

// 處理單個章節
async function processChapter(chapterDir, chapterData) {
  try {
    // 確保章節目錄存在
    await fs.mkdir(chapterDir, { recursive: true });
    
    const { main, articles } = chapterData;
    const chapterName = path.basename(chapterDir);
    
    console.log(`\n📚 處理章節: ${chapterName} - ${main}`);
    
    // 生成補充文章
    const articlePromises = articles.map(article => 
      generateArticle(chapterDir, main, article)
    );
    
    await Promise.all(articlePromises);
    console.log(`✅ 章節 ${chapterName} 處理完成`);
    
  } catch (error) {
    console.error(`❌ 處理章節失敗 (${chapterDir}):`, error.message);
  }
}

// 主函數
async function main() {

  const baseDir = path.join(__dirname);
  const chapters = Object.entries(chapterStructure);
  
  // 並發處理所有章節（限制同時處理 3 個章節）
  const BATCH_SIZE = 3;
  for (let i = 0; i < chapters.length; i += BATCH_SIZE) {
    const batch = chapters.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(([chapterDir, chapterData]) => 
        processChapter(path.join(baseDir, chapterDir), chapterData)
      )
    );
    
    // 批次之間暫停一下，避免觸發 API 限制
    if (i + BATCH_SIZE < chapters.length) {
      console.log('\n⏳ 批次處理完成，等待 10 秒...\n');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.log('\n🎉 所有章節處理完成！');
}

// 執行
main().catch(console.error);
