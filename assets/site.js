(function () {
  var root = document.documentElement;

  // Si la base de Vercel no cargó, se activan los estilos de respaldo.
  var token = getComputedStyle(root).getPropertyValue("--vbg-text-primary").trim();
  if (!token) root.classList.add("vbg-custom-fallback");

  // Las direcciones viejas con # llevan a su página.
  var legacy = { "#resultados": "/resultados", "#tecnico": "/tecnico", "#quien-soy": "/quien-soy", "#inicio": "/" };
  if (legacy[location.hash]) location.replace(legacy[location.hash]);

  // Un cuadrado por estudiante.
  document.querySelectorAll("[data-units]").forEach(function (el) {
    el.getAttribute("data-units").split(",").forEach(function (part) {
      var bits = part.split(":");
      for (var i = 0; i < Number(bits[0]); i++) {
        var s = document.createElement("span");
        s.className = "vbg-viz-cell is-" + bits[1];
        el.appendChild(s);
      }
    });
  });

  var btn = document.getElementById("copiar-correo");
  if (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById("correo");
      function select() {
        var r = document.createRange();
        r.selectNodeContents(el);
        var s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        btn.textContent = "Seleccionado";
      }
      try {
        navigator.clipboard.writeText(el.textContent).then(function () { btn.textContent = "Copiado"; }, select);
      } catch (e) { select(); }
    });
  }
})();
