<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-users"></i> ADD NEW USER</span>
              </div>
              <div class="card-body">

                <form @submit.prevent="storeUser">

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>FULL NAME</label>
                        <input type="text" v-model="user.name" placeholder="Masukkan Nama User" class="form-control">
                        <div v-if="validation.name" class="mt-2">
                          <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>EMAIL ADDRESS</label>
                        <input type="email" v-model="user.email" placeholder="Masukkan Email Address"
                          class="form-control">
                        <div v-if="validation.email" class="mt-2">
                          <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PASSWORD</label>
                        <input type="password" v-model="user.password" placeholder="Masukkan Password"
                          class="form-control">
                        <div v-if="validation.password" class="mt-2">
                          <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PASSWORD CONFIRMATION</label>
                        <input type="password" v-model="user.password_confirmation"
                          placeholder="Masukkan Konfirmasi Password" class="form-control">
                      </div>
                    </div>
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                    SAVE</button>
                  <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
                    RESET</button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {

  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Add New User - Administrator',
    }
  },

  data() {
    return {
      //state user
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      //state validation
      validation: []
    }
  },

  methods: {

    //method "storeUser"
    async storeUser() {

      //define formData
      let formData = new FormData();

      formData.append('name', this.user.name)
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      formData.append('password_confirmation', this.user.password_confirmation)

      //sending data to action "storeUser" vuex
      await this.$store.dispatch('admin/user/storeUser', formData)

        //success
        .then(() => {

          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: "Data Berhasil Disimpan!",
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          //redirect route "admin-users"
          this.$router.push({
            name: 'admin-users'
          })

        })

        //error
        .catch(error => {

          //assign error to state "validation"
          this.validation = error.response.data
        })
    }
  }

}
</script>

<style>

</style>
