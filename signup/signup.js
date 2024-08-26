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
        let mailboxUrl = 'https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&ifkv=Ab5oB3rw_zRQfJQ7uFApV2SRRLrMQ9fcoTjjXdxv2BJ8obXBbmCVbX0ZULxP65ZuGHITyIeklj7d3A&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
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