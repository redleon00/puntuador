<template>
  <v-container>
    <v-dialog
      v-model="modal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="mx-auto bodys">
        <div class="page-header text-center">
         
          <h1 class="display-5 " style="color: white">
            <strong>Tabla de Posiciones de {{item.name+" - "}}{{item.animal_type+"S"}}  </strong>
          </h1>
        
        </div>
        <div class="page-header text-center">
          <h1 style="color: #F0F0F0">
            <strong> RESULTADOS </strong>
          </h1>
          <!--<div class="row align-center">
            <div class="col-12"></div>
          </div>-->
        </div>

        <div class="row justify-content-center" >
          <div class="col-md-10">
             <v-data-table
              :headers="head"
              :items="data"
              loading
              :items-per-page="25"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
              class="border settings"
              id="table"
            >
             </v-data-table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="close"> Cerrar </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
    },
    data: {
      type: Array,
    },
    modal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    toggled: {
      type: Boolean,
    },
    head: {
      type: Array,
    },
   
  },

  data() {
    return {
      page:1,
      pageCount:0,
      
    };
  },
  created() {
    console.log("animales que llegaron", this.head);
  },
  methods: {
    close() {
      this.$emit("closed");
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins|Ubuntu&display=swap');
.bodys {
  background: #4B79A1;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #283E51, #4B79A1);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #283E51, #4B79A1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    font-family: 'Ubuntu', sans-serif;
     position: absolute;
     -webkit-background-size: cover;
 -moz-background-size: 100%;
  -o-background-size: 100%;
  background-size: 100%;  
  
     
}

.box {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px
}

.our-services {
    margin-top: 75px;
    padding-bottom: 30px;
    padding: 0 60px;
    min-height: 198px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
    transition: all .4s ease-in-out;
    box-shadow: 0 0 25px 0 rgba(20, 27, 202, .17)
}

.our-services .icon {
    margin-bottom: -140px;
    transform: translateY(-35%);
    text-align: right;
    margin-left: 300px;
}

.our-services:hover h4,
.our-services:hover p {
    color: #fff
}

.speedup:hover {
    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
    cursor: pointer;
    background-image: linear-gradient(-45deg, #fb0054 0%, #f55b2a 100%)
}

.settings {
    box-shadow: 0 0 25px 0 rgba(200, 154, 3, 0.993);
    cursor: pointer;
    background-image: linear-gradient(-45deg, #ffffff 0%, #f5ef9b 100%)
}

.privacy:hover {
    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
    cursor: pointer;
    background-image: linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)
}

.backups:hover {
    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
    cursor: pointer;
    background-image: linear-gradient(-45deg, #fc6a0e 0%, #fdb642 100%)
}

.ssl:hover {
    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
    cursor: pointer;
    background-image: linear-gradient(-45deg, #8d40fb 0%, #5a57fb 100%)
}

.database:hover {
    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
    cursor: pointer;
    background-image: linear-gradient(-45deg, #27b88d 0%, #22dd73 100%)
}
.first{
    font-size: 50px;
}
</style>

