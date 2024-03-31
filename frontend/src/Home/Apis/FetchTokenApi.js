import { APIURL } from "../../Constants/Api";

export async function fetchToken(userId) {
  try {
    const response = await fetch(APIURL + "/auth/gettoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
