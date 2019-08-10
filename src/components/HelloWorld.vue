<template>
  <div class="hello">
    <input type="text" v-model="city">
    <button v-on:click="getWeather">Send</button>

    <pre id="json">
      {{ response }}
    </pre>
  </div>
</template>

<script>
import { sendGet } from '../lib/api_client.js'

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      city: '',
      key: '2db83dc637564b02923a46061ed77d26',
      response: null
    }
  },
  methods: {
    async getWeather() {
      const { city, key } = this

      try {
        const response = await sendGet(`https://api.weatherbit.io/v2.0/current?key=${key}&city=${city}`)
        const body = await response.json()
        this.response = body
      } catch (error) {
        console.log(error)
      }
    },
    async getCoords() {
      const coords = await this.$getLocation({})
      console.log(coords)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
