<template>
  <div class="mb-4">
    <b-button class="btn btn-secondary" @click="initForm"
      >Make a Report</b-button
    >
    <div class="row">
      <div class="col-md-12">
        <div v-if="showForm" class="card">
          <div class="card-body">
            <div class="card-title mb-4 d-flex">
              <h3>Repoert a Bike as Stolen</h3>
              <!-- <h3 v-else>Update Bike data</h3> -->
            </div>
            <form class="row" @submit.prevent="addCase">
              <b-form-group
                label="Owners Name:"
                label-for="owner"
                class="col-md-6"
              >
                <b-form-input
                  id="owner"
                  v-model="caseDetails.owners_name"
                  required
                  type="text"
                  placeholder="Enter owners_name"
                ></b-form-input>
                <!-- :class="[
                    !$v.caseDetails.owners_name.$error &&
                    $v.caseDetails.owners_name.$model &&
                    $v.caseDetails.owners_name.minLength
                      ? 'is-valid'
                      : '',
                    $v.caseDetails.owners_name.$error &&
                    !$v.caseDetails.owners_name.minLength
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="
                    $v.caseDetails.owners_name.$dirty
                      ? !$v.caseDetails.owners_name.$error
                      : null
                  "
                <small
                  v-if="
                    !$v.caseDetails.owners_name.required &&
                    $v.caseDetails.owners_name.$dirty
                  "
                  class="text-danger"
                  >Title is required.</small
                >
                <small
                  v-if="!$v.caseDetails.owners_name.minLength"
                  class="text-danger"
                  >Title must have at least
                  {{ $v.caseDetails.owners_name.$params.minLength.min }}
                  letters.</small
                > -->
              </b-form-group>

              <b-form-group
                label="Theft date:"
                label-for="theft_date"
                class="col-md-6"
              >
                <b-form-datepicker
                  id="theft_date"
                  v-model="caseDetails.theft_date"
                  class="mb-2"
                ></b-form-datepicker>
              </b-form-group>

              <b-form-group
                label="bike_description:"
                label-for="bike_description"
                class="col-12"
              >
                <b-form-textarea
                  id="body"
                  v-model="caseDetails.bike_description"
                  placeholder="Depscroibe your bike here."
                  rows="8"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group
                label="Bike type:"
                label-for="type"
                class="col-md-6"
              >
                <b-form-input
                  id="bike_description"
                  v-model="caseDetails.type"
                  required
                  type="text"
                  placeholder="What type of bike is it?"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Bike theft location:"
                label-for="theft_location"
                class="col-md-6"
              >
                <b-form-input
                  id="theft_location"
                  v-model="caseDetails.theft_location"
                  required
                  type="text"
                  placeholder="Last place you saw the bike."
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Theft description:"
                label-for="theft_description"
                class="col-12"
              >
                <b-form-textarea
                  id="theft_description"
                  v-model="caseDetails.theft_description"
                  placeholder="Any description of the theft."
                  rows="8"
                ></b-form-textarea>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      showForm: false,
      caseDetails: {
        owners_name: 'felix',
        bike_description: 'red bmx bike for a teen',
        type: 'sports BMX',
        theft_date: null,
        theft_location: 'bazar',
        theft_description:
          'i chained the bike to the pole but it was cut and the bike taken',
      },
      addLoading: false,
    }
  },
  validations: {
    caseDetails: {
      owners_name: {
        required,
        minLength: minLength(4),
      },
    },
  },
  methods: {
    initForm() {
      this.showForm = !this.showForm
    },
    async addCase() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post('/api/cases', this.caseDetails, config)
          .then((response) => {
            this.$swal(
              'Success',
              `Your report was mad successfully it has either been asigned to and available officer or will be once an officeer is available.`,
              'success'
            )
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, ${error}`, 'error')
      }
      this.addLoading = false
    },
    async addTodo() {
      if (!this.title)
        return this.$swal(
          'Be advised!',
          'Todo text is required to add a todo!',
          'warning'
        )
      await this.$store.dispatch('todos/addTodo', this.title)
      this.title = null
      this.$v.$reset()
    },
  },
}
</script>

<style lang="scss" scoped></style>
