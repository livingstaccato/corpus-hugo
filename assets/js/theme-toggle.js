(function () {
  var KEY = "kb-theme";
  function apply(t) { document.documentElement.setAttribute("data-theme", t); }
  window.__kbToggleTheme = function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var next = cur === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  };
})();
