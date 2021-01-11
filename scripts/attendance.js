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
            window.location.search = "id=" + this.id ;
        });
        
    }
}



if (window.location.search === "") {
    var usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
        deleteUsers()
        const data = snapshot.val();
        const container = document.getElementById("container");
        
        for (var key in data){
            let users = document.createElement('div');
            users.classList.add('users');

            var name = document.createElement('div');
            name.classList.add('name');
            users.setAttribute("id",key);
            name.innerHTML = data[key].name;
            users.appendChild(name);

            container.appendChild(users);
        }

    clickListeners();
    
    });
} else {
    deleteUsers()
    const container = document.getElementById("container");
    
    const url = new URL(window.location.href);
    let userId = url.searchParams.get("id")


    firebase.database().ref('attendance/' + userId).on('value',(snapshot) =>{
        const data = snapshot.val()
        for(var key in data){
            console.log(typeof(key));
            var t = new Object(key);
            var time = new Date();
            time.setTime(t)

            let users = document.createElement('div');
            users.classList.add('users');
        
            var name = document.createElement('div');
            name.classList.add('name');
            name.innerHTML = time.customFormat("#DD# / #MMM# / #YYYY#");
            users.appendChild(name);

            var name = document.createElement('div');
            name.classList.add('name');
            name.innerHTML = time.customFormat("#hh#:#mm# #ampm#");
            users.appendChild(name);

            container.appendChild(users);
        }
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

Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  };