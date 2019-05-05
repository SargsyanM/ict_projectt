<template>
  <v-layout v-if="user">
    <v-flex text-xs-center>
      <blockquote class="blockquote">
        <v-card>
          <v-card-text>
            <h1>Week's Menu</h1>
            <h3 v-if="!user.admin">{{ date }}</h3>
            <h3 v-else><input :placeholder="date"></h3>
            <table v-for="(i, i_index) in days" :key="i_index" style="width: 100%">
              <tr>
                <th>
                  {{ i }}
                </th>
              </tr>
              <table v-for="(j, j_index) in meals" :key="j_index" style="width: 80%" class="mb-2">
                <th style="text-align: left">
                  {{ j.name }}
                </th>
                <tr v-if="user.admin" style="text-align: left">
                  <ul v-for="(k, k_index) in j.value" :key="k_index">
                    <li><input :placeholder="'Meal No' + (k_index+1)" class="input"></li>
                  </ul>
                </tr>
                <tr v-else style="text-align: left">
                  <ul v-for="k in j.value" :key="k">
                    <li>Meal No{{ k }}</li>
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
        date: "06/05/19-11/05/19"
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>

<style>
  .input {
    border-color: white !important;
    border-width: 2px;
    border-style: solid
  }
</style>
