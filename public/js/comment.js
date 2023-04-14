const post_id = document.querySelector('input[name="post-id"]').value
const newFormHandler = async (event) => {
    // event.preventDefault();
  
    const comment_body = document.querySelector('#comment-body').value.trim();
  
    if (comment_body) {
        console.log(comment_body)
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_body, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        console.log(response);
      }
    }
  };



document
  .querySelector('.submit-btn')
  .addEventListener('click', newFormHandler);