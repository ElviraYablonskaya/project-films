import { useState } from "react";
import FormPageContainer from "../../components/FormPageContainer";
import Input from "../../components/Input";
import Title from "../../components/Title";
import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/reducers/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    const data = {
      email,
      password,
      password_confirmation: confirmPassword,
      token_name: "123"
    };
    dispatch(signUpUser({ data, callback: () => console.log("okey") }));
  };

  return (
    <div className={styles.signUpContainer}>
      <Title title={"PIXEMA"} firstColor={"#7b61ff"} secondColor={"#fff"} />
      <FormPageContainer
        title={"Sign Up"}
        btnTitle={"Sign Up"}
        onSubmit={onSubmit}
        additionalInfo={
          <div className={styles.additionalInfo}>
            {"Already have an account?"}
            <span className={styles.signIn}>Sign In</span>
          </div>
        }
      >
        <Input
          title={"Name"}
          placeholder={"Your name"}
          onChange={setName}
          value={name}
        />
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
        <Input
          title={"Confirm Password"}
          placeholder={"Confirm password"}
          onChange={setConfirmPassword}
          value={confirmPassword}
          className={styles.input}
        />
      </FormPageContainer>
    </div>
  );
};
export default SignUp;
