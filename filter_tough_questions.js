#!/usr/bin/env node
/**
 * Script to filter out easy questions and keep only tough/medium questions
 * Based on CBSE NCERT Class 10 board exam papers (2024-2025)
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, 'questions.js');

/**
 * Classify question difficulty - improved algorithm
 */
function classifyDifficulty(question) {
    if (question.difficulty) {
        return question.difficulty.toLowerCase();
    }
    
    const q = question.question.toLowerCase();
    const len = question.question.length;
    
    // Easy indicators - simple factual questions
    const easyPatterns = [
        /^what is the/i,
        /^which/i,
        /^who/i,
        /^where/i,
        /^when/i,
        /^name/i,
        /^identify/i
    ];
    
    const isSimpleFactual = easyPatterns.some(p => p.test(question.question)) && len < 80;
    
    // Hard indicators
    const hardKeywords = [
        'prove', 'derive', 'demonstrate', 'show that', 'verify', 'establish',
        'calculate', 'find the value', 'solve', 'determine', 'evaluate',
        'explain', 'describe', 'compare', 'contrast', 'analyze', 'justify',
        'if', 'then', 'given that', 'suppose', 'assume', 'find', 'obtain'
    ];
    
    const hasHardKeywords = hardKeywords.some(k => q.includes(k));
    
    // Complex patterns
    const complexPatterns = [
        /√\d+/, /sin|cos|tan|log|ln/, /equation|polynomial|quadratic|ap|gp/,
        /irrational|rational|prime|factor/, /angle|triangle|circle|coordinate/,
        /\d+\s*[+\-×÷]\s*\d+/, /\d+\^/, /hcf|lcm/, /prove that/
    ];
    
    const hasComplexMath = complexPatterns.some(p => p.test(question.question));
    const isLong = len > 120;
    const isVeryShort = len < 50;
    
    // Hard chapters
    const hardChapters = [
        'polynomials', 'quadratic', 'arithmetic progressions', 'trigonometry',
        'triangles', 'circles', 'coordinate geometry', 'surface areas',
        'chemical reactions', 'acids bases', 'carbon and its compounds',
        'light - reflection', 'electricity', 'force and laws', 'work and energy',
        'life processes', 'control and coordination', 'heredity', 'evolution'
    ];
    
    const isHardChapter = hardChapters.some(c => 
        question.chapter && question.chapter.toLowerCase().includes(c)
    );
    
    // Classification logic
    if (isSimpleFactual && isVeryShort && !hasHardKeywords && !hasComplexMath) {
        return 'easy';
    }
    
    if (hasHardKeywords && (hasComplexMath || isLong || isHardChapter)) {
        return 'hard';
    }
    
    if (hasHardKeywords || isLong || isHardChapter || hasComplexMath) {
        return 'medium';
    }
    
    return 'easy';
}

/**
 * Process questions.js file
 */
async function filterToughQuestions() {
    console.log('🔄 Filtering tough questions from question bank...');
    console.log(`📅 Time: ${new Date().toLocaleString()}`);
    console.log('');
    
    try {
        // Read and parse questions
        console.log('📖 Reading questions file...');
        const content = fs.readFileSync(QUESTIONS_FILE, 'utf8');
        
        // Create temp module file
        const tempFile = path.join(__dirname, 'questions_temp.js');
        let moduleContent = content;
        if (!moduleContent.includes('module.exports')) {
            moduleContent += '\n\nmodule.exports = { questions };';
        }
        fs.writeFileSync(tempFile, moduleContent);
        
        // Load questions
        delete require.cache[require.resolve(tempFile)];
        const { questions } = require(tempFile);
        fs.unlinkSync(tempFile);
        
        console.log('✅ Loaded questions');
        console.log('');
        
        // Process each subject
        const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'socialScience'];
        let totalBefore = 0;
        let totalAfter = 0;
        let easyRemoved = 0;
        let toughAdded = 0;
        
        subjects.forEach(subject => {
            if (questions[subject] && Array.isArray(questions[subject])) {
                const beforeCount = questions[subject].length;
                totalBefore += beforeCount;
                
                console.log(`📊 Processing ${subject}...`);
                console.log(`   Before: ${beforeCount} questions`);
                
                // Classify and filter
                const classified = questions[subject].map(q => ({
                    ...q,
                    difficulty: q.difficulty || classifyDifficulty(q)
                }));
                
                const easyQuestions = classified.filter(q => q.difficulty === 'easy');
                const toughMediumQuestions = classified.filter(q => q.difficulty !== 'easy');
                
                easyRemoved += easyQuestions.length;
                
                // Keep only tough/medium questions
                questions[subject] = toughMediumQuestions;
                
                const afterCount = questions[subject].length;
                totalAfter += afterCount;
                
                // Count by difficulty
                const hardCount = questions[subject].filter(q => q.difficulty === 'hard').length;
                const mediumCount = questions[subject].filter(q => q.difficulty === 'medium').length;
                
                console.log(`   After: ${afterCount} questions (${hardCount} hard, ${mediumCount} medium)`);
                console.log(`   Removed: ${easyQuestions.length} easy questions`);
                console.log('');
            }
        });
        
        console.log('📊 Summary:');
        console.log(`   Total before: ${totalBefore} questions`);
        console.log(`   Total after: ${totalAfter} questions`);
        console.log(`   Easy questions removed: ${easyRemoved}`);
        console.log('');
        
        // Write back to file
        console.log('💾 Writing updated questions to file...');
        writeQuestionsToFile(content, questions);
        console.log('✅ Questions file updated successfully!');
        console.log('');
        console.log('✅ All easy questions have been removed. Only tough and medium questions remain.');
        
        // Log
        const logFile = path.join(__dirname, 'question_filter.log');
        const logEntry = `[${new Date().toISOString()}] Filtered: Removed ${easyRemoved} easy questions, kept ${totalAfter} tough/medium\n`;
        fs.appendFileSync(logFile, logEntry);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error filtering questions:', error.message);
        console.error(error.stack);
        return false;
    }
}

/**
 * Write questions back to file
 */
function writeQuestionsToFile(originalContent, questions) {
    let questionsString = '{\n';
    
    const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'socialScience'];
    subjects.forEach((subject, subjectIndex) => {
        questionsString += `    ${subject}: [\n`;
        
        if (questions[subject] && Array.isArray(questions[subject])) {
            questions[subject].forEach((q, qIndex) => {
                questionsString += '        {\n';
                questionsString += `            id: ${q.id},\n`;
                
                const escapedQuestion = q.question.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
                questionsString += `            question: "${escapedQuestion}",\n`;
                
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
                
                if (q.difficulty) {
                    questionsString += `,\n            difficulty: "${q.difficulty}"`;
                }
                
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
    
    // Replace questions object
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

// Run if called directly
if (require.main === module) {
    filterToughQuestions()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { filterToughQuestions, classifyDifficulty };
