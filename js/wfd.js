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
    userAnswers: [],
    wrongQuestions: [],
    isReviewMode: false,
    reviewIndex: 0
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

    // 初始化用户答案数组
    wfdQuestions.forEach(() => appState.userAnswers.push(''));

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
        feedbackDisplay.innerHTML = `<div class="success-message">恭喜！您已经完成了所有错题的复习。</div>`;
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
    
    // 显示之前输入的答案(如果有)
    if (appState.isReviewMode) {
        const originalIndex = wfdQuestions.findIndex(q => q.id === question.id);
        answerInput.value = appState.userAnswers[originalIndex] || '';
    } else {
        answerInput.value = appState.userAnswers[index] || '';
    }

    // 更新问题计数器
    questionCounter.textContent = `问题 ${index + 1}/${questions.length}`;
    
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
        wrongCollectionButton.textContent = '返回全部题目';
        wrongCollectionButton.classList.add('active');
    } else {
        wrongCollectionButton.textContent = '错题集';
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
    
    // 评分并显示反馈
    const result = scoreAnswer(userAnswer, question.answer);
    
    // 更新分数显示
    scoreDisplay.textContent = `得分: ${result.score}/${result.totalWords}`;
    
    // 显示反馈
    displayFeedback(result);
    
    // 更新错题集
    updateWrongQuestions(question, result);
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// 评分函数
function scoreAnswer(userAnswer, correctAnswer) {
    // 将答案转换为小写并分割为单词
    const userWords = userAnswer.toLowerCase().match(/\b[\w']+\b/g) || [];
    const correctWords = correctAnswer.toLowerCase().match(/\b[\w']+\b/g) || [];
    
    // 计算得分和缺失/错误的单词
    let score = 0;
    const missingWords = [];
    
    // 检查每个正确单词是否出现在用户答案中
    correctWords.forEach(word => {
        if (userWords.includes(word)) {
            score++;
        } else {
            missingWords.push(word);
        }
    });
    
    return {
        score,
        totalWords: correctWords.length,
        missingWords,
        userWords,
        correctWords
    };
}

// 显示反馈
function displayFeedback(result) {
    feedbackDisplay.innerHTML = '';
    
    if (result.score === result.totalWords) {
        // 全部正确
        feedbackDisplay.innerHTML = `<div class="success-message">太棒了！您答对了所有单词。</div>`;
    } else {
        // 部分正确或全部错误
        let feedbackHtml = `<div class="feedback-message">`;
        feedbackHtml += `<p>您得到了 ${result.score}/${result.totalWords} 分。</p>`;
        
        if (result.missingWords.length > 0) {
            feedbackHtml += `<p>您漏掉的单词: <span class="missing-words">${result.missingWords.join(', ')}</span></p>`;
        }
        
        // 显示正确答案
        feedbackHtml += `<p>正确答案: <span class="correct-answer">${result.correctWords.join(' ')}</span></p>`;
        feedbackHtml += `</div>`;
        
        feedbackDisplay.innerHTML = feedbackHtml;
    }
}

// 更新错题集
function updateWrongQuestions(question, result) {
    const questionId = question.id;
    
    // 如果得分不满分，加入错题集
    if (result.score < result.totalWords) {
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
            feedbackDisplay.innerHTML = `<div class="info-message">您目前没有错题需要复习。</div>`;
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