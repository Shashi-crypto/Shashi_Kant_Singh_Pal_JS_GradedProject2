function pushUserstoLocalStorage() {
    const validUserData = [{
        username: "Shashi",
        password: "Shashi"
    }, {
        username: "admin",
        password: "admin"
    }
    ];
    // To store validUserData as valid username and password in the local-storage
    localStorage.setItem('LoginUsers', JSON.stringify(validUserData));
}

function disableBack() {
    const msg = "Successful";

    // try catch method to check whether the user already logged or not.
    try {
        var checkLogin = sessionStorage.getItem("login");
        if (checkLogin === msg) {
            window.history.forward(); // function to restrict from going back to the login page
        }
    } catch (error) {
        console.log(error);
    }
}


// Validation code for inputs
const userName = document.getElementById('username');
const password = document.getElementById('password');
const errorElem = document.getElementById('error');

userName.addEventListener('input', username_verify);
password.addEventListener('input', password_verify);

// Submit event gets triggered
document.querySelector('.login_form').addEventListener('submit', function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // validated() will be called when the form is submitted
    validated();
});

// function to validate input fields
function validated() {
    if (userName.value.length === 0 && password.value.length === 0) {
        userName.style.border = '1px solid red';
        password.style.border = '1px solid red';
        errorElem.style.display = 'block';
        return false;
    } else if (userName.value.length === 0) {
        userName.style.border = '1px solid red';
        errorElem.style.display = 'block';
        userName.focus();
        return false;
    } else if (password.value.length === 0) {
        password.style.border = '1px solid red';
        errorElem.style.display = 'block';
        password.focus();
        return false;
    } else {
        login();
    }
}

// function to verify the username
function username_verify() {
    if (userName.value.length > 0) {
        userName.style.border = '1px solid silver';
        errorElem.style.display = 'none';
        return true;
    }
}

// function to verify the password
function password_verify() {
    if (password.value.length > 0) {
        password.style.border = '1px solid silver';
        errorElem.style.display = 'none';
        return true;
    }
}

// function to verify that the entered credentials are valid (same as in the local-storage) and navigate to resume-page
function login() {
    if (localStorage.getItem('LoginUsers')) {
        const userDetails = JSON.parse(localStorage.getItem('LoginUsers'));
        const currentUser = userDetails.find((user) => {
            if (userName.value === user.username) {
                return user;
            }
        });
        if ((userName.value.length && password.value.length) !== 0 && currentUser === undefined) {
            userName.style.border = '1px solid red';
            password.style.border = '1px solid red';
            errorElem.style.display = 'block';
            return false;
        }
        if (currentUser.password === password.value) {
            alert('You are successfully logged in');
            sessionStorage.setItem("login", "Successful");

            // Navigate to resume page
            window.location.href = "./resume-page.html";
            return true;
        }
        if (password.value.length !== 0) {
            console.log('Invalid Username/Password.');
            password.style.border = '1px solid red';
            errorElem.style.display = 'block';
            return false;
        }
    } else
        alert('User details is not stored');
}

