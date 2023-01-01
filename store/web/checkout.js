//actions
export const actions = {

  //store checkout
  storeCheckout({ dispatch, commit }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //store to Rest API "/api/web/checkout" with method "POST"
          this.$axios.post('/api/web/checkout', payload)

          //success
          .then(response => {

              //resolve promise
              resolve(response.data.data)

              //dispatch cart
              dispatch('web/cart/getCartsData', null, { root: true })

          })

          //error
          .catch(error => {
              reject(error)
          })

      })
  },

}
