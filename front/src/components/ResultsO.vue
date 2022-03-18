<template>
  <v-container>
    <v-dialog v-model="modal" max-width="700px">
      <v-card>
        <v-card-text>
            <v-card-title primary-title class="justify-center">Competencia de Ordeño</v-card-title>
            <v-card-subtitle primary-title class="justify-center">{{ title }}</v-card-subtitle>      
          <v-container>
            <v-row>
            <v-label>Primer Día</v-label>
              <v-col cols="12" sm="12" md="6">
                
                  <v-text-field
                    v-model="item.results_pts.firts_point"
                    label="Primer Ordeño 7 AM"
                    type="number"
                    :rules="rules.numbers"
                  ></v-text-field>
                 </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    v-model="item.results_pts.second_point"
                    label="Segundo Ordeño 7 PM"
                    type="number"
                    :rules="rules.numbers"
                  ></v-text-field>
               </v-col>
             
              <v-col cols="12" sm="<template>6" md="4"> </v-col>
            </v-row>
            <v-row>
                <v-label>Segundo Día</v-label>
               <v-col cols="12" sm="12" md="6">
                
                  <v-text-field
                    v-model="item.results_pts.third_point"
                    label="Primer Ordeño 7 AM"
                    type="number"
                    :rules="rules.numbers"
                  ></v-text-field>
                 </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    v-model="item.results_pts.four_point"
                    label="Segundo Ordeño 7 PM"
                    type="number"
                    :rules="rules.numbers"
                  ></v-text-field>
               </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          
          <v-btn color="red" text @click="close"> Cerrar </v-btn>
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
            server: process.env.API_URL || 'http://localhost:3000',
            rules: {
                required: [(v) => !!v || "Campo requerido"],
                numbers: [value => /^\d*\.?\d*$/.test(value)||'Solo números']    
            },
            nofilter: true,
            animalsComp:[],
            form:{
                first_point:  0,
                second_point: 0,
                third_point: 0,
                four_point:  0
            }
        }
    },
    created(){
        console.log("animales que llegaron", this.item.results_pts.firts_point)
        /*this.form.first_point =  this.item.results_pts.firts_point 
        this.form.second_point = this.item.results_pts.second_point
        this.form.third_point = this.item.results_pts.third_point
        this.form.four_point = this.item.results_pts.four_point*/
    },
    methods:{
        close () {
            //this.form.first = []
            //this.form.second = []
            //this.form.third = []
            this.$emit("closed")
        },
        save(){
            this.form.first_point = this.item.results_pts.firts_point
            this.form.second_point = this.item.results_pts.second_point
            this.form.third_point = this.item.results_pts.third_point
            this.form.four_point = this.item.results_pts.four_point
            this.$emit("saved", this.form)
        }
    }
    

    
}
</script>
