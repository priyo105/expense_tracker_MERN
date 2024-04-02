import { APIURL } from "../Constants/Api";
export const SignUpApi = async (fullname, email, password) => {
  try {
    const response = await fetch(APIURL + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullname,
        email: email,
        password: password,
      }),
    });

    const result = await response.text(); // Change response.json() to response.text()
    return result;
  } catch (error) {
    console.log(error);
  }
};
