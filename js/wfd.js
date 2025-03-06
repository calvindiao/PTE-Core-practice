// WFD题库 - 包含音频路径和正确答案
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
    // 后续可添加更多题目
];

// 应用状态
const appState = {
    currentQuestionIndex: 0,
    hasPlayed: false,
    wrongQuestions: [],
    isReviewMode: false,
    reviewIndex: 0,
    userAnswers: []
};

// DOM元素
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

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
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


    // 设置事件监听器
    setupEventListeners();
    
    // 加载第一个问题
    loadQuestion(0);
});

// 设置事件监听器
function setupEventListeners() {
    // 播放按钮
    playButton.addEventListener('click', () => {
        if (!appState.hasPlayed) {
            audioPlayer.play();
            appState.hasPlayed = true;
            playButton.disabled = true;
            // 变更按钮样式以表示已播放
            playButton.classList.add('played');
        }
    });

    // 音频播放完成事件
    audioPlayer.addEventListener('ended', () => {
        answerInput.focus();
    });

    // 提交按钮
    submitButton.addEventListener('click', handleSubmit);

    // 上一题按钮
    prevButton.addEventListener('click', () => {
        navigateQuestion(-1);
    });

    // 下一题按钮
    nextButton.addEventListener('click', () => {
        navigateQuestion(1);
    });

    // 错题集按钮
    wrongCollectionButton.addEventListener('click', () => {
        toggleReviewMode();
    });

    // 输入框回车提交
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });
}

// 加载问题
function loadQuestion(index) {
    let questions = appState.isReviewMode ? appState.wrongQuestions : wfdQuestions;
    
    if (questions.length === 0 && appState.isReviewMode) {
        // 错题集为空
        feedbackDisplay.innerHTML = `<div class="success-message">Congratulations! You have completed reviewing all incorrect questions.</div>`;
        disableInterface(true);
        return;
    }

    if (index < 0) index = 0;
    if (index >= questions.length) index = questions.length - 1;

    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    
    // 更新当前问题索引
    if (appState.isReviewMode) {
        appState.reviewIndex = index;
    } else {
        appState.currentQuestionIndex = index;
    }

    const question = questions[index];
    
    // 重置状态
    appState.hasPlayed = false;
    playButton.disabled = false;
    playButton.classList.remove('played');
    
    // 设置音频源
    audioPlayer.src = question.audioSrc;
    

    answerInput.value = '';
    // 更新问题计数器
    questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
    
    // 清除反馈
    feedbackDisplay.innerHTML = '';
    
    // 更新按钮状态
    updateNavigationButtons();
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const questions = appState.isReviewMode ? appState.wrongQuestions : wfdQuestions;
    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === questions.length - 1;
    
    // 更新错题集按钮状态
    if (appState.isReviewMode) {
        wrongCollectionButton.textContent = 'Return to All Questions';
        wrongCollectionButton.classList.add('active');
    } else {
        wrongCollectionButton.textContent = 'Wrong Collection';
        wrongCollectionButton.classList.remove('active');
        wrongCollectionButton.disabled = appState.wrongQuestions.length === 0;
    }
}

// 切换题目
function navigateQuestion(direction) {
    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    loadQuestion(currentIndex + direction);
}

// 处理提交答案
function handleSubmit() {
    const questions = appState.isReviewMode ? appState.wrongQuestions : wfdQuestions;
    const currentIndex = appState.isReviewMode ? appState.reviewIndex : appState.currentQuestionIndex;
    const question = questions[currentIndex];
    
    const userAnswer = answerInput.value.trim();
    
    // 如果在复习模式，找到原题索引
    let originalIndex = currentIndex;
    if (appState.isReviewMode) {
        originalIndex = wfdQuestions.findIndex(q => q.id === question.id);
    }
    
    // 保存用户答案
    appState.userAnswers[originalIndex] = userAnswer;
    
    // 计算得分并显示反馈，同时获取结果
    const result = displayFeedback(userAnswer, question.answer);
    
    // 更新错题集，传入计算好的得分结果
    updateWrongQuestions(question, result);
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// 合并的评分和反馈显示函数
function displayFeedback(userAnswer, correctAnswer) {
    feedbackDisplay.innerHTML = '';
    let feedbackHtml = `<div class="feedback-message">`;
    
    // 评分部分
    const userWords = userAnswer.toLowerCase().match(/\b[\w']+\b/g) || [];
    
    // 保存用于比较的小写正确单词
    const correctWordsLower = correctAnswer.toLowerCase().match(/\b[\w']+\b/g) || [];
    
    // 保存原始大小写的正确单词，用于显示
    const originalCaseWords = correctAnswer.match(/\b[\w']+\b/g) || [];
    
    // 计算用户单词频率
    const userWordFreq = {};
    userWords.forEach(word => {
        userWordFreq[word] = (userWordFreq[word] || 0) + 1;
    });
    
    // 计算得分和缺失单词
    let score = 0;
    const missingWords = [];
    const wordStatus = [];  // 记录每个单词的匹配状态
    
    // 检查每个正确单词是否出现在用户答案中
    correctWordsLower.forEach((word, index) => {
        // 检查用户答案中是否还有足够的这个单词
        if (userWordFreq[word] && userWordFreq[word] > 0) {
            score++;
            userWordFreq[word]--;  // 减少可用计数
            wordStatus[index] = true;  // 标记为匹配
        } else {
            missingWords.push(word);
            wordStatus[index] = false;  // 标记为未匹配
        }
    });
    
    // 更新分数显示
    scoreDisplay.textContent = `Score: ${score}/${correctWordsLower.length}`;
    
    // 反馈显示部分
    if (score === correctWordsLower.length) {
        // 全部正确
        feedbackHtml += `<div class="success-message">Great job! You got all the words correct.</div>`;
    } else {
        // 部分正确或全部错误
        feedbackHtml += `<p>You scored ${score}/${correctWordsLower.length} points.</p>`;
    }
    
    // 显示正确答案（不管用户答对多少，都显示）
    feedbackHtml += `<p>Correct answer: `;
    
    // 使用原始大小写单词显示结果
    originalCaseWords.forEach((word, index) => {
        // 使用之前保存的匹配状态来确定样式
        if (!wordStatus[index]) {
            feedbackHtml += `<span class="missing-words">${word}</span> `;
        } else {
            feedbackHtml += `<span class="correct-answer">${word}</span> `;
        }
    });

    feedbackHtml = feedbackHtml.trim() + `.</p></div>`;
    feedbackDisplay.innerHTML = feedbackHtml;
    
    // 返回评分结果供 updateWrongQuestions 使用
    return {
        score,
        totalWords: correctWordsLower.length,
        missingWords,
        userWords,
        correctWordsLower,
        originalCaseWords
    };
}

// 更新错题集
function updateWrongQuestions(question, result) {
    const questionId = question.id;
    
    // 直接使用传入的结果，避免重复计算
    const score = result.score;
    const totalWords = result.totalWords;
    
    // 如果得分不满分，加入错题集
    if (score < totalWords) {
        // 检查错题集中是否已经有这个问题
        const existingIndex = appState.wrongQuestions.findIndex(q => q.id === questionId);
        
        if (existingIndex === -1) {
            // 不在错题集中，添加
            appState.wrongQuestions.push(question);
        }
    } else {
        // 得满分了，从错题集中移除
        const existingIndex = appState.wrongQuestions.findIndex(q => q.id === questionId);
        
        if (existingIndex !== -1) {
            // 从错题集中移除
            appState.wrongQuestions.splice(existingIndex, 1);
        }
        
        // 如果在复习模式并且错题集为空，回到普通模式
        if (appState.isReviewMode && appState.wrongQuestions.length === 0) {
            toggleReviewMode();
        }
    }
}

// 切换复习模式
function toggleReviewMode() {
    if (appState.isReviewMode) {
        // 从复习模式切换到普通模式
        appState.isReviewMode = false;
        loadQuestion(appState.currentQuestionIndex);
    } else {
        // 从普通模式切换到复习模式
        if (appState.wrongQuestions.length > 0) {
            appState.isReviewMode = true;
            appState.reviewIndex = 0;
            loadQuestion(0);
        } else {
            // 没有错题，显示提示
            feedbackDisplay.innerHTML = `<div class="info-message">You currently have no incorrect questions to review.</div>`;
        }
    }
}

// 禁用/启用界面
function disableInterface(disabled) {
    playButton.disabled = disabled;
    answerInput.disabled = disabled;
    submitButton.disabled = disabled;
    prevButton.disabled = disabled;
    nextButton.disabled = disabled;
} 