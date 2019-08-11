<template>
  <div>
    <div class="choose-city">
      <input type="text" v-model="city">
      <button v-on:click="getWeather()" :disabled="buttonDisabled()">Check weather</button>
    </div>
    <div v-if="response != null">
      <div class="weather-block">
        <div class="weather">
          <img id="weather" alt="" :src="`https://www.weatherbit.io/static/img/icons/${response.data[0].weather.icon}.png`">
          <h4>{{ response.data[0].weather.description}}</h4>
        </div>
        <div class="temperature">
          <h4 id="temperature">{{ response.data[0].temp}}°C</h4>
          <h4 id="feels-like">Feels Like: {{ response.data[0].app_temp}}°C</h4>
        </div>
      </div>
      <h4>Pressure: {{ response.data[0].pres}} mb</h4>
      <h4>Humidity: {{ response.data[0].rh}} %</h4>
      <h4>Wind direction: {{ response.data[0].wind_cdir_full}}</h4>
      <h4>Wind speed: {{ response.data[0].wind_spd}} mps</h4>
    </div>
  </div>
</template>

<script>
import { sendGet } from '../lib/api_client.js'

export default {
  name: 'WeatherWidget',
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
    await this.getWeather(coords)
    this.city = this.response.data[0].city_name
    this.coords = null
  },
  methods: {
    buttonDisabled() {
      return (this.response != null) && (this.city === this.response.data[0].city_name)
    },
    async getWeather(coords = null) {
      const { city, key } = this

      let params = `city=${city}`

      if (coords != null) {
        params = `lat=${coords.lat}&lon=${coords.lng}`
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
input, button {
  border-radius: 15px;
  padding: 7px;
  border-style: solid;
  border-color: #2c3e50;
}
input {
  width: 11rem;
}
input:focus {
  outline: none;
  border-color: #42b983;
}
button:focus {
  outline: none;
}
button {
  margin-left: -100px;
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
}
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
.choose-city {
  margin-top: 5rem;
}
.weather-block {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}
#temperature {
  font-size: 5rem;
  text-align: center;
  line-height: 8rem;
}
#weather, #temperature {
  margin: 0 1rem;
}
#feels-like {
  text-align: end;
  margin-right: 1rem;
}
</style>
