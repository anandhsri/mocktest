#!/usr/bin/env node
/**
 * Script to merge new questions into questions.js and remove attempted ones
 * This script should be run after update_question_bank.js
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, 'questions.js');
const NEW_QUESTIONS_FILE = path.join(__dirname, 'new_questions.json');
const ATTEMPTED_IDS_FILE = path.join(__dirname, 'attempted_question_ids.json');

/**
 * Parse questions.js file and extract questions object
 */
function parseQuestionsFile() {
    const content = fs.readFileSync(QUESTIONS_FILE, 'utf8');
    
    // Load the questions.js file as a module
    // We'll use a safer approach by creating a temporary file and requiring it
    const tempFile = path.join(__dirname, 'questions_temp.js');
    
    try {
        // Copy the file and modify to export
        let moduleContent = content.replace(
            /const questions =/,
            'const questions ='
        );
        
        // Add module.exports at the end
        if (!moduleContent.includes('module.exports')) {
            moduleContent += '\n\nmodule.exports = { questions };';
        }
        
        fs.writeFileSync(tempFile, moduleContent);
        
        // Delete the cached module if it exists
        delete require.cache[require.resolve(tempFile)];
        
        // Require the module
        const { questions } = require(tempFile);
        
        // Clean up temp file
        fs.unlinkSync(tempFile);
        
        return { content, questions };
        
    } catch (error) {
        // Clean up on error
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        throw error;
    }
}

/**
 * Remove attempted questions from questions object
 */
function removeAttemptedQuestions(questions, attemptedIds) {
    const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'socialScience'];
    let removedCount = 0;
    
    subjects.forEach(subject => {
        if (questions[subject] && Array.isArray(questions[subject])) {
            const originalLength = questions[subject].length;
            questions[subject] = questions[subject].filter(q => !attemptedIds.includes(q.id));
            removedCount += (originalLength - questions[subject].length);
        }
    });
    
    return removedCount;
}

/**
 * Add new questions to questions object
 */
function addNewQuestions(questions, newQuestions) {
    const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'socialScience'];
    const subjectMap = {
        'Mathematics': 'mathematics',
        'Physics': 'physics',
        'Chemistry': 'chemistry',
        'Biology': 'biology',
        'Social Science': 'socialScience'
    };
    
    let addedCount = 0;
    
    newQuestions.forEach(newQ => {
        const subjectKey = subjectMap[newQ.subject];
        if (subjectKey && questions[subjectKey]) {
            // Check for duplicates by ID
            const exists = questions[subjectKey].some(q => q.id === newQ.id);
            if (!exists) {
                // Remove subject from newQ as it's already in the structure
                const { subject, ...questionData } = newQ;
                questions[subjectKey].push(questionData);
                addedCount++;
            }
        }
    });
    
    return addedCount;
}

/**
 * Write updated questions back to file
 */
function writeQuestionsFile(originalContent, questions) {
    // Build the questions object string manually to preserve format
    let questionsString = '{\n';
    
    const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'socialScience'];
    subjects.forEach((subject, subjectIndex) => {
        questionsString += `    ${subject}: [\n`;
        
        if (questions[subject] && Array.isArray(questions[subject])) {
            questions[subject].forEach((q, qIndex) => {
                questionsString += '        {\n';
                questionsString += `            id: ${q.id},\n`;
                
                // Escape quotes in question text
                const escapedQuestion = q.question.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
                questionsString += `            question: "${escapedQuestion}",\n`;
                
                // Format options array
                questionsString += '            options: [';
                q.options.forEach((opt, optIndex) => {
                    const escapedOpt = opt.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                    questionsString += `"${escapedOpt}"`;
                    if (optIndex < q.options.length - 1) {
                        questionsString += ', ';
                    }
                });
                questionsString += '],\n';
                
                questionsString += `            correct: ${q.correct},\n`;
                questionsString += `            year: "${q.year}",\n`;
                questionsString += `            chapter: "${q.chapter}"`;
                
                // Add source if it exists
                if (q.source) {
                    const escapedSource = q.source.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                    questionsString += `,\n            source: "${escapedSource}"`;
                }
                
                questionsString += '\n        }';
                if (qIndex < questions[subject].length - 1) {
                    questionsString += ',';
                }
                questionsString += '\n';
            });
        }
        
        questionsString += '    ]';
        if (subjectIndex < subjects.length - 1) {
            questionsString += ',';
        }
        questionsString += '\n';
    });
    
    questionsString += '}';
    
    // Replace the questions object in the original content
    // Use a more robust regex that handles the closing brace and semicolon
    const questionsMatch = originalContent.match(/const questions = ({[\s\S]*?});/);
    if (questionsMatch) {
        const newContent = originalContent.replace(
            questionsMatch[0],
            `const questions = ${questionsString};`
        );
        fs.writeFileSync(QUESTIONS_FILE, newContent, 'utf8');
    } else {
        throw new Error('Could not find questions object to replace');
    }
}

/**
 * Main merge function
 */
function mergeQuestions() {
    console.log('🔄 Starting question merge process...');
    console.log(`📅 Time: ${new Date().toLocaleString()}`);
    
    try {
        // Read new questions
        if (!fs.existsSync(NEW_QUESTIONS_FILE)) {
            console.log('⚠️  No new questions file found. Run update_question_bank.js first.');
            return false;
        }
        
        const newQuestions = JSON.parse(fs.readFileSync(NEW_QUESTIONS_FILE, 'utf8'));
        console.log(`📥 Found ${newQuestions.length} new questions`);
        
        // Read attempted question IDs
        let attemptedIds = [];
        if (fs.existsSync(ATTEMPTED_IDS_FILE)) {
            attemptedIds = JSON.parse(fs.readFileSync(ATTEMPTED_IDS_FILE, 'utf8'));
            console.log(`📊 Found ${attemptedIds.length} attempted question IDs`);
        }
        
        // Parse current questions
        console.log('📖 Reading current questions file...');
        const { content, questions } = parseQuestionsFile();
        
        // Remove attempted questions
        if (attemptedIds.length > 0) {
            console.log('🗑️  Removing attempted questions...');
            const removedCount = removeAttemptedQuestions(questions, attemptedIds);
            console.log(`✅ Removed ${removedCount} attempted questions`);
        }
        
        // Add new questions
        console.log('➕ Adding new questions...');
        const addedCount = addNewQuestions(questions, newQuestions);
        console.log(`✅ Added ${addedCount} new questions`);
        
        // Write back to file
        console.log('💾 Writing updated questions to file...');
        writeQuestionsFile(content, questions);
        console.log('✅ Questions file updated successfully!');
        
        // Clean up temporary files
        if (fs.existsSync(NEW_QUESTIONS_FILE)) {
            fs.unlinkSync(NEW_QUESTIONS_FILE);
        }
        if (fs.existsSync(ATTEMPTED_IDS_FILE)) {
            fs.unlinkSync(ATTEMPTED_IDS_FILE);
        }
        
        // Log the action
        const logFile = path.join(__dirname, 'question_update.log');
        const logEntry = `[${new Date().toISOString()}] Merged: +${addedCount} new, -${attemptedIds.length} attempted\n`;
        fs.appendFileSync(logFile, logEntry);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error merging questions:', error.message);
        console.error(error.stack);
        
        const logFile = path.join(__dirname, 'question_update.log');
        const logEntry = `[${new Date().toISOString()}] MERGE ERROR: ${error.message}\n`;
        fs.appendFileSync(logFile, logEntry);
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    mergeQuestions()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { mergeQuestions };
