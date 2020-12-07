window.onload = function () {
fetchTableData();
}

let postTableData = document.getElementById('post-table-data');

async function fetchTableData() {
    try {
        let response = await fetch("http://localhost:3000/posts");
        let data = await response.json();
        let postHTML = "";

        for(let postData of data.reverse()) {
        let postDate = new Date(postData.date);
            postHTML += `
                <tr>
                    <td>${postData.title}</td>
                    <td>Author: ${postData.author}</td>
                    <td>Post content: ${postData.content}</td>
                    <td>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</td>
                    <td>
                        <a href="update-post.html?id=${postData['_id']}">Update</a>
                        <a href="#" class="delete-pun-btn" data-id="${postData['_id']}">Delete</a> 
                    </td>
                </tr>
            `;
        }
        postTableData.innerHTML = postHTML;
    } catch(error) {
        throw new Error(error);
    }
}