<template>
    <section>
      <h2>Register as a new user!</h2>
      <user-reg-form @save-data="saveData"></user-reg-form> 
    </section>
</template>

<script>
import UserRegForm from '../../components/users/UserRegForm.vue'
export default {
  components: { UserRegForm },
  methods:{
    saveData(data){
        this.$store.dispatch('userPreferences/registerUser', data);
        this.$router.replace('/');
    }
  }
}
</script>