<template>
  <v-container>
    <v-dialog v-model="modal" max-width="700px">
      <v-card>
        <v-card-text>
            <v-card-title primary-title class="justify-center">Competencia de {{item.type_animal}}</v-card-title>
            <v-card-subtitle primary-title class="justify-center">{{ title }}</v-card-subtitle>      
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-form ref="form">
                  <v-combobox
                    v-model="form.first"
                    label="Primer Lugar"
                    :items="animals"
                    item-text="showname"
                    no-data-text="Sin Animales"
                    :no-filter="nofilter"
                    v-if="inputs[0]"
                  ></v-combobox>
                </v-form>
              </v-col>
              <v-col cols="12" sm="<template>6" md="4"> </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-combobox
                    v-model="form.second"
                    label="Segundo Lugar"
                    :items="animals"
                    item-text="showname"
                    no-data-text="No hay data"
                    :no-filter="nofilter"
                    v-if="inputs[1]"
                  ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                    v-model="form.third"
                    label="Tercer Lugar"
                    :items="animals"
                    item-text="showname"
                    no-data-text="No hay data"
                    :no-filter="nofilter"
                    v-if="inputs[2]"
                  ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" text @click="close"> Cerrar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="desert"> Desierto </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="save">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
    props:{
        animals:{
            type: Array,
            default() {
                return []
            }
        },
        item:{
            type: Object,
          
        },
        modal:{
            type: Boolean,
            default: false
        },
        title:{
          type:String
        },
        inputs:{
          type:Array,
          default() {
                return []
            }
        },
    },
    data(){
        return{
            nofilter: true,
            animalsComp:[],
            form:{
                first:[],
                second:[],
                third:[],
                status_result: 'V'

            }
        }
    },
    created(){
        console.log("animales que llegaron", this.animals)
    },
    methods:{
        close () {
            this.form.first = []
            this.form.second = []
            this.form.third = []
            this.$emit("closed")
        },
        save(){
            this.$emit("saved", this.form)
            this.form.first = []
            this.form.second = []
            this.form.third = []
        },
        desert(){
          this.form.status_result = 'D'
          this.$emit("deserted", this.form)
          this.form.first = []
          this.form.second = []
          this.form.third = []
        }
    }
    

    
}
</script>
