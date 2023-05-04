const BASE_URL = 'http://localhost:3030';

export const commonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}

export const fetchReq = async (url, parameters={}) => {
  try {
    let response = await fetch(`${BASE_URL}/${url}`, parameters);
    let ans = await response.json();
    return ans;
  } catch (error) {
    console.log(error);
  }
}
