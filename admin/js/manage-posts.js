window.onload = function () {
fetchTableData();
}

let postContainer = documnet.getElement('table-post');
let postData = documnet.getElement('post-table-data');

async function fetchTableData() {
    try {
        let response = await fetch('http://localhost:3000/posts');
        let data = response.json();

        let postHTML = "";
        for(let postData of data.reversed()) {
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
        postData.innerHTML = postHTML;
    } catch(error) {
        throw new Error(error);
    }
}