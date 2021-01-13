
firebase.database().ref('utils').on('value',(snapshot) => {
    var index = document.getElementById("index");
    const data = snapshot.val();
    if(data){
        index.innerText = data.index;
    }
});

var btnIndex = document.getElementById("btnIndex");
btnIndex.addEventListener('click', function(){
    firebase.database().ref('utils').transaction((post) => {
        if (post) {
            var inx = post.index;
            var postData = {};
            postData[inx] = true;
            firebase.database().ref('new').update(postData);
            post.index = inx + 1;
          }
          return post;
    });
});


var btnUid = document.getElementById("btnUid");
btnUid.addEventListener('click', function(){
    
    var uid = document.getElementById("uid");
    var uidVal = uid.value;
    var index = document.getElementById("index");
    var indexVal = index.innerText;

    if (Number(uidVal) < Number(indexVal)){
        var postData = {};
        var now = new Date().getTime();
        postData[now] = true;
        firebase.database().ref('attendance/' + uidVal).update(postData);
    }
    else{
        alert("uid not found");
    }
    
    
});