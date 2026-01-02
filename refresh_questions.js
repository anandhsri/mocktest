#!/usr/bin/env node
/**
 * Script to refresh/clear questions from localStorage
 * This script opens the application and clears uploaded questions
 * Run daily at 1 AM to refresh the question bank
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const APP_URL = 'http://localhost:8040';
const SCRIPT_TIMEOUT = 30000; // 30 seconds

async function refreshQuestions() {
    let browser = null;
    
    try {
        console.log('🔄 Starting question refresh process...');
        console.log(`📅 Time: ${new Date().toLocaleString()}`);
        
        // Launch browser
        console.log('🌐 Launching browser...');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set timeout
        page.setDefaultTimeout(SCRIPT_TIMEOUT);
        
        // Navigate to the application
        console.log(`📡 Navigating to ${APP_URL}...`);
        await page.goto(APP_URL, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Clear uploaded questions from localStorage
        console.log('🗑️  Clearing uploaded questions from localStorage...');
        await page.evaluate(() => {
            localStorage.removeItem('uploadedQuestions');
            console.log('✅ Uploaded questions cleared');
        });
        
        // Optional: Clear test results if needed (uncomment if desired)
        // console.log('🗑️  Clearing test results...');
        // await page.evaluate(() => {
        //     localStorage.removeItem('allTestResults');
        //     localStorage.removeItem('lastTestResults');
        //     console.log('✅ Test results cleared');
        // });
        
        console.log('✅ Question refresh completed successfully!');
        
        // Log the action
        const logFile = path.join(__dirname, 'refresh_questions.log');
        const logEntry = `[${new Date().toISOString()}] Questions refreshed successfully\n`;
        fs.appendFileSync(logFile, logEntry);
        
        await browser.close();
        return true;
        
    } catch (error) {
        console.error('❌ Error refreshing questions:', error.message);
        
        // Log the error
        const logFile = path.join(__dirname, 'refresh_questions.log');
        const logEntry = `[${new Date().toISOString()}] ERROR: ${error.message}\n`;
        fs.appendFileSync(logFile, logEntry);
        
        if (browser) {
            await browser.close();
        }
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    refreshQuestions()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { refreshQuestions };

