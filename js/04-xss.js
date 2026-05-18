/* js/04-xss.js */

function setPayload(text) {
  document.getElementById('xssInput').value = text;
}

function postVulnerableComment() {
  const val = document.getElementById('xssInput').value;
  const container = document.getElementById('injectedComments');
  const div = document.createElement('div');
  div.className = 'comment-item';
  // Strip actual script execution for safety while showing the structure
  const safeDisplay = val
    .replace(/<script[\s\S]*?<\/script>/gi, '<span style="color:#f87171;font-family:monospace;font-size:11px">[SCRIPT WOULD EXECUTE HERE — shown safely]</span>')
    .replace(/javascript:/gi, '[javascript blocked]');
  div.innerHTML = '<div class="author" style="color:#ef4444">attacker ⚠</div><div class="text">' + safeDisplay + '</div>';
  container.appendChild(div);
  showAnalysis(val);
}

function postSafeComment() {
  const val = document.getElementById('xssInput').value;
  const container = document.getElementById('injectedComments');
  const div = document.createElement('div');
  div.className = 'comment-item';
  const author = document.createElement('div');
  author.className = 'author';
  author.style.color = '#00f5c4';
  author.textContent = 'user (safe ✓)';
  const text = document.createElement('div');
  text.className = 'text';
  text.textContent = val; // Safe — uses textContent not innerHTML
  div.appendChild(author);
  div.appendChild(text);
  container.appendChild(div);
  showAnalysis(val);
}

function showAnalysis(val) {
  const p = document.getElementById('analysisPanel');
  p.classList.add('show');
  const hasScript = /<script/i.test(val);
  const hasEvent = /on\w+\s*=/i.test(val);
  document.getElementById('ap-input').textContent = val.substring(0, 60) + (val.length > 60 ? '...' : '');
  const scriptEl = document.getElementById('ap-script');
  scriptEl.textContent = hasScript ? 'YES — dangerous' : 'No';
  scriptEl.className = hasScript ? 'analysis-val danger' : 'analysis-val safe';
  const eventEl = document.getElementById('ap-event');
  eventEl.textContent = hasEvent ? 'YES — event handler injection' : 'No';
  eventEl.className = hasEvent ? 'analysis-val danger' : 'analysis-val safe';
  document.getElementById('ap-inner').textContent = (hasScript || hasEvent) ? 'EXECUTES malicious code' : 'Renders HTML (still risky)';
  document.getElementById('ap-text').textContent = 'Shows as plain text — safe';
}

function answerQ(btn, correct) {
  document.querySelectorAll('.quiz-opt').forEach(o => o.style.pointerEvents = 'none');
  const fb = document.getElementById('qfeedback');
  fb.classList.add('show');
  if (correct) {
    btn.classList.add('correct');
    fb.className = 'quiz-feedback show good';
    document.getElementById('qfeedback-text').textContent = '✓ Correct! textContent treats all input as text, not HTML. Filtering keywords like "script" is easily bypassed with encoding tricks.';
  } else {
    btn.classList.add('wrong');
    fb.className = 'quiz-feedback show bad';
    document.getElementById('qfeedback-text').textContent = '✗ Not quite. Filtering specific keywords is easily bypassed. The correct fix is to never interpret user input as HTML.';
  }
}
