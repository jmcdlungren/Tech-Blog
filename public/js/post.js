const displayUpdateHandler = async (event) => {
    event.preventDefault();
  
    const oldPost = document.getElementById('old-post-form');
    
    oldPost.style.display = "block";
  }

const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('value');
        const title = document.querySelector('#post-title').value.trim();
        const content = document.querySelector('#post-content').value.trim();

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/api/posts/${id}`);
        } else {
            alert('Failed to update post');
        }
    }
};

const delButtonHandler = async (event) => {
    console.log(event.target);
    if (event.target.hasAttribute('value')) {
        const id = event.target.getAttribute('value');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.post-update')
    .addEventListener('click', displayUpdateHandler);

document
    .querySelector('.form-save')
    .addEventListener('click', updateButtonHandler);

document
    .querySelector('.post-delete')
    .addEventListener('click', delButtonHandler);

