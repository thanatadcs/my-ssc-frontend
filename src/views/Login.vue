<template>
  <v-container>
    <template>
      <v-alert v-if="createSuccess" dense text type="success">
        User created successfully. Now you can login.
      </v-alert>
      <v-alert v-if="createError" dense outlined type="error">
        Error: username already taken.
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
          Login
        </v-btn>

        <v-btn color="primary" class="mr-4" @click="create"> Create </v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    valid: true,
    username: "",
    password: "",
    usernameRules: [(v) => !!v || "Username is required"],
    passwordRules: [(v) => !!v || "Password is required"],
    createSuccess: false,
    createError: false,
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // submit to backend to authenticate
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);

        let response = await Vue.axios.post("/api/login", formData);
        // need to update states by calling who
        if (response.data.success) {
          await this.$router.push({ path: "/" });
        }
      }
    },
    async create() {
      if (this.$refs.form.validate()) {
        // submit to backend to authenticate
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);

        let response = await Vue.axios.post("/api/create", formData);
        if (response.data.success) {
          this.createSuccess = true;
          this.createError = false;
        } else {
          this.createSuccess = false;
          this.createError = true;
        }
      }
    },
  },
};
</script>
