// firebase import
import {signOut} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { ref , uploadBytesResumable , getDownloadURL} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {auth , storage , db} from "../firebase/firebase.js";

let blogTitle = document.getElementById('title')
let description = document.getElementById('description')
let userImage = document.getElementById('file')
let addNewBlog = document.getElementById('add-btn')
let allBlog = document.getElementById('all-blog')
let logout = document.getElementById('logout')
let logOutDiv = document.querySelector('.logout-div')
let logOutCancel = document.getElementById('no-btn')
let logOutYes = document.getElementById('yes-btn')





let uploadTask;
let getImage;
description.value= ''



userImage.addEventListener('change', (event) => {
    let images = event.target.files[0];
    let imageArea = document.getElementById('user-img');

    let fileReader = new FileReader();
    fileReader.onload = (eve) => {
        if (images.type.startsWith('image/')) { 
            imageArea.src = fileReader.result;
            imageArea.style.display = 'block'
        }
    }
    fileReader.readAsDataURL(images);

  // File upload on cloud storage
    const files = userImage.files[0];
        const imagesRefWithFolder = ref(storage, `products/${files.name}`);
        uploadTask = uploadBytesResumable(imagesRefWithFolder, files);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        getImage = downloadURL;
                    });
            }
            
          )
});

allBlog.addEventListener('click',()=>{
    window.location.href = '../index.html'
  })

  // Data upload on firestore
  addNewBlog.addEventListener('click', async ()=>{
      try {
        const docRef = await addDoc(collection(db, "users"),
         {
          title: blogTitle.value,
          description: description.value,
          img: getImage
         }
        );
        window.location.href = '../index.html'
        console.log("Document written with ID: ", docRef.id) 
      } catch (e) {
      }
    
  })
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
        window.location.href = '../index.html'
        console.log('user sign Out');
      })
      .catch((error)=>{
    console.log(error)
      })
    })