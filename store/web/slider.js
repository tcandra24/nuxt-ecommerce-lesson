//state
export const state = () => ({

  //sliders
  sliders: []

})

//mutations
export const mutations = {

  //mutation "SET_SLIDERS_DATA"
  SET_SLIDERS_DATA(state, payload) {

      //set value state "sliders"
      state.sliders = payload
  }

}

//actions
export const actions = {

  //get sliders data
  getSlidersData({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/sliders" with method "GET"
          this.$axios.get('/api/web/sliders')

          //success
          .then((response) => {

              //commit ti mutation "SET_SLIDERS_DATA"
              commit('SET_SLIDERS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

}
