/**
 * @file this file contains the RandomGroupGenerator class to generate random groups of people from an array of people, which is going to be
 * included in the index.html file
 * @author Juan Felipe Restrepo Buitrago
 * */

// Test
function test() {
    let group = new RandomGroupGenerator(3);
    group.addPerson("Bob and Alice");
    group.addPerson("John and Jane");
    group.addPerson("Jack and Jill");
    group.addPerson("Bob and Alice");
    group.addPerson("John");
    group.addPerson("Jane");
    group.addPerson("Jack");

    console.log(group.generateGroups());
    for (let i = 0; i < group.groups.length; i++) {
        console.log("Group " + String(i + 1)+ ": " + group.countPeople(group.groups[i]));
    }
}

/**
 * Class to generate random groups of people from an array of people
 *
 * @class RandomGroupGenerator
 * @property {Array} people - The array of people to generate the groups from
 * @property {Array} groups - The array of groups generated
 * @property {Number} groupsSize - The size of the groups to generate
 */
export class RandomGroupGenerator {
    /**
     * Constructor for the RandomGroupGenerator class
     * @param people - The array of people to generate the groups from
     * @param groupsSize - The size of the groups to generate
     * @param numberOfGroups - The number of groups to generate
     * @constructs RandomGroupGenerator
     * @default people = null
     * @default groupsSize = undefined
     */
    constructor(numberOfGroups, people = null, groupsSize = undefined) {
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
     * @param people - The people array to count the number of people from
     * @default people = undefined
     * @returns {number} - The number of people in the people array
     */
    countPeople(people = undefined) {
        // If the people parameter is not specified, then assign the people property to the people parameter
        if (!people) {
            people = this.people;
        }
        // Counter variable
        let counter = 0;
        // For each person in the people array
        for (let person of people) {
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

    /**
     * Method to generate the groups
     *
     * @param groupsSize - The size of the groups to generate
     * @returns {Array} - The array of groups generated
     */
    generateGroups(groupsSize = undefined) {
        // Gets the number of people for each group, if the groupsSize parameter is not specified, then it gets the groupsSize property
        // if the groupsSize property is not specified, then it gets the number of people divided by the number of groups
        if (!groupsSize) {
            if (this.groupsSize) {
                groupsSize = this.groupsSize;
            } else {
                groupsSize = Math.floor(this.countPeople() / this.groups.length);
            }
        }

        // Filter by couples
        let couples = this.people.filter(person => /\s(y|and)\s/.test(person));

        // Filter by single people
        let singlePeople = this.people.filter(person => !/\s(y|and)\s/.test(person));

        // Add the couples to the groups
        let counter = 0;
        // While there are couples left
        while (couples.length > 0) {
            // get a random couple
            let randomCouple = couples[Math.floor(Math.random() * couples.length)];
            // Add the couple to the group
            this.groups[counter].push(randomCouple);
            // Remove the couple from the couples array
            couples.splice(couples.indexOf(randomCouple), 1);
            // Increase the counter variable, if it is equal to the number of groups, then reset it to 0
            if (counter === this.groups.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
        }

        // Add the single people to the groups
        for (let i = 0; i < this.groups.length; i++) {
            let numberPeople = this.countPeople(this.groups[i]);
            // While the number of people in the group is less than the number of people for each group and there are single people left
            while (numberPeople + 1 <= groupsSize && singlePeople.length > 0) {
                // Get a random single person
                let randomSinglePerson = singlePeople[Math.floor(Math.random() * singlePeople.length)];
                // Add the single person to the group
                this.groups[i].push(randomSinglePerson);
                // Remove the single person from the single people array
                singlePeople.splice(singlePeople.indexOf(randomSinglePerson), 1);
                // Increase the number of people in the group
                numberPeople ++;
            }
        }
        // Add the remaining single people to the groups
        while (singlePeople.length > 0) {
            // Get a random group
            let randomGroup = this.groups[Math.floor(Math.random() * this.groups.length)];
            // If the number of people in the group is greater than the number of people for each group, then get another random group
            if (this.countPeople(randomGroup) > groupsSize) {
                continue;
            }
            // Get a random single person
            let randomSinglePerson = singlePeople[Math.floor(Math.random() * singlePeople.length)];
            // Add the single person to the group
            randomGroup.push(randomSinglePerson);
            // Remove the single person from the single people array
            singlePeople.splice(singlePeople.indexOf(randomSinglePerson), 1);
        }

        // Return the groups array
        return this.groups;
    }
}

test();