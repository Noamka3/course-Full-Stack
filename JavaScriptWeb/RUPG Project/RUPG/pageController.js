export class PageController {
  constructor(api, dom) {
    this.api = api; // להביא נתונים
    this.dom = dom; // לעדכן את html
  }

  renderRandomUsers(data) {
    const users = data.results;
    const main = users[0];
    const friends = users.slice(1); // פה עוד 6

    // Main user
    this.dom.userImg.src = main.picture.large;
    this.dom.userName.textContent = `${main.name.first} ${main.name.last}`;
    this.dom.userLoc.textContent = `${main.location.city}, ${main.location.state}`;

    // Friends
    this.dom.friendsList.innerHTML = "";
    for (const f of friends) {
      const li = document.createElement("li");
      li.textContent = `${f.name.first} ${f.name.last}`;
      this.dom.friendsList.appendChild(li);
    }
  }

  async generateUsers() {
    try {
      this.dom.btn.disabled = true;
      this.dom.btn.textContent = "Loading...";
      this.dom.status.textContent = "";

      const data = await this.api.getRandomUsers7();
      this.renderRandomUsers(data);

      await this.generateQuote();

      this.dom.status.textContent = "✅ Page rendered";
    } catch (err) {
      console.error(err);
      this.dom.status.textContent = `❌ ${err.message}`;
    } finally {
      this.dom.btn.disabled = false;
      this.dom.btn.textContent = "Generate User";
    }
  }

  renderQuote(data) {
    this.dom.quote.textContent = data.quote;
  }
async generateQuote() {
  const data = await this.api.getKanyeQuote();
  this.renderQuote(data);
}


}
