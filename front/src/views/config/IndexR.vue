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
                        label="Raza"
                        :rules="rules.required"
                        @input="checkName"
                      ></v-text-field>
                      <v-radio-group v-model="form.tp" row>
                        <v-radio
                          label="Caprino"
                          value="CAPRINO"
                          color="indigo"
                          class="form-control-sm"
                        ></v-radio>
                        <v-radio
                          label="Ovino"
                          value="OVINO"
                          color="indigo"
                          class="form-control-sm"
                        ></v-radio>
                      </v-radio-group>
                      <v-checkbox
                        v-model="form.clase"
                        label="Exhibición"
                        color="red"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.status"
                        label="Activo"
                        color="red"
                        hide-details
                      ></v-checkbox>
                      </v-form>
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
      title: "Razas Participantes",
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
        tp: 'CAPRINO',
        clase: false,
        status: false
      },
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Tipo",
          align: "start",
          sortable: true,
          value: "tipo",
          class: "thead-light",
        },
        {
          text: "Activo",
          align: "start",
          sortable: true,
          value: "status_l",
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
        return this.editedIndex === -1 ? 'Nueva Raza' : 'Editar Raza'
      },
    },
  created() {
    this.getRaces();
  },
  
  methods: {
    getRaces() {
      axios
        .get("race")
        .then((res) => {
          console.log(res)
          this.data = res.data;
          this.data.map(x => {
              if(x.status == true){
                x.status_l = "Si"
              }else{
                x.status_l = "No"
              }
          } )
        })
        .catch((err) => {
          console.error(err);
        });
    },
    close () {
        this.form.name = ''
        this.form.clase = false
        this.form.status = false
        this.dialog = false
        this.editedIndex = -1
       
      },
    editItem(item){
      this.disabled = false
      this.editedIndex = this.data.indexOf(item)
      this.dialog = true
      this.form.name = item.name
      this.form.clase = item.clase
      this.form.status = item.status
    },
      checkName(val){
        this.disabled = (val.length > 0) ? false : true
        
      },
      deleteItem (item) {
        
        let pos = this.data.indexOf(item)
        axios
          .post(`/race/deleted/${item._id}`)
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
          .put(`/race/update/${item._id}`, this.form)
          .then(res => {
              this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 5000,
            });
            
            this.data[pos].name = this.form.name.toUpperCase()
            this.data[pos].tipo = this.form.tp
            this.data[pos].clase = this.form.clase
            this.data[pos].status_l = (this.form.status == true) ? "Si" : "No" 
            this.data[pos].status = this.form.status
             this.form.name = ''
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
        console.log(this.form)
        axios
        .post(`/race/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
           
           this.data.push(res.data.race)
           this.form.name = ''
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