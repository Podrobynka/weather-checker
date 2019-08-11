<template>
  <div class="home">
    <WeatherWidget/>
  </div>
</template>

<script>
// @ is an alias to /src
import WeatherWidget from '@/components/WeatherWidget.vue'

export default {
  name: 'home',
  components: {
    WeatherWidget
  }
}
</script>
