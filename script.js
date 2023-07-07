// Class
class groupGenerator {
    constructor() {
        this.people = [];
        this.groups = [];
        this.groupSize = undefined;
    }

    addPerson(person) {
        this.people.push(person);
    }

    removePerson(person) {
        this.people.splice(this.people.indexOf(person), 1);
    }

    countPeople() {
        let counter = 0;
        for (let person of this.people) {
            if (person.includes("y")) {
                counter += 2;
            } else {
                counter ++;
            }
        }
    }
}

// Test
function test() {
    let group = new groupGenerator();
    addRemove(group);

}

// Add and remove people methods
function addRemove (generator) {
    generator.addPerson("John");
    generator.addPerson("Mary");
    generator.addPerson("Bob");
    generator.addPerson("Nick");
    generator.addPerson("Alex");
    generator.addPerson("Alice");
    console.log(generator.people);
    generator.removePerson("Bob");
    console.log(generator.people);
}

// Count people method
function countPeople(generator) {
    generator.countPeople();
}

test();
