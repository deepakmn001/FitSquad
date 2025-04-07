
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
