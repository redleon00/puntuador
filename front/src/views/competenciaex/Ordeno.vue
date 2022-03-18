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
        <div data-app>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                small
                dark
                @click="saveAll"
                :disabled="activate"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> fa fa-check </v-icon>
              </v-btn>
            </template>
            <span>Registrar resultados finales</span>
          </v-tooltip>
        </div>
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
      <div class="col-md-12">
        <v-data-table
          :headers="headers"
          :items="animals"
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
              :disabled="activate"
            >
              {{ (item.status == false ) ? "fas fa-check-double" : "fa fa-trophy" }}
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
import results from "@/components/ResultsO.vue";
export default {
  components: {
    results,
  },
  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      title: "Competencias de Especiales - Ordeño",
      page: 1,
      pageCount: 0,
      search: "",
      tipo: "Categoria",
      componentKey: 0,
      data: [],
      open: false,
      animals: [],
      animalsSelect: [],
      activate: '',
      status: '',
      item: {
        _id: "",
        results_pts: {
          first_point: 0,
          second_point: 0,
          third_point: 0,
          four_point: 0,
        },
      },
      title_card: "",
      inputs: [true, true, true],
      headers: [
        {
          text: "Ejemplar",
          align: "start",
          sortable: false,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Raza",
          align: "start",
          sortable: true,
          value: "race",
          class: "thead-light",
        },
        {
          text: "1er Ordeño",
          align: "start",
          sortable: true,
          value: "results_pts.firts_point",
          class: "thead-light",
        },
        {
          text: "2do Ordeño",
          align: "center",
          sortable: true,
          value: "results_pts.second_point",
          class: "thead-light",
        },
        {
          text: "3er Ordeño",
          align: "center",
          sortable: true,
          value: "results_pts.third_point",
          class: "thead-light",
        },
        {
          text: "4to Ordeño",
          align: "center",
          sortable: true,
          value: "results_pts.four_point",
          class: "thead-light",
        },
        {
          text: "Total",
          align: "center",
          sortable: true,
          value: "results_pts.total",
          class: "thead-light",
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          class: "thead-light",
          value: "actions",
        },
      ],
    };
  },
  created() {
    this.getCompe();
    this.getAnimals();
    
  },

  methods: {
    setActivate(){
        console.log("status", this.data[0].status)
        this.activate = !this.data[0].status
    },
    getCompe() {
      axios
        .get(`competitionsEx/listCompOrdeno/`)
        .then((res) => {
          this.data = res.data;
          this.status = this.data.status
          this.setActivate();
        })
        .catch((err) => {
          console.error(err);
        });   
    },
    getAnimals() {
      axios
        .get("animalEx/listOrdeno")
        .then((res) => {
          this.animals = res.data;
          console.log("los animales", this.animals);
          this.animals.map((x) => {
            //x.status = !x.status
            if (x.results_pts.length == 0) {
              x.results_pts.firts_point = 0;
              x.results_pts.second_point = 0;
              x.results_pts.third_point = 0;
              x.results_pts.four_point = 0;
              x.results_pts.total =
                x.results_pts.firts_point +
                x.results_pts.second_point +
                x.results_pts.third_point +
                x.results_pts.four_point;
            } else {
              console.log("animal", x);
              x.results_pts.firts_point = x.results_pts[0].firts_point;
              x.results_pts.second_point = x.results_pts[0].second_point;
              x.results_pts.third_point = x.results_pts[0].third_point;
              x.results_pts.four_point = x.results_pts[0].four_point;
              x.results_pts.total = parseFloat(x.results_pts[0].firts_point) + parseFloat(x.results_pts[0].second_point) + parseFloat(x.results_pts[0].third_point) + parseFloat(x.results_pts[0].four_point);
              x.results_pts.total = Math.round((x.results_pts.total * 100) / 100)
             
            }
          });
          
        })
        .catch((err) => {
          console.error(err);
        });
       
    },
    editItem(item) {
      this.animals.forEach(function (x) {
        x.showname = x.tatoo + "-" + x.name;
      });
      this.animalsSelect = this.animals;
      //console.log("el animals", this.animalsSelect);
      console.log("item", item);
      this.title_card = item.showname;
      this.item = item;
      this.open = true;
    },
    closed() {
      this.open = false;
    },
    save(form) {
      console.log("la data comp", this.data);
      let data = {};
      data.id_competencia = this.data[0]._id;
      data.name_competencia = this.data[0].name;
      data.sex = this.item.sex;
      data.type_animal = this.item.type;
      data.pts_first = this.data[0].pts_first;
      data.pts_second = this.data[0].pts_second;
      data.pts_third = this.data[0].pts_third;

      data.animal = this.item;
      data.id_animal = this.item.animalId;
      data.firts_point = parseFloat(form.first_point);
      data.second_point = parseFloat(form.second_point);
      data.third_point = parseFloat(form.third_point);
      data.four_point = parseFloat(form.four_point);
      console.log("llego al save de grupos", data);
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
              .post("/competitionsEx/saveOrdeno", data)
              .then((res) => {
                this.$toast.open({
                  message: res.data.message,
                  type: "success",
                  position: "bottom",
                  duration: 5000,
                });
                let pos = this.animals.indexOf(this.item);
                this.animals[pos].status = true
                this.animals[pos].results_pts.firts_point = data.firts_point;
                this.animals[pos].results_pts.second_point = data.second_point;
                this.animals[pos].results_pts.third_point = data.third_point;
                this.animals[pos].results_pts.four_point = data.four_point;
                this.animals[pos].results_pts.total =
                  parseFloat(this.animals[pos].results_pts.firts_point) +
                  parseFloat(this.animals[pos].results_pts.second_point) +
                  parseFloat(this.animals[pos].results_pts.third_point) +
                  parseFloat(this.animals[pos].results_pts.four_point);
                //console.log("posicion", this.animals[pos]);

                //this.data[pos].status = false;
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
    saveAll() {
      this.animals.forEach((x) => {
        x.total_final = x.results_pts.total;
        console.log(typeof x.results_pts.total);
      });
      this.$swal
        .fire({
          icon: "warning",
          title: "Está seguro de guardar estos resultados y cerrar las competencias de Ordeño ?",
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
              .post("/competitionsEx/saveOrdenoFin", this.data)
              .then((res) => {
                this.$toast.open({
                  message: res.data.message,
                  type: "success",
                  position: "bottom",
                  duration: 3000,
                });
                this.activate = true
                this.$router.go()
              })
              .catch((err) => {
                console.log(err);
                this.$toast.open({
                  message: err.message,
                  type: "error",
                  position: "bottom",
                  duration: 3000,
                });
              });
          }
        });
    },
  },
};
</script>