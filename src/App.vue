<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">{{ $store.state.name }}</span>
      <v-btn
        :disabled="!$store.state.isLoggedIn"
        color="success"
        class="mr-4"
        @click="logout"
      >
        Logout
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",

  data: () => ({}),

  methods: {
    async logout() {
      let response = await Vue.axios.get("/api/logout");
      // need to update states by calling who
      if (response.data.success) {
        await this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>
