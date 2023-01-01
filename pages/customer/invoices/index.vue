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
              <h5><i class="fa fa-shopping-cart"></i> MY ORDERS</h5>
              <hr>

              <div class="form-group">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="search" @keypress.enter="searchData"
                    placeholder="cari berdasarkan no. invoice">
                  <div class="input-group-append">
                    <button @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>

              <b-table striped bordered hover :items="invoices.data" :fields="fields" show-empty>
                <template v-slot:cell(grand_total)="row">
                  Rp. {{ formatPrice(row.item.grand_total) }}
                </template>
                <template v-slot:cell(status)="row">
                  <button v-if="row.item.status == 'pending'" class="btn btn-sm btn-primary"><i
                      class="fa fa-circle-notch fa-spin"></i> {{ row.item.status }}</button>
                  <button v-if="row.item.status == 'success'" class="btn btn-sm btn-success"><i
                      class="fa fa-check-circle"></i> {{ row.item.status }}</button>
                  <button v-if="row.item.status == 'expired'" class="btn btn-sm btn-warning-2"><i
                      class="fa fa-exclamation-triangle"></i> {{ row.item.status }}</button>
                  <button v-if="row.item.status == 'failed'" class="btn btn-sm btn-danger"><i
                      class="fa fa-times-circle"></i> {{ row.item.status }}</button>
                </template>
                <template v-slot:cell(actions)="row">
                  <b-button
                    :to="{ name: 'customer-invoices-show-snap_token', params: { snap_token: row.item.snap_token } }"
                    variant="info" size="sm">
                    DETAIL
                  </b-button>
                </template>
              </b-table>

              <!-- pagination -->
              <b-pagination align="right" :value="invoices.current_page" :total-rows="invoices.total"
                :per-page="invoices.per_page" @change="changePage" aria-controls="my-table"></b-pagination>

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
      title: 'Invoices - Customer',
    }
  },

  //data function
  data() {
    return {
      //table header
      fields: [{
        label: 'No. Invoice',
        key: 'invoice'
      },
      {
        label: 'Grand Total',
        key: 'grand_total'
      },
      {
        label: 'Status Payment',
        key: 'status',
        tdClass: 'text-center'
      },
      {
        label: 'Actions',
        key: 'actions',
        tdClass: 'text-center'
      }
      ],
      //state search
      search: ''
    }
  },

  //hook "asyncData"
  async asyncData({ store }) {
    await store.dispatch('customer/invoice/getInvoicesData')
  },

  //computed
  computed: {

    //invoices
    invoices() {
      return this.$store.state.customer.invoice.invoices
    },
  },

  //method
  methods: {

    //method "searchData"
    searchData() {

      //commit to mutation "SET_PAGE"
      this.$store.commit('customer/invoice/SET_PAGE', 1)

      //dispatch on action "getInvoicesData"
      this.$store.dispatch('customer/invoice/getInvoicesData', this.search)
    },
    //method "changePage"
    changePage(page) {

      //commit to mutation "SET_PAGE"
      this.$store.commit('customer/invoice/SET_PAGE', page)

      //dispatch on action "getInvoicesData"
      this.$store.dispatch('customer/invoice/getInvoicesData', this.search)
    },
  }

}
</script>

<style>

</style>
