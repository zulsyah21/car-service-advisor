# Date & Time Reference

**Last Updated:** 2026-06-14

## Current Heuristics
The local system provides the current local date and time in the `<ADDITIONAL_METADATA>` block of every message. Always inspect the metadata block first before looking up date or time.

## Local Time Retrieval (PowerShell)
If you need to retrieve the current date or time dynamically in this workspace via a command line:
```powershell
# Get standard full date and time
Get-Date

# Get formatted date/time (e.g., YYYY-MM-DD HH:mm:ss)
Get-Date -Format "yyyy-MM-dd HH:mm:ss"
```

## Timezone Information
- **Standard Timezone:** Malaysia Standard Time (MYT), UTC+08:00.
