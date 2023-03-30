<template>
    <div>
      <h2>{{ fullName }}</h2>
      <h4>Preferences:</h4>
      <div>
        <li v-for="pref in preferences" :key="pref" :type="preference" :title="preference">{{ pref }}</li>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id', 'firstName', 'lastName', 'preferences'],
    computed: {
      fullName() {
        return this.firstName + ' ' + this.lastName;
      },
    },
  };
  </script>
  
  <style scoped>
  li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  h3,
  h4 {
    margin: 0.5rem 0;
  }
  
  div {
    margin: 0.5rem 0;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  </style>