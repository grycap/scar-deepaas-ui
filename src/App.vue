<template>
  <v-app>
   <v-content>
      <!-- <dashboard v-if="loggedIn"></dashboard>
      <login v-else></login> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Dashboard from './components/Dashboard';
// import Login from './components/auth/login/Login';
// import jwtDecode from "jwt-decode";
export default {
  name: 'App',

  // components: {
  //   Dashboard,
  //   Login
  // },
  computed: {
      isAuth () {
        return this.loggedIn
      }
  }, 
  data (){
    return {
      loggedIn: false
    }
  },
  created() {
    //  this.$cognitoAuth.getIdToken((err, jwtToken) => {
		// if (err) {
		// 	console.log("Dashboard: Couldn't get the session:", err, err.stack);
		// 	return;
		// }
		// this.token = jwtDecode(jwtToken);		
		// this.user = this.$cognitoAuth.getCurrentUser();
		// document.getElementsByName("token")["0"].content = jwtToken;
		// //console.log(jwtToken)
		// });

    // this.$cognitoAuth.isAuthenticated((err, loggedIn) => { 
    //   if (err) {
    //     console.log("App: Couldn't get the session:", err, err.stack);
		// 		return;
		// 	} 
		// 	this.loggedIn = loggedIn;    
		// 	// this.$eventHub.$emit('check-login',this.loggedIn);
		// });
		// this.$cognitoAuth.onChange = loggedIn => {
    //     this.loggedIn = loggedIn;        
		// // this.$eventHub.$emit('check-login',this.loggedIn);	
		// };			
  },
  mounted() {
		if (typeof localStorage.getItem("session") != "undefined") {
			var session = JSON.parse(localStorage.getItem("session"));
			if (session != null && typeof session.user != "undefined") {
        this.loggedIn = true;
				//console.log(session.user.username);
				// $(".users-dropdown").text(session.user.username);
			}        
    }
    console.log(this.loggedIn)
	}
};
</script>
