const createMessage = (name, message) => {
    return { name: name, message: message, date: new Date().getTime() };
}

module.exports = {
    createMessage,
}