import {RandomGroupGenerator} from "./generator.js";

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
// It takes the input element with the id groups-number-input
const groupsNumberInput = document.querySelector('#groups-number-input');

// It takes the generate button element with the class btn-generate
const generateButton = document.querySelector('.btn-generate');

// It takes the groups container element with the class groups-container
const groupsContainer = document.querySelector('.groups-container');

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

function addParticipant() {
    /**
     * Function to add a participant to the number of participants
     * */
    // It takes the number of participants
    const numberOfParticipants = document.querySelector('#participants-number span');

    // Assign the counter to the number of participants
    numberOfParticipants.innerHTML = countParticipants();

    // Resize the textarea element
    resizeTextArea();
}

function countParticipants() {
    /**
     * Function to count the number of participants
     *
     * @returns {number} - The number of participants
     * */
    // It takes the value of the textarea element
    const participants = addParticipantsTextArea.value;
    // It takes the array of participants, which is the value of the textarea element split by commas
    const array = participants.split(',');

    // Counter variable
    let counter = 0;
    // For each participant in the array of participants
    array.forEach(function(participant) {
        // If the participant is a group of people (it has a 'y' or an 'and' in the middle), then add 2 to the counter, otherwise, add 1
        if (/[a-zA-z]+(\s[a-zA-z]+)*\s(y|and|e)\s[a-zA-z]+(\s[a-zA-z]+)*/.test(String(participant))) {
            counter += 2;
        } else if (participant.match(/[a-zA-z]+(\s[a-zA-z]+)*/)) {
            counter ++;
        }
    });

    return String(counter);
}

// <div className="group">
//     <h1>Group 1:</h1>
//     <ul className="members">
//         <li className="member">Andrés Carrero y Tatiana Cuartas</li>
//         <li className="member">Fulanito</li>
//         <li className="member">Fulanita</li>
//     </ul>
// </div>
function showGroups(groups) {
    groupsContainer.innerHTML = '';
    groups.forEach(function(group) {
        const groupElement = document.createElement('div');
        groupElement.classList.add('group');

        const groupTitle = document.createElement('h1');
        groupTitle.innerHTML = `Group ${groups.indexOf(group) + 1}:`;
        groupElement.appendChild(groupTitle);

        const groupMembers = document.createElement('ul');
        groupMembers.classList.add('members');

        group.forEach(function(member) {
            const memberElement = document.createElement('li');
            memberElement.classList.add('member');
            memberElement.innerHTML = member;
            groupMembers.appendChild(memberElement);
        });

        groupElement.appendChild(groupMembers);

        groupsContainer.appendChild(groupElement);
    });
}

function generateGroups() {
    /**
     * Function to generate the groups
     * */
    // It takes the number of groups
    const numberOfGroupsI = Number(groupsNumberInput.value);
    if (countParticipants() < numberOfGroupsI) {
        if (document.documentElement.lang === 'es') {
            alert('El número de grupos es mayor que el número de participantes\nPor favor, cambia el número de grupos o añade más participantes');
        } else if (document.documentElement.lang === 'en') {
            alert('The number of groups is greater than the number of participants\nPlease, change the number of groups or add more participants');
        }
        return;
    } else if (numberOfGroupsI < 2) {
        if (document.documentElement.lang === 'es') {
            alert('El número de grupos debe ser mayor que 1');
        } else if (document.documentElement.lang === 'en') {
            alert('The number of groups must be greater than 1');
        }
        return;
    }

    // It takes the value of the textarea element
    const participants = addParticipantsTextArea.value.split(',');

    // It takes the random group generator
    const randomGroupGenerator = new RandomGroupGenerator(numberOfGroupsI, participants);

    // It generates the groups
    const groups = randomGroupGenerator.generateGroups();

    // It shows the groups
    showGroups(groups);

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
addParticipantsTextArea.addEventListener('input', addParticipant);
// It adds an event listener to the window to change the height of the textarea element when the user resizes the window
window.addEventListener('resize', resizeTextArea);

// It adds an event listener to the dropdown link to toggle the dropdown content
dropdownLink.addEventListener('click',  toggleDropdown.bind(null, dropdownContent));

// It adds an event listener to the generate button to generate the groups
generateButton.addEventListener('click', generateGroups);