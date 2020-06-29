<template>
  <div>
    <h1>Officers</h1>
    <div v-for="officer in officers" :key="officer._id">
      <p>{{ officer.name }}</p>
      <p>{{ officer._caseId }}</p>
    </div>

    <form class="row" @submit.prevent="addOfficer">
      <b-form-group label="Officers Name:" label-for="name" class="col-12">
        <b-form-input
          id="name"
          v-model="officerDetails.name"
          required
          type="text"
          placeholder="Enter officers name"
        ></b-form-input>
      </b-form-group>
      <b-form-group class="col-sm-6">
        <span
          v-if="addLoading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <button v-else class="btn btn-primary">
          Submit
        </button>
      </b-form-group>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addLoading: false,
      officerDetails: {
        name: null,
      },
      loading: false,
      officers: [],
    }
  },
  created() {
    this.getOfficers()
  },
  methods: {
    async addOfficer() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post('/api/officers', this.officerDetails, config)
          .then((response) => {
            this.$swal('Success', `${response.message}`, 'success')
            this.getOfficers()
            this.officerDetails.name = null
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, ${error.message}`, 'error')
      }
      this.addLoading = false
    },
    async getOfficers() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      this.loading = true
      try {
        const data = await this.$axios.$get('/api/officers', config)
        const response = await data.officers
        this.officers = response
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$swal('Error', error.message, 'error')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
