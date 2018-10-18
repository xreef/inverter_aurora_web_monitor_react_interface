const version = (state = {
                            version: "0.0.1",
                            date: "1/1/2000"
                        }

, action) => {
    switch (action.type) {
        case 'SET_VERSION':
            return {version: action.version, date: new Date().toISOString()};
        default:
            return state
    }
};

export default version