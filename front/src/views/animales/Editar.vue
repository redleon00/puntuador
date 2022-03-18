<template>
  <v-container fluid>
    <v-card elevation="23">
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-card-title class="h3 font-weight-bold">
            Info Animal
          </v-card-title>
          <v-divider></v-divider>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.register"
                label="Nº de Registro"
                :rules="rules.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.tatoo"
                label="Tatuaje"
                :rules="rules.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.name"
                label="Nombre"
                :rules="rules.required"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <!--<v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >-->
               
                  <v-text-field
                    v-model="date"
                    label="Fecha de Nacimiento"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="rules.required"
                  ></v-text-field>
                
                <!--<v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>-->
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.category"
                label="Categoria"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-radio-group v-model="form.sex" row :rules="rules.required">
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
              <v-combobox
                v-model="form.breeder"
                label="Criador"
                item-text="name"
                item-value="name"
                :items="breeders"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="4">
              <v-combobox
                v-model="form.team"
                label="Equipo"
                item-text="name"
                item-value="name"
                :items="teams"
                class="form-control-sm"
                :rules="rules.required"
                required
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
           <v-col cols="12" md="4">
              <v-select
                  v-model="form.asociation"
                  label="Asociación"
                  class="form-control-sm"
                  :rules="rules.required"
                  required
                  :items="asociations"
                />
            </v-col>
          </v-row>              
          <v-card-actions>
            <v-btn text :to="link">
              <v-icon dark> fa fa-arrow-left </v-icon>
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit"
              ><!--:disabled="disableAccept" -->
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>        
<script>
import axios from "@/axios";
import moment from "moment";
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
        owner: "",
        breeder: "",
        register: "",
        tatoo: "",
        team: "",
        changeTeam: false,
        oldteam: "",
        birthday: "",
        asociation: "",
        group:""
      },
      asociations:[],
      races: [],
      categorys: [],
      participants: [],
      animalData: [],
      id: "",
      teams: [],
      breeders: [],
      date:new Date().toISOString().substr(0, 10),
      menu2: false,
    };
  },
  created() {
    this.getParticipants();
    this.getRaces();
    this.getCategory();
    this.getTeam();
    this.getAsoc();
    this.animalData = this.$router.history.current.params.item;
    this.id = this.animalData._id;
    this.form.register = this.animalData.register;
    this.form.tatoo = this.animalData.tatoo;
    this.form.name = this.animalData.name;
    this.form.sex = this.animalData.sex;
    this.form.race = this.animalData.race;
    this.form.category = this.animalData.category;
    this.form.owner = this.animalData.owner;
    this.form.breeder = this.animalData.breeder;
    this.date = this.animalData.birthday.slice(0, 10);
    this.form.team = this.animalData.team;
    this.form.asociation = this.animalData.asociation;
    this.form.group = this.animalData.group;
    console.log("created", this.animalData)
      let birth = moment(this.date);
      let today = moment("2021-07-10"); //fecha Tope
      let days = today.diff(birth, "days");
      let category = this.categorys.filter(
        (x) => days >= x.min && days <= x.max
      );

      if (days >= 90) {
        this.form.category = category[0].name;
        this.form.group = category[0].group;
      } else if (days < 90 && days >= 0) {
        this.$toast.open({
          message: "Ejemplar no cumple con la edad mínima para concursar",
          type: "error",
          position: "bottom",
          duration: 3000,
        });
      } else {
        this.$toast.open({
          message: "Fecha Inválida",
          type: "error",
          position: "bottom",
          duration: 3000,
        });
      }

    
  },
  watch: {
    date(val) {
      let birth = moment(val);
      let today = moment("2021-07-10");
      let days = today.diff(birth, "days");
      let category = this.categorys.filter(
        (x) => days >= x.min && days <= x.max
      );

      if (days >= 90) {
        this.form.category = category[0].name;
        this.form.group = category[0].group;
      } else if (days < 90 && days >= 0) {
        this.$toast.open({
          message: "Ejemplar no cumple con la edad mínima para concursar",
          type: "error",
          position: "bottom",
          duration: 3000,
        });
      } else {
        this.$toast.open({
          message: "Fecha Inválida",
          type: "error",
          position: "bottom",
          duration: 3000,
        });
      }
    },
  },
  methods: {
    getAsoc() {
        axios
          .get("asociations")
          .then((res) => {
            //console.log(res)
            this.asociations = res.data;
          })
          .catch((err) => {
            console.error(err);
          });
      },
    submit() {
     this.form.birthday = this.date;
      if (this.form.team.toUpperCase() !== this.animalData.team.toUpperCase()) {
          this.form.changeTeam = true;
      }
      axios
        .put(`/animal/updateOne/${this.id}`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
          //this.$refs.form.reset();
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
          this.participants = res.data.map(function (x) {
            return x.name;
          });
          this.breeders = res.data.filter((x) => x.breeder == true);
          this.breeders = this.breeders.map(function(x){ return x.name });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getRaces() {
      axios
        .get("race")
        .then((res) => {
          this.races = res.data.filter(x => x.tipo == this.animalData.type)
          this.races = this.races.map(function (x) {
            return x.name;
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCategory() {
      axios
        .get("category")
        .then((res) => {
          this.categorys = res.data
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getTeam() {
      axios
        .get("teams")
        .then((res) => {
          console.log("teams", res.data)
          this.teams = res.data.filter(
            (x) => x.participant == this.animalData.owner && x.animal_type == this.animalData.animal_type
          );
          this.teams = this.teams.map(function (x) {
            return x.name;
          })
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>