
  <template>
  <v-container
  id='form'
  
  >

     <v-alert v-if="this.$route.params.message"
      outlined
      type="warning"
      prominent
      
      border="left"
    > <h2>{{this.$route.params.message}}</h2>
    </v-alert>



<v-card

id="area"
class="mx-auto"
>

  <span class="titulo">Crear cuenta personal</span>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >


      <v-text-field
      v-model="name"
      :rules="fillRules"
      label="Nombre y apellidos"
      required
    ></v-text-field>


    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Su login o direccion email"
      required
    ></v-text-field>


    <v-text-field
      v-model="password"
      :counter="10"
      :rules="passwordRules"
      label="Contraseña"
      type="password"
      required
    ></v-text-field>



    


    <v-checkbox
      v-model="checkbox"
      label="Añadir una direccion ahora?"
      required
    ></v-checkbox>
   
    <v-container
    v-show="checkbox">

    <v-select
      v-model="selectCountry"
      :items="list"
  
      label="Pais"
      placeholder="Selecciona tu pais"
      required
      :rules="fillRules"
      prepend-icon="mdi-earth"
    ></v-select>

    

  
      <v-autocomplete
        v-model="selectCity"
        :items="cities"
        v-show="selectCountry"
        label="Ciudad"
        placeholder="Introduce o selecciona tu ciudad"
        prepend-icon="mdi-city-variant"
        return-object
      ></v-autocomplete>

            <v-text-field
      v-if="selectCountry"
      v-model="zip"   
      label="Codigo postal"
      prepend-icon="mdi-email"
      type="number"
      :rules="fillRules"
      required
    ></v-text-field>

      <v-text-field
      v-if="selectCity"
      v-model="street"   
      label="Calle, avda, urb, bloque"
      type="text"
      prepend-icon="mdi-road-variant"
      required
    ></v-text-field>




      <v-text-field
      v-if="street"
      v-model="house"   
      label="Numero y puerta"
      type="text"
      prepend-icon="mdi-home-modern"
      required
    ></v-text-field>
      <v-textarea
      v-show="street"
      v-model="observations"   
      label="Observaciones"
      type="text"
      prepend-icon="mdi-comment"
      rows="3"
    ></v-textarea>


    </v-container>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="enter"
    >
      Registrar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Borrar formulario
    </v-btn>
  
  </v-form>
  <v-alert v-if="error"></v-alert>
</v-card>




  </v-container>


 


</template>


<script>
import axios from 'axios'

  export default {
 
      
  
    async mounted(){
      
     axios.get('https://restcountries.eu/rest/v2/region/europe').then(data=>{
       this.country=data.data
       for(let i=0; i< data.data.length; i++){
         this.list.push(data.data[i].translations[this.lang.toLowerCase()])
       }
       })
      
    },
  props:['message'],
  
    data: () => ({
      error: null,
      name:null,
      observations:null,
      street:null,
      house:null,
      cities:[],
      list: [],
      lang: 'ES',
      country: '',
      valid: false,
      password: '',
    
      passwordRules: [
        v => !!v || 'Introduce una contraseña',
        v => (v && v.length >= 7) || 'Name must be less than 10 characters',
      ],
      email: '',
      fillRules: [
        v => !!v || 'Campo obligatorio',
      ],
      emailRules: [
        v => !!v || 'Introduce tu email',
        v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v) || 'Email introducido no es valido',
      ],
      selectCountry: null,
      selectCity:null,
      checkbox: false,
    }),
    computed:{
      simple(){
        if (this.email, this.password) return true
      },
      complete(){
        return (this.selectCountry && this.selectCity && this.street && this.house)? true: false
      }
    },
    methods: {
      async getCities(newValue){
        this.cities=[]
        for(let i =0; i<this.country.length; i++){
          
          if(this.country[i].translations[this.lang.toLowerCase()]==this.selectCountry){
            console.log(this.country[i].name)
            axios.post('https://countriesnow.space/api/v0.1/countries/cities', {"country":this.country[i].name.toLowerCase()})
            .then(data=>{
           
            for(let i = 0; i< data.data.data.length;i++){
              this.cities.push(data.data.data[i])
            }
            
            })
            
            
          }
        }
      },
      enter () {
        // if (!this.checkbox && this.simple)
        // axios.post('api/register',{
        //    "email":this.email,
        //    "password":this.password
        // })
      if(true){
        axios.post('api/register',{
           "nombre":this.name,
           "email":this.email,
           "password":this.password,
           "adress":{
              "country": this.selectCountry,
              "street":this.street,
              "city":this.selectCity,
              "zip":this.zip,
              "house":this.house,
              "observations":this.observations}
        }).then(async ()=>{
      try {
        await this.$auth.loginWith('local', {
          data: {
          email: this.email,
          password: this.password
          }
        }).then(data=>console.log(data))

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
        console.log(e)
      }
    })
      }
      },
      reset () {
        this.$refs.form.reset()
        console.log(this.country)
      },
    },
    watch: {
        selectCountry: {
        handler: function(val, oldVal) {
            this.getCities(val); // call it in the context of your component object
        },
        
    }
    },
  }
</script>

<style>
#form{
  justify-self: center;
  width: 90%;
  margin-top: 10%;
}

.titulo{
  font-size:xx-large;
  font-weight: bold;
}
</style>