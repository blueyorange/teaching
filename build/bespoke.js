/*!! License: https://unpkg.com/@marp-team/marp-cli@2.2.0/lib/bespoke.js.LICENSE.txt */ !(function () {
  "use strict";
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self && self;
  let e = document.body,
    t = (...e) => history.replaceState(...e),
    n = "presenter",
    r = "next",
    a = ["", n, r],
    i = "data-bespoke-marp-",
    o = (e, { protocol: t, host: n, pathname: r, hash: a } = location) => {
      let i = e.toString();
      return `${t}//${n}${r}${i ? "?" : ""}${i}${a}`;
    },
    l = () => e.dataset.bespokeView,
    s = (e) => new URLSearchParams(location.search).get(e),
    d = (e, n = {}) => {
      var r;
      let a = { location, setter: t, ...n },
        i = new URLSearchParams(a.location.search);
      for (let l of Object.keys(e)) {
        let s = e[l];
        "string" == typeof s ? i.set(l, s) : i.delete(l);
      }
      try {
        a.setter(
          { ...(null !== (r = window.history.state) && void 0 !== r ? r : {}) },
          "",
          o(i, a.location)
        );
      } catch (d) {
        console.error(d);
      }
    },
    c = (() => {
      let e = "bespoke-marp";
      try {
        return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
      } catch (t) {
        return !1;
      }
    })(),
    u = (e) => {
      try {
        return localStorage.getItem(e);
      } catch (t) {
        return null;
      }
    },
    f = (e, t) => {
      try {
        return localStorage.setItem(e, t), !0;
      } catch (n) {
        return !1;
      }
    },
    p = (e) => {
      try {
        return localStorage.removeItem(e), !0;
      } catch (t) {
        return !1;
      }
    },
    g = (e, t) => {
      let n = "aria-hidden";
      t ? e.setAttribute(n, "true") : e.removeAttribute(n);
    },
    m = (e) => {
      e.parent.classList.add("bespoke-marp-parent"),
        e.slides.forEach((e) => e.classList.add("bespoke-marp-slide")),
        e.on("activate", (t) => {
          let n = "bespoke-marp-active",
            r = t.slide,
            a = r.classList,
            i = !a.contains(n);
          if (
            (e.slides.forEach((e) => {
              e.classList.remove(n), g(e, !0);
            }),
            a.add(n),
            g(r, !1),
            i)
          ) {
            let o = `${n}-ready`;
            a.add(o), document.body.clientHeight, a.remove(o);
          }
        });
    },
    v = (e) => {
      let t = 0,
        n = 0;
      Object.defineProperty(e, "fragments", {
        enumerable: !0,
        value: e.slides.map((e) => [
          null,
          ...e.querySelectorAll("[data-marpit-fragment]"),
        ]),
      });
      let r = (r) => void 0 !== e.fragments[t][n + r],
        a = (r, a) => {
          (t = r),
            (n = a),
            e.fragments.forEach((e, t) => {
              e.forEach((e, n) => {
                if (null == e) return;
                e.setAttribute(
                  `${i}fragment`,
                  (t < r || (t === r && n <= a) ? "" : "in") + "active"
                );
                let o = `${i}current-fragment`;
                t === r && n === a
                  ? e.setAttribute(o, "current")
                  : e.removeAttribute(o);
              });
            }),
            (e.fragmentIndex = a);
          let o = {
            slide: e.slides[r],
            index: r,
            fragments: e.fragments[r],
            fragmentIndex: a,
          };
          e.fire("fragment", o);
        };
      e.on("next", ({ fragment: i = !0 }) => {
        if (i) {
          if (r(1)) return a(t, n + 1), !1;
          let o = t + 1;
          e.fragments[o] && a(o, 0);
        } else {
          let l = e.fragments[t].length;
          if (n + 1 < l) return a(t, l - 1), !1;
          let s = e.fragments[t + 1];
          s && a(t + 1, s.length - 1);
        }
      }),
        e.on("prev", ({ fragment: i = !0 }) => {
          if (r(-1) && i) return a(t, n - 1), !1;
          let o = t - 1;
          e.fragments[o] && a(o, e.fragments[o].length - 1);
        }),
        e.on("slide", ({ index: t, fragment: n }) => {
          let r = 0;
          if (void 0 !== n) {
            let i = e.fragments[t];
            if (i) {
              let { length: o } = i;
              r = -1 === n ? o - 1 : Math.min(Math.max(n, 0), o - 1);
            }
          }
          a(t, r);
        }),
        a(0, 0);
    },
    $ = document,
    y = () => !(!$.fullscreenEnabled && !$.webkitFullscreenEnabled),
    h = () => !(!$.fullscreenElement && !$.webkitFullscreenElement),
    b = (e) => {
      (e.fullscreen = () => {
        y() &&
          (async () => {
            var e;
            return h()
              ? null === (e = $.exitFullscreen || $.webkitExitFullscreen) ||
                void 0 === e
                ? void 0
                : e.call($)
              : ((e = $.body) => {
                  var t;
                  return null ===
                    (t = e.requestFullscreen || e.webkitRequestFullscreen) ||
                    void 0 === t
                    ? void 0
                    : t.call(e);
                })();
          })();
      }),
        document.addEventListener("keydown", (t) => {
          ("f" !== t.key && "F11" !== t.key) ||
            t.altKey ||
            t.ctrlKey ||
            t.metaKey ||
            !y() ||
            (e.fullscreen(), t.preventDefault());
        });
    },
    _ = "bespoke-marp-inactive",
    x =
      (e = 2e3) =>
      ({ parent: t, fire: n }) => {
        let r = t.classList,
          a = (e) => n(`marp-${e ? "" : "in"}active`),
          i,
          o = () => {
            i && clearTimeout(i),
              (i = setTimeout(() => {
                r.add(_), a();
              }, e)),
              r.contains(_) && (r.remove(_), a(!0));
          };
        for (let l of ["mousedown", "mousemove", "touchend"])
          document.addEventListener(l, o);
        setTimeout(o, 0);
      },
    k = ["AUDIO", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "VIDEO"],
    w = (e) => {
      e.parent.addEventListener("keydown", (e) => {
        if (!e.target) return;
        let t = e.target;
        (k.includes(t.nodeName) || "true" === t.contentEditable) &&
          e.stopPropagation();
      });
    },
    E = (e) => {
      window.addEventListener("load", () => {
        for (let t of e.slides) {
          let n = t.querySelector(
            "marp-auto-scaling, [data-auto-scaling], [data-marp-fitting]"
          );
          t.setAttribute(`${i}load`, n ? "" : "hideable");
        }
      });
    },
    L =
      ({ interval: e = 250 } = {}) =>
      (t) => {
        document.addEventListener("keydown", (e) => {
          if (" " === e.key && e.shiftKey) t.prev();
          else if (
            "ArrowLeft" === e.key ||
            "ArrowUp" === e.key ||
            "PageUp" === e.key
          )
            t.prev({ fragment: !e.shiftKey });
          else if (" " !== e.key || e.shiftKey) {
            if (
              "ArrowRight" === e.key ||
              "ArrowDown" === e.key ||
              "PageDown" === e.key
            )
              t.next({ fragment: !e.shiftKey });
            else if ("End" === e.key)
              t.slide(t.slides.length - 1, { fragment: -1 });
            else {
              if ("Home" !== e.key) return;
              t.slide(0);
            }
          } else t.next();
          e.preventDefault();
        });
        let n,
          r,
          a = 0;
        t.parent.addEventListener("wheel", (i) => {
          let o = !1,
            l = (e, t) => {
              var n, r;
              e &&
                (o =
                  o ||
                  (((e, t) => {
                    let n = "X" === t ? "Width" : "Height";
                    return e[`client${n}`] < e[`scroll${n}`];
                  })((n = e), (r = t)) &&
                    ((e, t) => {
                      let { overflow: n } = e,
                        r = e[`overflow${t}`];
                      return (
                        "auto" === n ||
                        "scroll" === n ||
                        "auto" === r ||
                        "scroll" === r
                      );
                    })(getComputedStyle(n), r))),
                (null == e ? void 0 : e.parentElement) && l(e.parentElement, t);
            };
          if (
            (0 !== i.deltaX && l(i.target, "X"),
            0 !== i.deltaY && l(i.target, "Y"),
            o)
          )
            return;
          i.preventDefault();
          let s = Math.sqrt(i.deltaX ** 2 + i.deltaY ** 2);
          if (void 0 !== i.wheelDelta) {
            if (
              (void 0 === i.webkitForce && 40 > Math.abs(i.wheelDelta)) ||
              (i.deltaMode === i.DOM_DELTA_PIXEL && s < 4)
            )
              return;
          } else if (i.deltaMode === i.DOM_DELTA_PIXEL && s < 12) return;
          r && clearTimeout(r),
            (r = setTimeout(() => {
              n = 0;
            }, e));
          let d = Date.now() - a < e,
            c = s <= n;
          if (((n = s), d || c)) return;
          let u;
          (i.deltaX > 0 || i.deltaY > 0) && (u = "next"),
            (i.deltaX < 0 || i.deltaY < 0) && (u = "prev"),
            u && (t[u](), (a = Date.now()));
        });
      },
    P = (e = ".bespoke-marp-osc") => {
      let t = document.querySelector(e);
      if (!t) return () => {};
      let n = (e, n) => {
        t.querySelectorAll(`[${i}osc=${JSON.stringify(e)}]`).forEach(n);
      };
      return (
        y() || n("fullscreen", (e) => (e.style.display = "none")),
        c ||
          n("presenter", (e) => {
            (e.disabled = !0),
              (e.title =
                "Presenter view is disabled due to restricted localStorage.");
          }),
        (e) => {
          t.addEventListener("click", (t) => {
            if (t.target instanceof HTMLElement) {
              let { bespokeMarpOsc: n } = t.target.dataset;
              n && t.target.blur();
              let r = { fragment: !t.shiftKey };
              "next" === n
                ? e.next(r)
                : "prev" === n
                ? e.prev(r)
                : "fullscreen" === n
                ? null == e || e.fullscreen()
                : "presenter" === n && e.openPresenterView();
            }
          }),
            e.parent.appendChild(t),
            e.on("activate", ({ index: t }) => {
              n(
                "page",
                (n) => (n.textContent = `Page ${t + 1} of ${e.slides.length}`)
              );
            }),
            e.on("fragment", ({ index: t, fragments: r, fragmentIndex: a }) => {
              n("prev", (e) => (e.disabled = 0 === t && 0 === a)),
                n(
                  "next",
                  (n) =>
                    (n.disabled =
                      t === e.slides.length - 1 && a === r.length - 1)
                );
            }),
            e.on("marp-active", () => g(t, !1)),
            e.on("marp-inactive", () => g(t, !0)),
            y() &&
              ((e) => {
                for (let t of ["", "webkit"])
                  $.addEventListener(t + "fullscreenchange", e);
              })(() =>
                n("fullscreen", (e) => e.classList.toggle("exit", y() && h()))
              );
        }
      );
    },
    S = (e) => {
      window.addEventListener("message", (t) => {
        if (t.origin !== window.origin) return;
        let [n, r] = t.data.split(":");
        if ("navigate" === n) {
          let [a, i] = r.split(","),
            o = Number.parseInt(a, 10),
            l = Number.parseInt(i, 10) + 1;
          l >= e.fragments[o].length && ((o += 1), (l = 0)),
            e.slide(o, { fragment: l });
        }
      });
    };
  var I,
    T,
    A,
    C,
    D,
    B,
    K = { exports: {} };
  K.exports =
    ((I = [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ]),
    (T = function (e) {
      return String(e).replace(/[&<>"']/g, function (e) {
        return "&" + A[e] + ";";
      });
    }),
    (A = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" }),
    (C = "dangerouslySetInnerHTML"),
    (D = { className: "class", htmlFor: "for" }),
    (B = {}),
    function (e, t) {
      var n = [],
        r = "";
      t = t || {};
      for (var a = arguments.length; a-- > 2; ) n.push(arguments[a]);
      if ("function" == typeof e) return (t.children = n.reverse()), e(t);
      if (e) {
        if (((r += "<" + e), t))
          for (var i in t)
            !1 !== t[i] &&
              null != t[i] &&
              i !== C &&
              (r += " " + (D[i] ? D[i] : T(i)) + '="' + T(t[i]) + '"');
        r += ">";
      }
      if (-1 === I.indexOf(e)) {
        if (t[C]) r += t[C].__html;
        else
          for (; n.length; ) {
            var o = n.pop();
            if (o) {
              if (o.pop) for (var l = o.length; l--; ) n.push(o[l]);
              else r += !0 === B[o] ? o : T(o);
            }
          }
        r += e ? "</" + e + ">" : "";
      }
      return (B[r] = !0), r;
    });
  var q = K.exports;
  let M = ({ children: e }) => q(null, null, ...e),
    F = "bespoke-marp-presenter-",
    N = {
      container: `${F}container`,
      dragbar: `${F}dragbar-container`,
      next: `${F}next`,
      nextContainer: `${F}next-container`,
      noteContainer: `${F}note-container`,
      noteWrapper: `${F}note-wrapper`,
      noteButtons: `${F}note-buttons`,
      infoContainer: `${F}info-container`,
      infoPage: `${F}info-page`,
      infoPageText: `${F}info-page-text`,
      infoPagePrev: `${F}info-page-prev`,
      infoPageNext: `${F}info-page-next`,
      noteButtonsBigger: `${F}note-bigger`,
      noteButtonsSmaller: `${F}note-smaller`,
      infoTime: `${F}info-time`,
      infoTimer: `${F}info-timer`,
    },
    V = (e) => {
      let { title: t } = document;
      document.title = "[Presenter view]" + (t ? ` - ${t}` : "");
      let n = {},
        r = (e) => ((n[e] = n[e] || document.querySelector(`.${e}`)), n[e]);
      document.body.appendChild(
        ((e) => {
          let t = document.createElement("div");
          return (
            (t.className = N.container),
            t.appendChild(e),
            t.insertAdjacentHTML(
              "beforeend",
              q(
                M,
                null,
                q(
                  "div",
                  { class: N.nextContainer },
                  q("iframe", { class: N.next, src: "?view=next" })
                ),
                q("div", { class: N.dragbar }),
                q(
                  "div",
                  { class: N.noteContainer },
                  q("div", { class: N.noteWrapper }),
                  q(
                    "div",
                    { class: N.noteButtons },
                    q(
                      "button",
                      {
                        class: N.noteButtonsSmaller,
                        tabindex: "-1",
                        title: "Smaller notes font size",
                      },
                      "Smaller notes font size"
                    ),
                    q(
                      "button",
                      {
                        class: N.noteButtonsBigger,
                        tabindex: "-1",
                        title: "Bigger notes font size",
                      },
                      "Bigger notes font size"
                    )
                  )
                ),
                q(
                  "div",
                  { class: N.infoContainer },
                  q(
                    "div",
                    { class: N.infoPage },
                    q(
                      "button",
                      {
                        class: N.infoPagePrev,
                        tabindex: "-1",
                        title: "Previous",
                      },
                      "Previous"
                    ),
                    q("span", { class: N.infoPageText }),
                    q(
                      "button",
                      { class: N.infoPageNext, tabindex: "-1", title: "Next" },
                      "Next"
                    )
                  ),
                  q("time", { class: N.infoTime, title: "Current time" }),
                  q("time", { class: N.infoTimer, title: "Timer" })
                )
              )
            ),
            t
          );
        })(e.parent)
      ),
        ((e) => {
          var t;
          let n = !1;
          r(N.dragbar).addEventListener("mousedown", () => {
            (n = !0), r(N.dragbar).classList.add("active");
          }),
            window.addEventListener("mouseup", () => {
              (n = !1), r(N.dragbar).classList.remove("active");
            }),
            window.addEventListener("mousemove", (e) => {
              if (!n) return;
              let t = (e.clientX / document.documentElement.clientWidth) * 100;
              r(N.container).style.setProperty(
                "--bespoke-marp-presenter-split-ratio",
                `${Math.max(0, Math.min(100, t))}%`
              );
            }),
            r(N.nextContainer).addEventListener("click", () => e.next());
          let a = r(N.next),
            i =
              ((t = a),
              (e, n) => {
                var r;
                return null === (r = t.contentWindow) || void 0 === r
                  ? void 0
                  : r.postMessage(
                      `navigate:${e},${n}`,
                      "null" === window.origin ? "*" : window.origin
                    );
              });
          a.addEventListener("load", () => {
            r(N.nextContainer).classList.add("active"),
              i(e.slide(), e.fragmentIndex),
              e.on("fragment", ({ index: e, fragmentIndex: t }) => i(e, t));
          });
          let o = document.querySelectorAll(".bespoke-marp-note");
          o.forEach((e) => {
            e.addEventListener("keydown", (e) => e.stopPropagation()),
              r(N.noteWrapper).appendChild(e);
          }),
            e.on("activate", () =>
              o.forEach((t) =>
                t.classList.toggle("active", t.dataset.index == e.slide())
              )
            );
          let l = 0,
            s = (e) => {
              (l = Math.max(-5, l + e)),
                r(N.noteContainer).style.setProperty(
                  "--bespoke-marp-note-font-scale",
                  (1.2 ** l).toFixed(4)
                );
            },
            d = () => s(1),
            c = () => s(-1),
            u = r(N.noteButtonsBigger),
            f = r(N.noteButtonsSmaller);
          u.addEventListener("click", () => {
            u.blur(), d();
          }),
            f.addEventListener("click", () => {
              f.blur(), c();
            }),
            document.addEventListener(
              "keydown",
              (e) => {
                "+" === e.key && d(), "-" === e.key && c();
              },
              !0
            ),
            e.on("activate", ({ index: t }) => {
              r(N.infoPageText).textContent = `${t + 1} / ${e.slides.length}`;
            });
          let p = r(N.infoPagePrev),
            g = r(N.infoPageNext);
          p.addEventListener("click", (t) => {
            p.blur(), e.prev({ fragment: !t.shiftKey });
          }),
            g.addEventListener("click", (t) => {
              g.blur(), e.next({ fragment: !t.shiftKey });
            }),
            e.on("fragment", ({ index: t, fragments: n, fragmentIndex: r }) => {
              (p.disabled = 0 === t && 0 === r),
                (g.disabled = t === e.slides.length - 1 && r === n.length - 1);
            });
          let m = new Date(),
            v = () => {
              let e = new Date(),
                t = (e) => `${Math.floor(e)}`.padStart(2, "0"),
                n = e.getTime() - m.getTime(),
                a = t((n / 1e3) % 60),
                i = t((n / 1e3 / 60) % 60),
                o = t((n / 36e5) % 24);
              (r(N.infoTime).textContent = e.toLocaleTimeString()),
                (r(N.infoTimer).textContent = `${o}:${i}:${a}`);
            };
          v(),
            setInterval(v, 250),
            r(N.infoTimer).addEventListener("click", () => {
              m = new Date();
            });
        })(e);
    },
    X = (e) => {
      var t;
      if (!((t = e).syncKey && "string" == typeof t.syncKey))
        throw Error(
          "The current instance of Bespoke.js is invalid for Marp bespoke presenter plugin."
        );
      Object.defineProperties(e, {
        openPresenterView: { enumerable: !0, value: O },
        presenterUrl: { enumerable: !0, get: H },
      }),
        c &&
          document.addEventListener("keydown", (t) => {
            "p" !== t.key ||
              t.altKey ||
              t.ctrlKey ||
              t.metaKey ||
              (t.preventDefault(), e.openPresenterView());
          });
    };
  function O() {
    let { max: e, floor: t } = Math,
      n = e(t(0.85 * window.innerWidth), 640),
      r = e(t(0.85 * window.innerHeight), 360);
    return window.open(
      this.presenterUrl,
      F + this.syncKey,
      `width=${n},height=${r},menubar=no,toolbar=no`
    );
  }
  function H() {
    let e = new URLSearchParams(location.search);
    return e.set("view", "presenter"), e.set("sync", this.syncKey), o(e);
  }
  let U = (e) => {
      let t = l();
      return (
        t === r && e.appendChild(document.createElement("span")),
        { "": X, [n]: V, [r]: S }[t]
      );
    },
    W = (e) => {
      e.on("activate", (t) => {
        document
          .querySelectorAll(".bespoke-progress-parent > .bespoke-progress-bar")
          .forEach((n) => {
            n.style.flexBasis = (100 * t.index) / (e.slides.length - 1) + "%";
          });
      });
    },
    R = (e) => {
      let t = Number.parseInt(e, 10);
      return Number.isNaN(t) ? null : t;
    },
    Y = (e = {}) => {
      let t = { history: !0, ...e };
      return (e) => {
        let n = !0,
          r = (e) => {
            let t = n;
            try {
              return (n = !0), e();
            } finally {
              n = t;
            }
          },
          a = (t = { fragment: !0 }) => {
            ((t, n) => {
              let { min: r, max: a } = Math,
                { fragments: i, slides: o } = e,
                l = a(0, r(t, o.length - 1)),
                s = a(0, r(n || 0, i[l].length - 1));
              (l === e.slide() && s === e.fragmentIndex) ||
                e.slide(l, { fragment: s });
            })(
              (R(location.hash.slice(1)) || 1) - 1,
              t.fragment ? R(s("f") || "") : null
            );
          };
        e.on("fragment", ({ index: e, fragmentIndex: r }) => {
          n ||
            d(
              { f: 0 === r || r.toString() },
              {
                location: { ...location, hash: `#${e + 1}` },
                setter: (...e) =>
                  t.history
                    ? history.pushState(...e)
                    : history.replaceState(...e),
              }
            );
        }),
          setTimeout(() => {
            a(),
              window.addEventListener("hashchange", () =>
                r(() => {
                  a({ fragment: !1 }), d({ f: void 0 });
                })
              ),
              window.addEventListener("popstate", () => {
                n || r(() => a());
              }),
              (n = !1);
          }, 0);
      };
    },
    j = (e = {}) => {
      var n, r;
      let a =
          e.key ||
          (null === (n = window.history.state) || void 0 === n
            ? void 0
            : n.marpBespokeSyncKey) ||
          Math.random().toString(36).slice(2),
        i = `bespoke-marp-sync-${a}`;
      (r = { marpBespokeSyncKey: a }),
        d({}, { setter: (e, ...n) => t({ ...e, ...r }, ...n) });
      let o = () => {
          let e = u(i);
          return e ? JSON.parse(e) : Object.create(null);
        },
        l = (e) => {
          let t = o(),
            n = { ...t, ...e(t) };
          return f(i, JSON.stringify(n)), n;
        },
        s = () => {
          window.removeEventListener("pageshow", s),
            l((e) => ({ reference: (e.reference || 0) + 1 }));
        };
      return (e) => {
        s(), Object.defineProperty(e, "syncKey", { value: a, enumerable: !0 });
        let t = !0;
        setTimeout(() => {
          e.on("fragment", (e) => {
            t && l(() => ({ index: e.index, fragmentIndex: e.fragmentIndex }));
          });
        }, 0),
          window.addEventListener("storage", (n) => {
            if (n.key === i && n.oldValue && n.newValue) {
              let r = JSON.parse(n.oldValue),
                a = JSON.parse(n.newValue);
              if (r.index !== a.index || r.fragmentIndex !== a.fragmentIndex)
                try {
                  (t = !1),
                    e.slide(a.index, {
                      fragment: a.fragmentIndex,
                      forSync: !0,
                    });
                } finally {
                  t = !0;
                }
            }
          });
        let n = () => {
          let { reference: e } = o();
          void 0 === e || e <= 1 ? p(i) : l(() => ({ reference: e - 1 }));
        };
        window.addEventListener("pagehide", (e) => {
          e.persisted && window.addEventListener("pageshow", s), n();
        }),
          e.on("destroy", n);
      };
    },
    { PI: z, abs: G, sqrt: J, atan2: Q } = Math,
    Z = { passive: !0 },
    ee =
      ({ slope: e = -0.7, swipeThreshold: t = 30 } = {}) =>
      (n) => {
        let r,
          a = n.parent,
          i = (e) => {
            let t = a.getBoundingClientRect();
            return {
              x: e.pageX - (t.left + t.right) / 2,
              y: e.pageY - (t.top + t.bottom) / 2,
            };
          };
        a.addEventListener(
          "touchstart",
          ({ touches: e }) => {
            r = 1 === e.length ? i(e[0]) : void 0;
          },
          Z
        ),
          a.addEventListener("touchmove", (e) => {
            if (r) {
              if (1 === e.touches.length) {
                e.preventDefault();
                let t = i(e.touches[0]),
                  n = t.x - r.x,
                  a = t.y - r.y;
                (r.delta = J(G(n) ** 2 + G(a) ** 2)), (r.radian = Q(n, a));
              } else r = void 0;
            }
          }),
          a.addEventListener(
            "touchend",
            (a) => {
              if (r) {
                if (r.delta && r.delta >= t && r.radian) {
                  let i = ((r.radian - e + z) % (2 * z)) - z;
                  n[i < 0 ? "next" : "prev"](), a.stopPropagation();
                }
                r = void 0;
              }
            },
            Z
          );
      },
    et = new Map();
  et.clear(),
    et.set("none", {
      backward: { both: void 0, incoming: void 0, outgoing: void 0 },
      forward: { both: void 0, incoming: void 0, outgoing: void 0 },
    });
  let en = { both: "", outgoing: "outgoing-", incoming: "incoming-" },
    er = { forward: "", backward: "-backward" },
    ea = (e) => `--marp-bespoke-transition-animation-${e}`,
    ei = (e) => `--marp-transition-${e}`,
    eo = ea("name"),
    el = ea("duration"),
    es = (e) =>
      new Promise((t) => {
        var n, r;
        let a = {},
          i = document.createElement("div"),
          o = (e) => {
            i.remove(), t(e);
          };
        i.addEventListener("animationstart", () => o(a)),
          Object.assign(i.style, {
            animationName: e,
            animationDuration: "1s",
            animationFillMode: "both",
            animationPlayState: "paused",
            position: "absolute",
            pointerEvents: "none",
          }),
          document.body.appendChild(i);
        let l = getComputedStyle(i).getPropertyValue(ei("duration"));
        l && (a.defaultDuration = l),
          (n = i),
          (r = o),
          requestAnimationFrame(() => {
            (n.style.animationPlayState = "running"),
              requestAnimationFrame(() => r(void 0));
          });
      }),
    ed = async (e) =>
      et.has(e)
        ? et.get(e)
        : ((e) => {
            let t = {},
              n = [];
            for (let [r, a] of Object.entries(en))
              for (let [i, o] of Object.entries(er)) {
                let l = `marp-${a}transition${o}-${e}`;
                n.push(
                  es(l).then((e) => {
                    (t[i] = t[i] || {}),
                      (t[i][r] = e ? { ...e, name: l } : void 0);
                  })
                );
              }
            return Promise.all(n).then(() => t);
          })(e).then((t) => (et.set(e, t), t)),
    ec = (e) =>
      Object.values(e)
        .flatMap(Object.values)
        .every((e) => !e),
    eu = (e, { type: t, backward: n }) => {
      let r = e[n ? "backward" : "forward"],
        a = (() => {
          let e = r[t],
            n = (e) => ({ [eo]: e.name });
          if (e) return n(e);
          if (r.both) {
            let a = n(r.both);
            return "incoming" === t && (a[ea("direction")] = "reverse"), a;
          }
        })();
      return !a && n
        ? eu(e, { type: t, backward: !1 })
        : a || { [eo]: "__bespoke_marp_transition_no_animation__" };
    },
    ef = (e) => {
      if (e)
        try {
          let t = JSON.parse(e);
          if (
            ((e) => {
              if ("object" != typeof e) return !1;
              let t = e;
              return (
                "string" == typeof t.name &&
                (void 0 === t.duration || "string" == typeof t.duration)
              );
            })(t)
          )
            return t;
        } catch (n) {}
    },
    ep = "_tSId",
    eg = "bespoke-marp-transition-warming-up",
    em = window.matchMedia("(prefers-reduced-motion: reduce)"),
    ev = "__bespoke_marp_transition_reduced_outgoing__",
    e$ = "__bespoke_marp_transition_reduced_incoming__",
    ey = {
      forward: { both: void 0, incoming: { name: e$ }, outgoing: { name: ev } },
      backward: {
        both: void 0,
        incoming: { name: e$ },
        outgoing: { name: ev },
      },
    },
    eh = (e) => {
      if (!document.createDocumentTransition) return;
      let t = (t) => (void 0 !== t && (e._tD = t), e._tD),
        n;
      t(!1);
      let r = (e, n) => {
        requestAnimationFrame(async () => {
          t(e);
          try {
            await n();
          } catch (r) {
            console.warn(r);
          } finally {
            t(!1);
          }
        });
      };
      ((...e) => {
        let t = [...new Set(e).values()];
        return Promise.all(t.map((e) => ed(e))).then();
      })(
        ...Array.from(
          document.querySelectorAll(
            "section[data-transition], section[data-transition-back]"
          )
        ).flatMap((e) =>
          [e.dataset.transition, e.dataset.transitionBack]
            .flatMap((e) => {
              let t = ef(e);
              return [
                null == t ? void 0 : t.name,
                (null == t ? void 0 : t.builtinFallback)
                  ? `__builtin__${t.name}`
                  : void 0,
              ];
            })
            .filter((e) => !!e)
        )
      ).then(() => {
        document.querySelectorAll("style").forEach((e) => {
          e.innerHTML = e.innerHTML.replace(
            /--marp-transition-duration:[^;}]*[;}]/g,
            (e) => e.slice(0, -1) + "!important" + e.slice(-1)
          );
        });
      });
      let a =
        (n, { back: a, cond: i }) =>
        (o) => {
          var l;
          let s = t();
          if (s)
            return (
              !!o._tA || !("object" != typeof s || (s.abandon(), !o.forSync))
            );
          if (!i(o)) return !0;
          let d = e.slides[e.slide()],
            c = () => {
              var e;
              return null !== (e = o.back) && void 0 !== e ? e : a;
            },
            u = "data-transition" + (c() ? "-back" : ""),
            f = d.querySelector(`section[${u}]`);
          if (!f) return !0;
          let p = ef(
            null !== (l = f.getAttribute(u)) && void 0 !== l ? l : void 0
          );
          return (
            !p ||
            ((async (e, { builtinFallback: t = !0 } = {}) => {
              let n = await ed(e);
              if (ec(n)) {
                if (!t) return;
                return (n = await ed(`__builtin__${e}`)), ec(n) ? void 0 : n;
              }
              return n;
            })(p.name, { builtinFallback: p.builtinFallback }).then((e) => {
              if (!e) return r(!0, () => n(o));
              let a = e;
              em.matches &&
                (console.warn(
                  "Use a constant animation to transition because preferring reduced motion by viewer has detected. "
                ),
                (a = ey));
              let i = document.getElementById(ep);
              i && i.remove();
              let l = document.createElement("style");
              (l.id = ep),
                document.head.appendChild(l),
                ((e, t) => {
                  let n = [`:root{${ei("direction")}:${t.backward ? -1 : 1};}`],
                    r = (t) => {
                      var n, a, i;
                      let o =
                        (null === (n = e[t].both) || void 0 === n
                          ? void 0
                          : n.defaultDuration) ||
                        (null === (a = e[t].outgoing) || void 0 === a
                          ? void 0
                          : a.defaultDuration) ||
                        (null === (i = e[t].incoming) || void 0 === i
                          ? void 0
                          : i.defaultDuration);
                      return "forward" === t ? o : o || r("forward");
                    },
                    a = t.duration || r(t.backward ? "backward" : "forward");
                  void 0 !== a &&
                    n.push(`::page-transition-container(*){${el}:${a};}`);
                  let i = (e) =>
                    Object.entries(e)
                      .map(([e, t]) => `${e}:${t};`)
                      .join("");
                  return (
                    n.push(
                      `::page-transition-outgoing-image(root){${i(
                        eu(e, { ...t, type: "outgoing" })
                      )}}`,
                      `::page-transition-incoming-image(root){${i(
                        eu(e, { ...t, type: "incoming" })
                      )}}`
                    ),
                    n
                  );
                })(a, { backward: c(), duration: p.duration }).forEach((e) => {
                  var t;
                  return null === (t = l.sheet) || void 0 === t
                    ? void 0
                    : t.insertRule(e);
                });
              try {
                let s = document.createDocumentTransition(),
                  d = document.documentElement.classList;
                d.add(eg);
                let u = !1,
                  f = () => {
                    u || (n(o), (u = !0), d.remove(eg));
                  };
                r(s, async () => {
                  try {
                    await s.start(f);
                  } catch (e) {
                    console.error(e), f();
                  } finally {
                    l.remove(), d.remove(eg);
                  }
                });
              } catch (g) {
                t(!1);
              }
            }),
            !1)
          );
        };
      e.on(
        "prev",
        a((t) => e.prev({ ...t, _tA: !0 }), {
          back: !0,
          cond(e) {
            var t;
            return (
              e.index > 0 &&
              !(
                (null === (t = e.fragment) || void 0 === t || t) &&
                n.fragmentIndex > 0
              )
            );
          },
        })
      ),
        e.on(
          "next",
          a((t) => e.next({ ...t, _tA: !0 }), {
            cond: (t) =>
              t.index + 1 < e.slides.length &&
              !(n.fragmentIndex + 1 < n.fragments.length),
          })
        ),
        setTimeout(() => {
          e.on(
            "slide",
            a((t) => e.slide(t.index, { ...t, _tA: !0 }), {
              cond(t) {
                let n = e.slide();
                return t.index !== n && ((t.back = t.index < n), !0);
              },
            })
          );
        }, 0),
        e.on("fragment", (e) => {
          n = e;
        });
    },
    eb,
    e_ = () => (
      void 0 === eb && (eb = "wakeLock" in navigator && navigator.wakeLock), eb
    ),
    ex = async () => {
      let e = e_();
      if (e)
        try {
          return await e.request("screen");
        } catch (t) {
          console.warn(t);
        }
      return null;
    },
    ek = async () => {
      if (!e_()) return;
      let e,
        t = () => {
          e && "visible" === document.visibilityState && ex();
        };
      for (let n of ["visibilitychange", "fullscreenchange"])
        document.addEventListener(n, t);
      return (e = await ex());
    };
  ((t = document.getElementById("p")) => {
    var i, o, c, u, f, p, g, $, y, h, _, k;
    (() => {
      let t = s("view");
      e.dataset.bespokeView = t === r || t === n ? t : "";
    })();
    let S =
      ((e) => {
        let t = s(e);
        return d({ [e]: void 0 }), t;
      })("sync") || void 0;
    (i = t),
      (o = ((...e) => {
        let t = a.findIndex((e) => l() === e);
        return e.map(([e, n]) => e[t] && n).filter((e) => e);
      })(
        [[1, 1, 0], j({ key: S })],
        [[1, 1, 1], U(t)],
        [[1, 1, 0], w],
        [[1, 1, 1], m],
        [[1, 0, 0], x()],
        [[1, 1, 1], E],
        [[1, 1, 1], Y({ history: !1 })],
        [[1, 1, 0], L()],
        [[1, 1, 0], b],
        [[1, 0, 0], W],
        [[1, 1, 0], ee()],
        [[1, 0, 0], P()],
        [[1, 0, 0], eh],
        [[1, 1, 1], v],
        [[1, 1, 0], ek]
      )),
      (u =
        1 === (i.parent || i).nodeType
          ? i.parent || i
          : document.querySelector(i.parent || i)),
      (f = [].filter.call(
        "string" == typeof i.slides
          ? u.querySelectorAll(i.slides)
          : i.slides || u.children,
        function (e) {
          return "SCRIPT" !== e.nodeName;
        }
      )),
      (p = {}),
      (g = function (e, t) {
        return ((t = t || {}).index = f.indexOf(e)), (t.slide = e), t;
      }),
      (h = function (e, t) {
        f[e] &&
          (c && y("deactivate", g(c, t)), y("activate", g((c = f[e]), t)));
      }),
      (_ = function (e, t) {
        var n = f.indexOf(c) + e;
        y(e > 0 ? "next" : "prev", g(c, t)) && h(n, t);
      }),
      (k = {
        off: ($ = function (e, t) {
          p[e] = (p[e] || []).filter(function (e) {
            return e !== t;
          });
        }),
        on: function (e, t) {
          return (p[e] || (p[e] = [])).push(t), $.bind(null, e, t);
        },
        fire: (y = function (e, t) {
          return (p[e] || []).reduce(function (e, n) {
            return e && !1 !== n(t);
          }, !0);
        }),
        slide: function (e, t) {
          if (!arguments.length) return f.indexOf(c);
          y("slide", g(f[e], t)) && h(e, t);
        },
        next: _.bind(null, 1),
        prev: _.bind(null, -1),
        parent: u,
        slides: f,
        destroy: function (e) {
          y("destroy", g(c, e)), (p = {});
        },
      }),
      (o || []).forEach(function (e) {
        e(k);
      }),
      c || h(0);
  })();
})();
