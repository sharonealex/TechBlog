async function updatePostHandler(event) {
    event.preventDefault();
    const title = document.querySelector("#post-title").value.trim();
    const body = document.querySelector("#post-body").value.trim();
    const postId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
   
    if (body) {
      //make sure we have comment text
      const response = await fetch("/api/posts/" + postId, {
        method: "PUT",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      //check if all good
      if (response.ok) {
        document.location.replace("/dashboard"); //replace with post id
      } else {
        alert(response.statusText); // find better way to do this
      }
    }
  }
  
  document
    .querySelector("#update-post-btn")
    .addEventListener("click", updatePostHandler);