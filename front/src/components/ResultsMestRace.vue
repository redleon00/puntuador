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
          <h1 class="display-3">
            <strong> CAMPEONA MESTÍZAS LECHERAS</strong>
          </h1>
        </div>
        <div class="page-header text-center">
          <h1>
            <strong> RESULTADOS </strong>
          </h1>
          <div class="row align-center">
            <div class="col-12"></div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-4">
            <!--<div v-if="item.firts_animal.name">-->
              <div class="box">
                <div class="our-services settings">
                  <div class="icon">
                    <img
                      :src="require('@/assets/cintaB.png')"
                      height="100%"
                      width="110%"
                    />
                  </div>
                  <h1 class="card-title h2">1er LUGAR</h1>
                  <p class="card-text h3 text-muted">Ejemplar:</p>
                  <p class="card-text h2">
                    <strong>{{ item.firts_animal.name }}</strong>
                  </p>
                  <p class="card-text h6">
                    <strong>Expositor: </strong>{{ item.firts_animal.team }}
                  </p>
                  <p class="card-text h6">
                    <strong>Criador: </strong>{{ item.firts_animal.breeder }}
                  </p>
                </div>
              </div>
            <!--</div>-->
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
  },

  data() {
    return {
      cards: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 12,
        },
        {
          title: "Favorite road trips",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
        },
        {
          title: "Best airlines",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
        },
      ],
    };
  },
  created() {
    console.log("animales que llegaron", this.toggled);
  },
  methods: {
    close() {
      this.$emit("closed");
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins|Ubuntu&display=swap");
.bodys {
  background: rgb(255, 255, 255);
  background-image: url("../assets/portada2.png");
  font-family: "Ubuntu", sans-serif;
  position: absolute;
  -webkit-background-size: cover;
  -moz-background-size: 50%;
  -o-background-size: 50%;
  background-size: 50%;
}

.box {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.our-services {
  margin-top: 75px;
  padding-bottom: 30px;
  padding: 0 60px;
  min-height: 198px;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 25px 0 rgba(20, 27, 202, 0.17);
}

.our-services .icon {
  margin-bottom: -50px;
  transform: translateY(-50%);
  text-align: center;
}

.our-services:hover h4,
.our-services:hover p {
  color: #fff;
}

.speedup:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #fb0054 0%, #f55b2a 100%);
}

.settings {
  box-shadow: 0 0 25px 0 rgba(200, 154, 3, 0.993);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #e4e4e4 0%, #ebcc67 100%);
}

.privacy:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%);
}

.backups:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #fc6a0e 0%, #fdb642 100%);
}

.ssl:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #8d40fb 0%, #5a57fb 100%);
}

.database:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #27b88d 0%, #22dd73 100%);
}
</style>
