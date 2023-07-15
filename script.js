// It takes the dropdown element and its content to work with them
// Div element with the class dropdown
const dropdown = document.querySelector('.dropdown');
// Div element with the class dropdown-content
const dropdownContent = document.querySelector('.dropdown-content');
// A element with the class dropdown-link
const dropdownLink = document.querySelector('.dropdown-link');

// It takes the element that changes the language, which is the select element with the id change-language
const changeLanguage = document.querySelector('#change-language');

// It takes the textarea element with the id add-participants
const addParticipantsTextArea = document.querySelector('#add-participants');

function toggleDropdown(element) {
    /**
     * Function to toggle the hidden class of an element
     *
     * @param {HTMLElement} element - The element to toggle the hidden class
     * */
    element.classList.toggle('hidden');
}

function resizeTextArea() {
    /**
     * Function to resize the participants textarea element when the user types more than one line
     * */
    addParticipantsTextArea.style.height = 'auto';
    addParticipantsTextArea.style.height = addParticipantsTextArea.scrollHeight + 'px';
}

// It adds an event listener to the document to hide the dropdown content when the user clicks outside of it
document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target) && !dropdownContent.classList.contains('hidden')) {
        dropdownContent.classList.add('hidden');
    }
});

// It adds an event listener to the change language select element to change the language of the page
// by redirecting to the other page
changeLanguage.addEventListener('change', function(event) {
    if (event.target.value === 'es') {
        window.location.href = '../';
    } else if (event.target.value === 'en') {
        window.location.href = './english/';
    }
});

// It adds an event listener to the add participants textarea element to change its height when the user types
// more than one line
addParticipantsTextArea.addEventListener('input', resizeTextArea);
// It adds an event listener to the window to change the height of the textarea element when the user resizes the window
window.addEventListener('resize', resizeTextArea);

// It adds an event listener to the dropdown link to toggle the dropdown content
dropdownLink.addEventListener('click',  toggleDropdown.bind(null, dropdownContent));