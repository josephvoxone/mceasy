<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="rounded-lg pa-5">
        <v-card-title class="d-flex align-center justify-center py-7">
          <v-img
            :src="require('@/assets/mceasy.png')"
            max-height="150px"
            max-width="150px"
            alt="logo"
            contain
            class="me-3"
          ></v-img>
        </v-card-title>
        <v-card-text>
          <p class="text-center title font-weight-bold text--primary mb-2">
            Welcome to McEasy!
          </p>
          <p class="text-center mb-2">
            Please sign-in to your account, fill the fields with your email and
            your password.
          </p>
        </v-card-text>

        <v-card-text>
          <v-form>
            <v-text-field
              outlined
              v-model="email"
              label="Email"
              placeholder="admin@mceasy.co.id"
              hide-details
              :rules="[(v) => !!v || 'Email is required']"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="
                isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              hide-details
              :rules="[(v) => !!v || 'Password is required']"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                color="red"
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <!-- <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a> -->
            </div>

            <v-btn
              depressed
              :disabled="email == '' || password == ''"
              block
              class="btn-primer mt-6"
              @click="login"
            >
              Login
            </v-btn>

            <p class="text-center pt-5">
              You can use email <b>"nabila@mceasy.co.id"</b> and password
              <b>"mceasy".</b>
            </p>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>


<script>
// import CustomerAPI from "../services/Customer";

export default {
  name: "login",
  data() {
    return {
      isPasswordVisible: false,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
      if (this.email == "nabila@mceasy.co.id" && this.password == "mceasy") {
        localStorage.setItem("isLogin", true);
        location.reload()
        // this.$router.push("customers");
      }
    },
  },
};
</script>

<style scoped>
.auth-wrapper {
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1.5rem;
  display: flex;
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  flex-basis: 100%;
  align-items: center;
  background: linear-gradient(45deg, #272264, #f44336);
}
.auth-wrapper.auth-v1 .auth-inner {
  width: 28rem;
  z-index: 1;
}
</style>