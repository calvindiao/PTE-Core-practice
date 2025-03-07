// Question bank - includes audio paths and correct answers
const wfdQuestions = [
    {
        id: 1,
        audioSrc: "/assets/WFD material/Please get us a meeting room for the next hour.mp3",
        answer: "Please get us a meeting room for the next hour."
    },
    {
        id: 2,
        audioSrc: "/assets/WFD material/Communication skills have become more important in recent years.mp3",
        answer: "Communication skills have become more important in recent years."
    }
    // Add more questions as needed
];

// App state
const appState = {
    currentQuestionIndex: 0,
    hasPlayed: false,
    userAnswers: [],
    wrongQuestions: [],
    isReviewMode: false,
    reviewIndex: 0
};

// DOM elements
let audioPlayer;
let playButton;
let answerInput;
let submitButton;
let prevButton;
let nextButton;
let wrongCollectionButton;
let questionCounter;
let scoreDisplay;
let feedbackDisplay;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    audioPlayer = document.getElementById('audio-player');
    playButton = document.getElementById('play-button');
    answerInput = document.getElementById('answer-input');
    submitButton = document.getElementById('submit-button');
    prevButton = document.getElementById('prev-button');
    nextButton = document.getElementById('next-button');
    wrongCollectionButton = document.getElementById('wrong-collection-button');
    questionCounter = document.getElementById('question-counter');
    scoreDisplay = document.getElementById('score-display');
    feedbackDisplay = document.getElementById('feedback-display');

    // Initialize user answers array
    wfdQuestions.forEach(() => appState.userAnswers.push(''));

    // Set up event listeners
    setupEventListeners();
    
    // Load first question
    loadQuestion(0);
});

// Set up event listeners
function setupEventListeners() {
    // Play button
    playButton.addEventListener('click', () => {
        if (!appState.hasPlayed) {
            audioPlayer.play();
            appState.hasPlayed = true;
            playButton.disabled = true;
            // Change button style to indicate played state
            playButton.classList.add('played');
        }
    });

    // Audio playback complete
    audioPlayer.addEventListener('ended', () => {
        answerInput.focus();
    });

    // Submit button
    submitButton.addEventListener('click', handleSubmit);

    // Previous button
    prevButton.addEventListener('click', () => {
        navigateQuestion(-1);
    });

    // Next button
    nextButton.addEventListener('click', () => {
        navigateQuestion(1);
    });

    // Wrong collection button
    wrongCollectionButton.addEventListener('click', () => {
        toggleReviewMode();
    });

    // Enter key submission
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });
}

// Load question
function loadQuestion(index) {
    let questions = appState.isReviewMode ? appState.wrongQuestions : wfdQuestions;
    
    if (questions.length === 0 && appState.isReviewMode) {
        // Empty wrong collection
        feedbackDisplay.innerHTML = `<div class="success-message">Congratulations! You have completed reviewing all incorrect questions.</div>`;
        disableInterface(true);
        return;
    }

    if (index < 0) index = 0;
    if (index >= questions.length) index = questions.length - 1;

    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    
    // Update current question index
    if (appState.isReviewMode) {
        appState.reviewIndex = index;
    } else {
        appState.currentQuestionIndex = index;
    }

    const question = questions[index];
    
    // Reset state
    appState.hasPlayed = false;
    playButton.disabled = false;
    playButton.classList.remove('played');
    
    // Set audio source
    audioPlayer.src = question.audioSrc;
    
    // Show previous answer if available
    if (appState.isReviewMode) {
        const originalIndex = wfdQuestions.findIndex(q => q.id === question.id);
        answerInput.value = appState.userAnswers[originalIndex] || '';
    } else {
        answerInput.value = appState.userAnswers[index] || '';
    }

    // Update question counter
    questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
    
    // Clear feedback
    feedbackDisplay.innerHTML = '';
    
    // Update button states
    updateNavigationButtons();
}

// Update navigation button states
function updateNavigationButtons() {
    const questions = appState.isReviewMode ? appState.wrongQuestions : wfdQuestions;
    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === questions.length - 1;
    
    // Update wrong collection button
    if (appState.isReviewMode) {
        wrongCollectionButton.textContent = 'Return to All Questions';
        wrongCollectionButton.classList.add('active');
    } else {
        wrongCollectionButton.textContent = 'Wrong Collection';
        wrongCollectionButton.classList.remove('active');
        wrongCollectionButton.disabled = appState.wrongQuestions.length === 0;
    }
}

// Navigate between questions
function navigateQuestion(direction) {
    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    loadQuestion(currentIndex + direction);
}

// Handle answer submission
function handleSubmit() {
    const questions = appState.isReviewMode ? appState.wrongQuestions : wfdQuestions;
    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    const question = questions[currentIndex];
    
    const userAnswer = answerInput.value.trim();
    
    // Find original index if in review mode
    let originalIndex = currentIndex;
    if (appState.isReviewMode) {
        originalIndex = wfdQuestions.findIndex(q => q.id === question.id);
    }
    
    // Save user answer
    appState.userAnswers[originalIndex] = userAnswer;
    
    // Calculate score and display feedback
    const result = displayFeedback(userAnswer, question.answer);
    
    // Update wrong collection
    updateWrongQuestions(question, result);
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Score answer and display feedback
function displayFeedback(userAnswer, correctAnswer) {
    feedbackDisplay.innerHTML = '';
    let feedbackHtml = `<div class="feedback-message">`;
    
    // Scoring section
    const userWords = userAnswer.toLowerCase().match(/\b[\w']+\b/g) || [];
    
    // Lowercase correct words for comparison
    const correctWordsLower = correctAnswer.toLowerCase().match(/\b[\w']+\b/g) || [];
    
    // Count word frequency in user's answer
    const userWordFreq = {};
    userWords.forEach(word => {
        userWordFreq[word] = (userWordFreq[word] || 0) + 1;
    });
    
    // Calculate score and track word status
    let score = 0;
    const wordStatus = [];
    
    // Check each correct word
    correctWordsLower.forEach((word, index) => {
        // Check if word is available in user answer
        if (userWordFreq[word] && userWordFreq[word] > 0) {
            score++;
            userWordFreq[word]--;  // Decrease available count
            wordStatus[index] = true;  // Mark as matched
        } else {
            wordStatus[index] = false;  // Mark as unmatched
        }
    });
    
    // Update score display
    scoreDisplay.textContent = `Score: ${score}/${correctWordsLower.length}`;
    
    // Feedback display section
    if (score === correctWordsLower.length) {
        // All correct
        feedbackHtml += `<div class="success-message">Great job! You got all the words correct.</div>`;
    } else {
        // Partially correct or all wrong
        feedbackHtml += `<p>You scored ${score}/${correctWordsLower.length} points.</p>`;
    }
    
    // Display correct answer
    feedbackHtml += `<p>Correct answer: `;
    
    // Preserve original formatting when displaying
    const wordRegex = /\b[\w']+\b/g;
    let lastIndex = 0;
    let match;
    let wordCounter = 0;
    
    let formattedAnswer = '';
    
    // Process each word in original answer
    while ((match = wordRegex.exec(correctAnswer)) !== null) {
        // Add any punctuation or spaces before the word
        if (match.index > lastIndex) {
            formattedAnswer += correctAnswer.substring(lastIndex, match.index);
        }
        
        // Add word with appropriate highlighting
        if (!wordStatus[wordCounter]) {
            formattedAnswer += `<span class="missing-words">${match[0]}</span>`;
        } else {
            formattedAnswer += `<span class="correct-answer">${match[0]}</span>`;
        }
        
        // Update position trackers
        lastIndex = match.index + match[0].length;
        wordCounter++;
    }
    
    // Add any punctuation after the last word
    if (lastIndex < correctAnswer.length) {
        formattedAnswer += correctAnswer.substring(lastIndex);
    }
    
    feedbackHtml += formattedAnswer;
    feedbackHtml += `</p></div>`;
    feedbackDisplay.innerHTML = feedbackHtml;
    
    // Return results for wrong collection update
    return {
        score,
        totalWords: correctWordsLower.length,
        userWords,
        correctWordsLower
    };
}

// Update wrong collection
function updateWrongQuestions(question, result) {
    const questionId = question.id;
    
    // Use passed results
    const score = result.score;
    const totalWords = result.totalWords;
    
    // Add to wrong collection if not perfect score
    if (score < totalWords) {
        // Check if already in wrong collection
        const existingIndex = appState.wrongQuestions.findIndex(q => q.id === questionId);
        
        if (existingIndex === -1) {
            // Add to wrong collection
            appState.wrongQuestions.push(question);
        }
    } else {
        // Remove from wrong collection if perfect score
        const existingIndex = appState.wrongQuestions.findIndex(q => q.id === questionId);
        
        if (existingIndex !== -1) {
            // Remove from wrong collection
            appState.wrongQuestions.splice(existingIndex, 1);
        }
        
        // Return to normal mode if review mode and collection empty
        if (appState.isReviewMode && appState.wrongQuestions.length === 0) {
            toggleReviewMode();
        }
    }
}

// Toggle review mode
function toggleReviewMode() {
    if (appState.isReviewMode) {
        // Switch from review mode to normal mode
        appState.isReviewMode = false;
        loadQuestion(appState.currentQuestionIndex);
    } else {
        // Switch from normal mode to review mode
        if (appState.wrongQuestions.length > 0) {
            appState.isReviewMode = true;
            appState.reviewIndex = 0;
            loadQuestion(0);
        } else {
            // No wrong questions to review
            feedbackDisplay.innerHTML = `<div class="info-message">You currently have no incorrect questions to review.</div>`;
        }
    }
}

// Enable/disable interface
function disableInterface(disabled) {
    playButton.disabled = disabled;
    answerInput.disabled = disabled;
    submitButton.disabled = disabled;
    prevButton.disabled = disabled;
    nextButton.disabled = disabled;
} 