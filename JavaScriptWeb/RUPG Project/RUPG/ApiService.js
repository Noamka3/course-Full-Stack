export class ApiService {
  async fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json();
  }

  async getRandomUsers7() {
    const url = "https://randomuser.me/api/?results=7&inc=name,location,picture&noinfo";
    return this.fetchJson(url);
  }


  async getKanyeQuote(){
    const url = "https://api.kanye.rest/";
    return this.fetchJson(url);
  }

  async getPokemonCount() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1";
  return this.fetchJson(url); // יחזיר אובייקט עם count
}

async getPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  return this.fetchJson(url);
}

}
