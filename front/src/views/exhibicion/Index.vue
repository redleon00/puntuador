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
    <div class="row justify-content-between">
      <div class="col-md-2">
        <div data-app>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                small
                dark
                v-bind="attrs"
                v-on="on"
                :to="link"
              >
                <v-icon dark> fa fa-plus </v-icon>
              </v-btn>
            </template>
            <span>Agregar Nuevo</span>
          </v-tooltip>
        </div>
      </div>
      <div class="col-md-4">
        <input
          class="form-control"
          type="text"
          v-model="search"
          placeholder="Buscar.."
          id="search"
        />
      </div>
    </div>
    <div class="row">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item" @click="ir(item)">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- Para Ovinos -->
        <v-tab-item>
          <div class="col-md-12">
            <v-data-table
              :headers="headers"
              :items="data1"
              :search="search"
              :items-per-page="10"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
              class="border"
              id="table"
              no-data-text="Sin datos"
            >
              <template v-slot:[`all_teams.owner`]="{ item }">
                {{ item.all_teams.owner }}
              </template>
              <template v-slot:[`item.owner`]="{ item }">
                <v-icon color="blue" small>
                  {{ item.owner }}
                </v-icon>
              </template>
              <template v-slot:[`item.breeder`]="{ item }">
                <v-icon color="blue" small>
                  {{ item.breeder }}
                </v-icon>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-4" @click="editItem(item)" color="red">
                  fa fa-edit
                </v-icon>
                <v-icon small class="ml-4" @click="deleteItem(item, 1)">
                  fa fa-trash
                </v-icon>
              </template>
            </v-data-table>
            <div class="row">
              <div class="col">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </div>
          </div>
        </v-tab-item>
        <!-- Para Caprinos -->
        <v-tab-item>
          <div class="col-md-12">
            <v-data-table
              :headers="headers"
              :items="data2"
              :search="search"
              :items-per-page="10"
              :page.sync="page2"
              hide-default-footer
              @page-count="pageCount2 = $event"
              class="border"
              id="table"
              no-data-text="Sin datos"
            >
              <template v-slot:[`all_teams.owner`]="{ item }">
                {{ item.all_teams.owner }}
              </template>
              <template v-slot:[`item.owner`]="{ item }">
                <v-icon color="blue" small>
                  {{ item.owner }}
                </v-icon>
              </template>
              <template v-slot:[`item.breeder`]="{ item }">
                <v-icon color="blue" small>
                  {{ item.breeder }}
                </v-icon>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-4" @click="editItem(item)" color="red">
                  fa fa-edit
                </v-icon>
                <v-icon small class="ml-4" @click="deleteItem(item, 2)">
                  fa fa-trash
                </v-icon>
              </template>
            </v-data-table>
            <div class="row">
            <div class="col">
              <v-pagination v-model="page2" :length="pageCount2"></v-pagination>
            </div>
          </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
export default {
  data() {
    return {
      title: "Equipos de Exhibición",
      isLoading: false,
      page: 1,
      pageCount: 0,
      type: 0,
      page2: 1,
      pageCount2: 0,
      data: [],
      search: "",
      link: "/exhibicion/nuevo",
      items: ["OVINOS", "CAPRINOS"],
      tab: null,
      data1: [],
      data2: [],
      headers: [
        {
          text: "Participante",
          align: "start",
          sortable: true,
          value: "participant",
          class: "thead-light",
        },
        {
          text: "Nombre del Equipo",
          align: "center",
          sortable: true,
          value: "name",
          class: "thead-light",
        },
        {
          text: "Especie",
          align: "center",
          sortable: true,
          value: "type",
          class: "thead-light",
        },
        {
          text: "Numero de Ejemplares",
          align: "center",
          sortable: true,
          value: "all_teams.length",
          class: "thead-light",
        },
        /*{
          text: "Asociación",
          align: "center",
          sortable: true,
          value: "asociacion",
          class: "thead-light",
        },*/
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "actions",
          class: "thead-light",
        },
      ],
    };
  },
  created() {
    this.getTeams();
  },
  methods: {
    getTeams() {
      axios
        .get("teamsEx")
        .then((res) => {
          this.data = res.data;

          this.data1 = res.data.filter((x) => x.type == "OVINO");

          this.data2 = res.data.filter((x) => x.type == "CAPRINO");

          //console.log("data", this.data)
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteItem(item, data) {
      this.$swal
        .fire({
          title: "Está seguro de Eliminar este equipo?",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: `Sí`,
          customClass: {
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            let pos = this.data.indexOf(item);
            axios
              .post(`/teamsEx/deleted/${item._id}`)
              .then((res) => {
                this.$toast.open({
                  message: res.data.message,
                  type: "warning",
                  position: "bottom",
                  duration: 3000,
                });
                if (data == 1) {
                  this.data1.splice(pos, 1);
                } else {
                  this.data2.splice(pos, 1);
                }
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
          } else if (result.isDenied) {
            //algo
          }
        });
    },
    editItem(item) {
      this.$router.push({ name: "EditarEquipoEx", params: { item: item } });
    },
    ir(item) {
      console.log("llego", item);
    },
  },
};
</script>