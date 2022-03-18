<template>
  <v-container fluid>
    <v-card elevation="23">
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-row>
            <v-col class="h3 font-weight-bold"
              >Editar Participante</v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.name"
                label="Nombre del Participante (Empresa o Persona)"
                class="form-control-sm"
                :rules="rules.required"
                required
              />

            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="form.state"
                label="Estado"
                class="form-control-sm"
                :rules="rules.required"
                required
                :items="states"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-row> 
              <v-checkbox
                v-model="form.owner"
                label="Propietario"
                color="red"
                hide-details
                class="form-control-sm"
              ></v-checkbox>
            
              <v-checkbox
                v-model="form.breeder"
                label="Criador"
                color="red"
                hide-details
                class="form-control-sm"
              ></v-checkbox>
              </v-row> 
            </v-col>
          </v-row>
          <!--<v-row>
            
            <v-col cols="12" md="4">
            <v-select
                v-model="form.asociation"
                label="Asociación"
                class="form-control-sm"
                :rules="rules.required"
                required
                :items="asociations"
              />
            </v-col>
          </v-row>-->
           <v-divider></v-divider>
          <v-spacer></v-spacer><v-spacer></v-spacer>
          <v-card-actions>
          <v-btn text :to="link">
            <v-icon dark> fa fa-arrow-left </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit"> Aceptar </v-btn>
        </v-card-actions>
         
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "@/axios"
export default {
  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      rules: {
        required: [(v) => !!v || "Campo requerido"],
      },
        form: {
            name: "",
            state: "",
            owner: true,
            breeder: true,
            //asociation: ''
        },
        states: ["DISTRITO CAPITAL", "AMAZONAS", "ANZOATEGUI", "APURE", "ARAGUA", "BARINAS",
         "BOLIVAR", "CARABOBO", "COJEDES", "DELTA AMACURO", "FALCON", "GUARICO", "LARA", "MERIDA",
         "MIRANDA", "MONAGAS", "NUEVA ESPARTA", "PORTUGUESA", "SUCRE", "TACHIRA","TRUJILLO", "YARACUY",
         "ZULIA", "LA GUAIRA"],
        //asociations:['AVCO', 'ASOOVINOS', 'ASOCABRA', 'OTRO'],    
        link: "/participantes/index", 
        dataParticipant:[]  ,
        id: '',
        data: []
    };
  },
  created () {
    
      this.dataParticipant = this.$router.history.current.params.item
      this.id =   this.dataParticipant._id
      this.form.name = this.dataParticipant.name
      this.form.state = this.dataParticipant.state
      this.form.owner = (this.dataParticipant.owner.length == 0) ? false : true
      this.form.breeder = (this.dataParticipant.breeder.length == 0) ? false : true
      //this.form.asociation = this.dataParticipant.asociation
  },
  methods: {
    
    submit() {
     
      axios
        .put(`/participant/update/${this.id}`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
           //this.$refs.form.reset()
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
    },
  },
};
</script>