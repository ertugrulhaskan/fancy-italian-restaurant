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

  toggle(isChecked, category) {
    const $selector = document.querySelector(`#${category}`);
    const $listItem = $selector.querySelectorAll("article");
    if (!isChecked) {
      $listItem.forEach((item) => {
        let isSpicy = item.dataset.spicy;
        if (isSpicy === "true") {
          item.classList.add("hidden");
        }
      });
    } else {
      $listItem.forEach((item) => {
        item.classList.remove("hidden");
      });
    }
  }

  templateMenuItem({ name, description, price, spicy }) {
    const article = document.createElement("article");
    article.classList.add("menu-item");
    const h3 = document.createElement("h3");
    h3.textContent = `${name}`;
    const p = document.createElement("p");
    p.textContent = description;
    const div = document.createElement("div");
    div.classList.add("menu-body");
    div.append(h3, p);
    const button = document.createElement("button");
    button.classList.add("primary");
    button.textContent = `$${price.toFixed(2)}`;
    article.append(div, button);

    if (spicy) {
      const divSpicy = document.createElement("div");
      divSpicy.classList.add("spicy");
      h3.append(divSpicy);
    }
    article.setAttribute("data-spicy", spicy);
    return article;
  }

  render(category) {
    let itemList = this.getCategory(category).sort(
      (a, b) => a.menuOrder - b.menuOrder
    );
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

  const menu = new Menu();
  $starters.append(menu.render("starters"));
  $pasta.append(menu.render("pasta"));
  $pizza.append(menu.render("pizza"));

  // TODO: Add to filter for multiple category
  const $filter = document.querySelector(".filter input[type=checkbox]");
  $filter.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const selectedCategory = e.target.closest("section").id;
    menu.toggle(isChecked, selectedCategory);
  });
});
