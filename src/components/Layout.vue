<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item >
          <v-list-item-action>
            <v-btn text  @click.native="to_dashboard()">
              <v-icon color="blue lighten-1">dashboard</v-icon>
              Dashboard
            </v-btn> 
          </v-list-item-action>
         
        </v-list-item>
        <v-list-item >
          <v-list-item-action>
            <v-btn text  @click.native="to_settings()">
              <v-icon  color="blue lighten-1">settings</v-icon>
              Settings
            </v-btn>
          </v-list-item-action>          
        </v-list-item>
         <v-list-item >
          <v-list-item-action>
             <v-btn text @click.native="logout()">
              <v-icon color="blue lighten-1">logout</v-icon>
              Log Out
            </v-btn>  
          </v-list-item-action>          
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="blue lighten-5"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Make predictions through AWS with SCAR</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-icon color="red lighten-1">mdi-account-circle</v-icon>
                  {{user}}
    </v-app-bar>
   <v-content>      
      <router-view></router-view>
    </v-content>

    <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Application info</div>
                </v-card-title>
                <v-card-text>
                  This application allows you to load an image to obtain the prediction 
                  of it through a machine learning model available from Amazon Web Services.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Grupo de Grid y Computación de Altas Prestaciones (GRyCAP)
                </v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>(+34) 963877356</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Valencia, Spain</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>grycap@grycap.upv.es</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>            
          </v-layout>
        </v-container>
      </section>

    <v-footer app color="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4">
              <h5>© 2020, <a style="color:#ff9966;" href="https://www.grycap.upv.es">GRyCAP-I3M-UPV</a>, Universitat Politècnica de Valéncia, Spain.</h5>               </div>
          </v-flex>
        </v-layout>
      </v-footer>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode" 
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      user: "",
    }),
    created () {
        var id_token = JSON.parse(localStorage.getItem("token_id"));
       if (id_token){
        var decode = jwtDecode(id_token.token_id)
        this.user = decode.preferred_username
      }else {
        var cognito_token = JSON.parse(localStorage.getItem("session"))
        var current_user = this.$cognitoAuth.getCurrentUser();
        this.user = current_user.username
      } 
    //   this.$vuetify.theme.dark = true
    },
    methods: {
     logout(){        
        this.$router.replace(this.$route.query.redirect || "/logout").catch(err => {
            console.log('You are Log Out!')
            });        
        },
        to_dashboard(){
          this.$router.replace(this.$route.query.redirect || "/dashboard"); 
        },
        to_settings(){
          this.$router.replace(this.$route.query.redirect || "/settings"); 
        }
  }
  }
</script>