/* js/02-passwords.js */

const commonPatterns = ['password','123456','qwerty','abc','admin','letmein','welcome','monkey','dragon','master','login','pass','test','user','guest'];

function analysePw(pw) {
  if (!pw) {
    document.getElementById('strengthBar').style.width = '0%';
    document.getElementById('strengthLabel').textContent = 'Enter a password above';
    document.getElementById('crackDisplay').style.display = 'none';
    ['c-len','c-upper','c-lower','c-num','c-sym','c-nocommon'].forEach(id => document.getElementById(id).classList.remove('met'));
    return;
  }

  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNum = /[0-9]/.test(pw);
  const hasSym = /[^A-Za-z0-9]/.test(pw);
  const longEnough = pw.length >= 12;
  const notCommon = !commonPatterns.some(p => pw.toLowerCase().includes(p));

  const criteria = {
    'c-len': longEnough, 'c-upper': hasUpper, 'c-lower': hasLower,
    'c-num': hasNum, 'c-sym': hasSym, 'c-nocommon': notCommon
  };
  Object.entries(criteria).forEach(([id, met]) => {
    document.getElementById(id).classList.toggle('met', met);
  });

  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasNum) score++;
  if (hasSym) score += 2;
  if (notCommon) score++;
  if (pw.length >= 20) score += 2;

  const pct = Math.min(100, score * 10);
  const bar = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');
  bar.style.width = pct + '%';

  let colour, text;
  if (score <= 3) { colour = '#ef4444'; text = 'Very Weak'; }
  else if (score <= 5) { colour = '#f59e0b'; text = 'Weak'; }
  else if (score <= 7) { colour = '#eab308'; text = 'Fair'; }
  else if (score <= 9) { colour = '#00f5c4'; text = 'Strong'; }
  else { colour = '#a78bfa'; text = 'Very Strong'; }

  bar.style.background = colour;
  label.style.color = colour;
  label.textContent = text;

  let charset = 0;
  if (hasLower) charset += 26;
  if (hasUpper) charset += 26;
  if (hasNum) charset += 10;
  if (hasSym) charset += 32;
  if (charset === 0) charset = 26;

  const combos = Math.pow(charset, pw.length);
  const attemptsPerSec = 1e10;
  const seconds = combos / attemptsPerSec;
  document.getElementById('crackDisplay').style.display = 'block';
  document.getElementById('crackTime').textContent = formatTime(seconds);
  document.getElementById('crackTime').style.color = colour;
}

function formatTime(s) {
  if (s < 1) return 'Instantly';
  if (s < 60) return Math.round(s) + ' seconds';
  if (s < 3600) return Math.round(s / 60) + ' minutes';
  if (s < 86400) return Math.round(s / 3600) + ' hours';
  if (s < 31536000) return Math.round(s / 86400) + ' days';
  const y = s / 31536000;
  if (y < 1e6) return Math.round(y).toLocaleString() + ' years';
  if (y < 1e9) return (y / 1e6).toFixed(0) + ' million years';
  return 'Billions of years';
}

let bruteInterval = null;

function startBrute(target) {
  stopBrute();
  const attempts = ['0000','1111','0001','1234','2222','3333','4444','aaaa','bbbb','abcd','abce','abcf','1235','1233','5678','9999','abc','abd','abe','1234'];
  const targetIdx = attempts.indexOf(target);
  const allAttempts = targetIdx >= 0 ? attempts.slice(0, targetIdx + 1) : [...attempts, target];
  const start = Date.now();
  let i = 0;

  document.getElementById('bfTarget').textContent = target;

  bruteInterval = setInterval(() => {
    if (i >= allAttempts.length) {
      clearInterval(bruteInterval);
      document.getElementById('bfAttempt').textContent = '✓ Found: "' + target + '" — cracked!';
      document.getElementById('bfAttempt').style.color = '#00f5c4';
      document.getElementById('bfBar').style.width = '100%';
      document.getElementById('bfBar').style.background = '#00f5c4';
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      document.getElementById('bfStats').textContent = allAttempts.length + ' attempts in ' + elapsed + 's (simulated)';
      return;
    }
    const cur = allAttempts[i];
    document.getElementById('bfAttempt').style.color = cur === target ? '#f59e0b' : 'var(--muted)';
    document.getElementById('bfAttempt').textContent = 'Trying: "' + cur + '" ' + (cur === target ? '← match!' : '');
    document.getElementById('bfBar').style.width = (i / allAttempts.length * 100) + '%';
    i++;
  }, 120);
}

function stopBrute() {
  if (bruteInterval) clearInterval(bruteInterval);
  document.getElementById('bfBar').style.width = '0%';
  document.getElementById('bfBar').style.background = 'var(--accent)';
  document.getElementById('bfAttempt').textContent = 'Press "Attack" to start';
  document.getElementById('bfAttempt').style.color = 'var(--muted)';
  document.getElementById('bfStats').textContent = '';
}

function answerQ(btn, correct) {
  document.querySelectorAll('.quiz-opt').forEach(o => o.style.pointerEvents = 'none');
  const fb = document.getElementById('qfeedback');
  const fbt = document.getElementById('qfeedback-text');
  fb.classList.add('show');
  if (correct) {
    btn.classList.add('correct');
    fb.className = 'quiz-feedback show good';
    fbt.textContent = '✓ Correct! Length is the biggest factor. A 29-character passphrase of random words is far harder to crack than shorter "complex" passwords.';
  } else {
    btn.classList.add('wrong');
    fb.className = 'quiz-feedback show bad';
    fbt.textContent = '✗ Not quite. Length is the biggest factor. A passphrase beats a shorter "complex" password every time.';
  }
}
