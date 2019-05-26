// const urlGitHubRepos = "https://api.github.com/users/MiguelBCN/repos";
let searchString = "MiguelBCN";
let resultHtml = document.getElementById("result-search");
//Esta funcion se encargara de buscar todos los resultados de la barra de busqueda y creara una lista con todos estos(max 30)
function searchUser() {
  resultHtml.innerHTML = "";
  let searchNavbar = document.querySelectorAll("#search-nav input");
  fetch(`https://api.github.com/search/users?q=${searchNavbar[0].value}`, {
    method: "GET"
  })
    .then(datos => {
      return datos.json();
    })
    .then(datos => {
      //Si el resultado es correcto mostrara todos los usuarios
      if (datos.total_count) {
        resultHtml.innerHTML += "<h1>Resultados</h1>";
        for (let user of datos.items) {
          resultHtml.innerHTML += `<p onclick=fullUserHtml('${user.login}')>${
            user.login
          }</p>`;
        }
        // search(user.login);

        //Si el resultado fuera incorrecto creara un ventana que diga error
      } else {
        console.log("Ningun nombre coincide con el nomnbre de usuario dado");
        resultHtml.innerHTML = "<div class='error-search'>Does not exist</div>";
      }
    })
    .catch(datos => {
      console.error(`El error es ${datos}`);
    });
}
//Esta otra funcion se encarga de coger la informacion y repos de un usuario especifico
function fullUserHtml(userName) {
  resultHtml.innerHTML = `<div class="bio-user"></div><div class="repos-user"></div>`;
  fetch(`https://api.github.com/users/${userName}`, { method: "GET" })
    .then(datos => {
      return datos.json();
    })
    .then(datos => {
      biosHtml(datos);
      console.log(datos);
    })
    .catch(datos => {
      console.error("Error al cargar los datos de perfil en html");
    });
  fetch(`https://api.github.com/users/${userName}/repos`, { method: "GET" })
    .then(datos => {
      return datos.json();
    })
    .then(datos => {
      reposHtml(datos);
      console.log(datos);
    })
    .catch(datos => {
      console.error("Error al cargar los datos de perfil en html");
    });
}
//Estas son subfunciones que pasadas los parametos correctos cargaran el html con innerHTML
function biosHtml(user) {
  let bio = document.querySelectorAll(".bio-user");
  //bio,name,login,avatar url
  bio[0].innerHTML = `
  <div class="user-avatar"><img src='${user.avatar_url ||
    "img/github-icon.png"}'></div>
  <div class="user-info">
    <div class="user-alias"><i>@${user.login}</i></div>
    <div class="user-name">${user.name}</div>
    <div class="user-bio">${user.bio}</div>
  </div>`;
}
function reposHtml(repos) {
  let reposHtml = document.querySelectorAll(".repos-user");
  console.log(repos);
  reposHtml[0].innerHTML = `<div><h1>Repos</h1></div>`;
  for (let repo of repos) {
    reposHtml[0].innerHTML += `<div class="repo-user">
      <div>${repo.name} </div>
      <div><i class="fas fa-star"></i>
      ${repo.forks_count}
    
      <i class="fas fa-code-branch"></i>${repo.stargazers_count}</div>
    </div>`;
  }
}
