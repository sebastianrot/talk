const Join = require('./models/Join')

const ingroup = async(id, myid) => {
    try{
        const result = await Join.find({group: id, user: myid})
            if(result.length === 0) return 'reject'
            return result[0].status
    }catch(err) {
        return 'reject'
    }
}

module.exports = ingroup