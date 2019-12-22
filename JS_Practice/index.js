function checkAlreadyLoggedIn() {
    var s = localStorage.getItem("1");
}


var candidates = [];
//var Candidate = { name: '', pwd: '', comments: {com:[],rep:[]}, isLoggedIn: false };
//var Candidate = { name: '', pwd: '', com:{c:['c1'],r:['r11','r12']}, isLoggedIn: false };


var Candidate = {id:0 ,name: '', pwd: '', isLoggedIn: false };
var Replies =[{id:0,r:[]}];

var StoredComments = [];
var ComReps =[{cid:0,comment:'c1',replies:['r1','r2']}];

var CandID = 0;
function SignUp() {
    var Name = document.getElementById("name").value;
    var Pwd = document.getElementById("pwd").value;
    console.clear();
    if (Name == '' || Pwd == '') {
        alert('name and pwd are mandatory fields..');
        console.log('Validation failed...');
        return false;
    }

    console.log("started saving in local storate");

    //Checking whether local storage is exists or not?
    var Candidates = [];
    // var Candidate=[{name:'test',pwd:'git test',comments:['test comments']}];
    // Candidates.push(Candidate);

    var existingData = '';

    //comments

    //comments again

    var isExist = false;
    if (localStorage.getItem("CandStorage") != null) {
        // isExist = true;
        //getting Exising values
        Candidates = JSON.parse(localStorage.getItem("CandStorage"));

        //checking duplicates
        Candidates.forEach(function (val, key) {
            if (Name == val.name) {
                console.log("Already " + Name + " exists in Storage. Please log in to add comments..");
                isExist = true;
                return false;
            }
            CandID +=1;
        })

    }
    if (isExist == true) {
        alert("Already " + Name + " exists in Storage. Please log in to add comments..");
        return false;
    }
    // Candidates = JSON.parse(localStorage.getItem("CandStorage"));
    // Candidates.push({ name:  Name , pwd: Pwd ,comments:'' });
    //Candidates.push({ name: Name, pwd: Pwd, comments: {com:[],rep:[]}, isLoggedIn: false });
    
    Candidates.push({id:CandID, name: Name, pwd: Pwd, isLoggedIn: false });

    localStorage.setItem("CandStorage", JSON.stringify(Candidates));

    localStorage.setItem("R",JSON.stringify(ComReps));


    console.log("Local storage created on name of :" + "CandStorage");

    alert('Successfully singed up...');

}

function LogIN() {
    var Name = document.getElementById("name").value;
    var Pwd = document.getElementById("pwd").value;

    if (Name == '' || Pwd == '') {
        alert('name and pwd are mandatory fields..');
        console.log('Validation failed...');
        return false;
    }

    var CandExists = false;

    if (localStorage.getItem("CandStorage") != null) {
        candidates = JSON.parse(localStorage.getItem("CandStorage"));
        //checking duplicates

        var tempCandidates = [];
        var tempCandidates = candidates;

        candidates.forEach(function (val, key) {
            if (Name == val.name) {
                console.log("User found...");
                
                if (localStorage.getItem("R") != null) {
                    ComReps = JSON.parse(localStorage.getItem("R"));
                }

                Candidate = val;
                tempCandidates[key].isLoggedIn = true;
                CandExists = true;
                return false;
            }
        })
    }
    else {
        alert('Local Storage is not availble...');
    }

    if (CandExists == false) {
        alert('Candidate not found..');
        return;
    }

    localStorage.setItem("CandStorage", JSON.stringify(tempCandidates));

    var h1user = document.getElementById("h1logged");
    h1user.innerHTML = 'Logged in as :' + Name;
    var creds = [Name, Pwd];
    localStorage.setItem("1", JSON.stringify(creds));

    var divLogin = document.getElementById("LoginDiv");
    var cardHeader = document.getElementById("cardHeader");
    var AllComments = document.getElementById("AllComments");
    var cmnts = document.getElementById("cmnts");
    cmnts.setAttribute("style", "display:block;");
    AllComments.setAttribute("style", "display:block;");
    cardHeader.setAttribute("style", "display:block;");

    divLogin.setAttribute("style", "display:none;");
    //filling saved comments 
    AppendElement();

}
var i =0;
function AppendElement() {
    var AllUl = document.getElementById("ALLUL");
    AllUl.innerHTML = '';
    ComReps.forEach(function (val, key) {

        
            var el = document.createElement("li");
            el.innerText = val.comment;
            el.setAttribute("class", "list-group-item mainLi" + key);
            el.setAttribute("id", "mainLi" + key);
    
            
            var input = document.createElement("textarea");
            input.setAttribute("type", "textarea");
            input.setAttribute("rows", "4");
            input.setAttribute("cols", "50");
            input.setAttribute("id", "inputs" + key);
            input.setAttribute("class", "form-control inputs" + key);
            input.setAttribute("placeholder", "Reply");
            el.appendChild(input);
    
    
            var btn1 = document.createElement("button");
            btn1.setAttribute("class", "btn  btn-xs btnnew btn-primary inputs" + key);
            btn1.setAttribute("onclick", "AppendElementSub(" + key + ")");
            btn1.innerText = "Post Reply";
            el.appendChild(btn1);
    
    
            var btn = document.createElement("button");
            btn.setAttribute("class", "btn  btn-xs btn-primary anybtn anybtn" + key);
            btn.setAttribute("onclick", "clickedBtn(" + key + ")");
            btn.innerText = "Reply";
            el.appendChild(btn);
    
            AllUl.appendChild(el);
            AppendExistingElementSub(val.replies,key);
         
       

       
        i +=1;

    })
}

function AppendElementSub(key) {
    var AllUl = document.getElementById("mainLi" + key);

    var ul = document.createElement("ul");

    if(document.getElementById("inputs" + key).value =='')
    {
        alert('reply can not be empty..');
        return false;

    }

    var el = document.createElement("li");
    el.innerText = document.getElementById("inputs" + key).value;
    document.getElementById("inputs" + key).value = '';
    el.setAttribute("class", "list-group-item sm-2 subLiNew" + key);
    ul.appendChild(el);
    AllUl.appendChild(ul);

}

function AppendExistingElementSub(rps,index) {
    var AllUl = document.getElementById("mainLi" + index);
    var ul = document.createElement("ul");

    rps.forEach(function (val, key) {
        var el = document.createElement("li");
        el.innerText = val;
        el.setAttribute("class", "list-group-item subLiOld" + key);
        el.setAttribute("id", "subLi" + key);
        ul.appendChild(el);
        

    })

    AllUl.appendChild(ul);

}

function PostComment() {
    //StoredComments

    var postedComments = document.getElementById("comments").value;
    if (postedComments == '') {
        alert("comments can't be empty..");
        return false;
    }
    ComReps.c.push(postedComments);
    AppendElement();
    document.getElementById("comments").value = '';

}

function commitToStorage() {
    candidates.forEach(function (val, key) {
        if (val.name == Candidate.name) {
            val.comments = StoredComments;
            return;
        }
    })

    localStorage.setItem("CandStorage", JSON.stringify(candidates));
    alert('Comments Posted..');

}
function logout() {
    var Name = document.getElementById("name").value;

    if (localStorage.getItem("CandStorage") != null) {
        candidates = JSON.parse(localStorage.getItem("CandStorage"));
        //checking duplicates

        var tempCandidates = [];
        var tempCandidates = candidates;

        candidates.forEach(function (val, key) {
            if (Name == val.name) {
                tempCandidates[key].isLoggedIn = false;
                return false;
            }
        })
    }
    else {
        alert('Local Storage is not availble...');
    }
    localStorage.removeItem("1");
    localStorage.setItem("CandStorage", JSON.stringify(candidates));
    location.reload();
    console.log("Logged out...");

}

