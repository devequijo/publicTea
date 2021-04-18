<template>

<v-container>
<v-container style="background-color:rgba(255,255,255,0.8); border-radius: 11px;margin-top:50px!important;margin-bottom:10px!important"  class="mx-auto ma-1 pa-1">
  <v-img class="mx-auto" max-width="600" src="/logo.png"></v-img>
</v-container>

<v-container style="background-color:rgba(255,255,255,0.8); border-radius: 11px;margin-top:2px!important;margin-bottom:30px!important"  class="mx-auto ma-1 pa-1">








 <v-container  style="background-color:rgba(255,255,255,0.3)" class="">
    <v-row v-for="item in cart" :key="item.id"  no-gutters>
      <v-col
      cols="12"
      sm="9"
      >
      
    <div style="display:inline-block;">
   <v-img style="display:inline-block;float:left;vertical-align:middle; width:100px;" :src="`https://magictea.shop/uploads/`+item.image"> </v-img>
  <span style="display:inline-block;float:right;vertical-align:middle">{{item.name}}</span>
      </div> 
      </v-col>
      <v-col
        class="sm-3"
      >
      <div class="ma-2">
        <div>
          Gramos en total:
  <v-text-field  :value="item.quantity"></v-text-field>
        </div>
    
  <v-btn class="ma-1 mx-auto!important" width="90%" color="success">Ver ficha del articulo</v-btn>
   <v-btn class="ma-1 mx-auto!important" width="90%" color="error">Eliminar</v-btn>
      </div>
      </v-col>

    </v-row>
  </v-container>













 
 
      
   
   

</v-container>
</v-container>
</template>

<script>
import login from './login.vue'
export default {
  components: { login },
  mounted(){
    this.$store.dispatch("getCart")
  },
    computed:{
      cart(){
      return this.$store.getters['cart']
    },
    },
    name: 'shoppingCart',
    data: ()=>({
        
    })
}
</script>

<style>

</style>