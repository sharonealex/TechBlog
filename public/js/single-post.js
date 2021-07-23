
async function handleComments(event) {
    event.preventDefault();

    const postId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const commentText = document.querySelector("#comment-text").value.trim();

    if (commentText) {
    
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
            commentText, 
            postId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
    
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText); 
      }
    }
  }
  






document.querySelector("#post-comment-btn").addEventListener("click", handleComments);