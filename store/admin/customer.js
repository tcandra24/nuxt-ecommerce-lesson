//state
export const state = () => ({

  //customers
  customers: [],

  //page
  page: 1,

})

//mutations
export const mutations = {

  //mutation "SET_CUSTOMERS_DATA"
  SET_CUSTOMERS_DATA(state, payload) {

      //set value state "customers"
      state.customers = payload
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {

      //set value state "page"
      state.page = payload
  },

}

//actions
export const actions = {

  //get customers data
  getCustomersData({ commit, state }, payload) {

      //search
      let search = payload ? payload : ''

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/admin/customers" with method "GET"
          this.$axios.get(`/api/admin/customers?q=${search}&page=${state.page}`)

          //success
          .then((response) => {

              //commit ti mutation "SET_CUSTOMERS_DATA"
              commit('SET_CUSTOMERS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

}
