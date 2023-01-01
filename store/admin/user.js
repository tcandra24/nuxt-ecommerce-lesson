//state
export const state = () => ({

  //users
  users: [],

  //page
  page: 1,

  //user
  user: {}

})

//mutations
export const mutations = {

  //mutation "SET_USERS_DATA"
  SET_USERS_DATA(state, payload) {

    //set value state "users"
    state.users = payload
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {

    //set value state "page"
    state.page = payload
  },

  //mutation "SET_USER_DATA"
  SET_USER_DATA(state, payload) {

    //set value state "user"
    state.user = payload
  },

}

//actions
export const actions = {

  //get users data
  getUsersData({ commit, state }, payload) {

      //search
      let search = payload ? payload : ''

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/admin/users" with method "GET"
          this.$axios.get(`/api/admin/users?q=${search}&page=${state.page}`)

          //success
          .then((response) => {

              //commit ti mutation "SET_USERS_DATA"
              commit('SET_USERS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //store user
  storeUser({ dispatch, commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //store to Rest API "/api/admin/users" with method "POST"
        this.$axios.post('/api/admin/users', payload)

        //success
        .then(() => {

            //dispatch action "getUsersData"
            dispatch('getUsersData')

            //resolve promise
            resolve()

        })

        //error
        .catch(error => {
            reject(error)
        })

    })
  },

  //get detail user
  getDetailUser({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //get to Rest API "/api/admin/users/:id" with method "GET"
        this.$axios.get(`/api/admin/users/${payload}`)

        //success
        .then(response => {

            //commit to mutation "SET_USER_DATA"
            commit('SET_USER_DATA', response.data.data)

            //resolve promise
            resolve()

        })

    })

  },

  //update user
  updateUser({ dispatch, commit }, { userId, payload }) {

    //set promise
    return new Promise((resolve, reject) => {

        //store to Rest API "/api/admin/users/:id" with method "POST"
        this.$axios.post(`/api/admin/users/${userId}`, payload)

        //success
        .then(() => {

            //dispatch action "getUsersData"
            dispatch('getUsersData')

            //resolve promise
            resolve()

        })

        //error
        .catch(error => {
            reject(error)
        })

    })
  },


  //destroy user
  destroyUser({ dispatch, commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //delete to Rest API "/api/admin/users/:id" with method "DELETE"
        this.$axios.delete(`/api/admin/users/${payload}`)

        //success
        .then(() => {

            //dispatch action "getUsersData"
            dispatch('getUsersData')

            //resolve promise
            resolve()

        })

    })

  }

}
