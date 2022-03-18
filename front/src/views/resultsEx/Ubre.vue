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
      <resultsr
        :item="this.item"
        :modal="this.open"
        :title="this.title_card"
        :toggled="this.toggled"
        @closed="closed"
      />
      <div class="col-md-2">
        <div data-app>
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
                <v-icon small class="ml-4" @click="viewItem(item)">
                   fa fa-eye 
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
import resultsr from "@/components/ResultsUbre.vue"

export default {
 components: {
    resultsr,
  },
  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      title: "Resultado de Competencia Mejor Ubre",
      page: 1,
      pageCount: 0,
      data: [],
      search: "",
      tipo: "Categoria",
      componentKey: 0,
      open: false,
      animals: [],
      animalsSelect: [],
      item: {_id:''},
      title_card:'MEJOR UBRE',
      toggled: false,
      headers: [
        {
          text: "Competencia",
          align: "start",
          sortable: false,
          value: "name_competencia",
          class: "thead-light",
        },
        {
          text: "1er Lugar",
          align: "center",
          sortable: true,
          value: "firts_animal.name",
          class: "thead-light",
        },
        {
          text: "Expositor/Criador",
          align: "center",
          sortable: true,
          value: "owners1",
          class: "thead-light",
        },
        
        {
          text: "2do Lugar",
          align: "center",
          sortable: true,
          value: "second_animal.name",
          class: "thead-light",
        },
        {
          text: "Expositor/Criador",
          align: "center",
          sortable: true,
          value: "owners2",
          class: "thead-light",
        },
        {
          text: "3er Lugar",
          align: "center",
          sortable: true,
          value: "third_animal.name",
          class: "thead-light",
        },
        {
          text: "Expositor/Criador",
          align: "center",
          sortable: true,
          value: "owners3",
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
    this.getResults();
   
  },

  methods: {
      getResults(){
          axios
        .get("resultsEx/resultUbre")
        .then((res) => {
         this.data = res.data
          this.data.forEach((x) => {
            x.disabled = false;
            x.owners1 = x.firts_animal.team+"/"+x.firts_animal.breeder
            x.owners2 = (Object.keys(x.second_animal).length === 0) ? '' : x.second_animal.team+"/"+x.second_animal.breeder 
            x.owners3 = (Object.keys(x.third_animal).length === 0) ? '' : x.third_animal.team+"/"+x.third_animal.breeder 
          });
          
        })
        .catch((err) => {
          console.error(err);
        });
      },
      viewItem(item) {
        console.log(item, "item")
        this.item = item;
        this.open = true;
        this.toggled = true
        
      },
       closed() {
         this.toggled = false
         this.open = false;
    },
  }
};
</script>