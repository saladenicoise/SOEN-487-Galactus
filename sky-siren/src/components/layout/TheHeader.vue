<template>
    <header>
        <nav>
            <h1>
              <router-link to="/">Home</router-link>
              <router-link to="/preferences">Preferences</router-link>
              <router-link to="/auth">Authenticate</router-link>
            </h1>
        </nav>
    </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 4.5rem;
  background-color: #105e78;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #296a4e;
  display: inline-block;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #296a4e;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>