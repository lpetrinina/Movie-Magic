
export const getErrorMessage = (err) => {

    switch (err.name) {
        case 'ValidationError': //handle errors from model validations
            return Object.values(err.errors).at(0).message;

        default:
            return err.message; //handle errors from servise validations
    };
};