<template>

   <div>
    <form @submit.prevent="searchWeather">
      <div class="searchbar">

      <input   type="city" id="city" v-model="city" placeholder="City">
        <button style="width: auto;" type="submit"> Search</button>
</div>
      </form>
   </div>

</template>

<script>
export default {
name: "SearchBar"
}
</script>

<style scoped>


.searchbar {
    position: absolute;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    box-sizing:content-box;
    Background: linear-gradient(360deg, rgba(23, 31, 43, 1) 20%, rgba(32, 46, 60, 1) 50%, rgba(39, 57, 72, 1) 60%, rgba(37, 56, 68, 1) 70%, rgba(36, 59, 85, 1) 80%, rgba(23, 31, 43, 1) 95%);
    border: 1px groove var(--dark);
    border-width: 10px;
    border-radius: 25px;
    font-family: verdana;
    font-size: 16px;
    z-index: 1;
  top:10vh;
  left: 50vw;
    transform: translate(-50%, -50%);
    background-clip: padding-box;
  }

  .searchbar input {
  display: block;
  width: 350px;
  margin: 10px 10px;
  padding: 10px 10px;
  background: white url("assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
  .searchbar button {
    position: relative;
    display: inline-block;
    padding: 10px 10px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    letter-spacing: 4px
      }
    .searchbar button.hover{
       background: #03e9f4;
      color: #000;
       border-radius: 5px;
       box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
               0 0 50px #03e9f4,
               0 0 100px #03e9f4;
      animation: animate 1s linear infinite;

    cursor:pointer ;
    }
</style>