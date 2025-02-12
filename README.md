# Fetch Dog Finder

A web application built for Fetch's Frontend Take-Home Exercise. This project helps dog lovers search through a shelter dog database, filter by breed, and select favorites to generate a match for adoption.

## Table of Contents

- [Features](#features)
- [Demo](http://fetch-assignment-s3.s3-website.us-east-2.amazonaws.com/)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Features

- **User Authentication:**  
  Log in using name and email with authentication managed via HttpOnly cookies.  
- **Dog Search & Filtering:**  
  Search and filter shelter dogs by breed.  
- **Sorting & Pagination:**  
  Results are sorted (default by breed ascending) and paginated with Next/Previous controls.  
- **Favorites & Matching:**  
  Select favorites across pages and generate a match based on your selected dogs.  
- **Responsive Design:**  
  Built using Material-UI, the app is responsive and works across multiple screen sizes.  
- **Private Routes:**  
  Protected routes ensure that only authenticated users can access the search functionality.

## Demo

Deployed here:

[Live Demo](http://fetch-assignment-s3.s3-website.us-east-2.amazonaws.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (or [Yarn](https://yarnpkg.com/))
- [Vite](https://vite.dev/guide/)
- [Material UI](https://mui.com/material-ui/getting-started/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/174375hamzahmad/Fetch-Rewards-Assignment.git
2. **Change directory:**
   ```bash
   cd your-repo
3. **Install dependencies:**
   ```bash
   npm install
4. **Running the app:**
   ```bash
   npm run dev

