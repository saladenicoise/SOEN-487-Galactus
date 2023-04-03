export default {
    registerUser(state, payload){
        state.userData.push(payload);
    },
    setUserData(state, payload){
       state.userData = payload;
    }
};