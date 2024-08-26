// firebase import
import { createUserWithEmailAndPassword , sendEmailVerification , signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth , provider} from "../firebase/firebase.js";




// input field
let userName = document.getElementById('name')
let userEmail = document.getElementById('email')
let userPassword = document.getElementById('password')

// checkbox
let passwordCheck = document.getElementById('pas-check')

// button
let regestrationBtn = document.getElementById('create-acc')
let login = document.getElementById('login')

// image
let googleLogin = document.getElementById('google-btn')

// password show function
passwordCheck.addEventListener('click',()=>{
    if (passwordCheck.checked == true) {
    userPassword.type = 'Text'
} else {
    userPassword.type = 'Password'
}
})

login.addEventListener('click',()=>{
  window.location.href = '../signIn/signin.html'
})
// registration function

regestrationBtn.addEventListener('click',()=>{
// validations
if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && /[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
if (/gmail.com/.test(userEmail.value)) {

  regestrationBtn.innerHTML = 'loading.....'
  // authentication
createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    // Signed up 
    regestrationBtn.innerHTML = 'Create Account'
    const user = userCredential.user;
    userEmail.value = ''
    userPassword.value = ''
    userName.value = ''
    alert('Your account is create ')
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
        alert('Please verify your account go to gmail')
        let mailboxUrl = 'https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&emr=1&ltmpl=default&ltmplcache=2&osid=1&passive=true&rm=false&scc=1&service=mail&ss=1&ifkv=Ab5oB3qlG03nWwBrXqI8jItJ4fuZ-3tUFEEJopUyfQhDM4FDJniaSLuVpqKv5udtyvfv1KNS-qty_g&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
        window.open(mailboxUrl, '_blank');
    });
console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire('This email is already use')
     regestrationBtn.innerHTML = 'Create Account'
    console.log(errorCode + ',' + errorMessage)
    // ..
  });
// validation error
  
} else {
  Swal.fire("Type valid email")
  regestrationBtn.innerHTML = 'Create Account'
}
}
if (userName.value >! 2) {
  Swal.fire("Type name");
userName.style.color= 'red'
}
if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value)) {
  Swal.fire("Type email");
  userEmail.style.color = 'red'
}
if (!/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)){
  Swal.fire("Type strong password");
    document.getElementById('password-section').style.color = 'red'
}
if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(userName.value) && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && !/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
  Swal.fire("Type name , email and password");
}else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && !/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
  Swal.fire("Type email and password");
}


})
googleLogin.addEventListener('click',()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    window.location.href = '../index.html'
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = GoogleAuthProvider.credentialFromError(error);
    });

  
})