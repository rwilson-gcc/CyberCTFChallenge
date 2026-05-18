/* js/03-sql-injection.js */

const mockDB = [
  { id: 1, username: 'admin', password_hash: '5f4dcc3b5aa765d61d83', email: 'admin@corp.local', role: 'Administrator' },
  { id: 2, username: 'jsmith', password_hash: 'e10adc3949ba59abbe56', email: 'j.smith@corp.local', role: 'Staff' },
  { id: 3, username: 'mjones', password_hash: '827ccb0eea8a706c4c34', email: 'm.jones@corp.local', role: 'Staff' },
];

function updateQuery() {
  const u = document.getElementById('sqlUser').value;
  const p = document.getElementById('sqlPass').value;
  const isInjected = u.includes("'") || u.includes('--') || u.includes('OR') || u.includes('=');
  const qUser = document.getElementById('q-user');
  const qPass = document.getElementById('q-pass');
  qUser.textContent = "'" + u + "'";
  qPass.textContent = "'" + p + "'";
  qUser.className = isInjected ? 'sql-inject' : 'sql-str';
  qPass.className = isInjected ? 'sql-inject' : 'sql-str';
}

function setPayload(u, p) {
  document.getElementById('sqlUser').value = u;
  document.getElementById('sqlPass').value = p;
  updateQuery();
}

function runQuery() {
  const u = document.getElementById('sqlUser').value;
  const p = document.getElementById('sqlPass').value;
  const alertEl = document.getElementById('sqlAlert');
  const succEl = document.getElementById('sqlSuccess');
  const table = document.getElementById('sqlResultTable');
  const tbody = document.getElementById('sqlResultBody');

  alertEl.style.display = 'none';
  succEl.style.display = 'none';
  table.style.display = 'none';

  const bypassAuth = u.includes('--') || u.toLowerCase().includes("or '1'='1") || u.toLowerCase().includes('or 1=1');
  const unionAttempt = u.toLowerCase().includes('union');

  if (bypassAuth) {
    succEl.style.display = 'block';
    succEl.textContent = '⚠ AUTHENTICATION BYPASSED — Logged in as: admin (all records returned)';
    tbody.innerHTML = '';
    mockDB.forEach(r => {
      tbody.innerHTML += `<tr><td>${r.id}</td><td>${r.username}</td><td>${r.password_hash}</td><td>${r.email}</td><td>${r.role}</td></tr>`;
    });
    table.style.display = 'table';
  } else if (unionAttempt) {
    alertEl.style.display = 'block';
    alertEl.textContent = '💀 UNION INJECTION DETECTED — Attacker attempting to read additional tables.';
  } else {
    const user = mockDB.find(r => r.username === u);
    if (user && p === 'admin') {
      succEl.style.display = 'block';
      succEl.textContent = '✓ Logged in successfully as ' + u;
    } else {
      alertEl.style.display = 'block';
      alertEl.textContent = '✗ Invalid username or password';
    }
  }
}

function answerQ(btn, correct) {
  document.querySelectorAll('.quiz-opt').forEach(o => o.style.pointerEvents = 'none');
  const fb = document.getElementById('qfeedback');
  fb.classList.add('show');
  if (correct) {
    btn.classList.add('correct');
    fb.className = 'quiz-feedback show good';
    document.getElementById('qfeedback-text').textContent = "✓ Correct! The single quote ends the string literal, -- starts a SQL comment, and everything after (including AND password=...) is ignored by the database.";
  } else {
    btn.classList.add('wrong');
    fb.className = 'quiz-feedback show bad';
    document.getElementById('qfeedback-text').textContent = "✗ Not quite. The key is the -- SQL comment syntax, which causes the database to ignore the password check entirely.";
  }
}

// Init
updateQuery();
