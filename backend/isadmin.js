const Join = require('./models/Join')

const isadmin = async(id, myid) => {
try{
    const result = await Join.find({user: myid, group: id})
    if(result[0].role === 'admin') {
        return true
    }
    return false

}catch(err) {
    return false
}
}

module.exports = isadmin