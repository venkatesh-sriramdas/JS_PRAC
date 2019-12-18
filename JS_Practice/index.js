var candidates=[];
var Candidate={name:'',pwd:'',comments:[]};

var StoredComments=[];

function SignUp() {
    var Name = document.getElementById("name").value;
    var Pwd = document.getElementById("pwd").value;
    console.clear();
    if(Name =='' || Pwd =='')
    {
        alert('name and pwd are mandatory fields..');
        console.log('Validation failed...');
        return false;
    }

    console.log("started saving in local storate");

    //Checking whether local storage is exists or not?
    var Candidates=[];
    // var Candidate=[{name:'test',pwd:'git test',comments:['test comments']}];
    // Candidates.push(Candidate);

    var existingData='';
    
    //comments

    //comments again

    var isExist=false;
    if (localStorage.getItem("CandStorage") != null) {
       // isExist = true;
          //getting Exising values
          Candidates = JSON.parse(localStorage.getItem("CandStorage"));

          //checking duplicates
          Candidates.forEach(function(val,key){
              if(Name == val.name)
              {
                  console.log("Already "+Name+" exists in Storage. Please log in to add comments.." );
                  isExist=true;
                  return false;
              }
          })
          
    }
    if(isExist == true)
    {
        alert("Already "+Name+" exists in Storage. Please log in to add comments.." );
        return false;
    }
            // Candidates = JSON.parse(localStorage.getItem("CandStorage"));
        // Candidates.push({ name:  Name , pwd: Pwd ,comments:'' });
        Candidates.push({ name:  Name , pwd: Pwd ,comments:[] });
        localStorage.setItem("CandStorage",JSON.stringify(Candidates));
    
  


    console.log("Local storage created on name of :" + "CandStorage");

    alert('Successfully singed up...');

}

function LogIN(){
    var Name = document.getElementById("name").value;
    var Pwd = document.getElementById("pwd").value;  
    
    if(Name =='' || Pwd =='')
    {
        alert('name and pwd are mandatory fields..');
        console.log('Validation failed...');
        return false;
    }

    var CandExists=false;
 

    if (localStorage.getItem("CandStorage") != null) {
        Candidates = JSON.parse(localStorage.getItem("CandStorage"));
        candidates = Candidates;
        //checking duplicates
        Candidates.forEach(function(val,key){
            if(Name == val.name)
            {
                console.log("User found..." );
                StoredComments = val.comments;
                Candidate = val;
                CandExists=true;
                return false;
            }
        })
    }
    else
    {
        alert('Local Storage is not availble...');
    }

    if(CandExists == false)
    {
        alert('Candidate not found..');
        return;
    }
    var divLogin = document.getElementById("LoginDiv");
    var cmnts = document.getElementById("cmnts");
    cmnts.setAttribute("style","display:block;");

    divLogin.setAttribute("style","display:none;");
    //filling saved comments 
    AppendElement(); 
    
}

function AppendElement(){
    var AllUl = document.getElementById("ALLUL");
    AllUl.innerHTML='';
    StoredComments.forEach(function(val,key){
        var el = document.createElement("li");
        el.innerText=val;
        el.setAttribute("class","list-group-item");
        AllUl.appendChild(el);

    })
}

function PostComment(){
 //StoredComments
 
 var postedComments = document.getElementById("comments").value;
 StoredComments.push(postedComments);
 AppendElement();
 document.getElementById("comments").value='';

}

function commitToStorage(){
    candidates.forEach(function(val,key){
        if(val.name==Candidate.name)
        {
            val.comments=StoredComments;
            return ;
        }
    })

    localStorage.setItem("CandStorage",JSON.stringify(candidates));
    alert('Comments Posted..');

}