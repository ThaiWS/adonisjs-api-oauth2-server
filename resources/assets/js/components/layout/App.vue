<template>
<b-container fluid>
    <notifications group="app" position="top center" />
    <router-view></router-view>  
</b-container>
</template>

<script>
export default {
  name: 'App'
}
</script>