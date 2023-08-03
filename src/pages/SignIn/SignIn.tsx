import { useState } from "react";
import FormPageContainer from "../../components/FormPageContainer/FormPageContainer";
import Input from "../../components/Input";
import Title from "../../components/Title/Title";
import styles from "./SignIn.module.scss";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/reducers/authSlice";
import { Link } from "react-router-dom";
import { RoutesList } from "../Router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    const data = {
      email,
      password,
      token_name: "123",
    };
    dispatch(signInUser({ data, callback: () => console.log("okey") }));
  };

  return (
    <div className={styles.signInContainer}>
      <Title title={"PIXEMA"} firstColor={"#7b61ff"} secondColor={"#fff"} />
      <FormPageContainer
        title={"Sign In"}
        btnTitle={"Sign In"}
        onSubmit={onSubmit}
        additionalInfo={
          <div className={styles.additionalInfo}>
            Don't have an account?
            <Link to={RoutesList.SignUp}>
              <span className={styles.signIn}> Sign Up </span>
            </Link>
          </div>
        }
      >
        <Input
          title={"Email"}
          placeholder={"Your email"}
          onChange={setEmail}
          value={email}
        />
        <Input
          title={"Password"}
          placeholder={"Your password"}
          onChange={setPassword}
          value={password}
        />
        <div className={styles.forgotPassword}>
          <span>Forgot Password?</span>
        </div>
      </FormPageContainer>
    </div>
  );
};

export default SignIn;
