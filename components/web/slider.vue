<template>
  <div class="container-fluid mt-custom">
    <div id="mycarousel" class="carousel slide" data-ride="carousel" data-interval="4000">

      <div class="carousel-inner">

        <div class="carousel-item" v-for="(slider, id) in sliders" :class="{ active: id == 0 }" :key='slider.id'>
          <a :href="slider.link" target="_blank">
            <img :src="slider.image" class="d-block w-100 rounded">
          </a>
        </div>

      </div>

      <a class="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
        <div class="banner-icons"> <span class="fa fa-angle-left"></span> </div> <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
        <div class="banner-icons"> <span class="fa fa-angle-right"></span> </div> <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {

  //hook "fetch"
  async fetch() {

    //fething sliders on Rest API
    await this.$store.dispatch('web/slider/getSlidersData')

  },

  //computed
  computed: {

    //sliders
    sliders() {
      return this.$store.state.web.slider.sliders
    }
  }

}
</script>

<style>

</style>
