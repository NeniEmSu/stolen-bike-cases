<template>
  <div>
    <div v-if="caseLoading">
      <h4>Loading...</h4>
    </div>
    <div v-if="!caseLoading" class="my-5">
      <h1 v-if="singleCase.status === 'pending'">
        Mr/Mrs {{ singleCase.owners_name }} has reported a missing bike!
      </h1>
      <h1 v-if="singleCase.status === 'In Progress'">
        Mr/Mrs {{ singleCase.owners_name }} missing bike is being investigated.
      </h1>
      <h1 v-if="singleCase.status === 'Found'">
        Mr/Mrs {{ singleCase.owners_name }} missing bike has been found.
      </h1>
      <p>
        {{ singleCase.status }}
        <span v-if="singleCase.status !== 'pending'">by</span>
        <span v-if="singleCase._officerId"
          >Officer: {{ officerDetails.name }}</span
        >
      </p>
      <p>
        Stolen on {{ singleCase.theft_date }}, at the
        {{ singleCase.theft_location }}
      </p>
      <p>Bike type: {{ singleCase.type }}</p>
      <p>Bike Description: {{ singleCase.bike_description }}</p>
      <p>Theft Description: {{ singleCase.theft_description }}</p>
      <b-button
        v-if="singleCase.status === 'In Progress'"
        class="btn btn-success col-3"
        @click="resolveCase(singleCase._id)"
      >
        Resolve
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleCase',
  data() {
    return {
      officerDetails: {},
      singleCase: {},
      caseDetails: {},
      caseLoading: false,
    }
  },
  created() {
    this.getCase()
  },
  methods: {
    async getCase() {
      this.caseLoading = true
      try {
        const data = await this.$axios.$get(
          `${process.env.BASE_URL}/api/cases/${this.$route.params.id}`
        )
        const response = data.singleCase
        this.singleCase = response
        this.caseDetails = response
        await this.getOfficer()
      } catch (error) {
        this.$swal(
          'Error',
          'Something went wrong while fetching case.',
          'error'
        )
        this.error = error
      }
      this.caseLoading = false
    },
    async getOfficer() {
      try {
        const data = await this.$axios.$get(
          `${process.env.BASE_URL}/api/officers/${this.singleCase._officerId}`
        )
        const response = data.officer
        this.officerDetails = response
      } catch (error) {
        this.$swal(
          'Error',
          'Something went wrong while fetching officer details.',
          'error'
        )
        this.error = error
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
