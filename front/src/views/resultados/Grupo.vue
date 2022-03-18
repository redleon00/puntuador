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
      <resultsg
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
                <v-icon small class="ml-4" @click="viewItem(item)">
                   {{ !item.desert ? 'fa fa-eye ' : 'Desierta'}}
                </v-icon>
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
              class="border elevation-1"
              id="table"
              :key="componentKey"
              dense
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="ml-4" @click="viewItem(item)">
                   {{ !item.desert ? 'fa fa-eye ' : 'Desierta'}}
                </v-icon>
              </template>
            </v-data-table>
            <div class="row">
              <div class="col">
                <v-pagination v-model="page2" :length="pageCount2"></v-pagination>
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
import resultsg from "@/components/ResultsG.vue"

export default {
 components: {
    resultsg,
  },
  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      title: "Resultados Competencias por Grupos",
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
      item: {_id:''},
      title_card:'',
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
          text: "Campeonato",
          align: "start",
          sortable: false,
          value: "group",
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
          text: "Expositor",
          align: "center",
          sortable: true,
          value: "firts_animal.owner",
          class: "thead-light",
        },
        
        {
          text: "Criador",
          align: "center",
          sortable: true,
          value: "firts_animal.breeder",
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
        .get("results/resultGroup")
        .then((res) => {
          console.log(res.data)
         this.data1 = res.data.filter((x) => x.type_animal == "OVINO");
         this.data1.map(x =>{
           x.desert = (x.firts_animal.length == 0) ? true : false
         })
         
          /*this.data1.forEach((x) => {
            x.disabled = false;
          });*/
          this.data2 = res.data.filter((x) => x.type_animal == "CAPRINO");
          this.data2.map(x =>{
           x.desert = (x.firts_animal.length == 0) ? true : false
         })
        })
        .catch((err) => {
          console.error(err);
        });
      },
      viewItem(item) {
        //console.log(item, "item")
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