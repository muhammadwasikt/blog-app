// firebase import
import { signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider , sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
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
    window.location.href = '../index.html'
    login.innerHTML = 'Login'
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  })
// email verification
sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
// validation error
}
if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value)) {
  Swal.fire("Type correct email");
userEmail.style.color = 'red'
}
if (!/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)){
    document.getElementById('password-section').style.color = 'red'
    Swal.fire("Type correct password");
}
if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && !/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
  Swal.fire("Type correct email and password");
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
