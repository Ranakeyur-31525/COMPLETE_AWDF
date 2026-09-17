# Practical 12: CI/CD Pipeline with GitHub Actions

[![AWDF CI/CD Pipeline](https://github.com/Ranakeyur-31525/awdf/actions/workflows/ci.yml/badge.svg)](https://github.com/Ranakeyur-31525/awdf/actions/workflows/ci.yml)

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To automate testing and deployment of the application using a CI/CD pipeline.

## Pipeline Architecture
- **Trigger**: Automatically executes on `push` and `pull_request` targeting `main`.
- **Job 1 (Linting)**: Verifies code quality and file structure with Node.js 18.x and npm cache.
- **Job 2 (Build & Test)**: Spins up ephemeral MongoDB service container, installs dependencies, and runs automated assertion suite.
- **Reporting**: Emits clear Green Checkmark (pass) or Red Cross (fail) with step execution logs.

## Pipeline Failure and Recovery Demonstration
1. **Broken Test Simulation**: Run `npm run test:fail` -> exits with code 1, halting pipeline and preventing deployment of bad code.
2. **Fixed Test Verification**: Corrected code passes all 5 assertion tests with exit code 0 -> pipeline completes successfully.
