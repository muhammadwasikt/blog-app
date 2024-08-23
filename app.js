// firebase import
import {onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../firebase/firebase.js";


let logout = document.getElementById('logout')
let logOutDiv = document.querySelector('.logout-div')
let logOutCancel = document.getElementById('no-btn')
let logOutYes = document.getElementById('yes-btn')
let addNewBlog = document.getElementById('add-blog')

logout.addEventListener('click',()=>{
logOutDiv.classList.add('block')
   
})
logOutCancel.addEventListener('click',()=>{
  logOutDiv.classList.remove('block')
})
logOutYes.addEventListener('click',()=>{
  signOut(auth)
  .then(()=>{
    logOutDiv.classList.remove('block')
    console.log('user sign Out');
  })
  .catch((error)=>{
console.log(error)
  })
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid)
      // ...
    } else {
        window.location.href = './signIn/signin.html'
      // User is signed out
      // ...
    }
  });

addNewBlog.addEventListener('click',()=>{
  window.location.href = './dashboard/dashboard.html'
})