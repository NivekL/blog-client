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
        for(let posts of data.reverse()) {
        let postDate = new Date(posts.date);
            blogHTML += `
                <div>
                    <h2>${posts.title}</h2>
                    <p>Posted by: ${posts.author}</p>
                    <p>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</p>
                    <p>Tags: ${posts.tags}</p>
                    <p class="blog-post-text">${posts.content.substring(0, 100)}</p>
                    <a id="read-more-link" href="post.html?id=${posts['_id']}">Read More</a>
                </div>
            `;
        }
        posts.innerHTML = blogHTML;
        
    } catch (error) {
        throw new Error(error);
    }
}