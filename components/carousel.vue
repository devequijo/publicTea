
  <template>
  <v-container style="background-color:white;opacity:0.6">
  <v-carousel
 height="20%"
 style="opacity:1!important;background-color:white"
 
  tag="ca"
  
  >
    <v-carousel-item
      v-for="(item,i) in images"
      :key="i"
      
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
   
  </v-carousel>
    </v-container>
 

</template>


<script>
import axios from 'axios'
  export default {
    props:['items'],
  mounted(){
    console.log('aki')
    this.$props.items.data.item.images.forEach(element => {
      this.images.push({src:'https://magictea.shop/uploads/'+element})
    });
  
  },
    data () {
      return {
        images: [],
      }
      
    },
    
  }
</script>

<style lang="scss" scoped>

</style>>

</style>