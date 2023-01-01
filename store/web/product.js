//state
export const state = () => ({

  //products
  products: [],

  //page
  page: 1,

  //product
  product: {}

})

//mutations
export const mutations = {

  //mutation "SET_PRODUCTS_DATA"
  SET_PRODUCTS_DATA(state, payload) {

      //set value state "products"
      state.products = payload
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {

      //set value state "page"
      state.page = payload
  },

  //mutation "SET_PRODUCT_DATA"
  SET_PRODUCT_DATA(state, payload) {

    //set value state "product"
    state.product = payload
  },

}

//actions
export const actions = {

  //get products data
  getProductsData({ commit, state }, payload) {

      //search
      let search = payload ? payload : ''

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/products" with method "GET"
          this.$axios.get(`/api/web/products?q=${search}&page=${state.page}`)

          //success
          .then((response) => {

              //commit ti mutation "SET_PRODUCTS_DATA"
              commit('SET_PRODUCTS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //get detail product
  getDetailProduct({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //get to Rest API "/api/web/products/:slug" with method "GET"
        this.$axios.get(`/api/web/products/${payload}`)

        //success
        .then(response => {

            //commit to mutation "SET_PRODUCT_DATA"
            commit('SET_PRODUCT_DATA', response.data.data)

            //resolve promise
            resolve()

        })

    })

  },

}
