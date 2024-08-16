
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVjodIM72XO5LIqiQEJH-SSYHyyA4Jom8",
    authDomain: "cict-hub.firebaseapp.com",
    projectId: "cict-hub",
    storageBucket: "cict-hub.appspot.com",
    messagingSenderId: "324224152216",
    appId: "1:324224152216:web:b6764c63cd02e941af16ed",
    measurementId: "G-X3JCXCRHZ8"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);


// References
const addRoomForm = document.getElementById('add-room-form');
const roomList = document.getElementById('room-list');

// Add a new room
addRoomForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const roomName = document.getElementById('room-name').value;

  try {
    await db.collection('rooms').add({
      name: roomName
    });
    addRoomForm.reset();
  } catch (error) {
    console.error("Error adding room: ", error);
  }
});

// Real-time listener
db.collection('rooms').onSnapshot(snapshot => {
  roomList.innerHTML = '';
  snapshot.forEach(doc => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;
    roomList.appendChild(li);
  });
});
