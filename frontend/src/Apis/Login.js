import { APIURL } from "../Constants/Api";
export const LoginApi = async (email, password) => {
  try {
    const response = await fetch(APIURL + "/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.text(); // Change response.json() to response.text()
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
