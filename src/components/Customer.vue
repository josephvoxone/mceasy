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
            :to="item.href"
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
              v-bind:src="customer.image"
              v-bind:lazy-src="customer.image"
              aspect-ratio="1"
              class="grey lighten-2"
            >
            </v-img>

            <v-btn
              block
              depressed
              @click="$refs.refInputEl.click()"
              class="mt-2 btn-primer btn-upload"
            >
              Upload
            </v-btn>
            <!-- Input Image -->
            <input
              ref="refInputEl"
              type="file"
              accept="image/*"
              :hidden="true"
              @change="selectImage"
            />

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
              :rules="[rules.required, rules.id_number]"
              required
              outlined
              append-icon="mdi-smart-card"
            ></v-text-field>

            <v-text-field
              v-model="customer.email"
              label="Email"
              type="email"
              placeholder="john@gmail.com"
              :rules="[rules.required, rules.email]"
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
              :rules="[rules.required, rules.phone]"
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
              v-bind:value="customer.detail_address"
              label="Detail Address"
              rows="2"
              :rules="[(v) => !!v || 'Detail Address is required']"
              required
              outlined
              readonly
              hint="use gmaps for fill your detail address"
              persistent-hint
            ></v-textarea>

            <div class="ma-auto" style="display: flex; justify-content: center">
              <GmapAutocomplete
                required
                class="input-maps"
                :select-first-on-enter="true"
                @place_changed="setPlace"
              >
              </GmapAutocomplete>
            </div>
            <GmapMap
              class="mb-5"
              style="width: 100%; height: 300px; margin-top: -50px"
              :zoom="1"
              :center="{ lat: -6.6771688, lng: 111.8481033 }"
              :options="{
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false,
              }"
            >
              <GmapMarker
                :clickable="true"
                :draggable="true"
                v-for="(marker, index) in markers"
                :key="index"
                :position="marker.position"
              />
              <GmapMarker
                v-if="this.customer.lat"
                :position="{
                  lat: parseInt(this.customer.lat),
                  lng: parseInt(this.customer.long),
                }"
              />
            </GmapMap>
            <v-text-field
              append-icon="mdi-instagram"
              v-model="customer.instagram"
              outlined
              label="Instagram"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>
        <div type="submit" class="d-flex justify-end">
          <v-btn depressed @click="updateCustomer" class="mr-2 btn-primer">
            Save Customer
          </v-btn>

          <v-btn depressed class="mr-2 btn-delete" @click="deleteCustomer">
            Delete
          </v-btn>
        </div>
      </v-form>

      <p class="mt-3">{{ message }}</p>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import CustomerAPI from "../services/Customer";

export default {
  name: "customer",
  data() {
    return {
      markers: [],
      place: null,
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
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const pattern =
            /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;
          return pattern.test(value) || "Invalid phone.";
        },
        id_number: (value) => {
          const pattern = /[0-9]+/;
          return pattern.test(value) || "Invalid ID Number.";
        },
      },
      menudate: false,
      customer: null,
      message: "",
    };
  },
  methods: {
    setPlace(place) {
      this.place = place;
      this.customer.detail_address = place.formatted_address;
      this.customer.lat = this.place.geometry.location.lat();
      this.customer.long = this.place.geometry.location.lng();
      console.log(this.customer);
    },
    getCustomer(id) {
      CustomerAPI.get(id)
        .then((response) => {
          this.customer = response.data;
          // this.place.geometry.location.lat().value = this.customer.lat;
          // this.place.geometry.location.lng().value = this.customer.long;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateCustomer() {
      if (this.$refs.form.validate()) {
        console.log(this.customer);
        CustomerAPI.update(this.customer.id, this.customer)
          .then((response) => {
            this.$router.push({ name: "customers" });
            console.log(response.data);
            // this.message = "The Customer was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    removeImage() {
      this.customer.image = null;
    },
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
    selectImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        // console.log("Raw Image", rawImg);
        this.customer.image = rawImg;
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    this.message = "";
    this.getCustomer(this.$route.params.id);
  },
};
</script>

<style>
.input-maps {
  z-index: 9999;
  position: relative;
  background: #ffff;
  padding: 0 15px;
  width: 90%;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  margin: 10px 0;
  font-weight: 100;
  font-family: "Inter", sans-serif;
}
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
