const postApi = 'https://u1pdslvmu5.execute-api.us-east-1.amazonaws.com/prod/comment';
const getApi = 'https://u1pdslvmu5.execute-api.us-east-1.amazonaws.com/prod/comments';

document.getElementById('commentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const author = document.getElementById('author').value.trim();
  const text = document.getElementById('text').value.trim();

  if (!author || !text) {
    alert('Please enter your name and comment.');
    return;
  }

  try {
    const response = await fetch(postApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: author, comment: text })
    });

    if (response.ok) {
      alert('Comment submitted!');
      document.getElementById('author').value = '';
      document.getElementById('text').value = '';
      loadComments(); // Refresh the comment list
    } else {
      const error = await response.text();
      console.error('Error response:', error);
      alert('Failed to submit comment.');
    }
  } catch (err) {
    console.error('Request error:', err);
    alert('Network error occurred.');
  }
});

async function loadComments() {
  try {
    const response = await fetch(getApi);
    if (response.ok) {
      const comments = await response.json();
      const list = document.getElementById('commentList');
      list.innerHTML = '';
      comments.forEach(({ username, comment }) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${username}</strong>: ${comment}`;
        list.appendChild(li);
      });
    } else {
      console.error('Failed to fetch comments');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

window.onload = loadComments;