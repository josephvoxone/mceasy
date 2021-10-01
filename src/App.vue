<template>
  <v-app>
    <v-card class="nav-drawer" height="400" width="256">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content style="padding: 30px 0; padding-left: 20px">
            <a href="/">
              <v-img
                :src="require('@/assets/logo.webp')"
                max-height="80%"
                max-width="70%"
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

    <v-app-bar class="nav-header" app>
      <!-- <div class="d-flex align-center mr-2">bezKoder</div>
      <v-btn to="/tutorials" text> Tutorials </v-btn>
      <v-btn to="/add" text> Add </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-home-variant-outline" },
        { title: "Analytic", icon: "mdi-chart-line" },
        { title: "Customer", to: "customers", icon: "mdi-account-multiple" },
        { title: "Product", icon: "mdi-label-multiple" },
        { title: "Orders", icon: "mdi-cart-outline" },
        { title: "Reports", icon: "mdi-google-analytics" },
        { title: "Settings", icon: "mdi-content-save-settings" },
        { title: "Support", icon: "mdi-headphones" },
      ],
      right: null,
    };
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
#app {
  font-family: "Inter", sans-serif;
  line-height: 1.5;
}
.v-application {
  background-color: #f4f5fa !important;
}
</style>
