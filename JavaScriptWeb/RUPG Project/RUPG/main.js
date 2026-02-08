import { ApiService } from "./ApiService.js";
import { PageController } from "./pageController.js";

const dom = {
  userImg: document.getElementById("user-img"),
  userName: document.getElementById("user-name"),
  userLoc: document.getElementById("user-loc"),
  friendsList: document.getElementById("friends-list"),
  status: document.getElementById("status"),
  btn: document.getElementById("btn-generate"),
  quote: document.getElementById("quote"),
};

const api = new ApiService();
const controller = new PageController(api, dom);

dom.btn.addEventListener("click", () => controller.generateUsers());
