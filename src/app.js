// Select our elements
const msgElement = document.getElementById('msg')
const containerElement = document.getElementById('container')
const languageElement = document.getElementById('lang')

// Generate our random # from 1 to 100
const generateRandomNumber = () => {
	return Math.ceil(Math.random() * 100)
}

// Save the random # into a variable
const randomNumber = generateRandomNumber()

// Save the speech recognition obj in window
window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition

// Initialize the speech recognition
let recognition = new window.SpeechRecognition()

// Start the speech recognition
recognition.start()

// Set the default recognition language, if not declared defaults to en-US
recognition.lang = 'es-ES'
// recognition.lang = 'en-US'
// recognition.lang = 'es-ES'
// recognition.lang = 'zh-CH'

const changeLanguage = (lang) => {
	recognition.lang = lang
	msgElement.innerHTML = ''
}

// Display the message to the screen
const displayMessage = (msg) => {
	let formattedMsg = ''
	if (msg === '10:00') {
		formattedMsg = 10
	} else if (msg === '12:00') {
		formattedMsg = 12
	} else {
		formattedMsg = msg
	}

	msgElement.innerHTML = `
    <p>You said:</p> 
    <span class="number">${formattedMsg}</span>
  `
}

// Check the message for ##
const checkMessage = (msg) => {
	const number = parseInt(msg)

	// Check if a valid #
	if (Number.isNaN(number)) {
		msgElement.innerHTML += `
      <p>Not a valid number!</p> 
    `
		return false
	}

	// Check if in range
	if (number > 100 || number < -1) {
		msgElement.innerHTML = `
      <p>Number must be between 1 and 100!</p> 
    `
		return false
	}

	// Check #
	if (number === randomNumber) {
		containerElement.innerHTML = `
			<h2>WELL DONE! <br> You have guessed the number!
			<br><br><br>
			It was <span class="right-number">${number}</span>!</h2>
			<button class="restart" id="restart">Play again</button>
		`
	} else if (number > randomNumber) {
		msgElement.innerHTML += `
		  <p>Go lower!</p>
		`
	} else {
		msgElement.innerHTML += `
		  <p>Go higher!</p>
		`
	}
}

// Capture the voice
const onSpeak = (e) => {
	const msg = e.results[0][0].transcript
	displayMessage(msg)
	checkMessage(msg)
}

// Event listener for recognition
recognition.addEventListener('result', onSpeak)

// Event listener when recognition ends
recognition.addEventListener('end', () => {
	recognition.start()
})

// Event listener to change language
languageElement.addEventListener('change', (e) => {
	changeLanguage(e.target.value)
	console.log(recognition.lang)
})

// Event listener to restart game
document.body.addEventListener('click', (e) => {
	e.target.id == 'restart' ? window.location.reload() : null
})
