
export default class ColiaApi {

  constructor() {
    this.baseUrl = 'https://colia.api.tarefasautomatizadas.com';
  }

  async postData(url = "", data = {}) {
    const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
 }
  
  
  async book(book_name, query) {
    const response = await this.postData(this.baseUrl+'/book', {
      'query': query,
      'book_name': book_name
    })
    return response
  }

}
