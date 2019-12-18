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
    var isExist = false;
    
    var Candidates=[];
    // var Candidate=[{name:'test',pwd:'git test',comments:['test comments']}];
    // Candidates.push(Candidate);

    var existingData='';
    
    //comments

    //comments again

    if (localStorage.getItem("CandStorage") != null) {
       // isExist = true;
          //getting Exising values
          Candidates = JSON.parse(localStorage.getItem("CandStorage"));
          
    }
            // Candidates = JSON.parse(localStorage.getItem("CandStorage"));
        // Candidates.push({ name:  Name , pwd: Pwd ,comments:'' });
        Candidates.push({ name:  Name , pwd: Pwd ,comments:'' });
        localStorage.setItem("CandStorage",JSON.stringify(Candidates));
    
  


    console.log("Local storage created on name of :" + "CandStorage");

    alert('local storate created');

}