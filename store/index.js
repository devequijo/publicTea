import axios from 'axios'
export const state = () => {
    return {
        items : [],
        item: {},
        cart :[],
        outCart: []
    }
}

export const mutations = {
    SET_ITEMS (state, items)  {
        state.items = items
    },
    SET_CART (state, cartItems)  {
        state.cart = cartItems
    }
}

export const getters = {
    // ...
    items: state=>{
        return state.items
    },
    cart: state=>{
        return state.cart
    }
  }
  



export const actions = {
    getItems({ commit }) {
        axios.get('http://localhost:3000/all')
        .then(response => {
            commit('SET_ITEMS', response.data.items)
            
            })
        },
    getCart({commit}){
         console.log('getcart')
        if( this.$auth.loggedIn ){
            axios.post('http://localhost:3000/getCart', {
                id : this.$auth.user._id,
               
            })
            .then(response =>{
                commit('SET_CART', response.data)

            })
        }
        else{
            commit('SET_CART', null)
            console.log('algo')
        }
        

    }

    }