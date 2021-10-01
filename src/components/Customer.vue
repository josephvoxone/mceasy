<template>
  <div class="container-form">
    <h2 class="white--text">Edit Customer</h2>
    <div class="subtitle mb-4 white--text">
      Update the form to edit customers.
    </div>

    <div v-if="customer" class="edit-form pa-7 v-card">
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            class="breadcumb-mc"
            :href="item.href"
            :disabled="item.disabled"
          >
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" sm="2">
            <v-img
              :src="customer.image"
              :lazy-src="customer.image"
              aspect-ratio="1"
              class="grey lighten-2"
            >
            </v-img>

            <v-btn
              block
              depressed
              @click="uploadImage"
              class="mt-2 btn-primer btn-upload"
            >
              Upload
            </v-btn>
            <v-btn
              block
              depressed
              @click="removeImage"
              class="mt-2 btn-primer btn-upload"
            >
              Remove
            </v-btn>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="customer.name"
              label="Full Name"
              :rules="[(v) => !!v || 'Full name is required']"
              required
              outlined
              append-icon="mdi-account"
            ></v-text-field>
            <v-label>Gender</v-label>
            <v-radio-group
              v-model="customer.gender"
              row
              mandatory
              :rules="[(v) => !!v || 'Gender is required']"
            >
              <v-radio label="Male" value="1" checked></v-radio>
              <v-radio label="Female" value="0"></v-radio>
            </v-radio-group>

            <v-menu
              v-model="menudate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="customer.birthdate"
                  :rules="[(v) => !!v || 'Date of Birth is required']"
                  label="Date of Birth"
                  readonly
                  outlined
                  required
                  v-bind="attrs"
                  v-on="on"
                  append-icon="mdi-calendar-account"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="customer.birthdate"
                @input="menudate = false"
              ></v-date-picker>
            </v-menu>

            <v-select
              :items="['KTP', 'SIM', 'PASPORT']"
              v-model="customer.id_type"
              label="Identity Type"
              required
              outlined
              :rules="[(v) => !!v || 'Identity type is required']"
              append-icon="mdi-smart-card-reader"
            ></v-select>

            <v-text-field
              v-model="customer.id_number"
              label="Identity Number"
              :rules="[(v) => !!v || 'Identity number is required']"
              required
              outlined
              append-icon="mdi-smart-card"
            ></v-text-field>

            <v-text-field
              v-model="customer.email"
              label="Email"
              type="email"
              placeholder="john@gmail.com"
              :rules="[(v) => !!v || 'Email is required']"
              required
              outlined
              append-icon="mdi-email"
            ></v-text-field>

            <v-text-field
              prefix="+62"
              placeholder="8XX XXXX XXXX"
              v-model="customer.phone"
              append-icon="mdi-phone"
              label="Phone Number"
              :rules="[(v) => !!v || 'Phone Number is required']"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5">
            <v-textarea
              append-icon="mdi-home"
              v-model="customer.address"
              label="Address"
              rows="3"
              :rules="[(v) => !!v || 'Address is required']"
              required
              outlined
            ></v-textarea>

            <v-textarea
              append-icon="mdi-home-analytics"
              v-model="customer.detail_address"
              label="Detail Address"
              rows="2"
              :rules="[(v) => !!v || 'Detail Address is required']"
              required
              outlined
            ></v-textarea>

            <v-text-field
              append-icon="mdi-instagram"
              v-model="customer.instagram"
              outlined
              label="Instagram"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>

        <v-btn depressed @click="updateCustomer" class="mr-2 btn-primer">
          Save Customer
        </v-btn>

        <v-btn depressed class="mr-2 btn-delete" @click="deleteCustomer">
          Delete
        </v-btn>
      </v-form>

      <p class="mt-3">{{ message }}</p>
    </div>

    <div v-else>
      <p>Please click on a Tutorial...</p>
    </div>
  </div>
</template>

<script>
import CustomerAPI from "../services/Customer";

export default {
  name: "customer",
  data() {
    return {
      items: [
        {
          text: "Customers",
          disabled: false,
          href: "/",
        },
        {
          text: "Add Customer",
          disabled: true,
          href: "#",
        },
      ],
      menudate: false,
      customer: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      CustomerAPI.get(id)
        .then((response) => {
          this.customer = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateCustomer() {
      console.log(this.customer);

      CustomerAPI.update(this.customer.id, this.customer)
        .then((response) => {
          console.log(response.data);
          this.message = "The Customer was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    uploadImage() {},
    removeImage() {},

    async deleteCustomer() {
      CustomerAPI.delete(this.customer.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "customers" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.btn-delete {
  text-transform: capitalize;
  letter-spacing: normal;
  background-color: #292560 !important;
  color: #ffff !important;
}
.edit-form {
  /* max-width: 1000px; */
  margin: auto;
}
</style>
