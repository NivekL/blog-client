window.onload = function () {
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
                <li>
                    <h2>${posts.title}</h2>
                    <p>${posts.author}Author</p>
                    <p>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</p>
                    <p>${posts.content}Post content</p>
                </li>
            `;
        }
        posts.innerHTML = blogHTML;
        
    } catch (error) {
        throw new Error(error);
    }
}

fetchPosts();
}