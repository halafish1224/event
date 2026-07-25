          let currentType = 'hiragana';

// 初始化頁面
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

// 切換平假名 / 片假名
function switchType(type) {
  currentType = type;
  document.getElementById('btn-hiragana').classList.toggle('active', type === 'hiragana');
  document.getElementById('btn-katakana').classList.toggle('active', type === 'katakana');
  renderCards();
}

// 動態渲染 50 音卡片
function renderCards() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';

  gojuonData.forEach((item) => {
    const char = currentType === 'hiragana' ? item.hiragana : item.katakana;
    
    // 將 words 陣列轉化為多組單字的 HTML 結構
    const wordsHtml = item.words.map(w => `
      <div class="word-item" onclick="playAudio(event, '${w.jp.split(' ')[0]}')">
        <div class="word-jp">${w.jp} <span class="word-romaji">(${w.romaji})</span></div>
        <div class="word-meaning">${w.meaning}</div>
      </div>
    `).join('');

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    cardContainer.innerHTML = `
      <div class="card" onclick="flipCard(this)">
        <!-- 卡片正面 -->
        <div class="card-front">
          <div class="kana-char">${char}</div>
          <div class="romaji">${item.romaji}</div>
          <button class="audio-btn" onclick="playAudio(event, '${char}')" title="播放發音">🔊</button>
        </div>
        
        <!-- 卡片反面 (記憶口訣與多組單字) -->
        <div class="card-back">
          <div class="mnemonic-section">
            <span class="mnemonic-title">💡 趣味口訣</span>
            <p class="mnemonic-text">${item.mnemonic}</p>
          </div>
          <div class="word-list">
            <span class="word-list-title">📚 實用單字 (點擊可發音)</span>
            ${wordsHtml}
          </div>
        </div>
      </div>
    `;
    
    grid.appendChild(cardContainer);
  });
}

// 翻牌邏輯
function flipCard(cardElement) {
  cardElement.classList.toggle('flipped');
}

// 發音邏輯 (Web Speech API)
function playAudio(event, text) {
  event.stopPropagation(); // 阻止事件冒泡，避免點擊聲音按鈕時觸發翻牌
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85; // 適中的朗讀語速
    window.speechSynthesis.speak(utterance);
  } else {
    alert("您的瀏覽器不支援發音功能。");
  }
}
