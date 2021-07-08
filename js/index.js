const newTag = (string) => document.createElement(string);
const pick = (string) => document.querySelector(string);
const pickAll = (string) => document.querySelectorAll(string);

document.addEventListener("DOMContentLoaded", () => {
  pick("#github-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e.target);
    if (e.target.search.value.length > 0) {
      const word = e.target.search.value;
      fetchSearchUsers(word);
      
    }
  });
});



// function fetchSearchUsers(word) {
//   fetch(`https://api.github.com/search/users?q=${word}`)
//     .then((resp) => resp.json())
//     .then((json) => {
// //       pick("#main").innerHtml = "";
//       json.items.forEach(renderObjCards)
//     });
// }

function fetchSearchUsers(value) {
  fetch(`https://api.github.com/search/users?q=${value}`)
    .then((resp) => resp.json())
    .then((json) => json.items.forEach(renderObjCards));
}

function renderObjCards(obj) {
  let divObj = newTag("div");
  let h1Name = newTag("h1");
  let divFrame = newTag("div")
  let img = newTag("img");
  
  let aLink = newTag("a");

  h1Name.textContent = obj.login;
  img.src = obj.avatar_url;
  aLink.href = obj.html_url;
  aLink.innerText = `Visit ${obj.login}'s Github Page.`;
  h1Name.className = "center-text";
  divFrame.id = "avatar-frame"
  divObj.name = "objCard"
  img.name = obj.login
  
  img.id = "avatar-img";
  divObj.className = "objCard";
  aLink.className = "center-text";
  aLink.fontSize = "10px";
  
  divFrame.append(img)
  divObj.append(h1Name, divFrame, aLink);

  pick("#user-list").append(divObj);
  
  img.addEventListener("click", (e) => {
    console.log(e.target.name)
    fetchUserRepo(e.target.name)
    
    // fetchUserRepo(e.target.search.value)
  })
}

function fetchUserRepo(value) {
  fetch(`https://api.github.com/users/${value}/repos`)
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json)
      pick("ul#user-list").innerHtml = ""
      json.forEach(renderRepoCards)
    });
    
}

  function renderRepoCards(obj) {
    pick("#repos-list").textContentt = (`
       <div>
          <div>
            <h1> Name: ${obj.name} </h1>
            <a href="https://github.com/${obj.full_name}">Go to repository </a>
            <p> Forks: ${obj.forks_count}</p>
            <p> 
          </div>
       </div>
    `)
  }