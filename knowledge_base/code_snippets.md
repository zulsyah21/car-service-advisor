# Frequently Used Code Patterns & CLI Commands

**Last Updated:** 2026-06-14

## Development Server Commands
To start or manage the local Express server:
```powershell
# Run the local server in developer mode (with Nodemon auto-reload)
npm run dev

# Run the local server directly in node
node server.js

# Check for running tasks on specific ports (e.g. port 3000)
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

## Basic PowerShell File Operations
To perform common filesystem actions without spawning subagents or search tools:
```powershell
# Copy a file to another location (with overwrite)
Copy-Item -Path "source\file" -Destination "dest\file" -Force

# Delete a file
Remove-Item -Path "file_path" -Force

# List all items in a folder
Get-ChildItem -Path "folder_path"

# Find a string within files recursively
Get-ChildItem -Recurse | Select-String -Pattern "search_query"
```

## Local Storage DB Seeding Conventions
- Data structures are defined in [js/db-init.js](file:///c:/Users/ASUS/Documents/UiTM%20(DEGREE)/SEM%205/FYP/Web-Based%20Automated%20Car%20Service%20Advisor/js/db-init.js).
- When modifying database schemas, verify length checks or keys in the force-clear block to invalidate cache:
  ```javascript
  localStorage.removeItem('serviceScheduleTable');
  localStorage.removeItem('knowledgeBlockTable');
  localStorage.removeItem('serviceCategoryTable');
  ```
