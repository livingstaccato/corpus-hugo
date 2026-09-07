(function () {
  "use strict";
  var input = document.querySelector("#knowledge-search");
  var results = document.querySelector("#search-results");
  var script = document.currentScript;
  if (!input || !results || !script) return;

  var entries = [];

  function resultLink(item) {
    // ctxPath ends with "/", item.url begins with "/": join without doubling.
    return item.ctxPath.replace(/\/$/, "") + item.url;
  }

  function render(items) {
    results.innerHTML = "";
    if (!input.value.trim()) return;
    if (items.length === 0) {
      results.innerHTML = '<p class="search-empty">No matches.</p>';
      return;
    }
    items.slice(0, 8).forEach(function (item) {
      var link = document.createElement("a");
      link.className = "search-result";
      link.href = resultLink(item);
      link.innerHTML =
        '<span class="search-ctx">' + item.ctxTitle + "</span>" +
        "<strong>" + item.title + "</strong>" +
        "<span>" + item.summary + "</span>" +
        "<small>" + item.kind + " · " + item.source_path + "</small>";
      results.appendChild(link);
    });
  }

  function search(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return entries.filter(function (item) {
      var hay = (item.title + " " + item.summary + " " + item.kind + " " +
                 item.source_path + " " + item.text + " " + item.ctxTitle).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
  }

  function tag(list, ctx) {
    return (Array.isArray(list) ? list : []).map(function (e) {
      e.ctxId = ctx.id; e.ctxTitle = ctx.title || ctx.id; e.ctxPath = ctx.path;
      return e;
    });
  }

  function activate() {
    input.addEventListener("input", function () { render(search(input.value)); });
  }

  function loadSingle() {
    // Fallback: current context only.
    var ctx = { id: script.dataset.knowledgeId || "current", title: document.title, path: prefixFromIndex() };
    return fetch(script.dataset.searchIndex)
      .then(function (r) { if (!r.ok) throw new Error("fetch failed: " + r.status); return r.json(); })
      .then(function (data) { entries = tag(data, ctx); });
  }

  function prefixFromIndex() {
    // Derive this context's path from the search-index URL ("…/search-index.json").
    var u = new URL(script.dataset.searchIndex, window.location.href);
    return u.pathname.replace(/search-index\.json$/, "");
  }

  function loadFederated(contexts, currentId) {
    // A context with global_search:false is excluded from cross-knowledge
    // search — EXCEPT when it is the current site, so it still searches itself.
    var searchable = contexts.filter(function (ctx) {
      return ctx.global_search !== false || ctx.id === currentId;
    });
    return Promise.all(searchable.map(function (ctx) {
      return fetch(ctx.path + "search-index.json")
        .then(function (r) { if (!r.ok) throw new Error("fetch failed: " + r.status); return r.json(); })
        .then(function (data) { return tag(data, ctx); })
        .catch(function () { console.warn("search index unavailable:", ctx.id); return []; });
    })).then(function (lists) {
      entries = lists.reduce(function (a, b) { return a.concat(b); }, []);
    });
  }

  var manifestUrl = script.dataset.manifest;
  var loader = manifestUrl
    ? fetch(manifestUrl).then(function (r) { return r.json(); })
        .then(function (ctxs) {
          if (!Array.isArray(ctxs) || ctxs.length === 0) throw new Error("empty manifest");
          ctxs.forEach(function (c) { if (c && c.path) c.path = c.path.replace(/\/?$/, "/"); });
          return loadFederated(ctxs, script.dataset.knowledgeId);
        }).catch(loadSingle)
    : loadSingle();

  loader.then(activate).catch(function () {
    results.innerHTML = '<p class="search-empty">Search index unavailable.</p>';
  });
})();
