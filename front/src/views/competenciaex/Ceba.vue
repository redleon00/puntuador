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
      title: "Competencias de Exhibición - Ovinos de Ceba",
      page: 1,
      pageCount: 0,
      search: "",
      tipo: "Categoria",
      componentKey: 0,
      data: [],
      open: false,
      animals: [],
      animalsSelect: [],
      item: { _id: "" },
      title_card: "",
      inputs: [true, true, true],
      headers: [
        {
          text: "Nombre",
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
        .get(`competitionsEx/listCompCeba/`)
        .then((res) => {
          console.log(res.data);
          this.data = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAnimals() {
      axios
        .get("animalEx/listCeba")
        .then((res) => {
          this.animals = res.data;
          console.log("animales", this.animals);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editItem(item) {
        console.log(item)
      let select = this.animals.filter(
        (x) =>
          x.sex == item.sex 
      );
      select.forEach(function(x){
        x.showname = x.tatoo+'-'+x.name
      })
      this.animalsSelect = select;
      console.log("el animals", this.animalsSelect);
      let sex_word = item.sex == "M" ? "MACHOS" : "HEMBRAS";
      this.title_card = "RAZA: Todas"  + "  SEXO:   " + sex_word;
      this.item = item;
      this.open = true;
    },
    closed() {
      this.open = false;
    },
    save(form) {
      console.log("llego al save de grupos", form);
      let data = {};
      data.id_competencia = this.item._id;
      data.name_competencia = this.item.name;
      data.category = "CEBA";
      data.sex = this.item.sex;
      data.firts_animal = form.first;
      data.pts_first = this.item.pts_first;
      data.second_animal = form.second;
      data.pts_second = this.item.pts_second;
      data.third_animal = form.third;
      data.pts_third = this.item.pts_third;
      data.type_animal = this.item.type_animal;
      this.$swal.fire({
        title: 'Está seguro de guardar estos resultados?',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: `Sí`,
        customClass: {
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
        }
      }).then((result) => {
         if (result.isConfirmed) {
            axios
              .post("/competitionsEx/saveCeba", data)
              .then((res) => {
                this.$toast.open({
                  message: res.data.message,
                  type: "success",
                  position: "bottom",
                  duration: 5000,
                });

                  let pos = this.data.indexOf(this.item)
                  this.data[pos].status = false;
                
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
      })
      
    },
  },
};
</script>