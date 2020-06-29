<template>
  <div class="container">
    <div>
      <h1>
        Stolen Bike Cases
      </h1>
      <p>
        Stolen bikes are a typical problem in a lot of major cities. The Police
        want to be more efficient in resolving stolen bike cases. They decided
        to build a software that can automate their processes — the software
        that you're going to develop.
      </p>

      <AddCase />
    </div>
  </div>
</template>

<script>
import AddCase from '@/components/AddCase'
export default {
  components: {
    AddCase,
  },
}
</script>

<style scoped></style>
