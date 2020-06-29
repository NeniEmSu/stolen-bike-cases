<template>
  <div>
    <h1>Cases</h1>
    <div v-for="item in cases" :key="item._id">
      <h6>{{ item.owners_name }}</h6>
      <p>{{ item.status }}</p>
      {{ item._id }}
      {{ item._officerId }}
      <b-button
        v-if="item.status === 'In Progress'"
        class="btn btn-primary"
        @click="resolveCase(item._id)"
        >Resolve</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      cases: [],
    }
  },
  created() {
    this.getCases()
  },
  methods: {
    async getCases() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      this.loading = true
      try {
        const data = await this.$axios.$get('/api/cases', config)
        const response = await data.cases
        this.cases = response
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$swal('Error', error.response.data.error, 'error')
      }
    },
    async resolveCase(id) {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      try {
        this.addLoading = true
        await this.$axios.$put(`/api/cases/${id}`, config).then((response) => {
          this.$swal(
            'Success',
            `Case set to resolved, the officer will be assigned another case shortly.`,
            'success'
          )
          this.getCases()
        })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, ${error}`, 'error')
      }
      this.addLoading = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
