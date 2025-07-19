//Handling changing between SingnIn & SignUp
var sign_in_btn = document.querySelector("#sign-in-btn");
var sign_up_btn = document.querySelector("#sign-up-btn");
var container = document.querySelector(".custom-container");
// --------
var signUpName = document.querySelector("#signUpName");
var signUpMail = document.querySelector("#signUpMail");
var signUpPassword = document.querySelector("#signUpPassword");
var signUpSumbite = document.querySelector(".forms-container .sign-up-form .btn");
// sign in 
var signinMail = document.querySelector('#signinMail');
var signinPassword = document.querySelector('#signinPass');
var signInSumbite = document.querySelector('#signInSumbite');
// sign out 
logOutBtn = document.querySelector('#log-out-btn');
// ----------
emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//--------- Creat invaled message
myElem = document.createElement("p");
myElem.classList.add("text-danger");
myElem.innerHTML = "";

var allUsers = [];
// ----------------------
if(sign_up_btn != null){
    sign_up_btn.addEventListener("click", function () {
      container.classList.add("sign-up-mode");
    });
}
if(sign_in_btn != null){
    sign_in_btn.addEventListener("click", function () {
      container.classList.remove("sign-up-mode");
    });
}
// ----------------------

if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

function addUser() {
  var user = {
    userName: signUpName.value,
    password: signUpPassword.value,
    email: signUpMail.value,
  };
  var emailExists = false;
  if(user.userName==''&& user.password=='' && user.email=='')
  {
    myElem.innerHTML = "All inputs are required"
    signUpSumbite.before(myElem)

  }
  else{
    if (emailRegex.test(user.email) == true) {
    signUpMail.classList.remove("is-invalid");
    myElem.innerHTML = "";
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === user.email) {
        emailExists = true;
        break; // Exit loop if email is found
      }
    }
    // Add user only if email doesn't exist
    if (!emailExists) {
      allUsers.push(user);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      myElem.innerHTML = "Success";
      myElem.classList.remove('text-danger')
      myElem.classList.add('text-success')
      signUpSumbite.before(myElem);
      clearForm();
      container.classList.remove("sign-up-mode");
    } else {
      myElem.innerHTML = "Email Already exist";
      signUpMail.classList.add("is-invalid");
      signUpMail.parentElement.after(myElem);
    }
  } 
  else {
    myElem.innerHTML = "Invalid Email Format";
    signUpMail.classList.add("is-invalid");
    signUpMail.parentElement.after(myElem);
  }
  }
}

function clearForm() {
  signUpName.value = "";
  signUpPassword.value = "";
  signUpMail.value = "";
}

if(signUpSumbite != null){

    signUpSumbite.addEventListener("click", addUser);
}


function logIn(){
    var emailVal = signinMail.value;
    var passVal = signinPassword.value;
    var dataExests = -1;
    if(emailVal == '' && passVal == ''){
        myElem.innerHTML = "All inputs're required"
        signInSumbite.before(myElem)
    }
    else{
        for(i=0;i<allUsers.length;i++){
        if(emailVal == allUsers[i].email && passVal == allUsers[i].password){
            dataExests = i;
            break;
        }
    }
    if(dataExests != -1){
        window.location.replace('home.html'); 
        localStorage.setItem('userName',allUsers[dataExests].userName)
    }
    else{
        myElem.innerHTML = "User or Password not found"
        signInSumbite.before(myElem)
    }
    }
}


// log in 
if(signInSumbite != null){
    signInSumbite.addEventListener('click',logIn)
}

// log out 
if(logOutBtn != null){
    logOutBtn.addEventListener('click', ()=>{
        window.location.replace('index.html');
        localStorage.removeItem("userName");
    })
}




// -------------welcome message in home page------------
if(localStorage.getItem("userName") != null) {
document.querySelector('#my-h1').innerHTML = `${localStorage.getItem("userName")}`
}


