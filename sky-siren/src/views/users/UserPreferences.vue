<template>
    <section>
            <user-info
            :key="userData.id"
            :first-name="userData.firstName"
            :last-name="userData.lastName"
            :preferences="userData.preferences"
            ></user-info>

    </section>
    
</template>

<script>
import UserInfo from '../../components/users/UserInfo.vue';
export default {
  components: { UserInfo },
    computed:{
        userData(){
            return this.$store.getters['userPreferences/userData'];
        }
    },
    created(){
        this.loadUserPrefs();
    },
    methods: {
        loadUserPrefs(){
            this.$store.dispatch('userPreferences/loadUserData')
        }
    }
}
</script>