<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-3">
          <!-- sidebar -->
          <Sidebar />
          <!-- end sidebar -->
        </div>
        <div class="col-md-9">
          <div class="card border-0 rounded shadow-sm border-top-orange">
            <div class="card-body">
              <h5><i class="fa fa-shopping-cart"></i> DETAIL ORDER</h5>
              <hr>
              <table class="table table-bordered">
                <client-only>
                  <tr>
                    <td style="width: 25%">
                      NO. INVOICE
                    </td>
                    <td style="width: 1%">:</td>
                    <td>
                      {{ invoice.invoice }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      FULL NAME
                    </td>
                    <td>:</td>
                    <td>
                      {{ invoice.name }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      PHONE
                    </td>
                    <td>:</td>
                    <td>
                      {{ invoice.phone }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      COURIER / SERVICE / COST
                    </td>
                    <td>:</td>
                    <td>
                      {{ invoice.courier }} / {{ invoice.courier_service }} / Rp.
                      {{ formatPrice(invoice.courier_cost) }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CITY
                    </td>
                    <td>:</td>
                    <td>
                      {{ invoice.city.name }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      PROVINCE
                    </td>
                    <td>:</td>
                    <td>
                      {{ invoice.province.name }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ADDRESS
                    </td>
                    <td>:</td>
                    <td>
                      {{ invoice.address }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      GRAND TOTAL
                    </td>
                    <td>:</td>
                    <td>
                      Rp. {{ formatPrice(invoice.grand_total) }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STATUS
                    </td>
                    <td>:</td>
                    <td>
                      <button @click="payment(invoice.snap_token)" v-if="invoice.status == 'pending'"
                        class="btn btn-info">BAYAR SEKARANG</button>
                      <button v-else-if="invoice.status == 'success'" class="btn btn-success"><i
                          class="fa fa-check-circle"></i> {{ invoice.status }}</button>
                      <button v-else-if="invoice.status == 'expired'" class="btn btn-warning-2"><i
                          class="fa fa-exclamation-triangle"></i> {{ invoice.status }}</button>
                      <button v-else-if="invoice.status == 'failed'" class="btn btn-danger"><i
                          class="fa fa-times-circle"></i> {{ invoice.status }}</button>
                    </td>
                  </tr>
                </client-only>
              </table>

            </div>
          </div>

          <div class="card border-0 rounded shadow-sm border-top-orange mt-4">
            <div class="card-header">
              <span class="font-weight-bold"><i class="fa fa-shopping-cart"></i> DETAIL ITEMS</span>
            </div>
            <div class="card-body">
              <table class="table" style="border-style: solid !important;border-color: rgb(198, 206, 214) !important;">
                <tbody>
                  <client-only>
                    <tr v-for="order in invoice.orders" :key="order.id" style="background: #edf2f7;">
                      <td class="b-none" width="25%">
                        <div class="wrapper-image-cart">
                          <img :src="order.product.image" style="width: 100%;border-radius: .5rem">
                        </div>
                      </td>
                      <td class="b-none" width="50%">
                        <h5><b>{{ order.product.title }}</b></h5>
                        <table class="table-borderless" style="font-size: 14px">
                          <tr>
                            <td style="padding: .20rem">QTY</td>
                            <td style="padding: .20rem">:</td>
                            <td style="padding: .20rem"><b>{{ order.qty }}</b></td>
                          </tr>
                        </table>
                        <!-- modal button -->
                        <button v-if="invoice.status == 'success'" type="button" class="btn btn-warning-2 mt-4"
                          data-toggle="modal" :data-target="'#modal-' + order.id">
                          BERIKAN ULASAN
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" ref="modal" :id="'modal-' + order.id" tabindex="-1" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">ULASAN PRODUK</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <div class="row justify-content-center">
                                  <div class="col-md-7">
                                    <vue-star-rating v-model="rating.star" :show-rating="false">
                                    </vue-star-rating>
                                  </div>
                                </div>
                                <div class="row mt-4">
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label class="font-weight-bold">ULASAN</label>
                                      <textarea class="form-control" id="alamat" rows="3"
                                        placeholder="Masukkan Ulasan Produk" v-model="rating.review"></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">TUTUP</button>
                                <button v-if="rating.star && rating.review"
                                  @click.prevent="storeReview(order.id, order.product.id)" type="button"
                                  class="btn btn-warning" data-dismiss="modal">KIRIM</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="b-none text-right">
                        <p class="m-0 font-weight-bold">Rp. {{ formatPrice(order.price) }}</p>
                      </td>
                    </tr>
                  </client-only>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import sidebar
import Sidebar from '@/components/web/sidebar.vue'

export default {

  //middleware
  middleware: 'isCustomer',

  //layout
  layout: 'default',

  //register components
  components: {
    Sidebar
  },

  //meta
  head() {
    return {
      title: 'Detail Order - Customer',
    }
  },

  //hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('customer/invoice/getDetailInvoice', route.params.snap_token)
  },

  //computed
  computed: {
    invoice() {
      return this.$store.state.customer.invoice.invoice
    }
  },

  //data function
  data() {
    return {
      //state rating
      rating: {
        star: 0,
        review: ''
      },
    }
  },

  //method
  methods: {

    //method "payment"
    payment(snap_token) {
      window.snap.pay(snap_token, {

        onSuccess: function () {
          router.push({
            name: 'invoices-show-snap_token',
            params: {
              snap_token: snap_token
            }
          })
        },
        onPending: function () {
          router.push({
            name: 'invoices-show-snap_token',
            params: {
              snap_token: snap_token
            }
          })
        },
        onError: function () {
          router.push({
            name: 'invoices-show-snap_token',
            params: {
              snap_token: snap_token
            }
          })
        }
      })
    },

    //method "storeReview"
    async storeReview(orderId, productId) {

      //define formData
      let formData = new FormData();

      formData.append('rating', this.rating.star)
      formData.append('review', this.rating.review)
      formData.append('order_id', orderId)
      formData.append('product_id', productId)

      //sending data to action "storeReview" vuex
      await this.$store.dispatch('customer/review/storeReview', formData)

        //success
        .then(() => {

          //feresh data
          this.$nuxt.refresh()

          //clear state
          this.rating.star = 0
          this.rating.review = ''

          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: "Ulasan Berhasil Disimpan!",
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          })

          //redirect route same page
          this.$router.push({ path: this.$route.path });

        })

        .catch(() => {

          //sweet alert
          this.$swal.fire({
            title: 'GAGAL!',
            text: "Anda sudah membuat ulasan untuk produk ini!",
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          })

        })

    }
  }

}
</script>

<style>

</style>
