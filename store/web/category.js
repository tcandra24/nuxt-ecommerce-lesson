//state
export const state = () => ({

  //categories
  categories: [],

  //category
  category: {},

})

//mutations
export const mutations = {

  //mutation "SET_CATEGORIES_DATA"
  SET_CATEGORIES_DATA(state, payload) {

      //set value state "categories"
      state.categories = payload
  },

  //mutation "SET_CATEGORY_DATA"
  SET_CATEGORY_DATA(state, payload) {

    //set value state "category"
    state.category = payload
  },

}

//actions
export const actions = {

  //get categories data
  getCategoriesData({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/categories" with method "GET"
          this.$axios.get('/api/web/categories')

          //success
          .then((response) => {

              //commit ti mutation "SET_CATEGORIES_DATA"
              commit('SET_CATEGORIES_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //get detail category
  getDetailCategory({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //get to Rest API "/api/web/categories/:slug" with method "GET"
        this.$axios.get(`/api/web/categories/${payload}`)

        //success
        .then(response => {

            //commit to mutation "SET_CATEGORY_DATA"
            commit('SET_CATEGORY_DATA', response.data.data)

            //resolve promise
            resolve()

        })

    })

  },

}
