<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-12">
          <h3>CATEGORY : <strong>{{ category.name.toUpperCase() }}</strong></h3>
          <!-- Solid divider -->
          <hr class="solid">
        </div>
      </div>
      <div class="row">

        <div class="col-md-3 mt-1 mb-4" v-for="product in category.products" :key="product.id">
          <div class="card h-100 border-0 rounded shadow-sm">
            <div class="card-body">
              <div class="card-img-actions">
                <img :src="product.image" class="card-img img-fluid">
              </div>
            </div>
            <div class="card-body bg-light-custom text-center rounded-bottom">
              <div class="mb-2">
                <h6 class="font-weight-semibold mb-2">
                  <nuxt-link :to="{ name: 'products-slug', params: { slug: product.slug } }" class="text-default mb-2"
                    data-abc="true">{{ product.title }}</nuxt-link>
                </h6>
                <nuxt-link :to="{ name: 'categories-slug', params: { slug: product.category.slug } }" class="text-muted"
                  data-abc="true">{{ product.category.name }}</nuxt-link>
              </div>
              <h6 class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(product.price) }}</s> /
                <strong>{{ product.discount }} %</strong></h6>
              <h5 class="mb-0 font-weight-semibold mt-3 text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}
              </h5>
              <hr>
              <client-only>
                <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20"
                  :read-only="true" :show-rating="false" :inline="true"></vue-star-rating>
                (<strong>{{ product.reviews_count }}</strong> ulasan)
              </client-only>
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
      title: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`,
      meta: [{
        hid: 'og:title',
        name: 'og:title',
        content: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: `${this.category.image}`
      },
      {
        hid: 'description',
        name: 'description',
        content: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`
      },
      ]
    }
  },

  //hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('web/category/getDetailCategory', route.params.slug)
  },

  //computed
  computed: {

    //category
    category() {
      return this.$store.state.web.category.category
    },
  },

}
</script>

<style>

</style>
