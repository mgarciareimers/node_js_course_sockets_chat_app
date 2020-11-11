const createMessage = (id, name, message) => {
    return { id: id, name: name, message: message, date: new Date().getTime() };
}

module.exports = {
    createMessage,
}