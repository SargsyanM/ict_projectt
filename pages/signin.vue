<template>
  <v-container fluid grid-list-lg mt-0 pt-3 pb-0 px-1>
    <v-layout row class="text-xs-center justify-center">
      <v-flex xs12 md5>
        <v-card class="mb-3 pt-1" style="box-shadow: none;">
          <v-card-title class="pa-0">
            <v-container>
              <form @submit.prevent="onSignIn">
                <v-layout justify-center>
                  <v-flex xs6>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="text-xs-center justify-center">
                  <v-flex md8 xs12 py-4>
                    <router-link to="/signup" tag="span" style="cursor: pointer">
                      <span class="S500--text" style="font-weight: bold">Sign up</span>
                    </router-link>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex py-4 xs12 md8 offset-md2 text-xs-left>
                    <input
                      class="signin"
                      placeholder="Email"
                      id="email"
                      v-model="email"
                      solo
                      header="Email address"
                      style="height: 48px; width: 270px"
                      flat
                      required
                      type="email"
                      name="email"
                    />
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex py-4 xs12 md8 offset-md2 text-xs-left>
                    <input
                      class="signin"
                      id="password"
                      v-model="password"
                      placeholder="Password"
                      solo
                      header="Password"
                      style="height: 48px; width: 270px"
                      name="password"
                      required
                      type="password"
                      flat
                    />
                  </v-flex>
                </v-layout>
                <v-layout row class="justify-center mt-2 mb-3">
                  <v-flex py-4 xs12 md8 text-xs-center>
                    <v-btn
                      class="view_button ma-0 white--text"
                      depressed
                      color="S500"
                      type="submit">
                      <span style="font-weight: bold">Sign in</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

  export default {
    data () {
      return {
        email: '',
        password: '',
        snackbarText: '',
        emailError: false,
        snackbar: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
    },
    watch: {
    },
    beforeMount: function () {
    },
    methods: {
      onSignIn () {
        this.$store.dispatch('onSignIn', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>

<style>
  .signin {
    border-color: white !important;
    border-width: 2px;
    border-style: solid
  }
</style>
