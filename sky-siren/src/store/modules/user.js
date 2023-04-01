// Firebase Imports
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';

const state = {
    userId: null,
    userData: null,
}

const mutations = {
    setUserId(state, payload) {
        console.log('Setting user id', payload);
        state.userId = payload;
    },
    setUserData(state, payload) {
        console.log('Setting user data', payload);
        state.userData = payload;
    }
}

const actions = {
    async signIn(context, payload) {
        console.log('Signing in user', payload.email);

        signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                console.log('User signed in');
                context.commit('setUserId', userCredential.user.uid);
                context.dispatch('syncUserData');
            })
            .catch((error) => {
                console.log('Error signing in', error);
                throw new Error(error.message || 'Failed to sign in');
            });
    },
    async signOut(context) {
        console.log('Signing out user');

        signOut(auth).then(() => {
            console.log('User signed out');
            context.commit('setUserId', null);
            context.commit('userData', null);
        }).catch((error) => {
            console.log('Error signing out', error);
            throw new Error(error.message || 'Failed to sign out');
        });
    },
    async signUp(context, payload) {
        console.log('Signing up user', payload);

        createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                console.log('User signed up');
                context.commit('setUserId', userCredential.user.uid);

                delete payload.password;
                context.dispatch('saveUserData', payload);
            })
            .catch((error) => {
                console.log('Error signing up', error);
                throw new Error(error.message || 'Failed to sign up');
            });
    },
    async saveUserData(context, payload) {
        console.log('Saving user data', payload);
        const userRef = ref(db, 'users/' + context.state.userId);
        
        set(userRef, payload)
            .then(() => {
                console.log('User data saved');
                context.dispatch('syncUserData');
            })
            .catch((error) => {
                console.log('Error saving user data', error);
                throw new Error(error.message || 'Failed to save user data');
            });
    },
    async updateUserData(context, payload) {
        console.log('Updating user', payload);
        const userRef = ref(db, 'users/' + context.state.userId);
        
        update(userRef, payload)
            .then(() => {
                console.log('User data updated');
                context.dispatch('syncUserData');
            })
            .catch((error) => {
                console.log('Error updating user data', error);
                throw new Error(error.message || 'Failed to update user data');
            });
    },
    async syncUserData(context) {
        console.log('Syncing user data');
        const userRef = ref(db, 'users/' + context.state.userId);
        
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('User data retrieved', snapshot.val());
                    context.commit('setUserData', snapshot.val());
                } else {
                    console.log('No user data found');
                }
            })
            .catch((error) => {
                console.log('Error syncing user data', error);
                throw new Error(error.message || 'Failed to sync user data');
            });
    }
}

const getters = {
    userId(state) {
        return state.userId;
    },
    userData(state) {
        return state.userData;
    },
    isAuthenticated(state) {
        return !!state.userId;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
