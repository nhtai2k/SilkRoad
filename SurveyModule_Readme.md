# Survey System - ASP.NET Core

## Overview
This project is a **survey management system** built with **ASP.NET Core**.  
It allows administrators to design surveys using a **question library** and provides flexible options for structuring surveys with or without question groups.  
The system supports multiple types of questions and records participant responses for later analysis.

---

## Core Features
- **SurveyForm**
  - Represents a survey instance.
  - Can contain question groups or standalone questions.
  - Supports flexible structure: with groups, without groups, or both.

- **QuestionGroup**
  - Optional grouping mechanism inside a survey form.
  - Allows organizing questions by sections or topics.

- **Question**
  - Central element of a survey.
  - A question can:
    - Belong directly to a survey (no group).
    - Belong to a group inside the survey.
  - Questions can be created directly or cloned from the **QuestionLibrary**.

- **AnswerOption**
  - Defines available choices for closed-ended or hybrid questions.

- **Response**
  - Stores participant answers.
  - Supports both selected options and free-text responses.

---

## Data Model
The core database entities include:

- **SurveyForm** (1 → 0..n **QuestionGroup**)  
- **SurveyForm** (1 → 0..n **Question**)  
- **QuestionGroup** (1 → 0..n **Question**)  
- **Question** (1 → 0..n **AnswerOption**)  
- **Question** (1 → 0..n **Response**)  

> By using a `nullable QuestionGroupId` in the `Question` table, the system supports both grouped and standalone questions.

---

## Question Library
The system includes a **QuestionLibrary** and **QuestionGroupLibrary**.  
These libraries provide reusable templates when creating surveys.  
When a question is selected from the library, it is **cloned** into the survey to allow independent modifications.

---

## Question Types
The system currently supports **4 main types of questions**:

1. **Closed-ended question**  
   - Predefined answer choices.  
   - Example: *Do you drink tea? (Yes/No)*

2. **Open-ended question**  
   - Free-text answer.  
   - Example: *What challenges do you face when learning programming?*

3. **Hybrid question**  
   - Has predefined choices but allows custom answers.  
   - Example: *Which framework do you use? (Angular, React, Vue, Other: ___)*

4. **Rating question**  
   - Uses a scale (e.g., 1–5 stars, Likert scale).  
   - Example: *How satisfied are you with our service?*

> Extension ideas: multiple choice (select many), matrix/grid questions, ranking, dropdown.

---

## Survey Reporting & Analytics

### Objectives
The reporting module provides administrators with insights into survey results.  
It summarizes participant responses and visualizes data for better decision-making.  

### General Reports
- Number of participants.  
- Completion rate (% of participants who finished the survey).  
- Total number of questions answered.  

### Question-wise Reports
- **Closed-ended questions**  
  - Count responses for each answer option.  
  - Display results as bar chart or pie chart.  
  - Example:  
    - Yes: 70%  
    - No: 30%  

- **Open-ended questions**  
  - List raw responses for qualitative review.  
  - Provide export to Excel/CSV.  
  - Optionally apply text analytics (keyword extraction, word cloud).  

- **Hybrid questions**  
  - Show frequency of predefined choices.  
  - Aggregate and display custom “Other” inputs.  

- **Rating questions**  
  - Calculate average, median, min/max values.  
  - Show distribution of ratings (e.g., how many rated 5 stars, 4 stars, etc.).  
  - Visualize with bar chart, gauge chart, or Likert distribution.  

### Technical Approach
- **Backend (ASP.NET Core)**  
  - Implement reporting APIs to return aggregated data.  
  - Example:  
    - `GET /api/reports/survey/{id}/summary`  
    - `GET /api/reports/survey/{id}/questions/{questionId}`  

- **Frontend (Angular)**  
  - Use chart libraries such as **Chart.js**, **Recharts**, or **ApexCharts** for data visualization.  
  - Provide filtering by survey, question type, or participant group.  

- **Export Options**  
  - Export reports to **Excel** or **PDF** for offline analysis.  
  - Provide raw data export for integration with BI tools (Power BI, Tableau, Grafana).  

---

## Technology Stack
- **Backend**: ASP.NET Core 9, Entity Framework Core
- **Database**: SQL Server
- **Frontend** (future integration): Angular

---

## Future Improvements
- Add support for **multiple choice questions** (checkboxes).  
- Add **matrix questions** for evaluating multiple criteria on the same scale.  
- Enhance **reporting and analytics** (charts, statistics).  
- Implement **export/import surveys** from JSON or Excel.  

---

## License
This project is currently under development for internal use. Licensing details will be defined later.
