<template>
  <v-container
  id='form'
  >

     <v-alert v-if="this.error"
      outlined
      type="error"
      prominent
      
      border="left"
    > <h2>{{this.error}}</h2>
    </v-alert>


 <v-card id="area"
 class="mx-auto">

  <span class="titulo">Acceder al area personal</span>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Tu direccion email:"
      required
    ></v-text-field>


    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Contraseña"
      type="password"
      required
    ></v-text-field>




    <v-btn
    tabindex="0"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="entrar"
      
    >
      Entrar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      
      to="/"
    >
      Volver
    </v-btn>

  </v-form>
   </v-card>
  </v-container>
  
</template>


<script>
import axios from 'axios'
  export default {
    async mounted(){
 
    },
    data: () => ({
      error:null,
      valid: false,
      name: '',
      password:'',
      passwordRules: [
        v => !!v || 'Introduce una contraseña',
        v => (v && v.length >= 7) || 'Introduce una contraseña mas larga',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Introduce tu email',
        v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v) || 'Email introducido no es valido',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
    async entrar() {
      try {
        await this.$auth.loginWith('local', {
          data: {
          email: this.email,
          password: this.password
          }
        }).then(data=>console.log('data'))

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
        console.log(e+'lol')
      }
    }
  }
}
</script>

<style>
#form{
  width: 68%;
  margin-top: 10%;
}

.titulo{
  font-size:xx-large;
  font-weight: bold;
}
</style>