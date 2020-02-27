<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="@/assets/icono.png" alt="Vue Material Admin" width="200" height="120">
                  <!-- <h1 class="flex my-4 primary--text">AWS + Machine Learning</h1> -->
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text"
                                v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password"
                                v-model="model.password" v-on:keyup="bindLogin()"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>                
                <v-btn block color="primary" @click.native="login()" :loading="loading">Login</v-btn>
              </v-card-actions>
                <v-btn block color="primary" @click.native="loginwithOpenId()">Login with OpenId</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import jwtDecode from "jwt-decode";
import Oidc from 'oidc-client'
export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    }, 
    token_auth : '',
    token : '',
  
    
  }),
  created(){
    // localStorage.setItem("authenticated", false);    
    document.getElementsByName('token')['0'].content = '';
    localStorage.removeItem('session');
  },

  methods: {
    bindLogin(){
      event.preventDefault();
      if (event.keyCode === 13) {
        this.login()
      } 
    },
    loginwithOpenId(){
      var client_id = 'fdab5b94-5300-4349-8487-2739af274110';
      var client_secret = 'Qf4KJMQKVrapXgtpWKoNE7WchuKr3zq92QHAajoVnRnOWEKoTB4-xYgGcXnk5GD2FC3kuATHLutKGTo6WGlZfA';
      var redirect_uri = window.location.origin + '/callback';
      var url = 
        'https://iam.deep-hybrid-datacloud.eu/authorize'
        + '?response_type=token id_token'
        + '&scope=openid profile'       
        + '&nonce=abc'
        + '&client_id=' + client_id 
        // + '&client_secret=' + client_secret 
        + '&redirect_uri=' + redirect_uri;    
      
      window.location.replace(url)
    },
    login () {     
		this.loading = true
		this.$cognitoAuth.signin(this.model.username, this.model.password, (err, result) => {
			console.log(result)
			if (err) {
				console.log(err)
				// this.processing = false;
				// this.error = true;
				// this.error_message_text = err.message;
			} else {
				// $(".users-dropdown").text(this.model.username);
				localStorage.setItem("session",JSON.stringify({ user: { username: this.model.username } }));
				this.$cognitoAuth.getIdToken((err, jwtToken) => {
				if (err) {
				console.log("Dashboard: Couldn't get the session:",err,err.stack);
				return;
			}
					this.token = jwtDecode(jwtToken);
					this.token_auth = jwtToken;
          this.user = this.$cognitoAuth.getCurrentUser();
					document.getElementsByName("token")["0"].content = jwtToken;
      });
        localStorage.setItem("session",JSON.stringify({ user: { username: this.model.username, token: this.token_auth } }));
        this.$router.replace(this.$route.query.redirect || "/settings");
        
				}
		});
    //   if (this.model.username == this.user && this.model.password == this.pass ){
    //     // var _this = this
    //     localStorage.setItem("authenticated", true);
    //     // window.location.href = "/dashboard"
    //     this.$router.push({name: "Dashboard"})        
    //   }else{
    //     this.loading = false
    //      window.getApp.$emit('APP_SHOW_SNACKBAR', { text: "Username or password is incorrect", color: 'error' })
    //   }
    }
  }

}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
