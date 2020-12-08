let form = document.getElementById('create-post-form');
form.addEventListener('submit', createPost);

async function createPost(e) {
    e.preventDefault();

    let formData = new FormData(this);
    
    console.log(formData.get('input-title'));
    console.log(formData.get('input-author'));
    console.log(formData.get('textarea-content'));

    let object = {
        tags: formData.getAll('tags'),
        title: formData.get("input-title"),
        author: formData.get("input-author"),
        content: formData.get("textarea-content")
    }
    
    try {
        await fetch('http://localhost:3000/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        window.location.replace('index.html');
    } catch (e) {
        throw new Error(e);
    }
}