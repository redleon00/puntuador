<template>
  <v-container fluid>
    <v-card elevation="23">
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-row>
            <v-col class="h3 font-weight-bold">Editar Equipo de Exhibición</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="form.participant"
                label="Productor"
                :items="data"
                item-text="name"
                item-value="name"
                class="form-control-sm"
                :rules="rules.required"
                required
                disabled
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="Nombre del Equipo"
                v-model="form.name"
                class="form-control-sm"
                :rules="rules.required"
                required
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
                 <v-radio-group 
                  v-model="form.type" 
                  row 
                  disabled
                  >
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
          <v-spacer></v-spacer><v-spacer></v-spacer>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card elevation="23">
      <v-card-text>
        <v-form ref="form2">
          <v-row>
            <v-col class="h5 font-weight-bold">Ejemplares</v-col>
          </v-row>

          <v-row d-flex justify-space-around>
            <v-col cols="12" md="4">
              <v-dialog v-model="dialog" max-width="1200px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :disabled="activate"
                  >
                    <v-icon dark> fa fa-plus </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="text-h5 mb-4">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-subtitle>
                    <span class="text-subtitle1 font-weight-black"
                      >Productor:</span
                    ><span class="mr-4"> {{ this.teamData.participant }} </span>
                    <span class="text-subtitle1 font-weight-black"
                      >Equipo: </span
                    >{{ this.teamData.name }}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="form2.register"
                            label="Nº de Registro"
                            :rules="rules.required"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="form2.tatoo"
                            label="Tatuaje"
                            :rules="rules.required"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="form2.name"
                            label="Nombre"
                            :rules="rules.required"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
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
                            v-model="form2.categoria"
                            label="Categoria"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-radio-group
                            v-model="form2.sex"
                            row
                            :rules="rules.required"
                          >
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
                            v-model="form2.race"
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
                            v-model="form2.breeder"
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
                          v-model="form2.asociation"
                          label="Asociación"
                          class="form-control-sm"
                          :rules="rules.required"
                          required
                          :items="asociations"
                        />  
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-btn color="red" text @click="cerrar"> Cerrar </v-btn>

                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="submit2"
                          ><!--:disabled="disableAccept" -->
                          Aceptar
                        </v-btn>
                      </v-card-actions>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-col>

            <v-col col="12" md="4" offset-md="4">
              <input
                class="form-control"
                type="text"
                v-model="search"
                placeholder="Buscar.."
                id="search"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12" md="12">
              <v-data-table
                :headers="headers"
                :items="animals"
                loading
                loading-text="Please wait"
                :search="search"
                :items-per-page="10"
                :page.sync="page"
                hide-default-footer
                @page-count="pageCount = $event"
                class="border"
                id="table"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small class="mr-4" @click="editItem(item)">
                    fa fa-edit
                  </v-icon>

                  <v-icon small class="ml-4" @click="deleteItem(item)">
                    fa fa-trash
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-spacer></v-spacer><v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text :to="link">
              <v-icon dark> fa fa-arrow-left </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <!--<v-btn color="primary" text @click="submit"> Aceptar </v-btn>-->
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
      custom: true,
      link: "/exhibicion/index",
      form: {
        name: "",
      },
      form2: {
        name: "",
        tatoo: "",
        register: "",
        categoria: "",
        subcategoria: "",
        breeder: "",
        sex: "M",
        ID_team: "",
        team: "",
        birthday: "",
        type: "OVINO", //animal specimen Caprino u Ovino,
        race: "",
        asociation: "",
        group:"",
      },
      data: [],
      team_save: false,
      selectedIndex: 0,
      disabled_button: false,
      t: [], //data de equipo recien guardado
      search: "",
      page: 1,
      animals: [],
      dialog: false,
      editedIndex: -1,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      allRaces: [],
      races: [],
      breeders: [],
      categorys: [],
      activate: true,
      teamData: [],
      asociations:['AVCO', 'ASOOVINOS', 'ASOCABRA', 'CAVIDOC','OTRO'],    
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Sexo",
          align: "start",
          sortable: true,
          value: "sex",
          class: "thead-light",
        },
        {
          text: "Nº Reg",
          align: "start",
          sortable: false,
          value: "register",
          class: "thead-light",
        },
        {
          text: "Tatuaje",
          align: "start",
          sortable: false,
          value: "tatoo",
          class: "thead-light",
        },
        {
          text: "Raza",
          align: "center",
          sortable: true,
          value: "race",
          class: "thead-light",
        },
        {
          text: "Categoria",
          align: "center",
          sortable: true,
          value: "category",
          class: "thead-light",
        },
        {
          text: "Asociación",
          align: "center",
          sortable: false,
          value: "asociation",
          class: "thead-light",
        },
        {
          text: "Criador",
          align: "center",
          sortable: false,
          value: "breeder",
          class: "thead-light",
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          class: "thead-light",
          value: "actions",
        },
      ],
    };
  },
  created() {
    this.teamData = this.$router.history.current.params.item;
    this.id = this.teamData._id;
    this.form.participant = this.teamData.participant;
    this.form.name = this.teamData.name;
    this.form.type = this.teamData.type
    this.animals = this.teamData.all_teams;
    console.log("this.teamData", this.teamData);
    let cant = this.animals.length;
    if (cant < 10) {
      this.activate = false;
    }
    this.getExpositors();
    this.getRaces();
    this.getCategory();
  },
  watch: {
    date(val) {
      let birth = moment(val);
      let today = moment("2021-07-10");

      let days = today.diff(birth, "days");
      console.log(days);
      let category = this.categorys.filter(
        (x) => days >= x.min && days <= x.max
      );

      if (days >= 90) { // acepta animales para 3-6 meses 
        this.form2.categoria = category[0].name;
        this.form2.group = category[0].group;
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Ejemplar" : "Editar Ejemplar";
    },
  },
  methods: {
    getExpositors() {
      axios
        .get("participant")
        .then((res) => {
          this.data = res.data;
          this.data = res.data.filter((x) => x.owner == true);
          this.breeders = res.data.filter((x) => x.breeder == true);
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
          this.races = this.allRaces.filter(
            (x) => x.tipo === this.form.type
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    change_races(){
      this.form2.race = ""
      this.races = this.allRaces.filter(x => x.tipo === this.form.type )
    },
    getCategory() {
      axios
        .get("category")
        .then((res) => {
          this.categorys = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cerrar() {
      this.dialog = false;
      this.editedIndex = -1;
      this.resetform2();
    },
    editItem(item) {
      //this.disableAccept = false
      //this.disabled = false
      this.editedIndex = this.animals.indexOf(item);
      this.dialog = true;
      this.form2.name = item.name;
      this.form2.register = item.register;
      this.form2.tatoo = item.tatoo;
      this.form2.categoria = item.category;
      this.form2.race = item.race;
      this.form2.breeder = item.breeder;
      this.form2.asociation = item.asociation; 
      this.form2.group = item.group; 
      this.form2.type = item.type; 
      this.races = this.allRaces.filter(x => x.tipo === this.form.type)
      //this.change_races()


      this.date = item.birthday.slice(0, 10);
    },
    deleteItem(item) {
       this.$swal.fire({
        title: 'Está seguro de eliminar este ejemplar?',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: `Sí`,
        customClass: {
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          let pos = this.animals.indexOf(item);
      axios
        .post(`/animalEx/deleted/${item._id}`)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "warning",
            position: "bottom",
            duration: 5000,
          });
          this.animals.splice(pos, 1);
          let cant = this.animals.length;
          if (cant < 10) {
            this.activate = false;
          }
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
        }else if (result.isDenied){
            //algo
        }
      })
      
    },
    submit2() {
      if (this.editedIndex > -1) {
        this.updateItem(this.animals[this.editedIndex]);
      } else {
        this.form2.ID_team = this.id;
        this.form2.birthday = this.date;
        this.form2.team = this.teamData.name;
        //this.form2.type = this.teamData.animal_type;
        this.form2.owner = this.teamData.participant;
        let animal_per_race = this.animals.filter(
          (x) => x.race == this.form2.race.name && x.category == this.form2.categoria && x.sex == this.form2.sex 
        );
        let animal_per_team = this.animals.length;
        //console.log(this.animals)
        if (animal_per_race.length < 4 && animal_per_team < 10) {
          axios
            .post(`/animalEx/register`, this.form2)
            .then((res) => {
              this.$toast.open({
                message: res.data.message,
                type: "success",
                position: "bottom",
                duration: 3000,
              });
              console.log(res.data.animal);
              this.animals.push(res.data.animal);
              this.resetform2();
              this.getExpositors()
              //this.$refs.form2.reset();
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
        } else {
          let message = "";
          if (animal_per_race.length > 4) {
              message = "Ha alcanzado el número máximo de ejemplares para esta RAZA en este equipo"
          } else if (animal_per_team > 10) {        
              message = "Ha alcanzado el número de ejemplares para este equipo"
          }
          this.$toast.open({
            message: message,
            type: "warning",
            position: "top",
            duration: 3000,
          });
        }
      }
    },
    updateItem(item) {
      let pos = this.animals.indexOf(item);
      this.form2.race =
        typeof this.form2.race == "object"
          ? this.form2.race.name
          : this.form2.race;
      this.form2.breeder =
        typeof this.form2.breeder == "object"
          ? this.form2.breeder.name
          : this.form2.breeder;
      this.form2.birthday = this.date;

      axios
        .put(`/animalEx/update/${item._id}`, this.form2)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });

          this.editedIndex = -1;
          this.animals[pos].name = this.form2.name.toUpperCase();
          this.animals[pos].register = this.form2.register;
          this.animals[pos].tatoo = this.form2.tatoo.toUpperCase();
          this.animals[pos].category = this.form2.categoria;
          this.animals[pos].race = this.form2.race;
          this.animals[pos].birthday = this.form2.birthday;
          this.animals[pos].breeder = this.form2.breeder;
          this.animals[pos].sex = this.form2.sex;
          this.animals[pos].asociation = this.form2.asociation;
          this.animals[pos].group = this.form2.group;
          //console.log("animals", this.animals[pos])
          this.resetform2();
          this.dialog = false;
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
      this.form2.register = "";
      this.form2.tatoo = "";
      this.form2.name = "";
      //this.date = new Date().toISOString().substr(0, 10)
      this.form2.birth = "";
      this.form2.categoria = "";
      this.form2.race = "";
      this.form2.breeder = "";
      this.form2.asociation = ""
      this.form2.group = ""
    },
  },
};
</script> 