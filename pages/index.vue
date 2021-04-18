<template>
<v-container class="mx-auto ma-0 pa-0">
  <v-img class="mx-auto" max-width="600" src="/logo.png"></v-img>
 <!-- <carousel/>  -->
 <!-- <v-container style="background: black;color:white; opacity:0.7" class="items">
   Filter
   <v-icon color="white">mdi-filter</v-icon>
 </v-container> -->

<div style="border-radius:4px!important">
    <v-expansion-panels >
      <v-expansion-panel
      style="background-color:black;color:white;border-radius:3px!important;"
      dark
      active-class="activeFilter"
      >
        <v-expansion-panel-header><span>Filtros<v-icon color="white">mdi-filter</v-icon></span></v-expansion-panel-header>
        <v-expansion-panel-content>
          
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</div>


<template>
  <v-layout  style="width:100%!important" class="mx-auto ma-0" id="area2" row wrap >





  <v-flex class="mx-auto"  xs12 sm5 md3 lg5 xl2 v-for="i in all" :key="i.name">
        <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, article, actions"
        >
  

  <div style="display:inline; z-index:1;position: absolute; height: 1px; top:1px; bottom: 0px; right: 0;  left: 0; ">
    <price-stripe :text="i.price"></price-stripe>
  </div>



  <v-card max-height="800" height="700" hover class="mx-auto items pa-0 ma-0 " style="margin:15px!important;border: solid 30px white; cursor:default">
   <v-img @click.prevent="toView(i.id)" transition="scale-transition" style="cursor:pointer" :src="`https://magictea.shop/uploads/`+i.images[0]"></v-img>
   <v-card-title @click.prevent="toView(i.id)" style="cursor:pointer">{{i.name}}</v-card-title>
 

 
 
  <div style="position: absolute; height: 10px;  bottom: 75px; right: 0;  left: 0; ">
    
   <v-btn color="green darken-2" class="" @click.prevent='addToCart(i)'>Comprar 50gr <span style="color:white">{{i.price}}€ </span> </v-btn>
    <v-spacer></v-spacer><br>
   <v-dialog
        transition="dialog-bottom-transition"
        max-width="1200"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="verDetalles(i)"
            color="teal darken-3"
            v-bind="attrs"
            v-on="on"
          >Ver detalles</v-btn>
        </template>
        <template v-slot:default="dialog">
         
          <v-card>
            <v-toolbar
              dark
              color="grey darken-4"
            >{{currentItem.name}}<v-spacer></v-spacer>
                     <v-btn
                text
                @click="dialog.value = false"
              >Cerrar</v-btn>
            </v-toolbar>
            <v-card-text>
              <br>

              
               <v-row>
                 <v-col>
  <v-card
    elevation="24"
    max-width="400"
    class="mx-auto"
  >

  <v-carousel>
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


              <div class="text-h5 pa-12">{{currentItem.description}}</div>
</v-col></v-row><br>
<v-row><v-col>
                       <div class="text-h5 pa-0 ma-0">
                Precio por 50 gramos: {{currentItem.price}} €
              </div>
                  <div class="text-h5 pa-0 ma-0">
                    Precio por gramo: {{(currentItem.price/50).toFixed(2)}} €
                
              </div>
                                <div class="text-h5 pa-0 ma-0">
                    El kilo vale: {{((currentItem.price)*20).toFixed(2)}} €
                
              </div><br><br></v-col><v-col>
              <v-subheader  class="text-h3 bg-primary">Comprar ahora</v-subheader><br>
              <a-granel :currentItem="currentItem" v-if="!currentItem.pieceOnly" />
              
                </v-col></v-row>







           
            </v-card-text>
            
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Volver al catalogo</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      </div>
  </v-card>  
    </v-skeleton-loader>
  </v-flex>
 

  
</v-layout>
</template>

</v-container>

</template>


<script>

import axios from 'axios'
import Popup from '../components/popup.vue'
import mapActions from 'vuex'
import AddToCart from '../components/aGranel.vue'
import PriceStripe from '../components/priceStripe.vue'

export default {



    methods:{

        toView(i){
          this.$router.push('/view/'+i)
        },

        verDetalles(i){
          this.currentItem = i
          
        },
        details(i){
          this.item = i
 
          console.log(i,'akgi')
        },
        addToCart(i){
         
            if(this.$auth.loggedIn){
              
            axios.post('http://localhost:3000/addToCart', {
              id: this.$auth.user._id,
              item: i.id, quantity:50,
              image: i.images[0],
              name: i.name,
              price: i.price
              })
            
            console.log(this.$store.state.cart + '1')
            this.$store.dispatch("getCart")
            console.log(this.$store.state.cart + '2')
            window.location.reload(true)
         
            } else{
              this.$router.push({ name: 'register', params: {message: 'Para poder comprar este producto necesita crear una cuenta personal. Si ya tiene una, Por favor inicie la sesion' }})
            }
        }
    },

  computed: {
   
    all() {
    return this.$store.getters['items']
    },
    cart(){
      return this.$store.getters['cart']
    },
    images() {
      return this.currentItem.images
    }
  },

  data:() => ({
items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
        currentItem:{},
        item:null,
        attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
     alignments: [
        'start',
        'center',
        'end',
      ],
  
  }),
  components: {
    Popup,
    AddToCart,
    PriceStripe

  },
  // async beforeMount(){
  //   axios.get('http://localhost:3000/all', {
  //     mode:'cors'
  //   }).then(data=>this.all = data.data.items)
  // },

  mounted() {
    this.$store.dispatch("getItems");
    this.$store.dispatch('getCart')
   
  }

}
</script>

<style scoped>

.activeFilter{
  opacity: 1!important;
  margin-bottom: 10px;
}
  #area2{
    background-color: rgba(255, 255, 255, 0.178);
    padding: 20px;
  }
  body{
    opacity: 0.1;
  }
</style>
