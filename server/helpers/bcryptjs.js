const bcrypt = require('bcryptjs')


function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash   
}

const comparePassword = (password, hash) => {
    console.log({password}, {hash},"<<<<<<COMPARING PASSWORD");
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    comparePassword
} 