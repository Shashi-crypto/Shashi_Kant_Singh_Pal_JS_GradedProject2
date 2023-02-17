let resumesData;
let resumesArray = [];
let resumeArrayIndex = 0;

// HTML selectors
const previousButton = document.querySelector(".previousBtn");
const nextButton = document.querySelector(".nextBtn");
const searchInput = document.querySelector(".searchInput");
const invalidSearchContainer = document.querySelector('.invalidSearchContainer');
const resumeContainer = document.querySelector('.resumeContainer');

// fetch API to read local JSON file (Data.json)
fetch('./data/Data.json')
    .then(function (response) {
        return response.json();
    }).then((data) => {
        resumesData = data.resume;
        resumesArray = resumesData;
        searchResultVisibility();
        buttonsVisibility();
        populateAllDetails();
    }).catch(function (error) {
        console.error('Something went wrong while retrieving resumes data');
        console.error(error);
        alert('Something went wrong while retrieving resumes data');
    });

// function to populate all the details
function populateAllDetails() {
    const currentResume = resumesArray[resumeArrayIndex];
    populateBasicDetails(currentResume.basics);
    populateTechSkills(currentResume.skills.keywords);
    populateHobbies(currentResume.interests.hobbies);
    populateWorkDetails(currentResume.work);
    populateProjectDetails(currentResume.projects);
    populateEducationDetails(currentResume.education);
    populateInternshipDetails(currentResume.Internship);
    populateAchievementDetails(currentResume.achievements.Summary);
}

// function to populate basic details of the applicant eg: name, postion applied for, phone etc.
function populateBasicDetails(basicDetails) {
    document.querySelector("#applicantName").innerText = basicDetails.name;
    document.querySelector("#positionAppliedFor").innerText = `Applied For: ${basicDetails.AppliedFor}`;
    document.querySelector("#applicantPhoneNumber").innerText = basicDetails.phone;
    document.querySelector("#applicantEmail").innerText = basicDetails.email;
    document.querySelector("#applicantLinkedIn").innerHTML = `<a href="${basicDetails.profiles.url}" target="_blank">LinkedIn</a>`;
}

// function to populate technical skills of the applicant
function populateTechSkills(skills) {
    let techList = document.querySelector(".technicalSkillsList");
    techList.innerHTML = '';
    skills.forEach((skill) => {
        techList.innerHTML += `<li>${skill}<li>`;
    });
}

// function to populate hobbies of the applicant
function populateHobbies(hobbies) {
    let hobbyList = document.querySelector(".hobbiesList");
    hobbyList.innerHTML = '';
    hobbies.forEach((hobby) => {
        hobbyList.innerHTML += `<li>${hobby}<li>`;
    });
}

// function to populate work-experience detials of the applicant
function populateWorkDetails(workDetails) {
    let workExpList = document.getElementById('workExpDetails');
    workExpList.innerHTML = `<li><span>Company Name: </span>${workDetails["Company Name"]}</li>
        <li class="li-margin"><span>Position: </span>${workDetails["Position"]}</li>
        <li class="li-margin"><span>Start Date: </span>${workDetails["Start Date"]}</li>
        <li class="li-margin"><span>End Date: </span>${workDetails["End Date"]}</li>
        <li><span>Summary: </span> ${workDetails["Summary"]}</li>`;
}

// function to populate project related details of the applicant
function populateProjectDetails(projectDetails) {
    let projectList = document.getElementById('projectDetails');
    projectList.innerHTML = `<li><span>${projectDetails.name}: </span>${projectDetails.description}</li>`;
}

// function to populate education of the applicant
function populateEducationDetails(educationDetails) {
    let educationList = document.getElementById('educationDetails');
    educationList.innerHTML = `<li><span>UG: </span>${educationDetails.UG.institute}, ${educationDetails.UG.course}, 
        ${educationDetails.UG["Start Date"]}, ${educationDetails.UG["End Date"]}, ${educationDetails.UG.cgpa}</li>
        <li><span>PU: </span>${educationDetails["Senior Secondary"].institute}, ${educationDetails["Senior Secondary"].cgpa}</li>
        <li><span>High School: </span>${educationDetails["High School"].institute}, ${educationDetails["High School"].cgpa}</li>`;
}

// function to populate internship details of the applicant
function populateInternshipDetails(internshipDetails) {
    let internshipList = document.getElementById('internshipDetails');
    internshipList.innerHTML = `<li><span>Company Name: </span>${internshipDetails['Company Name']}</li>
        <li><span>Position: </span>${internshipDetails['Position']}</li>
        <li><span>Start Date: </span>${internshipDetails['Start Date']}</li>
        <li><span>End Date: </span>${internshipDetails['End Date']}</li>
        <li><span>Summary: </span>${internshipDetails['Summary']}</li>`;
}

// function to populate achievements of the applicant
function populateAchievementDetails(achievements) {
    let achievementList = document.getElementById('achievementDetails');
    achievementList.innerHTML = '';
    achievements.forEach((a) => {
        achievementList.innerHTML += `<li>${a}</li>`
    });
}

// function to check the visibilty of the "Previous" and "Next" buttons based on the available applicant profiles
function buttonsVisibility() {
    nextButton.style.visibility = (resumeArrayIndex + 1 >= resumesArray.length) ? 'hidden' : 'visible';
    previousButton.style.visibility = (resumeArrayIndex === 0) ? 'hidden' : 'visible';
};

// function to display the resume-container and invalid-search container based on the searched result
function searchResultVisibility() {
    if (resumesArray.length > 0) {
        invalidSearchContainer.style.display = "none";
        resumeContainer.style.display = "block";
    } else {
        invalidSearchContainer.style.display = "block";
        resumeContainer.style.display = "none";
    }
};

// click event gets triggered on click of "Next" button
document.querySelector(".nextBtn").addEventListener("click", function () {
    resumeArrayIndex += 1;
    populateAllDetails();
    buttonsVisibility();
});

// click event gets triggered on click of "Previous" button
document.querySelector(".previousBtn").addEventListener("click", function () {
    resumeArrayIndex -= 1;
    populateAllDetails();
    buttonsVisibility();
});

// input event should get triggered on searching of any keyword in the search input field 
document.querySelector('.searchInput').addEventListener('input', function (event) {
    const searchInputValue = event.target.value;
    if (searchInputValue.length > 0) {
        resumesArray = resumesArray.filter((resume) =>
            resume.basics.AppliedFor
                .toLowerCase()
                .includes(searchInputValue.toLowerCase())
        );
    } else
        resumesArray = resumesData;
    resumeArrayIndex = 0;
    if (resumesArray.length > 0) {
        populateAllDetails();
    }
    searchResultVisibility();
    buttonsVisibility();
});

// function call 
buttonsVisibility();

