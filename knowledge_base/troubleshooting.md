# Troubleshooting Guide

**Last Updated:** 2026-06-14

## Local Storage Synchronization Issues
### Problem:
Changes made to the static seed data in [js/db-init.js](file:///c:/Users/ASUS/Documents/UiTM%20(DEGREE)/SEM%205/FYP/Web-Based%20Automated%20Car%20Service%20Advisor/js/db-init.js) (such as image paths, text details, or block additions) do not render in the browser.

### Solution:
The app caches data inside the client's `localStorage` (e.g. `serviceCategoryTable`, `knowledgeBlockTable`). If the browser finds these arrays, it bypasses the seeds.
- **Solution A (Programmatic force-reload):**
  Check the checkup routine at the top of the seeding block in `js/db-init.js`. Adjust the array length check or check for specific keys to programmatically remove items on mismatch:
  ```javascript
  const testCat = JSON.parse(localStorage.getItem('serviceCategoryTable')) || [];
  const hasNewImage = testCat.some(c => c.categoryID === 'cat10' && c.imagePath === 'images/lighting.jpg');
  if (testKB.length < 42 || !hasNewImage) {
      localStorage.removeItem('knowledgeBlockTable');
      localStorage.removeItem('serviceCategoryTable');
  }
  ```
- **Solution B (Manual):**
  Open the browser DevTools (F12) -> Application -> Local Storage -> Click target site -> Right-click and choose **Clear** (or run `localStorage.clear();` in the Console), then refresh the page.

## Database Connection Failures
### Problem:
Express server outputs `DB error: Connection Refused` or `Database query failed` on start.

### Solution:
1. Verify if XAMPP, WampServer, or local MySQL instance is running.
2. Check the port settings in the `.env` file (port 3306 by default).
3. Ensure the database name matches `car_service_advisor` and that the tables have been seeded correctly.
