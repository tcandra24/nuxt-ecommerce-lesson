<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">

          <div class="col-6 col-lg-3">
            <div class="card border-0 rounded shadow-sm overflow-hidden">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-primary py-4 px-5 mfe-3">
                  <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-primary">{{ statistic.pending }}</div>
                  <div class="text-muted text-uppercase font-weight-bold small">PENDING</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-lg-3">
            <div class="card border-0 rounded shadow-sm overflow-hidden">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-success py-4 px-5 mfe-3">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-success">{{ statistic.success }}</div>
                  <div class="text-muted text-uppercase font-weight-bold small">SUCCESS</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-lg-3">
            <div class="card border-0 rounded shadow-sm overflow-hidden">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-warning py-4 px-5 mfe-3">
                  <i class="fas fa-exclamation-triangle fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-warning">{{ statistic.expired }}</div>
                  <div class="text-muted text-uppercase font-weight-bold small">EXPIRED</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-lg-3">
            <div class="card border-0 rounded shadow-sm overflow-hidden">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-danger py-4 px-5 mfe-3">
                  <i class="fas fa-times-circle fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-danger">{{ statistic.failed }}</div>
                  <div class="text-muted text-uppercase font-weight-bold small">FAILED</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-chart-bar"></i> GRAFIK PENDAPATAN {{ new
                    Date().getFullYear()
                }}</span>
              </div>
              <div class="card-body">
                <client-only>
                  <line-chart :data="chart.chartData"></line-chart>
                </client-only>
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
      title: 'Dashboard - Administrator',
    }
  },

  async asyncData({ $axios }) {

    //fetching dashboard
    const dashboard = await $axios.$get('/api/admin/dashboard')

    //statistic
    const statistic = {
      'pending': dashboard.data.count.pending,
      'success': dashboard.data.count.success,
      'expired': dashboard.data.count.expired,
      'failed': dashboard.data.count.failed,
    }

    //cart
    const chart = {
      chartData: {
        labels: dashboard.data.chart.month_name,
        datasets: [
          {
            label: `STATISTIK PENDAPATAN : ${new Date().getFullYear()}`,
            backgroundColor: '#bccad8',
            data: dashboard.data.chart.grand_total
          },
        ]
      }
    }

    return {
      statistic,
      chart
    }
  },

}
</script>

<style>

</style>
