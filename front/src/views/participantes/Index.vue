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
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab small dark v-bind="attrs" v-on="on" :to="link">
              <v-icon dark> fa fa-plus </v-icon>
            </v-btn>
          </template>
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
      <div class="col-md-12">
        <v-data-table
          :headers="headers"
          :items="data"
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
        <template v-slot:[`item.owner`]="{ item }">
          <v-icon
            color="blue"
            small
          >
          {{ item.owner }}
          </v-icon>
        
        </template>
        <template v-slot:[`item.breeder`]="{ item }">
          <v-icon
            color="blue"
            small
          >
          {{ item.breeder }}
          </v-icon>
        
        </template>
        <template  v-slot:[`item.actions`]="{ item }">             
            <v-icon
              small
              class="mr-4"
              @click="editItem(item)"
              color="red"
            >
              fa fa-edit
            </v-icon>   
            <v-icon
              small
              class="ml-4"
              @click="deleteItem(item)"
            >
             fa fa-trash
            </v-icon>
            
        </template>
        </v-data-table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>
  </div>
  
</template>
<script>
import axios from "@/axios"
export default {
    /*components: {
        DataTable: () => import("../../components/DataTable")
    },*/
  data() {
    return {
      title: "Participantes",
      isLoading: false,
      page: 1,
      type: 0,
      pageCount: 0,
      data: [],
      search: "",
      link:"/participantes/nuevo",
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Estado",
          align: "center",
          sortable: false,
          value: "state",
          class: "thead-light",
        },
        {
          text: "Expositor",
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
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "actions",
          class: "thead-light",
        },

      ],
    };
  },
  created () {
		this.getParticipants();
	},
  methods: {
    getParticipants(){
      axios.get("participant")
			.then(res => {
				this.data = res.data
        console.log(this.data)
         this.data = res.data.map(function(x) {
                x.owner = (x.owner == true) ? 'fa fa-check' : ''
                x.breeder = (x.breeder == true) ? 'fa fa-check' : ''
                return x
            })
			})
			.catch(err => {
				console.error(err); 
			})

    },
    deleteItem (item) {
        let pos = this.data.indexOf(item)
        axios
          .post(`/participant/deleted/${item._id}`)
          .then( res => {
            this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 5000,
            });
            this.data.splice(pos, 1)
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
        this.$router.push({ name: 'EditarParticipante', params: { item: item } })
      },
      addAnimal(item){
        console.log(item)
      }
}
}
</script>