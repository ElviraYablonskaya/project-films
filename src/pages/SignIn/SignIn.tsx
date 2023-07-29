import FormPageContainer from "../../components/FormPageContainer/FormPageContainer";
import Input from "../../components/Input";
import Title from "../../components/Title/Title";
import styles from "./SignIn.module.scss";

const SignIn = () => {
  return (
  <div className={styles.signInContainer}>
    <Title title={"PIXEMA"} firstColor={"#7b61ff"} secondColor={"#fff"} />
    <FormPageContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={() => {}}
      additionalInfo={
        <div className={styles.additionalInfo}>
          {"Don't have an account?"}
          <span className={styles.signIn}>Sign Up</span>
        </div>
      }
    >
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={() => {}}
        value={""}
      />
      <Input
        title={"Password"}
        placeholder={"Your password"}
        onChange={() => {}}
        value={""}
      />
      <div className={styles.forgotPassword}>
        <span>Forgot Password?</span>
      </div>
    </FormPageContainer>
    </div>
  );
};

export default SignIn;
