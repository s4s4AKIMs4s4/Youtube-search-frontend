const API_URL = `https://www.mocky.io/v2/5ba8efb23100007200c2750c/`;

export const get =  () => {    
    return fetch(API_URL, {
        method: "GET",
        mode: "cors",
        cache: "default",
        headers: {
          "Content-Type": "application/json"
        }
  }).then(response => response.json()) ;
}