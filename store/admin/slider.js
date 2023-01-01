//state
export const state = () => ({

  //sliders
  sliders: [],

  //page
  page: 1,

})

//mutations
export const mutations = {

  //mutation "SET_SLIDERS_DATA"
  SET_SLIDERS_DATA(state, payload) {

      //set value state "sliders"
      state.sliders = payload
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {

      //set value state "page"
      state.page = payload
  },

}

//actions
export const actions = {

  //get sliders data
  getSlidersData({ commit, state }, payload) {

      //search
      let search = payload ? payload : ''

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/admin/sliders" with method "GET"
          this.$axios.get(`/api/admin/sliders?q=${search}&page=${state.page}`)

          //success
          .then((response) => {

              //commit ti mutation "SET_SLIDERS_DATA"
              commit('SET_SLIDERS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //store slider
  storeSlider({ dispatch, commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //store to Rest API "/api/admin/sliders" with method "POST"
        this.$axios.post('/api/admin/sliders', payload)

        //success
        .then(() => {

            //dispatch action "getSlidersData"
            dispatch('getSlidersData')

            //resolve promise
            resolve()

        })

        //error
        .catch(error => {
            reject(error)
        })

    })
  },

  //destroy slider
  destroySlider({ dispatch, commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //delete to Rest API "/api/admin/sliders/:id" with method "DELETE"
        this.$axios.delete(`/api/admin/sliders/${payload}`)

        //success
        .then(() => {

            //dispatch action "getSlidersData"
            dispatch('getSlidersData')

            //resolve promise
            resolve()

        })

    })

  }

}
