const version = (state = {
                            version: "0.0.1",
                            date: "1/1/2000"
                        }

, action) => {
    switch (action.type) {
        case 'GET_VERSION':
            return {...state};
        default:
            return state
    }
};

export default version