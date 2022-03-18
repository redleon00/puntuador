<template>
  <v-container>
    <div class="page-header">
      <h3 class="page-title">
        <strong> {{ title }} </strong>
      </h3>
      <div class="row align-center">
        <div class="col-12"></div>
      </div>
    </div>
    <v-card>
      <v-card-text>
        <v-card-title> Pulse para crear las Competencias </v-card-title>
        <div class="text-center">
          <v-btn class="ma-2" outlined color="indigo" @click="makeCompe">
            Crear las Competencias
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="text-center">
          <v-btn class="ma-2" outlined color="indigo" @click="makeCompeEx">
            Crear las Competencias de Exhibición
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="text-center">
         <download-excel :data="data1" :fields="headers" worksheet="Animales" name="animales.xls">
          <v-btn class="ma-2" outlined color="indigo"  @click="getAnimals">
            Descargas Data de Animales - Fenotipos
          </v-btn>
        </download-excel>
        </div>
        <v-divider></v-divider>
        <div class="text-center">
         <download-excel :data="data2" :fields="headers" worksheet="Animales" name="animales2.xls">
          <v-btn class="ma-2" outlined color="indigo"  @click="getAnimals2">
            Descargas Data de Animales - Exhibición
          </v-btn>
        </download-excel>
        </div>
        <v-divider></v-divider>
        <div class="text-center">
         
          <v-btn class="ma-2" outlined color="indigo"  @click="genCria">
            Crear tabla de Criadores de Ovinos
          </v-btn>
        
        </div>
         <v-divider></v-divider>
        <div class="text-center">
         <download-excel :data="dataC" :fields="headersC" worksheet="Animales" name="categorias.xls">
          <v-btn class="ma-2" outlined color="indigo"  @click="genRepC">
            Generar Reportes Categorias
          </v-btn>
          </download-excel>
          <download-excel :data="dataG" :fields="headersG"  worksheet="Animales" name="grupos.xls">
          <v-btn class="ma-2" outlined color="indigo"  @click="genRepG">
            Generar Reportes Grupos
          </v-btn>
          </download-excel>
          <download-excel :data="dataR" :fields="headersR" worksheet="Animales" name="razas.xls">
          <v-btn class="ma-2" outlined color="indigo"  @click="genRepR">
            Generar Reportes Razas
          </v-btn>
          </download-excel>
          <download-excel :data="dataS" :fields="headersS" worksheet="Animales" name="supremo.xls">
          <v-btn class="ma-2" outlined color="indigo"  @click="genRepS">
            Generar Reportes Supremo
          </v-btn>
          </download-excel>
        
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "@/axios";
export default {
  data() {
    return {
      title: "Crear Competencias",
      data1:[],
      data2:[],
      dataC:[],
      dataG:[],
      dataR:[],
      dataS:[],
      headers:{
        "Ejemplar":"name",
        "Fecha de Nacimiento":"birthday",
        "Sexo":"sex",
        "Raza":"race",
        "Categoria":"category",
        "Grupo":"group",
        "Dueño":"owner",
        "Criador":"breeder",
        "Equipo":"team",
        "Nro de Registro": "register",
        "Tatuaje": "tatoo",
        "Asociación": "asociation",
        "Última Actualización": "updated_at"

      },
      headersC:{
        "Especimen":"type_animal",
        "Competencia":"name_competencia",
        "Raza":"race",
        "Categoria":"category",
        "Sexo":"sex",
        "Campeón":"firts_animal.name",
        "Fec Nac1":"firts_animal.birthday",
        "Expositor1":"firts_animal.team",
        "Criador1":"firts_animal.breeder",
        "2do Lugar":"second_animal.name",
        "Fec Nac2":"second_animal.birthday",
        "Expositor2":"second_animal.team",
        "Criador2":"second_animal.breeder",
        "3er Lugar":"third_animal.name",
        "Fec Nac3":"third_animal.birthday",
        "Expositor3":"third_animal.team",
        "Criador3":"third_animal.breeder",
      },
      headersG:{
        "Especimen":"type_animal",
        "Competencia":"name_competencia",
        "Raza":"race",
        "Sexo":"sex",
        "Grupo": "group",
        "Campeón":"firts_animal.name",
        "Fec Nac1":"firts_animal.birthday",
        "Expositor1":"firts_animal.team",
        "Criador1":"firts_animal.breeder",
      },
      headersR:{
        "Especimen":"type_animal",
        "Competencia":"name_competencia",
        "Raza":"race",
        "Sexo":"sex",
        "Campeón":"firts_animal.name",
        "Fec Nac1":"firts_animal.birthday",
        "Expositor1":"firts_animal.team",
        "Criador1":"firts_animal.breeder",
        "2do Lugar":"second_animal.name",
        "Fec Nac2":"second_animal.birthday",
        "Expositor2":"second_animal.team",
        "Criador2":"second_animal.breeder",
      },
      headersS:{
        "Especimen":"type_animal",
        "Competencia":"name_competencia",
        "Sexo":"sex",
        "Campeón":"firts_animal.name",
        "Raza":"firts_animal.race",
        "Fec Nac1":"firts_animal.birthday",
        "Expositor1":"firts_animal.team",
        "Criador1":"firts_animal.breeder",
      },
    };
  },
  created(){
    //this.getAnimals();
  },
  methods: {
    getAnimals(){
      axios.get("functions/getAnimalsExcel")
      .then((res) =>{
        console.log(res.data)
        res.data.allAnimals.forEach((x) => { x.birthday = x.birthday.substr(0, 10)})
        this.data1 = res.data.allAnimals
        
      }).catch((err) => {
          console.error(err);
      });
    },
    getAnimals2(){
      axios.get("functions/getAnimalsExcel2")
      .then((res) =>{
        console.log(res.data)
        res.data.allAnimalsEx.forEach((x) => { x.birthday = x.birthday.substr(0, 10)})
        this.data2 = res.data.allAnimalsEx
        
      }).catch((err) => {
          console.error(err);
      });
    },
    makeCompe() {
      axios.get("functions/generate")
      .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
      axios.get("functions/generateGroup")
      .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
      axios.get("functions/generateRace")
      .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .get("functions/generateSupreme")
        .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    makeCompeEx(){
    axios
        .get("functions/generateEx")
        .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    
    axios
        .get("functions/generateExCeba")
        .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    axios
        .get("functions/generateMestizas")
        .then((res) => {
          this.data = res.data;
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    
    axios
      .get("functions/generateGroupMestizas")
      .then((res) => {
        this.data = res.data;
        this.$toast.open({
          message: res.data.message,
          type: "success",
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    
    axios
      .get("functions/generateRaceMestizas")
      .then((res) => {
        this.data = res.data;
        this.$toast.open({
          message: res.data.message,
          type: "success",
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("functions/betterTitsComp")
      .then((res) => {
        this.data = res.data;
        this.$toast.open({
          message: res.data.message,
          type: "success",
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("functions/milkerComp")
      .then((res) => {
        this.data = res.data;
        this.$toast.open({
          message: res.data.message,
          type: "success",
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });

  },
  genCria(){
    axios
      .get("functions/genCria")
      .then((res) => {
        this.data = res.data;
        console.log(res.data)
        this.$toast.open({
          message: res.data.message,
          type: res.data.type,
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  genRepC(){
    axios
      .get("functions/resultCategory")
      .then((res) => {
        this.dataC = res.data.results;
        console.log(res.dataC)
        this.$toast.open({
          message: "Generado",
          type: res.data.type,
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  genRepG(){
    axios
      .get("functions/resultGroup")
      .then((res) => {
        this.dataG = res.data.results;
        console.log(res.dataG)
        this.$toast.open({
          message: "Generado",
          type: res.data.type,
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  genRepR(){
    axios
      .get("functions/resultRace")
      .then((res) => {
        this.dataR = res.data.results;
        console.log(res.data)
        this.$toast.open({
          message: "Generado",
          type: res.data.type,
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  genRepS(){
    axios
      .get("functions/resultSupreme")
      .then((res) => {
        this.dataS = res.data.results;
        console.log(res.dataS)
        this.$toast.open({
          message: "Generado",
          type: res.data.type,
          position: "bottom",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  },
  
  
};
</script>
