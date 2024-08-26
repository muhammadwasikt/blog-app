// firebase import
import {sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../firebase/firebase.js";

// email input
let email = document.getElementById('email')

// forget Button
let forgetButton = document.getElementById('f-p-btn')

// forgot function
forgetButton.addEventListener('click',()=>{
  forgetButton.innerHTML = 'loading......'
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
      if (/gmail.com/.test(email.value)) {
    sendPasswordResetEmail(auth, email.value)
  .then(() => {
    email.value = ''
    Swal.fire("Email has been sent check your Mail box");
    forgetButton.innerHTML = 'Forgot Password'
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    forgetButton.innerHTML = 'Forgot Password'
    // ..
  });
          
} else{
  Swal.fire("Type valid email");
  forgetButton.innerHTML = 'Forgot Password'
}
}else if (email.value.length == 0) {
  Swal.fire("Type email");
  forgetButton.innerHTML = 'Forgot Password'
}else {
    Swal.fire("Type correct email");
    forgetButton.innerHTML = 'Forgot Password'
}
})