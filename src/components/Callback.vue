<template>    
  <v-content>    
    <v-card flat tile>
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>         
        <v-toolbar-title>Make predictions through AWS with SCAR</v-toolbar-title>  
        <v-spacer></v-spacer>  
        <v-btn tex small @click.native="to_dashboard()">
          <v-icon color="blue lighten-1">dashboard</v-icon>
          Dashboard
        </v-btn>  
        <v-divider class="mx-4" vertical></v-divider>
        <v-btn tex small @click.native="to_settings()">
          <v-icon color="blue lighten-1">settings</v-icon>
          Settings
        </v-btn> 
        <v-divider class="mx-4" vertical></v-divider>
        <v-btn icon @click.native="logout()">
          <v-icon color="blue lighten-1">logout</v-icon>
        </v-btn>      
      </v-toolbar>
    </v-card>
      <section>
        <v-parallax src="@/assets/fondoazul.jpg" height="500" alt="700">
          <!-- <v-spacer></v-spacer> -->
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >       
            
          <img src="@/assets/fondo1.png" height="100%">            
          </v-layout>
        </v-parallax>
      </section>

      <section>
          <v-layout row wrap justify-center class="my-12">
             
           <v-row justify="center">
               <v-btn tex small @click.native="check()">          
                Check
            </v-btn> 
             <span id="results" style="color:#FF0000"></span>
            </v-row>
               
          </v-layout>
      </section>

     
      
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

      <v-footer color="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4">
              <h5>© 2020, <a style="color:#ff9966;" href="https://www.grycap.upv.es">GRyCAP-I3M-UPV</a>, Universitat Politècnica de Valéncia, Spain.</h5>               </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
</template>

<script> 
 
//  import env from '../env.js'

  export default {
    data: () => ({
        
    }),  
    created(){         
     
    


        
    },
   
    methods: {  
        check(){
            var url = window.location.href;
        console.log(url)

        // Check if there was an error parameter
        var error = url.match('error=([^&]*)')
        if (error) {
            // If so, extract the error description and display it
            var description = url.match('error_description=([^&]*)')
            this.printMessage('Error: ' + error[1] + '<br>Description: ' + description[1] + '</br>');
            return;
        }

        // Extract id token from the id_token parameter
        var match = url.match('id_token=([^&]*)');
        if (match) {
            var id_token = match[1]; // String captured by ([^&]*)

            // Make AWS request using the id token
            if (id_token) {
                this.printMessage(id_token);
                console.log(id_token)
                // makeCognitoRequest(id_token);
                // this.$router.replace(this.$route.query.redirect || "/settings")
            }else{
                this.printMessage('Error: Could not retrieve id token from the URL');
            }
        }else{
            this.printMessage('Error: There was no id token in the URL');
        }
        }, 
        
    printMessage(messageString){
       document.getElementById("results").innerHTML = messageString;
    },
    logout(){        
            this.$router.replace(this.$route.query.redirect || "/logout");        
        },
        to_dashboard(){
          this.$router.replace(this.$route.query.redirect || "/dashboard"); 
        },
        to_settings(){
          this.$router.replace(this.$route.query.redirect || "/callback"); 
        }  
    
}, 
// mounted: function() {
//     var url = window.location.href;
//         console.log(url)

//         // Check if there was an error parameter
//         var error = url.match('error=([^&]*)')
//         if (error) {
//             // If so, extract the error description and display it
//             var description = url.match('error_description=([^&]*)')
//             this.printMessage('Error: ' + error[1] + '<br>Description: ' + description[1] + '</br>');
//             return;
//         }

//         // Extract id token from the id_token parameter
//         var match = url.match('id_token=([^&]*)');
//         if (match) {
//             var id_token = match[1]; // String captured by ([^&]*)

//             // Make AWS request using the id token
//             if (id_token) {
//                 this.printMessage('<span style="color:#000000">Using id token from Salesforce to query DynamoDB . . .</span>');
//                 // makeCognitoRequest(id_token);
//                 this.$router.replace(this.$route.query.redirect || "/settings")
//             }else{
//                 this.printMessage('Error: Could not retrieve id token from the URL');
//             }
//         }else{
//             this.printMessage('Error: There was no id token in the URL');
//         }
// }
}

</script>