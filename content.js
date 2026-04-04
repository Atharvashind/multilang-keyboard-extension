// MultiLang Keyboard - Browser Extension
(function () {
  'use strict';

  if (window.multilangKeyboardLoaded) return;
  window.multilangKeyboardLoaded = true;

  // ─── Layouts ────────────────────────────────────────────────────────────────
  const LAYOUTS = {
    english: {
      name: 'English',
      normal: [['`','1','2','3','4','5','6','7','8','9','0','-','=','←'],['q','w','e','r','t','y','u','i','o','p','[',']'],['a','s','d','f','g','h','j','k','l',';',"'",'Enter'],['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],['Space']],
      shift:  [['~','!','@','#','$','%','^','&','*','(',')','_','+','←'],['Q','W','E','R','T','Y','U','I','O','P','{','}'],['A','S','D','F','G','H','J','K','L',':','"','Enter'],['Shift','Z','X','C','V','B','N','M','<','>','?','Shift'],['Space']]
    },
    hindi: {
      name: 'हिन्दी',
      normal: [['ॊ','१','२','३','४','५','६','७','८','९','०','-','ृ','←'],['ौ','ै','ा','ी','ू','ब','ह','ग','द','ज','ड','़'],['ो','े','्','ि','ु','प','र','क','त','च','ट','Enter'],['Shift','ं','म','न','व','ल','स',',','.','य','Shift'],['Space']],
      shift:  [['ऒ','ऍ','ॅ','्र','र्द','ट्ठ','ण','घ','ङ','झ','़','ः','←'],['औ','ऐ','आ','ई','ऊ','भ','ः','ग','ध','झ','ढ'],['ओ','ए','अ','इ','उ','फ','ऱ','ख','थ','छ','ठ','Enter'],['Shift','ँ','म','न','व','ल','श','ष','।','य','Shift'],['Space']]
    },
    marathi: {
      name: 'मराठी',
      normal: [['ॊ','१','२','३','४','५','६','७','८','९','०','-','ृ','←'],['ौ','ै','ा','ी','ू','ब','ह','ग','द','ज','ड','़'],['ो','े','्','ि','ु','प','र','क','त','च','ट','Enter'],['Shift','ळ','ं','म','न','व','ल','स',',','.','य','Shift'],['Space']],
      shift:  [['ऒ','ऍ','ॅ','्र','र्द','ट्ठ','ण','घ','ङ','झ','़','ः','←'],['औ','ऐ','आ','ई','ऊ','भ','ः','ग','ध','झ','ढ'],['ओ','ए','अ','इ','उ','फ','ऱ','ख','थ','छ','ठ','Enter'],['Shift','ऴ','ं','म','न','व','ल','श','ष','।','य','Shift'],['Space']]
    },
    telugu: {
      name: 'తెలుగు',
      normal: [['ొ','౧','౨','౩','౪','౫','౬','౭','౮','౯','౦','-','ృ','←'],['ౌ','ై','ా','ీ','ూ','బ','హ','గ','ద','జ','డ','ఞ'],['ో','ే','్','ి','ు','ప','ర','క','త','చ','ట','Enter'],['Shift','ె','ం','మ','న','వ','ల','స',',','.','య','Shift'],['Space']],
      shift:  [['ఒ','ఎ','ఏ','ర్','జ్ఞ','త్ర','క్ష','శ్ర','(','(','ః','ఋ','←'],['ఔ','ఐ','ఆ','ఈ','ఊ','భ','ఙ','ఘ','ధ','ఝ','ఢ'],['ఓ','ఏ','అ','ఇ','ఉ','ఫ','ఱ','ఖ','థ','ఛ','ఠ','Enter'],['Shift','ఁ','మ','న','వ','ళ','శ','ష','।','య','Shift'],['Space']]
    },
    tamil: {
      name: 'தமிழ்',
      normal: [['ொ','௧','௨','௩','௪','௫','௬','௭','௮','௯','௦','-','்','←'],['ௌ','ை','ா','ீ','ூ','ப','ஹ','க','த','ஜ','ட','ஞ'],['ோ','ே','்','ி','ு','ப','ர','க','த','ச','ட','Enter'],['Shift','ெ','ஂ','ம','ந','வ','ல','ச',',','.','ய','Shift'],['Space']],
      shift:  [['ஒ','எ','ஏ','ற்','க்ஷ','ஸ்','ஷ்','ஸ்ரீ','(','(',':','ஃ','←'],['ஔ','ஐ','ஆ','ஈ','ஊ','ப','ஹ','க','த','ஜ','ட'],['ஓ','ஏ','அ','இ','உ','ப','ற','க','த','ச','ட','Enter'],['Shift','ஂ','ம','ன','வ','ள','ஸ','ஷ','।','ய','Shift'],['Space']]
    },
    bengali: {
      name: 'বাংলা',
      normal: [['্','১','২','৩','৪','৫','৬','৭','৮','৯','০','-','ৃ','←'],['ৌ','ৈ','া','ী','ূ','ব','হ','গ','দ','জ','ড','়'],['ো','ে','্','ি','ু','প','র','ক','ত','চ','ট','Enter'],['Shift','ঁ','ম','ন','ভ','ল','স',',','.','য','Shift'],['Space']],
      shift:  [['ঔ','ঐ','আ','ঈ','ঊ','ভ','ঃ','গ','ধ','ঝ','ঢ','←'],['ও','এ','অ','ই','উ','ফ','র','খ','থ','ছ','ঠ','Enter'],['Shift','ঁ','ম','ন','ভ','ল','শ','ষ','।','য়','Shift'],['Space']]
    },
    gujarati: {
      name: 'ગુજરાતી',
      normal: [['ૈ','૧','૨','૩','૪','૫','૬','૭','૮','૯','૦','-','ૃ','←'],['ૌ','ૈ','ા','ી','ૂ','બ','હ','ગ','દ','જ','ડ','઼'],['ો','ે','્','િ','ુ','પ','ર','ક','ત','ચ','ટ','Enter'],['Shift','ં','મ','ન','વ','લ','સ',',','.','ય','Shift'],['Space']],
      shift:  [['ઑ','ઍ','઼','ર્','જ્ઞ','ત્ર','ક્ષ','શ્ર','(','(','ઃ','ઋ','←'],['ઔ','ઐ','આ','ઈ','ઊ','ભ','ઙ','ઘ','ધ','ઝ','ઢ'],['ઓ','એ','અ','ઇ','ઉ','ફ','઱','ખ','થ','છ','ઠ','Enter'],['Shift','ઁ','મ','ન','વ','ળ','શ','ષ','।','ય','Shift'],['Space']]
    }
  };

  // ─── State ───────────────────────────────────────────────────────────────────
  let currentInput = null; // last focused input/textarea/contenteditable
  let currentLang  = 'english';
  let isShift      = false;
  let panelX = null, panelY = null;
  let panelW = null, panelH = null;

  // ─── Floating button ─────────────────────────────────────────────────────────
  const floatingBtn = document.createElement('div');
  floatingBtn.id = 'mlk-floating-btn';
  floatingBtn.innerHTML = '⌨️';
  floatingBtn.title = 'MultiLang Keyboard';
  floatingBtn.classList.add('mlk-btn-visible');

  // Restore saved button position
  if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
    chrome.storage.sync.get(['mlkBtnX', 'mlkBtnY'], (data) => {
      if (data.mlkBtnX != null) {
        floatingBtn.style.left   = data.mlkBtnX + 'px';
        floatingBtn.style.top    = data.mlkBtnY + 'px';
        floatingBtn.style.right  = 'auto';
        floatingBtn.style.bottom = 'auto';
      }
    });
  }

  let btnDragged = false;

  floatingBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    btnDragged = false;

    const rect = floatingBtn.getBoundingClientRect();
    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;

    floatingBtn.classList.add('mlk-btn-dragging');

    const onMove = (ev) => {
      btnDragged = true;
      const x = Math.min(Math.max(0, ev.clientX - ox), window.innerWidth  - floatingBtn.offsetWidth);
      const y = Math.min(Math.max(0, ev.clientY - oy), window.innerHeight - floatingBtn.offsetHeight);
      floatingBtn.style.left   = x + 'px';
      floatingBtn.style.top    = y + 'px';
      floatingBtn.style.right  = 'auto';
      floatingBtn.style.bottom = 'auto';
    };

    const onUp = (ev) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      floatingBtn.classList.remove('mlk-btn-dragging');

      if (btnDragged) {
        // Snap to nearest edge
        const bx = floatingBtn.getBoundingClientRect();
        const midX = bx.left + bx.width / 2;
        const snapLeft = midX < window.innerWidth / 2;
        const finalX = snapLeft ? 12 : window.innerWidth - floatingBtn.offsetWidth - 12;
        const finalY = Math.min(Math.max(12, bx.top), window.innerHeight - floatingBtn.offsetHeight - 12);
        floatingBtn.style.left   = finalX + 'px';
        floatingBtn.style.top    = finalY + 'px';
        floatingBtn.style.right  = 'auto';
        floatingBtn.style.bottom = 'auto';
        // Save position
        if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
          chrome.storage.sync.set({ mlkBtnX: finalX, mlkBtnY: finalY });
        }
      } else {
        // It was a tap/click — toggle keyboard
        toggleKeyboard();
      }
      ev.stopPropagation();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  document.body.appendChild(floatingBtn);

  // ─── Panel ───────────────────────────────────────────────────────────────────
  const panel = document.createElement('div');
  panel.id = 'mlk-keyboard-panel';
  document.body.appendChild(panel);

  // ─── Focus tracking ──────────────────────────────────────────────────────────
  function isInputEl(el) {
    return el && el.matches('input, textarea, [contenteditable="true"], [contenteditable=""]');
  }

  function activeIsInFrame() {
    // When focus moves into an iframe, document.activeElement is the iframe element itself
    const a = document.activeElement;
    return a && a.tagName === 'IFRAME';
  }

  document.addEventListener('focusin', (e) => {
    if (isInputEl(e.target)) {
      if (currentInput && currentInput !== e.target) {
        currentInput.classList.remove('mlk-active-target');
      }
      currentInput = e.target;
      currentInput.classList.add('mlk-active-target');
    }
  });

  document.addEventListener('focusout', () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (panel.contains(active)) return;
      if (isInputEl(active)) return;
      if (activeIsInFrame()) return;
      // Panel is open — never clear currentInput while keyboard is showing
      if (panel.classList.contains('mlk-panel-open') || panel.classList.contains('mlk-panel-closing')) return;
      if (currentInput) currentInput.classList.remove('mlk-active-target');
      currentInput = null;
    }, 200);
  });

  // ─── Panel open / close ──────────────────────────────────────────────────────
  function openPanel() {
    // Reset any stuck closing state
    panel.classList.remove('mlk-panel-closing');

    // Restore saved position
    if (panelX !== null) {
      panel.style.left   = panelX + 'px';
      panel.style.top    = panelY + 'px';
      panel.style.right  = 'auto';
      panel.style.bottom = 'auto';
    } else {
      panel.style.left = '';
      panel.style.top = '';
      panel.style.right = '';
      panel.style.bottom = '';
    }
    // Restore saved size
    if (panelW !== null) {
      panel.style.width  = panelW + 'px';
      panel.style.height = panelH + 'px';
    } else {
      panel.style.width = '';
      panel.style.height = '';
    }
    // Build first, then show — so layout is ready when animation starts
    buildKeyboard();
    panel.classList.add('mlk-panel-open');
    floatingBtn.classList.add('mlk-btn-pressed');
  }

  function closePanel() {
    if (!panel.classList.contains('mlk-panel-open')) return;
    // Save size before closing (user may have resized)
    const w = panel.offsetWidth, h = panel.offsetHeight;
    if (w > 0) { panelW = w; panelH = h; }
    savePanelState();

    panel.classList.add('mlk-panel-closing');
    const done = () => {
      panel.classList.remove('mlk-panel-open', 'mlk-panel-closing');
      const active = document.activeElement;
      if (!active || !active.matches('input, textarea, [contenteditable="true"]')) {
        if (currentInput) currentInput.classList.remove('mlk-active-target');
        currentInput = null;
      }
    };
    panel.addEventListener('animationend', done, { once: true });
    setTimeout(() => { if (panel.classList.contains('mlk-panel-closing')) done(); }, 250);
    floatingBtn.classList.remove('mlk-btn-pressed');
  }

  function toggleKeyboard() {
    if (panel.classList.contains('mlk-panel-open') || panel.classList.contains('mlk-panel-closing')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  // ─── Drag ────────────────────────────────────────────────────────────────────
  function attachDrag(handle) {
    let ox, oy, startL, startT;
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const r = panel.getBoundingClientRect();
      ox = e.clientX; oy = e.clientY;
      startL = r.left; startT = r.top;

      const onMove = (ev) => {
        const maxL = window.innerWidth  - panel.offsetWidth;
        const maxT = window.innerHeight - panel.offsetHeight;
        panelX = Math.min(Math.max(0, startL + ev.clientX - ox), maxL);
        panelY = Math.min(Math.max(0, startT + ev.clientY - oy), maxT);
        panel.style.left   = panelX + 'px';
        panel.style.top    = panelY + 'px';
        panel.style.right  = 'auto';
        panel.style.bottom = 'auto';
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        savePanelState();
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  // ─── Persist state ───────────────────────────────────────────────────────────
  function savePanelState() {
    if (typeof chrome === 'undefined' || !chrome.storage?.sync) return;
    const s = { mlkLang: currentLang };
    if (panelX !== null) { s.mlkPanelX = panelX; s.mlkPanelY = panelY; }
    if (panelW !== null) { s.mlkPanelW = panelW; s.mlkPanelH = panelH; }
    chrome.storage.sync.set(s);
  }

  // ─── Build keyboard DOM ──────────────────────────────────────────────────────
  function buildKeyboard() {
    panel.innerHTML = '';

    // Drag handle
    const handle = document.createElement('div');
    handle.className = 'mlk-drag-handle';
    handle.textContent = '· · · · ·';
    panel.appendChild(handle);
    attachDrag(handle);

    // Language selector (dropdown)
    const langSelector = document.createElement('div');
    langSelector.className = 'mlk-lang-selector';

    const langLabel = document.createElement('span');
    langLabel.className = 'mlk-lang-label';
    langLabel.textContent = '🌐 Language';

    const langSelect = document.createElement('select');
    langSelect.className = 'mlk-lang-select';
    Object.keys(LAYOUTS).forEach(l => {
      const opt = document.createElement('option');
      opt.value = l;
      opt.textContent = LAYOUTS[l].name;
      if (l === currentLang) opt.selected = true;
      langSelect.appendChild(opt);
    });
    langSelect.addEventListener('mousedown', (e) => e.stopPropagation());
    langSelect.addEventListener('change', (e) => {
      e.stopPropagation();
      currentLang = langSelect.value;
      isShift = false;
      savePanelState();
      buildKeyboard();
    });

    langSelector.appendChild(langLabel);
    langSelector.appendChild(langSelect);
    panel.appendChild(langSelector);

    // Keys
    const keysDiv = document.createElement('div');
    keysDiv.className = 'mlk-keys';
    const rows = isShift ? LAYOUTS[currentLang].shift : LAYOUTS[currentLang].normal;
    rows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'mlk-key-row';
      row.forEach(key => {
        const btn = document.createElement('button');
        btn.dataset.key = key;
        let cls = 'mlk-key';
        if (key === 'Space')                    cls += ' mlk-key--space';
        if (key === 'Enter' || key === '←')     cls += ' mlk-key--action';
        if (key === 'Shift')                    cls += ' mlk-key--shift' + (isShift ? ' mlk-key--shift-active' : '');
        btn.className = cls;
        btn.textContent = key === 'Space' ? '␣' : key;
        btn.addEventListener('mousedown', (e) => e.preventDefault()); // critical: don't blur input
        btn.addEventListener('click', (e) => { e.stopPropagation(); handleKey(key); });
        rowDiv.appendChild(btn);
      });
      keysDiv.appendChild(rowDiv);
    });
    panel.appendChild(keysDiv);

    // Action bar
    const bar = document.createElement('div');
    bar.className = 'mlk-action-bar';

    const mkBtn = (id, cls, label, handler) => {
      const b = document.createElement('button');
      b.id = id; b.className = cls; b.textContent = label;
      b.addEventListener('mousedown', (e) => e.preventDefault());
      b.addEventListener('click', (e) => { e.stopPropagation(); handler(e); });
      return b;
    };

    bar.appendChild(mkBtn('mlk-copy',  'mlk-action-btn mlk-action-btn--copy',  '📋 Copy',  onCopy));
    bar.appendChild(mkBtn('mlk-clear', 'mlk-action-btn mlk-action-btn--clear', '🗑️ Clear', onClear));
    bar.appendChild(mkBtn('mlk-close', 'mlk-action-btn mlk-action-btn--close', '✕ Close',  (e) => { e.stopPropagation(); closePanel(); }));
    panel.appendChild(bar);
  }

  // ─── Key handler ─────────────────────────────────────────────────────────────
  function handleKey(key) {
    if (!currentInput || !document.contains(currentInput)) return;

    if (key === 'Shift') {
      isShift = !isShift;
      updateShiftState();
      return;
    }

    if (key === '←') {
      if ('value' in currentInput) {
        const s = currentInput.selectionStart !== null ? currentInput.selectionStart : currentInput.value.length;
        const e = currentInput.selectionEnd   !== null ? currentInput.selectionEnd   : currentInput.value.length;
        if (s !== e) {
          setInputValue(currentInput, currentInput.value.slice(0, s) + currentInput.value.slice(e));
          currentInput.setSelectionRange(s, s);
        } else if (s > 0) {
          setInputValue(currentInput, currentInput.value.slice(0, s - 1) + currentInput.value.slice(s));
          currentInput.setSelectionRange(s - 1, s - 1);
        }
      } else {
        deleteBeforeCaret();
      }
    } else {
      const ch = key === 'Space' ? ' ' : key === 'Enter' ? '\n' : key;
      if ('value' in currentInput) {
        // Enter on a single-line input = submit (dispatch KeyboardEvent, don't insert \n)
        if (key === 'Enter' && currentInput.tagName !== 'TEXTAREA') {
          currentInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
          currentInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
          currentInput.dispatchEvent(new KeyboardEvent('keyup',   { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
          // Also try submitting the parent form
          const form = currentInput.closest('form');
          if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          return;
        }
        const s = currentInput.selectionStart !== null ? currentInput.selectionStart : currentInput.value.length;
        const e = currentInput.selectionEnd   !== null ? currentInput.selectionEnd   : currentInput.value.length;
        setInputValue(currentInput, currentInput.value.slice(0, s) + ch + currentInput.value.slice(e));
        try { currentInput.setSelectionRange(s + ch.length, s + ch.length); } catch {}
      } else {
        insertAtCaret(ch);
      }
      if (isShift && key !== 'Space' && key !== 'Enter') {
        isShift = false;
        updateShiftState();
      }
    }

    currentInput.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }));
    currentInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // ─── Shift update (no DOM rebuild) ───────────────────────────────────────────
  function updateShiftState() {
    const rows = isShift ? LAYOUTS[currentLang].shift : LAYOUTS[currentLang].normal;
    const flat = rows.flat();
    panel.querySelectorAll('button[data-key]').forEach((btn, i) => {
      const k = flat[i];
      if (!k) return;
      btn.dataset.key  = k;
      btn.textContent  = k === 'Space' ? '␣' : k;
      if (k === 'Shift') btn.classList.toggle('mlk-key--shift-active', isShift);
    });
  }

  // ─── Set input value (works with React/Vue/Angular) ──────────────────────────
  function setInputValue(el, value) {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
      'value'
    );
    if (nativeSetter && nativeSetter.set) {
      nativeSetter.set.call(el, value);
    } else {
      el.value = value;
    }
  }

  // ─── contenteditable helpers ─────────────────────────────────────────────────
  function insertAtCaret(text) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function deleteBeforeCaret() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!range.collapsed) { range.deleteContents(); return; }
    if (range.startOffset === 0) return;
    range.setStart(range.startContainer, range.startOffset - 1);
    range.deleteContents();
  }

  // ─── Copy / Clear ─────────────────────────────────────────────────────────────
  function onCopy() {
    if (!currentInput) return;
    const text = 'value' in currentInput ? currentInput.value : (currentInput.textContent || '');
    copyToClipboard(text);
  }

  function onClear() {
    if (!currentInput || !document.contains(currentInput)) return;
    if ('value' in currentInput) {
      currentInput.value = '';
    } else {
      currentInput.textContent = '';
    }
    currentInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;top:0;left:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    }
    showToast('Copied!');
  }

  // ─── Toast ───────────────────────────────────────────────────────────────────
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'mlk-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }

  // ─── Track inputs inside same-origin iframes ─────────────────────────────────
  function attachToFrame(frame) {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      doc.addEventListener('focusin', (e) => {
        if (isInputEl(e.target)) {
          if (currentInput && currentInput !== e.target) {
            currentInput.classList.remove('mlk-active-target');
          }
          currentInput = e.target;
          currentInput.classList.add('mlk-active-target');
        }
      });
    } catch {} // cross-origin frames — silently skip
  }

  // ─── Close on outside click ───────────────────────────────────────────────────
  // Only close when clicking truly outside — not on inputs, not on iframes
  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('mlk-panel-open')) return;
    if (panel.contains(e.target)) return;
    if (floatingBtn.contains(e.target)) return;
    if (e.target.tagName === 'IFRAME') return;
    // Don't close if clicking an input/textarea/contenteditable
    if (isInputEl(e.target)) return;
    closePanel();
  });

  // ─── Track inputs inside same-origin iframes ─────────────────────────────────
  function attachToFrame(frame) {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      doc.addEventListener('focusin', (e) => {
        if (isInputEl(e.target)) {
          if (currentInput && currentInput !== e.target) {
            currentInput.classList.remove('mlk-active-target');
          }
          currentInput = e.target;
          currentInput.classList.add('mlk-active-target');
        }
      });
    } catch {} // cross-origin frames — silently skip
  }

  document.querySelectorAll('iframe').forEach(attachToFrame);
  new MutationObserver((mutations) => {
    mutations.forEach(m => m.addedNodes.forEach(n => {
      if (n.tagName === 'IFRAME') attachToFrame(n);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  // ─── Restore saved state ──────────────────────────────────────────────────────
  if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
    chrome.storage.sync.get(
      ['mlkLang', 'mlkPanelX', 'mlkPanelY', 'mlkPanelW', 'mlkPanelH'],
      (data) => {
        if (data.mlkLang && LAYOUTS[data.mlkLang]) currentLang = data.mlkLang;
        if (data.mlkPanelX != null) { panelX = data.mlkPanelX; panelY = data.mlkPanelY; }
        if (data.mlkPanelW != null) { panelW = data.mlkPanelW; panelH = data.mlkPanelH; }
      }
    );
  }

})();
