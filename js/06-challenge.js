/* js/06-challenge.js */

const solved = [false, false, false, false, false];

function checkAnswer(idx) {
  const input = document.getElementById('a' + idx).value.trim();
  const fb = document.getElementById('af' + idx);
  fb.classList.add('show');
  fb.style.display = 'block';

  let correct = false;
  if (idx === 0) correct = input.toLowerCase() === 'cyber';
  else if (idx === 1) correct = input.toLowerCase() === 'social';
  else if (idx === 2) correct = input === "admin'--" || input.toLowerCase() === "admin'--";
  else if (idx === 3) correct = input.toLowerCase() === 'stealcookies';
  else if (idx === 4) {
    const norm = input.replace(/\s/g, '').toLowerCase();
    correct = norm === "flag{cyber_social_admin'--_stealcookies}";
  }

  if (correct && !solved[idx]) {
    solved[idx] = true;
    fb.className = 'answer-feedback show good';
    fb.textContent = '✓ Correct! Flag piece captured.';
    document.getElementById('cp' + idx).classList.add('solved');
    document.getElementById('ps' + idx).textContent = '✓ SOLVED';
    document.getElementById('ps' + idx).className = 'panel-status solved-status';
    document.getElementById('fi' + idx).classList.add('captured');
    document.getElementById('fi' + idx).textContent = '✓ CH0' + (idx + 1);
    updateProgress();
    if (idx === 3) {
      document.getElementById('ps4').textContent = 'OPEN';
      updateFlagAssembler();
    }
    if (idx === 4) {
      document.getElementById('finalFlag').classList.add('show');
      setTimeout(() => document.getElementById('finalFlag').scrollIntoView({ behavior: 'smooth' }), 300);
    }
  } else if (correct && solved[idx]) {
    fb.className = 'answer-feedback show good';
    fb.textContent = '✓ Already captured!';
  } else {
    fb.className = 'answer-feedback show bad';
    const hints = [
      'Try looking at the Subject line',
      'The shift is 1 — try the slider',
      'Look at the SUCCESS log entry',
      'The function name comes after onerror=',
      "Format: FLAG{part1_part2_part3_part4}"
    ];
    fb.textContent = '✗ Not quite. ' + hints[idx];
  }
}

function updateProgress() {
  const count = solved.filter(Boolean).length;
  document.getElementById('progressText').textContent = count + ' / 5 flags captured';
  document.getElementById('progressBar').style.width = (count / 5 * 100) + '%';
}

function updateFlagAssembler() {
  const parts = ['CYBER', 'SOCIAL', "admin'--", 'stealCookies'];
  const fa = document.getElementById('flagAssembler');
  let html = '';
  parts.forEach((p, i) => {
    if (solved[i]) {
      html += `<span class="t-out">Part ${i + 1}: </span><span class="t-flag">${p}</span> ✓<br>`;
    } else {
      html += `<span class="t-out">Part ${i + 1}: </span><span class="t-cmd">[NOT YET CAPTURED]</span><br>`;
    }
  });
  if (solved.slice(0, 4).every(Boolean)) {
    html += `<br><span class="t-flag">FLAG{CYBER_SOCIAL_admin'--_stealCookies}</span>`;
  }
  fa.innerHTML = html;
}

function togglePanel(idx) {
  const body = document.getElementById('pb' + idx);
  body.classList.toggle('open');
}

function toggleHint(idx) {
  const h = document.getElementById('h' + idx);
  h.classList.toggle('show');
}

// Caesar cipher
const encoded = 'BUUBDL WFDUPS: TPDJBM';

function caesarDecode(text, shift) {
  return text.split('').map(c => {
    if (c >= 'A' && c <= 'Z') return String.fromCharCode((c.charCodeAt(0) - 65 - shift + 26) % 26 + 65);
    return c;
  }).join('');
}

function updateCipher(val) {
  document.getElementById('shiftVal').textContent = val;
  document.getElementById('cipherOutput').textContent = caesarDecode(encoded, parseInt(val));
}

// Init
updateCipher(1);
