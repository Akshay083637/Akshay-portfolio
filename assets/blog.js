// Fetches a content/*.json file and renders its posts into #post-list
async function renderPosts(jsonPath) {
  const container = document.getElementById('post-list');
  if (!container) return;

  try {
    const res = await fetch(jsonPath + '?t=' + Date.now()); // cache-bust so new posts show up right away
    const data = await res.json();
    const posts = (data.posts || []).slice().reverse(); // newest first

    if (posts.length === 0) {
      container.innerHTML = '<p class="coming-soon">Nothing posted yet — check back soon.</p>';
      return;
    }

    container.innerHTML = posts.map(function (post) {
      const dateStr = post.date ? new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';
      const photo = post.photo ? '<img src="' + post.photo + '" alt="" style="max-width:100%;border-radius:6px;margin:16px 0;">' : '';
      const body = (post.body || '').replace(/\n/g, '<br>');
      return (
        '<article class="post">' +
          '<h2>' + escapeHtml(post.title || 'Untitled') + '</h2>' +
          (dateStr ? '<div class="post-date">' + dateStr + '</div>' : '') +
          photo +
          '<p>' + body + '</p>' +
        '</article>'
      );
    }).join('');
  } catch (err) {
    container.innerHTML = '<p class="coming-soon">Couldn\'t load posts right now.</p>';
    console.error(err);
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
