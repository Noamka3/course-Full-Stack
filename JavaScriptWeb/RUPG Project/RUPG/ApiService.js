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
  const url = "https://pokeapi.co/api/v2/pokemon?limit=0";
  return this.fetchJson(url); 
}

async getRandomPokemon() {
  const { count } = await this.getPokemonCount();

  const offset = Math.floor(Math.random() * count); // 0..count-1
  const listUrl = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${offset}`;

  const listData = await this.fetchJson(listUrl);
  const pokemonUrl = listData.results[0].url; // URL תקין לפוקימון

  return this.fetchJson(pokemonUrl); // מחזיר את הפוקימון המלא
}



// 2 פסקאות שיחזיר בדיוק
async getBaconText(paras = 2) {
  const url = `https://baconipsum.com/api/?type=meat-and-filler&paras=${paras}&format=json`;
  return this.fetchJson(url);
}


}
