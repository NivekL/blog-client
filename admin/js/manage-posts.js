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
                    <td>${postData.author}</td>
                    <td>${postData.tags}</td>
                    <td>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</td>
                    <td>
                        <a href="update-post.html?id=${postData['_id']}" class="update-post-btn">Update</a>
                        <a href="#" class="delete-post-btn" data-id="${postData['_id']}">Delete</a> 
                    </td>
                </tr>
            `;
        }
        postTableData.innerHTML = postHTML;
    } catch(error) {
        throw new Error(error);
    }

    deletePostEvent();

}

// Delete post function 
function deletePostEvent() {
    let deleteBtns = document.getElementsByClassName('delete-post-btn');
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            let postId = this.dataset.id;
            console.log(postId);
            try {
                await fetch('http://localhost:3000/posts/' + postId, {
                    method: 'DELETE'
                });

                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }
        
        })
    }
}