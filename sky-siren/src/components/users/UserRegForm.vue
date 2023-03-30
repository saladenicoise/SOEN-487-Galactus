<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstName"/>
        </div>
        <div>
            <label>Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastName"/>
        </div>
        <div>
            <h3>Preferences</h3>
            <div>
            <label>Language &nbsp;</label>
            <select v-model="preferences[0]">
                <option value="en">en</option>
                <option value="fr">fr</option>
            </select>
        </div>
        <div>
            <label>Temprature unit &nbsp;</label>
            <select v-model="preferences[1]">
                <option value="Fahrenheit ">Fahrenheit </option>
                <option value="Celsius ">Celsius</option>
            </select>
        </div>
        <button>register</button>
        </div>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName:'',
            lastName:'',
            preferences:[],
        }
    },
    methods: {
        submitForm(){
            const formData = {
                firstN: this.firstName,
                lastN: this.lastName,
                prefs: this.preferences, 
            };
            console.log(formData);
            this.$emit('save-data', formData);
        }
    },
}
</script>