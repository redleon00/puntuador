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
                        label="Subcategoria"
                        :rules="rules.required"
                        @input="checkName"
                      ></v-text-field>
                      <v-select
                        v-model="form.category"
                        label="Categoria"
                        :rules="rules.required"
                        :items="categorys"
                      ></v-select>
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
        max:0
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
          text: "Categoria",
          align: "start",
          sortable: true,
          value: "category",
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
        return this.editedIndex === -1 ? 'Nueva Subcategoria' : 'Editar Subcategoria'
      },
    },
  created() {
    this.getSubcategory();
    this.getCategory()
  },
  
  methods: {
    getSubcategory() {
      axios
        .get("subcategory")
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCategory() {
      axios
        .get("category")
        .then((res) => {
          console.log(res.data)  
          //this.categorys = res.data;
          this.categorys = res.data.map(function(x) {
                return x.name
                 
        })
        })
        .catch((err) => {
          console.error(err);
        });
    },
    close () {
        this.form.name = '',
        this.form.category = '',
        this.dialog = false
        this.editedIndex = -1
       
      },
    editItem(item){
      this.disabled = false
      this.editedIndex = this.data.indexOf(item)
      this.dialog = true
      this.form.name = item.name
      this.form.category = item.category,
      this.form.min = item.min,
      this.form.max = item.max


    },
      checkName(val){
        this.disabled = (val.length > 0) ? false : true
        
      },
      deleteItem (item) {
        
        let pos = this.data.indexOf(item)
        axios
          .post(`/subcategory/deleted/${item._id}`)
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
        //this.editedIndex = this.desserts.indexOf(item)
        //this.editedItem = Object.assign({}, item)
        //this.dialogDelete = true
      },
      updateItem(item){
     
        let pos = this.data.indexOf(item)
        axios
          .put(`/subcategory/update/${item._id}`, this.form)
          .then(res => {
              this.$toast.open({
              message: res.data.message,
              type: "warning",
              position: "bottom",
              duration: 5000,
            });
            
            this.data[pos].name = this.form.name.toUpperCase()
            this.data[pos].category = this.form.category
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
        axios
        .post(`/subcategory/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
           console.log(res.data)
           this.data.push(res.data.subcategory)
           this.form.name = ''
           this.form.category = ''
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