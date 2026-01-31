# NEET Mock Test Application - 10th Grade CBSE Based

A comprehensive mock test application for NEET preparation based on 10th grade CBSE syllabus, featuring questions from the last 10 years of CBSE public question papers.

## Features

- **50 Questions Total** (from 2020 onwards)
  - Physics: 12 questions (24%)
  - Chemistry: 12 questions (24%)
  - Biology: 26 questions (52%)

- **Test Features**
  - 60-minute (1-hour) timer with visual warnings
  - Question navigation (Previous/Next buttons)
  - Mark questions for review
  - Question palette for quick navigation
  - Color-coded question status (Answered, Marked, Not Answered)
  - Subject-wise question organization

- **Scoring System**
  - +4 marks for each correct answer
  - -1 mark for each incorrect answer
  - Subject-wise score breakdown
  - **Chapter-wise Performance Analysis**
    - Identifies chapters requiring improvement (< 60% score)
    - Complete breakdown by chapter for all subjects
    - Visual indicators for performance levels (Excellent, Good, Average, Poor)
  - Detailed results screen

- **Modern UI**
  - Responsive design (works on desktop, tablet, and mobile)
  - Beautiful gradient design
  - Intuitive user interface
  - Real-time timer updates

## How to Use

### Option 1: Local Access (Single Device)
1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No server or installation required

### Option 2: Network Access (Home Network)
1. **Start the Server**
   - Run `python3 server.py`
   - The server will start on port 8040

2. **Access from Any Device on Your Network**
   - On the same computer: `http://localhost:8040`
   - From other devices (phones, tablets, other computers): `http://[YOUR_IP]:8040`
   - The server will display your local IP address when it starts
   - Example: `http://192.168.1.100:8040`

3. **Stop the Server**
   - Press `Ctrl+C` in the terminal where the server is running

### Local Run (Docker) — Recommended

This is the supported way to run the app locally (and on your Wi‑Fi network) without relying on macOS Python firewall rules.

1. **Start Docker Desktop**
2. **Run with Docker Compose**

```bash
cd neet-mock-test
docker compose up --build
```

3. **Open the app**
   - On this Mac: `http://localhost:8080`
   - From other devices on same Wi‑Fi: `http://[YOUR_MAC_IP]:8080` (example: `http://192.168.0.107:8080`)

### Start the Test
1. **Start the Test**
   - Click "Start Test" on the welcome screen
   - Read the instructions carefully

2. **Take the Test**
   - Answer questions by selecting an option
   - Use Previous/Next buttons to navigate
   - Mark questions for review if needed
   - Use the question palette to jump to any question
   - Monitor your time using the timer at the top

3. **Submit the Test**
   - Click "Submit Test" when finished
   - Confirm your submission
   - View your results with detailed score breakdown

4. **Review Results**
   - See your total score out of 200
   - Check correct, incorrect, and unanswered counts
   - View subject-wise scores (Physics, Chemistry, Biology)
   - **Chapter-wise Performance Analysis**: Identify chapters requiring improvement
   - Complete breakdown of performance by chapter for each subject

## File Structure

```
neet-mock-test/
├── index.html      # Main HTML file
├── styles.css      # Styling and layout
├── questions.js    # Question bank (50 questions from 2020+)
├── app.js          # Application logic and functionality
├── Dockerfile      # Docker image for local run
├── docker-compose.yml # Local docker run (maps host 8080 -> container 8040)
└── README.md       # This file
```

## Question Bank

The question bank includes:
- Questions from CBSE 10th grade syllabus (2025 format)
- Only questions from 2020 onwards (2020-2023)
- Covers all major topics in Physics, Chemistry, and Biology
- Questions are organized by chapters:
  - **Physics**: Light - Reflection and Refraction, Electricity, Work and Energy, Force and Laws of Motion, Sources of Energy, etc.
  - **Chemistry**: Chemical Reactions and Equations, Acids Bases and Salts, Carbon and its Compounds, Metals and Non-metals, Periodic Classification of Elements
  - **Biology**: Life Processes, Control and Coordination, How do Organisms Reproduce?, Heredity and Evolution
- Questions are representative of actual CBSE exam patterns

## Technical Details

- **Pure JavaScript** - No frameworks or dependencies
- **Responsive CSS** - Works on all screen sizes
- **Local Storage Ready** - Can be extended to save progress
- **Browser Compatible** - Works on Chrome, Firefox, Safari, Edge
- **Local hosting** - Served via Docker container for reliable LAN access

## Customization

You can easily customize:
- **Questions**: Edit `questions.js` to add/modify questions
- **Timer Duration**: Change `timeRemaining` in `app.js` (currently 180 minutes)
- **Scoring**: Modify the marking scheme in `calculateResults()` function
- **Styling**: Update `styles.css` for different color schemes

## Chapter-wise Performance Analysis

The application provides comprehensive chapter-wise performance analysis:

1. **Chapters Requiring Improvement**
   - Highlights chapters with performance below 60%
   - Color-coded indicators (Critical: < 40%, Warning: 40-60%)
   - Shows correct answers, total questions, and score for each chapter

2. **Complete Chapter Breakdown**
   - Performance for all chapters organized by subject
   - Performance levels:
     - **Excellent**: 80% and above (Green)
     - **Good**: 60-79% (Blue)
     - **Average**: 40-59% (Yellow)
     - **Poor**: Below 40% (Red)
   - Shows percentage, score, and correct/total ratio for each chapter

## Future Enhancements

Potential features to add:
- Detailed answer review with explanations
- Progress saving to local storage
- Multiple test sets
- Performance analytics over time
- Export results as PDF
- Practice mode for specific chapters

## Notes

- The timer automatically submits the test when time runs out
- Questions are shuffled randomly (can be implemented)
- All answers are stored in memory during the test
- Results are calculated immediately upon submission

## License

This is an educational project for NEET preparation.



