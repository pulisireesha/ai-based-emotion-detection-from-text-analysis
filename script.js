```javascript
// ======================================
// AI EMOTION DETECTION
// Text + Voice
// ======================================


// Emotion keywords

const emotions = {

    happy: [
        "happy",
        "joy",
        "joyful",
        "excited",
        "excellent",
        "amazing",
        "great",
        "good",
        "love",
        "lovely",
        "wonderful",
        "fantastic",
        "awesome",
        "smile",
        "laugh",
        "fun",
        "enjoy",
        "enjoyed"
    ],

    sad: [
        "sad",
        "unhappy",
        "cry",
        "crying",
        "lonely",
        "alone",
        "depressed",
        "upset",
        "hurt",
        "pain",
        "miss",
        "missing",
        "loss",
        "lost",
        "disappointed"
    ],

    angry: [
        "angry",
        "anger",
        "mad",
        "hate",
        "hateful",
        "furious",
        "annoyed",
        "annoying",
        "frustrated",
        "frustration",
        "irritated",
        "irritating",
        "fight",
        "rage"
    ],

    fear: [
        "afraid",
        "fear",
        "scared",
        "scary",
        "worried",
        "worry",
        "nervous",
        "danger",
        "dangerous",
        "panic",
        "terrified",
        "terror"
    ]
};


// ======================================
// TEXT ANALYSIS
// ======================================

function analyzeText() {

    let text = document
        .getElementById("textInput")
        .value
        .toLowerCase()
        .trim();

    if (text === "") {

        alert("Please enter some text.");

        return;
    }

    detectEmotion(text);
}


// ======================================
// EMOTION DETECTION
// ======================================

function detectEmotion(text) {

    let scores = {
        happy: 0,
        sad: 0,
        angry: 0,
        fear: 0
    };

    let words = text.split(/\s+/);

    words.forEach(function(word) {

        // Remove punctuation

        word = word.replace(/[.,!?;:]/g, "");

        // Check emotions

        if (emotions.happy.includes(word)) {
            scores.happy++;
        }

        if (emotions.sad.includes(word)) {
            scores.sad++;
        }

        if (emotions.angry.includes(word)) {
            scores.angry++;
        }

        if (emotions.fear.includes(word)) {
            scores.fear++;
        }

    });


    // Find highest score

    let highestEmotion = "neutral";
    let highestScore = 0;

    for (let emotion in scores) {

        if (scores[emotion] > highestScore) {

            highestScore = scores[emotion];

            highestEmotion = emotion;
        }
    }


    // Calculate confidence

    let confidence;

    if (highestScore === 0) {

        confidence = 50;

    } else {

        confidence = Math.min(
            95,
            60 + highestScore * 10
        );
    }


    showResult(
        highestEmotion,
        confidence
    );
}


// ======================================
// DISPLAY RESULT
// ======================================

function showResult(emotion, confidence) {

    let icon = document.getElementById("emotionIcon");

    let result = document.getElementById("emotionResult");

    let message = document.getElementById("emotionMessage");

    let confidenceText =
        document.getElementById("confidence");

    let confidenceBar =
        document.getElementById("confidenceBar");


    if (emotion === "happy") {

        icon.innerHTML = "😊";

        result.innerHTML = "Happy";

        message.innerHTML =
            "The text indicates a positive and happy emotion.";

    }

    else if (emotion === "sad") {

        icon.innerHTML = "😢";

        result.innerHTML = "Sad";

        message.innerHTML =
            "The text indicates sadness or disappointment.";

    }

    else if (emotion === "angry") {

        icon.innerHTML = "😡";

        result.innerHTML = "Angry";

        message.innerHTML =
            "The text indicates anger or frustration.";

    }

    else if (emotion === "fear") {

        icon.innerHTML = "😨";

        result.innerHTML = "Fear";

        message.innerHTML =
            "The text indicates fear, worry, or nervousness.";

    }

    else {

        icon.innerHTML = "😐";

        result.innerHTML = "Neutral";

        message.innerHTML =
            "The text does not show a strong emotional signal.";

    }


    // Update confidence

    confidenceText.innerHTML =
        confidence + "%";

    confidenceBar.style.width =
        confidence + "%";
}


// ======================================
// VOICE RECOGNITION
// ======================================

function startVoiceRecognition() {

    // Check browser support

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome."
        );

        return;
    }


    let recognition =
        new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;


    let voiceStatus =
        document.getElementById("voiceStatus");

    let voiceText =
        document.getElementById("voiceText");


    voiceStatus.innerHTML =
        "🎤 Listening... Please speak";


    recognition.start();


    // When speech is detected

    recognition.onresult = function(event) {

        let speech =
            event.results[0][0].transcript;


        voiceText.innerHTML =
            "You said: " + speech;


        // Put speech into textarea

        document.getElementById("textInput").value =
            speech;


        // Analyze speech

        detectEmotion(speech);


        voiceStatus.innerHTML =
            "Voice analysis completed.";

    };


    // Error

    recognition.onerror = function(event) {

        voiceStatus.innerHTML =
            "Unable to recognize voice.";

        console.log(event.error);

    };


    // End

    recognition.onend = function() {

        if (voiceStatus.innerHTML.includes("Listening")) {

            voiceStatus.innerHTML =
                "Voice recognition stopped.";

        }

    };

}


// ======================================
// EXAMPLE BUTTONS
// ======================================

function useExample(text) {

    document.getElementById("textInput").value =
        text;

    analyzeText();

}


// ======================================
// CLEAR
// ======================================

function clearText() {

    document.getElementById("textInput").value = "";

    document.getElementById("voiceText").innerHTML = "";

    document.getElementById("voiceStatus").innerHTML =
        "Click the button and speak";

    document.getElementById("emotionIcon").innerHTML =
        "😊";

    document.getElementById("emotionResult").innerHTML =
        "Your emotion will appear here";

    document.getElementById("emotionMessage").innerHTML =
        "Enter text or use your voice to detect emotion.";

    document.getElementById("confidence").innerHTML =
        "0%";

    document.getElementById("confidenceBar").style.width =
        "0%";
}
```
