<template>
  <div class="mt-5">
    <h1>Cases</h1>
    <template v-if="loading">
      <div>
        <h4>
          Loading...
        </h4>
      </div>
    </template>
    <template v-else-if="!loading && cases.length < 1">
      <div>
        <h4>
          No reported cases yet consider adding one and an officer will be on it
          shortly.
        </h4>
        <b-button to="/" class="btn btn-primary">
          Report a bike as Stolen.
        </b-button>
      </div>
    </template>
    <template>
      <div v-for="item in cases" :key="item._id" class="card my-3">
        <h4 v-if="item.status === 'pending'">
          Mr/Mrs {{ item.owners_name }} has reported a missing bike!
        </h4>
        <h4 v-if="item.status === 'In Progress'">
          Mr/Mrs {{ item.owners_name }} missing bike is being investigated.
        </h4>
        <h4 v-if="item.status === 'Found'">
          Mr/Mrs {{ item.owners_name }} missing bike has been foound.
        </h4>
        <p>
          {{ item.status }} <span v-if="item.status !== 'pending'">by</span>
          <span v-if="item._officerId"
            >Officer with id number: {{ item._officerId }}</span
          >
        </p>
        <p>Stolen on {{ item.theft_date }}, at the {{ item.theft_location }}</p>
        <p>Bike type: {{ item.bike_type }}</p>
        <p>Bike Description: {{ item.bike_description }}</p>
        <p>Theft Description: {{ item.theft_description }}</p>
        <b-button
          v-if="item.status === 'In Progress'"
          class="btn btn-success col-3"
          @click="resolveCase(item._id)"
        >
          Resolve
        </b-button>
      </div>
    </template>
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
