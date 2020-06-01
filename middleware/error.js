const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
};






class AppError extends Error {
    constructor(errors, statusCode) {
        super(errors.join(","));
    
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }




}

AppError.USER_NOT_FOUND = new AppError(["User not found"], 400);
AppError.INVALID_CREDENTIALS = new AppError(["Invalid credentials"], 400);
AppError.QUEST_NOT_FOUND = new AppError(["Quest not found"], 404);
AppError.USER_QUEST_NOT_FOUND = new AppError(["User quest not found"], 404);
AppError.USER_QUEST_PAGE_NOT_FOUND = new AppError(["User quest page not found"], 404);
AppError.ELEMENT_NOT_FOUND = new AppError(["Element not found"], 404);
AppError.ELEMENT_VALIDATION_ERROR = new AppError(["Element validation error"], 404);
AppError.ELEMENT_COMPLETION_ERROR = new AppError(["Element completion error"], 404);




module.exports = { catchAsync, AppError };