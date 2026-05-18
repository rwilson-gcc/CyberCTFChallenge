/* js/01-phishing.js */

const flagInfo = {
  sender: {
    el: 'email-from',
    text: '🚩 FAKE SENDER DOMAIN: "barclays-online-verify.com" is NOT barclays.co.uk. Attackers register similar-looking domains. Always check the full email address domain carefully.',
    cls: 'flagged-red'
  },
  urgency: {
    el: 'email-subject',
    text: '🚩 FALSE URGENCY: "URGENT", "immediately", "24 hours" — these pressure you into acting without thinking. Legitimate banks don\'t threaten to permanently close accounts via email.',
    cls: 'flagged'
  },
  greeting: {
    el: 'email-greeting',
    text: '🚩 GENERIC GREETING: "Dear Valued Customer" — your real bank knows your name. Generic greetings are a strong indicator of mass phishing campaigns.',
    cls: 'flagged'
  },
  link: {
    el: 'email-link',
    text: '🚩 SUSPICIOUS URL: "barclays-secure-verify.account-protection.co" — the real domain here is "account-protection.co", not barclays.co.uk. Look at what comes just before the first single slash.',
    cls: 'flagged-red'
  },
  threat: {
    el: 'email-body2',
    text: '🚩 THREATENING LANGUAGE: "permanently closed and funds held for investigation" — this is designed to cause panic and override your rational thinking.',
    cls: 'flagged'
  }
};

const highlighted = {};

function highlightFlag(key) {
  if (key === 'all') {
    Object.keys(flagInfo).forEach(k => highlightFlag(k));
    return;
  }
  const f = flagInfo[key];
  const el = document.getElementById(f.el);
  if (!el) return;
  el.classList.add(f.cls);
  highlighted[key] = true;
  document.getElementById('flag-info').style.display = 'block';
  document.getElementById('flag-info-text').textContent = f.text;
  const keys = Object.keys(flagInfo);
  const idx = keys.indexOf(key);
  const btns = document.querySelectorAll('.flag-btn');
  if (idx >= 0 && btns[idx]) btns[idx].classList.add('active');
}

function checkUrl() {
  const input = document.getElementById('urlInput').value.trim();
  const el = document.getElementById('urlResult');
  if (!input) return;

  const suspiciousPatterns = [
    { p: /paypa[l1].*\.(net|co|xyz|cc|ru)/i, msg: 'Typosquatting: "paypa1" mimics PayPal but isn\'t.' },
    { p: /amaz[o0]n[^.]*\.(net|co(?!\.uk)|xyz|cc|info)/i, msg: 'Fake Amazon domain — real Amazon uses amazon.co.uk or amazon.com.' },
    { p: /barclays[^.]*\.(net|co(?!\.uk)|xyz|cc|info|co\.)/i, msg: 'Suspicious Barclays lookalike domain.' },
    { p: /secure.*verify|verify.*secure/i, msg: 'URL contains "secure-verify" pattern — often used in phishing URLs.' },
    { p: /account.protect/i, msg: 'Fake "account protection" domain — a common phishing tactic.' },
    { p: /login\.php\?.*ref=/i, msg: 'Suspicious login redirect with reference tracking parameter.' },
    { p: /http:\/\//i, msg: 'No HTTPS — legitimate sites handling logins always use HTTPS.' },
    { p: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i, msg: 'IP address instead of domain name — very suspicious.' },
  ];

  const safePatterns = [
    /^https:\/\/(www\.)?gov\.uk/i,
    /^https:\/\/(www\.)?barclays\.co\.uk/i,
    /^https:\/\/(www\.)?amazon\.co\.uk/i,
    /^https:\/\/(www\.)?paypal\.com/i,
    /^https:\/\/(www\.)?google\.com/i,
  ];

  const isSafe = safePatterns.some(p => p.test(input));
  const issues = suspiciousPatterns.filter(p => p.p.test(input)).map(p => p.msg);

  el.style.display = 'block';
  if (isSafe && issues.length === 0) {
    el.className = 'url-result safe';
    el.innerHTML = '✓ Looks safe. Domain matches a known legitimate site with HTTPS.';
  } else if (issues.length > 0) {
    el.className = 'url-result suspicious';
    el.innerHTML = '⚠ SUSPICIOUS — ' + issues.join(' | ');
  } else {
    el.className = 'url-result suspicious';
    el.innerHTML = '⚠ Could not verify as safe. When in doubt, navigate directly to the official website.';
  }
}

function answerQuiz(btn, correct) {
  document.querySelectorAll('.quiz-opt').forEach(o => o.style.pointerEvents = 'none');
  const fb = document.getElementById('qfeedback');
  const fbt = document.getElementById('qfeedback-text');
  fb.classList.add('show');
  if (correct) {
    btn.classList.add('correct');
    fb.className = 'quiz-feedback show good';
    fbt.textContent = '✓ Correct! Always navigate directly to websites by typing the address yourself. Never click email links for sensitive actions.';
  } else {
    btn.classList.add('wrong');
    fb.className = 'quiz-feedback show bad';
    fbt.textContent = '✗ Incorrect. Clicking email links or replying confirms your address to attackers. Always go directly to the official website.';
  }
}
