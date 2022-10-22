/*!! License: https://unpkg.com/@marp-team/marp-cli@2.2.0/lib/bespoke.js.LICENSE.txt */
! function () {
    "use strict";
    "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    const e = document.body,
        t = (...e) => history.replaceState(...e),
        n = "presenter",
        r = "next",
        o = ["", n, r],
        a = "data-bespoke-marp-",
        i = (e, {
            protocol: t,
            host: n,
            pathname: r,
            hash: o
        } = location) => {
            const a = e.toString();
            return `${t}//${n}${r}${a ? "?" : ""}${a}${o}`
        },
        s = () => e.dataset.bespokeView,
        l = e => new URLSearchParams(location.search).get(e),
        c = (e, n = {}) => {
            var r;
            const o = {
                location,
                setter: t,
                ...n
            },
                a = new URLSearchParams(o.location.search);
            for (const t of Object.keys(e)) {
                const n = e[t];
                "string" == typeof n ? a.set(t, n) : a.delete(t)
            }
            try {
                o.setter({
                    ...null !== (r = window.history.state) && void 0 !== r ? r : {}
                }, "", i(a, o.location))
            } catch (e) {
                console.error(e)
            }
        },
        d = (() => {
            const e = "bespoke-marp";
            try {
                return localStorage.setItem(e, e), localStorage.removeItem(e), !0
            } catch (e) {
                return !1
            }
        })(),
        u = e => {
            try {
                return localStorage.getItem(e)
            } catch (e) {
                return null
            }
        },
        f = (e, t) => {
            try {
                return localStorage.setItem(e, t), !0
            } catch (e) {
                return !1
            }
        },
        m = e => {
            try {
                return localStorage.removeItem(e), !0
            } catch (e) {
                return !1
            }
        },
        g = (e, t) => {
            const n = "aria-hidden";
            t ? e.setAttribute(n, "true") : e.removeAttribute(n)
        },
        p = e => {
            e.parent.classList.add("bespoke-marp-parent"), e.slides.forEach((e => e.classList.add("bespoke-marp-slide"))), e.on("activate", (t => {
                const n = "bespoke-marp-active",
                    r = t.slide,
                    o = r.classList,
                    a = !o.contains(n);
                if (e.slides.forEach((e => {
                    e.classList.remove(n), g(e, !0)
                })), o.add(n), g(r, !1), a) {
                    const e = `${n}-ready`;
                    o.add(e), document.body.clientHeight, o.remove(e)
                }
            }))
        },
        v = e => {
            let t = 0,
                n = 0;
            Object.defineProperty(e, "fragments", {
                enumerable: !0,
                value: e.slides.map((e => [null, ...e.querySelectorAll("[data-marpit-fragment]")]))
            });
            const r = r => void 0 !== e.fragments[t][n + r],
                o = (r, o) => {
                    t = r, n = o, e.fragments.forEach(((e, t) => {
                        e.forEach(((e, n) => {
                            if (null == e) return;
                            const i = t < r || t === r && n <= o;
                            e.setAttribute(`${a}fragment`, (i ? "" : "in") + "active");
                            const s = `${a}current-fragment`;
                            t === r && n === o ? e.setAttribute(s, "current") : e.removeAttribute(s)
                        }))
                    })), e.fragmentIndex = o;
                    const i = {
                        slide: e.slides[r],
                        index: r,
                        fragments: e.fragments[r],
                        fragmentIndex: o
                    };
                    e.fire("fragment", i)
                };
            e.on("next", (({
                fragment: a = !0
            }) => {
                if (a) {
                    if (r(1)) return o(t, n + 1), !1;
                    const a = t + 1;
                    e.fragments[a] && o(a, 0)
                } else {
                    const r = e.fragments[t].length;
                    if (n + 1 < r) return o(t, r - 1), !1;
                    const a = e.fragments[t + 1];
                    a && o(t + 1, a.length - 1)
                }
            })), e.on("prev", (({
                fragment: a = !0
            }) => {
                if (r(-1) && a) return o(t, n - 1), !1;
                const i = t - 1;
                e.fragments[i] && o(i, e.fragments[i].length - 1)
            })), e.on("slide", (({
                index: t,
                fragment: n
            }) => {
                let r = 0;
                if (void 0 !== n) {
                    const o = e.fragments[t];
                    if (o) {
                        const {
                            length: e
                        } = o;
                        r = -1 === n ? e - 1 : Math.min(Math.max(n, 0), e - 1)
                    }
                }
                o(t, r)
            })), o(0, 0)
        },
        h = document,
        y = () => !(!h.fullscreenEnabled && !h.webkitFullscreenEnabled),
        b = () => !(!h.fullscreenElement && !h.webkitFullscreenElement),
        w = e => {
            e.fullscreen = () => {
                y() && (async () => {
                    return b() ? null === (e = h.exitFullscreen || h.webkitExitFullscreen) || void 0 === e ? void 0 : e.call(h) : ((e = h.body) => {
                        var t;
                        return null === (t = e.requestFullscreen || e.webkitRequestFullscreen) || void 0 === t ? void 0 : t.call(e)
                    })();
                    var e
                })()
            }, document.addEventListener("keydown", (t => {
                "f" !== t.key && "F11" !== t.key || t.altKey || t.ctrlKey || t.metaKey || !y() || (e.fullscreen(), t.preventDefault())
            }))
        },
        x = "bespoke-marp-inactive",
        k = (e = 2e3) => ({
            parent: t,
            fire: n
        }) => {
            const r = t.classList,
                o = e => n(`marp-${e ? "" : "in"}active`);
            let a;
            const i = () => {
                a && clearTimeout(a), a = setTimeout((() => {
                    r.add(x), o()
                }), e), r.contains(x) && (r.remove(x), o(!0))
            };
            for (const e of ["mousedown", "mousemove", "touchend"]) document.addEventListener(e, i);
            setTimeout(i, 0)
        },
        E = ["AUDIO", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "VIDEO"],
        $ = e => {
            e.parent.addEventListener("keydown", (e => {
                if (!e.target) return;
                const t = e.target;
                (E.includes(t.nodeName) || "true" === t.contentEditable) && e.stopPropagation()
            }))
        },
        L = e => {
            window.addEventListener("load", (() => {
                for (const t of e.slides) {
                    const e = t.querySelector("marp-auto-scaling, [data-auto-scaling], [data-marp-fitting]");
                    t.setAttribute(`${a}load`, e ? "" : "hideable")
                }
            }))
        },
        S = ({
            interval: e = 250
        } = {}) => t => {
            document.addEventListener("keydown", (e => {
                if (" " === e.key && e.shiftKey) t.prev();
                else if ("ArrowLeft" === e.key || "ArrowUp" === e.key || "PageUp" === e.key) t.prev({
                    fragment: !e.shiftKey
                });
                else if (" " !== e.key || e.shiftKey)
                    if ("ArrowRight" === e.key || "ArrowDown" === e.key || "PageDown" === e.key) t.next({
                        fragment: !e.shiftKey
                    });
                    else if ("End" === e.key) t.slide(t.slides.length - 1, {
                        fragment: -1
                    });
                    else {
                        if ("Home" !== e.key) return;
                        t.slide(0)
                    } else t.next();
                e.preventDefault()
            }));
            let n, r, o = 0;
            t.parent.addEventListener("wheel", (a => {
                let i = !1;
                const s = (e, t) => {
                    e && (i = i || ((e, t) => ((e, t) => {
                        const n = "X" === t ? "Width" : "Height";
                        return e[`client${n}`] < e[`scroll${n}`]
                    })(e, t) && ((e, t) => {
                        const {
                            overflow: n
                        } = e, r = e[`overflow${t}`];
                        return "auto" === n || "scroll" === n || "auto" === r || "scroll" === r
                    })(getComputedStyle(e), t))(e, t)), (null == e ? void 0 : e.parentElement) && s(e.parentElement, t)
                };
                if (0 !== a.deltaX && s(a.target, "X"), 0 !== a.deltaY && s(a.target, "Y"), i) return;
                a.preventDefault();
                const l = Math.sqrt(a.deltaX ** 2 + a.deltaY ** 2);
                if (void 0 !== a.wheelDelta) {
                    if (void 0 === a.webkitForce && Math.abs(a.wheelDelta) < 40) return;
                    if (a.deltaMode === a.DOM_DELTA_PIXEL && l < 4) return
                } else if (a.deltaMode === a.DOM_DELTA_PIXEL && l < 12) return;
                r && clearTimeout(r), r = setTimeout((() => {
                    n = 0
                }), e);
                const c = Date.now() - o < e,
                    d = l <= n;
                if (n = l, c || d) return;
                let u;
                (a.deltaX > 0 || a.deltaY > 0) && (u = "next"), (a.deltaX < 0 || a.deltaY < 0) && (u = "prev"), u && (t[u](), o = Date.now())
            }))
        },
        P = (e = ".bespoke-marp-osc") => {
            const t = document.querySelector(e);
            if (!t) return () => { };
            const n = (e, n) => {
                t.querySelectorAll(`[${a}osc=${JSON.stringify(e)}]`).forEach(n)
            };
            return y() || n("fullscreen", (e => e.style.display = "none")), d || n("presenter", (e => {
                e.disabled = !0, e.title = "Presenter view is disabled due to restricted localStorage."
            })), e => {
                t.addEventListener("click", (t => {
                    if (t.target instanceof HTMLElement) {
                        const {
                            bespokeMarpOsc: n
                        } = t.target.dataset;
                        n && t.target.blur();
                        const r = {
                            fragment: !t.shiftKey
                        };
                        "next" === n ? e.next(r) : "prev" === n ? e.prev(r) : "fullscreen" === n ? null == e || e.fullscreen() : "presenter" === n && e.openPresenterView()
                    }
                })), e.parent.appendChild(t), e.on("activate", (({
                    index: t
                }) => {
                    n("page", (n => n.textContent = `Page ${t + 1} of ${e.slides.length}`))
                })), e.on("fragment", (({
                    index: t,
                    fragments: r,
                    fragmentIndex: o
                }) => {
                    n("prev", (e => e.disabled = 0 === t && 0 === o)), n("next", (n => n.disabled = t === e.slides.length - 1 && o === r.length - 1))
                })), e.on("marp-active", (() => g(t, !1))), e.on("marp-inactive", (() => g(t, !0))), y() && (e => {
                    for (const t of ["", "webkit"]) h.addEventListener(t + "fullscreenchange", e)
                })((() => n("fullscreen", (e => e.classList.toggle("exit", y() && b())))))
            }
        },
        T = e => {
            window.addEventListener("message", (t => {
                if (t.origin !== window.origin) return;
                const [n, r] = t.data.split(":");
                if ("navigate" === n) {
                    const [t, n] = r.split(",");
                    let o = Number.parseInt(t, 10),
                        a = Number.parseInt(n, 10) + 1;
                    a >= e.fragments[o].length && (o += 1, a = 0), e.slide(o, {
                        fragment: a
                    })
                }
            }))
        };
    var _, I, A, M, D, O, C = {
        exports: {}
    };
    C.exports = (_ = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"], I = function (e) {
        return String(e).replace(/[&<>"']/g, (function (e) {
            return "&" + A[e] + ";"
        }))
    }, A = {
        "&": "amp",
        "<": "lt",
        ">": "gt",
        '"': "quot",
        "'": "apos"
    }, M = "dangerouslySetInnerHTML", D = {
        className: "class",
        htmlFor: "for"
    }, O = {}, function (e, t) {
        var n = [],
            r = "";
        t = t || {};
        for (var o = arguments.length; o-- > 2;) n.push(arguments[o]);
        if ("function" == typeof e) return t.children = n.reverse(), e(t);
        if (e) {
            if (r += "<" + e, t)
                for (var a in t) !1 !== t[a] && null != t[a] && a !== M && (r += " " + (D[a] ? D[a] : I(a)) + '="' + I(t[a]) + '"');
            r += ">"
        }
        if (-1 === _.indexOf(e)) {
            if (t[M]) r += t[M].__html;
            else
                for (; n.length;) {
                    var i = n.pop();
                    if (i)
                        if (i.pop)
                            for (var s = i.length; s--;) n.push(i[s]);
                        else r += !0 === O[i] ? i : I(i)
                }
            r += e ? "</" + e + ">" : ""
        }
        return O[r] = !0, r
    });
    var N = C.exports;
    const B = ({
        children: e
    }) => N(null, null, ...e),
        q = "bespoke-marp-presenter-",
        K = {
            container: `${q}container`,
            dragbar: `${q}dragbar-container`,
            next: `${q}next`,
            nextContainer: `${q}next-container`,
            noteContainer: `${q}note-container`,
            noteWrapper: `${q}note-wrapper`,
            noteButtons: `${q}note-buttons`,
            infoContainer: `${q}info-container`,
            infoPage: `${q}info-page`,
            infoPageText: `${q}info-page-text`,
            infoPagePrev: `${q}info-page-prev`,
            infoPageNext: `${q}info-page-next`,
            noteButtonsBigger: `${q}note-bigger`,
            noteButtonsSmaller: `${q}note-smaller`,
            infoTime: `${q}info-time`,
            infoTimer: `${q}info-timer`
        },
        F = e => {
            const {
                title: t
            } = document;
            document.title = "[Presenter view]" + (t ? ` - ${t}` : "");
            const n = {},
                r = e => (n[e] = n[e] || document.querySelector(`.${e}`), n[e]);
            document.body.appendChild((e => {
                const t = document.createElement("div");
                return t.className = K.container, t.appendChild(e), t.insertAdjacentHTML("beforeend", N(B, null, N("div", {
                    class: K.nextContainer
                }, N("iframe", {
                    class: K.next,
                    src: "?view=next"
                })), N("div", {
                    class: K.dragbar
                }), N("div", {
                    class: K.noteContainer
                }, N("div", {
                    class: K.noteWrapper
                }), N("div", {
                    class: K.noteButtons
                }, N("button", {
                    class: K.noteButtonsSmaller,
                    tabindex: "-1",
                    title: "Smaller notes font size"
                }, "Smaller notes font size"), N("button", {
                    class: K.noteButtonsBigger,
                    tabindex: "-1",
                    title: "Bigger notes font size"
                }, "Bigger notes font size"))), N("div", {
                    class: K.infoContainer
                }, N("div", {
                    class: K.infoPage
                }, N("button", {
                    class: K.infoPagePrev,
                    tabindex: "-1",
                    title: "Previous"
                }, "Previous"), N("span", {
                    class: K.infoPageText
                }), N("button", {
                    class: K.infoPageNext,
                    tabindex: "-1",
                    title: "Next"
                }, "Next")), N("time", {
                    class: K.infoTime,
                    title: "Current time"
                }), N("time", {
                    class: K.infoTimer,
                    title: "Timer"
                })))), t
            })(e.parent)), (e => {
                let t = !1;
                r(K.dragbar).addEventListener("mousedown", (() => {
                    t = !0, r(K.dragbar).classList.add("active")
                })), window.addEventListener("mouseup", (() => {
                    t = !1, r(K.dragbar).classList.remove("active")
                })), window.addEventListener("mousemove", (e => {
                    if (!t) return;
                    const n = e.clientX / document.documentElement.clientWidth * 100;
                    r(K.container).style.setProperty("--bespoke-marp-presenter-split-ratio", `${Math.max(0, Math.min(100, n))}%`)
                })), r(K.nextContainer).addEventListener("click", (() => e.next()));
                const n = r(K.next),
                    o = (a = n, (e, t) => {
                        var n;
                        return null === (n = a.contentWindow) || void 0 === n ? void 0 : n.postMessage(`navigate:${e},${t}`, "null" === window.origin ? "*" : window.origin)
                    });
                var a;
                n.addEventListener("load", (() => {
                    r(K.nextContainer).classList.add("active"), o(e.slide(), e.fragmentIndex), e.on("fragment", (({
                        index: e,
                        fragmentIndex: t
                    }) => o(e, t)))
                }));
                const i = document.querySelectorAll(".bespoke-marp-note");
                i.forEach((e => {
                    e.addEventListener("keydown", (e => e.stopPropagation())), r(K.noteWrapper).appendChild(e)
                })), e.on("activate", (() => i.forEach((t => t.classList.toggle("active", t.dataset.index == e.slide())))));
                let s = 0;
                const l = e => {
                    s = Math.max(-5, s + e), r(K.noteContainer).style.setProperty("--bespoke-marp-note-font-scale", (1.2 ** s).toFixed(4))
                },
                    c = () => l(1),
                    d = () => l(-1),
                    u = r(K.noteButtonsBigger),
                    f = r(K.noteButtonsSmaller);
                u.addEventListener("click", (() => {
                    u.blur(), c()
                })), f.addEventListener("click", (() => {
                    f.blur(), d()
                })), document.addEventListener("keydown", (e => {
                    "+" === e.key && c(), "-" === e.key && d()
                }), !0), e.on("activate", (({
                    index: t
                }) => {
                    r(K.infoPageText).textContent = `${t + 1} / ${e.slides.length}`
                }));
                const m = r(K.infoPagePrev),
                    g = r(K.infoPageNext);
                m.addEventListener("click", (t => {
                    m.blur(), e.prev({
                        fragment: !t.shiftKey
                    })
                })), g.addEventListener("click", (t => {
                    g.blur(), e.next({
                        fragment: !t.shiftKey
                    })
                })), e.on("fragment", (({
                    index: t,
                    fragments: n,
                    fragmentIndex: r
                }) => {
                    m.disabled = 0 === t && 0 === r, g.disabled = t === e.slides.length - 1 && r === n.length - 1
                }));
                let p = new Date;
                const v = () => {
                    const e = new Date,
                        t = e => `${Math.floor(e)}`.padStart(2, "0"),
                        n = e.getTime() - p.getTime(),
                        o = t(n / 1e3 % 60),
                        a = t(n / 1e3 / 60 % 60),
                        i = t(n / 36e5 % 24);
                    r(K.infoTime).textContent = e.toLocaleTimeString(), r(K.infoTimer).textContent = `${i}:${a}:${o}`
                };
                v(), setInterval(v, 250), r(K.infoTimer).addEventListener("click", (() => {
                    p = new Date
                }))
            })(e)
        },
        j = e => {
            if (!(e => e.syncKey && "string" == typeof e.syncKey)(e)) throw new Error("The current instance of Bespoke.js is invalid for Marp bespoke presenter plugin.");
            Object.defineProperties(e, {
                openPresenterView: {
                    enumerable: !0,
                    value: U
                },
                presenterUrl: {
                    enumerable: !0,
                    get: V
                }
            }), d && document.addEventListener("keydown", (t => {
                "p" !== t.key || t.altKey || t.ctrlKey || t.metaKey || (t.preventDefault(), e.openPresenterView())
            }))
        };

    function U() {
        const {
            max: e,
            floor: t
        } = Math, n = e(t(.85 * window.innerWidth), 640), r = e(t(.85 * window.innerHeight), 360);
        return window.open(this.presenterUrl, q + this.syncKey, `width=${n},height=${r},menubar=no,toolbar=no`)
    }

    function V() {
        const e = new URLSearchParams(location.search);
        return e.set("view", "presenter"), e.set("sync", this.syncKey), i(e)
    }
    const X = e => {
        const t = s();
        return t === r && e.appendChild(document.createElement("span")), {
            "": j,
            [n]: F,
            [r]: T
        }[t]
    },
        H = e => {
            e.on("activate", (t => {
                document.querySelectorAll(".bespoke-progress-parent > .bespoke-progress-bar").forEach((n => {
                    n.style.flexBasis = 100 * t.index / (e.slides.length - 1) + "%"
                }))
            }))
        },
        R = e => {
            const t = Number.parseInt(e, 10);
            return Number.isNaN(t) ? null : t
        },
        W = (e = {}) => {
            const t = {
                history: !0,
                ...e
            };
            return e => {
                let n = !0;
                const r = e => {
                    const t = n;
                    try {
                        return n = !0, e()
                    } finally {
                        n = t
                    }
                },
                    o = (t = {
                        fragment: !0
                    }) => {
                        ((t, n) => {
                            const {
                                min: r,
                                max: o
                            } = Math, {
                                fragments: a,
                                slides: i
                            } = e, s = o(0, r(t, i.length - 1)), l = o(0, r(n || 0, a[s].length - 1));
                            s === e.slide() && l === e.fragmentIndex || e.slide(s, {
                                fragment: l
                            })
                        })((R(location.hash.slice(1)) || 1) - 1, t.fragment ? R(l("f") || "") : null)
                    };
                e.on("fragment", (({
                    index: e,
                    fragmentIndex: r
                }) => {
                    n || c({
                        f: 0 === r || r.toString()
                    }, {
                        location: {
                            ...location,
                            hash: `#${e + 1}`
                        },
                        setter: (...e) => t.history ? history.pushState(...e) : history.replaceState(...e)
                    })
                })), setTimeout((() => {
                    o(), window.addEventListener("hashchange", (() => r((() => {
                        o({
                            fragment: !1
                        }), c({
                            f: void 0
                        })
                    })))), window.addEventListener("popstate", (() => {
                        n || r((() => o()))
                    })), n = !1
                }), 0)
            }
        },
        J = (e = {}) => {
            var n;
            const r = e.key || (null === (n = window.history.state) || void 0 === n ? void 0 : n.marpBespokeSyncKey) || Math.random().toString(36).slice(2),
                o = `bespoke-marp-sync-${r}`;
            var a;
            a = {
                marpBespokeSyncKey: r
            }, c({}, {
                setter: (e, ...n) => t({
                    ...e,
                    ...a
                }, ...n)
            });
            const i = () => {
                const e = u(o);
                return e ? JSON.parse(e) : Object.create(null)
            },
                s = e => {
                    const t = i(),
                        n = {
                            ...t,
                            ...e(t)
                        };
                    return f(o, JSON.stringify(n)), n
                },
                l = () => {
                    window.removeEventListener("pageshow", l), s((e => ({
                        reference: (e.reference || 0) + 1
                    })))
                };
            return e => {
                l(), Object.defineProperty(e, "syncKey", {
                    value: r,
                    enumerable: !0
                });
                let t = !0;
                setTimeout((() => {
                    e.on("fragment", (e => {
                        t && s((() => ({
                            index: e.index,
                            fragmentIndex: e.fragmentIndex
                        })))
                    }))
                }), 0), window.addEventListener("storage", (n => {
                    if (n.key === o && n.oldValue && n.newValue) {
                        const r = JSON.parse(n.oldValue),
                            o = JSON.parse(n.newValue);
                        if (r.index !== o.index || r.fragmentIndex !== o.fragmentIndex) try {
                            t = !1, e.slide(o.index, {
                                fragment: o.fragmentIndex,
                                forSync: !0
                            })
                        } finally {
                                t = !0
                            }
                    }
                }));
                const n = () => {
                    const {
                        reference: e
                    } = i();
                    void 0 === e || e <= 1 ? m(o) : s((() => ({
                        reference: e - 1
                    })))
                };
                window.addEventListener("pagehide", (e => {
                    e.persisted && window.addEventListener("pageshow", l), n()
                })), e.on("destroy", n)
            }
        },
        {
            PI: Y,
            abs: z,
            sqrt: G,
            atan2: Q
        } = Math,
        Z = {
            passive: !0
        },
        ee = ({
            slope: e = -.7,
            swipeThreshold: t = 30
        } = {}) => n => {
            let r;
            const o = n.parent,
                a = e => {
                    const t = o.getBoundingClientRect();
                    return {
                        x: e.pageX - (t.left + t.right) / 2,
                        y: e.pageY - (t.top + t.bottom) / 2
                    }
                };
            o.addEventListener("touchstart", (({
                touches: e
            }) => {
                r = 1 === e.length ? a(e[0]) : void 0
            }), Z), o.addEventListener("touchmove", (e => {
                if (r)
                    if (1 === e.touches.length) {
                        e.preventDefault();
                        const t = a(e.touches[0]),
                            n = t.x - r.x,
                            o = t.y - r.y;
                        r.delta = G(z(n) ** 2 + z(o) ** 2), r.radian = Q(n, o)
                    } else r = void 0
            })), o.addEventListener("touchend", (o => {
                if (r) {
                    if (r.delta && r.delta >= t && r.radian) {
                        const t = (r.radian - e + Y) % (2 * Y) - Y;
                        n[t < 0 ? "next" : "prev"](), o.stopPropagation()
                    }
                    r = void 0
                }
            }), Z)
        },
        te = new Map;
    te.clear(), te.set("none", {
        backward: {
            both: void 0,
            incoming: void 0,
            outgoing: void 0
        },
        forward: {
            both: void 0,
            incoming: void 0,
            outgoing: void 0
        }
    });
    const ne = {
        both: "",
        outgoing: "outgoing-",
        incoming: "incoming-"
    },
        re = {
            forward: "",
            backward: "-backward"
        },
        oe = e => `--marp-bespoke-transition-animation-${e}`,
        ae = e => `--marp-transition-${e}`,
        ie = oe("name"),
        se = oe("duration"),
        le = e => new Promise((t => {
            const n = {},
                r = document.createElement("div"),
                o = e => {
                    r.remove(), t(e)
                };
            r.addEventListener("animationstart", (() => o(n))), Object.assign(r.style, {
                animationName: e,
                animationDuration: "1s",
                animationFillMode: "both",
                animationPlayState: "paused",
                position: "absolute",
                pointerEvents: "none"
            }), document.body.appendChild(r);
            const a = getComputedStyle(r).getPropertyValue(ae("duration"));
            a && (n.defaultDuration = a), ((e, t) => {
                requestAnimationFrame((() => {
                    e.style.animationPlayState = "running", requestAnimationFrame((() => t(void 0)))
                }))
            })(r, o)
        })),
        ce = async e => te.has(e) ? te.get(e) : (e => {
            const t = {},
                n = [];
            for (const [r, o] of Object.entries(ne))
                for (const [a, i] of Object.entries(re)) {
                    const s = `marp-${o}transition${i}-${e}`;
                    n.push(le(s).then((e => {
                        t[a] = t[a] || {}, t[a][r] = e ? {
                            ...e,
                            name: s
                        } : void 0
                    })))
                }
            return Promise.all(n).then((() => t))
        })(e).then((t => (te.set(e, t), t))), de = e => Object.values(e).flatMap(Object.values).every((e => !e)), ue = (e, {
            type: t,
            backward: n
        }) => {
            const r = e[n ? "backward" : "forward"],
                o = (() => {
                    const e = r[t],
                        n = e => ({
                            [ie]: e.name
                        });
                    if (e) return n(e);
                    if (r.both) {
                        const e = n(r.both);
                        return "incoming" === t && (e[oe("direction")] = "reverse"), e
                    }
                })();
            return !o && n ? ue(e, {
                type: t,
                backward: !1
            }) : o || {
                [ie]: "__bespoke_marp_transition_no_animation__"
            }
        }, fe = e => {
            if (e) try {
                const t = JSON.parse(e);
                if ((e => {
                    if ("object" != typeof e) return !1;
                    const t = e;
                    return "string" == typeof t.name && (void 0 === t.duration || "string" == typeof t.duration)
                })(t)) return t
            } catch (e) { }
        }, me = "_tSId", ge = "_tA", pe = "bespoke-marp-transition-warming-up", ve = window.matchMedia("(prefers-reduced-motion: reduce)"), he = "__bespoke_marp_transition_reduced_outgoing__", ye = "__bespoke_marp_transition_reduced_incoming__", be = {
            forward: {
                both: void 0,
                incoming: {
                    name: ye
                },
                outgoing: {
                    name: he
                }
            },
            backward: {
                both: void 0,
                incoming: {
                    name: ye
                },
                outgoing: {
                    name: he
                }
            }
        }, we = e => {
            if (!document.createDocumentTransition) return;
            const t = t => (void 0 !== t && (e._tD = t), e._tD);
            let n;
            t(!1);
            const r = (e, n) => {
                requestAnimationFrame((async () => {
                    t(e);
                    try {
                        await n()
                    } catch (e) {
                        console.warn(e)
                    } finally {
                        t(!1)
                    }
                }))
            };
            ((...e) => {
                const t = [...new Set(e).values()];
                return Promise.all(t.map((e => ce(e)))).then()
            })(...Array.from(document.querySelectorAll("section[data-transition], section[data-transition-back]")).flatMap((e => [e.dataset.transition, e.dataset.transitionBack].flatMap((e => {
                const t = fe(e);
                return [null == t ? void 0 : t.name, (null == t ? void 0 : t.builtinFallback) ? `__builtin__${t.name}` : void 0]
            })).filter((e => !!e))))).then((() => {
                document.querySelectorAll("style").forEach((e => {
                    e.innerHTML = e.innerHTML.replace(/--marp-transition-duration:[^;}]*[;}]/g, (e => e.slice(0, -1) + "!important" + e.slice(-1)))
                }))
            }));
            const o = (n, {
                back: o,
                cond: a
            }) => i => {
                var s;
                const l = t();
                if (l) return !!i._tA || !("object" != typeof l || (l.abandon(), !i.forSync));
                if (!a(i)) return !0;
                const c = e.slides[e.slide()],
                    d = () => {
                        var e;
                        return null !== (e = i.back) && void 0 !== e ? e : o
                    },
                    u = "data-transition" + (d() ? "-back" : ""),
                    f = c.querySelector(`section[${u}]`);
                if (!f) return !0;
                const m = fe(null !== (s = f.getAttribute(u)) && void 0 !== s ? s : void 0);
                return !m || ((async (e, {
                    builtinFallback: t = !0
                } = {}) => {
                    let n = await ce(e);
                    if (de(n)) {
                        if (!t) return;
                        return n = await ce(`__builtin__${e}`), de(n) ? void 0 : n
                    }
                    return n
                })(m.name, {
                    builtinFallback: m.builtinFallback
                }).then((e => {
                    if (!e) return r(!0, (() => n(i)));
                    let o = e;
                    ve.matches && (console.warn("Use a constant animation to transition because preferring reduced motion by viewer has detected. "), o = be);
                    const a = document.getElementById(me);
                    a && a.remove();
                    const s = document.createElement("style");
                    s.id = me, document.head.appendChild(s), ((e, t) => {
                        const n = [`:root{${ae("direction")}:${t.backward ? -1 : 1};}`],
                            r = t => {
                                var n, o, a;
                                const i = (null === (n = e[t].both) || void 0 === n ? void 0 : n.defaultDuration) || (null === (o = e[t].outgoing) || void 0 === o ? void 0 : o.defaultDuration) || (null === (a = e[t].incoming) || void 0 === a ? void 0 : a.defaultDuration);
                                return "forward" === t ? i : i || r("forward")
                            },
                            o = t.duration || r(t.backward ? "backward" : "forward");
                        void 0 !== o && n.push(`::page-transition-container(*){${se}:${o};}`);
                        const a = e => Object.entries(e).map((([e, t]) => `${e}:${t};`)).join("");
                        return n.push(`::page-transition-outgoing-image(root){${a(ue(e, { ...t, type: "outgoing" }))}}`, `::page-transition-incoming-image(root){${a(ue(e, { ...t, type: "incoming" }))}}`), n
                    })(o, {
                        backward: d(),
                        duration: m.duration
                    }).forEach((e => {
                        var t;
                        return null === (t = s.sheet) || void 0 === t ? void 0 : t.insertRule(e)
                    }));
                    try {
                        const e = document.createDocumentTransition(),
                            t = document.documentElement.classList;
                        t.add(pe);
                        let o = !1;
                        const a = () => {
                            o || (n(i), o = !0, t.remove(pe))
                        };
                        r(e, (async () => {
                            try {
                                await e.start(a)
                            } catch (e) {
                                console.error(e), a()
                            } finally {
                                s.remove(), t.remove(pe)
                            }
                        }))
                    } catch (e) {
                        t(!1)
                    }
                })), !1)
            };
            e.on("prev", o((t => e.prev({
                ...t,
                [ge]: !0
            })), {
                back: !0,
                cond: e => {
                    var t;
                    return e.index > 0 && !((null === (t = e.fragment) || void 0 === t || t) && n.fragmentIndex > 0)
                }
            })), e.on("next", o((t => e.next({
                ...t,
                [ge]: !0
            })), {
                cond: t => t.index + 1 < e.slides.length && !(n.fragmentIndex + 1 < n.fragments.length)
            })), setTimeout((() => {
                e.on("slide", o((t => e.slide(t.index, {
                    ...t,
                    [ge]: !0
                })), {
                    cond: t => {
                        const n = e.slide();
                        return t.index !== n && (t.back = t.index < n, !0)
                    }
                }))
            }), 0), e.on("fragment", (e => {
                n = e
            }))
        };
    let xe;
    const ke = () => (void 0 === xe && (xe = "wakeLock" in navigator && navigator.wakeLock), xe),
        Ee = async () => {
            const e = ke();
            if (e) try {
                return await e.request("screen")
            } catch (e) {
                console.warn(e)
            }
            return null
        }, $e = async () => {
            if (!ke()) return;
            let e;
            const t = () => {
                e && "visible" === document.visibilityState && Ee()
            };
            for (const e of ["visibilitychange", "fullscreenchange"]) document.addEventListener(e, t);
            return e = await Ee(), e
        };
    ((t = document.getElementById("p")) => {
        (() => {
            const t = l("view");
            e.dataset.bespokeView = t === r || t === n ? t : ""
        })();
        const a = (e => {
            const t = l(e);
            return c({
                [e]: void 0
            }), t
        })("sync") || void 0;
        var i, d, u, f, m, g, h, y, b, x, E, T;
        i = t, d = ((...e) => {
            const t = o.findIndex((e => s() === e));
            return e.map((([e, n]) => e[t] && n)).filter((e => e))
        })([
            [1, 1, 0], J({
                key: a
            })
        ], [
            [1, 1, 1], X(t)
        ], [
            [1, 1, 0], $
        ], [
            [1, 1, 1], p
        ], [
            [1, 0, 0], k()
        ], [
            [1, 1, 1], L
        ], [
            [1, 1, 1], W({
                history: !1
            })
        ], [
            [1, 1, 0], S()
        ], [
            [1, 1, 0], w
        ], [
            [1, 0, 0], H
        ], [
            [1, 1, 0], ee()
        ], [
            [1, 0, 0], P()
        ], [
            [1, 0, 0], we
        ], [
            [1, 1, 1], v
        ], [
            [1, 1, 0], $e
        ]), f = 1 === (i.parent || i).nodeType ? i.parent || i : document.querySelector(i.parent || i), m = [].filter.call("string" == typeof i.slides ? f.querySelectorAll(i.slides) : i.slides || f.children, (function (e) {
            return "SCRIPT" !== e.nodeName
        })), g = {}, h = function (e, t) {
            return (t = t || {}).index = m.indexOf(e), t.slide = e, t
        }, x = function (e, t) {
            m[e] && (u && b("deactivate", h(u, t)), u = m[e], b("activate", h(u, t)))
        }, E = function (e, t) {
            var n = m.indexOf(u) + e;
            b(e > 0 ? "next" : "prev", h(u, t)) && x(n, t)
        }, T = {
            off: y = function (e, t) {
                g[e] = (g[e] || []).filter((function (e) {
                    return e !== t
                }))
            },
            on: function (e, t) {
                return (g[e] || (g[e] = [])).push(t), y.bind(null, e, t)
            },
            fire: b = function (e, t) {
                return (g[e] || []).reduce((function (e, n) {
                    return e && !1 !== n(t)
                }), !0)
            },
            slide: function (e, t) {
                if (!arguments.length) return m.indexOf(u);
                b("slide", h(m[e], t)) && x(e, t)
            },
            next: E.bind(null, 1),
            prev: E.bind(null, -1),
            parent: f,
            slides: m,
            destroy: function (e) {
                b("destroy", h(u, e)), g = {}
            }
        }, (d || []).forEach((function (e) {
            e(T)
        })), u || x(0)
    })()
}();