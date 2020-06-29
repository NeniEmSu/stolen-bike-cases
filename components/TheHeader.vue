<template>
  <b-navbar toggleable="md" variant="light">
    <b-container>
      <b-navbar-toggle target="nav_collapse" />
      <b-navbar-brand to="/">
        Stolen Bike Cases
      </b-navbar-brand>

      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact>
            Home
          </b-nav-item>
          <b-nav-item to="/cases">
            Cases
          </b-nav-item>
          <b-nav-item to="/officers">
            Officers
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
