let form = document.getElementById('create-post-form');
let formTitle = document.getElementById('input-title');
let formAuthor = document.getElementById('input-author');
let formContent = document.getElementById('post-content');
let formDefaultTag = document.getElementById('default');
let errorHandler = document.getElementById('error-handler');

form.addEventListener('submit', createPost);

async function createPost(e) {
    e.preventDefault();

    if(formTitle.value.trim() === "" || formAuthor.value.trim() === "" || formContent.value.trim() === "" || formDefaultTag.selected) {
        errorHandler.innerText = "Fill in fields and select an actual tag";
    } else {
        let formData = new FormData(this);

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
}