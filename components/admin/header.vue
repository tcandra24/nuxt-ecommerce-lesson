<template>
  <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
    <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar"
      data-class="c-sidebar-show">
      <svg class="c-icon c-icon-lg">
        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
      </svg>
    </button>
    <button class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" data-target="#sidebar"
      data-class="c-sidebar-lg-show" responsive="true">
      <svg class="c-icon c-icon-lg">
        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
      </svg>
    </button>
    <ul class="c-header-nav ml-auto mr-4">

      <li class="c-header-nav-item dropdown"><a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button"
          aria-haspopup="true" aria-expanded="false">
          <div class="c-avatar"><img class="c-avatar-img"
              :src="`https://ui-avatars.com/api/?name=${user.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`">
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-right pt-0">
          <div class="dropdown-header bg-light py-2 rounded"><strong>QUICK MENU</strong></div><a class="dropdown-item"
            href="#">
            <svg class="c-icon mr-2">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"></use>
            </svg> Categories</a><a class="dropdown-item" href="#">
            <svg class="c-icon mr-2">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-layers"></use>
            </svg> Products</a><a class="dropdown-item" href="#">
            <svg class="c-icon mr-2">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
            </svg> Customers</a>
          <div class="dropdown-divider"></div>
          <div class="dropdown-header bg-light py-2 rounded"><strong>ORDERS</strong></div><a class="dropdown-item"
            href="#">
            <svg class="c-icon mr-2">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
            </svg> Invoices</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" role="button" @click="logout">
            <svg class="c-icon mr-2">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-account-logout"></use>
            </svg> Logout
          </a>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
export default {

  //computed
  computed: {
    user() {
      return this.$auth.user
    }
  },

  //method
  methods: {

    //method "logout"
    async logout() {

      //logout auth
      await this.$auth.logout()

      //redirect route admin login
      this.$router.push({
        name: 'admin-login'
      })

    }

  }

}
</script>

<style>

</style>
