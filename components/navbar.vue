<template>
<div class="nav">
    <v-app-bar
      app
      color="black"
      dark
      
    >
      <v-app-bar-nav-icon  @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="d-none d-sm-flex" style="color:#76e32d" >Menu</v-toolbar-title>

      <v-spacer></v-spacer>
     <template v-if="!auth">
        <router-link 
        to='/login'
        ><span class="red--text"><h4>Iniciar sesion </h4></span></router-link> &nbsp;|&nbsp;
           <router-link 
        to='/register'
        ><span class="red--text"><h4>Registro</h4></span></router-link>
      </template>
      <template  v-else>
      
        Bienvenido {{login}}
        
         <v-btn icon @click="rightDrawer=!rightDrawer"><v-icon>mdi-cart</v-icon> <v-badge v-if="this.$store.state.cart.length>0" color="teal lighten-1" :content='cart.length'></v-badge> </v-btn>

         <v-icon @click="logout">mdi-door</v-icon>
      </template>


    </v-app-bar>

    <v-navigation-drawer

      v-model="drawer"
      app
      temporary
      dark
      style="opacity:0.8"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-orange--text text--accent-4"
        >
     
         <v-container id="cerrar">
              <v-icon @click="drawer = false">mdi-arrow-left-bold</v-icon>

            <v-list-item-title
            id="cerrar" @click="drawer = false" >Cerrar menu</v-list-item-title>
   
         </v-container> <br><br>

          <v-list-item  :to='inicio' link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title          
            >Inicio</v-list-item-title>
          </v-list-item>
          <v-list-item @click="lol">Update cart</v-list-item>


   


       
          <v-list-item >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
         
        </v-list-item-group>
        
       
      </v-list>
    </v-navigation-drawer>


    <v-navigation-drawer

      v-model='rightDrawer'
      right
      app
      temporary
      dark
      style="opacity:0.8"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-orange--text text--accent-4"
        >
     
         <v-container @click="rightDrawer = false"  id="cerrar">
              <v-icon>mdi-arrow-left-bold</v-icon>

            <v-list-item-title
            id="cerrar" >Cerrar menu</v-list-item-title>
   
         </v-container> <br><br>

          <v-list-item  :to="'/shoppingCart'" link>
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title          
            >En total<span style="color:red"> <br><h1>{{total}}€</h1></span></v-list-item-title>
          </v-list-item>

          <v-list-item v-for="item in this.$store.getters['cart']" :key="item.id"  :to="`/view/${item.id}`"  link>
            <v-list-item-icon @click="removeItem(item)">
              <v-icon color="red">mdi-basket-remove</v-icon>
            </v-list-item-icon>
            <v-list-item-title         
            >
            {{item.quantity}} gramos<br>
            {{item.name}}
            </v-list-item-title>
            <v-img style="width:20%" transition="scale-transition" :src="`https://magictea.shop/uploads/`+item.image"></v-img>
            <div>
              <v-input :value="item.quantity"></v-input>
            </div>
          </v-list-item>



   



          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ir a Mi cuenta</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
       
      </v-list>
    </v-navigation-drawer>

</div>
</template>

<script>
import axios from 'axios'
  export default {
    methods : {
      itemz(ind){
        return this.all.find(v=> v._id==ind)
      },
      removeItem(i){
        axios.post('http://localhost:3000/removeItem', {
          itemId : i.id,
          userId : this.$auth.user._id
        })
        window.location.reload(true)
      },
      async lol(){
        this.$auth.setUser(this.$auth.user)
        console.log('lol')
        await this.$auth.fetchUser()
        
        this.$auth.refreshTokens()
      },
      async logout(){
        await this.$auth.logout();
        
        console.log(this.$auth)
        
      }
    },
   
    computed : {
      all(){
        return this.$store.state.items
      },
      total (){
        if(this.$store.state.cart) {
        let x =0;
        this.$store.state.cart.forEach(i => {
          x+= i.quantity*i.price/50
        })
        return x.toFixed(2)}
      },
      cart(){
        return this.$store.state.cart
      },
      login(){
        return this.$auth.user.email.split('@')[0]
      },
      auth (){
        return this.$store.state.auth.loggedIn
      }
    },


    data: () => ({
    
      inicio : '/',
      drawer: false,
      rightDrawer:false,
      group: null,
    }),
  }
</script>

<style scoped>

a{
  color:rgb(255, 0, 0);
  text-decoration: none;
}
#cerrar{
  cursor: pointer;
  display: inline;
  margin-bottom: 10px;
}
</style>