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
    <div class="row justify-content-between">
      <results
        :animals="this.animalsSelect"
        :item="this.item"
        :modal="this.open"
        :title="this.title_card"
        :inputs="this.inputs"
        @closed="closed"
        @saved="save"
      />
      <div class="col-md-2">
        <div data-app></div>
      </div>
      <div class="col-md-4">
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
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="col-md-12">
            <v-data-table
              :headers="headers"
              :items="data1"
              loading
              loading-text="Please wait"
              :search="search"
              :items-per-page="10"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
              class="border"
              id="table"
              :key="componentKey"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-4"
                  @click="editItem(item)"
                  :disabled="!item.status"
                >
                  {{ !item.status ? "fas fa-check-double" : "fa fa-trophy" }}
                </v-icon>

                <!--<v-icon small class="ml-4" @click="viewItem(item)">
                  {{ !item.status ? "fa fa-eye" : "" }}
                </v-icon>-->
              </template>
            </v-data-table>
            <div class="row">
              <div class="col">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="col-md-12">
            <v-data-table
              :headers="headers"
              :items="data2"
              loading
              loading-text="Please wait"
              :search="search"
              :items-per-page="10"
              :page.sync="page2"
              hide-default-footer
              @page-count="pageCount2 = $event"
              class="border"
              id="table"
              :key="componentKey"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-4"
                  @click="editItem(item)"
                  :disabled="!item.status"
                >
                  {{ !item.status ? "fas fa-check-double" : "fa fa-trophy" }}
                </v-icon>

                <!--<v-icon small class="ml-4" @click="viewItem(item)">
                  {{ !item.status ? "fa fa-eye" : "" }}
                </v-icon>-->
              </template>
            </v-data-table>
            <div class="row">
              <div class="col">
                <v-pagination
                  v-model="page2"
                  :length="pageCount2"
                ></v-pagination>
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import results from "@/components/Results.vue";
export default {
  components: {
    results,
  },
  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      title: "Competencias de Supremos",
      page: 1,
      pageCount: 0,
      page2: 1,
      pageCount2: 0,
      data1: [],
      data2: [],
      search: "",
      tipo: "Categoria",
      componentKey: 0,
      items: ["OVINOS", "CAPRINOS"],
      tab: null,
      open: false,
      animals: [],
      animalsSelect: [],
      item: { _id: "" },
      title_card: "",
      inputs: [true, false, false],
      headers: [
        {
          text: "Competencia",
          align: "start",
          sortable: false,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Especie",
          align: "start",
          sortable: true,
          value: "type_animal",
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
          text: "Acciones",
          align: "start",
          sortable: false,
          class: "thead-light",
          value: "actions",
        },
      ],
    };
  },
  mounted() {
    this.getCompe();
    this.getAnimals();
  },

  methods: {
    getCompe() {
      axios
        .get(`competitions/listSupreme/`)
        .then((res) => {
          console.log(res.data);
          this.data1 = res.data.filter((x) => x.type_animal == "OVINO");
          this.data2 = res.data.filter((x) => x.type_animal == "CAPRINO");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAnimals() {
      axios
        .get("competitions/raceWinners")
        .then((res) => {
          this.animals = res.data;
          console.log("animales", this.animals);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editItem(item) {
      console.log("el animals", this.animals, item);
      let fil = {
        sex: item.sex,
        type_animal: item.type_animal,
      };
      let select = this.animals.filter(function (x) {
        for (var i in fil) {
          if (x[i] === undefined || x[i] != fil[i]) return false;
        }
        return true;
      });
      select.forEach(function(x){
        x.showname = x.tatoo+'-'+x.name
      })
      console.log("animales select", select);
      select = select.map((element) => {
        return element.firts_animal;
      });
      this.animalsSelect = select;
      let sex_word = item.sex == "M" ? "MACHOS" : "HEMBRAS";
      this.title_card =
        "ESPECIE:     " + item.type_animal + "  SEXO:   " + sex_word;
      this.item = item;
      this.open = true;
    },
    closed() {
      this.open = false;
    },
    save(form) {
      //console.log("llego al save de grupos", form, this.item)
      let data = {};
      data.id_competencia = this.item._id;
      data.name_competencia = this.item.name;
      data.category = this.item.category;
      data.sex = this.item.sex;
      data.firts_animal = form.first;
      data.pts_first = this.item.pts_first;
      data.type_animal = this.item.type_animal;
      this.$swal
        .fire({
          title: "Está seguro de guardar estos resultados?",
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
            axios
              .post("/competitions/saveGroupS", data)
              .then((res) => {
                this.$toast.open({
                  message: res.data.message,
                  type: "success",
                  position: "bottom",
                  duration: 5000,
                });
                let pos =
                  this.item.type_animal == "OVINO"
                    ? this.data1.indexOf(this.item)
                    : this.data2.indexOf(this.item);

                if (this.item.type_animal == "OVINO") {
                  this.data1[pos].status = false;
                } else {
                  this.data2[pos].status = false;
                }

                this.open = false;
              })
              .catch((err) => {
                console.log(err);
                this.$toast.open({
                  message: "Ups!...ocurrió un error :(",
                  type: "error",
                  position: "bottom",
                  duration: 5000,
                });
              });
          }
        });
    },
  },
};
</script>