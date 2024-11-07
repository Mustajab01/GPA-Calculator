# GPA Calculator

The GPA Calculator is a user-friendly web application that helps students track and manage their academic performance. With this tool, users can easily input their course scores and see their semester and cumulative GPA.

---

## Table of Contents

- [GPA Calculator](#gpa-calculator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Usage Guide](#usage-guide)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

---

## Features

1. **Semester Management**: Users can add, remove, and select semesters to view and update their course information.
2. **Course Management**: Users can add and remove courses within each semester, as well as input their scores.
3. **GPA Calculation**: The application automatically calculates the GPA for each semester and the cumulative GPA based on the user's input.
4. **GPA Calculation Table**: Users can view a table that displays the GPA values corresponding to various score ranges.
5. **Data Persistence**: User data is stored in the browser's local storage, ensuring that their progress is saved even after closing the app.
6. **Export Data**: Users can export their GPA data as an Excel (XLSX) file, with each semester's information in a separate sheet.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

1. Clone the repository and switch to the `react-app` branch:

   ```bash
   git clone https://github.com/Mustajab01/gpa-calculator.git
   cd gpa-calculator
   git checkout react-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and navigate to `http://localhost:5173`.

## Usage Guide

- **Adding a Semester**: Use the "Add Semester" button to create a new semester. This helps organize courses by term.
- **Adding Courses**: Within a semester, you can add courses along with their respective credits and scores.
- **GPA Calculation**: Once course details are added, the app will automatically calculate your semester GPA and update the cumulative GPA.
- **Exporting GPA Data**: Click the "Export to Excel" option to download an XLSX file of your GPA information, separated by semester.

## Technologies Used

- [Vite](https://vite.dev/): A fast build tool that optimizes development with features like hot module replacement.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/): A routing library for React applications.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [XLSX](https://github.com/SheetJS/sheetjs): A library for reading, manipulating, and writing spreadsheet files.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch: 
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them: 
    ```bash
    git commit -m 'Add some feature
    ```
4. Push to the branch: 
    ```bash
    git push origin feature/your-feature-name
    ```
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for providing a powerful and flexible CSS framework.
- [SheetJS](https://github.com/SheetJS/sheetjs) for the excellent XLSX library.
- [Lucide](https://lucide.dev/) for the high-quality open-source icons.

---