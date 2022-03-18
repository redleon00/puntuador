<template>
  <div class="container">
    <div class="page-header">
      <h3 class="page-title">
        <strong> {{ title }} </strong>
      </h3>
      <div class="row align-center">
        <div class="col-12"></div>
      </div>
    </div>
    <v-row d-flex justify-space-around>
      <v-col cols="12" md="4">
        <v-dialog v-model="dialog" max-width="1200px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab small dark v-bind="attrs" v-on="on">
              <v-icon dark> fa fa-plus </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5 mb-4">{{ formTitle }}</span>
            </v-card-title>
            <v-card-subtitle>
              <span class="text-subtitle1 font-weight-black">Productor:</span
              ><span class="mr-4"> {{}} </span>
              <span class="text-subtitle1 font-weight-black">Equipo: </span>
            </v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="form.team"
                      label="Equipo"
                      item-text="name"
                      :items="teams"
                      class="form-control-sm"
                      :rules="rules.required"
                      required
                      @change="setOwner"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-combobox
                      v-model="form.name"
                      label="Ejemplar"
                      item-text="name"
                      item-value="name"
                      :items="animals"
                      class="form-control-sm"
                      :rules="rules.required"
                      required
                      @change="putData"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.reg"
                      label="Nº de Registro"
                     
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.tatoo"
                      label="Tatuaje"
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <div class="d-inline">
                      <v-checkbox
                        v-model="form.milker"
                        label="Ordeño"
                        class="d-inline"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.best_tits"
                        label="Mejor Ubre"
                        class="d-inline"
                      ></v-checkbox>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Fecha de Nacimiento"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="rules.required"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.categoria"
                      label="Categoria"
                      readonly
                    ></v-text-field>
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
                    <v-select
                      v-model="form.asociation"
                      label="Asociación"
                      class="form-control-sm"
                      :rules="rules.required"
                      required
                      :items="asociations"
                      item-text="name"
                      item-value="name"
                    />
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-btn color="red" text @click="cerrar"> Cerrar </v-btn>

                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="submit"
                    ><!--:disabled="disableAccept" -->
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <div class="row justify-content-between">
      <div class="col-md-4 offset-md-8">
        <input
          class="form-control"
          type="text"
          v-model="search"
          placeholder="Buscar.."
          id="search"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          :items-per-page="10"
          :page.sync="page"
          hide-default-footer
          @page-count="pageCount = $event"
          class="border"
          id="table"
          no-data-text="Sin datos"
        >
          <template v-slot:[`item.milker`]="{ item }">
            <v-icon color="blue" small>
              {{ item.milker }}
            </v-icon>
          </template>
          <template v-slot:[`item.best_tits`]="{ item }">
            <v-icon color="blue" small>
              {{ item.best_tits }}
            </v-icon>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <!--<v-icon small class="mr-4" @click="editItem(item)" color="red">
              fa fa-edit
            </v-icon>-->
            <v-icon small class="ml-4" @click="deleteItem(item)">
              fa fa-trash
            </v-icon>
          </template>
        </v-data-table>
        <div class="row">
          <div class="col">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      title: "Animales para Competencia de Ordeños y Mejor Ubre",
      formTitle: "Ordeños y Mejor Ubre",
      isLoading: false,
      page: 1,
      pageCount: 0,
      type: 0,
      data: [],
      search: "",
      editedIndex: -1,
      link: "/exhibicion/nuevo",
      items: ["OVINOS", "CAPRINOS"],
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      productors: [],
      breeders: [],
      asociations: [],
      races: [],
      teams: [],
      animals: [],
      form: {
        reg: "",
        tatoo: "",
        name: "",
        birthday: "",
        milker: false,
        best_tits: false,
        breeder: "",
        asociation: "",
        team: "",
        race: "",
        owner: "",
      },
      headers: [
        {
          text: "Ejemplar",
          align: "start",
          sortable: true,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Registro",
          align: "center",
          sortable: true,
          value: "register",
          class: "thead-light",
        },
        {
          text: "Tatoo",
          align: "center",
          sortable: true,
          value: "tatoo",
          class: "thead-light",
        },
        {
          text: "Ordeño",
          align: "center",
          sortable: true,
          value: "milker",
          class: "thead-light",
        },
        {
          text: "Mejor Ubre",
          align: "center",
          sortable: true,
          value: "best_tits",
          class: "thead-light",
        },
        {
          text: "Expositor",
          align: "center",
          sortable: true,
          value: "team",
          class: "thead-light",
        },
        {
          text: "Criador",
          align: "center",
          sortable: true,
          value: "breeder",
          class: "thead-light",
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "actions",
          class: "thead-light",
        },
      ],
    };
  },
  created() {
    this.getAnimalsAll();
    this.getRaces();
    this.getExpositors();
    this.getAsoc();
    this.getTeams();
    this.getAnimals();
  },
  watch: {
    date(val) {
      let birth = moment(val);
      let today = moment("2021-07-10");

      let days = today.diff(birth, "days");
      console.log(days);
      if (days > 730) {
        this.form.categoria = "MULTIPARA";
        //this.form2.group = category[0].group;
      } else if (days <= 730 && days >= 0) {
        this.form.categoria = "PRIMIPARA";
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
    setOwner(item){
      let dataTeam = this.teams.filter((x) => {
          return x.name == item
      })
      this.form.owner = dataTeam[0].participant
      console.log( "item", this.form.owner)
    },
    getAnimalsAll() {
      axios
        .get("animalAll/listCapri")
        .then((res) => {
          this.animals = res.data;
          console.log("animals reg", res.data);
          //this.animals.map((x) => (x.birthday = x.birthday.substr(0, 10)));
          this.animals = this.animals.filter((x) => x.tipo === "CAPRINO");
          console.log("animals reg", this.animals);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getTeams() {
      axios
        .get("teamsEx")
        .then((res) => {
          //console.log(res.data, "teams");
          this.teams = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getExpositors() {
      axios
        .get("participant")
        .then((res) => {
          // console.log("this.productors", res.data)
          this.productors = res.data.filter((x) => x.owner == true);
          this.breeders = res.data.filter((x) => x.breeder == true);
        })
        .catch((err) => {
          console.error(err);
        });
    },
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
    getRaces() {
      axios
        .get("race")
        .then((res) => {
          this.allRaces = res.data;
          this.races = this.allRaces.filter((x) => x.tipo === "CAPRINO");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAnimals() {
      axios
        .get("animalEx/listMilker")
        .then((res) => {
          this.data = res.data;
          console.log("data", this.data);
          this.data = res.data.map(function (x) {
            x.milker = (x.milker == true) ? "fa fa-check" : "";
            x.best_tits = (x.best_tits == true) ? "fa fa-check" : "";
            return x;
          });
          console.log("data", this.data)
        })
        .catch((err) => {
          console.error(err);
        });
    },
    putData(item) {
      console.log(item);
      this.form.reg = item.register;
      this.form.tatoo = item.tatoo;
      this.form.birthday = item.birthday;
      this.form.race = item.race;
      this.form.breeder = item.breeder;
      this.form.asociation = item.asociation;
      let birth = moment(this.form.birthday);
      let today = moment("2021-07-10");

      let days = today.diff(birth, "days");
      console.log(days);
      if (days > 730) {
        this.form.categoria = "MULTIPARA";
        //this.form2.group = category[0].group;
      } else if (days <= 730 && days >= 0) {
        this.form.categoria = "PRIMIPARA";
      } else {
        this.$toast.open({
          message: "Fecha Inválida",
          type: "error",
          position: "bottom",
          duration: 3000,
        });
      }
      //this.form.team = item.team
    },
    deleteItem(item) {
      this.$swal
        .fire({
          title: "Está seguro de Eliminar este equipo?",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: `Sí`,
          customClass: {
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            let pos = this.data.indexOf(item);
            axios
              .post(`/animalMilk/deleted/${item._id}`)
              .then((res) => {
                this.$toast.open({
                  message: res.data.message,
                  type: "warning",
                  position: "bottom",
                  duration: 3000,
                });

                this.data.splice(pos, 1);
              })
              .catch((err) => {
                console.error(err);
                this.$toast.open({
                  message: "Ups!...ocurrió un error :(",
                  type: "error",
                  position: "bottom",
                  duration: 3000,
                });
              });
          } else if (result.isDenied) {
            //algo
          }
        });
    },
    editItem(item) {
      this.$router.push({ name: "EditarEquipoEx", params: { item: item } });
    },
    ir(item) {
      console.log("llego", item);
    },
    cerrar() {
      this.dialog = false;
      this.editedIndex = -1;
      //this.resetform2()
    },
    submit() {
      this.form.date = this.date
      console.log("submit", this.form);
      axios
        .post(`animalMilk/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
          this.data.push(this.form);  
          this.resetform2();
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
    resetform2() {
      this.form.reg = "";
      this.form.tatoo = "";
      this.form.name = "";
      this.form.birth = "";
      this.form.categoria = "";
      this.form.race = "";
      this.form.breeder = "";
      this.form.asociation = "";
      this.form.best_tits = false;
      this.form.milker = false;
    },
  },
};
</script>