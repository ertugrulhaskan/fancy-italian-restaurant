// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../assets/spicy.svg":[["spicy.c01b4fda.svg","assets/spicy.svg"],"assets/spicy.svg"],"./../assets/bg-header.jpg":[["bg-header.4787c8b2.jpg","assets/bg-header.jpg"],"assets/bg-header.jpg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  items: [{
    name: "Meat Lasagna",
    description: "Fresh baked lasagna layered with ground beef, ricotta, mozzarella and house made tomato sauce",
    type: "pasta",
    price: 9.99,
    spicy: false,
    menuOrder: 0
  }, {
    name: "Calamari",
    description: "Tender squid rings fried in a light seasoning, served with balsamic mayo dip",
    type: "starters",
    price: 8.5,
    spicy: false,
    menuOrder: 1
  }, {
    name: "Margherita",
    description: "Fresh sliced mozzarella with a special plum tomato sauce and fresh basil",
    type: "pizza",
    price: 15.95,
    spicy: false,
    menuOrder: 1
  }, {
    name: "Baked Manicotti",
    description: "Filled with ricotta cheese and topped with romano, mozzarella and a side of pasta",
    type: "pasta",
    price: 9.99,
    spicy: false,
    menuOrder: 3
  }, {
    name: "Chicken Parmigiana",
    description: "Freshed breaded chicken breast with house made tomato sauce, romano, mozzarella cheese and a side of pasta",
    type: "pasta",
    price: 10.29,
    spicy: false,
    menuOrder: 6
  }, {
    name: "Eggplant Parmigiana",
    description: "Layers of fresh battered eggplant with house made tomato sauce, romano, mozzarella chees and a side of pasta",
    type: "pasta",
    price: 8.99,
    spicy: false,
    menuOrder: 5
  }, {
    name: "Spinach Pizza",
    description: "Garlic pizza with spinach, ricotta and mozzarella",
    type: "pizza",
    price: 16.5,
    spicy: false,
    menuOrder: 2
  }, {
    name: "Grandma's Pizza",
    description: "Sicilian pizza crust with fresh sliced mozzarella, marinara sauce, fresh basil and olive oil",
    type: "pizza",
    price: 19.95,
    spicy: false,
    menuOrder: 3
  }, {
    name: "Soup of the Day",
    description: "Please ask your server",
    type: "starters",
    price: 6.5,
    spicy: false,
    menuOrder: 2
  }, {
    name: "Standard",
    description: "White pizza with fresh sliced mozzarella, prosciutto, white sauce, fresh basil and olive oil",
    type: "pizza",
    price: 19.95,
    spicy: true,
    menuOrder: 0
  }, {
    name: "Baked Ziti",
    description: "With tomato sauce and mozzarella",
    type: "pasta",
    price: 8.99,
    spicy: false,
    menuOrder: 4
  }, {
    name: "Baked Ravioli",
    description: "Filled with ricotta cheese and topped with romano, mozzarella and house made tomato sauce",
    type: "pasta",
    price: 9.99,
    spicy: false,
    menuOrder: 2
  }, {
    name: "Stuffed Shells",
    description: "Filled with ricotta cheese and topped with romano, mozzarella and house made tomato sauce",
    type: "pasta",
    price: 9.99,
    spicy: false,
    menuOrder: 1
  }, {
    name: "Chicken Wing",
    description: "Shaved breaded chicken with a special blend of hot wing sauce and bleu cheese with mozzarella",
    type: "pizza",
    price: 19.95,
    spicy: true,
    menuOrder: 4
  }, {
    name: "Insalata Caprese",
    description: "A classic Italian salada made with freshly sliced mozzarella, beef tomatoes and fresh basil",
    type: "starters",
    price: 6.5,
    spicy: false,
    menuOrder: 0
  }]
};
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _menu = _interopRequireDefault(require("./menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var menuItems = _menu.default.items;
console.log(menuItems);

var Menu = /*#__PURE__*/function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.menu = menuItems;
  }

  _createClass(Menu, [{
    key: "getCategory",
    value: function getCategory(category) {
      return this.menu.filter(function (item) {
        return item.type === category;
      });
    } // TODO: Create a category function
    // getStarters() {
    //   return this.menu.filter((item) => item.type === "starters");
    // }
    // getPasta() {
    //   return this.menu.filter((item) => item.type === "pasta");
    // }
    // getPizza() {
    //   return this.menu.filter((item) => item.type === "pizza");
    // }

  }, {
    key: "toggle",
    value: function toggle(isChecked, category) {
      var $selector = document.querySelector("#".concat(category));
      var $listItem = $selector.querySelectorAll("article");

      if (!isChecked) {
        $listItem.forEach(function (item) {
          var isSpicy = item.dataset.spicy;
          isSpicy === "true" && item.classList.add("hidden");
        });
      } else {
        $listItem.forEach(function (item) {
          item.classList.remove("hidden");
        });
      }
    }
  }, {
    key: "templateMenuItem",
    value: function templateMenuItem(_ref) {
      var name = _ref.name,
          description = _ref.description,
          price = _ref.price,
          spicy = _ref.spicy;
      var article = document.createElement("article");
      article.classList.add("menu-item");
      var h3 = document.createElement("h3");
      h3.textContent = "".concat(name);
      var p = document.createElement("p");
      p.textContent = description;
      var div = document.createElement("div");
      div.classList.add("menu-body");
      div.append(h3, p);
      var button = document.createElement("button");
      button.classList.add("primary");
      button.textContent = "$".concat(price.toFixed(2));
      article.append(div, button);

      if (spicy) {
        var divSpicy = document.createElement("div");
        divSpicy.classList.add("spicy");
        h3.append(divSpicy);
      }

      article.setAttribute("data-spicy", spicy);
      return article;
    }
  }, {
    key: "render",
    value: function render(category) {
      var _this = this;

      var itemList = this.getCategory(category).sort(function (a, b) {
        return a.menuOrder - b.menuOrder;
      });
      var div = document.createElement("div");
      div.classList.add("menu-container");
      itemList.forEach(function (item) {
        div.append(_this.templateMenuItem(item));
      });
      return div;
    }
  }]);

  return Menu;
}();

document.addEventListener("DOMContentLoaded", function () {
  // Selectors
  var $starters = document.querySelector("#starters");
  var $pasta = document.querySelector("#pasta");
  var $pizza = document.querySelector("#pizza");
  var menu = new Menu();
  $starters.append(menu.render("starters"));
  $pasta.append(menu.render("pasta"));
  $pizza.append(menu.render("pizza")); // TODO: Add to filter for multiple category

  var $filter = document.querySelector(".filter input[type=checkbox]");
  $filter.addEventListener("change", function (e) {
    var isChecked = e.target.checked;
    var selectedCategory = e.target.closest("section").id;
    menu.toggle(isChecked, selectedCategory);
  });
});
},{"./styles.css":"src/styles.css","./menu":"src/menu.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59656" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map