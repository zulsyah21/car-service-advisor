const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
        page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

        // Inject fake admin session
        await page.goto('http://localhost:3000/parts.html');
        await page.evaluate(() => {
            localStorage.setItem('currentUser', JSON.stringify({ userID: 'admin', role: 'Admin' }));
            localStorage.setItem('employeeTable', JSON.stringify([{ userID: 'admin', position: 'Admin' }]));
            localStorage.setItem('servicePartTable', JSON.stringify([{ partID: 'p1', partName: 'Test Part', partCode: 'TEST', price: 10, isMandatory: false }]));
        });
        
        await page.reload();
        
        console.log('Page loaded');
        
        // Wait for the button
        await page.waitForSelector('.btn-edit');
        console.log('Found edit button, clicking it...');
        
        await page.click('.btn-edit');
        console.log('Clicked edit button');
        
        // Wait a bit to see if modal opens
        await new Promise(r => setTimeout(r, 500));
        
        const modalDisplay = await page.evaluate(() => {
            return document.getElementById('edit-part-modal').style.display;
        });
        
        console.log('Modal display is:', modalDisplay);
        
        await browser.close();
    } catch (err) {
        console.error('SCRIPT ERROR:', err);
    }
})();
