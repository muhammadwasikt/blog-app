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

// authentication
if (userName.value > 2 && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && /[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
// authentication
createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // email verification
sendEmailVerification(auth.currentUser)
.then(() => {
  // Email verification sent!
  // ...
});
window.location.href = '../signIn/signin.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode , errorMessage)
    // ..
  });
// validation error
}
if (userName.value >! 2) {
  Swal.fire("Type your name");
userName.style.color= 'red'
}
if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value)) {
  Swal.fire("Type correct email");
  userEmail.style.color = 'red'
}
if (!/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)){
  Swal.fire("Type correct password");
    document.getElementById('password-section').style.color = 'red'
}
if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(userName.value) && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && !/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
  Swal.fire("Type correct name , email and password");
}else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value) && !/[A-Za-z\d!@#$%^&*]{8,}$/.test(userPassword.value)) {
  Swal.fire("Type correct email and password");
}

userEmail.value = ''
userName.value = ''
userPassword.value = ''

})
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