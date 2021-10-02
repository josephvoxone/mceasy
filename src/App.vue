<template>
  <v-app>
    <div v-if="!isLogin">
      <Login></Login>
    </div>
    <div v-else>
      <v-card class="nav-drawer" height="400" width="256">
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content style="padding: 30px 0; padding-left: 20px">
              <a href="/">
                <v-img
                  :src="require('@/assets/mceasy.png')"
                  max-height="60%"
                  max-width="60%"
                  alt="logo"
                  contain
                  eager
                  class="pa-20"
                ></v-img>
              </a>
              <!-- <v-list-item-title class="text-h6"> Application </v-list-item-title>
            <v-list-item-subtitle> subtext </v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>

          <v-list dense nav class="pa-0">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>

      <v-app-bar class="nav-header justify-end" app>
        <div style="width: 100%" class="d-flex justify-end">
          <v-btn icon color="white">
            <v-badge bordered dot right color="red"></v-badge>
            <v-icon> mdi-bell-outline </v-icon>
          </v-btn>
          <v-avatar class="mr-3">
            <img
              src="https://s3.envato.com/files/263313078/_8502884.jpg"
              style="object-fit: cover"
            />
          </v-avatar>
          <div
            class="d-inline-flex flex-column justify-center mx-3"
            style="vertical-align: middle"
          >
            <span class="font-weight-bold mb-n1 white--text"> Nabila </span>
            <small class="text-capitalize grey--text">Administator</small>
          </div>
          <v-btn icon color="white" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
        <!-- <div class="d-flex align-center mr-2">bezKoder</div>
      <v-btn to="/tutorials" text> Tutorials </v-btn>
      <v-btn to="/add" text> Add </v-btn> -->
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    Login,
  },
  data() {
    return {
      isLogin: false,
      items: [
        { title: "Dashboard", icon: "mdi-home-variant-outline" },
        { title: "Analytic", icon: "mdi-chart-line" },
        { title: "Customer", to: "/", icon: "mdi-account-multiple" },
        { title: "Product", icon: "mdi-label-multiple" },
        { title: "Orders", icon: "mdi-cart-outline" },
        { title: "Reports", icon: "mdi-google-analytics" },
        { title: "Settings", icon: "mdi-content-save-settings" },
        { title: "Support", icon: "mdi-headphones" },
      ],
      right: null,
    };
  },
  methods: {
    checkLogin() {
      console.log("Check Login");
      const dataLoc = localStorage?.getItem("isLogin");
      if (dataLoc) {
        this.isLogin = true;
        console.log(dataLoc);
      }
    },
    logout() {
      localStorage.removeItem("isLogin");
      location.reload();
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;600;900&display=swap");
#app {
  font-family: "Inter", sans-serif;
  line-height: 1.5;
}
.v-application {
  background-color: #f4f5fa !important;
}
</style>
