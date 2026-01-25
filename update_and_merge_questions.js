#!/usr/bin/env node
/**
 * Combined script that updates and merges questions in one go
 * This is the main script that runs every 2 hours
 */

const { updateQuestionBank } = require('./update_question_bank');
const { mergeQuestions } = require('./merge_questions');

async function updateAndMerge() {
    console.log('🚀 Starting question bank update and merge...');
    console.log(`📅 Time: ${new Date().toLocaleString()}`);
    console.log('');
    
    try {
        // Step 1: Update question bank (download new, identify attempted)
        const updateSuccess = await updateQuestionBank();
        if (!updateSuccess) {
            throw new Error('Failed to update question bank');
        }
        
        console.log('');
        
        // Step 2: Merge questions into questions.js
        const mergeSuccess = mergeQuestions();
        if (!mergeSuccess) {
            throw new Error('Failed to merge questions');
        }
        
        console.log('');
        console.log('✅ Question bank update and merge completed successfully!');
        
        return true;
        
    } catch (error) {
        console.error('❌ Error in update and merge process:', error.message);
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    updateAndMerge()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { updateAndMerge };
