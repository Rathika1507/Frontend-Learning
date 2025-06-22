function calculateTotal() {
  const items = [
    { id: 'muruku', name: 'Muruku', price: 5 },
    { id: 'thattai', name: 'Thattai', price: 5 },
    { id: 'athirasam', name: 'Athirasam', price: 6 },
    { id: 'ravaLadoo', name: 'Rava Ladoo', price: 10 },
    { id: 'somasu', name: 'Somasu', price: 10 },
    { id: 'porulvilangaiUrundai', name: 'Porulvilangai Urundai', price: 10 },
    { id: 'conePorulvilangaiUrundai', name: 'Cone Porulvilangai Urundai', price: 200 },
    { id: 'omapodi', name: 'Omapodi', price: 50 }
  ];

  let total = 0;
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = '';

  items.forEach(item => {
    const qty = parseInt(document.getElementById(item.id)?.value || 0);
    if (qty > 0) {
      const itemTotal = qty * item.price;
      total += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td style="text-align: center;">₹${item.price}</td>
        <td style="text-align: center;">${qty}</td>
        <td style="text-align: right;">₹${itemTotal}</td>
      `;
      orderList.appendChild(row);
    }
  });

  document.getElementById('total').textContent = "Total: ₹" + total;
  document.getElementById('finalTotal').textContent = "Final Total: ₹" + total;

  if (total === 0) {
    alert("Please select at least one snack before proceeding.");
    document.getElementById('orderSummary').style.display = 'none';
    return;
  }

  document.getElementById('orderSummary').style.display = 'block';
}

function submitOrder() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const deliveryTime = document.getElementById('deliveryTime').value;

  if (name === '') {
    alert("Please fill in your Name.");
    document.getElementById('customerName').focus();
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit Phone Number.");
    document.getElementById('customerPhone').focus();
    return;
  }

  if (address === '') {
    alert("Please fill in your Address.");
    document.getElementById('customerAddress').focus();
    return;
  }

  if (!deliveryTime) {
    alert("Please select your preferred delivery time.");
    document.getElementById('deliveryTime').focus();
    return;
  }

  calculateTotal(); // Ensure total is recalculated

  // Show customer info
  const customerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Delivery Time:</strong> ${new Date(deliveryTime).toLocaleString()}</p>
  `;
  document.getElementById('customerInfo').innerHTML = customerHTML;

  // Show popup and speak
  document.getElementById('thankYouPopup').style.display = 'block';
  speakThankYou();

  // Optional: Hide popup after seconds
  setTimeout(() => {
    document.getElementById('thankYouPopup').style.display = 'none';
  }, 10000);

  // Enable print button
  document.getElementById('printBtn').disabled = false;

  // Ensure summary is shown
  document.getElementById('orderSummary').style.display = 'block';
}

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}


// Speak welcome message in English and Tamil
function speakText() {
  const englishMessage = "Welcome to Selvi Snacks Corner";
  const tamilMessage = "செல்வி ஸ்நாக்ஸ் கார்னரை வரவேற்கிறோம்.";

  const enUtterance = new SpeechSynthesisUtterance(englishMessage);
  const taUtterance = new SpeechSynthesisUtterance(tamilMessage);

  enUtterance.voice = getFemaleVoice('en-IN');
  enUtterance.lang = 'en-IN';
  enUtterance.pitch = 1.1;
  enUtterance.rate = 1;

  taUtterance.voice = getFemaleVoice('ta-IN');
  taUtterance.lang = 'ta-IN';
  taUtterance.pitch = 1.1;
  taUtterance.rate = 1;

  speechSynthesis.speak(enUtterance);
  enUtterance.onend = () => {
    speechSynthesis.speak(taUtterance);
  };
}

// Speak thank you message
function speakThankYou() {
  const englishMessage = "Thank you for your order from Selvi Snacks Corner.";
  const tamilMessage = "உங்கள் ஆர்டருக்கு நன்றி. செல்வி ஸ்நாக்ஸ் கார்னரை ஆதரித்ததற்கு நன்றி!";

  const enUtterance = new SpeechSynthesisUtterance(englishMessage);
  const taUtterance = new SpeechSynthesisUtterance(tamilMessage);

  enUtterance.voice = getFemaleVoice('en-IN');
  enUtterance.lang = 'en-IN';
  enUtterance.pitch = 1.1;
  enUtterance.rate = 1;

  taUtterance.voice = getFemaleVoice('ta-IN');
  taUtterance.lang = 'ta-IN';
  taUtterance.pitch = 1.1;
  taUtterance.rate = 1;

  speechSynthesis.speak(enUtterance);
  enUtterance.onend = () => {
    speechSynthesis.speak(taUtterance);
  };
}

// Voice selection logic
function getFemaleVoice(langCode) {
  const voices = speechSynthesis.getVoices();

  // Try to find a female voice by name or keyword
  let femaleVoice = voices.find(voice =>
    voice.lang === langCode &&
    /female|lekha|padma|hema|sangeeta|karen|zira/i.test(voice.name)
  );

  if (!femaleVoice) {
    femaleVoice = voices.find(voice => voice.lang === langCode);
  }

  return femaleVoice || null;
}

// Load voices initially
window.speechSynthesis.onvoiceschanged = () => {
  getFemaleVoice('en-IN');
  getFemaleVoice('ta-IN');
};

// Optional: Log available voices in browser
speechSynthesis.getVoices().forEach(v => console.log(v.name, v.lang));
