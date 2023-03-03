// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYOwrlY58GL4VuHeK4_gTFirHeNjZF71M",
  authDomain: "cvc2022-7d9c1.firebaseapp.com",
  projectId: "cvc2022-7d9c1",
  storageBucket: "cvc2022-7d9c1.appspot.com",
  messagingSenderId: "452143701959",
  appId: "1:452143701959:web:4f1a7178cccc74ed7b43e2",
  measurementId: "G-9VT2472Z6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const form = document.getElementById("adddata");
const searchform = document.getElementById("search");
const showdata_user = document.getElementById("showdata_user");
const insert = document.getElementById("insert");
form.style.display = "none"

async function getdata(db) {
  const cvccol = collection(db, "cvc2022");
  const userdata = await getDocs(cvccol);
  return userdata;
}

const data = await getdata(db);


function showdata(user) {
  const h5 = document.createElement("h5");
  const label = document.createElement("label");
  //console.log(user.data());
  showdata_user.appendChild(h5);
  showdata_user.appendChild(label);
  h5.innerHTML = user.data().name;
  label.innerHTML = user.data().character;
  h5.className = "mt-3";

  //สร้างปุ่ม
  const button = document.createElement("button");
  showdata_user.appendChild(button);
  button.innerHTML = "ลบ";
  button.className = "btn btn-danger ms-3";
  button.value = user.id;

  button.addEventListener("click", (e) => {
    let value = e.target.value;
    //console.log(value);
    deleteDoc(doc(db, "cvc2022", value));
    alert("ลบเรียบร้อย");
  });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log(form.name.value);
  //console.log(form.character.value);
  addDoc(collection(db, "cvc2022"), {
    name: form.name.value,
    character: form.character.value,
  });
  alert("บันทึกเรียบร้อย");
});

searchform.addEventListener("submit", (e) => {
  e.preventDefault();
  cleardata ();
  console.log(searchform.s_name.value);
  if(searchform.s_name.value != ""){
    data.forEach((element) => {
      if (element.data().name == searchform.s_name.value) {
        showdata(element);
      }
    });
  }else{
    data.forEach((element) => {

        showdata(element);
      });
  }
});


function cleardata (){
  showdata_user.innerHTML = ""
}

insert.addEventListener('click',function(){
  if(form.style.display == "flex"){
    form.style.display = "none"
  }else{
    form.style.display = "flex"
  }
})