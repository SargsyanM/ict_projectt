<template>
  <v-layout>
    <v-flex text-xs-center>
      <blockquote class="blockquote">
        <v-card>
          <v-card-text>
            <h1>Week's Menu</h1>
            <h3>06/05/19-11/05/19</h3>
            <table v-for="i in days" :key="i" style="width: 100%">
              <tr>
                <th>
                  {{ i }}
                </th>
              </tr>
              <table v-for="j in meals" :key="j" style="width: 80%" class="mb-2">
                <th style="text-align: left">
                  {{ j.name }}
                </th>
                <tr v-for="k in j.value" style="text-align: left">
                  <ul>
                    <li >Meal No{{ k }}</li>
                  </ul>
                </tr>
              </table>
            </table>
          </v-card-text>
        </v-card>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        meals: [
          {name: 'Breakfast', value: 2},
          {name: 'Lunch', value: 4},
          {name: 'Ետճաշիկ', value: 2}
        ],
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>
