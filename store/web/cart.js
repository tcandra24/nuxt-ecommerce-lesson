//state
export const state = () => ({

  //carts
  carts: [],

  //cartPrice
  cartPrice: 0,

  //cartWeight
  cartWeight: 0

})

//mutations
export const mutations = {

  //mutation "SET_CARTS_DATA"
  SET_CARTS_DATA(state, payload) {

      //set value state "carts"
      state.carts = payload
  },

  //mutation "SET_CART_PRICE"
  SET_CART_PRICE(state, payload) {

      //set value state "cartPrice"
      state.cartPrice = payload
  },

  //mutation "SET_CART_WEIGHT"
  SET_CART_WEIGHT(state, payload) {

      //set value state "cartWeight"
      state.cartWeight = payload
  },

}

//actions
export const actions = {

  //get carts data
  getCartsData({ dispatch, commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/carts" with method "GET"
          this.$axios.get('/api/web/carts')

          //success
          .then((response) => {

              //commit ti mutation "SET_CARTS_DATA"
              commit('SET_CARTS_DATA', response.data.data)

              //dispatch "getCartPrice"
              dispatch('getCartPrice')

              //dispatch "getCartWeight"
              dispatch('getCartWeight')

              //resolve promise
              resolve()
          })

      })

  },

  //get cart price
  getCartPrice({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/carts/total_price" with method "GET"
          this.$axios.get('/api/web/carts/total_price')

          //success
          .then((response) => {

              //commit ti mutation "SET_CART_PRICE"
              commit('SET_CART_PRICE', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //get cart weight
  getCartWeight({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/carts/total_weight" with method "GET"
          this.$axios.get('/api/web/carts/total_weight')

          //success
          .then((response) => {

              //commit ti mutation "SET_CART_WEIGHT"
              commit('SET_CART_WEIGHT', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //store cart
  storeCart({ dispatch }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //store to Rest API "/api/web/carts" with method "POST"
          this.$axios.post('/api/web/carts', payload)

          //success
          .then(() => {

              //dispatch action "getCartsData"
              dispatch('getCartsData')

              //resolve promise
              resolve()

          })

          //error
          .catch(error => {
              reject(error)
          })

      })
  },

  //remove cart
  removeCart({ dispatch }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/carts/remove" with method "GET"
          this.$axios.post('/api/web/carts/remove', payload)

          //success
          .then(() => {

              //dispatch "getCartsData"
              dispatch('getCartsData')

              //resolve promise
              resolve()
          })

      })

  },

}
