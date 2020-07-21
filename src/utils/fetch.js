export async function request({ url, method = "POST", body, authorizationToken, json = true }) {
  if (!url) {
    return Promise.reject(new Error("Url is undefined"));
  }
  let options = {
    headers: {
      "Content-Type": "application/json",
      ...authorizationToken,
    },
  };
  switch (method) {
    case "PUT":
    case "POST":
      options = {
        ...options,
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(body),
      };
      break;
    case "DELETE":
      break;
    case "GET":
    default:
      method = "GET";
      break;
  }
  options.method = method;

  if (json) {
    return fetch(url, options).then((res) => res.json());
  }
  return fetch(url, options).then((res) => res.text());
}
