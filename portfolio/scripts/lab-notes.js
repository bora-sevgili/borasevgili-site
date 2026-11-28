const filters = document.querySelector('.filters');
const buttons = [...filters.querySelectorAll('button[data-filter]')];
const notes = [...document.querySelectorAll('.note[data-topic]')];
const noteCount = document.getElementById('note-count');

function showTopic(topic) {
  let visible = 0;
  for (const note of notes) {
    note.hidden = topic !== 'all' && topic !== note.dataset.topic;
    if (!note.hidden) visible += 1;
  }
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === topic));
  }
  noteCount.textContent = visible === 1 ? '1 note' : visible + ' notes';
}

for (const button of buttons) {
  button.addEventListener('click', () => showTopic(button.dataset.filter));
}

window.addEventListener('hashchange', () => showTopic('all'));
filters.hidden = false;
showTopic('all');
