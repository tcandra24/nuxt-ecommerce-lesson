import Vue from 'vue'
import {
  Line
} from 'vue-chartjs'

Vue.component('line-chart', {
  extends: Line,

  //props
  props: ['data'],

  //method
  methods: {
	//format price
	formatPrice(value) {
		let val = (value/1).toFixed(0).replace('.', ',')
		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
	},
  },

  //computed
  computed: {
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return `Rp. ${this.formatPrice(value)}`;
              },
            },
          }],
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: ((tooltipItems, data) => {
              console.log(this)
              return `Rp. ${this.formatPrice(tooltipItems.yLabel)}`
            })
          }
        },
        beginZero: true
      }
    },
  },

  //mounted
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
