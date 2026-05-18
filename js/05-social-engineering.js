/* js/05-social-engineering.js */

const scenarios = [
  {
    icon: '📞', title: '// IT IMPERSONATION CALL',
    messages: [
      { type: 'system-note', text: 'Monday 9:14 AM — Your desk phone rings' },
      { type: 'attacker', speaker: 'Caller (attacker)', text: 'Hi there, this is Dave from the IT security team. We\'ve detected some unusual login attempts on your account from an IP in Eastern Europe. I need to verify your identity quickly before we lock you out.' },
      { type: 'victim', speaker: 'Employee (victim)', text: 'Oh no, that sounds serious! What do you need?' },
      { type: 'attacker', speaker: 'Caller (attacker)', text: 'I just need you to confirm your current username and password so I can whitelist your machine on our system. This needs to be done in the next 10 minutes or your account will be suspended.' },
      { type: 'system-note', text: '🚩 URGENCY + AUTHORITY + FEAR — classic triad' },
      { type: 'attacker', speaker: 'Caller (attacker)', text: 'While I have you, I\'ll need you to click on this verification link I\'m emailing you right now and enter your credentials there too.' },
    ],
    tactics: ['Urgency', 'Authority (IT impersonation)', 'Fear (account suspension)', 'Credential harvesting', 'Urgency deadline (10 minutes)']
  },
  {
    icon: '💾', title: '// USB DROP ATTACK',
    messages: [
      { type: 'system-note', text: 'An employee finds a USB drive labelled "Salary Information 2024" in the car park' },
      { type: 'attacker', speaker: 'Attacker note (on USB label)', text: '🔐 CONFIDENTIAL — HR Salary Review 2024 — DO NOT DISTRIBUTE' },
      { type: 'victim', speaker: 'Employee (thinking)', text: 'Someone must have dropped this... I\'ll just plug it in to see whose it is so I can return it.' },
      { type: 'system-note', text: '⚠ USB plugged in — malware installs silently in background' },
      { type: 'attacker', speaker: 'Autorun script (hidden)', text: '[Deploying keylogger and establishing reverse shell to attacker C2 server...]' },
      { type: 'system-note', text: '🚩 CURIOSITY + BAITING — human instinct exploited' },
    ],
    tactics: ['Curiosity (label triggers interest)', 'Baiting (tempting label)', 'Good samaritan instinct', 'Physical access bypass', 'No technical skill needed from victim']
  },
  {
    icon: '📧', title: '// FAKE HR EMAIL',
    messages: [
      { type: 'attacker', speaker: 'Email from: hr-payroll@company-portal.net', text: 'All staff action required: We are migrating to a new payroll system. Please log in within 48 hours to confirm your bank details or your next payment may be delayed. Click here to access the secure portal.' },
      { type: 'victim', speaker: 'Employee', text: 'I don\'t want to miss my pay! I\'ll do this now.' },
      { type: 'system-note', text: '🚩 FINANCIAL FEAR + URGENCY — time pressure deployed' },
      { type: 'attacker', speaker: 'Fake portal (attacker\'s site)', text: 'Please enter your employee ID, current password, and bank account details to confirm your information.' },
      { type: 'system-note', text: '⚠ Credentials and banking details sent to attacker' },
    ],
    tactics: ['Financial fear (missed pay)', 'Urgency (48 hour deadline)', 'Authority (HR impersonation)', 'Spoofed domain', 'Data harvesting (banking details)']
  }
];

function showScenario(idx) {
  document.querySelectorAll('.scenario-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  const sc = scenarios[idx];
  document.getElementById('scIcon').textContent = sc.icon;
  document.getElementById('scTitle').textContent = sc.title;
  let html = '<div class="chat-thread">';
  sc.messages.forEach(m => {
    html += '<div class="msg ' + m.type + '">';
    if (m.speaker) html += '<span class="speaker">' + m.speaker + '</span>';
    html += m.text + '</div>';
  });
  html += '</div><div style="margin-top:1.25rem;"><p style="font-size:0.8rem;color:var(--muted);margin-bottom:0.5rem;font-family:var(--font-mono)">// PSYCHOLOGICAL TACTICS USED:</p>';
  sc.tactics.forEach(t => html += '<span class="tactic-tag">' + t + '</span>');
  html += '</div>';
  document.getElementById('scBody').innerHTML = html;
}

// Decision game
const gameScenarios = [
  {
    text: 'You receive a phone call from someone claiming to be from your company\'s IT helpdesk. They say your computer has been flagged for suspicious activity and ask for your Windows login password to "run a remote diagnostic". What do you do?',
    options: [
      { text: 'Give them your password — they\'re from IT and it sounds urgent', correct: false },
      { text: 'Hang up and call IT back on the official number from the company intranet', correct: true },
      { text: 'Ask them to send an email confirmation first, then comply', correct: false },
      { text: 'Give them a wrong password to test if they\'re legitimate', correct: false },
    ],
    feedback: { correct: '✓ Correct! Always verify by calling back on a number you know is genuine. IT staff never need your password.', wrong: '✗ Incorrect. Legitimate IT staff never need your password. Always verify via an independently obtained number.' }
  },
  {
    text: 'You find a USB drive in the reception area labelled "Board Meeting — Confidential Financial Results Q4". What do you do?',
    options: [
      { text: 'Plug it into your computer to find out who it belongs to', correct: false },
      { text: 'Hand it to your IT or security team without plugging it in', correct: true },
      { text: 'Plug it into a colleague\'s machine to check the contents', correct: false },
      { text: 'Take it home to check on a personal computer', correct: false },
    ],
    feedback: { correct: '✓ Correct! Never plug in unknown USB drives. Hand them to IT security.', wrong: '✗ Incorrect. Plugging in an unknown USB — on any machine — risks malware installation. The label is bait.' }
  },
  {
    text: 'A supplier you work with sends an urgent email asking you to update their bank account details for upcoming payments. The email looks genuine. What do you do?',
    options: [
      { text: 'Update the bank details immediately — it\'s urgent', correct: false },
      { text: 'Reply to the email asking for confirmation', correct: false },
      { text: 'Call the supplier on a phone number you already have on record to verify', correct: true },
      { text: 'Forward to your finance team and let them decide', correct: false },
    ],
    feedback: { correct: '✓ Correct! This is Business Email Compromise (BEC). Always verify payment changes via a pre-existing phone number.', wrong: '✗ Incorrect. BEC attacks often compromise legitimate email accounts. Call on a known number.' }
  },
  {
    text: 'A well-dressed person follows you through a secure door saying "Thanks, my hands are full!" while carrying boxes. What should you do?',
    options: [
      { text: 'Hold the door — it\'s polite and they look legitimate', correct: false },
      { text: 'Politely ask them to badge in separately, even if it\'s awkward', correct: true },
      { text: 'Ignore it — security isn\'t your job', correct: false },
      { text: 'Only stop them if they don\'t have a visible company badge', correct: false },
    ],
    feedback: { correct: '✓ Correct! Tailgating is a real attack vector. Always required to badge in separately.', wrong: '✗ Incorrect. Appearance and politeness are tools. Challenge everyone — it\'s company policy, not rudeness.' }
  }
];

let gameIdx = 0, gameScore = 0;

function loadScenario() {
  if (gameIdx >= gameScenarios.length) {
    document.getElementById('gameScenario').textContent = '✓ All scenarios complete! Score: ' + gameScore + '/' + gameScenarios.length;
    document.getElementById('gameOpts').innerHTML = '';
    document.getElementById('gameFeedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    return;
  }
  const sc = gameScenarios[gameIdx];
  document.getElementById('gameScenario').textContent = sc.text;
  document.getElementById('gameTotal').textContent = gameScenarios.length;
  document.getElementById('gameScore').textContent = gameScore;
  document.getElementById('gameFeedback').classList.remove('show');
  document.getElementById('gameFeedback').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  let html = '';
  sc.options.forEach((opt, i) => {
    html += `<button class="decision-opt" onclick="answerGame(this,${opt.correct},${i})">${opt.text}</button>`;
  });
  document.getElementById('gameOpts').innerHTML = html;
}

function answerGame(btn, correct, idx) {
  const sc = gameScenarios[gameIdx];
  document.querySelectorAll('.decision-opt').forEach((o, i) => {
    if (sc.options[i].correct) o.classList.add('correct');
    else if (i === idx && !correct) o.classList.add('wrong');
    else o.classList.add('neutral');
  });
  if (correct) gameScore++;
  document.getElementById('gameScore').textContent = gameScore;
  const fb = document.getElementById('gameFeedback');
  fb.style.display = 'block';
  fb.classList.add('show');
  fb.className = 'decision-feedback show ' + (correct ? 'good' : 'bad');
  fb.textContent = correct ? sc.feedback.correct : sc.feedback.wrong;
  document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextScenario() { gameIdx++; loadScenario(); }

// Init
showScenario(0);
loadScenario();
