<template>
  <div class="container">
    <div class="page-header">
      <h3 class="page-title">
        <strong> {{ title }} </strong>
      </h3>
      <div class="row align-center">
        <div class="col-12"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Fecha Límite"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
      </div>
      
    </div>
    <button v-on:click="save">Guardar</button>
  </div>
</template>
<script>
import axios from "@/axios"
export default {
  data() {
    return {
      title: "Configuraciones",
      date: null,//new Date().toISOString().substr(0, 10),
      data: [],
      menu: false,
      form: {
        date_limit: "",
      },
    };
  },
  computed: {
    /*date() {
      return this.data[0].top_date.toISOString().substr(0, 10)
      
    },*/
  },
  mounted(){
    this.getConfigurations()
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
     
  
  save(){
    this.form.date_limit = this.date
    console.log(this.form)
    axios
        .post(`/configurations/register`, this.form)
        .then((res) => {
          this.$toast.open({
            message: res.data.message,
            type: "success",
            position: "bottom",
            duration: 5000,
          });
          //this.$refs.form.reset();
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
  getConfigurations(){
    axios.get("configurations")
			.then(res => {
				this.data = res.data
        this.date = this.data[0].top_date.substr(0, 10)
        console.log(this.data[0].top_date)  
			})
			.catch(err => {
				console.error(err); 
			})
  }
  
  },
};
</script>>
