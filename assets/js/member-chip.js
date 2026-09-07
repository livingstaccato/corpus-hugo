// Click a member chip to copy that person's email to the clipboard, with a brief cue.
// Event-delegated so it covers every chip (and any rendered later) with one listener.
(function () {
  function flash(chip) {
    var orig = chip.textContent;
    chip.classList.add("member-chip--copied");
    chip.textContent = "copied ✓";
    setTimeout(function () {
      chip.textContent = orig;
      chip.classList.remove("member-chip--copied");
    }, 1100);
  }
  function copy(text, chip) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flash(chip); }).catch(function () {});
      return;
    }
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flash(chip);
    } catch (e) {}
  }
  document.addEventListener("click", function (ev) {
    var chip = ev.target.closest ? ev.target.closest("button.member-chip[data-email]") : null;
    if (!chip) return;
    ev.preventDefault();
    copy(chip.getAttribute("data-email"), chip);
  });
})();
