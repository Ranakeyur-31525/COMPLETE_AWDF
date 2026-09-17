# Practical 7: Authentication and Middleware Pipeline

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To implement JWT-based authentication and input validation as part of the Express middleware pipeline.

## Features Implemented
1. **User Model with Bcrypt**: Secure password hashing with salt rounds in pre-save hook and `comparePassword` instance method.
2. **JWT Authentication Middleware**: Intercepts requests, validates `Authorization: Bearer <token>`, verifies signature/expiry, and injects `req.user`.
3. **Reusable Validation Middleware**:
   - `validateRegister`: checks name length, email regex, password minimum length.
   - `validateLogin`: checks mandatory credentials.
   - `validateTask`: enforces task title minimum 3 chars and priority enum.
4. **Protected Task Endpoints**: Restricts all task CRUD routes to authenticated users with user isolation.
5. **Supplementary Problems Solved**:
   - `/api/auth/me` endpoint returns currently logged-in user profile from decoded JWT.
   - Client-side token expiry handling: automatically clears token and redirects on 401.
   - Explicit user logout mechanism.
