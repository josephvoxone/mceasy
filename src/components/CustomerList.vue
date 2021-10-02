<template>
  <div class="container-form">
    <h2 class="white--text">Customer</h2>
    <div class="subtitle mb-4 white--text">Manage your customer here.</div>

    <div class="edit-form v-card">
      <v-row align="center" class="list mx-auto">
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" style="box-shadow: none" tile>
            <v-card-title>
              <strong>Customers</strong>
              <v-spacer></v-spacer>
              <v-text-field
                filled
                rounded
                v-model="title"
                append-icon="mdi-magnify"
                label="Search Customer"
                @change="searchTitle"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" sm="4" class="pa-0">
                <v-col>
                  <v-select
                    label="Gender"
                    @change="searchGender"
                    v-model="gender"
                    :items="['All', 'Male', 'Female']"
                    required
                    outlined
                  >
                  </v-select>
                </v-col>
              </v-col>
              <v-col cols="12" sm="5" class="pa-0">
                <v-col>
                  <v-text-field
                    required
                    outlined
                    @change="searchAddress"
                    v-model="address"
                    label="Address"
                    placeholder="All Country, Street, City"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="12" sm="3" align="center">
                <v-btn
                  @click="$router.push('add')"
                  block
                  depressed
                  x-large
                  class="btn-primer"
                >
                  <v-icon left> mdi-plus </v-icon>
                  Add Customer
                </v-btn>
              </v-col>
            </v-row>

            <v-data-table :headers="headers" :items="customers">
              <template v-slot:[`item.name`]="{ item }">
                <div class="d-inline-flex  justify-center">
                  <v-avatar class="mr-3" size="36">
                    <img
                      :src="item.image"
                      style="object-fit: cover"
                      alt="John"
                    />
                  </v-avatar>
                  <div>
                    <span
                      class="
                        d-block
                        font-weight-bold
                        text--primary text-truncate
                      "
                      >{{ item.name }}</span
                    >
                    <small>{{ item.email }}</small>
                  </div>
                </div>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="mr-2" @click="edit(item.id)">
                  mdi-circle-edit-outline
                </v-icon>
                <v-icon @click="deleteItem(item.id)">
                  mdi-trash-can-outline</v-icon
                >
              </template>
            </v-data-table>

            <!-- <v-card-actions v-if="customers.length > 0">
              <v-btn small color="error" @click="removeAllTutorials">
                Remove All
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CustomerAPI from "../services/Customer";
export default {
  name: "customer-list",
  data() {
    return {
      customers: [],
      title: "",
      gender: "",
      address: "",
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id" },
        { text: "Name", value: "name", sortable: true },
        { text: "Gender", value: "gender", sortable: true },
        { text: "Address", value: "address", sortable: true },
        { text: "Phone", value: "phone", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveCustomer() {
      CustomerAPI.getAll()
        .then((response) => {
          this.customers = response.data.map(this.getDisplay);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCustomer();
    },

    removeAllTutorials() {
      CustomerAPI.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      CustomerAPI.findByTitle(this.title)
        .then((response) => {
          this.customers = response.data.map(this.getDisplay);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchAddress() {
      CustomerAPI.findByAddress(this.address)
        .then((response) => {
          this.customers = response.data.map(this.getDisplay);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchGender() {
      CustomerAPI.findByGender(
        this.gender == "Male" ? 1 : this.gender == "Female" ? 0 : ""
      )
        .then((response) => {
          this.customers = response.data.map(this.getDisplay);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    edit(id) {
      this.$router.push({ name: "customer-details", params: { id: id } });
    },

    deleteItem(id) {
      CustomerAPI.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplay(data) {
      return {
        id: data.id,
        image: data.image,
        name: data.name,
        email: data.email,
        gender: data.gender == 1 ? "Male" : "Female",
        address: data.address,
        phone: data.phone,
      };
    },
  },
  mounted() {
    this.retrieveCustomer();
  },
};
</script>

<style>
.list {
  /* max-width: 750px; */
}
</style>
