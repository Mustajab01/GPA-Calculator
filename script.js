function createScoreInputs(numCourses) {
    const coursesDiv = document.getElementById("courseScores");
    coursesDiv.innerHTML = "";
    for (let i = 1; i <= numCourses; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "100";
        input.placeholder = `Course ${i} Score (1-100)`;
        input.id = `course${i}`;
        const gpaDisplay = document.createElement("span");
        input.addEventListener('input', handleInput);
        gpaDisplay.id = `gpa${i}`;
        gpaDisplay.className = "gpa";
        coursesDiv.appendChild(input);
        coursesDiv.appendChild(gpaDisplay);
        coursesDiv.appendChild(document.createElement("br"));
    }
}

// Event handler for input changes
function handleInput() {
    const score = parseFloat(this.value);
    const index = parseInt(this.id.replace("course", ""));
    const gpaDisplay = document.getElementById(`gpa${index}`);
    
    if (score >= 0 && score <= 100) {
        const courseGPA = calculateGPAFromScore(score);
        gpaDisplay.textContent = `(GPA: ${courseGPA.toFixed(2)})`;
        gpaDisplay.classList.remove('invalid-score');
    } else {
        gpaDisplay.textContent = 'Enter Scores 1-100';
        gpaDisplay.classList.add('invalid-score');
    }
}

// Function to calculate GPA
function calculateGPA() {
    const numCourses = parseInt(document.getElementById("numCourses").value);
    let totalScore = 0, totalGPA = 0, totalCourses = 0;
    
    for (let i = 1; i <= numCourses; i++) {
        const scoreInput = document.getElementById(`course${i}`);
        const gpaDisplay = document.getElementById(`gpa${i}`);
        const score = parseFloat(scoreInput.value);
        
        if (!isNaN(score) && score >= 0 && score <= 100) {
            totalScore += score;
            totalCourses++;
            const courseGPA = calculateGPAFromScore(score);
            totalGPA += courseGPA;
            gpaDisplay.textContent = `(GPA: ${courseGPA.toFixed(2)})`;
        } else {
            gpaDisplay.textContent = "";
        }
    }
    const resultElement = document.getElementById("result");
    if (totalCourses > 0) {
        const averageGPA = totalGPA / totalCourses;
        resultElement.innerHTML = `Your GPA is: ${averageGPA.toFixed(2)}`;
    } else {
        resultElement.innerHTML = "Please enter valid scores.";
    }
}

// Function to calculate GPA from score
function calculateGPAFromScore(score) {
    if (score >= 85) return 4.0;
    else if (score >= 80) return 3.8;
    else if (score >= 75) return 3.4;
    else if (score >= 71) return 3.0;
    else if (score >= 68) return 2.8;
    else if (score >= 64) return 2.4;
    else if (score >= 61) return 2.0;
    else if (score >= 57) return 1.8;
    else if (score >= 53) return 1.4;
    else if (score >= 50) return 1.0;
    else return 0.0;
}

// Event listener for number of courses input
document.getElementById("numCourses").addEventListener("input", function() {
    const numCourses = parseInt(this.value);
    if (!isNaN(numCourses) && numCourses > 0 && numCourses <= 100) {
        createScoreInputs(numCourses);
    } else {
        // Clear the input field if encounter large number
        this.value = "";
    }
});
