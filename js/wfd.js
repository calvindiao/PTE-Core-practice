// Question bank - includes audio paths and correct answers
const wfdQuestions = [
    {
        id: 1,
        audioSrc: "/assets/WFD material/Please get us a meeting room for the next hour.mp3"
    },
    {
        id: 2,
        audioSrc: "/assets/WFD material/Communication skills have become more important in recent years.mp3"
    },
    {
        id: 3,
        audioSrc: "/assets/WFD material/Before preparing any food, be sure to wash your hands well.mp3"
    },
    {
        id: 4,
        audioSrc: "/assets/WFD material/I want to make an appointment with the manager.mp3"
    },
    {
        id: 5,
        audioSrc: "/assets/WFD material/The weather has been lovely this time of the year.mp3"
    },
    {
        id: 6,
        audioSrc: "/assets/WFD material/Please close the door behind you when you leave the room.mp3"
    },
    {
        id: 7,
        audioSrc: "/assets/WFD material/There was a lot of traffic this morning.mp3"
    },
    {
        id: 8,
        audioSrc: "/assets/WFD material/The restroom is down the hall and on the right.mp3"
    },
    {
        id: 9,
        audioSrc: "/assets/WFD material/The teacher explains the homework to the students.mp3"
    },
    {
        id: 10,
        audioSrc: "/assets/WFD material/At that time, few people moved through the town to the village.mp3"
    },
    {
        id: 11,
        audioSrc: "/assets/WFD material/The fiction books have just passed to the counter.mp3"
    },
    {
        id: 12,
        audioSrc: "/assets/WFD material/You have to make an appointment with your doctor.mp3"
    },
    {
        id: 13,
        audioSrc: "/assets/WFD material/The students will meet their new teacher after summer vacation.mp3"
    },
    {
        id: 14,
        audioSrc: "/assets/WFD material/Please move us to the meeting room for the next hour.mp3"
    },
    {
        id: 15,
        audioSrc: "/assets/WFD material/You must call your doctor to make an appointment.mp3"
    },
    {
        id: 16,
        audioSrc: "/assets/WFD material/Please make an appointment with your tutor about work.mp3"
    },
    {
        id: 17,
        audioSrc: "/assets/WFD material/Rail transport is becoming more and more popular.mp3"
    },
    {
        id: 18,
        audioSrc: "/assets/WFD material/You can keep your bags in the back room.mp3"
    },
    {
        id: 19,
        audioSrc: "/assets/WFD material/The weather used to be lovely at this time of the year.mp3"
    },
    {
        id: 20,
        audioSrc: "/assets/WFD material/Everyone in this room needs to follow the rules.mp3"
    },
    {
        id: 21,
        audioSrc: "/assets/WFD material/Before preparing food, please make sure to wash your hands.mp3"
    },
    {
        id: 22,
        audioSrc: "/assets/WFD material/The teacher explained the homework to the class.mp3"
    },
    {
        id: 23,
        audioSrc: "/assets/WFD material/You should meet me in the lecture theater room.mp3"
    },
    {
        id: 24,
        audioSrc: "/assets/WFD material/At that time, few people moved from towns to villages.mp3"
    },
    {
        id: 25,
        audioSrc: "/assets/WFD material/Students of the first year usually live on campus.mp3"
    },
    {
        id: 26,
        audioSrc: "/assets/WFD material/The fiction books are just past the counter.mp3"
    },
    {
        id: 27,
        audioSrc: "/assets/WFD material/The teacher asked the group to complete the task.mp3"
    },
    {
        id: 28,
        audioSrc: "/assets/WFD material/There were a lot of traffic jams on the road this morning.mp3"
    },
    {
        id: 29,
        audioSrc: "/assets/WFD material/The school canteen sells a large variety of water and food.mp3"
    },
    {
        id: 30,
        audioSrc: "/assets/WFD material/Please turn off the lights to save the energy.mp3"
    },
    {
        id: 31,
        audioSrc: "/assets/WFD material/Traffic is the main cause of air pollution in many cities.mp3"
    },
    {
        id: 32,
        audioSrc: "/assets/WFD material/You will get your uniform on the first day.mp3"
    },
    {
        id: 33,
        audioSrc: "/assets/WFD material/We should have a meeting to discuss and report.mp3"
    },
    {
        id: 34,
        audioSrc: "/assets/WFD material/Sales figures for last year were better than expected.mp3"
    },
    {
        id: 35,
        audioSrc: "/assets/WFD material/The university canteen offers different healthy meal options.mp3"
    },
    {
        id: 36,
        audioSrc: "/assets/WFD material/Employment opportunities available in engineering are increasing rapidly.mp3"
    },
    {
        id: 37,
        audioSrc: "/assets/WFD material/We cannot consider an increase in price at this stage.mp3"
    },
    {
        id: 38,
        audioSrc: "/assets/WFD material/We should have a meeting to discuss the report.mp3"
    },
    {
        id: 39,
        audioSrc: "/assets/WFD material/Our culture influences the choices we make.mp3"
    },
    {
        id: 40,
        audioSrc: "/assets/WFD material/Exam results will be published on the noticeboard.mp3"
    },
    {
        id: 41,
        audioSrc: "/assets/WFD material/Atoms are the central building blocks of matter.mp3"
    },
    {
        id: 42,
        audioSrc: "/assets/WFD material/There will be a meeting for the first-year students on Friday.mp3"
    },
    {
        id: 43,
        audioSrc: "/assets/WFD material/The stairs are to the left of the elevator.mp3"
    },
    {
        id: 44,
        audioSrc: "/assets/WFD material/Restrooms are down the entrance and to the right.mp3"
    },
    {
        id: 45,
        audioSrc: "/assets/WFD material/Time is needed to complete the lecture.mp3"
    },
    {
        id: 46,
        audioSrc: "/assets/WFD material/Restaurants are down to the hall and next to the right.mp3"
    },
    {
        id: 47,
        audioSrc: "/assets/WFD material/Make sure you wash your hands before preparing the food.mp3"
    },
    {
        id: 48,
        audioSrc: "/assets/WFD material/You should draw your graph on a separate page.mp3"
    },
    {
        id: 49,
        audioSrc: "/assets/WFD material/You can ask your tutor for further assistance.mp3"
    },
    {
        id: 50,
        audioSrc: "/assets/WFD material/You are trained to be a special journalist.mp3"
    },
    {
        id: 51,
        audioSrc: "/assets/WFD material/We can have a lecture on the morning of Thursday.mp3"
    },
    {
        id: 52,
        audioSrc: "/assets/WFD material/We can all meet in the office after the lecture.mp3"
    },
    {
        id: 53,
        audioSrc: "/assets/WFD material/The digital revolution has changed the way we read.mp3"
    },
    {
        id: 54,
        audioSrc: "/assets/WFD material/Before the refrigerator was invented, people used underground icehouses.mp3"
    },
    {
        id: 55,
        audioSrc: "/assets/WFD material/The nation achieved prosperity by opening its ports for trade.mp3"
    },
    {
        id: 56,
        audioSrc: "/assets/WFD material/Understanding visual media has never been more challenging.mp3"
    },
    {
        id: 57,
        audioSrc: "/assets/WFD material/Online courses allow students to work on their own paces.mp3"
    },
    {
        id: 58,
        audioSrc: "/assets/WFD material/In my opinion, this car should be repaired soon.mp3"
    },
    {
        id: 59,
        audioSrc: "/assets/WFD material/You can get your coffee and tea in the lounge room.mp3"
    },
    {
        id: 60,
        audioSrc: "/assets/WFD material/The teacher asked the group to commence the task.mp3"
    },
    {
        id: 61,
        audioSrc: "/assets/WFD material/The island is located at the south end of the bay.mp3"
    },
    {
        id: 62,
        audioSrc: "/assets/WFD material/Please click the logo above to enter the site.mp3"
    },
    {
        id: 63,
        audioSrc: "/assets/WFD material/The camera can identify eyes and focus on them.mp3"
    },
    {
        id: 64,
        audioSrc: "/assets/WFD material/This article refers to a number of interesting experiments.mp3"
    },
    {
        id: 65,
        audioSrc: "/assets/WFD material/You should submit your team papers to the general office.mp3"
    },
    {
        id: 66,
        audioSrc: "/assets/WFD material/All students have their own styles of learning.mp3"
    },
    {
        id: 67,
        audioSrc: "/assets/WFD material/Stock prediction can be very capricious even for professionals.mp3"
    },
    {
        id: 68,
        audioSrc: "/assets/WFD material/New classrooms will be put into use next month.mp3"
    },
    {
        id: 69,
        audioSrc: "/assets/WFD material/You need to pass the written exam for the driver's license.mp3"
    },
    {
        id: 70,
        audioSrc: "/assets/WFD material/There will be a guest lecturer in the next class.mp3"
    },
    {
        id: 71,
        audioSrc: "/assets/WFD material/The falling birth rate means the number of students drops.mp3"
    },
    {
        id: 72,
        audioSrc: "/assets/WFD material/In my opinion, this car should be repaired soon..mp3"
    }
];

// Function to extract answer from audio path
function extractAnswerFromPath(audioPath) {
    // Extract the filename without extension from the path
    const filename = audioPath.split('/').pop(); // Get the last part after the slash
    const answerText = filename.replace('.mp3', '.'); // Remove the extension
    return answerText;
}

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
    // if (appState.isReviewMode) {
    //     const originalIndex = wfdQuestions.findIndex(q => q.id === question.id);
    //     answerInput.value = appState.userAnswers[originalIndex] || '';
    // } else {
    //     answerInput.value = appState.userAnswers[index] || '';
    // }
    answerInput.value = '';
    // Update question counter
    questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
    
    // Clear feedback
    feedbackDisplay.innerHTML = '';
    
    // Reset score display
    scoreDisplay.textContent = 'Score: 0/0';
    
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
        wrongCollectionButton.textContent = 'Mistake notebook';
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
    
    // Get correct answer from audio path
    const correctAnswer = extractAnswerFromPath(question.audioSrc);
    
    // Calculate score and display feedback
    const result = displayFeedback(userAnswer, correctAnswer);
    
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