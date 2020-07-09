<template>
  <div class="mt-5">
    <h1>Officers</h1>
    <template v-if="loading">
      <div>
        <h4>
          Loading...
        </h4>
      </div>
    </template>
    <template v-else-if="!loading && officers.length < 1">
      <div>
        <h4>No officers yet consider adding one.</h4>
      </div>
    </template>
    <template v-else>
      <div v-for="officer in officers" :key="officer._id">
        <div class="row">
          <h5 class="col-sm-11">{{ officer.name }}</h5>
          <div class="col-sm-1 ml-auto">
            <b-button
              class="mx-auto"
              variant="light"
              @click="deleteOfficer(officer._id)"
            >
              <b-icon
                icon="trash-fill"
                color="danger"
                variant="danger"
                font-scale="1.5"
              ></b-icon>
            </b-button>
          </div>
        </div>

        <p v-if="officer._caseId">
          Is on the Case with the Id: {{ officer._caseId }}
        </p>
        <p v-else>Officer is available</p>
      </div>
    </template>

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
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      addLoading: false,
      officerDetails: {
        name: null,
      },
    }
  },
  computed: {
    ...mapState('officers', ['officers', 'loading', 'errors']),
  },
  created() {
    this.getAllOfficers()
  },
  methods: {
    ...mapActions('officers', ['getAllOfficers']),
    async addOfficer() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(
            `${process.env.BASE_URL}/api/officers`,
            this.officerDetails,
            config
          )
          .then((response) => {
            this.$swal('Success', `${response.message}`, 'success')
            this.getAllOfficers()
            this.officerDetails.name = null
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, ${error.message}`, 'error')
      }
      this.addLoading = false
    },
    deleteOfficer(id) {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      this.deleteLoading = true
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$axios
            .$delete(`${process.env.BASE_URL}/api/officers/${id}`, config)
            .then((response) => {
              this.getAllOfficers()
              this.$swal({
                text: "Poof! You've sucessfully deleted that officer!",
                icon: 'success',
              })
            })
            .catch((error) => {
              this.deleteLoading = false
              this.$swal(
                'Error',
                `Somethimg went wrong, Error: ${error}`,
                'error'
              )
            })
        } else {
          this.deleteLoading = false
          this.$swal('The Officers detail is safe!')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
