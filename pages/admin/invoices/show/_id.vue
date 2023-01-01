<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-shopping-cart"></i> DETAIL INVOICE</span>
              </div>
              <div class="card-body">

                <table class="table table-bordered">
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
                      <button v-if="invoice.status == 'pending'" class="btn btn-primary"><i
                          class="fa fa-circle-notch fa-spin"></i> {{ invoice.status }}</button>
                      <button v-else-if="invoice.status == 'success'" class="btn btn-success"><i
                          class="fa fa-check-circle"></i> {{ invoice.status }}</button>
                      <button v-else-if="invoice.status == 'expired'" class="btn btn-warning-2"><i
                          class="fa fa-exclamation-triangle"></i> {{ invoice.status }}</button>
                      <button v-else-if="invoice.status == 'failed'" class="btn btn-danger"><i
                          class="fa fa-times-circle"></i> {{ invoice.status }}</button>
                    </td>
                  </tr>
                </table>

              </div>
            </div>

            <div class="card border-0 rounded shadow-sm border-top-orange mt-4">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-shopping-cart"></i> DETAIL ITEMS</span>
              </div>
              <div class="card-body">
                <table class="table"
                  style="border-style: solid !important;border-color: rgb(198, 206, 214) !important;">
                  <tbody>

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
                      </td>
                      <td class="b-none text-right">
                        <p class="m-0 font-weight-bold">Rp. {{ formatPrice(order.price) }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
      title: 'Detail Invoices - Administrator',
    }
  },

  //hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('admin/invoice/getDetailInvoice', route.params.id)
  },

  //computed
  computed: {
    invoice() {
      return this.$store.state.admin.invoice.invoice
    }
  },

}
</script>

<style>

</style>
