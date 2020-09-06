<template>    
  <v-container 
  class="fill-height"
  fluid
  >   
     
        <v-row align="center" justify="center">
          <v-col >          
            <v-parallax src="@/assets/fondoazul.jpg" alt="">
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
          </v-col>
        </v-row>
      

     
        <v-row
          align="center"
          justify="center" >
          <v-col>
              <div class="text-center">
                <h3 class="headline font-weight-black">Interacting with AWS Services</h3>
                <p></p>
                <img src="@/assets/lambda.png"  height= "100" alt="">
                <img src="@/assets/bucket.png"  height= "100" alt="">
                <img src="@/assets/batch.png"  height= "100" alt="">
                <p></p>
                <span class="subheading" style="color:#ff3333; font-size: 15pt">
                  Bucket name: {{env.BucketName}}
                </span>            
              </div>
          </v-col>
        </v-row>

		<v-row>
			<v-checkbox
				id="checkbox"
				v-model="checkOption"
				label="AWS"
				color="red"
				value="aws"
				hide-details
			></v-checkbox> 
			<v-checkbox
				id="checkbox"
				v-model="checkOption"
				label="OSCAR"
				color="indigo"
				value="oscar"
				hide-details
			></v-checkbox> 

		</v-row>

        <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="6" >
            <v-card 
            flat 
            class="mx-auto"
            max-width="500"
            >
              <v-card-title  class="justify-center">                 
                    Select a Model
              </v-card-title>

              <v-container fluid>
                  <v-row  
                  align="center"
                  justify="center" >
                    <v-col cols="12" sm="6">                      
                      
                       <v-checkbox
                        id="checkbox"
                        v-model="check"
                        label="Audio Classifier"
                        color="red"
                        value="audio"
                        hide-details
                      ></v-checkbox> 
                       <v-checkbox
                        id="checkbox"
                        v-model="check"
                        label="Body pose detection"
                        color="indigo"
                        value="posenet"
                        hide-details
                      ></v-checkbox> 
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-checkbox
                        id="checkbox"
                        v-model="check"
                        label="Plants species classifier"
                        color="orange"
                        value="plants"
                        hide-details
                      ></v-checkbox> 
                      <v-checkbox
                        id="checkbox"
                        v-model="check"
                        label="Darknet"
                        color="green"
                        value="darknet"
                        hide-details
                      ></v-checkbox> 
                    </v-col>           
                  </v-row>
                </v-container>

                    <v-row v-show="showexample" align="center" justify="center">                  
                      <a style="color:#ff9966;" :href="link" target="_blank">Input example for models</a> 
                    </v-row> 

                    <v-row v-show="showexample" align="center" justify="center">  
                      <a style="color:#ff9966;" :href="link_model" target="_blank">Link to the Model in the Catalog</a>                      
                    </v-row>
            </v-card>            
          </v-col>
          <v-col cols="12" md="6">
               <v-card
                flat 
                class="mx-auto"
                max-width="500" >
                  <v-card-title class="justify-center">Upload Files</v-card-title>
                <v-card-actions class="justify-center">                  
              
              <vue-dropzone type="file" id="dropzone" ref="dropzonefiles" :options="dropzoneOptions" multiple @vdropzone-files-added="handleFilesUpload" @vdropzone-removed-file="removeFile"></vue-dropzone>
                                    
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <v-btn                                       
                    color="primary"
                    dark 
                    small                 
                    depressed                                       
                    @click.native="removeAllFiles()"
                  >
                    <v-icon left>delete_sweep</v-icon>
                    Remove All Files
                  </v-btn> 
                </v-card-actions>
                <v-card-actions class="justify-center">
                   <v-btn                                   
                    small
                    class="white--text"
                    color="red lighten-2"
                    :loading="loadingfiles"
                    :disabled="loadingfiles"
                    @click.native="submitFiles()"
                >
                    <v-icon left >cloud_upload</v-icon>
                    Upload Files
                    
                </v-btn>
                </v-card-actions>
                <div class="text-center">
                  <span v-show="errorsfile" style="color: #cc3300; font-size: 12px;"><b>Please, select a file to upload.</b></span>              
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

          <!-- <v-col cols=12>          

                <v-btn
                    class="ma-6"                    
                    rounded
                    color="red lighten-2"
                    @click.native="listObjs()"
                >
                    List Objects
                    <v-icon right dark>view_list</v-icon>                    
                </v-btn>  

                 <v-btn   
                    class="ma-6"                                          
                    color="teal"                    
                    rounded                    
                    @click.native="clearall()"
                  >
                    Clear All
                    <v-icon right dark>clear</v-icon>
                  </v-btn> 

          </v-col> -->

          <v-row
          align="center"
          justify="center"
          >
            <v-col cols=12>
              <v-card v-show="show_table">
                <v-card-title>
                  <span>Jobs States</span>   
                  <v-spacer></v-spacer>
                  <a style="color:#ff9966;font-size: 10pt" href="https://docs.aws.amazon.com/batch/latest/userguide/job_states.html" target="_blank"> For more information about jobs states</a>
                </v-card-title>
                <v-card-actions>
                  <!-- <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field> -->
                  <v-spacer></v-spacer>             
                  <span style="font-size: 10pt">Last update: {{lastupdate}}</span>         
                  <v-btn icon ripple @click="check_state()">
                    <v-icon>refresh</v-icon>
                  </v-btn>                
                </v-card-actions>     

                <v-data-table 
                  :headers="headers"
                  :items="items"
                  :loading="loading"
                  class="elevation-1"
                  item-key="name"
                  :search="search"
                  :items-per-page="1"
                  hide-default-footer
                  disable-sort
                  v-show="!show_spinner"
                >          
                </v-data-table> 
                <v-row v-show="!show_spinner" justify="center">	
                    <span style="font-size: 15px">Provisioned virtual machines: {{maxvCPUS}}</span>
                </v-row> 
                <v-row v-show="show_spinner" justify="center">	
                    <v-progress-circular
                      :size="50"
                      color="primary"
                      indeterminate
                    ></v-progress-circular>
                </v-row>  
            </v-card>
          </v-col>
        </v-row>


      <v-row
          align="center"
          justify="center"
          >

        <v-col cols="12">
            <div class="text-center">
              <span v-show="show_check_error" style="color: #cc3300; font-size: 12px;"><b>Please, select a model.</b></span>              
            </div>      
          <v-flex xs12 sm6 offset-sm3 v-show="showObjectsBuckets"  id="selectedBuckets" class="text-xs-center"> 
              <v-list subheader dense>
                  <v-subheader inset>Folders in S3 bucket</v-subheader>                                
                  <v-list-item-title> 
                    <v-icon color="orange lighten-1 ">folder</v-icon>
                    {{albums}}
                  </v-list-item-title>

                    <v-list-group                   
                      sub-group
                      v-model="group_in"
                      @click.native="fileAlbumIN()"
                    >
                      
                      <v-list-item-content slot="activator">
                        <v-list-item-title>
                          <v-icon color="orange lighten-1 ">folder</v-icon>
                          Input
                          </v-list-item-title>
                      </v-list-item-content>
                      
            
                      <v-list-item
                        v-for="(albumfile,key2) in albumsFilesIN"
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
                                <v-btn icon ripple @click="deleteFile(albumfile[0])">
                                    <v-icon color="red lighten-1">delete_forever</v-icon>
                                </v-btn>
                            </v-btn-toggle>                         
                        </v-list-item-action>
                      </v-list-item>
                    </v-list-group>   


                    <v-list-group                   
                      sub-group
                    v-model="group_out"
                      @click.native="fileAlbumOUT"                   
                    >
                      <v-list-item-content slot="activator">
                      <v-list-item-title>
                        <v-icon color="orange lighten-1 ">folder</v-icon>
                        Output
                        </v-list-item-title>
                      </v-list-item-content>
            
                      <v-list-item
                        v-for="(albumfile,key2) in albumsFilesOUT"
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
                              <v-btn icon ripple @click="deleteFile(albumfile[0])">
                                  <v-icon color="red lighten-1">delete_forever</v-icon>
                              </v-btn>
                          </v-btn-toggle>                         
                          
                      </v-list-item-action>
                  </v-list-item>
                    </v-list-group>               
              </v-list>
            </v-flex>       
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  
 import AWS from 'aws-sdk'
 import axios from 'axios'
 import jwtDecode from "jwt-decode" 
 import moment from 'moment'
 import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
 
  export default {
    components: {
    vueDropzone: vue2Dropzone
    },    
    
    data: () => ({
      drawer: null,
      albumName : '',
      albums: [],
      albumsFilesIN: [],     
      albumsFilesOUT: [],     
      user: '', 
      model_folder: '',        
      s3 : new AWS.S3,      
      minioClient : '',      
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
      errorsfile: false, 
      show_check_error: false,
      check: "",
      link:"",
      link_model:"",
      showexample:false,
      show_spinner: false,
      headers: [
      { text: 'JOB_NAME', align: 'center',value: 'job' },
      { text: 'PENDING', align: 'center', value: 'pending' },
      { text: 'RUNNABLE',align: 'center', value: 'runnable' },
      { text: 'STARTING',align: 'center', value: 'starting' },
      { text: 'RUNNING', align: 'center',value: 'running' },
      { text: 'FAILED', align: 'center',value: 'failed' },
      { text: 'SUCCEEDED', align: 'center', value: 'succeeded' },      
      ],
      maxvCPUS: "",
      loading: false,
      search: '',
      items: [],
      jobs: {
        job: 'scar-deepaas-audio',

        pending: 0,
        running: 0,
		runnable: 0,
		starting: 0,
        succeeded: 0,
      }, 
      response_lambda: {},
      lastupdate: "",
      show_table: false, 
      loadingfiles: false,
      expand_list: false, 
      group_in : false,
      group_out : false,      
      job_name : '',
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          // maxFilesize: 0.5,          
          addRemoveLinks: true, 
          destroyDropzone: false,
	  },
	  checkOption:''
                       
    }),  
    created(){      
      var Minio = require('minio')
      this.minioClient = new Minio.Client({
          endPoint: this.env.endPoint,    
          port: this.env.port,   
          useSSL: true,
          accessKey: this.env.accessKey,
          secretKey: this.env.secretKey
      })
       this.$vuetify.theme.light = true 
      var current= new Date(document.lastModified);          
      this.lastupdate = moment(current).format("MMMM Do YYYY, h:mm:ss a")

      this.cognito_idp = 'cognito-idp.'+this.env.COGNITO.region+'.amazonaws.com/'+this.env.COGNITO.UserPoolId
      var _this = this
      var awsconfig = {}  
      var id_token = JSON.parse(localStorage.getItem("token_id"));
      var provider_url = _this.env.provider_url      
                    
      if (id_token){
        var decode = jwtDecode(id_token.token_id)
        this.user = decode.preferred_username
        awsconfig[provider_url]=id_token.token_id
        var login_id = provider_url
      }else {
        var cognito_token = JSON.parse(localStorage.getItem("session"))
        awsconfig[_this.cognito_idp] = cognito_token.user.token;
        var current_user = this.$cognitoAuth.getCurrentUser();
        this.user = current_user.username
        login_id = this.cognito_idp
      } 
      AWS.config.region = 'us-east-1';
      
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: _this.env.IdentityPoolId,
        Logins: awsconfig,
        LoginId: login_id
      });      
      
        AWS.config.getCredentials(function(err){
        // Credentials will be available when this function is called.
            if (err) {
              console.log("Error: " + err)
              _this.logout()
              } 
            else {              
            _this.accessKeyId = AWS.config.credentials.accessKeyId
            _this.secretAccessKey = AWS.config.credentials.secretAccessKey
            _this.sessionToken = AWS.config.credentials.sessionToken            
            }
        });              
    },
    watch: {
      "check"(val){        
        if(val != "" ){
          this.showexample = true
          if (val =="audio"){
              this.link = "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav"
              this.link_model = "https://marketplace.deep-hybrid-datacloud.eu/modules/deep-oc-audio-classification-tf.html"
              this.model_folder = "audio"
              this.albums="audio"
              this.job_name = "scar-deepaas-audio"
              this.check_state()
          }else if (val == "posenet"){
              this.link = "https://storage.googleapis.com/tfjs-models/assets/posenet/skiing.jpg"
              this.link_model = "https://marketplace.deep-hybrid-datacloud.eu/modules/deep-oc-posenet-tf.html"
              this.model_folder = "posenet"
              this.albums="posenet"
              this.job_name = "scar-deepaas-posenet"
              this.check_state()
          }else if (val == "plants"){
              this.link = "https://raw.githubusercontent.com/deephdc/plant-classification-theano/master/data/demo-images/image1.jpg"
              this.link_model = "https://marketplace.deep-hybrid-datacloud.eu/modules/deep-oc-plants-classification-tf.html"
              this.model_folder = "plants"
              this.albums="plants"
              this.job_name = "scar-deepaas-plants"
              this.check_state()
          }else if (val == "darknet"){
              this.link = "https://raw.githubusercontent.com/grycap/scar/master/examples/darknet/dog.jpg"
              this.link_model = "https://github.com/grycap/scar/tree/master/examples/darknet"
              this.model_folder = "darknet"
              this.albums="darknet"
              //this.job_name = "scar_deepaas_plants"
              this.show_table = false
          }
          this.show_check_error = false
          this.showObjectsBuckets = true 
          //this.listObjs()          
          

        }
        if(val == null) {
            this.files = []          
            this.showObjectsBuckets = false
            this.show_check_error = false
            this.errorsfile = false
            this.show_table = false
            this.group_in = false
            this.showexample = false
            this.group_out = false              
        }
      }

    },
    methods: {    
		fileAlbumINCallBack(response){
			this.albumsFilesIN = []				  
			this.albumsFilesIN=response
			console.log(this.albumsFilesIN)
		},     
        fileAlbumIN(){         
              
            //List input files                
            this.s3.config.update({credentials: AWS.config.credentials})
            this.albumsFilesIN = []				  
            var params_in = {
                Bucket: this.env.BucketName, /* required */
                Prefix: this.model_folder + "/input/" + this.user + "/"  // Can be your folder name
            };
            var _this = this               
            this.s3.config.update({credentials: AWS.config.credentials})
            // this.s3.listObjects(params_in, function(err, data) {
            //   if (err) {
            //     console.log(err, err.stack); // an error occurred
            //     //   _this.logout()
            //     }
            //     else  {  
            //       _this.albumsFilesIN = []				  
            //         for (let x = 0; x < data.Contents.length; x++) {					  
            //             _this.albumsFilesIN.push([data.Contents[x].Key])       
            //           }   				  
            //     }   
			// });
			console.log(params_in)
			let stream = this.minioClient.listObjects(params_in.Bucket,params_in.Prefix,true)
			var funct=[]
			stream.on('data',function(obj) {
						  
			  	funct.push(obj.name);				  
                  
			})
			stream.on('error',function(err){
				console.log(err); // an error occurred

			})
			stream.on('end', function(e) 
            {       
				_this.fileAlbumINCallBack(funct)
             
            })
			
			
             
        },
        fileAlbumOUT(){
          
          this.s3.config.update({credentials: AWS.config.credentials})
          this.albumsFilesOUT = []
          var _this = this
          //List output files
          var params_out = {
              Bucket: this.env.BucketName, /* required */
              Prefix: this.model_folder + "/output/" + this.user + "/"  // Can be your folder name
          };              
          this.s3.listObjects(params_out, function(err, data) {
              if (err) {
                  console.log(err, err.stack); // an error occurred
                  _this.logout()
                }
              else  {  
                  _this.albumsFilesOUT = []				  
                  for (let x = 0; x < data.Contents.length; x++) {
                      _this.albumsFilesOUT.push([data.Contents[x].Key])                      
                  }    
              }   
          }); 
             

        },
        deleteFile(key){
            var _this = this            
            var params = {
                Bucket: this.env.BucketName, /* required */
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
                    _this.logout() //expire credentials
                } 
                    console.log("Successfully deleted photo.");
                    _this.showObjectsBuckets = true 
                    _this.fileAlbumIN()
                    _this.group_in = true           
                    _this.fileAlbumOUT()
                    _this.group_out = true                
            });

        }, 
        downloadFile(key){         
            var _this = this          
            var params = {
                Bucket: this.env.BucketName,
                Key: key
            }                   
            const url = new Promise((resolve, reject) => {
            this.s3.config.update({credentials: AWS.config.credentials})
            this.s3.getSignedUrl('getObject', params, function (err, url) {
              if (err) {
                reject(err)
              }
              resolve(url)
              })
            }).then(function(result){
            axios({url:result,method:'GET',responseType: 'blob'})
              .then(response => {
                      _this.forceFileDownload(response,key)  
                  })
              .catch(() => 
              _this.logout())
            })
        },
        forceFileDownload(response,key){            
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
            this.files = []
            this.errorsfile = false            
            this.isSelecting = false
            // let uploadedFiles = this.$refs.files.files	
            let uploadedFiles = this.$refs.dropzonefiles.dropzone.files	
            
            /*
                Adds the uploaded file to the files array
            */
            for (let i = 0; i < uploadedFiles.length; i++) {
                this.showUploading = false			
                this.files.push(uploadedFiles[i])
            }		   
        },
        removeFile (file, error, xhr) {     
            this.files.splice(file, 1)
            //this.$refs.files.value = null
        }, 
        removeAllFiles() {
           this.$refs.dropzonefiles.removeAllFiles();
        },
        submitFiles(){  
          if (this.check == "" || this.check == null){      
              this.show_check_error = true
          }else{
            if (this.files.length != 0) {
              this.errorsfile = false
              var _this=this            
              this.loadingfiles = true  
                for (let i = 0; i < this.files.length; i++) {
                    
                    var file = this.files[i]
                    var fileName = file.name
                    var albumPhotosKey = encodeURIComponent(this.albumName_in) + "/";
                    // var photoKey = albumPhotosKey + fileName;
                    var photoKey = this.check + "/input/"+ this.user +"/"+fileName;                    
					console.log(photoKey)
					this.minioClient.presignedPutObject(this.env.BucketName, photoKey, 24*60*60, function(err, presignedUrl) {
					if (err){
						console.log(err)  
					}else{
						fetch(presignedUrl, {
							method: 'PUT',
							body: file
				
						}).then(() => {
						  _this.loadingfiles = false  
                          _this.fileAlbumIN()    
                          _this.group_in = true
                          _this.$refs.dropzonefiles.removeAllFiles();
                          _this.files = []  
						}).catch((e) => {
						 return alert("There was an error uploading your photo: ", err.message);
						});
					} 
					
				})


                    // Use S3 ManagedUpload class as it supports multipart uploads
                    // var upload = new AWS.S3.ManagedUpload({
                    //     params: {
                    //         Bucket: this.env.BucketName,
                    //         Key: photoKey,
                    //         Body: file,
                    //         ACL: "public-read"
                    //     }
                    // });                    
                    // var promise = upload.promise();                    
                    // promise.then(
                    //     function(data) {   
                    //       _this.loadingfiles = false  
                    //       _this.fileAlbumIN()    
                    //       _this.group_in = true
                    //       _this.$refs.dropzonefiles.removeAllFiles();
                    //       _this.files = []     
                    //       // _this.$refs.files.value = null         
                    //     },
                    //     function(err) {
                    //     return alert("There was an error uploading your photo: ", err.message);
                    //     }
                    // );
                } 
              console.log("Successfully uploaded photo.");         
            }        
            else {
                this.errorsfile = true
            }
          }
          
        },
        getTime(){
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date +' '+ time;
          // this.lastupdate = dateTime;
          this.lastupdate = moment(dateTime).format("MMMM Do YYYY, h:mm:ss a")          

        },
        check_state(){
           if (this.check != ""){ 
                var _this = this
                this.show_table = true
				        this.show_spinner = true
                this.getTime()                
                var payload_send = JSON.stringify({'jobQueue':this.job_name})
                var lambda = new AWS.Lambda; 
                var params = {
                  FunctionName: 'scar-deepaas-listjobs', /* required */            
                  InvocationType: 'RequestResponse',                     
                  Payload: payload_send /* Strings will be Base-64 encoded on your behalf */,            
                }
                lambda.config.update({credentials: AWS.config.credentials})        

                lambda.invoke(params, function(err,data){
                  if (err) {
                    console.log(err)
                    _this.logout()
                  }
                  else _this.manage_response_lambda(data) 
                })             
              }else {
                this.show_check_error = true
              }
        },
        manage_response_lambda(data){  
          this.show_spinner = false       
          var json_jobs = JSON.parse(data.Payload)	      
          this.jobs.job = this.check
          this.jobs.pending = json_jobs.PENDING["0"].jobSummaryList.length
          this.jobs.runnable = json_jobs.RUNNABLE["0"].jobSummaryList.length
          this.jobs.starting = json_jobs.STARTING["0"].jobSummaryList.length
          this.jobs.running = json_jobs.RUNNING["0"].jobSummaryList.length
          this.jobs.failed = json_jobs.FAILED["0"].jobSummaryList.length
          this.jobs.succeeded = json_jobs.SUCCEEDED["0"].jobSummaryList.length
          this.items.push(this.jobs)
          this.maxvCPUS = json_jobs.computeEnv

        },       
         logout(){        
            this.$router.replace(this.$route.query.redirect || "/logout");        
        },
       
    },    
    computed: {
      showSelectedFiles () {
        // return this.files.length > 0
        return this.files.length > 0
        },      
    size () {
      const size = {xs:'x-small',sm:'small',lg:'large'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    }
  
    }
}

</script>

<style>
 

</style>

