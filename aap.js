
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

base
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();


document.getElementById("save-btn")?.addEventListener("click", () => {
  const exercise = document.getElementById("exercise").value;
  const reps = document.getElementById("reps").value;
  
  db.collection("workouts").add({
    exercise: exercise,
    reps: reps,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Workout saved!");
    loadWorkouts();
  });
});


function loadWorkouts() {
  db.collection("workouts")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      let html = "";
      snapshot.forEach((doc) => {
        html += `
          <div class="p-2 border-bottom">
            <strong>${doc.data().exercise}</strong>: ${doc.data().reps} reps
          </div>
        `;
      });
      document.getElementById("workouts-list").innerHTML = html;
    });
}

document.getElementById("login-btn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "index.html")
    .catch((error) => alert(error.message));
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
  auth.signOut().then(() => window.location.href = "login.html");
});

auth.onAuthStateChanged((user) => {
  if (!user && window.location.pathname !== "/login.html") {
    window.location.href = "login.html";
  }
});
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBq30WASNqZkOpz3cCR9_IeR1y9PHwGbrM",
    authDomain: "fitsquad-bce50.firebaseapp.com",
    databaseURL: "https://fitsquad-bce50-default-rtdb.firebaseio.com",
    projectId: "fitsquad-bce50",
    storageBucket: "fitsquad-bce50.firebasestorage.app",
    messagingSenderId: "602575671919",
    appId: "1:602575671919:web:cf79a9e165321041e4b39a",
    measurementId: "G-70M11S5CZC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
