const formSelector = document.querySelector('form');
const formComment = formSelector.elements['guestComment'];
const nameInput = formSelector.elements['guestName'];
const emailInput = formSelector.elements['guestEmail'];
const submitBTN = formSelector.elements['guestSubmit'];
let userName = "Anonymous";
const commentContainer = document.querySelector('.commentsContainer');

// Add submit form event listener
formSelector.addEventListener('submit', function (buttonE) {
    buttonE.preventDefault();
    // Function to check that the form is filled out
    checkFormComplete();

    function checkFormComplete() {
        // If email is valid and form comment isn't empty
        if (isValidEmail(emailInput) && formComment.value) {
            // Form comment and email address are mandatory
            checkUserName();
            // If the current form is NOT the contact form: (i.e.: has NO class name)
            if (!formSelector.className) {
                addAComment();
            }
            clearForm();
            disableForm();
        } else {
            if (!formSelector.className) {
                highlightEmpty(formSelector.elements, 'pink');
            } else {
                highlightEmpty(formSelector.elements, 'red');
            }
        }
    }
    // Helper function to assign anonymous user name if it was not supplied
    function checkUserName() {
        if (nameInput.value) {
            userName = nameInput.value;
        }
    }
    // Clears the form and resets userName to "Anonymous" as default
    function clearForm() {
        formSelector.reset();
        userName = "Anonymous";
    }
    // Helper function to add a comment to the page
    function addAComment() {
        const newComment = `
                            <div class="profilePic"> <img src="./assets/pexels-photo-556666.jpg"
                                    alt="A profile photo of ${userName}"></div>

                            <div class="userTextCont">
                                <p>${findDate()} by ${userName}</p>
                                <p>${formComment.value}</p>
                            </div>      
        `;

        const newCommentInnerC = document.createElement('div');
        newCommentInnerC.classList.add('commentsInnerCont');
        newCommentInnerC.innerHTML = newComment;
        newCommentInnerC.animate([
            // animation keyframes
            { opacity: 0 },
            { opacity: 1 }
        ], {
            // animation timing function
            duration: 1500,
            iterations: 1
        });

        // Appends new comment as preformatted HTML to end of comment container
        commentContainer.appendChild(newCommentInnerC);
    }
})

// Function to disable the form after a comment has been added successfully.
function disableForm() {
    submitBTN.classList.add('disabledBTN');
    submitBTN.style.opacity = 0.5;
    submitBTN.disabled = 'true';
}

// Helper function to find the date string of today and parse it as a date for the new comment.
function findDate() {
    const today = new Date();
    const year = today.getFullYear();
    const date = today.getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daySuffix = ['st', 'nd', 'rd', 'th'];
    let chosenSuffix;
    const day = dayOfWeekNames[today.getDay()];
    const month = monthNames[today.getMonth()];

    findDaySuffix();
    const dateString = `${day} ${month} ${date}${chosenSuffix}, ${year}`;
    return dateString;

    // Function to find suffix of current date (ordinal)
    function findDaySuffix() {
        //if day = 1, 21 -> st
        //if day = 2, 22 -> nd
        //if day = 3, 23 -> rd
        //else, day -> th
        if (day === 1 || day === 21) {
            chosenSuffix = daySuffix[0];
        } else if (day === 2 || day === 22) {
            chosenSuffix = daySuffix[1];
        } else if (day === 3 || day === 23) {
            chosenSuffix = daySuffix[2];
        } else {
            chosenSuffix = daySuffix[3];
        }
    }
}

// Function to highlight empty inputs (skips the button element and the guest name)
function highlightEmpty(formElements, borColor) {
    for (let index = 0; index < formElements.length; index++) {
        if (formElements[index].nodeName !== 'BUTTON' && formElements[index].id !== 'guestName') {
            if (!formElements[index].value) {
                formElements[index].style['borderColor'] = borColor;
            }
        }
    }
}

// function to check that a valid email address is added. highlights invalid email with a pink border color for the blog form, and a red border color for the contact form.
function isValidEmail(emailToVerify) {
    if (emailToVerify.value) {
        if (!emailToVerify.validity.valid) {
            if (!formSelector.className) {
                emailToVerify.style['borderColor'] = `pink`;
            } else {
                emailToVerify.style['borderColor'] = `red`;
            }
            return false;
        } else {
            emailToVerify.style['borderColor'] = `#86E0F9`;
            return true;
        }
    } else {
        emailToVerify.style['borderColor'] = `#86E0F9`;
    }
}


// When the submit button loses focus, return all form borders to their original color
submitBTN.addEventListener('focusout', function () {
    highlightEmpty(formSelector.elements, '#86E0F9');
});

// Validate email address on focus out
emailInput.addEventListener('focusout', function () {
    isValidEmail(emailInput);
})