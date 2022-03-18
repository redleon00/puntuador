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
      <resultsT
        :item="this.item"
        :modal="this.open"
        :title="this.title_card"
        :toggled="this.toggled"
        :data="this.data"
        @closed="closed"
        :head="head"
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
import resultsT from "@/components/ResultsTable.vue"

export default {
  components: {
    resultsT,
  },

  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      title: "Resultados Varios",
      page: 1,
      pageCount: 0,
      page2: 1,
      pageCount2: 0,
      data:[],
      data1: [{name:"Expositores", animal_type:"OVINO", type:"E"},{name:"Criadores",animal_type:"OVINO", type:"C"},{name:"Asociaciones",animal_type:"OVINO", type:"A"}],
      data2: [{name:"Expositores",animal_type:"CAPRINO", type:"E"},{name:"Criadores",animal_type:"CAPRINO", type:"C"},{name:"Asociaciones",animal_type:"CAPRINO", type:"A"}],
      search: "",
      componentKey: 0,
      items: ["OVINOS", "CAPRINOS"],
      tab: null,
      open: false,
      item: {_id:''},
      dataExpoOvi:[],
      dataExpoCapri:[],
      dataCriaOvi:[],
      dataCriaCapri:[],
      dataAsocOvi:[],
      dataAsocCapri:[],
      title_card:'',
      toggled: false,
      head:[],
      headers: [
        {
          text: "Tabla",
          align: "start",
          sortable: false,
          value: "name",
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
       headO: [
        {
          text: "Equipo",
          align: "start",
          sortable: true,
          value: "team",
          class: "thead-light",
        },
        {
          text: "1eros Categoria",
          align: "center",
          sortable: false,
          value: "primero_category",
          class: "thead-light",
        },
        {
          text: "2dos Categoria",
          align: "center",
          sortable: false,
          value: "segundo_category",
          class: "thead-light",
        },
        {
          text: "3eros Categoria",
          align: "center",
          sortable: false,
          value: "tercero_category",
          class: "thead-light",
        },
        {
          text: "Menor",
          align: "center",
          sortable: false,
          value: "menor",
          class: "thead-light",
        },
        {
          text: "Joven",
          align: "center",
          sortable: false,
          value: "joven",
          class: "thead-light",
        },
        {
          text: "Adultos",
          align: "center",
          sortable: false,
          value: "adulto",
          class: "thead-light",
        },
        {
          text: "Raza",
          align: "center",
          sortable: false,
          value: "raza",
          class: "thead-light",
        },
        {
          text: "Reservado",
          align: "center",
          sortable: false,
          value: "reservado",
          class: "thead-light",
        },
        {
          text: "Total",
          align: "center",
          sortable: false,
          value: "total",
          class: "thead-light",
        },
        
        
      ],
       headC: [
        {
          text: "Equipo",
          align: "start",
          sortable: true,
          value: "team",
          class: "thead-light",
        },
        {
          text: "1eros Categoria",
          align: "center",
          sortable: false,
          value: "primero_category",
          class: "thead-light",
        },
        {
          text: "2dos Categoria",
          align: "center",
          sortable: false,
          value: "segundo_category",
          class: "thead-light",
        },
        {
          text: "3eros Categoria",
          align: "center",
          sortable: false,
          value: "tercero_category",
          class: "thead-light",
        },
        {
          text: "Menor",
          align: "center",
          sortable: false,
          value: "menor",
          class: "thead-light",
        },
        {
          text: "Joven",
          align: "center",
          sortable: false,
          value: "joven",
          class: "thead-light",
        },
        {
          text: "Adultos",
          align: "center",
          sortable: false,
          value: "adulto",
          class: "thead-light",
        },
        {
          text: "Raza",
          align: "center",
          sortable: false,
          value: "raza",
          class: "thead-light",
        },
        {
          text: "Reservado",
          align: "center",
          sortable: false,
          value: "reservado",
          class: "thead-light",
        },
        {
          text: "Ubre",
          align: "center",
          sortable: false,
          value: "ubre",
          class: "thead-light",
        },
        {
          text: "Ordeño",
          align: "center",
          sortable: false,
          value: "ordeno",
          class: "thead-light",
        },
        {
          text: "Total",
          align: "center",
          sortable: false,
          value: "total",
          class: "thead-light",
        },
        
        
      ],
     
    };
  },
  created() {
    this.getTableExpo()
    this.getTableCria()
    this.getTableAsoc()
      
  },

  methods: {
      getTableExpo(){
        axios.get("results/resultExpo")  
        .then((res) => { 
          console.log("expos", res.data)
          this.dataExpoOvi = res.data.dataExpoOvi;
          this.dataExpoCapri = res.data.dataExpoCapri;
        })
        .catch((err) => {
          console.error(err);
        });
      },
      getTableCria(){
        axios.get("results/resultCria")  
        .then((res) => { 
          console.log("criacion", res.data)
          this.dataCriaOvi = res.data.dataCriaOvi;
          this.dataCriaOvi.forEach(function(x){
            x.team = x.participant
          })
          this.dataCriaCapri = res.data.dataCriaCapri;
          this.dataCriaCapri.forEach(function(x){
            x.team = x.participant
          })
        })
        .catch((err) => {
          console.error(err);
        });
      },
      getTableAsoc(){
        axios.get("results/resultAsoc")  
        .then((res) => { 
          console.log("res.data", res.data)
          let selectO = res.data.dataAsocOvi
          selectO.forEach(function(x){
            x.team = x.name
          })
          this.dataAsocOvi = selectO

          let selectC = res.data.dataAsocCapri
          selectC.forEach(function(x){
            x.team = x.name
          })
          this.dataAsocCapri = selectC
          console.log("asoc", selectO, selectC)
        })
        .catch((err) => {
          console.error(err);
        });
      },
      viewItem(item) {
        console.log(item, "item")
        if(item.animal_type == "OVINO"){
          this.head = this.headO
          if(item.type == "E"){
            this.data = this.dataExpoOvi
          }else if(item.type == "C"){
            console.log("data cria ovi", this.dataCriaOvi)
            this.data = this.dataCriaOvi
          }else{
            this.data = this.dataAsocOvi
          }
        }else{
          this.head = this.headC
          if(item.type == "E"){
            this.data = this.dataExpoCapri
          }else if(item.type == "C"){
            this.data = this.dataCriaCapri
          }else{
            this.data = this.dataAsocCapri
          }
        }
        //this.data = 
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