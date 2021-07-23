
async function editPostHandler(event) {
    event.preventDefault();
   
    const title = document.querySelector("#post-title").innerHTML;
    const body = document.querySelector("#post-body").innerHTML;
    const postId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    document.location.replace("/edit/" + postId);
  }
  
  //handle deleting the post
  async function deletePostHandler(event) {
    event.preventDefault();
    //make request to post route delete with the current post id in nav bar
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const response = await fetch("/api/posts/" + post_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    //check if all good
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText); // find better way
    }
  }
  
  //handle edit post
  document.querySelector("#edit-btn").addEventListener("click", editPostHandler);
  //handle delete post
  document
    .querySelector("#delete-btn")
    .addEventListener("click", deletePostHandler);