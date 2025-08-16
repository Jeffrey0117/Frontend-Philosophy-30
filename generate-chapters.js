const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');
const Bottleneck = require('bottleneck');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize OpenAI with API key from environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('請在 .env 文件中設置 OPENAI_API_KEY');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiter: 3 requests per minute to stay within free tier limits
const limiter = new Bottleneck({
  minTime: 20000, // 20 seconds between requests (3 requests per minute)
  maxConcurrent: 1
});

// 所有章節數據
const chapterData = [
  {
    dir: '03-heideggers-being-and-flickering',
    title: '海德格的存在與閃爍：Reflow 與 Repaint 的形而上學',
    question: '[CSS] Reflow 及 Repaint 是什麼？',
    philosopher: '海德格',
    concept: '存在與時間',
    tech: '瀏覽器渲染流程',
    keywords: ['Reflow', 'Repaint', '瀏覽器渲染', '效能優化']
  },
  {
    dir: '04-kants-spatial-order',
    title: '康德的空間秩序：z-index 與 Stacking Context 的先驗法則',
    question: '[CSS] z-index 與 Stacking Context 的關係是什麼？',
    philosopher: '康德',
    concept: '先驗空間觀',
    tech: 'CSS 層疊上下文',
    keywords: ['z-index', 'Stacking Context', '層疊順序', 'CSS 定位']
  },
  {
    dir: '05-foucaults-discipline-system',
    title: '福柯的規訓體系：CSS 選取器與瀏覽器的權力網絡',
    question: '[CSS] 元素選取器是如何運作的？',
    philosopher: '傅柯',
    concept: '規訓與懲罰',
    tech: 'CSS 選擇器',
    keywords: ['CSS 選擇器', '選擇器優先級', '效能優化', 'CSS 規則']
  },
  {
    dir: '06-gauss-aesthetic-of-order',
    title: '高斯的秩序美學：快速排序的演算真理',
    question: '[JS] 請你在白板寫個快速排序演算法',
    philosopher: '高斯',
    concept: '數學秩序',
    tech: '排序演算法',
    keywords: ['快速排序', '演算法', '時間複雜度', '遞迴']
  },
  {
    dir: '07-russells-relational-logic',
    title: '羅素的關係邏輯：DOM 事件代理的思辨',
    question: '[JS] 瀏覽器 DOM 元素的事件代理是指什麼？',
    philosopher: '羅素',
    concept: '關係邏輯',
    tech: '事件代理',
    keywords: ['事件冒泡', '事件捕獲', '事件委託', '效能優化']
  },
  {
    dir: '08-sartres-existence-and-waiting',
    title: '莎特的存在與等待：一秒間的非同步詩學',
    question: '[JS] 間隔一秒印出 1, 2, 3, 4, 5 的程式碼',
    philosopher: '沙特',
    concept: '存在與虛無',
    tech: '非同步程式設計',
    keywords: ['setTimeout', 'Promise', 'async/await', '事件循環']
  },
  {
    dir: '09-descartes-i-closure-therefore-i-am',
    title: '笛卡兒的「我閉包故我在」',
    question: '[JS] 什麼是閉包？',
    philosopher: '笛卡兒',
    concept: '我思故我在',
    tech: '閉包(Closure)',
    keywords: ['作用域', '詞法作用域', '記憶體管理', '私有變數']
  },
  {
    dir: '10-wittgensteins-language-games',
    title: '維根斯坦的語言遊戲：一般函式與箭頭函式的界線',
    question: '[JS] 一般函式與箭頭函式的差異？',
    philosopher: '維根斯坦',
    concept: '語言遊戲',
    tech: 'JavaScript 函式',
    keywords: ['this 綁定', '建構函式', 'arguments 物件', '簡潔語法']
  },
  {
    dir: '11-heraclitus-river-of-time',
    title: '赫拉克利特的時間之河：非同步的三種形態',
    question: '[JS] 如何處理網頁中的非同步？',
    philosopher: '赫拉克利特',
    concept: '萬物流變',
    tech: '非同步處理',
    keywords: ['Callback', 'Promise', 'async/await', '事件循環']
  },
  {
    dir: '12-platos-forms-and-shadows',
    title: '柏拉圖的物與影：為何 `typeof new Array()` 是物件？',
    question: '[JS] 為什麼 typeof new Array() === "object"？',
    philosopher: '柏拉圖',
    concept: '理型論',
    tech: 'JavaScript 型別系統',
    keywords: ['型別轉換', '原型鏈', 'instanceof', 'Array.isArray']
  },
  {
    dir: '13-poppers-falsifiability',
    title: '波普爾的可證偽性：為何雙等號不可靠？',
    question: '[JS] 為什麼判斷相等時不能用雙等號？',
    philosopher: '卡爾·波普爾',
    concept: '可證偽性',
    tech: 'JavaScript 相等性比較',
    keywords: ['==', '===', '型別轉換', '嚴格相等']
  },
  {
    dir: '14-hegels-dialectical-copying',
    title: '黑格爾的辯證複製法：深拷貝的正反合',
    question: '[JS] 深拷貝是什麼？如何實現？',
    philosopher: '黑格爾',
    concept: '辯證法',
    tech: '深拷貝與淺拷貝',
    keywords: ['Object.assign', '展開運算符', 'JSON 方法', '遞迴實作']
  },
  {
    dir: '15-nietzsches-eternal-recurrence',
    title: '尼采的永恆輪迴：原型鏈的傳承',
    question: '[JS] 什麼是原型鏈？',
    philosopher: '尼采',
    concept: '永恆輪迴',
    tech: 'JavaScript 原型繼承',
    keywords: ['prototype', '__proto__', 'constructor', '繼承']
  },
  {
    dir: '16-spinozas-multiplicity',
    title: '斯賓諾莎的多樣性：瀏覽器差異的必然與偶然',
    question: '[FE] 為何會有瀏覽器差異？怎麼處理？',
    philosopher: '斯賓諾莎',
    concept: '實體與屬性',
    tech: '跨瀏覽器兼容性',
    keywords: ['特性檢測', 'Polyfill', 'Normalize.css', 'Babel']
  },
  {
    dir: '17-marxs-productive-forces',
    title: '馬克思的生產力：框架如何改變前端世界',
    question: '[FE] 為什麼現在的前端都在用「框架」？',
    philosopher: '馬克思',
    concept: '生產力與生產關係',
    tech: '前端框架演進',
    keywords: ['React', 'Vue', 'Angular', '虛擬 DOM']
  },
  {
    dir: '18-platos-divided-line',
    title: '柏拉圖的雙世界論：SPA 與 SSR 的兩種存在',
    question: '[FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？',
    philosopher: '柏拉圖',
    concept: '理型世界與現象世界',
    tech: '前端渲染策略',
    keywords: ['單頁應用', '伺服器端渲染', '靜態網站生成', '水合(Hydration)']
  },
  {
    dir: '19-socratic-method-seo',
    title: '蘇格拉底的提問法：SEO 的正向因子',
    question: '[FE] 如何實現網站 SEO？',
    philosopher: '蘇格拉底',
    concept: '詰問法',
    tech: '搜尋引擎優化',
    keywords: ['Meta 標籤', '語義化 HTML', '網站地圖', '結構化資料']
  },
  {
    dir: '20-laozi-subtractive-optimization',
    title: '老子的無為而治：效能優化的減法哲學',
    question: '[FE] 如何提升網站效能？',
    philosopher: '老子',
    concept: '無為而治',
    tech: '前端效能優化',
    keywords: ['程式碼分割', '快取策略', '圖片優化', '懶加載']
  },
  {
    dir: '21-fords-assembly-line',
    title: '福特的裝配線：Webpack 與工程化的必然',
    question: '[FE] 用過 Webpack 之類的打包工具嗎？為什麼需要？',
    philosopher: '亨利·福特',
    concept: '裝配線生產',
    tech: '前端工程化',
    keywords: ['模組化', '程式碼分割', 'Tree Shaking', '熱更新']
  },
  {
    dir: '22-lockes-social-contract',
    title: '洛克的契約論：跨域限制的社會契約',
    question: '[FE] 為什麼跨域請求會產生錯誤？如何處理？',
    philosopher: '約翰·洛克',
    concept: '社會契約論',
    tech: '跨域資源共享',
    keywords: ['CORS', 'JSONP', '代理伺服器', 'Nginx 配置']
  },
  {
    dir: '23-newtons-law-of-inertia',
    title: '牛頓的慣性定律：網頁快取的時間機制',
    question: '[FE] 網頁的快取機制是怎麼運作的？',
    philosopher: '牛頓',
    concept: '慣性定律',
    tech: '瀏覽器快取',
    keywords: ['Cache-Control', 'ETag', 'Service Worker', 'HTTP 快取']
  },
  {
    dir: '24-smiths-invisible-hand',
    title: '史密斯的市場秩序：npm 套件管理的隱形之手',
    question: '[BE] npm 的套件管理機制',
    philosopher: '亞當·斯密',
    concept: '看不見的手',
    tech: '套件管理',
    keywords: ['package.json', '版本控制', '依賴地獄', 'Yarn/pnpm']
  },
  {
    dir: '25-copernican-heliocentrism',
    title: '哥白尼的日心說：Node.js 與 JavaScript 的關係',
    question: '[BE] Node.js 與 JavaScript 的關係是什麼？',
    philosopher: '哥白尼',
    concept: '日心說',
    tech: 'JavaScript 執行環境',
    keywords: ['V8 引擎', 'CommonJS', '非阻塞 I/O', '事件驅動']
  },
  {
    dir: '26-rawls-veil-of-ignorance',
    title: '羅爾斯的公平原則：用 POST 拿資料的爭議',
    question: '[BE] API 設計拿資料要透過 POST，會有什麼問題嗎？',
    philosopher: '約翰·羅爾斯',
    concept: '無知之幕',
    tech: 'RESTful API 設計',
    keywords: ['HTTP 方法', '冪等性', 'REST', 'GraphQL']
  },
  {
    dir: '27-mencius-inherent-goodness',
    title: '孟子的性善論：Cookie & Session 的信任基礎',
    question: '[WEB] Cookie & Session 是什麼？',
    philosopher: '孟子',
    concept: '性善論',
    tech: '用戶會話管理',
    keywords: ['HTTP 無狀態', 'JWT', 'CSRF 防護', 'SameSite']
  },
  {
    dir: '28-hobbes-leviathan',
    title: '霍布斯的利維坦：HTTPS 的權威與暴力',
    question: '[WEB] HTTP 和 HTTPS 的差別是什麼？',
    philosopher: '霍布斯',
    concept: '利維坦',
    tech: '網路安全',
    keywords: ['TLS/SSL', '對稱加密', '非對稱加密', '數位憑證']
  },
  {
    dir: '29-socratic-self-examination',
    title: '蘇格拉底的審視生活：常見網站資安問題的自我檢視',
    question: '[WEB] 網站常見的資安問題有哪些？',
    philosopher: '蘇格拉底',
    concept: '認識你自己',
    tech: '網站安全',
    keywords: ['XSS', 'SQL 注入', 'CSRF', '點擊劫持']
  },
  {
    dir: '30-xunzis-craft-theory',
    title: '荀子的工藝論：從輸入網址到渲染的全鏈路',
    question: '[WEB] 從輸入網址列到渲染畫面，過程經歷了什麼事情？',
    philosopher: '荀子',
    concept: '化性起偽',
    tech: '瀏覽器運作原理',
    keywords: ['DNS 查詢', 'TCP 握手', '關鍵渲染路徑', '重排重繪']
  }
];

// 動態生成提示詞
function generatePrompt(chapter) {
  return `請以技術作家風格撰寫一篇關於「${chapter.tech}」的文章，標題為「${chapter.title}」，內容需包含：

1. 哲學概念：從${chapter.philosopher}的「${chapter.concept}」角度解釋${chapter.tech}
2. 技術解析：詳細說明${chapter.keywords.join('、')}的機制與相互關係
3. 實用建議：如何正確使用${chapter.keywords[0]}來解決實際問題
4. 程式範例：展示常見的應用場景與最佳實踐
5. 哲學與技術的對話：將${chapter.tech}比作${chapter.philosopher}哲學中的概念

請使用繁體中文撰寫，並確保內容專業、準確且易於理解。`;
}

// 準備章節數據
const chapters = chapterData.map(chapter => ({
  ...chapter,
  prompt: generatePrompt(chapter)
}));

async function generateChapterContent(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一位精通網頁開發的哲學家，擅長用淺顯易懂的方式解釋技術概念，並能將哲學思想與技術實踐相結合。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error);
    return null;
  }
}

async function processChapter(chapter) {
  console.log(`Processing chapter: ${chapter.title}`);
  
  const content = await generateChapterContent(chapter.prompt);
  
  if (content) {
    const filePath = path.join(__dirname, chapter.dir, 'README.md');
    await fs.writeFile(filePath, `# ${chapter.title}\n\n${content}`, 'utf8');
    console.log(`✅ Completed: ${chapter.title}`);
  } else {
    console.error(`❌ Failed to generate content for: ${chapter.title}`);
  }
}

async function main() {
  console.log('Starting chapter generation...');
  
  // Process chapters in sequence with rate limiting
  for (const chapter of chapters) {
    await limiter.schedule(() => processChapter(chapter));
  }
  
  console.log('All chapters processed!');
}

// Create .env file if it doesn't exist
async function setup() {
  try {
    await fs.access('.env');
    console.log('.env file exists, proceeding...');
  } catch {
    await fs.writeFile(
      '.env',
      '# OpenAI API Key\nOPENAI_API_KEY=your_api_key_here\n',
      'utf8'
    );
    console.log('Created .env file. Please add your OpenAI API key and run the script again.');
    process.exit(0);
  }
}

// Run setup and then main
setup().then(main).catch(console.error);
