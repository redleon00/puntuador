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
                      <v-form ref="form">
                      <v-text-field
                        v-model="form.name"
                        label="Categoria"
                        :rules="rules.required"
                        @input="checkName"
                      ></v-text-field>
                      </v-form>
                    </v-col>
                    <v-col cols="12" sm="<template>6" md="4"> </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6"> 
                    <v-text-field
                      v-model="form.min"
                      label="Días Minimos" 
                      :rules="rules.numbers"
                      type="number"
                    >  
                    </v-text-field> 
                      
                  </v-col>
                  <v-col cols="12" md="6"> 
                    <v-text-field
                      v-model="form.max"
                      label="Días Máximos" 
                      :rules="rules.numbers"
                      type="number"
                    > 
                    </v-text-field> 
                      
                  </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6"> 
                      <v-select
                      v-model="form.group"
                      label="Grupo"
                      :items="groups"
                      ></v-select>
                    </v-col>
                   
                    <v-col cols="12" md="6"> 
                      <v-checkbox
                      v-model="form.exhibition"
                      label="Exhibición"
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
          :items="categorys"
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
        numbers: [value => /^\d+$/.test(value)||'Solo números']
          
        
      },
      name:'',
      dialog:false,
      title: "Categorias",
      isLoading: false,
      page: 1,
      type: 0,
      pageCount: 0,
      data: [],
      categorys:[],
      search: "",
      disabled: true,
      editedIndex: -1,
      form:{
        name: '',
        category: [],
        min:0,
        max:0,
        exhibition: false,
        group:''
      },
      groups:["MENOR","JOVEN","ADULTO"],
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
          value: "type",
          class: "thead-light",
        },
        {
          text: "Parámetros",
          align: "start",
          sortable: true,
          value: "parameters",
          class: "thead-light",
        },
        {
          text: "Grupo",
          align: "start",
          sortable: true,
          value: "group",
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
        return this.editedIndex === -1 ? 'Nueva Categoria' : 'Editar Categoria'
      },
    },
  created() {
    //this.getSubcategory();
    this.getCategory()
  },
  
  methods: {
   
    getCategory() {
      axios
        .get("category")
        .then((res) => {
          console.log(res.data)  
          this.categorys = res.data.map(function(x) {
                x.type = (x.exhibition == true) ? 'Exhibición' : 'Puntos'
                x.parameters = x.min+" - "+x.max+" días"
                return x
            })
        })
        .catch((err) => {
          console.error(err);
        });
    },
    close () {
        this.form.name = '',
        this.form.min = '',
        this.form.max = '',
        this.dialog = false
        this.editedIndex = -1,
        this.form.exhibition = false
       
      },
    editItem(item){
      this.disabled = false
      this.editedIndex = this.categorys.indexOf(item)
      this.dialog = true
      this.form.name = item.name
      this.form.category = item.category,
      this.form.min = item.min,
      this.form.max = item.max,
      this.form.exhibition = item.exhibition
      this.form.group = item.group


    },
      checkName(val){
        this.disabled = (val.length > 0) ? false : true
        
      },
      deleteItem (item) {
        
        let pos = this.data.indexOf(item)
        axios
          .post(`/category/deleted/${item._id}`)
          .then( res => {
            this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 3000,
            });
            this.categorys.splice(pos, 1)
          } )
          .catch((err) => {
            console.error(err);
            this.$toast.open({
              message: "Ups!...ocurrió un error :(",
              type: "error",
              position: "bottom",
              duration: 3000,
            });
          })
      },
      updateItem(item){
     
        let pos = this.categorys.indexOf(item)
        axios
          .put(`/category/update/${item._id}`, this.form)
          .then(res => {
              this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 3000,
            });
            
            this.categorys[pos].name = this.form.name.toUpperCase()
            this.categorys[pos].type = (this.form.exhibition == true) ? 'Exhibición' : 'Puntos'
            this.categorys[pos].exhibition = this.form.exhibition
            this.categorys[pos].parameters = this.form.min+" - "+this.form.max+" días"
            this.categorys[pos].group = this.form.group
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
              duration: 3000,
            });
          })
      },
      
    save(){
     
      if (this.editedIndex > -1) {
        this.updateItem(this.categorys[this.editedIndex])
      }else{
        axios
        .post(`/category/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
           
           res.data.category.type = (res.data.category.exhibition == true) ? 'Exhibición' : 'Puntos'
           res.data.category.parameters = res.data.category.min+" - "+res.data.category.max+" días"
           console.log(res.data)
           this.categorys.push(res.data.category)
           this.$refs.form.reset()
           this.form.min = 0
           this.form.max = 0
           this.editedIndex = -1
           this.disabled = true
        })
        .catch((err) => {
          console.error(err);
          this.$toast.open({
            message: "Ups!...ocurrió un error :(",
            type: "error",
            position: "bottom",
            duration: 3000,
          });
        });

      }
       
    }  
  },
};
</script>