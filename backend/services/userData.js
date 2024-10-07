function getUserData(user) {
    console.log({id: user._id.toString(), name: user.name})
    return {id: user._id.toString(), name: user.name}
}

module.exports = {
    getUserData
}
