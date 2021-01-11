

function deleteUsers(){
    const users= document.getElementsByClassName('users');
    while (users.length>0){
        users[0].parentNode.removeChild(users[0]);
    }
}

var usersRef = firebase.database().ref('users');
usersRef.on('value', (snapshot) => {
    deleteUsers()
    const data = snapshot.val();
    const container = document.getElementById("container");
    data.forEach(element => {
        let users = document.createElement('div');
        users.classList.add('users');

        var name = document.createElement('div');
        name.classList.add('name');
        name.innerHTML = element.name;
        users.appendChild(name);

        var val = document.createElement('div');
        val.classList.add('value');
        val.innerHTML = element.place;
        users.appendChild(val);

        var val = document.createElement('div');
        val.classList.add('value');
        val.innerHTML = element.ph;
        users.appendChild(val);

        var val = document.createElement('div');
        val.classList.add('value');
        val.innerHTML = element.email;
        users.appendChild(val);

        container.appendChild(users);
  });
});