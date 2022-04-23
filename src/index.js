import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;

console.log(menuItems);

class Menu {
  constructor() {
    this.menu = menuItems;
  }

  getCategory(category) {
    return this.menu.filter((item) => item.type === category);
  }

  // TODO: Create a category function
  // getStarters() {
  //   return this.menu.filter((item) => item.type === "starters");
  // }
  // getPasta() {
  //   return this.menu.filter((item) => item.type === "pasta");
  // }
  // getPizza() {
  //   return this.menu.filter((item) => item.type === "pizza");
  // }

  templateMenuItem({ name, description, price }) {
    const article = document.createElement("article");
    article.classList.add("menu-item");
    const h3 = document.createElement("h3");
    h3.textContent = name;
    const p = document.createElement("p");
    p.textContent = description;
    const button = document.createElement("button");
    button.textContent = `$${price}`;
    article.append(h3, p, button);
    return article;
  }

  render(category) {
    let itemList = this.getCategory(category);
    const div = document.createElement("div");
    div.classList.add("menu-container");
    itemList.forEach((item) => {
      div.append(this.templateMenuItem(item));
    });
    return div;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Selectors
  const $starters = document.querySelector("#starters");
  const $pasta = document.querySelector("#pasta");
  const $pizza = document.querySelector("#pizza");

  let menu = new Menu();
  $starters.append(menu.render("starters"));
  $pasta.append(menu.render("pasta"));
  $pizza.append(menu.render("pizza"));
});
