window.onload = function() {
    prefillForm();
    updatePost();
}

let formTitle = document.getElementById('input-title');
let formAuthor = document.getElementById('input-author');
let formContent = document.getElementById('post-content');
let formTags = document.getElementById('post-tags')
let formDefaultTag = document.getElementById('default');
let errorHandler = document.getElementById('error-handler');

async function prefillForm() {
    let urlParams = new URLSearchParams(window.location.search);

    try {
        let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
        let data = await response.json();
        formTitle.value = data.title;
        formAuthor.value = data.author;
        formContent.value = data.content;
        formTags.value = data.tags;

    } catch (message) {
        throw new Error(message);
    }
}

function updatePost() {
    let urlParams = new URLSearchParams(window.location.search);
    let form = document.getElementById('update-post-form');

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        if(formTitle.value.trim() === "" || formAuthor.value.trim() === "" || formContent.value.trim() === "" || formDefaultTag.selected) {
            errorHandler.innerText = "Fill in fields and select an actual tag";
        } else {
            let formData = new FormData(this);
            let object = {
                tags: formData.getAll('tags'),
                title: formData.get('input-title'),
                author: formData.get('input-author'),
                content: formData.get('textarea-content')
            }
    
            try {
                await fetch('http://localhost:3000/posts/' + urlParams.get('id') , {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                });
                
                window.location.replace('index.html');
            } catch (error) {
                throw new Error(error);
            } 
        }
    });
}