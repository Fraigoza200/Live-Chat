const users = []

function userJoin(id, username, room) {
    const user = {id, username, room}

    users.push()

    return user
}

function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

module.exports = {
    userJoin, getCurrentUser
}