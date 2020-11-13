function errorHandler (err, req, res, next) {
    let msg = ''
    let code = ''
    console.log("ERROR HANDLER");
    console.log(err);

    switch(err.name) {
        case 'SequelizeValidationError':
            let errors = [];
            err.errors.forEach(el => {
                errors.push(el.message);
            });
            code = 400
            msg = `${errors}`
            break;

        case 'Wrong Email or Password':
            code = 404
            msg = 'Wrong Email or Password'
            break
            
        case 'Not Found':
            code = 404
            msg = 'Data not found'
            break
            
        case 'Unauthenticated':
            code = 401
            msg = 'Unauthenticated. You need to login first'
            break

        case 'Not Authorized':
            code = 403
            msg = 'You are not Authorized'
            break
        case 'Bad Request':
            code = 400
            msg = 'Please input email and/or password'
            break
        case 'Empty Column':
            code = 400
            msg = 'This column should not be empty!'
            break
        default:
            code = 500
            msg = 'Internal Server Error'
            break
    }

  return res.status(code).json({msg})
}

module.exports = errorHandler