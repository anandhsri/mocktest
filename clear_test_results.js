#!/usr/bin/env node
/**
 * Script to clear all test results from localStorage
 */

const puppeteer = require('puppeteer');

const APP_URL = 'http://localhost:8040';

async function clearTestResults() {
    let browser = null;
    
    try {
        console.log('🗑️  Clearing all test results...');
        
        // Launch browser
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        page.setDefaultTimeout(30000);
        
        // Navigate to the application
        await page.goto(APP_URL, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Clear all test results from localStorage
        await page.evaluate(() => {
            localStorage.removeItem('allTestResults');
            localStorage.removeItem('lastTestResults');
            localStorage.removeItem('uploadedQuestions'); // Optional: also clear uploaded questions
            console.log('✅ All test results cleared');
        });
        
        console.log('✅ Successfully cleared all test results!');
        console.log('   • allTestResults - cleared');
        console.log('   • lastTestResults - cleared');
        console.log('   • uploadedQuestions - cleared');
        
        await browser.close();
        return true;
        
    } catch (error) {
        console.error('❌ Error clearing test results:', error.message);
        
        if (browser) {
            await browser.close();
        }
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    clearTestResults()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { clearTestResults };



