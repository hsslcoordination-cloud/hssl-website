/* Temporary password gate. To remove: delete this file (and optionally the <script src="gate.js"> line in each page). */
(function () {
  var HASH = "628c40df97fd025c6a758f5a760bbf81f34ee4c30ec1c5ab8b5c1e16a897a12c";
  var KEY = "hssl_gate_ok";
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}

  var st = document.createElement("style");
  st.id = "gate-style";
  st.textContent = "html.gated body > *:not(#gate-overlay){display:none !important}" +
    "#gate-overlay{position:fixed;inset:0;z-index:2147483647;background:#0d2e4d;display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif;padding:16px}" +
    "#gate-overlay form{background:#fff;border-radius:12px;padding:32px;max-width:360px;width:100%;box-shadow:0 10px 40px rgba(0,0,0,.3);text-align:center}" +
    "#gate-overlay h1{font-size:1.25rem;margin:0 0 8px;color:#0d2e4d}" +
    "#gate-overlay p{margin:0 0 20px;color:#555;font-size:.95rem}" +
    "#gate-overlay input{width:100%;box-sizing:border-box;padding:12px;border:1px solid #ccc;border-radius:8px;font-size:1rem;margin-bottom:12px}" +
    "#gate-overlay button{width:100%;padding:12px;border:0;border-radius:8px;background:#0d2e4d;color:#fff;font-size:1rem;cursor:pointer}" +
    "#gate-err{color:#c0392b;font-size:.9rem;min-height:1.2em;margin-top:8px}";
  document.head.appendChild(st);
  document.documentElement.classList.add("gated");

  function sha256(str) {
    var buf = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", buf).then(function (d) {
      return Array.prototype.map.call(new Uint8Array(d), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  function build() {
    var o = document.createElement("div");
    o.id = "gate-overlay";
    o.innerHTML = '<form><h1>Site under construction</h1><p>Enter password to continue.</p>' +
      '<input type="password" id="gate-pw" placeholder="Password" autocomplete="current-password" autofocus />' +
      '<button type="submit">Enter</button><div id="gate-err"></div></form>';
    document.body.appendChild(o);
    o.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      sha256(document.getElementById("gate-pw").value).then(function (h) {
        if (h === HASH) {
          try { localStorage.setItem(KEY, HASH); } catch (e) {}
          o.remove();
          document.documentElement.classList.remove("gated");
        } else {
          document.getElementById("gate-err").textContent = "Wrong password.";
        }
      });
    });
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
