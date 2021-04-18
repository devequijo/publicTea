<template>


<v-container @click.self='toIndex' >

<v-container style="background-color:rgba(255,255,255,0.8); display:inline-block; border-radius: 11px;margin-top:50px!important;margin-bottom:30px!important" v-if="item" class="mx-auto ma-0 pa-0">
  <v-img class="mx-auto" max-width="600" src="/logo.png"></v-img>


              <v-row>
                 <v-col>
  <v-card
    elevation="24"
    max-width="400"
    class="mx-auto"
  >

  <v-carousel style="border-radius:4px;z-index:0!important;opacity:1!important">
    <v-carousel-item
      
      v-for="(item,i) in images"
      :key="i"
      :src="`https://magictea.shop/uploads/`+item"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

  </v-card>
                 </v-col>
                <v-col>

<v-btn style="position:relative;display:flex;float:right; margin-right:22px;" color="success" to="../">Al catalogo</v-btn>
              <div class="text-h5 pa-12">{{item.description}}</div>


   <v-subheader  class="text-h3 bg-primary">Comprar ahora</v-subheader><br>
               <a-granel :currentItem="item" v-if="!item.pieceOnly" /> 

</v-col></v-row><br>
<v-row><v-col>
                       <div class="text-h5 pa-0 ma-0">
                Precio por 50 gramos: {{item.price}} €
              </div>
                  <div class="text-h5 pa-0 ma-0">
                    Precio por gramo: {{(item.price/50).toFixed(2)}} €
                
              </div>
                                <div class="text-h5 pa-0 ma-0">
                    El kilo vale: {{((item.price)*20).toFixed(2)}} €
                
              </div><br><br></v-col><v-col>
              
                </v-col></v-row>


</v-container>
</v-container>

</template>

<script>
import axios from 'axios'

export default {
 
  
  async beforeMount(){
    
    await axios.get('http://localhost:3000/api/items/'+this.$route.params.view).then(data => this.item = data.data)},

    
  
    data: () => ({
        item:null
        
}),
    methods:{
      toIndex(){
        this.$router.push('/')
      }
    },
    computed:{

      images(){
        return this.item.images
      }
    }
    

    

}
</script>

<style>


</style>