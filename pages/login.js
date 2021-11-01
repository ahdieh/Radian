import Head from "next/head";
import { Fragment } from "react";
import LoginForm from '../comps/LoginForm';
import RegistrationForm from '../comps/RegistrationForm';
const Login = () => {
  return (
      <Fragment>
      <Head>
        <title>Title Genius | Login</title>
        <meta name="keywords" content="title-genius" />
      </Head>
      {/*<div className="dummy">*/}
      {/*  <h1>DUMMY PAGE</h1>*/}
      {/*  <h1>This is a Login Page</h1>*/}
      {/*</div>*/}
        <LoginForm />;
      </Fragment>
  );
    // return (
    //     <Fragment>
    //         <LoginForm />;
    //     </Fragment>
    // );

};

export default Login;
