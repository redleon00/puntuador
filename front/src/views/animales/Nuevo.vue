<template>
  <v-container fluid>
    <v-card elevation="23">
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-row>
            <v-col class="h3 font-weight-bold">Agregar Animal</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="Nombre"
                v-model="form.name"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-radio-group v-model="form.sex" row>
                <v-radio
                  label="Macho"
                  value="M"
                  color="indigo"
                  class="form-control-sm"
                ></v-radio>
                <v-radio
                  label="Hembra"
                  value="H"
                  color="indigo"
                  class="form-control-sm"
                ></v-radio>
              </v-radio-group>
              
            </v-col>
            <v-col cols="12" md="3">
              <v-radio-group v-model="type" row>
                <v-radio
                  label="Ovino"
                  value="OVINO"
                  color="indigo"
                  class="form-control-sm"
                ></v-radio>
                <v-radio
                  label="Caprino"
                  value="CAPRINO"
                  color="indigo"
                  class="form-control-sm"
                ></v-radio>
              </v-radio-group>
              
            </v-col>
            
            
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-combobox
                v-model="form.race"
                label="Raza"
                item-text="name"
                item-value="name"
                :items="races"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="4">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.dateFormatted"
                    label="Fecha de Nacimiento"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                    show-adjacent-months
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="form.category"
                label="Categoria"
                :items="categorys"
                class="form-control-sm"
                :rules="rules.required"
                required
                @change="setSubcategory"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="form.subcategory"
                label="Subcategoria"
                :items="subcategorys2"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="form.owner"
                label="Expositor"
                :items="expositors"
                item-text="name"
                item-value="name"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="form.breeder"
                label="Criador"
                :items="breeders"
                item-text="name"
                item-value="name"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-combobox>
            </v-col>
          </v-row>
          
          <v-divider></v-divider>
          <v-spacer></v-spacer><v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text :to="link">
              <v-icon dark> fa fa-arrow-left </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit"> Aceptar </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>        
<script>
import axios from "@/axios";
//import moment from 'moment';
export default {
  data() {
    return {
      rules: {
        required: [(v) => !!v || "Campo requerido"],
      },
      server: process.env.API_URL || "http://localhost:3000",
      value: "",
      custom: true,
      link: "/animales/index",
      form: {
        name: "",
        sex: "M",
        race: "",
        category: "",
        subcategory: "",
        owner: "",
        breeder: "",
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        type: 'O'
      },
      races: [],
      allRaces: [],
      categorys: [],
      subcategorys: [],
      subcategorys2: [],
      expositors: [],
      breeders: [],
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      type: 'OVINO'
    };
  },
  created() {
    this.getParticipants();
    this.getRaces();
    this.getCategory();
    this.getSubcategory();
  },
  watch: {
    date () {
      //this.form.dateFormatted = this.formatDate(this.date)
      console.log("la fecha", this.form.dateFormatted)
    },
    type(){
      this.races = []
      this.form.race = ''
      this.races = this.allRaces.filter(x => x.tipo === this.type);
     
    }
  },
  methods: {
    submit() {
      axios
        .post(`/animal/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
          this.$refs.form.reset();
          this.sex = "M";
        })
        .catch((err) => {
          console.error(err);
          this.$toast.open({
            message: "Ups!...ocurrió un error :(",
            type: "error",
            position: "bottom",
            duration: 5000,
          });
        });
    },
    getParticipants() {
      axios
        .get("participant")
        .then((res) => {
          this.expositors = res.data.filter(x => x.owner == true)
          this.breeders = res.data.filter(y => y.breeder == true)
          /*this.participants = res.data.map(function (x) {
            return x.name;
          });*/
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getRaces() {
      axios
        .get("race")
        .then((res) => {
          this.allRaces = res.data
          this.races = this.allRaces.filter(x => x.tipo === "OVINO")
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCategory() {
      axios
        .get("category")
        .then((res) => {
          this.categorys = res.data.map(function (x) {
            return x.name;
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getSubcategory() {
      axios
        .get("subcategory")
        .then((res) => {
          this.subcategorys = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setSubcategory() {
      this.form.subcategory = "";
      this.subcategorys2 = this.subcategorys.filter(
        (p) => p.category === this.form.category
      );
      this.subcategorys2 = this.subcategorys2.map(function (x) {
        return x.name;
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>