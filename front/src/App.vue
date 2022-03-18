<template>
  <div id="app">
      <sidebar-menu :menu="menu" :width="width"/>
      <div class="row justify-content-md-center">
        <div class="col-md-10 offset-md-2">
          <router-view></router-view>
          <v-app><v-main></v-main></v-app>
        </div>    
      </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "@fortawesome/fontawesome-free/css/all.css";
export default {
  components: {
    SidebarMenu,
  },
  props: {
    // Sidebar menu (required)
   
    // Sidebar Collapse state
    collapsed: {
      type: Boolean,
      default: true
    },

    // Sidebar width (expanded)
    width: {
      type: String,
      default: '220px'
    },
    
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Sistema Puntuador V1.0",
          hiddenOnCollapse: true,
        },
        {
          href:  '/' ,
          title: "Inicio",
          icon: "fa fa-home",
        },
        {
          href: "/registros",
          title: "Registros",
          icon: "fa fa-edit",
          child: [
            {
              href: "/animales/index",
              title: "Animales",
              icon: "fa fa-horse",
            },
            {
              href: "/participantes/index",
              title: "Participantes",
              icon: "fa fa-hat-cowboy-side",
            },
            {
              href: "/equipos/index",
              title: "Equipos",
              icon: "fa fa-sitemap",
            },
            {
              href: "/exhibicion/index",
              title: "Equipos Exhibición",
              icon: "fa fa-sitemap",
            },
          ],
        },
        {
          href: "/competencia",
          title: "Competencia",
          icon: "fa fa-trophy",
          child:[
            {
              href:'/competencia/categoria',
              title: 'Por Categorias',
            },
            {
              href:'/competencia/grupo',
              title: 'Por Grupo'
            },
            {
              href:'/competencia/raza',
              title: 'Por Razas'
            },
            {
              href:'/competencia/supremo',
              title: 'Supremo'
            }
            
          ]
        },
        {
          href: "/competenciaEx",
          title: "Exhibición",
          icon: "fa fa-trophy", 
          child:[
            {
              href:'/competenciaEx/raza',
              title: 'Categorias de Exhibición'

            },
            {
              href:'/competenciaEx/ceba',
              title: 'Ovinos de Ceba'
            },
            {
              href:'/competenciaEx/lechera',
              title: 'Cabras Lecheras',
              child:[
                {
                  href:'/competenciaEx/mestizas/category',
                  title: 'Por Categorias'
                },
                {
                  href:'/competenciaEx/mestizas/group',
                  title: 'Por Grupo'
                },
                {
                  href:'/competenciaEx/mestizas/race',
                  title: 'Por Raza'
                }
              ]
            },
            {
              href:'/competenciaEx/ordeno_ubre',
              title:'Ordeño-Mejor Ubre',
              child:[
                {
                  href:'/competenciaEx/ordeno_ubre/mejor_ubre',
                  title:'Mejor Ubre',
                },
                {
              href:"/config/raza",
              title:"Razas",
              icon: "fa fa-sort-amount-up"
            },
            {
                  href:'/competenciaEx/ordeno_ubre/ordeno',
                  title:'Competencia de Ordeño',
                }
              ]
            }
          ]
        },
        {
          href: "/resultados",
          title: "Resultados",
          icon: "fa fa-chart-bar",
          child:[
            {
              href: "/resultados/categoria",
              title: "Categoria",
            
            },
            {
              href: "/resultados/grupo",
              title: "Grupo"
            },
            {
              href: "/resultados/raza",
              title: "Raza"
            },
            {
              href: "/resultados/supremo",
              title: "Supremo"
            },
            {
              href: "/resultados/tablas",
              title: "Tablas"
            }
          ]
        },
        //resultados de exhibicion
        {
          href: "/resultadosEx",
          title: "Resultados de Ex",
          icon: "fa fa-chart-bar",
          child:[
            {
              href: "/resultadosEx/raza",
              title: "Cat. de Exhibición"
            },
            {
              href: "/resultadosEx/ceba",
              title: "Ovinos de Ceba"
            },
            {
              href:'/resultadosEx/lechera',
              title: 'Cabras Lecheras',
              child:[
                {
                  href:'/resultadosEx/mestizas/category',
                  title: 'Por Categorias'
                },
                {
                  href:'/resultadosEx/mestizas/group',
                  title: 'Por Grupo'
                },
                {
                  href:'/resultadosEx/mestizas/race',
                  title: 'Por Raza'
                }
              ]
            },
            {
              href: "/resultadosEx/ubre",
              title: "Mejor Ubre"
            },
            {
              href: "/resultadosEx/ordeno",
              title: "Ordeño"
            },
          ],
        },  
        {
          href: "/config",
          title: "Configuración",
          icon: "fa fa-grip-vertical",
          child:[
            {
              href:"/config/varios",
              title:"Varios",
              icon: "fa fa-sort-amount-up"
            },
            {
              href:"/config/raza",
              title:"Razas",
              icon: "fa fa-sort-amount-up"
            },
            {
              href:"/config/categoria",
              title:"Categorias",
              icon: "fa fa-sort-amount-up"
            },
            {
              href:"/config/bd",
              title:"Reset BD",
              icon: "fa fa-sort-amount-up"
            },
            {
              href:"/config/competitions",
              title:"Crear Competencias",
              icon: "fa fa-sort-amount-up"
            },
            {
              href:"/config/asociations",
              title:"Asociaciones",
              icon: "fa fa-sort-amount-up"
            },{
              href:"/config/raza",
              title:"Razas",
              icon: "fa fa-sort-amount-up"
            },
          ]
        },
      ],
    };
  },
};
</script>

<style>
.v-sidebar-menu {
  height: auto !important;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 42;
}
.v-sidebar-menu .vsm-arrow:after {
  font-family: FontAwesome;
}
.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: FontAwesome;
}
</style>`