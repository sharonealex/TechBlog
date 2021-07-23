async function newPostHandler(event) {
  
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const body = document.querySelector("#text").value.trim();
    console.log(body)
    
    if (body) {
     
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    console.log("geerrr", response)
      
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector("#new-post-btn")
    .addEventListener("click", newPostHandler);