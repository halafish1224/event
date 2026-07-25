// 動態渲染 50 音卡片 (包含手繪塗鴉記憶區塊)
function renderCards() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';

  gojuonData.forEach((item) => {
    // 渲染單字列表
    const wordsHtml = item.words.map(w => `
      <div class="word-item" onclick="playAudio(event, '${w.jp.split(' ')[0]}')">
        <div class="word-jp">${w.jp} <span class="word-romaji">(${w.romaji})</span></div>
        <div class="word-meaning">${w.meaning}</div>
      </div>
    `).join('');

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    // 將多維度記憶資料套入 HTML (加入 hand-drawn-box 手繪風格)
    cardContainer.innerHTML = `
      <div class="card" onclick="flipCard(this)">
        <!-- 卡片正面 -->
        <div class="card-front">
          <div class="kana-pair">
            <span class="kana-hiragana" title="平假名">${item.hiragana}</span>
            <span class="kana-divider">|</span>
            <span class="kana-katakana" title="片假名">${item.katakana}</span>
          </div>
          <div class="romaji">${item.romaji}</div>
          <button class="audio-btn" onclick="playAudio(event, '${item.hiragana}')" title="播放發音">🔊</button>
        </div>
        
        <!-- 卡片反面：多維度記憶與單字 -->
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
