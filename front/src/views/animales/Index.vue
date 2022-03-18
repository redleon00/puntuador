<template>
  <div class="container">
    <div class="page-header">
      <h3 class="page-title"><strong> {{ title }} </strong></h3>
      <div class="row align-center">
        <div class="col-12"></div>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-md-2">
       <div data-app>   
        <v-tooltip bottom>
          <!--<template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab small dark v-bind="attrs" v-on="on" :to="link">
              <v-icon dark> fa fa-plus </v-icon>
            </v-btn>
          </template>-->
          <span>Agregar Nuevo</span>
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
          
          no-data-text="Sin datos"
          :search="search"
          :items-per-page="10"
          :page.sync="page"
          hide-default-footer
          @page-count="pageCount = $event"
          class="border"
          id="table"
        >
        <template  v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-4"
              @click="editItem(item)"
            >
              fa fa-edit
            </v-icon>
           
            <v-icon
              small
              class="ml-4"
              @click="deleteItem(item, 1)"
            >
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
        </v-tab-item>
        <!-- caprinos-->
        <v-tab-item>
      <div class="col-md-12">
        <v-data-table
          :headers="headers"
          :items="data2"
          no-data-text="Sin datos"
          :search="search"
          :items-per-page="10"
          :page.sync="page"
          hide-default-footer
          @page-count="pageCount2 = $event"
          class="border"
          id="table"
        >
        <template  v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-4"
              @click="editItem(item)"
            >
              fa fa-edit
            </v-icon>
           
            <v-icon
              small
              class="ml-4"
              @click="deleteItem(item, 2)"
            >
             fa fa-trash
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
import axios from "@/axios"

export default {
  data() {
    return {
      server: process.env.API_URL || 'http://localhost:3000',
      title: "Animales",
      isLoading: false,
      page: 1,
      type: 0,
      pageCount: 0,
      page2: 1,
      pageCount2: 0,
      data: [],
      data1: [],
      data2: [],
      items: ["OVINOS", "CAPRINOS"],
      tab: null,
      search: "",
      link: "/animales/nuevo",
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
          text: "Raza",
          align: "center",
          sortable: true,
          value: "race",
          class: "thead-light",
        },
        {
          text: "Fecha de Nac",
          align: "center",
          sortable: true,
          value: "birthday",
          class: "thead-light",
        },
        {
          text: "Propietario",
          align: "center",
          sortable: true,
          value: "owner",
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
          text: "Asociación",
          align: "center",
          sortable: true,
          value: "asociation",
          class: "thead-light",
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          class: "thead-light",
          value: "actions"
        },
      ],
    };
  },
  created () {
		this.getAnimals();
    
	},
  methods: {
    
    getAnimals(){
      axios.get("animalAll")
			.then(res => {
				this.data = res.data
        console.log(this.data)
        //this.data.map(x => x.birthday = x.birthday.substr(0, 10))
        this.data1 = this.data.filter(x => x.type == 'OVINO' )
        this.data1.map(x => x.birthday = x.birthday.substr(0, 10))
        this.data2 = this.data.filter(x => x.type == 'CAPRINO' )
        this.data2.map(x => x.birthday = x.birthday.substr(0, 10))
        console.log("animales", this.data1)
			})
			.catch(err => {
				console.error(err); 
			})
      
      
    },
    deleteItem (item, data) {
        
        axios
          .post(`/animalAll/deleted/${item._id}`)
          .then( res => {
            this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 5000,
            });
            if(data == 1){
              let pos = this.data1.indexOf(item)
              this.data1.splice(pos, 1)
            }else{
              let pos = this.data2.indexOf(item)
              this.data2.splice(pos, 1)
            }
            
          } )
          .catch((err) => {
            console.error(err);
            this.$toast.open({
              message: "Ups!...ocurrió un error :(",
              type: "error",
              position: "bottom",
              duration: 5000,
            });
          })
        
      },
      editItem (item) {
        this.$router.push({ name: 'EditarAnimal', params: { item: item } })
      }
  },
  
};
</script>