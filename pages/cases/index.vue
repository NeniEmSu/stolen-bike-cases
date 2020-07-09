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
      </div>
    </template>
    <template v-else>
      <b-table
        striped
        hover
        responsive
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sticky-header="600px"
        :items="items"
      >
        <template v-slot:thead-top="">
          <b-tr>
            <b-th colspan="1" variant="primary">Index</b-th>
            <b-th colspan="4" variant="secondary">
              Case Data
            </b-th>
            <b-th colspan="3" variant="success">
              Action
            </b-th>
          </b-tr>
        </template>
        <template v-slot:cell(owners_name)="data">
          <nuxt-link
            :to="{
              name: 'cases-id',
              params: { id: data.item.id },
            }"
            >{{ data.item.owners_name }}</nuxt-link
          >
        </template>
        <template v-slot:cell(_officerId)="data">
          <p v-if="data.item._officerId">Assigned</p>
          <p v-else>Unassigned</p>
        </template>
        <template v-slot:cell(view)="data">
          <b-button
            class="ml-auto"
            variant="light"
            :to="{
              name: 'cases-id',
              params: { id: data.item.id },
            }"
          >
            <b-icon
              icon="box-arrow-in-up-right"
              color="primary"
              variant="primary"
              font-scale="1.5"
            ></b-icon>
          </b-button>
        </template>
        <template v-slot:cell(resolve)="data">
          <b-button
            :disabled="data.item.status !== 'In Progress'"
            class="ml-auto"
            variant="light"
            @click="resolveCase(data.item.id)"
          >
            <b-icon
              v-if="data.item.status === 'Found'"
              icon="check2-square"
              color="success"
              variant="success"
              font-scale="1.5"
            ></b-icon>
            <b-icon
              v-else
              icon="square"
              :color="
                data.item.status === 'In Progress' ? 'success' : 'secondary'
              "
              :variant="
                data.item.status === 'In Progress' ? 'success' : 'secondary'
              "
              font-scale="1.5"
            ></b-icon>
          </b-button>
        </template>
        <template v-slot:cell(delete)="data">
          <span
            v-if="deleteLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <b-button
            v-else
            class="ml-auto"
            variant="light"
            :disabled="deleteLoading"
            @click="deleteCase(data.item.id)"
          >
            <b-icon
              icon="trash-fill"
              color="danger"
              variant="danger"
              font-scale="1.5"
            ></b-icon>
          </b-button>
        </template>
      </b-table>
    </template>
    <AddCase />
  </div>
</template>

<script>
import AddCase from '@/components/AddCase'
export default {
  name: 'Cases',
  components: {
    AddCase,
  },
  data() {
    return {
      loading: false,
      deleteLoading: false,
      cases: [],
      sortBy: 'Total',
      sortDesc: true,
      fields: [
        { key: 'No', stickyColumn: true, isRowHeader: true, sortable: true },
        {
          key: 'owners_name',
          label: 'Reported by',
          stickyColumn: true,
          sortable: false,
        },
        {
          key: '_officerId',
          label: 'Officer Status',
          sortable: false,
        },
        {
          key: 'theft_date',
          sortable: false,
          formatter: (value) => {
            return this.$moment(value).format('LL HH:mm')
          },
        },

        {
          key: 'status',
          sortable: false,
        },
        {
          key: 'view',
          sortable: false,
        },
        {
          key: 'resolve',
          sortable: false,
        },
        {
          key: 'delete',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    items() {
      return this.cases.map((item, index) => {
        return {
          No: index + 1,
          id: item._id,
          owners_name: item.owners_name,
          _officerId: item._officerId,
          theft_date: item.theft_date,
          status: item.status,
          view: '',
          resolve: '',
          delete: '',
        }
      })
    },
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
        const data = await this.$axios.$get(
          `${process.env.BASE_URL}/api/cases`,
          config
        )
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
        await this.$axios
          .$put(`${process.env.BASE_URL}/api/cases/${id}`, config)
          .then((response) => {
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
    deleteCase(id) {
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
            .$delete(`${process.env.BASE_URL}/api/cases/${id}`, config)
            .then((response) => {
              this.deleteLoading = false
              this.getCases()
              this.$swal({
                text: "Poof! You've sucessfully deleted that case!",
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
          this.$swal('The Case detail is safe!')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
