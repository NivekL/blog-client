window.onload = function () {
    fetchData();
}

let blogPost = document.getElementById("blog-post");

async function fetchData() {
  let urlParams = new URLSearchParams(window.location.search);

  try {
    let response = await fetch(
      "http://localhost:3000/posts/" + urlParams.get("id")
    );
    let data = await response.json();

    let postHtml = "";

    let postDate = new Date(data.date);
      postHtml += `
            <div>
                <h2>${data.title}</h2>
                <p>Posted by: ${data.author}</p>
                <p>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</p>
                <p>Tags: ${data.tags}</p>
                <p class="single-post-text">${data.content}</p>
            </div>
            `;

    blogPost.innerHTML = postHtml;

  } catch(e) {
    throw new Error(e);
  }
}

