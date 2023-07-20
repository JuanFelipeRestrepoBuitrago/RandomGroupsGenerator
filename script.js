import {RandomGroupGenerator} from "./generator.js";

// It takes the dropdown element and its content to work with them
// Div element with the class dropdown
const dropdown = document.querySelector('.dropdown');
// Div element with the class dropdown-content
const dropdownContent = document.querySelector('.dropdown-content');
// An element with the class dropdown-link
const dropdownLink = document.querySelector('.dropdown-link');

// It takes the element that changes the language, which is the select element with the id change-language
const changeLanguage = document.querySelector('#change-language');

// It takes the no-leaders element with the id no-leaders
const noLeadersContainer = document.querySelector('#no-leaders');
// It takes the leaders element with the class leaders-container
const leadersContainer = document.querySelector('.leaders-container');
// Takes the add-leaders element with the id add-leaders
const addLeadersButton = document.querySelector('#add-leaders');
// It takes the remove-leaders element with the id remove-leaders
const removeLeadersButton = document.querySelector('#remove-leaders');

// It takes the textarea element with the id leaders
const leadersTextArea = document.querySelector('#leaders');

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

function toggleLeaders() {
    /**
     * Function to toggle the leaders container and the no leaders container
     * */
    // Toggle the inactive class of the leaders container
    leadersContainer.classList.toggle('inactive');
    // Toggle the inactive class of the no leaders container
    noLeadersContainer.classList.toggle('inactive');

}

function resizeTextAreas() {
    /**
     * Function to resize the textarea elements
     * */
    console.log('Resizing text areas');
    resizeTextArea(leadersTextArea);
    resizeTextArea(addParticipantsTextArea);
}

function resizeTextArea(element) {
    /**
     * Function to resize a textarea element when the user types more than one line
     *
     * @param {HTMLElement} element - The textarea element to resize
     * */
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

function countLeaders() {
    /**
     * Function to count the number of leaders
     *
     * @returns {String} - The number of leaders
     */
    // It takes the value of the textarea element and splits it by commas
    const leaders = leadersTextArea.value.split(',');

    // Counter variable
    let counter = 0;
    // For each leader in the array of leaders
    leaders.forEach(function(leader) {
        if (leader.match(/[a-zA-z]+(\s[a-zA-z]+)*/)) {
            counter ++;
        }
    });

    return String(counter);
}

function addLeader() {
    /**
     * Function to add a leader to the number of leaders
     * */
    // It takes the number of leaders
    const numberOfLeaders = document.querySelector('#leaders-number span');

    // Assign the counter to the number of leaders
    numberOfLeaders.innerHTML = countLeaders();

    // Resize the leaders textarea element
    resizeTextArea(leadersTextArea);
}

function addParticipant() {
    /**
     * Function to add a participant to the number of participants
     * */
    // It takes the number of participants
    const numberOfParticipants = document.querySelector('#participants-number span');

    // Assign the counter to the number of participants
    numberOfParticipants.innerHTML = countParticipants();

    // Resize the participants textarea element
    resizeTextArea(addParticipantsTextArea);
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
function showGroups(groups, leaders) {
    /**
     * Function to show the groups
     *
     * @param {Array} groups - The array of groups
     * @param {Array} leaders - The array of leaders
     */
    // It cleans the groups container
    groupsContainer.innerHTML = '';

    // For each group in the array of groups
    for (let i = 0; i < groups.length; i++) {
        const groupElement = document.createElement('div');
        groupElement.classList.add('group');

        const groupTitle = document.createElement('h1');
        groupTitle.innerHTML = `Group ${i + 1}:`;
        groupElement.appendChild(groupTitle);

        const groupMembers = document.createElement('ul');
        groupMembers.classList.add('members');

        // If the leaders container is active
        if (!leadersContainer.classList.contains('inactive')) {
            const leaderElement = document.createElement('li');
            leaderElement.classList.add('member');
            leaderElement.style.fontWeight = 'bold';
            leaderElement.innerHTML = leaders[i];
            groupMembers.appendChild(leaderElement);
        }

        groups[i].forEach(function(member) {
            const memberElement = document.createElement('li');
            memberElement.classList.add('member');
            memberElement.innerHTML = member;
            groupMembers.appendChild(memberElement);
        });

        groupElement.appendChild(groupMembers);

        groupsContainer.appendChild(groupElement);
    }
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
    } else if (!leadersContainer.classList.contains("inactive") && Number(countLeaders()) !== numberOfGroupsI) {
        if (document.documentElement.lang === 'es') {
            alert('El número de líderes debe ser igual al número de grupos');
        } else if (document.documentElement.lang === 'en') {
            alert('The number of leaders must be equal to the number of groups');
        }
        return;
    }

    // It takes the value of the textarea element
    const participants = addParticipantsTextArea.value.split(',');

    // It takes the random group generator
    const randomGroupGenerator = new RandomGroupGenerator(numberOfGroupsI, participants);

    // It generates the groups
    const groups = randomGroupGenerator.generateGroups();

    // Declare and initialize the leaders groups
    let leadersGroups = [];

    // If the leaders container is active, then generate the leaders groups
    if (!leadersContainer.classList.contains("inactive")) {
        // It takes the value of the leaders textarea element
        const leaders = leadersTextArea.value.split(',');
        // It creates a new group generator for the leaders
        const leadersGroupGenerator = new RandomGroupGenerator(numberOfGroupsI, leaders);
        // It generates the leaders groups
        leadersGroups = leadersGroupGenerator.generateGroups();
    }

    // It shows the groups
    showGroups(groups, leadersGroups);

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
window.addEventListener('resize', resizeTextAreas);

// It adds an event listener to the add leaders textarea element to change its height when the user types
// more than one line
leadersTextArea.addEventListener('input', addLeader);

// It adds an event listener to the dropdown link to toggle the dropdown content
dropdownLink.addEventListener('click',  toggleDropdown.bind(null, dropdownContent));

// It adds an event listener to the generate button to generate the groups
generateButton.addEventListener('click', generateGroups);

// It adds an event listener to the addLeaderButton to show the leaders textarea element
addLeadersButton.addEventListener('click', toggleLeaders);
// It adds an event listener to the removeLeaderButton to hide the leaders textarea element
removeLeadersButton.addEventListener('click', toggleLeaders);
