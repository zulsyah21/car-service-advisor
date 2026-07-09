const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('parts.html', 'utf8');
const scriptJs = fs.readFileSync('js/script.js', 'utf8');
const dbInitJs = fs.readFileSync('js/db-init.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost:3000/parts.html" });
const window = dom.window;

// Setup mock local storage
let store = {};
window.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => store[key] = val,
    removeItem: (key) => delete store[key],
    clear: () => store = {}
};

window.localStorage.setItem('currentUser', JSON.stringify({ userID: 'u1', username: 'izzuls', role: 'Admin' }));
window.localStorage.setItem('employeeTable', JSON.stringify([{ employeeID: "e1", userID: "u1", position: "Admin", managerID: null }]));

// Execute db-init and script
try {
    window.eval(dbInitJs);
    window.eval(scriptJs);
    
    // Simulate DOM load
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
    
    console.log("Tables seeded. servicePartTable has: " + JSON.parse(window.localStorage.getItem('servicePartTable')).length);

    // Call renderAdminTable manually if needed or let script do it
    console.log("tbody rows: " + window.document.getElementById('admin-parts-tbody').innerHTML.length);
    
    // Find first edit button
    const editBtn = window.document.querySelector('.btn-edit');
    if (editBtn) {
        console.log("Found edit button. Clicking it.");
        editBtn.click();
        
        console.log("Modal display style:", window.document.getElementById('edit-part-modal').style.display);
        console.log("Input name value:", window.document.getElementById('edit-part-name').value);
        
        // Change name
        window.document.getElementById('edit-part-name').value = "MODIFIED NAME";
        
        // Mock confirm
        window.confirm = (msg) => {
            console.log("CONFIRM TRIGGERED:", msg);
            return true;
        };
        
        window.alert = (msg) => {
            console.log("ALERT TRIGGERED:", msg);
        };
        
        // Click save
        window.document.getElementById('save-edit-btn').click();
        
        console.log("After save, servicePartTable first item name:", JSON.parse(window.localStorage.getItem('servicePartTable'))[0].partName);
    } else {
        console.log("No edit button found.");
    }
} catch(e) {
    console.error("ERROR:", e);
}
