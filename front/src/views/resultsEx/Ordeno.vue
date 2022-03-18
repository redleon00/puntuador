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
      <resultsr
        :item="this.results"
        :modal="this.open"
        :title="this.title_card"
        :toggled="this.toggled"
        @closed="closed"
      />
      <div class="col-md-2">
        <div data-app>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                small
                dark
                @click="viewItem"
                :disabled="activate"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> fa fa-eye </v-icon>
              </v-btn>
            </template>
            <span>Ver Resultados</span>
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
      <div class="col-md-12">
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          :items-per-page="10"
          :page.sync="page"
          hide-default-footer
          @page-count="pageCount = $event"
          class="border"
          id="table"
          :key="componentKey"
        >
        </v-data-table>
        <div class="row">
          <div class="col">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import resultsr from "@/components/ResultsOrdeno.vue";

export default {
  components: {
    resultsr,
  },
  data() {
    return {
      server: process.env.API_URL || "http://localhost:3000",
      title: "Resultado de Competencia de Ordeño - Caprino",
      page: 1,
      pageCount: 0,
      data: [],
      search: "",
      tipo: "Categoria",
      componentKey: 0,
      open: false,
      animals: [],
      animalsSelect: [],
      results: [],
      item: { _id: "" },
      title_card: "COMPETENCIA DE ORDEÑO",
      toggled: false,
      headers: [
        {
          text: "Ejemplar",
          align: "start",
          sortable: false,
          value: "animal.showname",
          class: "thead-light",
        },
        {
          text: "Raza",
          align: "center",
          sortable: true,
          value: "animal.race",
          class: "thead-light",
        },
        {
          text: "1er Ordeño",
          align: "center",
          sortable: true,
          value: "firts_point",
          class: "thead-light",
        },
        {
          text: "2do Ordeño",
          align: "center",
          sortable: true,
          value: "second_point",
          class: "thead-light",
        },
        {
          text: "3er Ordeño",
          align: "center",
          sortable: true,
          value: "third_point",
          class: "thead-light",
        },
        {
          text: "4to Ordeño",
          align: "center",
          sortable: true,
          value: "four_point",
          class: "thead-light",
        },
        {
          text: "Total",
          align: "center",
          sortable: true,
          value: "total",
          class: "thead-light",
        },
      ],
    };
  },
  created() {
    this.getResults();
  },

  methods: {
    getResults() {
      axios
        .get("resultsEx/resultOrdeno")
        .then((res) => {
          this.data = res.data.resultsOrdeno;
          this.data.map((x) => x.total = Math.round(x.total * 100) / 100)
          for (let i = 0; i < 3; i++) {
            this.results.push(this.data[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    viewItem() {
      //console.log(item, "item")
      this.item = this.results;
      this.open = true;
      this.toggled = true;
    },
    closed() {
      this.toggled = false;
      this.open = false;
    },
  },
};
</script>