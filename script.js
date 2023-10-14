function createScoreInputs(numCourses) {
    let coursesDiv = document.getElementById("courseScores");
    coursesDiv.innerHTML = "";
    for (let i = 1; i <= numCourses; i++) {
        let label = document.createElement("label");
        label.innerHTML = `Enter score for Course ${i}: `;
        let input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "100";
        input.placeholder = "Enter score";
        input.id = `course${i}`;
        coursesDiv.appendChild(label);
        coursesDiv.appendChild(input);
        coursesDiv.appendChild(document.createElement("br"));
    }
}

function calculateGPA() {
    let numCourses = document.getElementById("numCourses").value;
    let totalScore = 0;
    let totalGPA = 0;
    let totalCourses = 0;
    for (let i = 1; i <= numCourses; i++) {
        let score = parseFloat(document.getElementById(`course${i}`).value);
        if (!isNaN(score) && score >= 0 && score <= 100) {
            totalScore += score;
            totalGPA += calculateGPAFromScore(score);
            totalCourses++;
        }
    }
    if (totalCourses > 0) {
        let averageScore = totalScore / totalCourses;
        let averageGPA = totalGPA / totalCourses;
        document.getElementById("result").innerHTML = `Your GPA is: ${averageGPA.toFixed(2)}`;
    } else {
        document.getElementById("result").innerHTML = "Please enter valid scores.";
    }
}

function calculateGPAFromScore(score) {
    if (score >= 85) {
        return 4.0;
    } else if (score >= 80) {
        return 3.8;
    } else if (score >= 75) {
        return 3.4;
    } else if (score >= 70) {
        return 3;
    } else if (score >= 68) {
        return 2.8;
    } else if (score >= 64) {
        return 2.4;
    } else if (score >= 60) {
        return 2.0;
    } else if (score >= 57) {
        return 1.8;
    } else if (score >= 53) {
        return 1.4;
    } else if (score >= 50) {
        return 1.0;
    } 
    else {
        return 0.0;
    }
}

document.getElementById("numCourses").addEventListener("input", function() {
    let numCourses = parseInt(this.value);
    if (!isNaN(numCourses) && numCourses > 0) {
        createScoreInputs(numCourses);
    }
});
