<template>
    <div>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model.trim="email"/>
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password"/>
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password (must be at least 8 characters long).</p>
        <button>{{ submitButtonCaption }}</button>
        <button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</button>
   
    </form>
</div>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
        };
    },
    computed: {
        submitButtonCaption(){
            if (this.mode === 'login'){
                return 'login';
            }
            else {
                return 'signup';
            }
        },
        switchModeButtonCaption(){
            if (this.mode === 'login'){
                return 'signup instead';
            }
            else {
                return 'login instead';
            }
        }

    },
    methods: {
       async submitForm(){
            this.formIsValid = true;
            if (this.email === '' ||
             !this.email.includes('@') ||
              this.password.length <8)
            {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;
        try{
            if (this.mode === 'login' ) {
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                })
                {const redirectUrl = '/';
            this.$router.replace(redirectUrl);}
            }
            else {
               await this.$store.dispatch('signup', {
                email: this.email,
                password: this.password, 
                });
                {const redirectUrl = '/register';
            this.$router.replace(redirectUrl);}
            }

        }catch(err){
            this.error = err.message || 'Authentication failed, try again later.';
        }
            this.isLoading = false;
        },
        switchAuthMode(){
            if (this.mode === 'login'){
                this.mode = 'signup';
            }
            else {
                this.mode = 'login';
            }
        },
        handleError(){
            this.error = null;
        }
    }
}

</script>
