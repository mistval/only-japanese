const closeOverlayButtonId = 'closeOverlayButton';
const closeTabButtonId = 'closeTabButton';
const whitelistButtonId = 'whitelistButton';

const overlayHtml = `
<div id="japaneseOnlyExt_overlay">
  <div id="japaneseOnlyExt_blockedMessageContainer">
    <h5>このページには日本語が少ないようです</h5>
    <button id="${closeTabButtonId}">タブを閉じる</button>
    <button id="${closeOverlayButtonId}">消えろ！迷惑だ</button>
    <button id="${whitelistButtonId}">ワイトリストに追加</button>
  </div>
</div>
`;

function isJapanese(char) {
  // Char codes from http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
  if (char >= '\u3000' && char <= '\u303f') {
    return true;
  }
  if (char >= '\u3040' && char <= '\u309f') {
    return true;
  }
  if (char >= '\u30a0' && char <= '\u30ff') {
    return true;
  }
  if (char >= '\uff00' && char <= '\uffef') {
    return true;
  }
  if (char >= '\u4e00' && char <= '\u9faf') {
    return true;
  }
  if (char >= '\u3400' && char <= '\u4dbf') {
    return true;
  }

  return false;
}

function isNumber(char) {
  return char >= '0' && char <= '9';
}

const chars = document.body.innerText.split('').filter(char => char.trim());
const japaneseCharCount = chars.reduce((sum, char) => isJapanese(char) || isNumber(char) ? sum + 1 : sum, 0);
const japanesePercentage = (japaneseCharCount / chars.length) * 100;

function registerOverlayEvents(overlay) {
  const closeOverlayButton = document.getElementById(closeOverlayButtonId);
  closeOverlayButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  const closeTabButton = document.getElementById(closeTabButtonId);
  closeTabButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ close: true });
  });

  const whitelistButton = document.getElementById(whitelistButtonId);
  whitelistButton.addEventListener('click', () => {

  });
}

chrome.storage.sync.get('minJapanesePercentage', ({ minJapanesePercentage }) => {
  if (japanesePercentage >= minJapanesePercentage) {
    return;
  }

  const overlay = new DOMParser().parseFromString(overlayHtml, "text/xml").firstChild;
  document.body.appendChild(overlay);
  registerOverlayEvents(overlay);
});

