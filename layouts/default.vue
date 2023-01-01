<template>
  <div>
    <!-- header -->
    <Header />
    <!-- end header -->

    <!-- content -->
    <Nuxt />
    <!-- end content -->

    <!-- footer -->
    <Footer />
    <!-- end footer -->
  </div>
</template>

<script>

import Header from '@/components/web/header.vue'
import Footer from '@/components/web/footer.vue'

export default {

  //register components
  components: {
    Header,
    Footer
  }

}
</script>

<style>

</style>
