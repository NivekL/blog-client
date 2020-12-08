window.onload = function() {
    prefillForm();
    updatePost();
}

async function prefillForm() {
    let urlParams = new URLSearchParams(window.location.search);

    try {
        let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
        let data = await response.json();
        document.getElementById('input-title').value = data.title;
        document.getElementById('input-author').value = data.author;
        document.getElementById('post-content').value = data.content;

    } catch (message) {
        throw new Error(message);
    }
}

function updatePost() {
    let urlParams = new URLSearchParams(window.location.search);
    let form = document.getElementById('update-post-form');

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        let formData = new FormData(this);
        let object = {
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
    });
}