

function deleteUsers(){
    const users= document.getElementsByClassName('users');
    while (users.length>0){
        users[0].parentNode.removeChild(users[0]);
    }
}

function clickListeners(){
    const users= document.getElementsByClassName('users');
    for (let i = 0; i < users.length; i++) {
        users[i].addEventListener('click',function() {
            window.location.search = "id=" + this.innerText
        });
        
    }
}



if (window.location.search === "") {
    var usersRef = firebase.database().ref('new');
    usersRef.on('value', (snapshot) => {
        deleteUsers()
        const data = snapshot.val();
        const container = document.getElementById("container");
        
        for (var key in data){
            let users = document.createElement('div');
            users.classList.add('users');

            var name = document.createElement('div');
            name.classList.add('name');
            name.innerHTML = key;
            users.appendChild(name);

            container.appendChild(users);
        }

    clickListeners();

    });
} else {
    deleteUsers()
    const container = document.getElementById("container");
    
    let users = document.createElement('div');
    users.classList.add('users');

    getBR(users);

    createInput(users,"name","Name","text");
    
    getBR(users);
    getBR(users);
    getBR(users);

    createInput(users,"place","Place","text");

    getBR(users);
    getBR(users);
    getBR(users);

    createInput(users,"ph","Phone Number","number");

    getBR(users);
    getBR(users);
    getBR(users);

    createInput(users,"email","Email","email");

    getBR(users);
    getBR(users);
    getBR(users);
    
    var btn = document.createElement('input');
    btn.setAttribute("id", "btn");
    btn.setAttribute("type", "submit");
    users.appendChild(btn);

    container.appendChild(users);

    btn.addEventListener('click',function () {
        let name = document.getElementById("name").value;
        let place = document.getElementById("place").value;
        let ph = document.getElementById("ph").value;
        let email = document.getElementById("email").value;

        const url = new URL(window.location.href);
        let userId = url.searchParams.get("id")

        firebase.database().ref('new/' + userId).remove();
        firebase.database().ref('users/' + userId).set({
            name: name,
            email: email,
            ph : ph,
            place : place
          },(error) => {
              if (error) {
                  alert("Server Error");
              } else {
                  window.location.search = "";
              }
          });
  
    });

}    



function getBR(users) {
    var br = document.createElement("br");
    users.appendChild(br);
}

function createInput(users,id,placeholder,type) {
    var label = document.createElement('label');
    label.setAttribute("for", id);
    label.innerHTML = placeholder;
    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", type);
    input.setAttribute("placeholder", placeholder);
    users.appendChild(label);
    users.appendChild(input);
}

