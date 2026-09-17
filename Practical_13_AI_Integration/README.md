# Practical 13: AI API Integration into a Web Application

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To integrate an external AI service into the existing application and understand responsible AI usage.

## Architecture & Features
- **Server-Side API Key Security**: The Google Gemini API key resides solely on the Express backend in `.env`, completely hidden from client network calls.
- **Graceful Degradation**: If the external AI API is unreachable, times out, or unkeyed, the server automatically engages a deterministic fallback engine so client workflows are never interrupted.
- **Rate Limiting (Supplementary Problem 2)**: Middleware limits requests to 1 AI generation per minute per client with retry-after headers.
- **AI Disclaimer (Supplementary Problem 3)**: The UI explicitly presents an informational badge clarifying that suggestions are machine-generated and subject to review.
- **Loading UI (Supplementary Problem 1)**: Integrated spinner and skeleton states during external inference.
