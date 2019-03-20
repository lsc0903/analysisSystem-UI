<template>
  <div id="app">
    <div id="nav">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  }
};
</script>

<style>
#app,#nav{
  height: 100%;
};
</style>
