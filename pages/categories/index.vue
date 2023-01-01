<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row justify-content-center">
        <div class="col-md-3 mb-3" v-for="category in categories" :key="category.id">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body text-center">
              <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }">
                <img :src="category.image" width="100">
                <hr>
                {{ category.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  //meta
  head() {
    return {
      title: 'Semua Kategori - MI STORE - Distributor Xiaomi Indonesia Resmi',
      meta: [{
        hid: 'og:title',
        name: 'og:title',
        content: 'Semua Kategori - MI STORE - Distributor Xiaomi Indonesia Resmi'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Semua Kategori - MI STORE - Distributor Xiaomi Indonesia Resmi'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/images/logo.png'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Semua Kategori dari Produk Xiaomi'
      },
      ]
    }
  },

  //hook "asyncData"
  async asyncData({ store }) {
    await store.dispatch('web/category/getCategoriesData')
  },

  //computed
  computed: {

    //categories
    categories() {
      return this.$store.state.web.category.categories
    },
  },

}
</script>

<style>

</style>
