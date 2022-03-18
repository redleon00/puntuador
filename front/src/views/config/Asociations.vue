<template>
  <v-container>
    <div class="page-header pb-4">
      <h3 class="page-title">
        <strong> {{ title }} </strong>
      </h3>
    </div>
    <v-row>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-col md="4">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                fab
                small
              >
                <v-icon dark> fa fa-plus </v-icon>
              </v-btn>
              </v-col>
            </template>
            
            <v-card>
              <v-card-text>
                <v-card-title>{{ card_title }}</v-card-title>
                <v-container>
                  
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-form>
                      <v-text-field
                        v-model="form.name"
                        label="Siglas"
                        :rules="rules.required"
                        @input="checkName"
                      ></v-text-field>
                      <v-text-field
                        v-model="form.name_large"
                        label="Nombre de la Asociación"
                        :rules="rules.required"
                        @input="checkName"
                      ></v-text-field>
                      </v-form>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"> 
                      <v-checkbox
                        v-model="form.ovino"
                        label="Ovino"
                        class="d-inline"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"> 
                      <v-checkbox
                        v-model="form.caprino"
                        label="Caprino"
                        class="d-inline"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
             
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cerrar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save" :disabled="disabled"> Guardar </v-btn>
              </v-card-actions>
          
            </v-card>
           
          </v-dialog>
       
      <v-col md="4" offset-md="4">
        <input
          class="form-control"
          type="text"
          v-model="search"
          placeholder="Buscar.."
          id="search"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="12">
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
         <template v-slot:[`item.ovino_`]="{ item }">
            <v-icon color="blue" small>
              {{ item.ovino_ }}
            </v-icon>
          </template>
          <template v-slot:[`item.caprino_`]="{ item }">
            <v-icon color="blue" small>
              {{ item.caprino_ }}
            </v-icon>
          </template>
        <template  v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="pr-10"
              @click="editItem(item)"
            >
              fa fa-edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
             fa fa-trash
            </v-icon>
        </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "@/axios";
export default {
  /*components: {
    DataTable: () => import("../../components/DataTable"),
  },*/
  data() {
    return {
      server: process.env.API_URL || 'http://localhost:3000',
      rules: {
        required: [(v) => !!v || "Campo requerido"],
      },
      name:'',
      dialog:false,
      title: "Asociaciones Participantes",
      isLoading: false,
      page: 1,
      type: 0,
      pageCount: 0,
      data: [],
      search: "",
      disabled: true,
      editedIndex: -1,
      form:{
        name: '',
        name_large: '',
        ovino: false,
        caprino: false
      },
      headers: [
        {
          text: "Asociación",
          align: "start",
          sortable: false,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Ovinos",
          align: "center",
          sortable: true,
          value: "ovino_",
          class: "thead-light",
        },
        {
          text: "Caprinos",
          align: "center",
          sortable: true,
          value: "caprino_",
          class: "thead-light",
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "actions",
          class: "thead-light",
        },
      ],
    };
  },
  computed: {
      card_title () {
        return this.editedIndex === -1 ? 'Nueva Asociación' : 'Editar Asociación'
      },
    },
  created() {
    this.getAsoc();
  },
  
  methods: {
    getAsoc() {
      axios
        .get("asociations")
        .then((res) => {
          console.log(res)
          this.data = res.data.map(function (x) {
            x.ovino_ = (x.ovino == true) ? "fa fa-check" : "";
            x.caprino_ = (x.caprino == true) ? "fa fa-check" : "";
            return x;
          });

        })
        .catch((err) => {
          console.error(err);
        });
    },
    close () {
        this.form.name = ''
        this.dialog = false
        this.editedIndex = -1
       
      },
    editItem(item){
      console.log(item)
      this.disabled = false
      this.editedIndex = this.data.indexOf(item)
      this.dialog = true
      this.form.name = item.name
      this.form.name_large = item.name_large
      this.form.ovino = item.ovino
      this.form.caprino = item.caprino

    },
      checkName(val){
        this.disabled = (val.length > 0) ? false : true
        
      },
      deleteItem (item) {
        
        let pos = this.data.indexOf(item)
        axios
          .post(`/asociations/deleted/${item._id}`)
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
      updateItem(item){
        let pos = this.data.indexOf(item)
        axios
          .put(`/asociations/update/${item._id}`, this.form)
          .then(res => {
              this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 5000,
            });
            
            item.name = this.data[pos].name = this.form.name.toUpperCase()
            item.name_large = this.data[pos].tipo = this.form.tp
            item.ovino_ = this.data[pos].ovino_ = (this.form.ovino == true) ? "fa fa-check" : ""
            item.caprino_ = this.data[pos].caprino_ =(this.form.caprino == true) ? "fa fa-check" : ""
            this.form.name = ''
            this.form.name_large = ''
            this.form.ovino == false
            this.form.caprino == false
            this.dialog = false
            this.editedIndex = -1
          })
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
      
    save(){
      if (this.editedIndex > -1) {
        this.updateItem(this.data[this.editedIndex])
      }else{
        axios
        .post(`/asociations/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
           
           this.data.push(res.data.race)
           this.form.name = ''
           this.form.name_large = ''
           this.disabled = true
           this.editedIndex = -1
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

      }
       
    }  
  },
};
</script>