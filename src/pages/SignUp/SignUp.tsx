import FormPageContainer from "../../components/FormPageContainer";
import Input from "../../components/Input";
import Title from "../../components/Title";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  return (
    <div className={styles.signUpContainer}>
      <Title title={"PIXEMA"} firstColor={"#7b61ff"} secondColor={"#fff"} />
      <FormPageContainer
        title={"Sign Up"}
        btnTitle={"Sign Up"}
        onSubmit={() => {}}
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
          onChange={() => {}}
          value={""}
        />
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
        <Input
          title={"Confirm Password"}
          placeholder={"Confirm password"}
          onChange={() => {}}
          value={""}
          className={styles.input}
        />
      </FormPageContainer>
    </div>
  );
};
export default SignUp;
