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
          loading-text="...Please wait"
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
              class="mr-2"
              @click="editItem(item)"
            >
              fa fa-edit
            </v-icon>
            <v-spacer></v-spacer>
            <v-icon
              small
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
export default {
  props: {
    data: {
        type: Array,
         default() {
            return []
        }
    },
    title: {
        type: String,
        default: ''
    },
    headers:{
        type: Array,
         default() {
            return []
        }
    },
    link:{
      type: String,
      default: ''
    }
},
  data() {
    return {
      isLoading: false,
      page: 1,
      type: 0,
      pageCount: 0,
      search: "",  
    };
  },
  methods: {
    /* redirect(item){
                window.location = ``
            }*/
  },
};
</script>