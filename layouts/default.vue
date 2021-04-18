<template>
  <v-app>
  <v-main>
    
      <navbar  />
        
        <nuxt />
  </v-main>
    </v-app>
</template>

<script>
import Carousel from '../components/carousel.vue'

import Navbar from '../components/navbar.vue'
export default {

  components:{
    Navbar,
    Carousel
   
}}
</script>
