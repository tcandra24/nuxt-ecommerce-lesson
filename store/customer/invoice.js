//state
export const state = () => ({

  //invoices
  invoices: [],

  //page
  page: 1,

  //invoice
  invoice: {}

})

//mutations
export const mutations = {

  //mutation "SET_INVOICES_DATA"
  SET_INVOICES_DATA(state, payload) {

      //set value state "invoices"
      state.invoices = payload
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {

      //set value state "page"
      state.page = payload
  },

  //mutation "SET_INVOICE_DATA"
  SET_INVOICE_DATA(state, payload) {

    //set value state "invoice"
    state.invoice = payload
  },

}

//actions
export const actions = {

  //get invoices data
  getInvoicesData({ commit, state }, payload) {

      //search
      let search = payload ? payload : ''

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/customer/invoices" with method "GET"
          this.$axios.get(`/api/customer/invoices?q=${search}&page=${state.page}`)

          //success
          .then((response) => {

              //commit ti mutation "SET_INVOICES_DATA"
              commit('SET_INVOICES_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },


  //get detail invoice
  getDetailInvoice({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //get to Rest API "/api/customer/invoices/:snap_token" with method "GET"
        this.$axios.get(`/api/customer/invoices/${payload}`)

        //success
        .then(response => {

            //commit to mutation "SET_INVOICE_DATA"
            commit('SET_INVOICE_DATA', response.data.data)

            //resolve promise
            resolve()

        })

    })

  },

}
