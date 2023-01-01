import Vue from 'vue'

const mixin = {

    methods: {

        //format price
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        },

    },

}

Vue.mixin(mixin)
