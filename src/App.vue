<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="slot">通过slot操控联动</router-link>
      </li>
      <li>
        <router-link to="component">通过自定义component操控联动</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello, 😋'
    }
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
