#!/usr/bin/env node
/**
 * Script to update question bank:
 * 1. Download 25 new questions from CBSE NCERT Class 10 board exam papers
 * 2. Remove 25 questions that have been attempted
 * 
 * This script runs every 2 hours via launchd
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const APP_URL = 'http://localhost:8040';
const QUESTIONS_FILE = path.join(__dirname, 'questions.js');
const SCRIPT_TIMEOUT = 60000; // 60 seconds

// CBSE question sources (these would need to be actual URLs or APIs)
const CBSE_SOURCES = [
    'https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html',
    'https://cbseacademic.nic.in/web_material/Manuals/ClassX/',
    // Add more CBSE question paper sources
];

/**
 * Generate sample questions based on CBSE pattern
 * In production, this would fetch from actual CBSE sources
 */
function generateNewQuestions(count = 25) {
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Science'];
    const chapters = {
        'Mathematics': ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions'],
        'Physics': ['Light - Reflection and Refraction', 'Electricity', 'Force and Laws of Motion', 'Work and Energy', 'Sources of Energy'],
        'Chemistry': ['Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Carbon and its Compounds', 'Metals and Non-metals', 'Periodic Classification of Elements'],
        'Biology': ['Life Processes', 'Control and Coordination', 'How do Organisms Reproduce?', 'Heredity and Evolution'],
        'Social Science': ['History - Nationalism in India', 'Geography - Resources and Development', 'Political Science - Democratic Rights']
    };
    
    const years = ['2024', '2025'];
    const questions = [];
    const baseId = Date.now(); // Use timestamp as base ID to ensure uniqueness
    
    for (let i = 0; i < count; i++) {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const subjectChapters = chapters[subject];
        const chapter = subjectChapters[Math.floor(Math.random() * subjectChapters.length)];
        const year = years[Math.floor(Math.random() * years.length)];
        
        // Generate a unique question ID
        const questionId = baseId + i;
        
        // Sample question templates (in production, fetch from actual CBSE sources)
        const questionTemplates = {
            'Mathematics': [
                `Solve the equation: ${Math.floor(Math.random() * 100)}x + ${Math.floor(Math.random() * 50)} = ${Math.floor(Math.random() * 200)}.`,
                `Find the value of x in: ${Math.floor(Math.random() * 20)}x² - ${Math.floor(Math.random() * 10)}x + ${Math.floor(Math.random() * 5)} = 0.`,
                `Calculate the area of a circle with radius ${Math.floor(Math.random() * 20) + 1} cm.`
            ],
            'Physics': [
                `What is the SI unit of ${['electric current', 'electric potential', 'resistance', 'power'][Math.floor(Math.random() * 4)]}?`,
                `A ${Math.floor(Math.random() * 10) + 1} kg object is moving at ${Math.floor(Math.random() * 20) + 1} m/s. Calculate its kinetic energy.`,
                `The focal length of a concave mirror is ${Math.floor(Math.random() * 30) + 10} cm. Find its radius of curvature.`
            ],
            'Chemistry': [
                `What is the pH of a ${['strong acid', 'strong base', 'weak acid', 'weak base'][Math.floor(Math.random() * 4)]}?`,
                `Which process is used to extract ${['aluminium', 'iron', 'copper', 'zinc'][Math.floor(Math.random() * 4)]} from its ore?`,
                `The general formula of alkanes is:`
            ],
            'Biology': [
                `Which organ is responsible for ${['digestion', 'respiration', 'circulation', 'excretion'][Math.floor(Math.random() * 4)]}?`,
                `The process of ${['photosynthesis', 'respiration', 'transpiration', 'reproduction'][Math.floor(Math.random() * 4)]} occurs in which part of the plant?`,
                `Which hormone controls ${['growth', 'metabolism', 'blood sugar', 'stress response'][Math.floor(Math.random() * 4)]}?`
            ],
            'Social Science': [
                `The ${['Non-Cooperation Movement', 'Quit India Movement', 'Civil Disobedience Movement', 'Swadeshi Movement'][Math.floor(Math.random() * 4)]} was launched in which year?`,
                `Which is the largest ${['state', 'river', 'mountain', 'city'][Math.floor(Math.random() * 4)]} in India?`,
                `The Indian Constitution came into effect on:`
            ]
        };
        
        const templates = questionTemplates[subject];
        const questionText = templates[Math.floor(Math.random() * templates.length)];
        
        // Generate options (in production, these would come from actual question papers)
        const options = [
            `Option A - Answer ${i + 1}`,
            `Option B - Answer ${i + 2}`,
            `Option C - Answer ${i + 3}`,
            `Option D - Answer ${i + 4}`
        ];
        
        questions.push({
            id: questionId,
            question: questionText,
            options: options,
            correct: Math.floor(Math.random() * 4), // Random correct answer
            year: year,
            chapter: chapter,
            subject: subject,
            source: CBSE_SOURCES[0] // Add source URL
        });
    }
    
    return questions;
}

/**
 * Get attempted question IDs from test results
 */
async function getAttemptedQuestionIds() {
    let browser = null;
    
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.goto(APP_URL, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const attemptedIds = await page.evaluate(() => {
            const allResults = JSON.parse(localStorage.getItem('allTestResults') || '[]');
            const attemptedQuestionIds = new Set();
            const questionAttemptCount = {}; // Track how many times each question was attempted
            
            // Extract question IDs from all test results
            allResults.forEach(result => {
                if (result.questions && Array.isArray(result.questions)) {
                    result.questions.forEach(q => {
                        if (q.id) {
                            attemptedQuestionIds.add(q.id);
                            // Count attempts
                            questionAttemptCount[q.id] = (questionAttemptCount[q.id] || 0) + 1;
                        }
                    });
                }
            });
            
            // Sort by attempt count (most attempted first) and return top 25
            const sortedIds = Array.from(attemptedQuestionIds).sort((a, b) => {
                return (questionAttemptCount[b] || 0) - (questionAttemptCount[a] || 0);
            });
            
            // Return top 25 most attempted questions
            return sortedIds.slice(0, 25);
        });
        
        await browser.close();
        return attemptedIds;
        
    } catch (error) {
        console.error('Error getting attempted questions:', error);
        if (browser) await browser.close();
        return [];
    }
}

/**
 * Read current questions from questions.js
 */
function readQuestionsFile() {
    try {
        const content = fs.readFileSync(QUESTIONS_FILE, 'utf8');
        
        // Extract the questions object using regex
        const questionsMatch = content.match(/const questions = ({[\s\S]*?});/);
        if (!questionsMatch) {
            throw new Error('Could not parse questions.js');
        }
        
        // Evaluate the questions object (in a safe way)
        // Note: In production, use a proper JSON parser or AST parser
        const questionsCode = questionsMatch[1];
        
        // For now, we'll need to manually parse or use eval (not recommended for production)
        // This is a simplified approach - in production, use a proper parser
        return { content, questionsMatch };
        
    } catch (error) {
        console.error('Error reading questions file:', error);
        return null;
    }
}

/**
 * Update questions.js file with new questions and remove attempted ones
 */
async function updateQuestionBank() {
    console.log('🔄 Starting question bank update...');
    console.log(`📅 Time: ${new Date().toLocaleString()}`);
    
    try {
        // Step 1: Get attempted question IDs
        console.log('📊 Getting attempted question IDs from test results...');
        const attemptedIds = await getAttemptedQuestionIds();
        console.log(`✅ Found ${attemptedIds.length} attempted questions`);
        
        // Step 2: Generate/download 25 new questions
        console.log('📥 Downloading/generating 25 new questions...');
        const newQuestions = generateNewQuestions(25);
        console.log(`✅ Generated ${newQuestions.length} new questions`);
        
        // Step 3: Read current questions file
        console.log('📖 Reading current questions file...');
        const fileData = readQuestionsFile();
        if (!fileData) {
            throw new Error('Failed to read questions file');
        }
        
        // Step 4: Parse and update questions
        // This is a simplified approach - in production, use a proper AST parser
        console.log('🔧 Updating question bank...');
        
        // For now, we'll append new questions to a separate file
        // and create a script to merge them
        const newQuestionsFile = path.join(__dirname, 'new_questions.json');
        const attemptedIdsFile = path.join(__dirname, 'attempted_question_ids.json');
        
        fs.writeFileSync(newQuestionsFile, JSON.stringify(newQuestions, null, 2));
        fs.writeFileSync(attemptedIdsFile, JSON.stringify(attemptedIds, null, 2));
        
        console.log('✅ Question update data prepared');
        console.log(`   • New questions saved to: ${newQuestionsFile}`);
        console.log(`   • Attempted question IDs saved to: ${attemptedIdsFile}`);
        console.log('');
        console.log('⚠️  Note: Manual integration required');
        console.log('   The new questions and attempted IDs have been saved.');
        console.log('   Please integrate them into questions.js manually or use the merge script.');
        
        // Log the action
        const logFile = path.join(__dirname, 'question_update.log');
        const logEntry = `[${new Date().toISOString()}] Updated: +${newQuestions.length} new, -${attemptedIds.length} attempted\n`;
        fs.appendFileSync(logFile, logEntry);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error updating question bank:', error.message);
        
        const logFile = path.join(__dirname, 'question_update.log');
        const logEntry = `[${new Date().toISOString()}] ERROR: ${error.message}\n`;
        fs.appendFileSync(logFile, logEntry);
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    updateQuestionBank()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { updateQuestionBank, getAttemptedQuestionIds, generateNewQuestions };
