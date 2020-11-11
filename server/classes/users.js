class Users {
    constructor() {
        this.people = [];
    }

    // Add a person to people list and return the list.
    addPerson(id, name, room) {
        this.people.push({ id: id, name: name, room: room });

        return this.people;
    }

    // Get person by id.
    getPersonById(id) {
        return this.people.filter(person => person.id === id)[0];
    }

    // Get people list.
    getPeople() {
        return this.people;
    }

    // Get people by room.
    getPeopleByRoom(room) {
        return this.people.filter(person => person.room === room);
    } 

    // Remove a person by id and return the deleted person.
    removePersonById(id) {
        let deletedPerson = this.getPersonById(id);
        this.people = this.people.filter(person => person.id !== id);

        return deletedPerson;
    }
}

module.exports = {
    Users,
}