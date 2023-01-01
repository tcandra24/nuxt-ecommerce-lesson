//actions
export const actions = {

  //store review
  storeReview({ commit }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //store to Rest API "/api/customer/reviews" with method "POST"
          this.$axios.post('/api/customer/reviews', payload)

          //success
          .then(response => {

              //resolve promise
              resolve(response.data)

          })

          //error
          .catch(error => {
              reject(error)
          })

      })
  },

}
