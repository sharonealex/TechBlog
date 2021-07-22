async function signUpFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    //register user first
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      //then we send in a request to log into the webpage
      const responseLogin = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
            username,
            password
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("response from back is", response)
  
      if (responseLogin.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
  .querySelector("#signUp-btn")
  .addEventListener("click", signUpFormHandler);