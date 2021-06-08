const overlay = document.getElementById('overlay')
const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("textarea");
const toggleTextBtn = document.getElementById("toggle-textbox");
const textbox = document.getElementById("text-box-container");
const readBtn = document.getElementById("read-text");
const closeBtn = document.getElementById("close-btn");

const data = [
  {
    image: "./img/thirsty.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/foodjpg.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandma's",
  },
];

data.forEach(createBox);

//Functions
function toggleTextbox() {
  if (textbox.classList.contains("show")) {
    textbox.classList.remove("show");
    overlay.style.display = 'none'
  } else {
    textbox.classList.add("show");
    overlay.style.display = 'flex'
  }
}

function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("img-container");
  box.innerHTML = `
          <img src="${image}" alt="${text}">
          <h3>${text}</h3>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    //Add active effect
    box.classList.add('active')
    setTimeout(() => {
      box.classList.remove('active')
    }, 800)
  })

  main.appendChild(box);
}

//Init speech synth
const message = new SpeechSynthesisUtterance

//Store voices
let voices = []

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option')

    option.value = voice.name
    option.innerText = `${voice.name.replace('Microsoft', '').replace('Online', '')} ${voice.lang}`

    voicesSelect.appendChild(option)
  })
}

//Set text
function setTextMessage(text) {
  message.text = text;
}

//Speak text
function speakText() {
  speechSynthesis.speak(message)
}

//Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value)
}

//Event Listeners

//Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

//Toggle text box
toggleTextBtn.addEventListener("click", toggleTextbox);

//Close button
closeBtn.addEventListener("click", toggleTextbox);

//Change voice
voicesSelect.addEventListener('change', setVoice)

//Read text btn
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value)
  speakText()
})

getVoices()