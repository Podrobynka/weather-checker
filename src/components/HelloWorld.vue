<template>
  <div class="hello">
    <input type="text" v-model="city">
    <button v-on:click="getWeather()">Send</button>

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
      response: null,
      coords: null
    }
  },
  async mounted() {
    let coords = await this.getCoords()
    let smth = await this.getWeather(coords)
    this.city = this.response.data[0].city_name
    this.coords = null
  },
  methods: {
    async getWeather(smthing_else = null) {
      const { city, key } = this

      let params = `city=${city}`

      if (smthing_else != null) {
        params = `lat=${smthing_else.lat}&lon=${smthing_else.lng}`
      }

      try {
        const response = await sendGet(`https://api.weatherbit.io/v2.0/current?key=${key}&${params}`)
        const body = await response.json()
        this.response = body
      } catch (error) {
        console.log(error)
      }
    },
    async getCoords() {
      const coords = await this.$getLocation({})
      return coords
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
