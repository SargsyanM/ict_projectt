<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in drawerList"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon style="color: white">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" style="color: white"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-if="user" @click="logout">Log out</v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ayb Cafeteria'
    }
  },
  watch: {
    '$route': function () {
      this.getUser()
    },
  },
  beforeMount: function () {
    this.getUser()
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    drawerList () {
      if (!this.user) {
        return [
          {icon: 'apps', title: 'Home', to: '/'},
          {icon: 'person', title: 'Sign in', to: '/signin'},
        ]
      } else {
        return [
          {icon: 'apps', title: 'Home', to: '/'},
          {icon: 'bubble_chart', title: 'About', to: '/inspire'},
          {icon: 'menu', title: 'Menu', to: '/menu'},
        ]
      }
    }
  },
  methods: {
    getUser () {
      this.$store.dispatch('getUser')
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
