/**
 * @file this file contains the RandomGroupGenerator class to generate random groups of people from an array of people, which is going to be
 * included in the index.html file
 * @author Juan Felipe Restrepo Buitrago
 * */

/**
 * Class to generate random groups of people from an array of people
 *
 * @class RandomGroupGenerator
 * @property {Array} people - The array of people to generate the groups from
 * @property {Array} groups - The array of groups generated
 * @property {Number} groupsSize - The size of the groups to generate
 */
class RandomGroupGenerator {
    /**
     * Constructor for the RandomGroupGenerator class
     * @param people - The array of people to generate the groups from
     * @param groupsSize - The size of the groups to generate
     * @param numberOfGroups - The number of groups to generate
     * @constructs RandomGroupGenerator
     * @default people = null
     * @default groupsSize = undefined
     * @default numberOfGroups = 0
     */
    constructor(people = null, groupsSize = undefined, numberOfGroups = 0) {
        // If the people array is not null, then assign it to the people property, otherwise, assign an empty array
        if (people) {
            this.people = people;
        } else {
            this.people = [];
        }
        // Generate the groups array empty
        this.groups = [];
        // Generate the groups array with the number of groups specified, and each group with an empty array
        for (let i = 0; i < numberOfGroups; i++) {
            this.groups.push([]);
        }
        // Assign the groupsSize property to the groupsSize parameter
        this.groupsSize = groupsSize;
    }

    /**
     * Method to add a person to the people array
     * @param person - The person to add to the people array
     */
    addPerson(person) {
        this.people.push(person);
    }

    /**
     * Method to remove a person from the people array
     * @param person - The person to remove from the people array
     */
    removePerson(person) {
        this.people.splice(this.people.indexOf(person), 1);
    }

    /**
     * Method to count the number of people in the people array
     * @returns {number} - The number of people in the people array
     */
    countPeople() {
        // Counter variable
        let counter = 0;
        // For each person in the people array
        for (let person of this.people) {
            // If the person is a group of people (it has a 'y' or an 'and' in the middle), then add 2 to the counter, otherwise, add 1
            if (/\s(y|and)\s/.test(person)) {
                counter += 2;
            } else {
                counter ++;
            }
        }

        // Return the counter
        return counter;
    }
}

// Test
function test() {
    let group = new RandomGroupGenerator();
    group.addPerson("John");
    group.addPerson("Mary");
    group.addPerson("Bob");
    group.addPerson("Nick");
    group.addPerson("Alex");
    group.addPerson("Alice");
    group.addPerson("Yolanda y Pipe");
    addRemove(group);
    countPeople(group);


}

// Add and remove people methods
function addRemove (generator) {
    console.log(generator.people);
    generator.removePerson("Bob");
    console.log(generator.people);
    generator.addPerson("Bob");
}

// Count people method
function countPeople(generator) {
    console.log(generator.countPeople());
}

test();
