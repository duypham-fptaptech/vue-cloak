  <template>
    <div class="col-md-12">
      <div class="card card-container">
        <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
        />
        <Form @submit="handleLogin" :validation-schema="schema">
          <div class="form-group">
            <label for="username">Username</label>
            <Field id="username"  name="username" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password" >Password</label>
            <Field id="password" name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
              <span>Login</span>
            </button>
          </div>

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
  </template>

  <script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as yup from "yup";
    import AddRoleService from "@/service/AddRoleService";



    export default {
      name: "admin-login",
      components: {
        Form,
        Field,
        ErrorMessage,
      },
      data() {
        const schema = yup.object().shape({
          username: yup.string().required("Username is required!"),
          password: yup.string().required("Password is required!"),
        });

        return {
          loading: false,
          message: "",
          schema,
        };
      },
      methods: {
        handleLogin(user) {
          AddRoleService.login(user).then(response =>{
            if (response.status >= 200) {
              console.log("check respone JSON: " + JSON.stringify(response));
              this.$router.push("/addRealmRole")
            }
          }).catch(reason =>{
            alert("tài khoản hoặc mật khẩu sai, hãy nhập lại. \n" + reason);
          });

          // this.loading = true;
          // this.$store.dispatch("auth/login", user).then(
          //     () => {
          //       this.$router.push("/addRealmRole");
          //     },
          //     (error) => {
          //       this.loading = false;
          //       this.message =
          //           (error.response &&
          //               error.response.data &&
          //               error.response.data.message) ||
          //           error.message ||
          //           error.toString();
          //     }
          // );
        },
      },
      computed: {
        loggedIn() {
          return this.$store.state.auth.status.loggedIn;
        },
      },
      mounted() {
        if (this.loggedIn) {
          this.$router.push("/addRealmRole");
        }
      },
    };
  </script>

  <style scoped>
    label {
      display: block;
      margin-top: 10px;
    }

    .card-container.card {
      max-width: 350px !important;
      padding: 40px 40px;
    }

    .card {
      background-color: #f7f7f7;
      padding: 20px 25px 30px;
      margin: 0 auto 25px;
      margin-top: 50px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;
      border-radius: 2px;
      -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img-card {
      width: 96px;
      height: 96px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }

    .error-feedback {
      color: red;
    }
  </style>