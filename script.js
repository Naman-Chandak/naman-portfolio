/* ==========================================================
   Naman Chandak | Trainer Portfolio
   Blocks 1-5: sprites, badges, typewriter intro, mobile menu, theme,
   nav highlight, skill bars, copy-email button
   ========================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Pixel sprite (drawn from a text grid, original art) ---------- */
  var SPRITE = [
    "................",
    "....KKKKKKKK....",
    "...KRRRRRRRRK...",
    "..KRRRRWWRRRRK..",
    "..KRRRRWWRRRRK..",
    "..KrrrrrrrrrrK..",
    ".KKKKKKKKKKKKKK.",
    "..KHSSSSSSSSHK..",
    "..KSSKSSSSKSSK..",
    "..KSSSSSSSSSSK..",
    "...KSSSKKSSSK...",
    "....KKKKKKKK....",
    "..KKBBBBBBBBKK..",
    ".KSKBBBWWBBBKSK.",
    ".KSKBBBWWBBBKSK.",
    "..KKBBBBBBBBKK..",
    "...KGGGKKGGGK...",
    "...KGGGKKGGGK...",
    "...KKKKKKKKKK..."
  ];
  var COLORS = {
    K: "#1a1c2c", // outline
    R: "#e63946", // cap
    r: "#a8232e", // cap shade
    W: "#ffffff", // logo / shirt print
    S: "#f2c291", // skin
    H: "#3b2a20", // hair
    B: "#3a6ea5", // jacket
    G: "#4a4e69"  // trousers
  };

  // Turns a text grid + colour map into a crisp SVG string
  function gridToSvg(grid, colors) {
    var rows = grid.length, cols = grid[0].length, rects = "";
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var c = grid[y].charAt(x);
        if (colors[c]) {
          rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + colors[c] + '"/>';
        }
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + cols + " " + rows +
      '" aria-hidden="true" focusable="false">' + rects + "</svg>";
  }

  function drawSprite() {
    document.querySelectorAll("[data-sprite]").forEach(function (host) {
      host.innerHTML = gridToSvg(SPRITE, COLORS);
    });
  }

  /* ---------- 1b. Badge icons (original pixel art) ---------- */
  var BADGES = {
    rank: {
      colors: { K: "#1a1c2c", C: "#4fd1c5", W: "#ffffff" },
      grid: [
        "....KK....",
        "...KCCK...",
        "..KCWCCK..",
        ".KCWCCCCK.",
        "KCCCCCCCCK",
        ".KCCCCCCK.",
        "..KCCCCK..",
        "...KCCK...",
        "....KK...."
      ]
    },
    speed: {
      colors: { K: "#1a1c2c", Y: "#ffd23f" },
      grid: [
        "......KK..",
        ".....KYK..",
        "....KYYK..",
        "...KYYK...",
        "..KYYYYYK.",
        "...KKYYK..",
        "....KYK...",
        "....KYK...",
        "...KYK....",
        "...KK....."
      ]
    },
    code: {
      colors: { K: "#1a1c2c", G: "#8bd450" },
      grid: [
        "...K..K...",
        "..KG..GK..",
        ".KG....GK.",
        "KG......GK",
        ".KG....GK.",
        "..KG..GK..",
        "...K..K..."
      ]
    },
    bug: {
      colors: { K: "#1a1c2c", R: "#e63946" },
      grid: [
        "..K....K..",
        "...K..K...",
        "..KKKKKK..",
        ".KRRRRRRK.",
        "KKRRKKRRKK",
        ".KRRRRRRK.",
        "KKRRKKRRKK",
        ".KRRRRRRK.",
        "..KKKKKK.."
      ]
    }
  };

  function drawBadges() {
    document.querySelectorAll("[data-badge]").forEach(function (host) {
      var b = BADGES[host.getAttribute("data-badge")];
      if (b) host.innerHTML = gridToSvg(b.grid, b.colors);
    });
  }

  /* ---------- 2. Typewriter dialog ---------- */
  var PAGES = [
    "A wild developer appeared! I\u2019m Naman, a BTech CSE student at JECRC University.",
    "I learn by building: vibe-coding projects, brute-forcing bugs, and now levelling up in Java.",
    "Off duty I queue Valorant, peak Platinum 2. Scroll on to open my project Pok\u00e9dex."
  ];

  function initDialog() {
    var box = document.getElementById("dialog");
    var textEl = document.getElementById("dialog-text");
    var srEl = document.getElementById("dialog-sr");
    var nextEl = document.getElementById("dialog-next");
    if (!box || !textEl) return;

    srEl.textContent = PAGES.join(" ");
    var timer = null;
    var run = 0; // guards against overlapping runs when the user replays

    function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } }

    function showAll() {
      clearTimer();
      textEl.textContent = PAGES.join(" ");
      nextEl.classList.add("is-visible");
    }

    function typePage(i, id) {
      if (id !== run) return;
      var full = PAGES[i];
      var n = 0;
      nextEl.classList.remove("is-visible");
      textEl.textContent = "";

      (function tick() {
        if (id !== run) return;
        n++;
        textEl.textContent = full.slice(0, n);
        if (n < full.length) {
          var ch = full.charAt(n - 1);
          var delay = /[.,!:]/.test(ch) ? 160 : 28;
          timer = setTimeout(tick, delay);
        } else if (i < PAGES.length - 1) {
          timer = setTimeout(function () { typePage(i + 1, id); }, 1500);
        } else {
          nextEl.classList.add("is-visible");
        }
      })();
    }

    function start() {
      run++;
      clearTimer();
      if (reduceMotion) { showAll(); return; }
      typePage(0, run);
    }

    box.addEventListener("click", start);
    box.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); start(); }
    });

    start();
  }

  /* ---------- 3. Mobile menu ---------- */
  function initMenu() {
    var btn = document.getElementById("menu-toggle");
    var nav = document.getElementById("site-nav");
    if (!btn || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    btn.addEventListener("click", function () {
      setOpen(btn.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---------- 4. Day / Night theme ---------- */
  function initTheme() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var label = btn.querySelector(".theme-label");
    var root = document.documentElement;

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      var night = theme === "night";
      btn.setAttribute("aria-pressed", String(night));
      btn.setAttribute("aria-label", night ? "Switch to day mode" : "Switch to night mode");
      if (label) label.textContent = night ? "Night" : "Day";
    }

    apply(root.getAttribute("data-theme") === "night" ? "night" : "day");

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "night" ? "day" : "night";
      apply(next);
      try { localStorage.setItem("nc-theme", next); } catch (e) {}
    });
  }

  /* ---------- 5. Highlight the nav link of the section in view ---------- */
  function initActiveLink() {
    var links = document.querySelectorAll(".nav__link");
    var sections = document.querySelectorAll("main > section[id]");
    if (!links.length || !("IntersectionObserver" in window)) return;

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("data-section") === id);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive(en.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
    setActive("home");
  }

  /* ---------- 6. Skill bars: build the pips, fill them once when seen ---------- */
  function initSkills() {
    var cards = document.querySelectorAll(".move");
    if (!cards.length) return;

    cards.forEach(function (card) {
      var level = parseInt(card.getAttribute("data-level"), 10) || 0;
      var lit = level * 2;                 // 5-point scale shown on 10 pips
      var pips = card.querySelector(".pips");
      var html = "";
      for (var i = 0; i < 10; i++) {
        html += '<span class="pip" data-on="' + (i < lit ? 1 : 0) + '" style="--i:' + i + '"></span>';
      }
      pips.innerHTML = html;
    });

    function fill(card) {
      card.querySelectorAll('.pip[data-on="1"]').forEach(function (p) { p.classList.add("is-on"); });
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      cards.forEach(fill);
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { fill(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    cards.forEach(function (c) { io.observe(c); });
  }

  /* ---------- 7. Copy email button ---------- */
  function initCopyEmail() {
    var btn = document.getElementById("copy-email");
    var src = document.getElementById("email-text");
    var status = document.getElementById("copy-status");
    if (!btn || !src) return;
    var timer = null;

    function done(ok) {
      btn.textContent = ok ? "Copied!" : "Press Ctrl+C";
      if (status) status.textContent = ok ? "Email address copied." : "Copy failed. Select the address and copy it manually.";
      clearTimeout(timer);
      timer = setTimeout(function () { btn.textContent = "Copy"; }, 1800);
    }

    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = src.textContent.trim();
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }

    btn.addEventListener("click", function () {
      var text = src.textContent.trim();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------- 8. Projects: Pokedex entries built from one data list ---------- */
  // Paste each deployed link into `live` (leave "" until the app is deployed;
  // the Live button only appears when a link is set).
  var GH = "https://github.com/Naman-Chandak/";
  var PROJECTS = [
    {
      no: 1, icon: "list",
      title: "Python Programs Collection",
      desc: "Three classic Python programs: factorial with a loop and with recursion, Fibonacci numbers, and conversion of structured data into dictionaries. Includes a menu runner and a README with examples.",
      tech: ["Python", "Git"],
      kw: "factorial fibonacci recursion dictionary dataclass programs",
      repo: GH + "python-programs-collection",
      live: ""
    },
    {
      no: 2, icon: "spark",
      title: "Messy Python Code Improvement",
      desc: "A deliberately messy grade-report script rewritten with AI help: clear names, small functions, named constants and no repeated loops, with exactly the same output.",
      tech: ["Python", "AI-assisted"],
      kw: "refactor cleanup clean code grades",
      repo: GH + "messy-python-code-improvement",
      live: ""
    },
    {
      no: 3, icon: "bug",
      title: "Bug Fixing Using Cursor AI",
      desc: "Five bugs hidden in small Python functions, such as skipped list items, negative numbers, capital letters and a wrong discount, found and fixed with Cursor AI and checked by 11 tests.",
      tech: ["Python", "Cursor AI", "Testing"],
      kw: "debug bug fix tests",
      repo: GH + "bug-fixing-cursor-ai",
      live: ""
    },
    {
      no: 4, icon: "quiz",
      title: "Interactive Quiz Application",
      desc: "A 10-question Pok\u00e9mon trivia game with shuffled questions, instant feedback, a live score and a trainer rank at the end. Playable with the keyboard.",
      tech: ["HTML", "CSS", "JavaScript"],
      kw: "pokemon trivia game score web app",
      repo: GH + "interactive-quiz-app",
      live: "https://interactive-quiz-app-amber.vercel.app"
    },
    {
      no: 5, icon: "book",
      title: "Book Reading List Application",
      desc: "Add books, mark them as read, filter your shelf and delete books. The list is saved in the browser, so it is still there after a refresh.",
      tech: ["HTML", "CSS", "JavaScript", "localStorage"],
      kw: "books shelf reading list web app",
      repo: GH + "book-reading-list-app",
      live: "https://book-reading-list-app-three.vercel.app"
    }
  ];

  var ICONS = {
    list: { colors: { K: "#1a1c2c", B: "#3a6ea5", W: "#ffffff" }, grid: [
      "KKKKKKKKKK", "KBBBBBBBBK", "KBWBWWWWBK", "KBBBBBBBBK", "KBWBWWWBBK",
      "KBBBBBBBBK", "KBWBWWWWBK", "KBBBBBBBBK", "KKKKKKKKKK"] },
    spark: { colors: { Y: "#ffb300" }, grid: [
      "....YY....", "....YY....", "...YYYY...", "YYYYYYYYYY",
      "YYYYYYYYYY", "...YYYY...", "....YY....", "....YY...."] },
    bug: BADGES.bug,
    quiz: { colors: { P: "#8e5bd6" }, grid: [
      "..PPPPPP..", ".PPPPPPPP.", ".PP....PP.", "......PPP.", "....PPPP..",
      "...PPP....", "...PP.....", "..........", "...PP.....", "...PP....."] },
    book: { colors: { K: "#1a1c2c", R: "#e63946", W: "#ffffff" }, grid: [
      ".KKKKKKKK.", ".KRRRRRRK.", ".KRWWWWRK.", ".KRRRRRRK.", ".KRWWWRRK.",
      ".KRRRRRRK.", ".KKKKKKKK.", ".KWWWWWWK.", ".KKKKKKKK."] }
  };

  var CHIP_CLASS = {
    "Python": "chip--lang", "JavaScript": "chip--lang",
    "HTML": "chip--web", "CSS": "chip--web",
    "Git": "chip--tool", "AI-assisted": "chip--tool", "Cursor AI": "chip--tool",
    "Testing": "chip--tool", "localStorage": "chip--other"
  };

  // lower-case and strip accents so "pokemon" finds "Pokémon"
  function normalize(text) {
    return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function pad3(n) { return ("00" + n).slice(-3); }

  function initProjects() {
    var list = document.getElementById("entries");
    if (!list) return;

    PROJECTS.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "entry";
      // Read by the project search and filter
      li.setAttribute("data-search", normalize(p.title + " " + p.tech.join(" ") + " " + (p.kw || "")));
      li.setAttribute("data-tech", "|" + p.tech.join("|").toLowerCase() + "|");

      var head = document.createElement("div");
      head.className = "entry__head";
      var no = document.createElement("span");
      no.className = "entry__no";
      no.textContent = "No. " + pad3(p.no);
      var icon = document.createElement("div");
      icon.className = "entry__icon";
      var def = ICONS[p.icon];
      if (def) icon.innerHTML = gridToSvg(def.grid, def.colors);
      head.appendChild(no);
      head.appendChild(icon);

      var title = document.createElement("h3");
      title.className = "entry__title";
      title.textContent = p.title;

      var desc = document.createElement("p");
      desc.className = "entry__desc";
      desc.textContent = p.desc;

      var tech = document.createElement("ul");
      tech.className = "entry__tech";
      p.tech.forEach(function (t) {
        var chip = document.createElement("li");
        chip.className = "chip " + (CHIP_CLASS[t] || "chip--other");
        chip.textContent = t;
        tech.appendChild(chip);
      });

      var links = document.createElement("div");
      links.className = "entry__links";
      var gh = document.createElement("a");
      gh.className = "btn btn--small";
      gh.href = p.repo;
      gh.target = "_blank";
      gh.rel = "noopener noreferrer";
      gh.textContent = "GitHub";
      gh.setAttribute("aria-label", "GitHub repository for " + p.title);
      links.appendChild(gh);
      if (p.live) {
        var live = document.createElement("a");
        live.className = "btn btn--small btn--start";
        live.href = p.live;
        live.target = "_blank";
        live.rel = "noopener noreferrer";
        live.textContent = "Live app";
        live.setAttribute("aria-label", "Live app for " + p.title);
        links.appendChild(live);
      }

      li.appendChild(head);
      li.appendChild(title);
      li.appendChild(desc);
      li.appendChild(tech);
      li.appendChild(links);
      list.appendChild(li);
    });
  }

  /* ---------- 9. Project search + technology filter ---------- */
  var FILTERS = ["All", "Python", "HTML", "CSS", "JavaScript", "AI-assisted"];

  function initProjectSearch() {
    var input = document.getElementById("dex-search");
    var filterBox = document.getElementById("dex-filters");
    var countEl = document.getElementById("dex-count");
    var emptyEl = document.getElementById("dex-empty");
    var clearBtn = document.getElementById("dex-clear");
    var entries = document.querySelectorAll("#entries .entry");
    if (!input || !filterBox || !entries.length) return;

    var activeFilter = "all";

    FILTERS.forEach(function (name) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter" + (name === "All" ? " is-active" : "");
      btn.textContent = name;
      btn.setAttribute("data-filter", name.toLowerCase());
      btn.setAttribute("aria-pressed", name === "All" ? "true" : "false");
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-filter");
        Array.prototype.forEach.call(filterBox.children, function (c) {
          var on = c === btn;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-pressed", String(on));
        });
        apply();
      });
      filterBox.appendChild(btn);
    });

    function apply() {
      var words = normalize(input.value).split(/\s+/).filter(Boolean);
      var shown = 0;
      entries.forEach(function (li) {
        var hay = li.getAttribute("data-search");
        var matchesText = words.every(function (w) { return hay.indexOf(w) !== -1; });
        var matchesFilter = activeFilter === "all" ||
          li.getAttribute("data-tech").indexOf("|" + activeFilter + "|") !== -1;
        var show = matchesText && matchesFilter;
        li.hidden = !show;
        if (show) shown++;
      });
      countEl.textContent = shown === entries.length
        ? "Showing all " + entries.length + " entries"
        : "Showing " + shown + " of " + entries.length + " entries";
      emptyEl.hidden = shown !== 0;
    }

    function reset() {
      input.value = "";
      activeFilter = "all";
      Array.prototype.forEach.call(filterBox.children, function (c) {
        var on = c.getAttribute("data-filter") === "all";
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      apply();
      input.focus();
    }

    input.addEventListener("input", apply);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && input.value) { input.value = ""; apply(); }
    });
    clearBtn.addEventListener("click", reset);
    apply();
  }

  /* ---------- 10. Dex Assistant chatbot (talks to /api/chat) ---------- */
  var SUGGESTIONS = [
    "Who are you?",
    "What are your skills?",
    "What projects have you completed?",
    "Explain your Python programs",
    "What was corrected in the buggy code project?",
    "How does the reading list work?",
    "Where is your GitHub?"
  ];
  var ERROR_TEXT = {
    network: "Wild connection error appeared! The assistant could not be reached. Please try again in a moment.",
    server: "Wild connection error appeared! The assistant had a problem on its side. Please try again in a moment.",
    busy: "Too many questions at once. Wait about a minute and try again.",
    setup: "The assistant is not set up yet. Naman needs to add the API key in Vercel.",
    key: "The assistant's API key was rejected. Naman needs to check the key in Vercel."
  };

  function initChat() {
    var log = document.getElementById("chat-log");
    var form = document.getElementById("chat-form");
    var input = document.getElementById("chat-input");
    var sendBtn = document.getElementById("chat-send");
    var suggestBox = document.getElementById("chat-suggest");
    if (!log || !form || !input) return;

    var history = [];   // [{role, content}] real exchanges only
    var busy = false;

    function toBottom() { log.scrollTop = log.scrollHeight; }

    function setBusy(on) {
      busy = on;
      input.disabled = on;
      sendBtn.disabled = on;
      Array.prototype.forEach.call(suggestBox.children, function (b) { b.disabled = on; });
    }

    function addMessage(kind, who, text) {
      var box = document.createElement("div");
      box.className = "msg msg--" + kind;
      var label = document.createElement("span");
      label.className = "msg__who";
      label.textContent = who;
      var body = document.createElement("span");
      body.className = "msg__text";
      body.textContent = text;
      box.appendChild(label);
      box.appendChild(body);
      log.appendChild(box);
      toBottom();
      return { box: box, body: body };
    }

    // Reveal the reply a few characters at a time (instant if reduced motion)
    function reveal(el, text, done) {
      if (reduceMotion) { el.textContent = text; toBottom(); done(); return; }
      var i = 0;
      var step = text.length > 240 ? 3 : 2;
      (function tick() {
        i = Math.min(text.length, i + step);
        el.textContent = text.slice(0, i);
        toBottom();
        if (i < text.length) setTimeout(tick, 14); else done();
      })();
    }

    function showError(kind, retryText) {
      var m = addMessage("error", "Error", ERROR_TEXT[kind] || ERROR_TEXT.network);
      if (retryText && kind !== "setup" && kind !== "key") {
        var wrap = document.createElement("div");
        wrap.className = "msg__retry";
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn--small";
        btn.textContent = "Try again";
        btn.addEventListener("click", function () {
          if (busy) return;
          m.box.remove();
          ask(retryText, true);
        });
        wrap.appendChild(btn);
        m.box.appendChild(wrap);
        toBottom();
      }
    }

    function ask(question, isRetry) {
      if (busy) return;
      if (!isRetry) addMessage("user", "You", question);
      setBusy(true);

      var typing = addMessage("bot", "Dex Assistant", "Thinking");
      typing.box.classList.add("msg--typing");

      var payload = history.concat([{ role: "user", content: question }]);

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload })
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { ok: res.ok, status: res.status, data: data };
          });
        })
        .then(function (r) {
          typing.box.remove();
          if (r.ok && r.data && typeof r.data.reply === "string" && r.data.reply) {
            history.push({ role: "user", content: question });
            history.push({ role: "assistant", content: r.data.reply });
            if (history.length > 8) history = history.slice(-8);
            var m = addMessage("bot", "Dex Assistant", "");
            reveal(m.body, r.data.reply, function () { setBusy(false); input.focus(); });
            return;
          }
          var kind = r.status === 429 ? "busy"
            : (r.data && r.data.error === "not_configured") ? "setup"
            : (r.data && r.data.error === "upstream_error" && (r.data.upstream_status === 401 || r.data.upstream_status === 403)) ? "key"
            : "server";
          showError(kind, question);
          setBusy(false);
        })
        .catch(function () {
          typing.box.remove();
          showError("network", question);
          setBusy(false);
        });
    }

    SUGGESTIONS.forEach(function (text) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "suggest";
      b.textContent = text;
      b.addEventListener("click", function () { ask(text, false); });
      suggestBox.appendChild(b);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q || busy) return;
      input.value = "";
      ask(q, false);
    });

    addMessage("bot", "Dex Assistant",
      "Hi! I'm the Dex Assistant. Ask me about Naman's skills, projects or how to reach him. Tap a question below or type your own.");
  }

  /* ---------- Boot ---------- */
  drawSprite();
  drawBadges();
  initDialog();
  initMenu();
  initTheme();
  initActiveLink();
  initSkills();
  initCopyEmail();
  initProjects();
  initProjectSearch();
  initChat();
})();
