import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX",
  databaseURL: "XXXX",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX",
  measurementId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const doluYeriSayisiElement = document.getElementById("dolu-yeri-sayisi");
const parkYerleriElement = document.getElementById("park-yerleri");

// Verileri Firebase'den çek
const doluParkRef = ref(database, "DoluParkYeriSayisi");
const parkYerleriRef = ref(database, "ParkYerleri");

onValue(doluParkRef, (snapshot) => {
  const doluYeriSayisi = snapshot.val();
  doluYeriSayisiElement.textContent = doluYeriSayisi;
});

onValue(parkYerleriRef, (snapshot) => {
  const parkYerleri = snapshot.val();
  parkYerleriElement.innerHTML = ""; // Temizle
  Object.keys(parkYerleri).forEach((park) => {
    const durum = parkYerleri[park];
    const parkDiv = document.createElement("div");
    parkDiv.className = `park ${durum ? "dolu" : "bos"}`;
    parkDiv.innerHTML = `
      <h3>${park}</h3>
      <span>${durum ? "Dolu" : "Boş"}</span>
    `;
    parkYerleriElement.appendChild(parkDiv);
  });
});
