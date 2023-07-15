const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownLink = document.querySelector('.dropdown-link');

const changeLanguage = document.querySelector('#change-language');

function toggleDropdown(element) {
    element.classList.toggle('hidden');
}

document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target) && !dropdownContent.classList.contains('hidden')) {
        dropdownContent.classList.add('hidden');
    }
});

changeLanguage.addEventListener('change', function(event) {
    console.log(event.target.value);
    if (event.target.value === 'es') {
        window.location.href = '../';
    }
});
dropdownLink.addEventListener('click',  toggleDropdown.bind(null, dropdownContent));