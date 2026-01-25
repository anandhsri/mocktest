// NEET Mock Test Application
class NEETMockTest {
    constructor() {
        this.userType = null; // 'student' or 'admin'
        this.selectedSubject = null;
        this.selectedDifficulty = null; // Will be set when user selects difficulty
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.markedForReview = new Array(this.questions.length).fill(false);
        this.timeRemaining = 60 * 60; // 60 minutes in seconds
        this.timerInterval = null;
        this.testStarted = false;
        this.adminPassword = 'admin123'; // Default admin password
        this.currentResults = null; // Store current results for PDF generation
        
        // Proctoring system properties
        this.proctorViolations = 0;
        this.maxViolations = 3; // Auto-submit after 3 violations
        this.isFullScreen = false;
        this.isTabActive = true;
        this.proctorWarnings = [];
        this.proctorCheckInterval = null;
        this.lastActivityTime = Date.now();
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Store reference to 'this' for use in event handlers
        const self = this;
        
        // Use event delegation for login buttons to ensure they work
        document.addEventListener('click', function(e) {
            // Check if clicked element is the student login button or inside it
            const target = e.target;
            const button = target.closest ? target.closest('#student-login-btn') : 
                          (target.id === 'student-login-btn' ? target : 
                          (target.parentElement && target.parentElement.id === 'student-login-btn' ? target.parentElement : null));
            
            if (button) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Student login button clicked via event delegation');
                if (self && typeof self.loginAsStudent === 'function') {
                    self.loginAsStudent();
                } else {
                    console.error('self.loginAsStudent is not available');
                    // Direct fallback
                    const loginScreen = document.getElementById('login-screen');
                    const subjectScreen = document.getElementById('subject-selection-screen');
                    if (loginScreen && subjectScreen) {
                        loginScreen.classList.remove('active');
                        loginScreen.style.display = 'none';
                        subjectScreen.classList.add('active');
                        subjectScreen.style.display = 'block';
                    }
                }
            }
        }, false);
        
        // Also try direct attachment as backup (keep inline onclick as fallback)
        const studentLoginBtn = document.getElementById('student-login-btn');
        if (studentLoginBtn) {
            // Keep inline onclick, but also add event listener
            studentLoginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Student login button clicked via direct listener');
                if (self && typeof self.loginAsStudent === 'function') {
                    self.loginAsStudent();
                }
            }, false);
            console.log('Student login button listener attached successfully');
        } else {
            console.warn('Student login button not found during initialization - using event delegation and inline onclick');
        }
        
        const adminLoginBtn = document.getElementById('admin-login-btn');
        if (adminLoginBtn) {
            adminLoginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self && typeof self.showAdminPasswordInput === 'function') {
                    self.showAdminPasswordInput();
                }
            });
        }
        
        const adminSubmitBtn = document.getElementById('admin-submit-btn');
        if (adminSubmitBtn) {
            adminSubmitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self && typeof self.loginAsAdmin === 'function') {
                    self.loginAsAdmin();
                }
            });
        }
        
        const cancelAdminBtn = document.getElementById('cancel-admin-login-btn');
        if (cancelAdminBtn) {
            cancelAdminBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self && typeof self.hideAdminPasswordInput === 'function') {
                    self.hideAdminPasswordInput();
                }
            });
        }
        
        // Logout buttons - use event delegation for dynamically added buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('logout-btn')) {
                if (self && typeof self.logout === 'function') {
                    self.logout();
                }
            }
            
            // Acknowledge proctor warning
            if (e.target.id === 'acknowledge-warning-btn') {
                const modal = document.getElementById('proctor-warning-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            }
            
            // Exit test button
            if (e.target.id === 'exit-test-btn' || e.target.closest('#exit-test-btn')) {
                e.preventDefault();
                e.stopPropagation();
                if (self && typeof self.exitTest === 'function') {
                    self.exitTest();
                }
            }
            
            // Subject selection cards - simple event delegation
            const subjectCard = e.target.closest('.subject-card');
            if (subjectCard) {
                e.preventDefault();
                e.stopPropagation();
                
                const subject = subjectCard.getAttribute('data-subject');
                if (!subject) {
                    console.warn('Subject card clicked but no data-subject attribute found');
                    return;
                }
                
                console.log('Subject card clicked:', subject);
                
                // Ensure app is available
                if (!self) {
                    console.error('App instance not available');
                    alert('Application is not ready. Please refresh the page.');
                    return;
                }
                
                // Call selectSubject
                if (typeof self.selectSubject === 'function') {
                    try {
                        self.selectSubject(subject);
                    } catch (error) {
                        console.error('Error calling selectSubject:', error);
                        alert('Error selecting subject: ' + error.message);
                    }
                } else {
                    console.error('selectSubject method not available');
                    alert('Subject selection is not available. Please refresh the page.');
                }
            }
        });
        
        // Change subject button
        const changeSubjectBtn = document.getElementById('change-subject-btn');
        if (changeSubjectBtn) {
            changeSubjectBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self && typeof self.goToSubjectSelection === 'function') {
                    self.goToSubjectSelection();
                }
            });
        }
        
        // Start test button
        const startTestBtn = document.getElementById('start-test-btn');
        if (startTestBtn) {
            startTestBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self && typeof self.startTest === 'function') {
                    self.startTest();
                }
            });
        }

        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.navigateQuestion(-1);
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.navigateQuestion(1);
        });

        // Mark for review button
        document.getElementById('mark-review-btn').addEventListener('click', () => {
            this.toggleMarkForReview();
        });

        // Clear answer button
        document.getElementById('clear-answer-btn').addEventListener('click', () => {
            this.clearAnswer();
        });

        // Submit test button
        document.getElementById('submit-test-btn').addEventListener('click', () => {
            this.confirmSubmit();
        });

        // Question palette clicks
        document.querySelectorAll('[id$="-questions"]').forEach(grid => {
            grid.addEventListener('click', (e) => {
                if (e.target.classList.contains('question-number')) {
                    const questionNum = parseInt(e.target.textContent);
                    this.goToQuestion(questionNum - 1);
                }
            });
        });

        // Restart test button
        document.getElementById('restart-test-btn').addEventListener('click', () => {
            this.restartTest();
        });

        // Download PDF button
        document.getElementById('download-pdf-btn').addEventListener('click', () => {
            this.downloadResultsPDF();
        });

        // Review answers button
        document.getElementById('review-answers-btn').addEventListener('click', () => {
            this.showReviewScreen();
        });
        
        // Descriptive test correction buttons
        document.getElementById('calculate-score-btn')?.addEventListener('click', () => {
            this.calculateDescriptiveScore();
        });
        
        document.getElementById('save-correction-btn')?.addEventListener('click', () => {
            this.saveCorrection();
        });
        
        // View last results button
        document.getElementById('view-last-results-btn').addEventListener('click', () => {
            this.displayLastTestResults();
        });
        
        // Back to welcome button
        document.getElementById('back-to-welcome-btn').addEventListener('click', () => {
            document.getElementById('test-history-screen').classList.remove('active');
            document.getElementById('subject-selection-screen').classList.add('active');
        });
        
        // Clear all results button
        document.getElementById('clear-all-results-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all test results? This action cannot be undone.')) {
                this.clearAllTestResults();
            }
        });
        
        // Acknowledge proctor warning button
        const acknowledgeBtn = document.getElementById('acknowledge-warning-btn');
        if (acknowledgeBtn) {
            acknowledgeBtn.addEventListener('click', () => {
                const modal = document.getElementById('proctor-warning-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    loginAsStudent() {
        console.log('loginAsStudent() method called');
        try {
            this.userType = 'student';
            console.log('User type set to:', this.userType);
            
            const loginScreen = document.getElementById('login-screen');
            const subjectScreen = document.getElementById('subject-selection-screen');
            
            console.log('Login screen element:', loginScreen ? 'Found' : 'NOT FOUND');
            console.log('Subject screen element:', subjectScreen ? 'Found' : 'NOT FOUND');
            
            if (!loginScreen) {
                console.error('login-screen element not found in DOM');
                alert('Error: Login screen element not found. Please refresh the page.');
                return;
            }
            
            if (!subjectScreen) {
                console.error('subject-selection-screen element not found in DOM');
                alert('Error: Subject selection screen element not found. Please refresh the page.');
                return;
            }
            
            // Hide login screen and show subject selection screen
            loginScreen.classList.remove('active');
            loginScreen.style.display = 'none';
            console.log('Hidden login screen');
            
            // Show subject selection screen
            subjectScreen.classList.add('active');
            subjectScreen.style.display = 'block';
            console.log('Shown subject selection screen');
            
            console.log('Navigation successful - moved to subject selection screen');
            
        } catch (error) {
            console.error('Error in loginAsStudent:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            alert('An error occurred during login: ' + error.message + '\n\nPlease check the browser console for details.');
        }
    }

    showAdminPasswordInput() {
        document.getElementById('admin-password-section').style.display = 'block';
        document.getElementById('admin-password').focus();
        document.getElementById('admin-error').style.display = 'none';
    }

    hideAdminPasswordInput() {
        document.getElementById('admin-password-section').style.display = 'none';
        document.getElementById('admin-password').value = '';
        document.getElementById('admin-error').style.display = 'none';
    }

    loginAsAdmin() {
        const password = document.getElementById('admin-password').value;
        if (password === this.adminPassword) {
            this.userType = 'admin';
            const loginScreen = document.getElementById('login-screen');
            loginScreen.classList.remove('active');
            loginScreen.style.display = 'none';
            this.hideAdminPasswordInput();
            this.showAdminDashboard();
        } else {
            document.getElementById('admin-error').textContent = 'Incorrect password. Please try again.';
            document.getElementById('admin-error').style.display = 'block';
            document.getElementById('admin-password').value = '';
        }
    }

    logout() {
        this.userType = null;
        this.selectedSubject = null;
        this.questions = [];
        this.answers = [];
        this.markedForReview = [];
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        // Show login screen
        const loginScreen = document.getElementById('login-screen');
        loginScreen.classList.add('active');
        loginScreen.style.display = 'block';
        this.hideAdminPasswordInput();
    }

    showAdminDashboard() {
        // Create admin dashboard if it doesn't exist
        let adminScreen = document.getElementById('admin-dashboard-screen');
        if (!adminScreen) {
            adminScreen = document.createElement('div');
            adminScreen.id = 'admin-dashboard-screen';
            adminScreen.className = 'screen';
            adminScreen.innerHTML = `
                <div class="admin-dashboard-content">
                    <div class="admin-header">
                        <h1>Admin Dashboard</h1>
                        <button class="logout-btn btn-secondary">Logout</button>
                    </div>
                    <div class="admin-stats">
                        <div class="stat-card">
                            <h3>Total Tests</h3>
                            <div class="stat-value" id="total-tests-count">0</div>
                        </div>
                        <div class="stat-card">
                            <h3>Total Students</h3>
                            <div class="stat-value" id="total-students-count">0</div>
                        </div>
                        <div class="stat-card">
                            <h3>Average Score</h3>
                            <div class="stat-value" id="average-score">0</div>
                        </div>
                    </div>
                    <div class="admin-actions">
                        <button id="view-all-results-admin-btn" class="btn-primary">View All Test Results</button>
                        <button id="view-analytics-btn" class="btn-primary">View Analytics</button>
                        <button id="upload-questions-btn" class="btn-primary">Upload Questions</button>
                        <button id="clear-all-results-admin-btn" class="btn-danger">Clear All Test Results</button>
                    </div>
                    <div id="upload-questions-section" class="upload-section" style="display: none;">
                        <h3>Upload Questions</h3>
                        <div class="upload-tabs">
                            <button class="upload-tab active" data-tab="json">JSON Upload</button>
                            <button class="upload-tab" data-tab="paper">Question Paper (PDF/Image)</button>
                        </div>
                        
                        <!-- JSON Upload Tab -->
                        <div id="json-upload-tab" class="upload-tab-content active">
                            <div class="upload-instructions">
                                <p><strong>Instructions:</strong></p>
                                <ul>
                                    <li>Upload a JSON file with questions</li>
                                    <li>Questions will be added to the existing question bank</li>
                                    <li>Download template to see the correct format</li>
                                </ul>
                            </div>
                            <div class="upload-controls">
                                <input type="file" id="questions-file-input" accept=".json" style="display: none;">
                                <button id="select-file-btn" class="btn-secondary">Select JSON File</button>
                                <button id="download-template-btn" class="btn-secondary">Download Template</button>
                            </div>
                        </div>
                        
                        <!-- Question Paper Upload Tab -->
                        <div id="paper-upload-tab" class="upload-tab-content">
                            <div class="upload-instructions">
                                <p><strong>Instructions:</strong></p>
                                <ul>
                                    <li>Upload a question paper (PDF or Image: JPG, PNG)</li>
                                    <li>The system will automatically extract questions using AI</li>
                                    <li>Review and edit extracted questions before saving</li>
                                    <li>Supports multiple question formats (MCQ, True/False, etc.)</li>
                                </ul>
                            </div>
                            <div class="upload-controls">
                                <input type="file" id="paper-file-input" accept=".pdf,.jpg,.jpeg,.png,.gif" style="display: none;">
                                <button id="select-paper-btn" class="btn-secondary">Select Question Paper</button>
                                <div class="paper-options" style="margin-top: 15px;">
                                    <label>
                                        <input type="checkbox" id="auto-detect-subject" checked> Auto-detect Subject
                                    </label>
                                    <label>
                                        <input type="checkbox" id="auto-detect-year" checked> Auto-detect Year
                                    </label>
                                </div>
                            </div>
                            <div id="paper-processing-status" class="upload-status"></div>
                            <div id="extracted-questions-container" class="extracted-questions-container" style="display: none;">
                                <h4>Extracted Questions - Review & Edit</h4>
                                <div id="extracted-questions-list" class="extracted-questions-list"></div>
                                <div class="extracted-questions-actions">
                                    <button id="save-extracted-questions-btn" class="btn-primary">Save All Questions</button>
                                    <button id="cancel-extraction-btn" class="btn-secondary">Cancel</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="upload-controls-bottom">
                            <button id="clear-uploaded-questions-btn" class="btn-danger">Clear Uploaded Questions</button>
                        </div>
                        <div id="upload-status" class="upload-status"></div>
                        <div id="uploaded-questions-preview" class="uploaded-questions-preview"></div>
                    </div>
                    <div id="admin-results-container" class="admin-results-container"></div>
                </div>
            `;
            document.querySelector('.container').appendChild(adminScreen);
            
            // Add event listeners for admin dashboard
            document.getElementById('view-all-results-admin-btn').addEventListener('click', () => {
                this.displayAllTestResultsForAdmin();
            });
            
            document.getElementById('view-analytics-btn').addEventListener('click', () => {
                this.displayAnalytics();
            });
            
            document.getElementById('upload-questions-btn').addEventListener('click', () => {
                this.toggleUploadSection();
            });
            
            // Tab switching
            document.querySelectorAll('.upload-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabName = tab.dataset.tab;
                    document.querySelectorAll('.upload-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.upload-tab-content').forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    document.getElementById(`${tabName}-upload-tab`).classList.add('active');
                });
            });
            
            document.getElementById('select-file-btn').addEventListener('click', () => {
                document.getElementById('questions-file-input').click();
            });
            
            document.getElementById('questions-file-input').addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
            
            document.getElementById('select-paper-btn').addEventListener('click', () => {
                document.getElementById('paper-file-input').click();
            });
            
            document.getElementById('paper-file-input').addEventListener('change', (e) => {
                this.handleQuestionPaperUpload(e);
            });
            
            document.getElementById('download-template-btn').addEventListener('click', () => {
                this.downloadQuestionTemplate();
            });
            
            document.getElementById('save-extracted-questions-btn').addEventListener('click', () => {
                this.saveExtractedQuestions();
            });
            
            document.getElementById('cancel-extraction-btn').addEventListener('click', () => {
                document.getElementById('extracted-questions-container').style.display = 'none';
                document.getElementById('paper-file-input').value = '';
            });
            
            document.getElementById('clear-uploaded-questions-btn').addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all uploaded questions? This action cannot be undone.')) {
                    this.clearUploadedQuestions();
                }
            });
            
            document.getElementById('clear-all-results-admin-btn').addEventListener('click', () => {
                this.clearAllTestResultsFromAdmin();
            });
            
            document.querySelector('#admin-dashboard-screen .logout-btn').addEventListener('click', () => {
                this.logout();
            });
        }
        
        // Show admin dashboard
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        adminScreen.classList.add('active');
        
        // Load admin dashboard data
        this.loadAdminDashboardData();
    }

    loadAdminDashboardData() {
        const allResults = this.getAllTestResults();
        const totalTests = allResults.length;
        const uniqueStudents = new Set(allResults.map(r => r.candidateName || 'Unknown')).size;
        const avgScore = allResults.length > 0 
            ? (allResults.reduce((sum, r) => sum + (r.totalScore || 0), 0) / allResults.length).toFixed(1)
            : 0;
        
        document.getElementById('total-tests-count').textContent = totalTests;
        document.getElementById('total-students-count').textContent = uniqueStudents;
        document.getElementById('average-score').textContent = avgScore;
        
        // Load and display uploaded questions info
        this.displayUploadedQuestionsInfo();
        
        // Show upload section if it was previously open
        const uploadSection = document.getElementById('upload-questions-section');
        if (uploadSection && localStorage.getItem('uploadSectionOpen') === 'true') {
            uploadSection.style.display = 'block';
        }
    }

    toggleUploadSection() {
        const uploadSection = document.getElementById('upload-questions-section');
        const resultsContainer = document.getElementById('admin-results-container');
        
        if (uploadSection.style.display === 'none') {
            uploadSection.style.display = 'block';
            resultsContainer.innerHTML = '';
            localStorage.setItem('uploadSectionOpen', 'true');
        } else {
            uploadSection.style.display = 'none';
            localStorage.setItem('uploadSectionOpen', 'false');
        }
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const statusEl = document.getElementById('upload-status');
        statusEl.innerHTML = '<p>Processing file...</p>';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const fileContent = JSON.parse(e.target.result);
                const result = this.processUploadedQuestions(fileContent);
                
                if (result.success) {
                    statusEl.innerHTML = `<p class="success-message">✅ Successfully uploaded ${result.added} questions!</p>`;
                    this.displayUploadedQuestionsInfo();
                } else {
                    statusEl.innerHTML = `<p class="error-message">❌ Error: ${result.error}</p>`;
                }
            } catch (error) {
                statusEl.innerHTML = `<p class="error-message">❌ Invalid JSON file: ${error.message}</p>`;
            }
        };
        
        reader.onerror = () => {
            statusEl.innerHTML = '<p class="error-message">❌ Error reading file</p>';
        };
        
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    processUploadedQuestions(fileContent) {
        // Validate file structure
        if (!fileContent || typeof fileContent !== 'object') {
            return { success: false, error: 'Invalid file format. Expected JSON object.' };
        }
        
        // Handle different formats
        let questionsToAdd = [];
        
        // Format 1: Array of questions
        if (Array.isArray(fileContent)) {
            questionsToAdd = fileContent;
        }
        // Format 2: Object with subject arrays
        else if (fileContent.mathematics || fileContent.physics || fileContent.chemistry || 
                 fileContent.biology || fileContent.socialScience) {
            Object.keys(fileContent).forEach(subject => {
                if (Array.isArray(fileContent[subject])) {
                    questionsToAdd.push(...fileContent[subject].map(q => ({ ...q, subject: this.capitalizeSubject(subject) })));
                }
            });
        }
        // Format 3: Single question object
        else if (fileContent.question && fileContent.options) {
            questionsToAdd = [fileContent];
        }
        else {
            return { success: false, error: 'Invalid question format. See template for correct structure.' };
        }
        
        if (questionsToAdd.length === 0) {
            return { success: false, error: 'No valid questions found in file.' };
        }
        
        // Validate and process each question
        const validQuestions = [];
        const errors = [];
        
        questionsToAdd.forEach((q, index) => {
            const validation = this.validateQuestion(q, index);
            if (validation.valid) {
                // Ensure question has all required fields
                const question = {
                    id: q.id || Date.now() + index,
                    question: q.question,
                    options: q.options,
                    correct: q.correct,
                    year: q.year || new Date().getFullYear().toString(),
                    chapter: q.chapter || 'General',
                    subject: q.subject || 'Mathematics',
                    difficulty: q.difficulty || 'Moderate'
                };
                validQuestions.push(question);
            } else {
                errors.push(`Question ${index + 1}: ${validation.error}`);
            }
        });
        
        if (validQuestions.length === 0) {
            return { success: false, error: `No valid questions. Errors: ${errors.join('; ')}` };
        }
        
        // Get existing uploaded questions
        const existing = this.getUploadedQuestions();
        
        // Add new questions (avoid duplicates by ID)
        const existingIds = new Set(existing.map(q => q.id));
        const newQuestions = validQuestions.filter(q => !existingIds.has(q.id));
        
        // Save all uploaded questions
        this.saveUploadedQuestions([...existing, ...newQuestions]);
        
        return { 
            success: true, 
            added: newQuestions.length,
            skipped: validQuestions.length - newQuestions.length,
            errors: errors.length > 0 ? errors : null
        };
    }

    validateQuestion(question, index) {
        if (!question.question || typeof question.question !== 'string' || question.question.trim() === '') {
            return { valid: false, error: 'Missing or invalid question text' };
        }
        
        if (!question.options || !Array.isArray(question.options) || question.options.length < 2) {
            return { valid: false, error: 'Must have at least 2 options' };
        }
        
        if (question.correct === undefined || question.correct === null) {
            return { valid: false, error: 'Missing correct answer index' };
        }
        
        if (question.correct < 0 || question.correct >= question.options.length) {
            return { valid: false, error: 'Correct answer index out of range' };
        }
        
        return { valid: true };
    }

    capitalizeSubject(subject) {
        const subjects = {
            'mathematics': 'Mathematics',
            'physics': 'Physics',
            'chemistry': 'Chemistry',
            'biology': 'Biology',
            'socialscience': 'Social Science',
            'social science': 'Social Science'
        };
        return subjects[subject.toLowerCase()] || subject;
    }

    saveUploadedQuestions(questions) {
        try {
            localStorage.setItem('uploadedQuestions', JSON.stringify(questions));
            return true;
        } catch (e) {
            console.error('Failed to save uploaded questions:', e);
            return false;
        }
    }

    getUploadedQuestions() {
        try {
            const stored = localStorage.getItem('uploadedQuestions');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load uploaded questions:', e);
            return [];
        }
    }

    clearUploadedQuestions() {
        localStorage.removeItem('uploadedQuestions');
        document.getElementById('upload-status').innerHTML = '<p class="success-message">✅ Uploaded questions cleared.</p>';
        this.displayUploadedQuestionsInfo();
    }

    displayUploadedQuestionsInfo() {
        const uploaded = this.getUploadedQuestions();
        const previewEl = document.getElementById('uploaded-questions-preview');
        
        if (!previewEl) return;
        
        if (uploaded.length === 0) {
            previewEl.innerHTML = '<p class="no-uploaded-questions">No uploaded questions yet.</p>';
            return;
        }
        
        // Group by subject
        const bySubject = {};
        uploaded.forEach(q => {
            const subject = q.subject || 'Mathematics';
            if (!bySubject[subject]) {
                bySubject[subject] = [];
            }
            bySubject[subject].push(q);
        });
        
        let html = '<h4>Uploaded Questions Summary</h4>';
        html += '<div class="uploaded-questions-summary">';
        
        Object.keys(bySubject).forEach(subject => {
            html += `
                <div class="subject-upload-summary">
                    <strong>${subject}:</strong> ${bySubject[subject].length} questions
                </div>
            `;
        });
        
        html += '</div>';
        previewEl.innerHTML = html;
    }

    downloadQuestionTemplate() {
        const template = {
            "mathematics": [
                {
                    "id": 1,
                    "question": "Sample question text here?",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct": 0,
                    "year": "2024",
                    "chapter": "Sample Chapter",
                    "subject": "Mathematics",
                    "difficulty": "Moderate"
                }
            ],
            "physics": [
                {
                    "id": 1,
                    "question": "Sample physics question?",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct": 1,
                    "year": "2024",
                    "chapter": "Sample Chapter",
                    "subject": "Physics",
                    "difficulty": "Moderate"
                }
            ]
        };
        
        const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'questions_template.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async handleQuestionPaperUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const statusEl = document.getElementById('paper-processing-status');
        statusEl.innerHTML = '<p>📄 Processing question paper... This may take a minute.</p>';
        
        try {
            let extractedText = '';
            
            // Check file type
            if (file.type === 'application/pdf') {
                extractedText = await this.extractTextFromPDF(file);
            } else if (file.type.startsWith('image/')) {
                extractedText = await this.extractTextFromImage(file);
            } else {
                throw new Error('Unsupported file type. Please upload PDF or image file.');
            }
            
            if (!extractedText || extractedText.trim().length === 0) {
                throw new Error('Could not extract text from the file. Please ensure the file is clear and readable.');
            }
            
            statusEl.innerHTML = '<p>🤖 Analyzing and extracting questions...</p>';
            
            // Parse questions from extracted text
            const extractedQuestions = this.parseQuestionsFromText(extractedText, file.name);
            
            if (extractedQuestions.length === 0) {
                statusEl.innerHTML = '<p class="error-message">❌ No questions found in the document. Please check the format.</p>';
                return;
            }
            
            // Store extracted questions for review
            this.extractedQuestions = extractedQuestions;
            
            // Display for review
            this.displayExtractedQuestions(extractedQuestions);
            
            statusEl.innerHTML = `<p class="success-message">✅ Extracted ${extractedQuestions.length} questions! Please review and edit before saving.</p>`;
            
        } catch (error) {
            console.error('Error processing question paper:', error);
            statusEl.innerHTML = `<p class="error-message">❌ Error: ${error.message}</p>`;
        }
    }

    async extractTextFromPDF(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
                    let fullText = '';
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n';
                    }
                    
                    resolve(fullText);
                } catch (error) {
                    reject(new Error('Failed to read PDF: ' + error.message));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    }

    async extractTextFromImage(file) {
        const statusEl = document.getElementById('paper-processing-status');
        statusEl.innerHTML = '<p>🔍 Running OCR on image... This may take 30-60 seconds.</p>';
        
        try {
            const { data: { text } } = await Tesseract.recognize(file, 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round(m.progress * 100);
                        statusEl.innerHTML = `<p>🔍 OCR Progress: ${progress}%</p>`;
                    }
                }
            });
            return text;
        } catch (error) {
            throw new Error('OCR failed: ' + error.message);
        }
    }

    parseQuestionsFromText(text, filename) {
        const questions = [];
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        // Detect subject from filename or content
        const autoDetectSubject = document.getElementById('auto-detect-subject')?.checked !== false;
        const autoDetectYear = document.getElementById('auto-detect-year')?.checked !== false;
        
        let detectedSubject = this.detectSubject(filename, text);
        let detectedYear = this.detectYear(filename, text);
        
        // Pattern matching for different question formats
        let currentQuestion = null;
        let currentOptions = [];
        let questionNumber = 1;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Detect question number patterns: "1.", "Q1", "Question 1", etc.
            const questionMatch = line.match(/^(?:Q|Question)?\s*(\d+)[\.\)]\s*(.+)/i);
            if (questionMatch) {
                // Save previous question if exists
                if (currentQuestion && currentOptions.length >= 2) {
                    questions.push(this.createQuestionFromParsed(
                        currentQuestion, 
                        currentOptions, 
                        questionNumber - 1,
                        autoDetectSubject ? detectedSubject : 'Mathematics',
                        autoDetectYear ? detectedYear : new Date().getFullYear().toString()
                    ));
                }
                
                // Start new question
                currentQuestion = questionMatch[2];
                currentOptions = [];
                questionNumber = parseInt(questionMatch[1]);
            }
            // Detect option patterns: "(a)", "a)", "A)", "i)", "1)", etc.
            else if (line.match(/^[\(]?([a-dA-D1-4ivxIVX]+)[\.\)]\s*(.+)/i)) {
                const optionMatch = line.match(/^[\(]?([a-dA-D1-4ivxIVX]+)[\.\)]\s*(.+)/i);
                if (optionMatch && currentQuestion) {
                    const optionText = optionMatch[2];
                    // Skip if it looks like another question
                    if (!optionText.match(/^(?:Q|Question)?\s*\d+/i)) {
                        currentOptions.push(optionText);
                    }
                }
            }
            // If we have a question but no options yet, continue building question text
            else if (currentQuestion && currentOptions.length === 0) {
                // Check if line looks like it continues the question
                if (line.length > 10 && !line.match(/^[\(]?[a-dA-D1-4][\.\)]/)) {
                    currentQuestion += ' ' + line;
                }
            }
        }
        
        // Save last question
        if (currentQuestion && currentOptions.length >= 2) {
            questions.push(this.createQuestionFromParsed(
                currentQuestion, 
                currentOptions, 
                questionNumber,
                autoDetectSubject ? detectedSubject : 'Mathematics',
                autoDetectYear ? detectedYear : new Date().getFullYear().toString()
            ));
        }
        
        // If pattern matching didn't work well, try alternative parsing
        if (questions.length === 0) {
            return this.alternativeQuestionParsing(text, detectedSubject, detectedYear);
        }
        
        return questions;
    }

    createQuestionFromParsed(questionText, options, id, subject, year) {
        // Clean up question text
        questionText = questionText.replace(/\s+/g, ' ').trim();
        if (!questionText.endsWith('?')) {
            questionText += '?';
        }
        
        // Ensure we have 4 options (pad if needed)
        while (options.length < 4) {
            options.push(`Option ${String.fromCharCode(68 + options.length)}`);
        }
        if (options.length > 4) {
            options = options.slice(0, 4);
        }
        
        return {
            id: Date.now() + id,
            question: questionText,
            options: options,
            correct: 0, // Default to first option, user should review
            year: year,
            chapter: 'General',
            subject: subject,
            difficulty: 'Moderate',
            isExtracted: true
        };
    }

    alternativeQuestionParsing(text, subject, year) {
        const questions = [];
        // Split by common separators
        const sections = text.split(/(?:Question\s*\d+|Q\s*\d+|\d+\.)/i);
        
        sections.forEach((section, index) => {
            if (index === 0) return; // Skip header
            
            const lines = section.split('\n').map(l => l.trim()).filter(l => l.length > 5);
            if (lines.length < 3) return;
            
            const questionText = lines[0];
            const options = [];
            
            for (let i = 1; i < lines.length && options.length < 4; i++) {
                const line = lines[i];
                // Check if line looks like an option
                if (line.match(/^[\(]?[a-dA-D1-4][\.\)]/) || line.length > 10) {
                    const cleanOption = line.replace(/^[\(]?[a-dA-D1-4][\.\)]\s*/i, '').trim();
                    if (cleanOption.length > 0) {
                        options.push(cleanOption);
                    }
                }
            }
            
            if (questionText.length > 10 && options.length >= 2) {
                questions.push(this.createQuestionFromParsed(
                    questionText,
                    options,
                    index,
                    subject,
                    year
                ));
            }
        });
        
        return questions;
    }

    detectSubject(filename, text) {
        const filenameLower = filename.toLowerCase();
        const textLower = text.toLowerCase();
        
        const subjectKeywords = {
            'Mathematics': ['math', 'mathematics', 'algebra', 'geometry', 'trigonometry', 'calculus'],
            'Physics': ['physics', 'force', 'energy', 'motion', 'electricity', 'magnetism'],
            'Chemistry': ['chemistry', 'chemical', 'reaction', 'molecule', 'atom', 'compound'],
            'Biology': ['biology', 'cell', 'organism', 'photosynthesis', 'respiration', 'genetics'],
            'Social Science': ['history', 'geography', 'civics', 'economics', 'social']
        };
        
        for (const [subject, keywords] of Object.entries(subjectKeywords)) {
            if (keywords.some(keyword => filenameLower.includes(keyword) || textLower.includes(keyword))) {
                return subject;
            }
        }
        
        return 'Mathematics'; // Default
    }

    detectYear(filename, text) {
        // Look for year patterns: 2020, 2021, etc.
        const yearMatch = filename.match(/\b(20\d{2})\b/) || text.match(/\b(20\d{2})\b/);
        if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            if (year >= 2020 && year <= 2025) {
                return year.toString();
            }
        }
        return new Date().getFullYear().toString();
    }

    displayExtractedQuestions(questions) {
        const container = document.getElementById('extracted-questions-container');
        const listEl = document.getElementById('extracted-questions-list');
        
        container.style.display = 'block';
        listEl.innerHTML = '';
        
        questions.forEach((q, index) => {
            const questionEl = document.createElement('div');
            questionEl.className = 'extracted-question-item';
            questionEl.innerHTML = `
                <div class="extracted-question-header">
                    <span class="question-number">Question ${index + 1}</span>
                    <button class="btn-small btn-danger" onclick="app.removeExtractedQuestion(${index})">Remove</button>
                </div>
                <div class="extracted-question-content">
                    <div class="form-group">
                        <label>Question:</label>
                        <textarea class="question-edit" data-index="${index}" data-field="question">${q.question}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Subject:</label>
                        <select class="subject-edit" data-index="${index}" data-field="subject">
                            <option value="Mathematics" ${q.subject === 'Mathematics' ? 'selected' : ''}>Mathematics</option>
                            <option value="Physics" ${q.subject === 'Physics' ? 'selected' : ''}>Physics</option>
                            <option value="Chemistry" ${q.subject === 'Chemistry' ? 'selected' : ''}>Chemistry</option>
                            <option value="Biology" ${q.subject === 'Biology' ? 'selected' : ''}>Biology</option>
                            <option value="Social Science" ${q.subject === 'Social Science' ? 'selected' : ''}>Social Science</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Year:</label>
                        <input type="text" class="year-edit" data-index="${index}" data-field="year" value="${q.year}">
                    </div>
                    <div class="form-group">
                        <label>Options:</label>
                        ${q.options.map((opt, optIndex) => `
                            <div class="option-edit-group">
                                <input type="radio" name="correct-${index}" value="${optIndex}" ${optIndex === q.correct ? 'checked' : ''} 
                                       onchange="app.updateExtractedQuestionCorrect(${index}, ${optIndex})">
                                <input type="text" class="option-edit" data-index="${index}" data-option="${optIndex}" 
                                       value="${opt}" placeholder="Option ${String.fromCharCode(65 + optIndex)}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            listEl.appendChild(questionEl);
        });
        
        // Add event listeners for editing
        listEl.querySelectorAll('.question-edit, .option-edit, .subject-edit, .year-edit').forEach(el => {
            el.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field || 'option';
                const optionIndex = e.target.dataset.option;
                
                if (field === 'option' && optionIndex !== undefined) {
                    this.extractedQuestions[index].options[parseInt(optionIndex)] = e.target.value;
                } else {
                    this.extractedQuestions[index][field] = e.target.value;
                }
            });
        });
    }

    updateExtractedQuestionCorrect(questionIndex, optionIndex) {
        if (this.extractedQuestions && this.extractedQuestions[questionIndex]) {
            this.extractedQuestions[questionIndex].correct = optionIndex;
        }
    }

    removeExtractedQuestion(index) {
        if (this.extractedQuestions && confirm('Remove this question?')) {
            this.extractedQuestions.splice(index, 1);
            this.displayExtractedQuestions(this.extractedQuestions);
        }
    }

    saveExtractedQuestions() {
        if (!this.extractedQuestions || this.extractedQuestions.length === 0) {
            alert('No questions to save.');
            return;
        }
        
        // Validate all questions
        const validQuestions = [];
        const errors = [];
        
        this.extractedQuestions.forEach((q, index) => {
            const validation = this.validateQuestion(q, index);
            if (validation.valid) {
                // Ensure proper format
                const question = {
                    id: q.id || Date.now() + index,
                    question: q.question.trim(),
                    options: q.options.map(opt => opt.trim()).filter(opt => opt.length > 0),
                    correct: q.correct,
                    year: q.year || new Date().getFullYear().toString(),
                    chapter: q.chapter || 'General',
                    subject: q.subject || 'Mathematics',
                    difficulty: q.difficulty || 'Moderate'
                };
                
                // Ensure 4 options
                while (question.options.length < 4) {
                    question.options.push(`Option ${String.fromCharCode(65 + question.options.length)}`);
                }
                
                validQuestions.push(question);
            } else {
                errors.push(`Question ${index + 1}: ${validation.error}`);
            }
        });
        
        if (validQuestions.length === 0) {
            alert('No valid questions to save. Please fix errors:\n' + errors.join('\n'));
            return;
        }
        
        // Save to uploaded questions
        const existing = this.getUploadedQuestions();
        const existingIds = new Set(existing.map(q => q.id));
        const newQuestions = validQuestions.filter(q => !existingIds.has(q.id));
        
        this.saveUploadedQuestions([...existing, ...newQuestions]);
        
        // Show success message
        const statusEl = document.getElementById('upload-status');
        statusEl.innerHTML = `<p class="success-message">✅ Successfully saved ${newQuestions.length} questions! ${validQuestions.length - newQuestions.length} were duplicates.</p>`;
        
        // Hide extraction container
        document.getElementById('extracted-questions-container').style.display = 'none';
        document.getElementById('paper-file-input').value = '';
        
        // Refresh display
        this.displayUploadedQuestionsInfo();
    }

    displayAnalytics() {
        const allResults = this.getAllTestResults();
        const container = document.getElementById('admin-results-container');
        
        if (allResults.length === 0) {
            container.innerHTML = '<p class="no-results">No test results available for analytics.</p>';
            return;
        }
        
        // Calculate analytics
        const subjectStats = {};
        const studentStats = {};
        const dateStats = [];
        const chapterStats = {};
        
        allResults.forEach(result => {
            const subject = result.subject || 'Unknown';
            const student = result.candidateName || 'Unknown';
            const date = new Date(result.timestamp).toLocaleDateString();
            const maxScore = (result.questions?.length || 0) * 4;
            const percentage = maxScore > 0 ? ((result.totalScore || 0) / maxScore * 100).toFixed(1) : 0;
            
            // Subject statistics
            if (!subjectStats[subject]) {
                subjectStats[subject] = {
                    total: 0,
                    totalScore: 0,
                    totalMaxScore: 0,
                    correct: 0,
                    incorrect: 0,
                    unanswered: 0
                };
            }
            subjectStats[subject].total++;
            subjectStats[subject].totalScore += (result.totalScore || 0);
            subjectStats[subject].totalMaxScore += maxScore;
            subjectStats[subject].correct += (result.correctCount || 0);
            subjectStats[subject].incorrect += (result.incorrectCount || 0);
            subjectStats[subject].unanswered += (result.unansweredCount || 0);
            
            // Student statistics
            if (!studentStats[student]) {
                studentStats[student] = {
                    total: 0,
                    totalScore: 0,
                    totalMaxScore: 0,
                    subjects: new Set()
                };
            }
            studentStats[student].total++;
            studentStats[student].totalScore += (result.totalScore || 0);
            studentStats[student].totalMaxScore += maxScore;
            studentStats[student].subjects.add(subject);
            
            // Date statistics
            dateStats.push({
                date: date,
                score: result.totalScore || 0,
                maxScore: maxScore,
                percentage: parseFloat(percentage)
            });
            
            // Chapter statistics
            if (result.chapterPerformance) {
                Object.keys(result.chapterPerformance).forEach(chapter => {
                    if (!chapterStats[chapter]) {
                        chapterStats[chapter] = {
                            total: 0,
                            correct: 0,
                            incorrect: 0,
                            unanswered: 0,
                            score: 0
                        };
                    }
                    const perf = result.chapterPerformance[chapter];
                    chapterStats[chapter].total += perf.total;
                    chapterStats[chapter].correct += perf.correct;
                    chapterStats[chapter].incorrect += perf.incorrect;
                    chapterStats[chapter].unanswered += perf.unanswered;
                    chapterStats[chapter].score += perf.score;
                });
            }
        });
        
        // Generate HTML
        let html = '<div class="analytics-content">';
        html += '<h2>📊 Comprehensive Analytics</h2>';
        
        // Subject-wise Performance
        html += '<div class="analytics-section">';
        html += '<h3>Subject-wise Performance</h3>';
        html += '<div class="analytics-grid">';
        Object.keys(subjectStats).forEach(subject => {
            const stats = subjectStats[subject];
            const avgScore = stats.total > 0 ? (stats.totalScore / stats.total).toFixed(1) : 0;
            const avgPercentage = stats.totalMaxScore > 0 ? ((stats.totalScore / stats.totalMaxScore) * 100).toFixed(1) : 0;
            const avgAccuracy = (stats.correct + stats.incorrect) > 0 
                ? ((stats.correct / (stats.correct + stats.incorrect)) * 100).toFixed(1) 
                : 0;
            
            html += `
                <div class="analytics-card">
                    <h4>${subject}</h4>
                    <div class="analytics-metric">
                        <span>Total Tests:</span>
                        <strong>${stats.total}</strong>
                    </div>
                    <div class="analytics-metric">
                        <span>Average Score:</span>
                        <strong>${avgScore} (${avgPercentage}%)</strong>
                    </div>
                    <div class="analytics-metric">
                        <span>Average Accuracy:</span>
                        <strong>${avgAccuracy}%</strong>
                    </div>
                    <div class="analytics-metric">
                        <span>Total Correct:</span>
                        <strong>${stats.correct}</strong>
                    </div>
                    <div class="analytics-metric">
                        <span>Total Incorrect:</span>
                        <strong>${stats.incorrect}</strong>
                    </div>
                </div>
            `;
        });
        html += '</div></div>';
        
        // Student Performance
        html += '<div class="analytics-section">';
        html += '<h3>Student Performance Summary</h3>';
        html += '<div class="analytics-table">';
        html += '<table><thead><tr><th>Student</th><th>Tests</th><th>Subjects</th><th>Avg Score</th><th>Avg %</th></tr></thead><tbody>';
        
        const sortedStudents = Object.keys(studentStats).map(student => {
            const stats = studentStats[student];
            const avgScore = stats.total > 0 ? (stats.totalScore / stats.total).toFixed(1) : 0;
            const avgPercentage = stats.totalMaxScore > 0 ? ((stats.totalScore / stats.totalMaxScore) * 100).toFixed(1) : 0;
            return {
                name: student,
                ...stats,
                avgScore: parseFloat(avgScore),
                avgPercentage: parseFloat(avgPercentage),
                subjectCount: stats.subjects.size
            };
        }).sort((a, b) => b.avgPercentage - a.avgPercentage);
        
        sortedStudents.forEach(student => {
            html += `
                <tr>
                    <td><strong>${student.name}</strong></td>
                    <td>${student.total}</td>
                    <td>${student.subjectCount}</td>
                    <td>${student.avgScore}</td>
                    <td>${student.avgPercentage}%</td>
                </tr>
            `;
        });
        html += '</tbody></table></div></div>';
        
        // Chapter Performance
        if (Object.keys(chapterStats).length > 0) {
            html += '<div class="analytics-section">';
            html += '<h3>Overall Chapter Performance</h3>';
            html += '<div class="analytics-table">';
            html += '<table><thead><tr><th>Chapter</th><th>Total Q</th><th>Correct</th><th>Incorrect</th><th>Accuracy</th><th>Score</th></tr></thead><tbody>';
            
            const sortedChapters = Object.keys(chapterStats).map(chapter => {
                const stats = chapterStats[chapter];
                const accuracy = stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(1) : 0;
                return {
                    name: chapter,
                    ...stats,
                    accuracy: parseFloat(accuracy)
                };
            }).sort((a, b) => b.accuracy - a.accuracy);
            
            sortedChapters.forEach(chapter => {
                html += `
                    <tr>
                        <td><strong>${chapter.name}</strong></td>
                        <td>${chapter.total}</td>
                        <td>${chapter.correct}</td>
                        <td>${chapter.incorrect}</td>
                        <td>${chapter.accuracy}%</td>
                        <td>${chapter.score}</td>
                    </tr>
                `;
            });
            html += '</tbody></table></div></div>';
        }
        
        // Performance Trends
        html += '<div class="analytics-section">';
        html += '<h3>Performance Trends</h3>';
        html += '<div class="analytics-info">';
        const recentTests = dateStats.slice(-10).reverse();
        html += '<p><strong>Last 10 Tests:</strong></p>';
        html += '<div class="trend-list">';
        recentTests.forEach(test => {
            html += `<div class="trend-item">
                <span>${test.date}</span>
                <span>${test.score}/${test.maxScore} (${test.percentage}%)</span>
            </div>`;
        });
        html += '</div></div></div>';
        
        // Overall Statistics
        html += '<div class="analytics-section">';
        html += '<h3>Overall Statistics</h3>';
        html += '<div class="analytics-grid">';
        const overallAvg = allResults.length > 0 
            ? (allResults.reduce((sum, r) => sum + (r.totalScore || 0), 0) / allResults.length).toFixed(1)
            : 0;
        const totalCorrect = allResults.reduce((sum, r) => sum + (r.correctCount || 0), 0);
        const totalIncorrect = allResults.reduce((sum, r) => sum + (r.incorrectCount || 0), 0);
        const totalUnanswered = allResults.reduce((sum, r) => sum + (r.unansweredCount || 0), 0);
        const overallAccuracy = (totalCorrect + totalIncorrect) > 0 
            ? ((totalCorrect / (totalCorrect + totalIncorrect)) * 100).toFixed(1)
            : 0;
        
        html += `
            <div class="analytics-card">
                <h4>Overall Average Score</h4>
                <div class="analytics-value">${overallAvg}</div>
            </div>
            <div class="analytics-card">
                <h4>Overall Accuracy</h4>
                <div class="analytics-value">${overallAccuracy}%</div>
            </div>
            <div class="analytics-card">
                <h4>Total Questions Answered</h4>
                <div class="analytics-value">${totalCorrect + totalIncorrect}</div>
            </div>
            <div class="analytics-card">
                <h4>Total Unanswered</h4>
                <div class="analytics-value">${totalUnanswered}</div>
            </div>
        `;
        html += '</div></div>';
        
        html += '</div>';
        
        container.innerHTML = html;
    }

    displayAllTestResultsForAdmin() {
        const allResults = this.getAllTestResults();
        const container = document.getElementById('admin-results-container');
        
        if (allResults.length === 0) {
            container.innerHTML = '<p class="no-results">No test results available.</p>';
            return;
        }
        
        container.innerHTML = `
            <h2>All Test Results</h2>
            <div class="admin-results-list">
                ${allResults.map(result => `
                    <div class="admin-result-card">
                        <div class="result-header">
                            <h3>${result.subject || 'Unknown Subject'} Test</h3>
                            <span class="result-date">${new Date(result.timestamp).toLocaleString()}</span>
                        </div>
                        <div class="result-details">
                            <div class="detail-item">
                                <strong>Candidate:</strong> ${result.candidateName || 'Unknown'}
                            </div>
                            <div class="detail-item">
                                <strong>Score:</strong> ${result.totalScore || 0} / ${(result.questions?.length || 0) * 4}
                            </div>
                            <div class="detail-item">
                                <strong>Correct:</strong> ${result.correctCount || 0} | 
                                <strong>Incorrect:</strong> ${result.incorrectCount || 0} | 
                                <strong>Unanswered:</strong> ${result.unansweredCount || 0}
                            </div>
                            <button class="view-detail-btn btn-secondary" data-result-id="${result.id}">View Details</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add event listeners for view detail buttons
        container.querySelectorAll('.view-detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const resultId = e.target.getAttribute('data-result-id');
                this.viewResultDetails(resultId);
            });
        });
    }

    viewResultDetails(resultId) {
        const result = this.loadTestResultById(resultId);
        if (!result) return;
        
        // Show detailed results in a modal or new screen
        const detailScreen = document.getElementById('admin-result-detail-screen') || this.createAdminDetailScreen();
        this.displayAdminResultDetail(result, detailScreen);
        detailScreen.classList.add('active');
    }

    createAdminDetailScreen() {
        const screen = document.createElement('div');
        screen.id = 'admin-result-detail-screen';
        screen.className = 'screen';
        screen.innerHTML = `
            <div class="admin-detail-content">
                <div class="admin-header">
                    <h1>Test Result Details</h1>
                    <button class="back-to-admin-btn btn-secondary">Back to Dashboard</button>
                </div>
                <div id="admin-result-detail-container"></div>
            </div>
        `;
        document.querySelector('.container').appendChild(screen);
        
        screen.querySelector('.back-to-admin-btn').addEventListener('click', () => {
            screen.classList.remove('active');
            this.showAdminDashboard();
        });
        
        return screen;
    }

    displayAdminResultDetail(result, screen) {
        const container = screen.querySelector('#admin-result-detail-container');
        const subject = result.subject || 'Unknown';
        const maxScore = (result.questions?.length || 0) * 4;
        
        container.innerHTML = `
            <div class="result-summary">
                <h2>${subject} Test Result</h2>
                <p><strong>Date:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
                <p><strong>Candidate:</strong> ${result.candidateName || 'Unknown'}</p>
                <p><strong>Total Score:</strong> ${result.totalScore || 0} / ${maxScore}</p>
                <p><strong>Correct:</strong> ${result.correctCount || 0} | 
                   <strong>Incorrect:</strong> ${result.incorrectCount || 0} | 
                   <strong>Unanswered:</strong> ${result.unansweredCount || 0}</p>
            </div>
            <div class="detailed-analysis">
                ${this.generateDetailedAnalysis(result)}
            </div>
            <div class="answer-review-admin">
                ${this.generateAnswerReview(result)}
            </div>
        `;
    }

    generateDetailedAnalysis(result) {
        // Generate detailed analysis HTML for admin
        const chapterPerf = result.chapterPerformance || {};
        const chapters = Object.keys(chapterPerf);
        
        if (chapters.length === 0) return '<p>No chapter performance data available.</p>';
        
        return `
            <h3>Chapter-wise Performance</h3>
            <div class="chapter-performance-admin">
                ${chapters.map(ch => {
                    const perf = chapterPerf[ch];
                    const percentage = perf.total > 0 ? ((perf.correct / perf.total) * 100).toFixed(1) : 0;
                    return `
                        <div class="chapter-card-admin">
                            <h4>${ch}</h4>
                            <p>Correct: ${perf.correct}/${perf.total} (${percentage}%)</p>
                            <p>Score: ${perf.score}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    generateAnswerReview(result) {
        if (!result.questions || !result.answers) return '<p>No answer review available.</p>';
        
        return `
            <h3>Answer Review</h3>
            <div class="answer-review-list">
                ${result.questions.map((q, idx) => {
                    const userAnswer = result.answers[idx];
                    const isCorrect = userAnswer === q.correct;
                    const status = userAnswer === null ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect');
                    
                    return `
                        <div class="answer-item ${status}">
                            <div class="question-header">
                                <strong>Q${idx + 1}:</strong> ${q.question}
                            </div>
                            <div class="answer-details">
                                <p><strong>Your Answer:</strong> ${userAnswer === null ? 'Not answered' : q.options[userAnswer]}</p>
                                <p><strong>Correct Answer:</strong> ${q.options[q.correct]}</p>
                                <p><strong>Status:</strong> <span class="status-${status}">${status.toUpperCase()}</span></p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    selectSubject(subject) {
        console.log('selectSubject called with:', subject);
        this.selectedSubject = subject;
        this.isDescriptiveTest = false; // Physics Descriptive test removed
        this.is80MarksTest = false; // Disabled 80 marks test
        this.is40MarksTest = false; // Disabled 40 marks test - use regular questions for all subjects
        
        // Get base questions from questions.js
        let baseQuestions = allQuestions.filter(q => q.subject === subject);
        
        // Get uploaded questions for this subject
        const uploadedQuestions = this.getUploadedQuestions().filter(q => q.subject === subject);
        
        // Merge questions (uploaded questions take precedence if same ID)
        const questionMap = new Map();
        
        // Add base questions first
        baseQuestions.forEach(q => {
            questionMap.set(q.id, q);
        });
        
        // Add/override with uploaded questions
        uploadedQuestions.forEach(q => {
            questionMap.set(q.id, q);
        });
        
        // Convert back to array
        let allSubjectQuestions = Array.from(questionMap.values());
        
        // For Mathematics, ensure up to 50 unique questions
        if (subject === 'Mathematics') {
            // Remove duplicates by ID to ensure uniqueness
            const uniqueQuestions = [];
            const seenIds = new Set();
            for (const q of allSubjectQuestions) {
                if (!seenIds.has(q.id)) {
                    seenIds.add(q.id);
                    uniqueQuestions.push(q);
                }
            }
            allSubjectQuestions = uniqueQuestions;
            
            // Shuffle the questions
            for (let i = allSubjectQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allSubjectQuestions[i], allSubjectQuestions[j]] = [allSubjectQuestions[j], allSubjectQuestions[i]];
            }
            
            // Ensure exactly 50 questions for Mathematics
            if (allSubjectQuestions.length >= 50) {
                this.questions = allSubjectQuestions.slice(0, 50);
            } else {
                // If fewer than 50 available, show warning but use all available
                console.warn(`Only ${allSubjectQuestions.length} Mathematics questions available. Need at least 50.`);
                this.questions = allSubjectQuestions;
            }
        } else {
            // For all other subjects, ensure exactly 50 unique questions
            // Remove duplicates by ID to ensure uniqueness
            const uniqueQuestions = [];
            const seenIds = new Set();
            for (const q of allSubjectQuestions) {
                if (!seenIds.has(q.id)) {
                    seenIds.add(q.id);
                    uniqueQuestions.push(q);
                }
            }
            allSubjectQuestions = uniqueQuestions;
            
            // Shuffle the questions
            for (let i = allSubjectQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allSubjectQuestions[i], allSubjectQuestions[j]] = [allSubjectQuestions[j], allSubjectQuestions[i]];
            }
            
            // Ensure exactly 50 questions for all subjects
            if (allSubjectQuestions.length >= 50) {
                this.questions = allSubjectQuestions.slice(0, 50);
            } else {
                // If fewer than 50 available, show warning but use all available
                console.warn(`Only ${allSubjectQuestions.length} ${subject} questions available. Need at least 50.`);
                this.questions = allSubjectQuestions;
            }
        }
        
        if (this.questions.length === 0) {
            alert(`${subject} test is coming soon! Questions are being added.`);
            return;
        }
        
        // Reset arrays based on questions
        this.answers = new Array(this.questions.length).fill(null);
        this.markedForReview = new Array(this.questions.length).fill(false);
        this.currentQuestionIndex = 0;
        
        // Update welcome screen with subject-specific info
        this.updateWelcomeScreenForSubject(subject);
        
        // Show welcome screen and hide subject selection
        const subjectScreen = document.getElementById('subject-selection-screen');
        const welcomeScreen = document.getElementById('welcome-screen');
        
        console.log('Subject screen element:', subjectScreen ? 'Found' : 'NOT FOUND');
        console.log('Welcome screen element:', welcomeScreen ? 'Found' : 'NOT FOUND');
        
        if (subjectScreen) {
            subjectScreen.classList.remove('active');
            subjectScreen.style.display = 'none';
            console.log('Hidden subject selection screen');
        } else {
            console.error('subject-selection-screen element not found!');
        }
        
        if (welcomeScreen) {
            welcomeScreen.classList.add('active');
            welcomeScreen.style.display = 'block';
            console.log('Shown welcome screen');
        } else {
            console.error('welcome-screen element not found!');
        }
        
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('selectSubject completed for:', subject);
    }
    
    updateWelcomeScreenForSubject(subject) {
        const welcomeTitle = document.getElementById('welcome-title');
        const welcomeSubtitle = document.getElementById('welcome-subtitle');
        const subjectBadge = document.getElementById('selected-subject-badge');
        const subjectName = document.getElementById('selected-subject-name');
        const testInfo = document.querySelector('.test-info .info-card ul');
        
        if (welcomeTitle) welcomeTitle.textContent = `${subject} Mock Test`;
        if (welcomeSubtitle) {
            welcomeSubtitle.textContent = '10th Grade CBSE - Tough Questions';
        }
        if (subjectBadge) {
            subjectBadge.style.display = 'block';
        }
        if (subjectName) {
            subjectName.textContent = subject;
        }
        
        if (testInfo) {
            const questionCount = this.questions.length;
            
            // Calculate duration based on question difficulty
            const totalDurationSeconds = this.calculateTestDuration();
            const totalMinutes = Math.floor(totalDurationSeconds / 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            let durationText = '';
            if (hours > 0) {
                durationText = minutes > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}` : `${hours} hour${hours > 1 ? 's' : ''}`;
            } else {
                durationText = `${minutes} minute${minutes > 1 ? 's' : ''}`;
            }
            
            // Calculate difficulty breakdown
            const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
            this.questions.forEach(q => {
                const complexity = this.getQuestionComplexity(q);
                if (difficultyCounts.hasOwnProperty(complexity)) {
                    difficultyCounts[complexity]++;
                }
            });
            
            if (this.is40MarksTest) {
                const totalMarks = this.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
                const marksBreakdown = {
                    1: this.questions.filter(q => q.marks === 1).length,
                    2: this.questions.filter(q => q.marks === 2).length,
                    3: this.questions.filter(q => q.marks === 3).length,
                    5: this.questions.filter(q => q.marks === 5).length
                };
                testInfo.innerHTML = `
                    <li><strong>Total Questions:</strong> ${questionCount}</li>
                    <li><strong>Total Marks:</strong> ${totalMarks}</li>
                    <li><strong>Duration:</strong> ${durationText} (${totalMinutes} minutes)</li>
                    <li><strong>Difficulty Breakdown:</strong> ${difficultyCounts.easy} Easy, ${difficultyCounts.medium} Medium, ${difficultyCounts.hard} Hard</li>
                    <li><strong>Marking Scheme:</strong> ${marksBreakdown[1]}×1, ${marksBreakdown[2]}×2, ${marksBreakdown[3]}×3, ${marksBreakdown[5]}×5 marks</li>
                    <li><strong>Question Type:</strong> Multiple Choice (MCQ)</li>
                    <li><strong>Question Source:</strong> Years 2020-2025</li>
                    <li><strong>Marking:</strong> Variable marks per question, negative marking applies</li>
                `;
            } else {
                testInfo.innerHTML = `
                    <li><strong>Total Questions:</strong> ${questionCount}</li>
                    <li><strong>Duration:</strong> ${durationText} (${totalMinutes} minutes)</li>
                    <li><strong>Difficulty Breakdown:</strong> ${difficultyCounts.easy} Easy, ${difficultyCounts.medium} Medium, ${difficultyCounts.hard} Hard</li>
                    <li><strong>${subject}:</strong> ${questionCount} questions (100%)</li>
                    <li><strong>Question Source:</strong> Years 2020-2025</li>
                    <li><strong>Marking:</strong> +4 for correct, -1 for incorrect</li>
                `;
            }
        }
    }
    
    exitTest() {
        const answeredCount = this.answers.filter(a => a !== null).length;
        const message = `Are you sure you want to exit the test?\n\n` +
                       `Questions answered: ${answeredCount} / ${this.questions.length}\n\n` +
                       `Your progress will be lost and the test cannot be resumed.`;
        
        if (confirm(message)) {
            // Stop proctoring
            this.stopProctoring();
            
            // Stop all timers
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
            // Reset test state
            this.testStarted = false;
            this.currentQuestionIndex = 0;
            this.answers = [];
            this.markedForReview = [];
            this.timeRemaining = 60 * 60;
            
            // Exit fullscreen if active
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
            }
            
            // Stop background music
            // Return to subject selection
            this.goToSubjectSelection();
        }
    }

    goToSubjectSelection() {
        // Reset selected subject
        this.selectedSubject = null;
        this.questions = [];
        this.answers = [];
        this.markedForReview = [];
        
        // Hide subject badge
        const subjectBadge = document.getElementById('selected-subject-badge');
        if (subjectBadge) {
            subjectBadge.style.display = 'none';
        }
        
        // Hide all screens
        const welcomeScreen = document.getElementById('welcome-screen');
        const testScreen = document.getElementById('test-screen');
        const resultsScreen = document.getElementById('results-screen');
        const historyScreen = document.getElementById('test-history-screen');
        const subjectScreen = document.getElementById('subject-selection-screen');
        
        if (welcomeScreen) {
            welcomeScreen.classList.remove('active');
            welcomeScreen.style.display = 'none';
        }
        if (testScreen) {
            testScreen.classList.remove('active');
            testScreen.style.display = 'none';
        }
        if (resultsScreen) {
            resultsScreen.classList.remove('active');
            resultsScreen.style.display = 'none';
        }
        if (historyScreen) {
            historyScreen.classList.remove('active');
            historyScreen.style.display = 'none';
        }
        
        // Show subject selection screen
        if (subjectScreen) {
            subjectScreen.classList.add('active');
            subjectScreen.style.display = 'block';
        }
    }
    
    startTest() {
        console.log('startTest() called');
        console.log('Selected subject:', this.selectedSubject);
        console.log('Questions count:', this.questions.length);
        
        if (!this.selectedSubject) {
            alert('Please select a subject first.');
            return;
        }
        
        if (this.questions.length === 0) {
            alert('No questions available for this subject.');
            return;
        }
        
        this.testStarted = true;
        
        // Shuffle questions for each test
        this.shuffleQuestions();
        
        // Hide welcome screen and show test screen
        const welcomeScreen = document.getElementById('welcome-screen');
        const testScreen = document.getElementById('test-screen');
        
        console.log('Welcome screen element:', welcomeScreen ? 'Found' : 'NOT FOUND');
        console.log('Test screen element:', testScreen ? 'Found' : 'NOT FOUND');
        
        if (welcomeScreen) {
            welcomeScreen.classList.remove('active');
            welcomeScreen.style.display = 'none';
            console.log('Welcome screen hidden');
        }
        
        if (testScreen) {
            testScreen.classList.add('active');
            testScreen.style.display = 'block';
            console.log('Test screen shown');
        }
        
        // Initialize proctoring system (includes fullscreen request)
        this.initializeProctoring();
        
        // Calculate test duration based on question difficulty
        this.timeRemaining = this.calculateTestDuration();
        this.currentQuestionIndex = 0;
        
        // Render subject icon for the selected subject
        if (this.selectedSubject) {
            this.renderSubjectIcon(this.selectedSubject);
        }
        
        this.renderQuestion();
        this.renderQuestionPalette();
        this.startTimer();
    }
    
    initializeProctoring() {
        console.log('Initializing proctoring system...');
        
        // Reset violations
        this.proctorViolations = 0;
        this.proctorWarnings = [];
        this.lastActivityTime = Date.now();
        
        // Request fullscreen
        this.requestFullScreen();
        
        // Block right-click context menu
        document.addEventListener('contextmenu', (e) => {
            if (this.testStarted) {
                e.preventDefault();
                this.recordViolation('Right-click attempted');
                return false;
            }
        });
        
        // Block copy, cut, paste
        document.addEventListener('copy', (e) => {
            if (this.testStarted) {
                e.preventDefault();
                this.recordViolation('Copy attempted');
                return false;
            }
        });
        
        document.addEventListener('cut', (e) => {
            if (this.testStarted) {
                e.preventDefault();
                this.recordViolation('Cut attempted');
                return false;
            }
        });
        
        document.addEventListener('paste', (e) => {
            if (this.testStarted) {
                e.preventDefault();
                this.recordViolation('Paste attempted');
                return false;
            }
        });
        
        // Block keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!this.testStarted) return;
            
            // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+S, Ctrl+P, Ctrl+U
            if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a', 's', 'p', 'u'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                this.recordViolation(`Keyboard shortcut blocked: ${e.key}`);
                return false;
            }
            
            // Block F12 (Developer Tools)
            if (e.key === 'F12') {
                e.preventDefault();
                this.recordViolation('Developer tools access attempted');
                return false;
            }
            
            // Block Ctrl+Shift+I (Developer Tools)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                this.recordViolation('Developer tools access attempted');
                return false;
            }
        });
        
        // Monitor tab visibility
        document.addEventListener('visibilitychange', () => {
            if (!this.testStarted) return;
            
            if (document.hidden) {
                this.isTabActive = false;
                this.recordViolation('Tab switched or minimized');
            } else {
                this.isTabActive = true;
                this.lastActivityTime = Date.now();
            }
        });
        
        // Monitor window blur
        window.addEventListener('blur', () => {
            if (this.testStarted) {
                this.recordViolation('Window lost focus');
            }
        });
        
        // Monitor fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            this.isFullScreen = !!document.fullscreenElement;
            if (!this.isFullScreen && this.testStarted) {
                this.recordViolation('Exited fullscreen mode');
                setTimeout(() => this.requestFullScreen(), 500);
            }
        });
        
        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullScreen = !!document.webkitFullscreenElement;
        });
        
        document.addEventListener('mozfullscreenchange', () => {
            this.isFullScreen = !!document.mozFullScreenElement;
        });
        
        // Monitor activity
        const updateActivity = () => {
            if (this.testStarted) {
                this.lastActivityTime = Date.now();
            }
        };
        
        document.addEventListener('mousedown', updateActivity);
        document.addEventListener('mousemove', updateActivity);
        document.addEventListener('keypress', updateActivity);
        document.addEventListener('scroll', updateActivity);
        document.addEventListener('touchstart', updateActivity);
        
        // Periodic proctoring check
        this.proctorCheckInterval = setInterval(() => {
            if (this.testStarted) {
                this.checkProctoringViolations();
            }
        }, 5000); // Check every 5 seconds
        
        console.log('Proctoring system initialized');
    }
    
    requestFullScreen() {
        const element = document.documentElement;
        
        if (element.requestFullscreen) {
            element.requestFullscreen().then(() => {
                this.isFullScreen = true;
                console.log('Fullscreen enabled');
            }).catch((err) => {
                console.log('Fullscreen request denied:', err);
                if (this.testStarted) {
                    this.showProctorWarning('Please enable fullscreen mode for the test');
                }
            });
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
            this.isFullScreen = true;
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            this.isFullScreen = true;
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
            this.isFullScreen = true;
        }
    }
    
    checkProctoringViolations() {
        if (!this.testStarted) return;
        
        // Check if tab is still active
        if (!this.isTabActive) {
            this.recordViolation('Tab inactive for extended period');
        }
        
        // Check if still in fullscreen
        if (!this.isFullScreen) {
            this.recordViolation('Not in fullscreen mode');
            this.requestFullScreen();
        }
        
        // Check for inactivity (more than 2 minutes)
        const inactivityTime = Date.now() - this.lastActivityTime;
        if (inactivityTime > 120000) { // 2 minutes
            this.recordViolation('Extended inactivity detected');
        }
    }
    
    recordViolation(type) {
        if (!this.testStarted) return;
        
        this.proctorViolations++;
        const violation = {
            type: type,
            timestamp: new Date().toISOString(),
            timeRemaining: this.timeRemaining
        };
        
        this.proctorWarnings.push(violation);
        console.warn('Proctoring violation:', violation);
        
        // Update UI
        const violationCountEl = document.getElementById('violation-count');
        if (violationCountEl) {
            violationCountEl.textContent = `Violations: ${this.proctorViolations}`;
            violationCountEl.style.display = 'block';
        }
        
        // Show warning
        this.showProctorWarning(`Warning: ${type}. Violations: ${this.proctorViolations}/${this.maxViolations}`);
        
        // Auto-submit if max violations reached
        if (this.proctorViolations >= this.maxViolations) {
            alert(`Maximum violations (${this.maxViolations}) reached. Test will be submitted automatically.`);
            this.submitTest();
        }
    }
    
    showProctorWarning(message) {
        const warningModal = document.getElementById('proctor-warning-modal');
        if (warningModal) {
            const warningText = document.getElementById('proctor-warning-message');
            const violationCount = document.getElementById('modal-violation-count');
            
            if (warningText) {
                warningText.textContent = message;
            }
            if (violationCount) {
                violationCount.textContent = this.proctorViolations;
            }
            
            warningModal.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                warningModal.style.display = 'none';
            }, 5000);
        }
        
        // Also update status bar
        const proctorWarning = document.getElementById('proctor-warning');
        if (proctorWarning) {
            proctorWarning.textContent = message;
            proctorWarning.style.display = 'block';
        }
    }
    
    stopProctoring() {
        console.log('Stopping proctoring system...');
        
        // Clear interval
        if (this.proctorCheckInterval) {
            clearInterval(this.proctorCheckInterval);
            this.proctorCheckInterval = null;
        }
        
        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        } else if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        }
        
        this.isFullScreen = false;
        
        console.log('Proctoring system stopped');
    }
    
    shuffleQuestions() {
        // Fisher-Yates shuffle algorithm
        const shuffled = [...this.questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this.questions = shuffled;
        
        // Reset answers and marked arrays for shuffled questions
        this.answers = new Array(this.questions.length).fill(null);
        this.markedForReview = new Array(this.questions.length).fill(false);
        this.currentQuestionIndex = 0;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimer();
            
            if (this.timeRemaining <= 0) {
                this.submitTest();
            }
        }, 1000);
        
        this.updateTimer();
    }
    
    getQuestionComplexity(question) {
        // Check if question has explicit difficulty field
        if (question.difficulty) {
            return question.difficulty.toLowerCase(); // 'easy', 'medium', 'hard'
        }
        
        // Infer complexity based on question characteristics
        const questionText = question.question.toLowerCase();
        const questionLength = question.question.length;
        
        // Hard indicators
        const hardKeywords = ['prove', 'derive', 'demonstrate', 'show that', 'verify', 'establish'];
        const hasHardKeywords = hardKeywords.some(keyword => questionText.includes(keyword));
        
        // Medium indicators
        const mediumKeywords = ['find', 'calculate', 'solve', 'determine', 'evaluate'];
        const hasMediumKeywords = mediumKeywords.some(keyword => questionText.includes(keyword));
        
        // Chapter-based complexity (some chapters are inherently harder)
        const hardChapters = [
            'polynomials', 'quadratic equations', 'arithmetic progressions',
            'introduction to trigonometry', 'some applications of trigonometry',
            'triangles', 'circles', 'coordinate geometry'
        ];
        const isHardChapter = hardChapters.some(chapter => 
            question.chapter && question.chapter.toLowerCase().includes(chapter.toLowerCase())
        );
        
        // Determine complexity
        if (hasHardKeywords || (questionLength > 200 && isHardChapter)) {
            return 'hard';
        } else if (hasMediumKeywords || questionLength > 150 || isHardChapter) {
            return 'medium';
        } else {
            return 'easy';
        }
    }
    
    getTimeForComplexity(complexity) {
        // Time allocations based on complexity (in seconds)
        const timeAllocations = {
            'easy': 60,      // 1 minute per question
            'medium': 90,    // 1.5 minutes per question
            'hard': 120      // 2 minutes per question
        };
        
        return timeAllocations[complexity] || timeAllocations['medium'];
    }
    
    calculateTestDuration() {
        // Calculate total time based on question difficulties
        let totalTime = 0;
        
        // Sum up time for each question based on its complexity
        this.questions.forEach(question => {
            const complexity = this.getQuestionComplexity(question);
            const questionTime = this.getTimeForComplexity(complexity);
            totalTime += questionTime;
        });
        
        // Add buffer time for review and navigation (15 minutes)
        const bufferTime = 15 * 60; // 15 minutes in seconds
        totalTime += bufferTime;
        
        // Set minimum duration (60 minutes) and maximum duration (120 minutes)
        const minDuration = 60 * 60; // 60 minutes
        const maxDuration = 120 * 60; // 120 minutes
        
        // For 40 marks mathematics test, use 90 minutes as base
        if (this.is40MarksTest) {
            const baseTime = 90 * 60; // 90 minutes
            // Add time based on difficulty but cap at 120 minutes
            return Math.min(Math.max(totalTime, baseTime), maxDuration);
        }
        
        // Ensure duration is within reasonable bounds
        return Math.min(Math.max(totalTime, minDuration), maxDuration);
    }
    
    // Per-question timer removed

    updateTimer() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timerElement = document.getElementById('timer');
        
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Add warning classes
        timerElement.classList.remove('warning', 'danger');
        if (this.timeRemaining <= 300) { // 5 minutes
            timerElement.classList.add('danger');
        } else if (this.timeRemaining <= 600) { // 10 minutes
            timerElement.classList.add('warning');
        }
    }

    renderSubjectIcon(subject) {
        const iconContainer = document.getElementById('subject-icon-test');
        if (!iconContainer) return;
        
        const subjectIcons = {
            'Mathematics': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="rgba(102, 126, 234, 0.2)"/>
                <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="#667eea" opacity="0.9"/>
                <text x="50" y="65" font-size="20" fill="#667eea" text-anchor="middle" font-weight="bold">π</text>
            </svg>`,
            'Physics': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="rgba(245, 87, 108, 0.2)"/>
                <circle cx="35" cy="35" r="8" fill="#f5576c" opacity="0.9"/>
                <circle cx="65" cy="35" r="8" fill="#f5576c" opacity="0.9"/>
                <circle cx="50" cy="65" r="8" fill="#f5576c" opacity="0.9"/>
                <path d="M35 35 L50 65 M65 35 L50 65" stroke="#f5576c" stroke-width="2" opacity="0.9"/>
            </svg>`,
            'Chemistry': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="rgba(79, 172, 254, 0.2)"/>
                <rect x="35" y="30" width="30" height="40" rx="5" fill="#4facfe" opacity="0.9"/>
                <rect x="40" y="35" width="20" height="30" fill="rgba(255,255,255,0.5)"/>
                <circle cx="50" cy="50" r="5" fill="#4facfe" opacity="0.9"/>
                <path d="M50 50 L50 70" stroke="#4facfe" stroke-width="2" opacity="0.9"/>
            </svg>`,
            'Biology': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="rgba(67, 233, 123, 0.2)"/>
                <ellipse cx="50" cy="50" rx="25" ry="35" fill="#43e97b" opacity="0.9"/>
                <ellipse cx="50" cy="45" rx="20" ry="25" fill="rgba(255,255,255,0.3)"/>
                <circle cx="45" cy="40" r="3" fill="#43e97b" opacity="0.9"/>
                <circle cx="55" cy="40" r="3" fill="#43e97b" opacity="0.9"/>
                <path d="M40 55 Q50 60 60 55" stroke="#43e97b" stroke-width="2" fill="none" opacity="0.9"/>
            </svg>`,
            'Social Science': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="rgba(250, 112, 154, 0.2)"/>
                <rect x="30" y="35" width="40" height="30" rx="3" fill="#fa709a" opacity="0.9"/>
                <rect x="35" y="40" width="30" height="20" fill="rgba(255,255,255,0.3)"/>
                <line x1="40" y1="50" x2="60" y2="50" stroke="#fa709a" stroke-width="2" opacity="0.9"/>
                <line x1="50" y1="45" x2="50" y2="55" stroke="#fa709a" stroke-width="2" opacity="0.9"/>
                <circle cx="50" cy="75" r="8" fill="#fa709a" opacity="0.9"/>
            </svg>`,
            'English': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="rgba(155, 89, 182, 0.2)"/>
                <path d="M30 30 L50 20 L70 30 L70 50 L50 60 L30 50 Z" fill="#9b59b6" opacity="0.9"/>
                <text x="50" y="45" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">E</text>
                <path d="M35 65 L45 75 M50 70 L50 80 M55 75 L65 65" stroke="#9b59b6" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
            </svg>`
        };
        
        iconContainer.innerHTML = subjectIcons[subject] || subjectIcons['Mathematics'];
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionNum = this.currentQuestionIndex + 1;
        
        // Stop timer for previous question and start for current
        
        // Update question number
        document.getElementById('question-number').textContent = questionNum;
        document.getElementById('total-questions').textContent = this.questions.length;
        
        // Update subject badge (use question's subject property since questions are shuffled)
        const subject = question.subject || 'Mathematics';
        document.getElementById('subject-badge').textContent = subject;
        
        // Render subject icon
        this.renderSubjectIcon(subject);
        
        // Update complexity badge
        const complexity = this.getQuestionComplexity(question);
        const complexityBadge = document.getElementById('complexity-badge');
        if (complexityBadge) {
            const complexityLabels = {
                'easy': 'Easy',
                'medium': 'Medium',
                'hard': 'Hard'
            };
            complexityBadge.textContent = complexityLabels[complexity] || 'Medium';
            complexityBadge.className = 'complexity-badge ' + complexity;
        }
        
        // Update year badge
        const year = question.year || '2023';
        document.getElementById('year-badge').textContent = `CBSE ${year}`;
        
        // Update marks badge
        const marksBadge = document.querySelector('.marks-badge');
        if (marksBadge && question.marks) {
            marksBadge.textContent = `${question.marks} Marks`;
        }
        
        // Update chapter name and source link
        const questionMetaInfo = document.getElementById('question-meta-info');
        const chapterNameEl = document.getElementById('chapter-name');
        const sourceLinkEl = document.getElementById('source-link');
        
        if (question.chapter || question.source) {
            questionMetaInfo.style.display = 'block';
            
            // Display chapter name
            if (question.chapter && chapterNameEl) {
                chapterNameEl.textContent = question.chapter;
            } else if (chapterNameEl) {
                chapterNameEl.textContent = 'General';
            }
            
            // Display source link
            if (question.source && sourceLinkEl) {
                sourceLinkEl.href = question.source;
                // Update link text based on URL type
                if (question.source.includes('SQP_CLASSX') || question.source.includes('SQP')) {
                    sourceLinkEl.textContent = 'View CBSE Sample Papers';
                } else if (question.source.includes('.pdf')) {
                    sourceLinkEl.textContent = 'View Question Paper PDF';
                } else {
                    sourceLinkEl.textContent = 'View Source';
                }
                sourceLinkEl.style.display = 'inline-block';
            } else if (sourceLinkEl) {
                sourceLinkEl.style.display = 'none';
            }
        } else {
            questionMetaInfo.style.display = 'none';
        }
        
        // Update question text
        const questionTextEl = document.getElementById('question-text');
        questionTextEl.textContent = question.question;
        
        // Start timer for current question
        if (this.testStarted) {
        }
        
        // Render diagram if available
        this.renderDiagram(question);
        
        // Show options
        const optionsContainer = document.getElementById('options');
        const descriptiveSection = document.getElementById('descriptive-answer-section');
        
        // Always show options, hide descriptive section
        if (optionsContainer) optionsContainer.style.display = 'block';
        if (descriptiveSection) descriptiveSection.style.display = 'none';
        
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                if (this.answers[this.currentQuestionIndex] === index) {
                    optionDiv.classList.add('selected');
                }
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'answer';
                radio.value = index;
                radio.id = `option-${index}`;
                radio.checked = this.answers[this.currentQuestionIndex] === index;
                radio.addEventListener('change', () => {
                    this.selectAnswer(index);
                });
                
                const label = document.createElement('label');
                label.className = 'option-label';
                label.htmlFor = `option-${index}`;
                label.textContent = option;
                
                optionDiv.appendChild(radio);
                optionDiv.appendChild(label);
                optionDiv.addEventListener('click', () => {
                    radio.checked = true;
                    this.selectAnswer(index);
                });
                
                optionsContainer.appendChild(optionDiv);
            });
        
        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentQuestionIndex === 0;
        document.getElementById('next-btn').disabled = this.currentQuestionIndex === this.questions.length - 1;
        
        // Update mark for review button
        const markBtn = document.getElementById('mark-review-btn');
        if (this.markedForReview[this.currentQuestionIndex]) {
            markBtn.classList.add('marked');
            markBtn.textContent = 'Unmark Review';
        } else {
            markBtn.classList.remove('marked');
            markBtn.textContent = 'Mark for Review';
        }
        
        // Update question palette
        this.updateQuestionPalette();
    }
    
    renderDiagram(question) {
        const diagramContainer = document.getElementById('question-diagram');
        if (!diagramContainer) {
            return;
        }
        
        diagramContainer.innerHTML = '';
        
        if (!question || !question.diagram) {
            return;
        }
        
        // Create diagram element
        const diagramDiv = document.createElement('div');
        diagramDiv.className = 'diagram-wrapper';
        
        // Use innerHTML to insert SVG
        try {
            diagramDiv.innerHTML = question.diagram;
            diagramContainer.appendChild(diagramDiv);
        } catch (e) {
            console.error('Error rendering diagram:', e);
        }
    }

    selectAnswer(answerIndex) {
        this.answers[this.currentQuestionIndex] = answerIndex;
        this.renderQuestion();
    }

    toggleMarkForReview() {
        this.markedForReview[this.currentQuestionIndex] = !this.markedForReview[this.currentQuestionIndex];
        this.renderQuestion();
        this.updateQuestionPalette();
    }

    clearAnswer() {
        this.answers[this.currentQuestionIndex] = null;
        this.renderQuestion();
        this.updateQuestionPalette();
    }

    navigateQuestion(direction) {
        // Stop timer for current question before navigating
        
        const newIndex = this.currentQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < this.questions.length) {
            this.currentQuestionIndex = newIndex;
            this.renderQuestion();
        }
    }

    goToQuestion(index) {
        // Stop timer for current question before navigating
        
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
            this.renderQuestion();
        }
    }

    renderQuestionPalette() {
        const mathematicsGrid = document.getElementById('mathematics-questions');
        
        mathematicsGrid.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const questionNum = index + 1;
            const numberDiv = document.createElement('div');
            numberDiv.className = 'question-number';
            numberDiv.textContent = questionNum;
            
            // Check if answered
            const isAnswered = this.answers[index] !== null;
            
            if (isAnswered) {
                numberDiv.classList.add('answered');
            } else if (this.markedForReview[index]) {
                numberDiv.classList.add('marked');
            }
            
            if (index === this.currentQuestionIndex) {
                numberDiv.classList.add('current');
            }
            
            mathematicsGrid.appendChild(numberDiv);
        });
    }

    updateQuestionPalette() {
        this.renderQuestionPalette();
    }

    confirmSubmit() {
        // Count unanswered questions
        const unanswered = this.answers.filter(a => a === null).length;
        const message = `Are you sure you want to submit the test?\n\nUnanswered questions: ${unanswered}\n\nYou cannot change your answers after submission.`;
        
        if (confirm(message)) {
            this.submitTest();
        }
    }

    submitTest() {
        // Stop proctoring
        this.stopProctoring();
        
        // Stop all timers
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.calculateResults();
        document.getElementById('test-screen').classList.remove('active');
        document.getElementById('results-screen').classList.add('active');
    }

    calculateResults() {
        // Regular MCQ test scoring
        let correctCount = 0;
        let incorrectCount = 0;
        let unansweredCount = 0;
        let subjectScore = 0;
        const subject = this.selectedSubject || 'Mathematics';
        
        // Check if this is 40 marks test with variable marking
        const isVariableMarking = this.is40MarksTest && this.questions.some(q => q.marks && q.marks !== 4);
        
        // Track chapter-wise performance
        const chapterPerformance = {};
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.answers[index];
            const questionNum = index + 1;
            const chapter = question.chapter || 'Unknown';
            const questionSubject = question.subject || subject;
            
            // Get marks for this question (default to 4 for regular tests, or question.marks for 80 marks test)
            const questionMarks = isVariableMarking ? (question.marks || 1) : 4;
            const negativeMark = isVariableMarking ? Math.floor(questionMarks / 3) : 1; // Negative marking: 1/3 of marks
            
            // Initialize chapter tracking
            if (!chapterPerformance[chapter]) {
                chapterPerformance[chapter] = {
                    subject: questionSubject,
                    total: 0,
                    correct: 0,
                    incorrect: 0,
                    unanswered: 0,
                    score: 0
                };
            }
            
            chapterPerformance[chapter].total++;
            
            if (userAnswer === null) {
                unansweredCount++;
                chapterPerformance[chapter].unanswered++;
            } else if (userAnswer === question.correct) {
                correctCount++;
                chapterPerformance[chapter].correct++;
                chapterPerformance[chapter].score += questionMarks;
                subjectScore += questionMarks;
            } else {
                incorrectCount++;
                chapterPerformance[chapter].incorrect++;
                chapterPerformance[chapter].score -= negativeMark;
                // Negative marking
                subjectScore -= negativeMark;
            }
        });
        
        const totalScore = subjectScore;
        const maxScore = isVariableMarking 
            ? this.questions.reduce((sum, q) => sum + (q.marks || 1), 0)
            : this.questions.length * 4;
        const percentage = maxScore > 0 ? (totalScore / maxScore * 100) : 0;
        
        // Update results display
        document.getElementById('total-score').textContent = totalScore;
        document.getElementById('correct-count').textContent = correctCount;
        document.getElementById('incorrect-count').textContent = incorrectCount;
        document.getElementById('unanswered-count').textContent = unansweredCount;
        document.getElementById('mathematics-score').textContent = `${subjectScore}/${maxScore}`;
        const resultSubjectName = document.getElementById('result-subject-name');
        if (resultSubjectName) {
            resultSubjectName.textContent = subject;
        }
        
        // Celebrate if score is 95% or above
        if (percentage >= 95) {
            this.celebrateAchievement(percentage);
        }
        
        // Display chapter-wise performance and detailed analysis only for admin
        if (this.userType === 'admin') {
            this.displayChapterPerformance(chapterPerformance);
            this.displayResultsAnalysis({
                correctCount,
                incorrectCount,
                unansweredCount,
                totalScore,
                mathematicsScore: subjectScore,
                chapterPerformance
            });
            this.displayAnswerReview();
        } else {
            // For students, show only basic results
            this.hideDetailedResults();
        }
        
        // Store current results for PDF generation
        this.currentResults = {
            correctCount,
            incorrectCount,
            unansweredCount,
            totalScore,
            mathematicsScore: subjectScore,
            chapterPerformance,
            answers: this.answers,
            questions: this.questions,
            subject: subject,
            candidateName: 'Siddesh Anand',
            timestamp: new Date().toISOString(),
            proctorViolations: this.proctorViolations,
            proctorWarnings: this.proctorWarnings
        };
        
        // Save results to localStorage
        this.saveResultsToStorage(this.currentResults);
    }

    hideDetailedResults() {
        // Hide detailed analysis sections for students
        const resultsAnalysis = document.getElementById('results-analysis');
        const chapterPerformance = document.getElementById('chapter-performance');
        const answerReview = document.getElementById('answer-review');
        
        if (resultsAnalysis) resultsAnalysis.style.display = 'none';
        if (chapterPerformance) chapterPerformance.style.display = 'none';
        if (answerReview) answerReview.style.display = 'none';
        
        // Hide review answers button for students
        const reviewBtn = document.getElementById('review-answers-btn');
        if (reviewBtn) reviewBtn.style.display = 'none';
    }
    
    displayDescriptiveCorrection() {
        const correctionSection = document.getElementById('descriptive-correction');
        const questionsList = document.getElementById('correction-questions-list');
        
        if (!correctionSection || !questionsList) return;
        
        // Show correction section
        correctionSection.style.display = 'block';
        
        // Get current marks or initialize
        const marks = this.currentResults.marks || new Array(this.questions.length).fill(null);
        const totalMarks = this.currentResults.totalMarks || this.questions.reduce((sum, q) => sum + (q.marks || 5), 0);
        const currentTotal = marks.reduce((sum, m) => sum + (m !== null ? m : 0), 0);
        const marksAssigned = marks.filter(m => m !== null).length;
        const isCorrected = this.currentResults.totalScore !== null && this.currentResults.totalScore !== undefined;
        
        // Generate correction interface for each question
        let html = `
            <div class="correction-summary">
                <div class="summary-card">
                    <h3>Correction Summary</h3>
                    <div class="summary-stats">
                        <div class="stat-item">
                            <span class="stat-label">Total Marks:</span>
                            <span class="stat-value">${totalMarks}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Marks Assigned:</span>
                            <span class="stat-value">${marksAssigned}/${this.questions.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Current Score:</span>
                            <span class="stat-value ${isCorrected ? 'score-calculated' : ''}">${isCorrected ? this.currentResults.totalScore.toFixed(1) : currentTotal.toFixed(1)}/${totalMarks}</span>
                        </div>
                        ${isCorrected ? `
                        <div class="stat-item">
                            <span class="stat-label">Percentage:</span>
                            <span class="stat-value score-calculated">${((this.currentResults.totalScore / totalMarks) * 100).toFixed(1)}%</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        this.questions.forEach((question, index) => {
            const questionNum = index + 1;
            const userAnswer = this.answers[index] || '';
            const maxMarks = question.marks || 5;
            const currentMarks = marks[index] !== null ? marks[index] : '';
            
            html += `
                <div class="correction-question-card">
                    <div class="correction-question-header">
                        <h3>Question ${questionNum} (${maxMarks} Marks)</h3>
                        <span class="question-meta">Year: ${question.year} | Chapter: ${question.chapter}</span>
                    </div>
                    <div class="correction-question-content">
                        <div class="question-text-correction">
                            <strong>Question:</strong>
                            <div class="question-display">${question.question.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="expected-points-correction">
                            <strong>Expected Points:</strong>
                            <ul>
                                ${question.expectedPoints ? question.expectedPoints.map(p => `<li>${p}</li>`).join('') : '<li>No expected points provided</li>'}
                            </ul>
                        </div>
                        <div class="student-answer-correction">
                            <strong>Student Answer:</strong>
                            <div class="answer-display">${userAnswer ? userAnswer.replace(/\n/g, '<br>') : '<em>No answer provided</em>'}</div>
                        </div>
                        <div class="marks-input-section">
                            <label for="marks-${index}">
                                <strong>Marks Awarded:</strong> (0 - ${maxMarks})
                            </label>
                            <input 
                                type="number" 
                                id="marks-${index}" 
                                class="marks-input" 
                                min="0" 
                                max="${maxMarks}" 
                                step="0.5"
                                value="${currentMarks}"
                                placeholder="Enter marks"
                            />
                            <span class="marks-out-of">/ ${maxMarks}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        questionsList.innerHTML = html;
    }
    
    calculateDescriptiveScore() {
        if (!this.currentResults || !this.currentResults.isDescriptive) {
            alert('This function is only available for descriptive tests.');
            return;
        }
        
        const marks = [];
        let totalScore = 0;
        let allMarksAssigned = true;
        
        this.questions.forEach((question, index) => {
            const marksInput = document.getElementById(`marks-${index}`);
            const maxMarks = question.marks || 5;
            
            if (marksInput) {
                const value = parseFloat(marksInput.value);
                if (value !== null && !isNaN(value) && value >= 0 && value <= maxMarks) {
                    marks[index] = value;
                    totalScore += value;
                } else if (marksInput.value.trim() !== '') {
                    alert(`Invalid marks for Question ${index + 1}. Please enter a number between 0 and ${maxMarks}.`);
                    marksInput.focus();
                    allMarksAssigned = false;
                    return;
                } else {
                    marks[index] = null;
                    allMarksAssigned = false;
                }
            } else {
                marks[index] = null;
                allMarksAssigned = false;
            }
        });
        
        if (!allMarksAssigned) {
            const confirmMsg = 'Some questions do not have marks assigned. Do you want to calculate score with partial marks?';
            if (!confirm(confirmMsg)) {
                return;
            }
        }
        
        // Update current results
        this.currentResults.marks = marks;
        this.currentResults.totalScore = totalScore;
        const totalMarks = this.currentResults.totalMarks;
        const percentage = totalMarks > 0 ? (totalScore / totalMarks * 100) : 0;
        
        // Update results display
        document.getElementById('total-score').textContent = `${totalScore.toFixed(1)}`;
        document.getElementById('correct-count').textContent = marks.filter(m => m !== null && m > 0).length;
        document.getElementById('incorrect-count').textContent = marks.filter(m => m === 0).length;
        document.getElementById('unanswered-count').textContent = marks.filter(m => m === null).length;
        document.getElementById('mathematics-score').textContent = `${totalScore.toFixed(1)}/${totalMarks}`;
        
        // Update score card max
        const scoreMax = document.querySelector('.score-max');
        if (scoreMax) {
            scoreMax.textContent = `out of ${totalMarks}`;
        }
        
        // Show success message
        const message = `Score calculated: ${totalScore.toFixed(1)}/${totalMarks} (${percentage.toFixed(1)}%)\n\n` +
                       `Marks Breakdown:\n` +
                       `• Questions with marks: ${marks.filter(m => m !== null).length}/${this.questions.length}\n` +
                       `• Total Score: ${totalScore.toFixed(1)}/${totalMarks}\n` +
                       `• Percentage: ${percentage.toFixed(1)}%\n\n` +
                       `Click "Save Correction" to save these marks permanently.`;
        alert(message);
    }
    
    saveCorrection() {
        if (!this.currentResults || !this.currentResults.isDescriptive) {
            alert('This function is only available for descriptive tests.');
            return;
        }
        
        // Calculate score first if not already calculated
        if (this.currentResults.totalScore === null || this.currentResults.totalScore === undefined) {
            this.calculateDescriptiveScore();
        }
        
        // Verify marks are assigned
        const marksAssigned = this.currentResults.marks.filter(m => m !== null).length;
        if (marksAssigned === 0) {
            alert('Please assign marks to at least one question before saving.');
            return;
        }
        
        // Save to localStorage
        this.saveResultsToStorage(this.currentResults);
        
        // Update the test in allTestResults array
        try {
            const allResults = this.getAllTestResults();
            const resultIndex = allResults.findIndex(r => r.id === this.currentResults.id);
            if (resultIndex !== -1) {
                allResults[resultIndex] = { ...this.currentResults };
                localStorage.setItem('allTestResults', JSON.stringify(allResults.slice(-100)));
            }
        } catch (e) {
            console.error('Failed to update test in history:', e);
        }
        
        alert('✅ Correction saved successfully!\n\n' +
              `Total Score: ${this.currentResults.totalScore.toFixed(1)}/${this.currentResults.totalMarks}\n` +
              `Percentage: ${((this.currentResults.totalScore / this.currentResults.totalMarks) * 100).toFixed(1)}%`);
    }

    downloadResultsPDF() {
        // Get results data - use current results if available, otherwise load from last results
        let resultsData = this.currentResults;
        if (!resultsData) {
            resultsData = this.loadLastTestResults();
        }
        
        if (!resultsData) {
            alert('No results data available to generate PDF.');
            return;
        }
        
        // Extract data from results
        const totalScore = resultsData.totalScore || 0;
        const correctCount = resultsData.correctCount || 0;
        const incorrectCount = resultsData.incorrectCount || 0;
        const unansweredCount = resultsData.unansweredCount || 0;
        const subject = resultsData.subject || 'Mathematics';
        const candidateName = resultsData.candidateName || 'Siddesh Anand';
        const school = 'JGRVK';
        const grade = '10th Grade';
        
        // Get timestamp
        const timestamp = resultsData.timestamp ? new Date(resultsData.timestamp) : new Date();
        const dateStr = timestamp.toLocaleDateString();
        const timeStr = timestamp.toLocaleTimeString();
        
        // Initialize PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up colors
        const primaryColor = [102, 126, 234]; // #667eea
        const secondaryColor = [118, 75, 162]; // #764ba2
        
        // Header
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('CBSE Mock Test Results', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('10th Grade Test Report', 105, 30, { align: 'center' });
        
        // Reset text color
        doc.setTextColor(0, 0, 0);
        
        // Candidate Information
        let yPos = 50;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Candidate Information', 20, yPos);
        yPos += 8;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${candidateName}`, 20, yPos);
        yPos += 6;
        doc.text(`School: ${school}`, 20, yPos);
        yPos += 6;
        doc.text(`Grade: ${grade}`, 20, yPos);
        yPos += 6;
        doc.text(`Subject: ${subject}`, 20, yPos);
        yPos += 6;
        doc.text(`Date: ${dateStr} at ${timeStr}`, 20, yPos);
        yPos += 12;
        
        // Detailed Score Summary with Box
        const maxScore = (resultsData.questions?.length || this.questions.length) * 4;
        const totalQuestions = resultsData.questions?.length || this.questions.length;
        const attempted = correctCount + incorrectCount;
        const accuracy = attempted > 0 
            ? ((correctCount / attempted) * 100).toFixed(1) 
            : 0;
        const attemptRate = ((attempted / totalQuestions) * 100).toFixed(1);
        const percentageScore = ((totalScore / maxScore) * 100).toFixed(1);
        
        // Draw score summary box
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.rect(20, yPos - 5, 170, 50);
        yPos += 3;
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Detailed Score Summary', 105, yPos, { align: 'center' });
        yPos += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        // Left column
        doc.text(`Total Questions: ${totalQuestions}`, 25, yPos);
        doc.text(`Attempted: ${attempted}`, 25, yPos + 6);
        doc.text(`Unattempted: ${unansweredCount}`, 25, yPos + 12);
        doc.text(`Attempt Rate: ${attemptRate}%`, 25, yPos + 18);
        
        // Right column
        doc.text(`Total Score: ${totalScore} / ${maxScore}`, 110, yPos);
        doc.text(`Percentage: ${percentageScore}%`, 110, yPos + 6);
        doc.text(`Correct: ${correctCount}`, 110, yPos + 12);
        doc.text(`Incorrect: ${incorrectCount}`, 110, yPos + 18);
        
        yPos += 25;
        
        // Accuracy and Performance Metrics
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Performance Metrics', 20, yPos);
        yPos += 8;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        // Calculate marks gained/lost
        const marksGained = correctCount * 4;
        const marksLost = incorrectCount * 1;
        
        doc.text(`Accuracy (on attempted): ${accuracy}%`, 20, yPos);
        yPos += 6;
        doc.text(`Marks Gained: +${marksGained}`, 20, yPos);
        yPos += 6;
        doc.text(`Marks Lost: -${marksLost}`, 20, yPos);
        yPos += 6;
        
        // Performance level
        let performanceLevel = '';
        let performanceColor = [0, 0, 0];
        if (percentageScore >= 80) {
            performanceLevel = 'Excellent';
            performanceColor = [40, 167, 69];
        } else if (percentageScore >= 60) {
            performanceLevel = 'Good';
            performanceColor = [0, 123, 255];
        } else if (percentageScore >= 40) {
            performanceLevel = 'Average';
            performanceColor = [255, 193, 7];
        } else {
            performanceLevel = 'Needs Improvement';
            performanceColor = [220, 53, 69];
        }
        
        doc.setTextColor(...performanceColor);
        doc.setFont('helvetica', 'bold');
        doc.text(`Performance Level: ${performanceLevel}`, 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
        
        // Chapter-wise Performance (Enhanced)
        if (resultsData?.chapterPerformance) {
            const chapterPerf = resultsData.chapterPerformance;
            const chapters = Object.keys(chapterPerf);
            
            if (chapters.length > 0) {
                if (yPos > 200) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('Chapter-wise Performance Analysis', 20, yPos);
                yPos += 10;
                
                // Table header
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos - 5, 170, 8, 'F');
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.text('Chapter', 22, yPos);
                doc.text('Total', 80, yPos);
                doc.text('Correct', 105, yPos);
                doc.text('Incorrect', 130, yPos);
                doc.text('Score', 160, yPos);
                doc.text('%', 185, yPos);
                yPos += 8;
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                
                // Sort chapters by performance
                const sortedChapters = chapters.map(ch => {
                    const perf = chapterPerf[ch];
                    const percentage = perf.total > 0 ? ((perf.correct / perf.total) * 100) : 0;
                    return { name: ch, ...perf, percentage };
                }).sort((a, b) => b.percentage - a.percentage);
                
                sortedChapters.forEach((ch, index) => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                        // Redraw header
                        doc.setFillColor(240, 240, 240);
                        doc.rect(20, yPos - 5, 170, 8, 'F');
                        doc.setFont('helvetica', 'bold');
                        doc.text('Chapter', 22, yPos);
                        doc.text('Total', 80, yPos);
                        doc.text('Correct', 105, yPos);
                        doc.text('Incorrect', 130, yPos);
                        doc.text('Score', 160, yPos);
                        doc.text('%', 185, yPos);
                        yPos += 8;
                        doc.setFont('helvetica', 'normal');
                    }
                    
                    // Color code based on performance
                    if (ch.percentage >= 80) {
                        doc.setTextColor(40, 167, 69);
                    } else if (ch.percentage >= 60) {
                        doc.setTextColor(0, 123, 255);
                    } else if (ch.percentage >= 40) {
                        doc.setTextColor(255, 193, 7);
                    } else {
                        doc.setTextColor(220, 53, 69);
                    }
                    
                    // Truncate chapter name if too long
                    const chapterName = ch.name.length > 25 ? ch.name.substring(0, 22) + '...' : ch.name;
                    doc.text(chapterName, 22, yPos);
                    doc.setTextColor(0, 0, 0);
                    doc.text(ch.total.toString(), 80, yPos);
                    doc.text(ch.correct.toString(), 105, yPos);
                    doc.text(ch.incorrect.toString(), 130, yPos);
                    doc.text(ch.score.toString(), 160, yPos);
                    doc.text(ch.percentage.toFixed(1) + '%', 185, yPos);
                    yPos += 6;
                });
                yPos += 8;
            }
        }
        
        // Detailed Answer Review (Available for all users in PDF)
        if (resultsData?.questions && resultsData?.answers) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Detailed Answer Review', 20, yPos);
            yPos += 10;
            
            // Summary of question status
            const correctQuestions = [];
            const incorrectQuestions = [];
            const unansweredQuestions = [];
            
            resultsData.questions.forEach((q, idx) => {
                const userAnswer = resultsData.answers[idx];
                if (userAnswer === null) {
                    unansweredQuestions.push(idx + 1);
                } else if (userAnswer === q.correct) {
                    correctQuestions.push(idx + 1);
                } else {
                    incorrectQuestions.push(idx + 1);
                }
            });
            
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(`Correct Questions: ${correctQuestions.join(', ') || 'None'}`, 20, yPos);
            yPos += 5;
            doc.text(`Incorrect Questions: ${incorrectQuestions.join(', ') || 'None'}`, 20, yPos);
            yPos += 5;
            doc.text(`Unanswered Questions: ${unansweredQuestions.join(', ') || 'None'}`, 20, yPos);
            yPos += 10;
            
            // Question-by-question breakdown
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Question-wise Breakdown', 20, yPos);
            yPos += 8;
            
            resultsData.questions.forEach((q, idx) => {
                if (yPos > 260) {
                    doc.addPage();
                    yPos = 20;
                }
                
                const userAnswer = resultsData.answers[idx];
                const isCorrect = userAnswer === q.correct;
                const status = userAnswer === null ? 'UNANSWERED' : (isCorrect ? 'CORRECT' : 'INCORRECT');
                const statusColor = userAnswer === null ? [255, 193, 7] : (isCorrect ? [40, 167, 69] : [220, 53, 69]);
                
                // Draw question box
                doc.setDrawColor(...statusColor);
                doc.setLineWidth(0.3);
                doc.rect(20, yPos - 5, 170, 0);
                yPos += 2;
                
                // Question number, status, chapter, and year
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...statusColor);
                doc.text(`Question ${idx + 1} [${status}]`, 20, yPos);
                doc.setTextColor(0, 0, 0);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.text(`Chapter: ${q.chapter || 'Unknown'} | Year: ${q.year || 'Unknown'}`, 20, yPos + 4);
                yPos += 8;
                
                // Question text (wrap if needed)
                doc.setFontSize(9);
                const questionLines = doc.splitTextToSize(q.question, 170);
                questionLines.forEach(line => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.text(line, 25, yPos);
                    yPos += 5;
                });
                yPos += 2;
                
                // All options
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text('Options:', 25, yPos);
                yPos += 5;
                doc.setFont('helvetica', 'normal');
                
                q.options.forEach((option, optIdx) => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    let optionPrefix = String.fromCharCode(65 + optIdx) + ') '; // A, B, C, D
                    
                    // Highlight correct answer
                    if (optIdx === q.correct) {
                        doc.setTextColor(40, 167, 69);
                        doc.setFont('helvetica', 'bold');
                        optionPrefix += '✓ ';
                    } else {
                        doc.setTextColor(0, 0, 0);
                        doc.setFont('helvetica', 'normal');
                    }
                    
                    // Highlight user's answer if incorrect
                    if (userAnswer !== null && optIdx === userAnswer && optIdx !== q.correct) {
                        doc.setTextColor(220, 53, 69);
                        doc.setFont('helvetica', 'bold');
                        optionPrefix += '✗ ';
                    }
                    
                    const optionText = doc.splitTextToSize(option, 150);
                    optionText.forEach((line, lineIdx) => {
                        if (yPos > 270) {
                            doc.addPage();
                            yPos = 20;
                        }
                        doc.text(lineIdx === 0 ? optionPrefix + line : '   ' + line, 30, yPos);
                        yPos += 4;
                    });
                    
                    doc.setTextColor(0, 0, 0);
                    doc.setFont('helvetica', 'normal');
                });
                
                // Answer summary
                yPos += 2;
                doc.setFontSize(8);
                if (userAnswer !== null) {
                    doc.text(`Your Answer: ${String.fromCharCode(65 + userAnswer)} - ${q.options[userAnswer]}`, 30, yPos);
                    yPos += 4;
                } else {
                    doc.setTextColor(255, 193, 7);
                    doc.text('Your Answer: Not Attempted', 30, yPos);
                    doc.setTextColor(0, 0, 0);
                    yPos += 4;
                }
                
                doc.setTextColor(40, 167, 69);
                doc.setFont('helvetica', 'bold');
                doc.text(`Correct Answer: ${String.fromCharCode(65 + q.correct)} - ${q.options[q.correct]}`, 30, yPos);
                doc.setTextColor(0, 0, 0);
                doc.setFont('helvetica', 'normal');
                yPos += 4;
                
                // Marks information
                doc.setFontSize(7);
                doc.setTextColor(128, 128, 128);
                if (isCorrect) {
                    doc.text('Marks: +4', 30, yPos);
                } else if (userAnswer !== null) {
                    doc.text('Marks: -1', 30, yPos);
                } else {
                    doc.text('Marks: 0', 30, yPos);
                }
                doc.setTextColor(0, 0, 0);
                yPos += 8;
            });
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
            doc.text('Generated by CBSE Mock Test System', 105, 290, { align: 'center' });
        }
        
        // Generate filename
        const filename = `${subject}_Test_Results_${candidateName.replace(/\s+/g, '_')}_${dateStr.replace(/\//g, '-')}.pdf`;
        
        // Save PDF
        doc.save(filename);
    }
    
    saveResultsToStorage(results) {
        try {
            // Add unique ID and timestamp to results
            const resultWithId = {
                ...results,
                id: Date.now().toString(),
                timestamp: results.timestamp || new Date().toISOString()
            };
            
            // Save as last test result (for backward compatibility)
            localStorage.setItem('lastTestResults', JSON.stringify(resultWithId));
            
            // Save to all test results array
            const allResults = this.getAllTestResults();
            allResults.push(resultWithId);
            
            // Keep only last 100 test results to avoid storage issues
            const limitedResults = allResults.slice(-100);
            localStorage.setItem('allTestResults', JSON.stringify(limitedResults));
        } catch (e) {
            console.error('Failed to save results to localStorage:', e);
        }
    }
    
    getAllTestResults() {
        try {
            const saved = localStorage.getItem('allTestResults');
            if (!saved) {
                return [];
            }
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load all results from localStorage:', e);
            return [];
        }
    }
    
    loadLastTestResults() {
        try {
            const saved = localStorage.getItem('lastTestResults');
            if (!saved) {
                return null;
            }
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load results from localStorage:', e);
            return null;
        }
    }
    
    loadTestResultById(id) {
        const allResults = this.getAllTestResults();
        return allResults.find(r => r.id === id) || null;
    }
    
    displayLastTestResults() {
        const results = this.loadLastTestResults();
        if (!results) {
            alert('No previous test results found. Please take a test first.');
            return;
        }
        
        // Restore questions and answers for display
        this.questions = results.questions;
        this.answers = results.answers;
        this.isDescriptiveTest = false; // Physics Descriptive test removed
        
        // Store current results for PDF generation
        this.currentResults = results;
        
        // Calculate and display results
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('test-screen').classList.remove('active');
        document.getElementById('results-screen').classList.add('active');
        
        // Regular MCQ test results
        if (false) { // Descriptive test removed
            const totalMarks = results.totalMarks || results.questions.reduce((sum, q) => sum + (q.marks || 5), 0);
            const totalScore = results.totalScore !== null && results.totalScore !== undefined ? results.totalScore : 'N/A (Not Corrected)';
            const answeredCount = results.answeredCount || 0;
            const unansweredCount = results.unansweredCount || 0;
            
            // Update results display
            document.getElementById('total-score').textContent = typeof totalScore === 'number' ? totalScore.toFixed(1) : totalScore;
            document.getElementById('correct-count').textContent = answeredCount;
            document.getElementById('incorrect-count').textContent = 'N/A';
            document.getElementById('unanswered-count').textContent = unansweredCount;
            document.getElementById('mathematics-score').textContent = typeof totalScore === 'number' 
                ? `${totalScore.toFixed(1)}/${totalMarks}` 
                : `${answeredCount}/${results.questions.length} Answered`;
            
            const scoreMax = document.querySelector('.score-max');
            if (scoreMax) {
                scoreMax.textContent = typeof totalScore === 'number' ? `out of ${totalMarks}` : '';
            }
            
            const resultSubjectName = document.getElementById('result-subject-name');
            if (resultSubjectName) {
                resultSubjectName.textContent = 'Physics Descriptive';
            }
            
            // Show correction interface
            this.displayDescriptiveCorrection();
            this.hideDetailedResults();
        } else {
            // Regular MCQ test results
            const maxScore = (results.questions?.length || 0) * 4;
            document.getElementById('total-score').textContent = results.totalScore || 0;
            document.getElementById('correct-count').textContent = results.correctCount || 0;
            document.getElementById('incorrect-count').textContent = results.incorrectCount || 0;
            document.getElementById('unanswered-count').textContent = results.unansweredCount || 0;
            document.getElementById('mathematics-score').textContent = `${results.mathematicsScore || 0}/${maxScore}`;
            
            const resultSubjectName = document.getElementById('result-subject-name');
            if (resultSubjectName) {
                resultSubjectName.textContent = results.subject || 'Mathematics';
            }
            
            // Hide correction interface for MCQ tests
            const correctionSection = document.getElementById('descriptive-correction');
            if (correctionSection) {
                correctionSection.style.display = 'none';
            }
            
            // Display detailed results only for admin
            if (this.userType === 'admin') {
                this.displayChapterPerformance(results.chapterPerformance);
                this.displayResultsAnalysis({
                    correctCount: results.correctCount,
                    incorrectCount: results.incorrectCount,
                    unansweredCount: results.unansweredCount,
                    totalScore: results.totalScore,
                    mathematicsScore: results.mathematicsScore,
                    chapterPerformance: results.chapterPerformance
                });
                this.displayAnswerReview();
            } else {
                this.hideDetailedResults();
            }
        }
        
        // Show timestamp
        const timestamp = new Date(results.timestamp);
        const timestampStr = timestamp.toLocaleString();
        const candidateInfo = document.querySelector('.candidate-info-results');
        if (candidateInfo) {
            candidateInfo.innerHTML = `
                <p><strong>Candidate:</strong> Siddesh Anand | <strong>School:</strong> JGRVK | <strong>Grade:</strong> 10th Grade</p>
                <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;"><strong>Test Taken:</strong> ${timestampStr}</p>
            `;
        }
    }
    
    displayResultsAnalysis({ correctCount, incorrectCount, unansweredCount, totalScore, mathematicsScore, chapterPerformance }) {
        const container = document.getElementById('results-analysis');
        if (!container) return;
        
        const totalQuestions = this.questions.length;
        const attempted = totalQuestions - unansweredCount;
        const accuracy = attempted > 0 ? (correctCount / attempted) * 100 : 0;
        const attemptRate = (attempted / totalQuestions) * 100;
        const subject = this.selectedSubject || 'Mathematics';
        const maxScore = totalQuestions * 4;
        
        const subjectMetrics = [
            { name: subject, score: mathematicsScore, max: maxScore }
        ].map(s => ({
            ...s,
            percentage: s.max > 0 ? ((s.score / s.max) * 100) : 0
        }));
        
        // Prepare chapter highlights: best and needs improvement
        const chapters = Object.keys(chapterPerformance).map(ch => {
            const perf = chapterPerformance[ch];
            const pct = perf.total > 0 ? (perf.correct / perf.total) * 100 : 0;
            return { name: ch, subject: perf.subject, total: perf.total, correct: perf.correct, percentage: pct };
        });
        const sortable = chapters.filter(c => c.total > 0).sort((a, b) => a.percentage - b.percentage);
        const needsAttention = sortable.slice(0, 3);
        const bestChapters = sortable.slice(-3).reverse();
        
        container.innerHTML = `
            <h2>Detailed Results Analysis</h2>
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h4>Overall</h4>
                    <div class="analysis-metric">
                        <span class="metric-label">Accuracy</span>
                        <span class="metric-value">${accuracy.toFixed(1)}%</span>
                    </div>
                    <div class="analysis-metric">
                        <span class="metric-label">Attempt Rate</span>
                        <span class="metric-value">${attemptRate.toFixed(1)}%</span>
                    </div>
                    <div class="analysis-metric">
                        <span class="metric-label">Attempted</span>
                        <span class="metric-value">${attempted}/${totalQuestions}</span>
                    </div>
                    <div class="analysis-metric">
                        <span class="metric-label">Total Score</span>
                        <span class="metric-value">${totalScore}/${maxScore}</span>
                    </div>
                </div>
                
                <div class="analysis-card">
                    <h4>By Subject</h4>
                    ${subjectMetrics.map(s => `
                        <div class="analysis-metric">
                            <span class="metric-label">${s.name}</span>
                            <span class="metric-value">${s.score}/${s.max} (${s.percentage.toFixed(1)}%)</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="analysis-card">
                    <h4>Chapters to Improve</h4>
                    ${needsAttention.length === 0 ? '<div class="metric-note">All chapters at or above benchmark.</div>' : needsAttention.map(ch => `
                        <div class="analysis-metric warning">
                            <span class="metric-label">${ch.subject} - ${ch.name}</span>
                            <span class="metric-value">${ch.correct}/${ch.total} (${ch.percentage.toFixed(1)}%)</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="analysis-card">
                    <h4>Strong Chapters</h4>
                    ${bestChapters.length === 0 ? '<div class="metric-note">No data.</div>' : bestChapters.map(ch => `
                        <div class="analysis-metric success">
                            <span class="metric-label">${ch.subject} - ${ch.name}</span>
                            <span class="metric-value">${ch.correct}/${ch.total} (${ch.percentage.toFixed(1)}%)</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    displayChapterPerformance(chapterPerformance) {
        const container = document.getElementById('chapter-performance');
        if (!container) return;
        
        container.innerHTML = '<h2>Chapter-wise Performance Analysis</h2>';
        
        // Convert to array and sort by performance percentage
        const chapters = Object.keys(chapterPerformance).map(chapter => {
            const perf = chapterPerformance[chapter];
            const percentage = perf.total > 0 ? ((perf.correct / perf.total) * 100).toFixed(1) : 0;
            return {
                name: chapter,
                ...perf,
                percentage: parseFloat(percentage)
            };
        });
        
        // Sort by percentage (lowest first - chapters needing improvement)
        chapters.sort((a, b) => a.percentage - b.percentage);
        
        // Group by subject
        const mathematicsChapters = chapters.filter(c => c.subject === 'Mathematics');
        
        // Display chapters needing improvement (below 60%)
        const improvementChapters = chapters.filter(c => c.percentage < 60);
        
        if (improvementChapters.length > 0) {
            const improvementSection = document.createElement('div');
            improvementSection.className = 'improvement-section';
            improvementSection.innerHTML = `
                <h3 class="improvement-title">📚 Chapters Requiring Improvement</h3>
                <p class="improvement-subtitle">Focus on these chapters to improve your overall score</p>
                <div class="improvement-grid">
                    ${improvementChapters.map(chapter => `
                        <div class="improvement-card ${chapter.percentage < 40 ? 'critical' : 'warning'}">
                            <div class="improvement-header">
                                <span class="improvement-subject">${chapter.subject}</span>
                                <span class="improvement-percentage">${chapter.percentage}%</span>
                            </div>
                            <h4 class="improvement-chapter">${chapter.name}</h4>
                            <div class="improvement-stats">
                                <div class="stat-item">
                                    <span class="stat-label">Correct:</span>
                                    <span class="stat-value correct">${chapter.correct}/${chapter.total}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Score:</span>
                                    <span class="stat-value">${chapter.score > 0 ? '+' : ''}${chapter.score}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(improvementSection);
        }
        
        // Display all chapters grouped by subject
        const allChaptersSection = document.createElement('div');
        allChaptersSection.className = 'all-chapters-section';
        allChaptersSection.innerHTML = `
            <h3 class="all-chapters-title">Complete Chapter-wise Breakdown</h3>
            <div class="chapters-by-subject">
                ${this.renderSubjectChapters('Mathematics', mathematicsChapters)}
            </div>
        `;
        container.appendChild(allChaptersSection);
    }
    
    renderSubjectChapters(subjectName, chapters) {
        if (chapters.length === 0) return '';
        
        return `
            <div class="subject-chapters">
                <h4 class="subject-chapters-title">${subjectName}</h4>
                <div class="chapters-list">
                    ${chapters.map(chapter => {
                        const percentageClass = chapter.percentage >= 80 ? 'excellent' : 
                                                chapter.percentage >= 60 ? 'good' : 
                                                chapter.percentage >= 40 ? 'average' : 'poor';
                        return `
                            <div class="chapter-item ${percentageClass}">
                                <div class="chapter-name">${chapter.name}</div>
                                <div class="chapter-details">
                                    <span class="chapter-score">${chapter.correct}/${chapter.total}</span>
                                    <span class="chapter-percentage">${chapter.percentage}%</span>
                                    <span class="chapter-marks">${chapter.score > 0 ? '+' : ''}${chapter.score}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    restartTest() {
        // Reset all data
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.markedForReview = new Array(this.questions.length).fill(false);
        this.timeRemaining = 60 * 60;
        this.testStarted = false;
        
        // Clear timers
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Show subject selection screen
        document.getElementById('results-screen').classList.remove('active');
        document.getElementById('test-screen').classList.remove('active');
        document.getElementById('test-history-screen').classList.remove('active');
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('subject-selection-screen').classList.add('active');
    }

    displayAnswerReview() {
        const container = document.getElementById('answer-review');
        if (!container) return;
        
        // Collect incorrect and unanswered questions
        const incorrectQuestions = [];
        const unansweredQuestions = [];
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.answers[index];
            const questionNum = index + 1;
            
            if (userAnswer === null) {
                unansweredQuestions.push({
                    questionNum,
                    question: question.question,
                    options: question.options,
                    correct: question.correct,
                    chapter: question.chapter,
                    year: question.year,
                    userAnswer: null
                });
            } else if (userAnswer !== question.correct) {
                incorrectQuestions.push({
                    questionNum,
                    question: question.question,
                    options: question.options,
                    correct: question.correct,
                    chapter: question.chapter,
                    year: question.year,
                    userAnswer: userAnswer
                });
            }
        });
        
        if (incorrectQuestions.length === 0 && unansweredQuestions.length === 0) {
            container.innerHTML = `
                <div class="review-section">
                    <h2>🎉 Perfect Score!</h2>
                    <p>You answered all questions correctly. Great job!</p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="review-section">';
        
        // Show incorrect answers
        if (incorrectQuestions.length > 0) {
            html += `
                <h2 class="review-title">❌ Incorrect Answers (${incorrectQuestions.length})</h2>
                <p class="review-subtitle">Review your mistakes and learn the correct solutions</p>
                <div class="review-questions">
                    ${incorrectQuestions.map(item => `
                        <div class="review-question-card incorrect">
                            <div class="review-question-header">
                                <span class="review-question-number">Question ${item.questionNum}</span>
                                <span class="review-chapter-badge">${item.chapter}</span>
                                <span class="review-year-badge">${item.year}</span>
                            </div>
                            <div class="review-question-text">${item.question}</div>
                            <div class="review-options">
                                ${item.options.map((option, idx) => {
                                    let optionClass = 'review-option';
                                    if (idx === item.correct) {
                                        optionClass += ' correct-answer';
                                    } else if (idx === item.userAnswer) {
                                        optionClass += ' user-answer-incorrect';
                                    }
                                    return `
                                        <div class="${optionClass}">
                                            <span class="option-label">${String.fromCharCode(65 + idx)}.</span>
                                            <span class="option-text">${option}</span>
                                            ${idx === item.correct ? '<span class="correct-badge">✓ Correct Answer</span>' : ''}
                                            ${idx === item.userAnswer ? '<span class="incorrect-badge">✗ Your Answer</span>' : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Show unanswered questions
        if (unansweredQuestions.length > 0) {
            html += `
                <h2 class="review-title">⏭️ Unanswered Questions (${unansweredQuestions.length})</h2>
                <p class="review-subtitle">Questions you didn't attempt - check the correct answers</p>
                <div class="review-questions">
                    ${unansweredQuestions.map(item => `
                        <div class="review-question-card unanswered">
                            <div class="review-question-header">
                                <span class="review-question-number">Question ${item.questionNum}</span>
                                <span class="review-chapter-badge">${item.chapter}</span>
                                <span class="review-year-badge">${item.year}</span>
                            </div>
                            <div class="review-question-text">${item.question}</div>
                            <div class="review-options">
                                ${item.options.map((option, idx) => {
                                    let optionClass = 'review-option';
                                    if (idx === item.correct) {
                                        optionClass += ' correct-answer';
                                    }
                                    return `
                                        <div class="${optionClass}">
                                            <span class="option-label">${String.fromCharCode(65 + idx)}.</span>
                                            <span class="option-text">${option}</span>
                                            ${idx === item.correct ? '<span class="correct-badge">✓ Correct Answer</span>' : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    showReviewScreen() {
        // Scroll to review section
        const reviewSection = document.getElementById('answer-review');
        if (reviewSection) {
            reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    displayAllTestResults() {
        const allResults = this.getAllTestResults();
        
        if (allResults.length === 0) {
            document.getElementById('test-history-list').innerHTML = `
                <div class="no-results">
                    <p>No test results found. Take a test to see your results here.</p>
                </div>
            `;
        } else {
            // Sort by timestamp (newest first)
            const sortedResults = [...allResults].sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            
            const historyHTML = sortedResults.map((result, index) => {
                const timestamp = new Date(result.timestamp);
                const dateStr = timestamp.toLocaleDateString();
                const timeStr = timestamp.toLocaleTimeString();
                const accuracy = result.correctCount + result.incorrectCount > 0 
                    ? ((result.correctCount / (result.correctCount + result.incorrectCount)) * 100).toFixed(1)
                    : 0;
                const subject = result.subject || 'Mathematics';
                const maxScore = 200; // Default max score
                
                return `
                    <div class="test-history-card" data-test-id="${result.id}">
                        <div class="history-card-header">
                            <div class="history-card-title">
                                <h3>${subject} Test #${sortedResults.length - index}</h3>
                                <span class="history-date">${dateStr} at ${timeStr}</span>
                            </div>
                            <button class="btn-view-result" data-test-id="${result.id}">View Details</button>
                        </div>
                        <div class="history-card-body">
                            <div class="history-stat">
                                <span class="stat-label">Subject:</span>
                                <span class="stat-value">${subject}</span>
                            </div>
                            <div class="history-stat">
                                <span class="stat-label">Score:</span>
                                <span class="stat-value score">${result.totalScore}/${maxScore}</span>
                            </div>
                            <div class="history-stat">
                                <span class="stat-label">Correct:</span>
                                <span class="stat-value correct">${result.correctCount}</span>
                            </div>
                            <div class="history-stat">
                                <span class="stat-label">Incorrect:</span>
                                <span class="stat-value incorrect">${result.incorrectCount}</span>
                            </div>
                            <div class="history-stat">
                                <span class="stat-label">Unanswered:</span>
                                <span class="stat-value">${result.unansweredCount}</span>
                            </div>
                            <div class="history-stat">
                                <span class="stat-label">Accuracy:</span>
                                <span class="stat-value">${accuracy}%</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            document.getElementById('test-history-list').innerHTML = historyHTML;
            
            // Add event listeners to view buttons
            document.querySelectorAll('.btn-view-result').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const testId = e.target.getAttribute('data-test-id');
                    this.displayTestResultById(testId);
                });
            });
        }
        
        // Show history screen
        document.getElementById('subject-selection-screen').classList.remove('active');
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('test-screen').classList.remove('active');
        document.getElementById('results-screen').classList.remove('active');
        document.getElementById('test-history-screen').classList.add('active');
    }
    
    displayTestResultById(testId) {
        const result = this.loadTestResultById(testId);
        if (!result) {
            alert('Test result not found.');
            return;
        }
        
        // Restore subject, questions and answers for display
        this.selectedSubject = result.subject || 'Mathematics';
        this.questions = result.questions;
        this.answers = result.answers;
        this.isDescriptiveTest = result.isDescriptive || false;
        
        // Store current results for PDF generation
        this.currentResults = result;
        
        // Calculate and display results
        document.getElementById('test-history-screen').classList.remove('active');
        document.getElementById('test-screen').classList.remove('active');
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('subject-selection-screen').classList.remove('active');
        document.getElementById('results-screen').classList.add('active');
        
        // Handle descriptive tests
        if (result.isDescriptive) {
            const totalMarks = result.totalMarks || result.questions.reduce((sum, q) => sum + (q.marks || 5), 0);
            const totalScore = result.totalScore !== null && result.totalScore !== undefined ? result.totalScore : 'N/A (Not Corrected)';
            const answeredCount = result.answeredCount || 0;
            const unansweredCount = result.unansweredCount || 0;
            
            // Update results display
            document.getElementById('total-score').textContent = typeof totalScore === 'number' ? totalScore.toFixed(1) : totalScore;
            document.getElementById('correct-count').textContent = answeredCount;
            document.getElementById('incorrect-count').textContent = 'N/A';
            document.getElementById('unanswered-count').textContent = unansweredCount;
            document.getElementById('mathematics-score').textContent = typeof totalScore === 'number' 
                ? `${totalScore.toFixed(1)}/${totalMarks}` 
                : `${answeredCount}/${result.questions.length} Answered`;
            
            const scoreMax = document.querySelector('.score-max');
            if (scoreMax) {
                scoreMax.textContent = typeof totalScore === 'number' ? `out of ${totalMarks}` : '';
            }
            
            const resultSubjectName = document.getElementById('result-subject-name');
            if (resultSubjectName) {
                resultSubjectName.textContent = 'Physics Descriptive';
            }
            
            // Show correction interface
            this.displayDescriptiveCorrection();
            this.hideDetailedResults();
        } else {
            // Regular MCQ test results
            const maxScore = (result.questions?.length || 0) * 4;
            document.getElementById('total-score').textContent = result.totalScore || 0;
            document.getElementById('correct-count').textContent = result.correctCount || 0;
            document.getElementById('incorrect-count').textContent = result.incorrectCount || 0;
            document.getElementById('unanswered-count').textContent = result.unansweredCount || 0;
            document.getElementById('mathematics-score').textContent = `${result.mathematicsScore || 0}/${maxScore}`;
            
            const resultSubjectName = document.getElementById('result-subject-name');
            if (resultSubjectName) {
                resultSubjectName.textContent = result.subject || 'Mathematics';
            }
            
            // Hide correction interface for MCQ tests
            const correctionSection = document.getElementById('descriptive-correction');
            if (correctionSection) {
                correctionSection.style.display = 'none';
            }
            
            // Display detailed results only for admin
            if (this.userType === 'admin') {
                this.displayChapterPerformance(result.chapterPerformance);
                this.displayResultsAnalysis({
                    correctCount: result.correctCount,
                    incorrectCount: result.incorrectCount,
                    unansweredCount: result.unansweredCount,
                    totalScore: result.totalScore,
                    mathematicsScore: result.mathematicsScore,
                    chapterPerformance: result.chapterPerformance
                });
                this.displayAnswerReview();
            } else {
                this.hideDetailedResults();
            }
        }
        
        // Show timestamp
        const timestamp = new Date(result.timestamp);
        const timestampStr = timestamp.toLocaleString();
        const candidateInfo = document.querySelector('.candidate-info-results');
        if (candidateInfo) {
            candidateInfo.innerHTML = `
                <p><strong>Candidate:</strong> Siddesh Anand | <strong>School:</strong> JGRVK | <strong>Grade:</strong> 10th Grade</p>
                <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;"><strong>Test Taken:</strong> ${timestampStr}</p>
            `;
        }
    }
    
    clearAllTestResults() {
        try {
            localStorage.removeItem('allTestResults');
            localStorage.removeItem('lastTestResults');
            this.displayAllTestResults(); // Refresh the display
        } catch (e) {
            console.error('Failed to clear test results:', e);
            alert('Failed to clear test results.');
        }
    }

    clearAllTestResultsFromAdmin() {
        const confirmMessage = '⚠️ WARNING: This will permanently delete ALL test results!\n\n' +
                              'This includes:\n' +
                              '• All test history\n' +
                              '• All student scores\n' +
                              '• All analytics data\n\n' +
                              'This action CANNOT be undone!\n\n' +
                              'Are you absolutely sure you want to proceed?';
        
        if (confirm(confirmMessage)) {
            // Double confirmation
            if (confirm('Final confirmation: Delete ALL test results permanently?')) {
                try {
                    localStorage.removeItem('allTestResults');
                    localStorage.removeItem('lastTestResults');
                    
                    // Refresh admin dashboard
                    this.loadAdminDashboardData();
                    
                    // Clear any displayed results
                    const resultsContainer = document.getElementById('admin-results-container');
                    if (resultsContainer) {
                        resultsContainer.innerHTML = '<p class="no-results">All test results have been cleared.</p>';
                    }
                    
                    alert('✅ All test results have been successfully deleted.');
                } catch (e) {
                    console.error('Failed to clear test results:', e);
                    alert('❌ Failed to clear test results: ' + e.message);
                }
            }
        }
    }

    celebrateAchievement(percentage) {
        // Show celebration overlay
        const overlay = document.getElementById('celebration-overlay');
        if (!overlay) return;
        
        overlay.style.display = 'flex';
        
        // Play celebration sound
        this.playCelebrationSound();
        
        // Create sparklers
        this.createSparklers();
        
        // Add close button listener
        const closeBtn = document.getElementById('close-celebration-btn');
        if (closeBtn) {
            closeBtn.onclick = () => {
                overlay.style.display = 'none';
                this.stopCelebrationSound();
            };
        }
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (overlay.style.display === 'flex') {
                overlay.style.display = 'none';
                this.stopCelebrationSound();
            }
        }, 10000);
    }

    playCelebrationSound() {
        // Create audio context for celebration sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a simple celebration melody using Web Audio API
            const notes = [
                { freq: 523.25, duration: 200 }, // C
                { freq: 587.33, duration: 200 }, // D
                { freq: 659.25, duration: 200 }, // E
                { freq: 783.99, duration: 400 }, // G
                { freq: 659.25, duration: 200 }, // E
                { freq: 783.99, duration: 600 }  // G
            ];
            
            let time = audioContext.currentTime;
            
            notes.forEach((note, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = note.freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, time);
                gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration / 1000);
                
                oscillator.start(time);
                oscillator.stop(time + note.duration / 1000);
                
                time += note.duration / 1000;
            });
            
            this.celebrationAudioContext = audioContext;
        } catch (e) {
            console.log('Audio playback not available:', e);
        }
    }

    stopCelebrationSound() {
        if (this.celebrationAudioContext) {
            try {
                this.celebrationAudioContext.close();
            } catch (e) {
                // Ignore
            }
        }
    }

    createSparklers() {
        const container = document.getElementById('sparkler-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Create multiple sparklers
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createSparkler(container);
            }, i * 100);
        }
    }

    createSparkler(container) {
        const sparkler = document.createElement('div');
        sparkler.className = 'sparkler';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        sparkler.style.left = x + '%';
        sparkler.style.top = y + '%';
        
        // Random delay
        sparkler.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Random size
        const size = Math.random() * 20 + 10;
        sparkler.style.width = size + 'px';
        sparkler.style.height = size + 'px';
        
        container.appendChild(sparkler);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkler.parentNode) {
                sparkler.parentNode.removeChild(sparkler);
            }
        }, 2000);
    }
}

// Initialize the application when the page loads
let app;

// Define global functions FIRST, before any initialization, so they're always available
// Global fallback function for subject selection - defined early to ensure it's always available
window.handleSubjectSelect = function(subject) {
    console.log('Global handleSubjectSelect called with:', subject);
    
    // Try to initialize app if not ready
    if (!window.app) {
        console.log('App not initialized, attempting to initialize...');
        try {
            if (document.readyState === 'loading') {
                // Wait for DOM to be ready, but also try to initialize now
                const initAndSelect = function() {
                    if (initializeApp() && window.app && window.app.selectSubject) {
                        window.app.selectSubject(subject);
                    } else {
                        // Retry after a short delay
                        setTimeout(function() {
                            if (window.app && window.app.selectSubject) {
                                window.app.selectSubject(subject);
                            } else {
                                console.error('Failed to initialize app after retry');
                                alert('Application is loading. Please wait a moment and try again.');
                            }
                        }, 500);
                    }
                };
                
                if (document.body) {
                    // DOM might be ready even if readyState says loading
                    initAndSelect();
                } else {
                    document.addEventListener('DOMContentLoaded', initAndSelect);
                }
                return;
            } else {
                // DOM is ready, initialize immediately
                if (initializeApp() && window.app && window.app.selectSubject) {
                    window.app.selectSubject(subject);
                    return;
                }
            }
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }
    
    // App should be ready now, try to use it
    if (window.app && window.app.selectSubject) {
        try {
            window.app.selectSubject(subject);
        } catch (error) {
            console.error('Error calling selectSubject:', error);
            alert('Error selecting subject: ' + error.message);
        }
    } else {
        console.log('App still not ready, using direct navigation');
        const subjectScreen = document.getElementById('subject-selection-screen');
        const welcomeScreen = document.getElementById('welcome-screen');
        if (subjectScreen && welcomeScreen) {
            subjectScreen.style.display = 'none';
            welcomeScreen.style.display = 'block';
            console.log('Direct navigation successful');
        } else {
            console.error('Screen elements not found for direct navigation');
            // Retry after a short delay
            setTimeout(function() {
                if (window.app && window.app.selectSubject) {
                    window.app.selectSubject(subject);
                } else {
                    alert('Application is still loading. Please wait a moment and try again.');
                }
            }, 1000);
        }
    }
};

// Initialize app immediately if DOM is ready, otherwise wait for DOMContentLoaded
function initializeApp() {
    console.log('Initializing NEETMockTest application...');
    try {
        if (!app) {
            app = new NEETMockTest();
            window.app = app; // Make accessible globally
            console.log('Application initialized successfully, window.app is available');
        } else {
            console.log('Application already initialized');
        }
        return true;
    } catch (error) {
        console.error('Error initializing application:', error);
        console.error('Error stack:', error.stack);
        alert('Error loading application: ' + error.message);
        return false;
    }
}

// Global fallback function for login (works even if app not initialized)
window.handleStudentLogin = function() {
    console.log('Global handleStudentLogin called');
    // Try to initialize app if not ready
    if (!window.app) {
        console.log('App not initialized, attempting to initialize...');
        if (document.readyState === 'loading') {
            // Wait for DOM to be ready
            document.addEventListener('DOMContentLoaded', function() {
                initializeApp();
                if (window.app && window.app.loginAsStudent) {
                    window.app.loginAsStudent();
                }
            });
            return;
        } else {
            initializeApp();
        }
    }
    
    if (window.app && window.app.loginAsStudent) {
        window.app.loginAsStudent();
    } else {
        console.log('App not ready, using direct navigation');
        const loginScreen = document.getElementById('login-screen');
        const subjectScreen = document.getElementById('subject-selection-screen');
        if (loginScreen && subjectScreen) {
            loginScreen.classList.remove('active');
            loginScreen.style.display = 'none';
            subjectScreen.classList.add('active');
            subjectScreen.style.display = 'block';
            console.log('Direct navigation successful');
        } else {
            console.error('Screen elements not found for direct navigation');
            alert('Application not fully loaded. Please wait a moment and try again.');
        }
    }
};

// Global fallback function for subject selection - defined early to ensure it's always available
window.handleSubjectSelect = function(subject) {
    console.log('Global handleSubjectSelect called with:', subject);
    
    // Try to initialize app if not ready
    if (!window.app) {
        console.log('App not initialized, attempting to initialize...');
        try {
            if (document.readyState === 'loading') {
                // Wait for DOM to be ready, but also try to initialize now
                const initAndSelect = function() {
                    if (initializeApp() && window.app && window.app.selectSubject) {
                        window.app.selectSubject(subject);
                    } else {
                        // Retry after a short delay
                        setTimeout(function() {
                            if (window.app && window.app.selectSubject) {
                                window.app.selectSubject(subject);
                            } else {
                                console.error('Failed to initialize app after retry');
                                alert('Application is loading. Please wait a moment and try again.');
                            }
                        }, 500);
                    }
                };
                
                if (document.body) {
                    // DOM might be ready even if readyState says loading
                    initAndSelect();
                } else {
                    document.addEventListener('DOMContentLoaded', initAndSelect);
                }
                return;
            } else {
                // DOM is ready, initialize immediately
                if (initializeApp() && window.app && window.app.selectSubject) {
                    window.app.selectSubject(subject);
                    return;
                }
            }
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }
    
    // App should be ready now, try to use it
    if (window.app && window.app.selectSubject) {
        try {
            window.app.selectSubject(subject);
        } catch (error) {
            console.error('Error calling selectSubject:', error);
            alert('Error selecting subject: ' + error.message);
        }
    } else {
        console.log('App still not ready, using direct navigation');
        const subjectScreen = document.getElementById('subject-selection-screen');
        const welcomeScreen = document.getElementById('welcome-screen');
        if (subjectScreen && welcomeScreen) {
            subjectScreen.style.display = 'none';
            welcomeScreen.style.display = 'block';
            console.log('Direct navigation successful');
        } else {
            console.error('Screen elements not found for direct navigation');
            // Retry after a short delay
            setTimeout(function() {
                if (window.app && window.app.selectSubject) {
                    window.app.selectSubject(subject);
                } else {
                    alert('Application is still loading. Please wait a moment and try again.');
                }
            }, 1000);
        }
    }
};

// Initialize app when DOM is ready
function initApp() {
    console.log('Initializing app...');
    if (initializeApp()) {
        setupInitialScreen();
        console.log('App initialization complete');
    }
}

// Initialize based on document ready state
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded event fired');
        initApp();
    });
} else {
    // DOM is already ready, initialize immediately
    console.log('DOM already ready, initializing immediately');
    initApp();
}

// Helper function to set up initial screen state
function setupInitialScreen() {
    // Show login screen by default (no auto-login)
    const loginScreen = document.getElementById('login-screen');
    const subjectScreen = document.getElementById('subject-selection-screen');
    
    if (loginScreen) {
        loginScreen.classList.add('active');
        loginScreen.style.display = 'block';
    }
    
    if (subjectScreen) {
        subjectScreen.classList.remove('active');
        subjectScreen.style.display = 'none';
    }
    
    // Check if subject parameter is in URL (for full page load)
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    
    if (subjectParam) {
        // Load test directly for the subject in full page
        console.log('Subject parameter found, loading test:', subjectParam);
        setTimeout(() => {
            if (window.app && window.app.selectSubject) {
                window.app.selectSubject(subjectParam);
            }
        }, 100);
    }
    
    console.log('Application initialization complete');
}
