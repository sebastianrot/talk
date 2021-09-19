const Follow = require('./models/Follow')

const isfollowing = async(id, myid) => {
try{
    const result = await Follow.find({user: id, follower: myid})
        if(result.length === 0) return false
        return true
}catch(err) {
    return false
}
}

module.exports = isfollowing