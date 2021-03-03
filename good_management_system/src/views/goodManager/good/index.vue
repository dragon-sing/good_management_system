<template>
  <div>
    <category-select v-model="cat" width="70%" />
  </div>
</template>

<script>
import CategorySelect from '@/components/CategorySelect'

export default {
  name: 'Good',
  components: {
    CategorySelect
  },
  data() {
    return {
      cat: ''
    }
  },
  methods: {
    handleChange(val) {
      this.cat = val
    }
  }
}
</script>

<style>

</style>
