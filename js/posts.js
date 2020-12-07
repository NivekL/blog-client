window.onload = function () {
fetchPosts();
}

let container = document.getElementById('container');
let posts = document.getElementById('posts');

async function fetchPosts() {
    try {
        let response = await fetch("http://localhost:3000/posts");
        let data = await response.json();
        let blogHTML = "";
        for(let posts of data) {
        let postDate = new Date(posts.date);
            blogHTML += `
                <div>
                    <h2>${posts.title}</h2>
                    <p>Author: ${posts.author}</p>
                    <p>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</p>
                    <p>Post content: ${posts.content}</p>
                </div>
            `;
        }
        posts.innerHTML = blogHTML;
        
    } catch (error) {
        throw new Error(error);
    }
}