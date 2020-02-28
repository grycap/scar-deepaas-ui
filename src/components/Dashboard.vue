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
        <v-layout
          column
          wrap
          class="my-12"
          align-center
        >
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 class="headline font-weight-black">Please select the files from which you want to obtain the prediction.</h2>
              <!-- <span class="subheading">
                Cras facilisis mi vitae nunc
              </span> -->
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap justify-center class="my-12">
                <v-flex xs6 sm4>                  
                  <v-btn                    
                    color="primary"
                    dark                  
                    depressed                                       
                    @click.native="selectimage()"
                  >
                    <v-icon left>note_add</v-icon>
                    SELECT FILES
                  </v-btn>    
                </v-flex>
                
                <v-flex xs6 sm4 offset-sm3>
                  <v-btn                    
                    color="teal"
                    class="white--text"
                    @click.native="clearall()"
                  >
                    Clear All
                    <v-icon right dark>clear</v-icon>
                  </v-btn>   
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>          
        </v-layout>          
      </section>

      <section>
        <v-flex xs12>
            <div class="text-center">
              <span v-show="errorsfile" style="color: #cc3300; font-size: 12px;"><b>Please, select a file to upload.</b></span>              
            </div>
          </v-flex>
        
        <v-flex xs12 sm6 offset-sm3 v-show="showSelectedFiles"  id="selectedList" class="text-xs-center">
            <!-- <v-flex xs12> -->
            <input type="file" id="files" ref="files" hidden=true multiple v-on:change="handleFilesUpload()"/>
            <v-list subheader dense >
                <v-subheader inset>File</v-subheader>
                <v-list-item
                    v-for="(file, key) in files"
                    :key="key"
                    @click.stop=""
                >                                    
                    <v-progress-circular
                        indeterminate
                        color="teal"
                        v-show="showUploading"
                    >
                    </v-progress-circular>

                    <v-list-item-content>
                        <v-list-item-title>{{file.name}}</v-list-item-title>														
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon ripple @click="removeFile(key)">
                            <v-icon color="red lighten-1">remove_circle_outline</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>                          
                        <!-- </v-flex> -->
        </v-flex>			        
      </section>

       <section>
        <v-layout
          column
          wrap          
          align-center
        >
          <v-flex xs12 sm4 justify-center >
            <div class="text-center">
              <h3 class="headline">Elements for interacting with an AWS S3 bucket</h3>
              <v-divider inset></v-divider>
              <p></p>
              <img src="@/assets/bucket.png"  height= "100" alt="">
              <!-- <v-divider inset></v-divider> -->
              <p></p>
              <span class="subheading" style="color:#ff3333; font-size: 15pt">
                Bucket name: {{env.albumBucketName}}
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap justify-center class="my-12">
                <v-btn
                    class="ma-6"                    
                    rounded
                    color="red lighten-2"
                    @click.native="submitFiles()"
                >
                    Upload Files
                    <v-icon right dark>cloud_upload</v-icon>
                    <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                    </template>
                </v-btn>

                <v-btn
                    class="ma-6"
                    :loading="showUploading"
                    :disabled="showUploading"
                    rounded
                    color="red lighten-2"
                    @click.native="listObjs()"
                >
                    List Objects
                    <v-icon right dark>view_list</v-icon>
                    <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                    </template>
                </v-btn>                   
              </v-layout>
            </v-container>
          </v-flex>          
        </v-layout>          
      </section>

    <section>
        <v-flex xs12 sm6 offset-sm3 v-show="showObjectsBuckets"  id="selectedBuckets" class="text-xs-center">                      
              <span  style="color: #cc3300; font-size: 12px;">
                <b>Note: You must update the list of objects until the prediction result appears in the output album.</b>
              </span>              

             <v-list subheader dense >
                <v-subheader inset>Albums</v-subheader>

                  <v-list-group
                    v-for="(album,key) in albums"
                    :key="key"                      
                                      
                    no-action
                    @click.native="fileAlbum(album)"
                > 

                 <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title> 
                          <v-icon color="orange lighten-1 ">folder</v-icon>
                          {{album}}
                        </v-list-item-title>
                    </v-list-item-content>               
                 </template>                   
                
                 <v-list-item
                    v-for="(albumfile,key2) in albumsFiles"
                    :key="key2"                             
                    no-action                   
                > 
                     <v-list-item-avatar>
                        <v-icon color="blue lighten-1 ">insert_drive_file</v-icon>
                    </v-list-item-avatar>                                          

                    <v-list-item-content activator>
                         <v-list-item-title>{{albumfile[0]}}</v-list-item-title>                       											
                    </v-list-item-content>
                    <v-list-item-action>                       
                           <v-btn-toggle multiple>
                            <v-btn icon ripple @click="downloadFile(albumfile[0])">
                                <v-icon color="green lighten-1">cloud_download</v-icon>
                            </v-btn>    
                            <v-btn icon ripple @click="deleteFile(albumfile[0],album)">
                                <v-icon color="red lighten-1">delete_forever</v-icon>
                            </v-btn>
                        </v-btn-toggle>                         
                        
                    </v-list-item-action>
                </v-list-item>                 
                </v-list-group> 
             </v-list>                
        </v-flex>	
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
  
 import AWS from 'aws-sdk'
 import axios from 'axios'
 
//  import env from '../env.js'
  export default {
    data: () => ({
      albumName : '',
      albums: [],
      albumsFiles: [],     
      // bucketRegion: '',
      // IdentityPoolId: '', 
      s3 : new AWS.S3,
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '', 
      showObjectsBuckets: false,    
      selectedFile: null,
      isSelecting: false,
      showUploading: false,
      cognito_idp: '',
      files: [], 
      albumName_in: 'input',
      errorsfile: false
                       
    }),  
    created(){     

      this.cognito_idp = 'cognito-idp.'+this.env.COGNITO.region+'.amazonaws.com/'+this.env.COGNITO.UserPoolId
      var cognitoUser = this.$cognitoAuth.getCurrentUser();
      
      if (cognitoUser != null) {
        var _this = this
        cognitoUser.getSession(function(err, result) {
          if (result) {
            console.log('You are now logged in.');            
            // Add the User's Id Token to the Cognito credentials login map.
              var awsconfig = {}  
              var id_token = JSON.parse(localStorage.getItem("token_id"));
              var provider_url = _this.env.provider_url
              console.log(id_token.token_id)           
              if (id_token){
                  awsconfig[provider_url]=id_token.token_id
              }else {
                awsconfig[_this.cognito_idp] = result.getIdToken().getJwtToken();
              } 
              console.log(awsconfig)
             
              AWS.config.region = 'us-east-1';
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: _this.env.IdentityPoolId,
              Logins: awsconfig
              });      
                            
          }
        })
        AWS.config.getCredentials(function(err){
        // Credentials will be available when this function is called.
            if (err) alert("Error: " + err); 
            else {              
            _this.accessKeyId = AWS.config.credentials.accessKeyId
            _this.secretAccessKey = AWS.config.credentials.secretAccessKey
            _this.sessionToken = AWS.config.credentials.sessionToken            
            }
        });              
      }   

        
    },
    methods: {      
      listObjs() {  
        this.showObjectsBuckets = true      
          var _this = this              
          // AWS.config.credentials = new AWS.Credentials(_this.accessKeyId, _this.secretAccessKey, _this.sessionToken); // Keys returned from STS
           this.s3.config.update({credentials: AWS.config.credentials})            
            this.albums = []
            this.albumsFiles = []
            var params_alb = {
                Bucket: this.env.albumBucketName,
                Delimiter: "/"                 
            };   
            //List name of the album inside the bucket
            this.s3.listObjects(params_alb, function(err, data) {
                if (err) {
                    console.log("There was an error listing your albums: " + err.message);
                    // _this.logout()
                } else {
                    console.log(data)
                    _this.data_album(data)                 
                    }
            });      
        }, 
        data_album(data) {         
            
            for (let i = 0; i < data.CommonPrefixes.length; i++) {       			
                this.albums.push(data.CommonPrefixes[i].Prefix)            
            }           
            console.log(this.albums)            
        },   
        fileAlbum(album){
          // for (let i = 0; i < this.albums.length; i++) { 
                this.albumsFiles = []
                var params = {
                    Bucket: this.env.albumBucketName, /* required */
                    Prefix: album  // Can be your folder name
                };
                var _this = this
                // if (!this.albumsFiles[params.Prefix]){
                //     this.albumsFiles[params.Prefix] = []
                // }
                // console.log(this.albumsFiles)
                this.s3.config.update({credentials: AWS.config.credentials})
                this.s3.listObjects(params, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else  {
                        console.log(data.Contents.length);           // successful response                    
                        // console.log(data.Prefix)                         
                        for (let x = 1; x < data.Contents.length; x++) {
                            // _this.albumsFiles[data.Prefix].push([data.Contents[x].Key])     
                            console.log(data.Contents[x].Key)                 
                            _this.albumsFiles.push([data.Contents[x].Key])                      
                            
                        }    
                        console.log(_this.albumsFiles)        
                    }   

                });             
            // }
            console.log(this.albumsFiles)
          
        },
        deleteFile(key){
            console.log(key)
          
            var _this = this            
            var params = {
                Bucket: this.env.albumBucketName, /* required */
                Delete: {
                    Objects: [{
                        Key : key
                    }]
                }

            }
            this.s3.config.update({credentials: AWS.config.credentials})
            this.s3.deleteObjects(params, function(err, data) {
                if (err) {
                    console.log("There was an error deleting your photo: ", err.message);
                } 
                    console.log(data)
                    alert("Successfully deleted photo.");
                    _this.listObjs();
            });

        }, 
        downloadFile(key){         
            var _this = this          
            var params = {
                Bucket: this.env.albumBucketName,
                Key: key
            }                   
            console.log(key)

            const url = new Promise((resolve, reject) => {
            this.s3.config.update({credentials: AWS.config.credentials})
            this.s3.getSignedUrl('getObject', params, function (err, url) {
              if (err) {
                reject(err)
              }
              console.log(url)
              resolve(url)
              })
            }).then(function(result){
            console.log(result)
            axios({url:result,method:'GET',responseType: 'blob'})
              .then(response => {
                      _this.forceFileDownload(response,key)  
                  })
              .catch(() => console.log('error occured'))
            })
        
          console.log(url.PromiseValue, params.Key)       
            
        },
        forceFileDownload(response,key){
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', key) //or any other extension
            document.body.appendChild(link)
            link.click()
        },
        selectimage(){
            this.isSelecting = true
            this.$refs.files.click()            
        },
        handleFilesUpload () {
            // this.files = []   
            this.errorsfile = false            
            this.isSelecting = false
            let uploadedFiles = this.$refs.files.files			
               
            /*
                Adds the uploaded file to the files array
            */
            for (let i = 0; i < uploadedFiles.length; i++) {
                // uploadedFiles[i]['showUploading'] = false
                this.showUploading = false			
                this.files.push(uploadedFiles[i])
            }		   
            console.log (this.files)	
            console.log(this.files[0].name)	
            console.log(this.files[0].type)
        },
        removeFile (key) {     
            this.files.splice(key, 1)
            this.$refs.files.value = null
        }, 
        submitFiles(){      
          console.log(this.files)
           
            this.errorsfile = false
            if (this.files.length != 0) {
                var _this=this
                for (let i = 0; i < this.files.length; i++) {
                    
                    var file = this.files[i]
                    var fileName = file.name
                    var albumPhotosKey = encodeURIComponent(this.albumName_in) + "/";
                    var photoKey = albumPhotosKey + fileName;

                    // Use S3 ManagedUpload class as it supports multipart uploads
                    var upload = new AWS.S3.ManagedUpload({
                        params: {
                            Bucket: this.env.albumBucketName,
                            Key: photoKey,
                            Body: file,
                            ACL: "public-read"
                        }
                    });
                    var promise = upload.promise();
                    console.log(promise)
                    promise.then(
                        function(data) {   
                          // console.log(data)                   
                          console.log("Successfully uploaded photo."); 
                          _this.listObjs()           
                          _this.files = []              
                        },
                        function(err) {
                        return alert("There was an error uploading your photo: ", err.message);
                        }
                    );
                } 
              alert("Successfully uploaded photo.");         
            }        
            else {
                this.errorsfile = true
                // alert("Please choose a file to upload first.")
                }
        },
        clearall(){
            this.files = []          
            this.showObjectsBuckets = false
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
    computed: {
      showSelectedFiles () {
        return this.files.length > 0
        },
    }
    
}

</script>


