
export type PayloadWithDataAndCallback<Data> = {
    data: Data;
    callback: () => void;
  };


export type SignUpResponseData = {
  email: string;
  password: string;
  token_name: string;
  password_confirmation: string;
  boostrapData: {
    user: {
      access_token: string;
    };
  };
};

export type SignInResponseData = {
  email: string;
  password: string;
  token_name: string;
  user: {
    access_token: string;
  };
};


export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpResponseData>;

export type SignInUserPayload = PayloadWithDataAndCallback<SignInResponseData>