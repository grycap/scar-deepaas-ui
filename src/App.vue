<template>
  <v-app>
    <layout v-if="loggedIn"></layout>
      <login v-else></login>
  </v-app>
</template>

<script>
import Layout from './components/Layout';
import Login from './components/auth/login/Login';
import jwtDecode from "jwt-decode";
export default {
  name: 'App',

  components: {
    Layout,
    Login
  },
  computed: {
      isAuth () {
        return this.loggedIn
      },
  
    
  }, 
  data (){
    return {
      loggedIn: false
    }
  },
  created() { 
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => { 
      if (err) {
        console.log("App: Couldn't get the session:", err, err.stack);
				return;
			} 
      this.loggedIn = loggedIn;   
			// this.$eventHub.$emit('check-login',this.loggedIn);
    });
    var id_token = JSON.parse(localStorage.getItem("token_id"));
    if (id_token){
      this.loggedIn = true
    }
		this.$cognitoAuth.onChange = loggedIn => {
      this.loggedIn = loggedIn;        
		// this.$eventHub.$emit('check-login',this.loggedIn);	
    };	
  },
  mounted() {
		if (typeof localStorage.getItem("session") != "undefined") {
      var session = JSON.parse(localStorage.getItem("session"));
      var token_id = JSON.parse(localStorage.getItem("token_id"));
			if ((session != null  && typeof session.user != "undefined" ) || token_id != null) {
        this.loggedIn = true;
				//console.log(session.user.username);
				// $(".users-dropdown").text(session.user.username);
			}        
    }else {
      this.loggedIn = false
    }
  },
};
</script>
