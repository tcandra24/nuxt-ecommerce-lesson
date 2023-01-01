<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD NEW PRODUCT</span>
              </div>
              <div class="card-body">

                <form @submit.prevent="storeProduct">

                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input type="file" @change="handleFileChange" class="form-control">
                    <div v-if="validation.image" class="mt-2">
                      <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>NAMA PRODUCT</label>
                        <input type="text" v-model="product.title" placeholder="Masukkan Nama Product"
                          class="form-control">
                        <div v-if="validation.title" class="mt-2">
                          <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>CATEGORY</label>
                        <select class="form-control" v-model="product.category_id">
                          <option value="">-- select category --</option>
                          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                        </select>
                        <div v-if="validation.category_id" class="mt-2">
                          <b-alert show variant="danger">{{ validation.category_id[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>WEIGHT (Gram)</label>
                        <input type="number" v-model="product.weight" placeholder="Masukkan Berat Product (Gram)"
                          class="form-control">
                        <div v-if="validation.weight" class="mt-2">
                          <b-alert show variant="danger">{{ validation.weight[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>STOCK</label>
                        <input type="number" v-model="product.stock" placeholder="Masukkan Stock Product"
                          class="form-control">
                        <div v-if="validation.stock" class="mt-2">
                          <b-alert show variant="danger">{{ validation.stock[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>DESCRIPTION</label>
                    <client-only placeholder="loading...">
                      <ckeditor-nuxt v-model="product.description" :config="editorConfig" />
                    </client-only>
                    <div v-if="validation.description" class="mt-2">
                      <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PRICE</label>
                        <input type="number" v-model="product.price" placeholder="Masukkan Harga Product"
                          class="form-control">
                        <div v-if="validation.price" class="mt-2">
                          <b-alert show variant="danger">{{ validation.price[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>DISCOUNT (%)</label>
                        <input type="number" v-model="product.discount" placeholder="Masukkan Discount Product (%)"
                          class="form-control">
                        <div v-if="validation.discount" class="mt-2">
                          <b-alert show variant="danger">{{ validation.discount[0] }}</b-alert>
                        </div>
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
        title: 'Add New Product - Administrator',
      }
    },

    components: {
      'ckeditor-nuxt': () => {
        if (process.client) {
          return import('@blowstack/ckeditor-nuxt')
        }
      },
    },

    data() {
      return {
        //state product
        product: {
          image: '',
          title: '',
          category_id: '',
          description: '',
          weight: '',
          price: '',
          stock: '',
          discount: ''
        },
        //state validation
        validation: [],
        //config CKEDITOR
        editorConfig: {
          removePlugins: ['Title'],
        }
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {

        //get list all categories
        await store.dispatch('admin/category/getListAllCategories')
    },

    //computed
    computed: {

        //categories
        categories() {
            return this.$store.state.admin.category.categories
        },
    },

    methods: {

      //handle file upload
      handleFileChange(e) {

        //get image
        let image = this.product.image = e.target.files[0]

        //check fileType
        if (!image.type.match('image.*')) {

          //if fileType not allowed, then clear value and set null
          e.target.value = ''

          //set state "product.image" to null
          this.product.image = null

          //show sweet alert
          this.$swal.fire({
            title: 'OOPS!',
            text: "Format File Tidak Didukung!",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }

      },

      //method "storeProduct"
      async storeProduct() {

        //define formData
        let formData = new FormData();

        formData.append('image', this.product.image)
        formData.append('title', this.product.title)
        formData.append('category_id', this.product.category_id)
        formData.append('description', this.product.description)
        formData.append('weight', this.product.weight)
        formData.append('price', this.product.price)
        formData.append('stock', this.product.stock)
        formData.append('discount', this.product.discount)

        //sending data to action "storeProduct" vuex
        await this.$store.dispatch('admin/product/storeProduct', formData)

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

            //redirect route "admin-products"
            this.$router.push({
              name: 'admin-products'
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
  .ck-editor__editable {
    min-height: 200px;
  }
</style>
