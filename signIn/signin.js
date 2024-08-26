// firebase import
import { signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth , provider} from "../firebase/firebase.js";



// input field
let userEmail = document.getElementById('email')
let userPassword = document.getElementById('password')

// checkbox
let passwordCheck = document.getElementById('pas-check')

// button
let regestrationBtn = document.getElementById('create-acc')
let login = document.getElementById('login')
let forogtBtn = document.getElementById('forget')

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

regestrationBtn.addEventListener('click',()=>{
    window.location.href = '../signup/signup.html'
})
// registration function
login.addEventListener('click',()=>{
login.innerHTML = 'Loading......'
// validations
if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && /[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {

// authentication
signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    // Signed in 
    userEmail.value = ''
    userPassword.value = ''
    login.innerHTML = 'Login'
    const user = userCredential.user;
    localStorage.setItem('user email', user.uid)
    console.log(user)
      if (user.emailVerified) {
        window.location.href = '../index.html' 
      }else{
        alert('Please verify your account go to gmail')
        let mailboxUrl = 'https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&ifkv=Ab5oB3rw_zRQfJQ7uFApV2SRRLrMQ9fcoTjjXdxv2BJ8obXBbmCVbX0ZULxP65ZuGHITyIeklj7d3A&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
      
        window.open(mailboxUrl, '_blank');
      }    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    login.innerHTML = 'Login'
    if (errorMessage) {
      Swal.fire('Type valid email and password')
    }
  })
// validation error
}
if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && !/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
  Swal.fire("Type correct email and password");
  login.innerHTML = 'Login'
}
else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value)) {
  Swal.fire("Type correct email");
userEmail.style.color = 'red'
login.innerHTML = 'Login'
}
else if (!/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)){
    document.getElementById('password-section').style.color = 'red'
    Swal.fire("Type correct password");
    login.innerHTML = 'Login'
}


}) 
if (googleLogin) {
    googleLogin.addEventListener('click',()=>{
        signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        window.location.href = '../index.html'
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used..
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    
      
    })
}
forogtBtn.addEventListener('click',()=>{
  window.location.href = '../forget-password/forget.html'
})
