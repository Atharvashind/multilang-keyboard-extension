// MultiLang Keyboard - Browser Extension
(function() {
  'use strict';
  
  if (window.multilangKeyboardLoaded) return;
  window.multilangKeyboardLoaded = true;

  const LAYOUTS = {
    english: {
      name: 'English',
      normal: [['`','1','2','3','4','5','6','7','8','9','0','-','=','←'],['q','w','e','r','t','y','u','i','o','p','[',']'],['a','s','d','f','g','h','j','k','l',';','\'','Enter'],['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],['Space']],
      shift: [['~','!','@','#','$','%','^','&','*','(',')','_','+','←'],['Q','W','E','R','T','Y','U','I','O','P','{','}'],['A','S','D','F','G','H','J','K','L',':','"','Enter'],['Shift','Z','X','C','V','B','N','M','<','>','?','Shift'],['Space']]
    },
    hindi: {
      name: 'हिन्दी',
      normal: [['ॊ','१','२','३','४','५','६','७','८','९','०','-','ृ','←'],['ौ','ै','ा','ी','ू','ब','ह','ग','द','ज','ड','़'],['ो','े','्','ि','ु','प','र','क','त','च','ट','Enter'],['Shift','ं','म','न','व','ल','स',',','.','य','Shift'],['Space']],
      shift: [['ऒ','ऍ','ॅ','्र','र्द','ट्ठ','ण','घ','ङ','झ','़','ः','←'],['औ','ऐ','आ','ई','ऊ','भ','ः','ग','ध','झ','ढ'],['ओ','ए','अ','इ','उ','फ','ऱ','ख','थ','छ','ठ','Enter'],['Shift','ँ','म','न','व','ल','श','ष','।','य','Shift'],['Space']]
    },
    marathi: {
      name: 'मराठी',
      normal: [['ॊ','१','२','३','४','५','६','७','८','९','०','-','ृ','←'],['ौ','ै','ा','ी','ू','ब','ह','ग','द','ज','ड','़'],['ो','े','्','ि','ु','प','र','क','त','च','ट','Enter'],['Shift','ळ','ं','म','न','व','ल','स',',','.','य','Shift'],['Space']],
      shift: [['ऒ','ऍ','ॅ','्र','र्द','ट्ठ','ण','घ','ङ','झ','़','ः','←'],['औ','ऐ','आ','ई','ऊ','भ','ः','ग','ध','झ','ढ'],['ओ','ए','अ','इ','उ','फ','ऱ','ख','थ','छ','ठ','Enter'],['Shift','ऴ','ं','म','न','व','ल','श','ष','।','य','Shift'],['Space']]
    },
    telugu: {
      name: 'తెలుగు',
      normal: [['ొ','౧','౨','౩','౪','౫','౬','౭','౮','౯','౦','-','ృ','←'],['ౌ','ై','ా','ీ','ూ','బ','హ','గ','ద','జ','డ','ఞ'],['ో','ే','్','ి','ు','ప','ర','క','త','చ','ట','Enter'],['Shift','ె','ం','మ','న','వ','ల','స',',','.','య','Shift'],['Space']],
      shift: [['ఒ','ఎ','ఏ','ర్','జ్ఞ','త్ర','క్ష','శ్ర','(','(','ః','ఋ','←'],['ఔ','ఐ','ఆ','ఈ','ఊ','భ','ఙ','ఘ','ధ','ఝ','ఢ'],['ఓ','ఏ','అ','ఇ','ఉ','ఫ','ఱ','ఖ','థ','ఛ','ఠ','Enter'],['Shift','ఁ','మ','న','వ','ళ','శ','ష','।','య','Shift'],['Space']]
    },
    tamil: {
      name: 'தமிழ்',
      normal: [['ொ','௧','௨','௩','௪','௫','௬','௭','௮','௯','௦','-','்','←'],['ௌ','ை','ா','ீ','ூ','ப','ஹ','க','த','ஜ','ட','ஞ'],['ோ','ே','்','ி','ு','ப','ர','க','த','ச','ட','Enter'],['Shift','ெ','ஂ','ம','ந','வ','ல','ச',',','.','ய','Shift'],['Space']],
      shift: [['ஒ','எ','ஏ','ற்','க்ஷ','ஸ்','ஷ்','ஸ்ரீ','(','(',':','ஃ','←'],['ஔ','ஐ','ஆ','ஈ','ஊ','ப','ஹ','க','த','ஜ','ட'],['ஓ','ஏ','அ','இ','உ','ப','ற','க','த','ச','ட','Enter'],['Shift','ஂ','ம','ன','வ','ள','ஸ','ஷ','।','ய','Shift'],['Space']]
    },
    bengali: {
      name: 'বাংলা',
      normal: [['্','১','২','৩','৪','৫','৬','৭','৮','৯','০','-','ৃ','←'],['ৌ','ৈ','া','ী','ূ','ব','হ','গ','দ','জ','ড','়'],['ো','ে','্','ি','ু','প','র','ক','ত','চ','ট','Enter'],['Shift','ঁ','ম','ন','ভ','ল','স',',','.','য','Shift'],['Space']],
      shift: [['ঔ','ঐ','আ','ঈ','ঊ','ভ','ঃ','গ','ধ','ঝ','ঢ','←'],['ও','এ','অ','ই','উ','ফ','র','খ','থ','ছ','ঠ','Enter'],['Shift','ঁ','ম','ন','ভ','ল','শ','ষ','।','য়','Shift'],['Space']]
    }
  };

  let currentInput = null;
  let currentLang = 'english';
  let isShift = false;

  // Create floating toggle button
  function createFloatingButton() {
    const btn = document.createElement('div');
    btn.id = 'mlk-floating-btn';
    btn.innerHTML = '⌨️';
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
      z-index: 2147483647;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
      transition: transform 0.3s, opacity 0.3s;
      opacity: 0;
      pointer-events: none;
    `;
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleKeyboard();
    });
    
    document.body.appendChild(btn);
    return btn;
  }

  const floatingBtn = createFloatingButton();

  // Show/hide floating button on input focus
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('input, textarea, [contenteditable="true"]')) {
      currentInput = e.target;
      floatingBtn.style.opacity = '1';
      floatingBtn.style.pointerEvents = 'all';
    }
  });

  document.addEventListener('focusout', (e) => {
    setTimeout(() => {
      if (!document.activeElement.matches('input, textarea, [contenteditable="true"]')) {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
      }
    }, 200);
  });

  // Create keyboard panel
  function createKeyboardPanel() {
    const panel = document.createElement('div');
    panel.id = 'mlk-keyboard-panel';
    panel.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 360px;
      max-width: 90vw;
      background: #1a1a2e;
      border-radius: 20px;
      padding: 20px;
      z-index: 2147483646;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      display: none;
      font-family: 'Segoe UI', sans-serif;
    `;
    
    document.body.appendChild(panel);
    return panel;
  }

  const panel = createKeyboardPanel();

  function toggleKeyboard() {
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
      floatingBtn.style.transform = 'scale(1)';
    } else {
      panel.style.display = 'block';
      floatingBtn.style.transform = 'scale(0.9)';
      renderKeyboard();
    }
  }

  function renderKeyboard() {
    const layout = LAYOUTS[currentLang];
    const rows = isShift ? layout.shift : layout.normal;
    
    panel.innerHTML = `
      <div style="display: flex; gap: 8px; margin-bottom: 15px; overflow-x: auto; padding-bottom: 5px;">
        ${Object.keys(LAYOUTS).map(l => `
          <button data-lang="${l}" style="
            background: ${l === currentLang ? '#667eea' : 'rgba(255,255,255,0.1)'};
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            white-space: nowrap;
            font-family: inherit;
          ">${LAYOUTS[l].name}</button>
        `).join('')}
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${rows.map(row => `
          <div style="display: flex; gap: 6px; justify-content: center;">
            ${row.map(key => {
              let style = 'background: #16213e; color: white; border: none; border-radius: 10px; height: 50px; flex: 1; max-width: 55px; font-size: 18px; cursor: pointer; box-shadow: 0 4px 0 #0a0a1a; user-select: none;';
              if (key === 'Space') style += ' max-width: 180px; flex: 3;';
              if (['Enter','←'].includes(key)) style += ' max-width: 80px; background: #e94560; font-size: 14px;';
              if (key === 'Shift') {
                style += ` max-width: 80px; background: ${isShift ? '#f59e0b' : '#48484a'}; font-size: 14px;`;
              }
              return `<button data-key="${key}" style="${style}">${key === 'Space' ? '␣' : key}</button>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
        <button id="mlk-copy" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;">📋 Copy</button>
        <button id="mlk-clear" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;">🗑️ Clear</button>
        <button id="mlk-close" style="background: #374151; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;">✕ Close</button>
      </div>
    `;
    
    // Language buttons
    panel.querySelectorAll('button[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        isShift = false;
        renderKeyboard();
      });
    });
    
    // Key buttons
    panel.querySelectorAll('button[data-key]').forEach(key => {
      key.addEventListener('click', () => {
        const k = key.dataset.key;
        if (!currentInput) return;
        
        if (k === '←') {
          if (currentInput.value !== undefined) {
            currentInput.value = currentInput.value.slice(0, -1);
          } else {
            currentInput.textContent = currentInput.textContent.slice(0, -1);
          }
        } else if (k === 'Space') {
          insertText(' ');
        } else if (k === 'Enter') {
          insertText('\n');
        } else if (k === 'Shift') {
          isShift = !isShift;
          renderKeyboard();
          return;
        } else {
          insertText(k);
          if (isShift) {
            isShift = false;
            renderKeyboard();
          }
        }
        
        currentInput.dispatchEvent(new Event('input', {bubbles: true}));
        currentInput.focus();
      });
    });
    
    // Action buttons
    panel.querySelector('#mlk-copy').addEventListener('click', () => {
      const text = currentInput?.value || currentInput?.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied!');
      });
    });
    
    panel.querySelector('#mlk-clear').addEventListener('click', () => {
      if (currentInput.value !== undefined) {
        currentInput.value = '';
      } else {
        currentInput.textContent = '';
      }
      currentInput.dispatchEvent(new Event('input', {bubbles: true}));
    });
    
    panel.querySelector('#mlk-close').addEventListener('click', toggleKeyboard);
  }

  function insertText(text) {
    if (!currentInput) return;
    
    if (currentInput.value !== undefined) {
      const start = currentInput.selectionStart || currentInput.value.length;
      const end = currentInput.selectionEnd || currentInput.value.length;
      currentInput.value = currentInput.value.substring(0, start) + text + currentInput.value.substring(end);
      currentInput.setSelectionRange(start + text.length, start + text.length);
    } else {
      currentInput.textContent += text;
    }
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      z-index: 2147483647;
      font-size: 14px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (panel.style.display === 'block' && !panel.contains(e.target) && e.target !== floatingBtn) {
      panel.style.display = 'none';
      floatingBtn.style.transform = 'scale(1)';
    }
  });

})();