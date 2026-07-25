/**
 * 50 音記憶卡前端互動邏輯
 * 包含：動態卡片渲染、3D 翻牌控制、Web Speech API 日文語音播放
 */

// 當網頁載入完成後，自動執行渲染
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

/**
 * 動態渲染 50 音卡片 (包含手繪塗鴉記憶區塊與多組實用單字)
 */
function renderCards() {
  const grid = document.getElementById('card-grid');
  
  // 確保容器存在，避免報錯
  if (!grid) return;
  
  grid.innerHTML = '';

  gojuonData.forEach((item) => {
    // 渲染卡片背面的單字列表
    const wordsHtml = item.words.map(w => `
      <div class="word-item" onclick="playAudio(event, '${w.jp.split(' ')[0]}')">
        <div class="word-jp">${w.jp} <span class="word-romaji">(${w.romaji})</span></div>
        <div class="word-meaning">${w.meaning}</div>
      </div>
    `).join('');

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    // 組裝卡片正反面 HTML 結構
    cardContainer.innerHTML = `
      <div class="card" onclick="flipCard(this)">
        <!-- 卡片正面：平假名、片假名、羅馬拼音、發音按鈕 -->
        <div class="card-front">
          <div class="kana-pair">
            <span class="kana-hiragana" title="平假名">${item.hiragana}</span>
            <span class="kana-divider">|</span>
            <span class="kana-katakana" title="片假名">${item.katakana}</span>
          </div>
          <div class="romaji">${item.romaji}</div>
          <button class="audio-btn" onclick="playAudio(event, '${item.hiragana}')" title="播放發音">🔊</button>
        </div>
        
        <!-- 卡片反面：多維度手繪記憶區與實用單字 -->
        <div class="card-back">
          
          <!-- 手繪塗鴉風格記憶區塊 -->
          <div class="hand-drawn-box">
            <div class="mnemonic-tag">📖 情境聯想</div>
            <div class="mnemonic-content">
              👁️ <span>字形：</span>${item.mnemonics.shape}<br>
              🎵 <span>諧音：</span>${item.mnemonics.sound}<br>
              🎬 <span>故事：</span>${item.mnemonics.story}
            </div>
          </div>

          <!-- 實用單字列表 -->
          <div class="word-list">
            <span class="word-list-title">📚 實用單字 (點擊發音)</span>
            ${wordsHtml}
          </div>
        </div>
      </div>
    `;
    
    grid.appendChild(cardContainer);
  });
}

/**
 * 控制卡片翻轉效果
 * @param {HTMLElement} cardElement - 被點擊的卡片 DOM 元素
 */
function flipCard(cardElement) {
  cardElement.classList.toggle('flipped');
}

/**
 * 運用瀏覽器內建的 Web Speech API 進行日文發音
 * @param {Event} event - 點擊事件 (用於阻止冒泡)
 * @param {string} text - 欲發音的日文字串
 */
function playAudio(event, text) {
  event.stopPropagation(); // 阻止事件冒泡，避免點擊喇叭或單字時同時觸發卡片翻轉
  
  if ('speechSynthesis' in window) {
    // 停止當前正在播放的其他語音，避免語音重疊
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // 設定為日文語系
    utterance.rate = 0.85;    // 設定稍微放慢的朗讀語速，利於學習
    window.speechSynthesis.speak(utterance);
  } else {
    alert("您的瀏覽器不支援語音合成功能，建議使用 Chrome 或 Safari。");
  }
}
