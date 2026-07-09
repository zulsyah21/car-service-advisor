# Local API Reference & Integration Details

**Last Updated:** 2026-06-14

## Express Server Endpoints
The local server runs by default on `http://localhost:3000`. The file [server.js](file:///c:/Users/ASUS/Documents/UiTM%20(DEGREE)/SEM%205/FYP/Web-Based%20Automated%20Car%20Service%20Advisor/server.js) exposes the following API routes:

### 1. `GET /api/models`
- **Description:** Returns a list of all car models stored in the MySQL database.
- **Source:** Query against table `car_models`.
- **Response:** JSON array.

### 2. `GET /api/health`
- **Description:** Returns the system health status.
- **Response:**
  ```json
  { "status": "ok", "timestamp": "ISO_DATE_STRING" }
  ```

### 3. `GET /api/config`
- **Description:** Retrieves configurations from the environment variables (e.g. checks if a Gemini key is loaded).
- **Response:**
  ```json
  {
    "hasGeminiKey": true/false,
    "geminiApiKey": "API_KEY_OR_EMPTY"
  }
  ```

### 4. `POST /api/chatbot`
- **Description:** Sends a message to the Gemini API (`gemini-2.5-flash`) for a response using the role context `CarCare AI Advisor`.
- **Payload:**
  ```json
  {
    "message": "User query string",
    "history": [
      { "role": "user", "text": "previous user message" },
      { "role": "model", "text": "previous model message" }
    ]
  }
  ```
- **Response:**
  ```json
  { "reply": "Generated response string" }
  ```

## Database Connection
- Connected using connection pooling configured with environment variables:
  - `DB_HOST` (default: `localhost`)
  - `DB_USER` (default: `root`)
  - `DB_PASSWORD` (default: `""`)
  - `DB_NAME` (default: `car_service_advisor`)
