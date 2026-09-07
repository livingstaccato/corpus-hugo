(function () {
  "use strict";
  var root = document.querySelector(".ctx-switcher");
  var footer = document.querySelector(".footer-contexts");
  var manifestUrl = root && root.dataset.manifest;
  var currentId = (root && root.dataset.knowledgeId) || "";
  if (!manifestUrl) return; // no hub wiring → standalone site, plain title link

  var current = root && root.querySelector(".ctx-current");
  var menu = root && root.querySelector(".ctx-menu");

  function close() {
    if (!menu) return;
    menu.hidden = true;
    if (current) current.setAttribute("aria-expanded", "false");
  }
  function open() {
    menu.hidden = false;
    current.setAttribute("aria-expanded", "true");
    var sel = menu.querySelector(".ctx-selected a") || menu.querySelector("a");
    if (sel) sel.focus();
  }
  function toggle(e) {
    e.preventDefault();
    if (menu.hidden) { open(); } else { close(); }
  }

  fetch(manifestUrl)
    .then(function (r) { if (!r.ok) throw new Error("manifest " + r.status); return r.json(); })
    .then(function (contexts) {
      if (!Array.isArray(contexts)) return;
      contexts = contexts.filter(function (c) { return c && c.id && c.path; });
      contexts.forEach(function (c) { c.path = c.path.replace(/\/?$/, "/"); });

      // --- footer: list every knowledge base (present on every page) ---
      if (footer && contexts.length) {
        contexts.forEach(function (ctx) {
          var a = document.createElement("a");
          a.href = ctx.path;
          a.textContent = ctx.title || ctx.id;
          if (ctx.id === currentId) a.className = "is-current";
          footer.appendChild(a);
        });
        footer.classList.add("ctx-ready");
      }

      // --- header switcher: only when there are >= 2 contexts and a current id ---
      if (!current || !menu || !currentId || contexts.length < 2) return;
      contexts.forEach(function (ctx) {
        var li = document.createElement("li");
        li.setAttribute("role", "option");
        var a = document.createElement("a");
        a.href = ctx.path;
        a.textContent = ctx.title || ctx.id;
        if (ctx.id === currentId) {
          li.setAttribute("aria-selected", "true");
          li.className = "ctx-selected";
        }
        li.appendChild(a);
        menu.appendChild(li);
      });

      current.addEventListener("click", toggle);
      document.addEventListener("click", function (e) {
        if (!root.contains(e.target)) close();
      });
      // Defer the focus-out close to the next tick and re-check the *settled*
      // active element. A raw focusout during a menu-item mousedown can carry a
      // null relatedTarget, which would otherwise close the menu before the
      // click navigates — making items unclickable.
      root.addEventListener("focusout", function () {
        setTimeout(function () {
          if (!root.contains(document.activeElement)) close();
        }, 0);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { close(); current.focus(); return; }
        if (menu.hidden) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          var links = Array.prototype.slice.call(menu.querySelectorAll("a"));
          if (!links.length) return;
          var idx = links.indexOf(document.activeElement);
          if (e.key === "ArrowDown") { idx = idx < links.length - 1 ? idx + 1 : links.length - 1; }
          else { idx = idx > 0 ? idx - 1 : 0; }
          links[idx].focus();
        }
      });
      root.classList.add("ctx-ready");
    })
    .catch(function () { /* manifest unavailable → leave standalone */ });
})();
