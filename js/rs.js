// RS Player implementation
document.addEventListener('DOMContentLoaded', () => {
    // Player elements
    const playButton = document.getElementById('play-button');
    const rewindButton = document.getElementById('rewind-button');
    const forwardButton = document.getElementById('forward-button');
    const progressBar = document.querySelector('.progress-bar');
    const progressEl = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const subtitleToggle = document.getElementById('subtitle-toggle');
    const subtitleDisplay = document.getElementById('subtitle-display');
    const speedSelector = document.getElementById('speed-selector');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const questionCounter = document.getElementById('question-counter');

    // RS questions
    const rsQuestions = [
        {
            id: 1,
            audioSrc: "/assets/RS material/RS1.mp3",
            subtitleSrc: "/assets/RS material/RS1.vtt"
        }
        // Add more questions when available
    ];

    // App state
    let state = {
        currentQuestionIndex: 0,
        audio: new Audio(),
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        subtitlesVisible: false,
        playbackRate: 1,
        subtitles: []
    };

    // Initialize player
    function initPlayer() {
        loadQuestion(state.currentQuestionIndex);
        setupEventListeners();
        updateUI();
    }

    // Load question
    function loadQuestion(index) {
        if (index < 0 || index >= rsQuestions.length) {
            console.error('Invalid question index');
            return;
        }

        // Stop any currently playing audio
        if (state.isPlaying) {
            state.audio.pause();
            state.isPlaying = false;
            updatePlayButton();
        }

        const question = rsQuestions[index];
        state.currentQuestionIndex = index;
        state.audio.src = question.audioSrc;
        state.audio.playbackRate = state.playbackRate;
        
        // Reset UI
        progressEl.style.width = '0%';
        currentTimeEl.textContent = formatTime(0);
        subtitleDisplay.innerHTML = '';
        
        // Load subtitles
        loadSubtitles(question.subtitleSrc);
        
        // Update question counter
        questionCounter.textContent = `Question ${index + 1}/${rsQuestions.length}`;
        
        // Update navigation buttons
        updateNavigationButtons();
    }

    // Load VTT subtitles
    function loadSubtitles(vttFile) {
        fetch(vttFile)
            .then(response => response.text())
            .then(vttText => {
                state.subtitles = parseVTT(vttText);
                if (state.subtitlesVisible) {
                    subtitleDisplay.classList.remove('hidden');
                } else {
                    subtitleDisplay.classList.add('hidden');
                }
            })
            .catch(error => {
                console.error('Error loading subtitles:', error);
                subtitleDisplay.innerHTML = '<p>Subtitles could not be loaded.</p>';
            });
    }

    // Parse VTT subtitles
    function parseVTT(vttText) {
        const lines = vttText.split('\n');
        const subtitles = [];
        let currentSubtitle = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines and WEBVTT header
            if (!line || line === 'WEBVTT') continue;

            // Check if this line is a timestamp line (contains -->)
            if (line.includes('-->')) {
                const timestamps = line.split('-->').map(t => t.trim());
                currentSubtitle = {
                    start: timeToSeconds(timestamps[0]),
                    end: timeToSeconds(timestamps[1]),
                    text: ''
                };
            } 
            // If we have a current subtitle and this line is not a timestamp or metadata, it's a subtitle text
            else if (currentSubtitle && !line.includes(':')) {
                if (currentSubtitle.text) {
                    currentSubtitle.text += ' ' + line;
                } else {
                    currentSubtitle.text = line;
                }
                
                // If the next line is empty or we're at the end, push this subtitle
                if (i + 1 >= lines.length || !lines[i + 1].trim()) {
                    subtitles.push(currentSubtitle);
                    currentSubtitle = null;
                }
            }
        }

        return subtitles;
    }

    // Convert VTT timestamp to seconds
    function timeToSeconds(timeString) {
        const parts = timeString.split(':');
        let seconds = 0;
        
        if (parts.length === 3) { // Format: hh:mm:ss.ms
            seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
        } else if (parts.length === 2) { // Format: mm:ss.ms
            seconds = parseInt(parts[0]) * 60 + parseFloat(parts[1]);
        }
        
        return seconds;
    }

    // Update subtitles display based on current time
    function updateSubtitles(currentTime) {
        if (!state.subtitlesVisible || state.subtitles.length === 0) return;
        
        let activeSubtitle = null;
        
        for (const subtitle of state.subtitles) {
            if (currentTime >= subtitle.start && currentTime <= subtitle.end) {
                activeSubtitle = subtitle;
                break;
            }
        }
        
        if (activeSubtitle) {
            subtitleDisplay.innerHTML = `<p class="active-text">${activeSubtitle.text}</p>`;
        } else {
            subtitleDisplay.innerHTML = '';
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Play/Pause button
        playButton.addEventListener('click', togglePlay);
        
        // Rewind button
        rewindButton.addEventListener('click', () => {
            skipTime(-5);
        });
        
        // Forward button
        forwardButton.addEventListener('click', () => {
            skipTime(5);
        });
        
        // Progress bar click
        progressBar.addEventListener('click', (e) => {
            const progressWidth = progressBar.clientWidth;
            const clickPosition = e.offsetX;
            const seekPercentage = clickPosition / progressWidth;
            const seekTime = seekPercentage * state.duration;
            
            state.audio.currentTime = seekTime;
        });
        
        // Audio events
        state.audio.addEventListener('loadedmetadata', () => {
            state.duration = state.audio.duration;
            durationEl.textContent = formatTime(state.duration);
        });
        
        state.audio.addEventListener('timeupdate', () => {
            state.currentTime = state.audio.currentTime;
            const percentage = (state.currentTime / state.duration) * 100;
            progressEl.style.width = `${percentage}%`;
            currentTimeEl.textContent = formatTime(state.currentTime);
            updateSubtitles(state.currentTime);
        });
        
        state.audio.addEventListener('ended', () => {
            state.isPlaying = false;
            updatePlayButton();
        });
        
        // Subtitle toggle
        subtitleToggle.addEventListener('change', (e) => {
            state.subtitlesVisible = e.target.checked;
            if (state.subtitlesVisible) {
                subtitleDisplay.classList.remove('hidden');
            } else {
                subtitleDisplay.classList.add('hidden');
            }
        });
        
        // Playback speed
        speedSelector.addEventListener('change', (e) => {
            state.playbackRate = parseFloat(e.target.value);
            state.audio.playbackRate = state.playbackRate;
        });
        
        // Navigation buttons
        prevButton.addEventListener('click', () => {
            const newIndex = state.currentQuestionIndex - 1;
            if (newIndex >= 0) {
                loadQuestion(newIndex);
            }
        });
        
        nextButton.addEventListener('click', () => {
            const newIndex = state.currentQuestionIndex + 1;
            if (newIndex < rsQuestions.length) {
                loadQuestion(newIndex);
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only respond to shortcuts if not typing in an input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch (e.key) {
                case ' ': // Space bar
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft': // Left arrow
                    e.preventDefault();
                    skipTime(-5);
                    break;
                case 'ArrowRight': // Right arrow
                    e.preventDefault();
                    skipTime(5);
                    break;
            }
        });
    }

    // Toggle play/pause
    function togglePlay() {
        if (state.isPlaying) {
            state.audio.pause();
        } else {
            state.audio.play();
        }
        
        state.isPlaying = !state.isPlaying;
        updatePlayButton();
    }

    // Skip time forward or backward
    function skipTime(seconds) {
        const newTime = state.audio.currentTime + seconds;
        
        // Make sure we don't go beyond the duration or below 0
        if (newTime < 0) {
            state.audio.currentTime = 0;
        } else if (newTime > state.duration) {
            state.audio.currentTime = state.duration;
        } else {
            state.audio.currentTime = newTime;
        }
    }

    // Update play/pause button icon
    function updatePlayButton() {
        if (state.isPlaying) {
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            playButton.classList.add('playing');
        } else {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.classList.remove('playing');
        }
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevButton.disabled = state.currentQuestionIndex === 0;
        nextButton.disabled = state.currentQuestionIndex === rsQuestions.length - 1;
    }

    // Format time in MM:SS format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update UI
    function updateUI() {
        updatePlayButton();
        updateNavigationButtons();
    }

    // Initialize player when the page loads
    initPlayer();
}); 