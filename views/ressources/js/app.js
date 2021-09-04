/*
* Fonction appelée lors d'un appui sur une touche qui envoie une requette au décodeur
* afin de changer la chaîne selon la touche pressée.
*/
function change(key) {
  let mode = 0;
  fetch(`http://xxx.x.x.x:3000/xxx.xxx.x.xx:8080/remoteControl/cmd?operation=01&key=${key}&mode=${mode}`, {
          method: 'GET', 
          mode: 'cors', 
          cache: 'default', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow'
        })
      .then(res=>res.json())
      .then(data=>{
        getinfo(key);
      }).catch(error=>{
        console.log("function change() error at");
      })
}
/*
* Fonction appelée par la fonction change() qui envoie une requete qui permet de récuperer
* l'ID de la chaîne actuelle'.
*/
function getinfo(key) {
  fetch("http://xxx.x.x.x:3000/xxx.xxx.x.xx:8080/remoteControl/cmd?operation=10", {
    method: 'GET', 
    mode: 'cors', 
    cache: 'default', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  })
  .then(res=>res.json())
  .then(data=>{
    if (key === undefined) return setTimeout(() => init(data.result.data.activeStandbyState), 1000);
    if (key != 116) return setTimeout(() => gettv(data.result.data.playedMediaId), 1000); // 116 est le code pour eteindre la tv
  }).catch(error=>{
  console.log("function getinfo() error");
  })
}
/*
* Fonction appelée par la fonction getinfo() qui envoie une requete a un serveur distant afin de
* récupèrer les informations de l'emmission qui est entrain de passer comme le nom de l'emmission,
* l'image de l'emmission et d'autres informations.
*/
function gettv(code) {
  let info = document.getElementById('informations');
  let controller = document.getElementById('controller');
  fetch(`http://xxx.x.x.x:3000/https://rp-ott-mediation-tv.woopic.com/live/v3/applications/PC/programs?groupBy=channel&period=current&epgIds=${code}&mco=OFR`, {
    method: 'GET', 
    mode: 'cors', 
    cache: 'default', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  })
  .then(res=>res.json())
  .then(data=>{
    setTimeout(function() {
      controller.style.backgroundImage = `url(${data[code][0].covers[0].url})`;
      info.innerHTML = data[code][0].title;
    }, 1000);
  }).catch(error=>{
    console.log("function gettv() error");
  })
}
getinfo();
/*
* Change la couleur de l'icone power 
*/
function power(key) {
  let power = document.querySelector("#power");
  power.classList.toggle("on");
  change(key);
}
/*
* Ouvre ou ferme le menu
*/
function menu() {
  let menu = document.querySelector(".menu-display");
  menu.classList.toggle("closed");
}
function init(state) {
  let power = document.querySelector("#power");
  if (state == 1) {
    power.classList.toggle("on");
  }
  else return;
}