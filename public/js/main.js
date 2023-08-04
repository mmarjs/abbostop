"use strict";
(globalThis.webpackChunk = globalThis.webpackChunk || []).push([
    [3714], {
        83714: (t, e, a) => {
            a.d(e, {
                K6: () => A,
                P6: () => r,
                Kl: () => n,
                Kf: () => g,
                Sv: () => u
            });
            var s = a(82702);
            class i {
                static attributeEventToggle = "data-event-toggle";
                static attributeEventToggleExecute = "data-event-toggle-execute";
                static attributeSelectToggle = "data-select-toggle";
                static attributeParamToggleBreakpoint = "data-param-toggle-breakpoint";
                static childClassAttributes = [];
                static eventCounter = [];
                static collections = {};
                static toggleGroups = {};
                static execute({
                    attributes: t
                }) {
                    this.childClassAttributes = t, this.toggleGroups = {
                        [this.name]: {}
                    }, document.querySelectorAll(`[${this.attributeEventToggle}]`).forEach((t => {
                        const e = t.getAttribute(this.attributeParamToggleBreakpoint);
                        (() => {
                            const a = t.getAttribute(this.attributeEventToggle);
                            this.updateCollection([t, ...document.querySelectorAll(`[${this.attributeSelectToggle}="${a}"]`)], a).then((s => {
                                if (0 === s.length) return;
                                const i = {
                                    groupId: a,
                                    collections: s,
                                    listener: t,
                                    breakpointName: e,
                                    eventType: "click"
                                };
                                this.toggleGroups[this.name][a] = i, !0 === i.listener.hasAttribute(this.attributeEventToggleExecute) && this.executeEvent(i.listener), i.listener.addEventListener(i.eventType, (t => {
                                    this.executeEvent(t.currentTarget)
                                }), {
                                    passive: !0
                                })
                            }), (t => {
                                throw new Error(t)
                            }))
                        })()
                    }))
                }
                static initToggle({
                    element: t,
                    elementId: e,
                    attribute: a
                }) {
                    return null
                }
                static toggleEvent({
                    groupId: t,
                    elementId: e,
                    element: a,
                    attribute: s,
                    listener: i,
                    eventCounter: l,
                    data: o
                }) {
                    throw new Error(`You have to implement the method toggleEvent for attribute: ${s}`)
                }
                static executeEvent(t) {
                    const e = t.getAttribute(this.attributeEventToggle) || "undefined";
                    if (!(e in this.toggleGroups[this.name])) return;
                    e in this.eventCounter || (this.eventCounter[e] = 0);
                    const a = ++this.eventCounter[e];
                    this.toggleGroups[this.name][e].collections.forEach((t => {
                        s.resolve(t.data).then((s => {
                            this.toggleEvent({
                                groupId: e,
                                elementId: t.elementId,
                                element: t.element,
                                attribute: t.attribute,
                                listener: this.toggleGroups[this.name][e].listener,
                                eventCounter: a,
                                data: s
                            })
                        }))
                    }))
                }
                static updateCollection(t, e) {
                    let a = 0;
                    return this.collections = {
                        ...this.collections,
                        [this.name]: []
                    }, t.forEach((t => {
                        this.childClassAttributes.forEach((s => {
                            [...t.querySelectorAll(`[${s}]`), ...!0 === t.hasAttribute(s) ? [t] : []].forEach((t => {
                                const i = `${e}${a++}`;
                                this.collections[this.name].push({
                                    element: t,
                                    attribute: s,
                                    elementId: i,
                                    data: this.initToggle({
                                        element: t,
                                        elementId: i,
                                        attribute: s
                                    }) || null
                                })
                            }))
                        }))
                    })), s.all(this.collections[this.name])
                }
            }
            var l = a(82702);
            class o {
                static callbackCompleted = "callback-completed";
                static callbackMulti = "callback-multi";
                static replacePreviousWithNew = "replace-previous-with-new";
                static timeout = [];
                static set(t, e = 0, a = [this.callbackMulti, this.callbackCompleted, this.replacePreviousWithNew]) {
                    const s = e in this.timeout,
                        i = () => {
                            clearTimeout(this.timeout[e]), delete this.timeout[e]
                        };
                    !0 === s && a.includes(this.replacePreviousWithNew) && i();
                    return {
                        promise: new l((i => {
                            this.timeout[e] = setTimeout((() => {
                                delete this.timeout[e], !0 === s && a.includes(this.callbackMulti) && i(), !1 === s && a.includes(this.callbackCompleted) && i()
                            }), t)
                        })),
                        isActive: s,
                        cancel: i
                    }
                }
            }
            class n extends i {
                static attributeParamToggleClasses = "data-param-toggle-classes";
                static attributeParamToggleClassesOnce = "data-param-toggle-classes-once";
                static attributeParamToggleClassesInit = "data-param-toggle-classes-init";
                static attributeParamToggleClassesDelay = "data-param-toggle-classes-delay";
                static attributeParamToggleClassesDisableDelay = "data-param-toggle-classes-disable-delay";
                static attributeParamToggleClassesEnableDelay = "data-param-toggle-classes-enable-delay";
                static init() {
                    n.execute({
                        attributes: [this.attributeParamToggleClasses, this.attributeParamToggleClassesOnce, this.attributeParamToggleClassesInit]
                    })
                }
                static initToggle({
                    element: t,
                    elementId: e,
                    attribute: a
                }) {
                    return this.attributeParamToggleClassesInit === a ? (n.toggleClasses(t, e, t.getAttribute(a)), null) : t.getAttribute(a)
                }
                static toggleEvent({
                    groupId: t,
                    elementId: e,
                    element: a,
                    attribute: s,
                    listener: i,
                    eventCounter: l,
                    data: o
                }) {
                    (this.attributeParamToggleClasses === s || 1 === l && this.attributeParamToggleClassesOnce === s) && n.toggleClasses(a, e, String(o))
                }
                static toggleClasses(t, e, a) {
                    let s = 0;
                    const i = t.getAttribute(this.attributeParamToggleClassesDelay);
                    if (null !== i) {
                        s = parseInt(i, 10);
                        const e = t.getAttribute(this.attributeParamToggleClassesDisableDelay);
                        null !== e && !1 === t.classList.contains(e) && (s = 0);
                        const a = t.getAttribute(this.attributeParamToggleClassesEnableDelay);
                        null !== a && !0 === t.classList.contains(a) && (s = 0)
                    }
                    if (0 === s) return void a.trim().split(" ").forEach((e => {
                        t.classList.toggle(e)
                    }));
                    o.set(s, e, [o.callbackCompleted, o.replacePreviousWithNew]).promise.then((() => {
                        a.trim().split(" ").forEach((e => t.classList.toggle(e)))
                    }))
                }
            }
            class r {
                static element(t, e = 0, a = "top") {
                    const s = "top" === a ? t.getBoundingClientRect().top : t.getBoundingClientRect().bottom;
                    window.scrollTo({
                        top: s + window.scrollY + e,
                        behavior: "smooth"
                    })
                }
            }
            var c = a(82702);
            class g extends i {
                static animationSpeed = 3;
                static attributeParamToggleHeightAccordion = "data-param-toggle-height-accordion";
                static attributeParamToggleHeightNoAccordion = "data-param-toggle-height-no-accordion";
                static attributeParamToggleHeightOffset = "data-param-toggle-height-offset";
                static attributeParamToggleHeightSpeedTime = "data-param-toggle-height-speed-time";
                static attributeParamToggleHeightSpeedFactor = "data-param-toggle-height-speed-factor";
                static classContentCollapsed = "toggle-height-content-collapsed";
                static classContentExpanded = "toggle-height-content-expanded";
                static classContainerCollapsed = "toggle-height-container-collapsed";
                static classContainerExpanded = "toggle-height-container-expanded";
                static classHasHiddenContent = "toggle-height-has-hidden-content";
                static accordionElements = null;
                static init() {
                    g.execute({
                        attributes: [this.attributeParamToggleHeightAccordion, this.attributeParamToggleHeightNoAccordion]
                    }), this.accordionElements = document.querySelectorAll(`[${this.attributeParamToggleHeightAccordion}]`)
                }
                static initToggle({
                    element: t,
                    elementId: e,
                    attribute: a
                }) {
                    return new c((e => {
                        const a = parseInt(t.getAttribute(this.attributeParamToggleHeightOffset) || 0, 10),
                            s = t.scrollHeight,
                            i = t.clientHeight;
                        requestAnimationFrame((() => {
                            s > i && t.classList.add(this.classHasHiddenContent), t.style.display = "block", t.style.transition = `all ${g.calculateAnimationTime(t,s,a)}s linear`, t.style.overflow = "hidden", t.style.visibility = "visible", e({
                                offset: a,
                                scrollHeight: s,
                                clientHeight: i
                            })
                        }))
                    }))
                }
                static toggleEvent({
                    groupId: t,
                    elementId: e,
                    element: a,
                    attribute: s,
                    listener: i,
                    eventCounter: l,
                    data: o
                }) {
                    if (s === this.attributeParamToggleHeightAccordion) this.accordionElements.forEach((t => {
                        t.style.maxHeight || !t.isEqualNode(a) ? g.collapse(t) : g.expand(t, o.scrollHeight, o.offset)
                    }));
                    else a.style.maxHeight ? g.collapse(a) : g.expand(a, o.scrollHeight, o.offset)
                }
                static collapse(t) {
                    t.classList.remove(this.classContentExpanded), t.classList.add(this.classContentCollapsed);
                    const e = t.parentElement;
                    e.classList.remove(this.classContainerExpanded), e.classList.add(this.classContainerCollapsed), !0 === t.hasAttribute("data-toggle-height-scroll-to") && r.element(t, -200), t.style.maxHeight = null
                }
                static expand(t, e, a) {
                    t.classList.remove(this.classContentCollapsed), t.classList.add(this.classContentExpanded);
                    const s = t.parentElement;
                    s.classList.remove(this.classContainerCollapsed), s.classList.add(this.classContainerExpanded), t.style.maxHeight = `${e+a}px`
                }
                static calculateAnimationTime(t, e, a) {
                    const s = t.getAttribute(this.attributeParamToggleHeightSpeedTime);
                    if (null !== s) return s;
                    const i = t.getAttribute(this.attributeParamToggleHeightSpeedFactor);
                    return Math.round((e + a) * (1 / parseInt(i || this.animationSpeed, 10)) * .3) / 100
                }
            }
            class u extends i {
                static attributeParamToggleScrollDisable = "data-param-toggle-scroll-disable";
                static init() {
                    u.execute({
                        attributes: [this.attributeParamToggleScrollDisable]
                    }), this.accordionElements = document.querySelectorAll(`[${this.attributeParamToggleHeightAccordion}]`)
                }
                static toggleEvent({
                    groupId: t,
                    elementId: e,
                    element: a,
                    attribute: s,
                    listener: i,
                    eventCounter: l,
                    data: o
                }) {
                    this.attributeParamToggleScrollDisable === s && document.body.classList.toggle("overflow-hidden")
                }
            }
            const d = "data-event-copy",
                h = "data-select-copy",
                m = "data-select-copy-success-message",
                p = 'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white" stroke-width="4" stroke="white"><g><polygon points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"/></g></svg>',
                b = document.querySelectorAll("[data-copy]"),
                v = document.querySelectorAll("[" + d + "]"),
                C = document.querySelectorAll("[" + h + "]"),
                T = "click",
                y = "copy-success",
                E = "copy-error";

            function f(t, e) {
                const a = t.className; - 1 === t.className.indexOf(e) && (t.className += " " + e, setTimeout((() => {
                    t.className = a
                }), 400))
            }

            function A(t) {
                b.forEach((t => {
                    t.addEventListener(T, (t => {
                        ! function(t) {
                            navigator.clipboard.writeText(t.textContent.trim()).then((() => {
                                f(t, y)
                            }), (() => {
                                f(t, E)
                            }))
                        }(t.target)
                    }))
                })), v.forEach((e => {
                    e.style.position = "relative";
                    const a = document.createElement("div"),
                        s = document.createElement("img");
                    a.style.cssText = "transition: all 0.10s cubic-bezier(0.64, 0.57, 0.67, 1.53); opacity: 0; background-color: inherit; position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; border-radius: inherit;", void 0 !== t && a.classList.add(...t), s.alt = "", s.src = p, s.style.cssText = "transition: inherit; height: 50%;", a.appendChild(s), e.appendChild(a);
                    const i = document.createElement("div");
                    i.role = "alert", i.id = "hiddenAlertContainer", i.style.cssText = "clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;", e.appendChild(i), e.addEventListener(T, (() => {
                        ! function(t) {
                            t.hasAttribute("busy") || (t.setAttribute("busy", ""), C.forEach((e => {
                                e.getAttribute(h) === t.getAttribute(d) && navigator.clipboard.writeText(e.textContent.trim()).then((() => {
                                    t.hasAttribute("success") && (document.getElementById("hiddenAlertContainer").innerHTML = "", document.getElementById("hiddenAlertContainer").innerHTML = t.getAttribute(m));
                                    const e = t.querySelector("div"),
                                        a = e.querySelector("img");
                                    a.style.transform = "scale(0)", e.style.opacity = "1", setTimeout((() => {
                                        a.style.transform = "scale(1)"
                                    }), 100), setTimeout((() => {
                                        a.style.transform = "scale(0)"
                                    }), 1600), setTimeout((() => {
                                        e.style.opacity = "0", t.removeAttribute("busy")
                                    }), 1700)
                                }))
                            })))
                        }(e)
                    }))
                }))
            }
        }
    }
]);

(globalThis.webpackChunk = globalThis.webpackChunk || []).push([
    [8498], {
        2711: function(e) {
            e.exports = function(e) {
                function t(i) {
                    if (s[i]) return s[i].exports;
                    var n = s[i] = {
                        exports: {},
                        id: i,
                        loaded: !1
                    };
                    return e[i].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
                }
                var s = {};
                return t.m = e, t.c = s, t.p = "dist/", t(0)
            }([function(e, t, s) {
                "use strict";

                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                var n = Object.assign || function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var s = arguments[t];
                            for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                        }
                        return e
                    },
                    a = (i(s(1)), s(6)),
                    r = i(a),
                    o = i(s(7)),
                    l = i(s(8)),
                    d = i(s(9)),
                    c = i(s(10)),
                    p = i(s(11)),
                    u = i(s(14)),
                    f = [],
                    h = !1,
                    m = {
                        offset: 120,
                        delay: 0,
                        easing: "ease",
                        duration: 400,
                        disable: !1,
                        once: !1,
                        startEvent: "DOMContentLoaded",
                        throttleDelay: 99,
                        debounceDelay: 50,
                        disableMutationObserver: !1
                    },
                    g = function() {
                        if (arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (h = !0), h) return f = (0, p.default)(f, m), (0, c.default)(f, m.once), f
                    },
                    v = function() {
                        f = (0, u.default)(), g()
                    },
                    b = function() {
                        f.forEach((function(e, t) {
                            e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                        }))
                    },
                    w = function(e) {
                        return !0 === e || "mobile" === e && d.default.mobile() || "phone" === e && d.default.phone() || "tablet" === e && d.default.tablet() || "function" == typeof e && !0 === e()
                    },
                    y = function(e) {
                        m = n(m, e), f = (0, u.default)();
                        var t = document.all && !window.atob;
                        return w(m.disable) || t ? b() : (m.disableMutationObserver || l.default.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), m.disableMutationObserver = !0), document.querySelector("body").setAttribute("data-aos-easing", m.easing), document.querySelector("body").setAttribute("data-aos-duration", m.duration), document.querySelector("body").setAttribute("data-aos-delay", m.delay), "DOMContentLoaded" === m.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? g(!0) : "load" === m.startEvent ? window.addEventListener(m.startEvent, (function() {
                            g(!0)
                        })) : document.addEventListener(m.startEvent, (function() {
                            g(!0)
                        })), window.addEventListener("resize", (0, o.default)(g, m.debounceDelay, !0)), window.addEventListener("orientationchange", (0, o.default)(g, m.debounceDelay, !0)), window.addEventListener("scroll", (0, r.default)((function() {
                            (0, c.default)(f, m.once)
                        }), m.throttleDelay)), m.disableMutationObserver || l.default.ready("[data-aos]", v), f)
                    };
                e.exports = {
                    init: y,
                    refresh: g,
                    refreshHard: v
                }
            }, function(e, t) {}, , , , , function(e, t) {
                (function(t) {
                    "use strict";

                    function s(e, t, s) {
                        function i(t) {
                            var s = m,
                                i = g;
                            return m = g = void 0, x = t, b = e.apply(i, s)
                        }

                        function a(e) {
                            return x = e, w = setTimeout(c, t), E ? i(e) : b
                        }

                        function r(e) {
                            var s = t - (e - y);
                            return k ? T(s, v - (e - x)) : s
                        }

                        function l(e) {
                            var s = e - y;
                            return void 0 === y || s >= t || s < 0 || k && e - x >= v
                        }

                        function c() {
                            var e = S();
                            return l(e) ? p(e) : void(w = setTimeout(c, r(e)))
                        }

                        function p(e) {
                            return w = void 0, M && m ? i(e) : (m = g = void 0, b)
                        }

                        function u() {
                            void 0 !== w && clearTimeout(w), x = 0, m = y = g = w = void 0
                        }

                        function f() {
                            return void 0 === w ? b : p(S())
                        }

                        function h() {
                            var e = S(),
                                s = l(e);
                            if (m = arguments, g = this, y = e, s) {
                                if (void 0 === w) return a(y);
                                if (k) return w = setTimeout(c, t), i(y)
                            }
                            return void 0 === w && (w = setTimeout(c, t)), b
                        }
                        var m, g, v, b, w, y, x = 0,
                            E = !1,
                            k = !1,
                            M = !0;
                        if ("function" != typeof e) throw new TypeError(d);
                        return t = o(t) || 0, n(s) && (E = !!s.leading, v = (k = "maxWait" in s) ? C(o(s.maxWait) || 0, t) : v, M = "trailing" in s ? !!s.trailing : M), h.cancel = u, h.flush = f, h
                    }

                    function i(e, t, i) {
                        var a = !0,
                            r = !0;
                        if ("function" != typeof e) throw new TypeError(d);
                        return n(i) && (a = "leading" in i ? !!i.leading : a, r = "trailing" in i ? !!i.trailing : r), s(e, t, {
                            leading: a,
                            maxWait: t,
                            trailing: r
                        })
                    }

                    function n(e) {
                        var t = void 0 === e ? "undefined" : l(e);
                        return !!e && ("object" == t || "function" == t)
                    }

                    function a(e) {
                        return !!e && "object" == (void 0 === e ? "undefined" : l(e))
                    }

                    function r(e) {
                        return "symbol" == (void 0 === e ? "undefined" : l(e)) || a(e) && y.call(e) == p
                    }

                    function o(e) {
                        if ("number" == typeof e) return e;
                        if (r(e)) return c;
                        if (n(e)) {
                            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                            e = n(t) ? t + "" : t
                        }
                        if ("string" != typeof e) return 0 === e ? e : +e;
                        e = e.replace(u, "");
                        var s = h.test(e);
                        return s || m.test(e) ? g(e.slice(2), s ? 2 : 8) : f.test(e) ? c : +e
                    }
                    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        },
                        d = "Expected a function",
                        c = NaN,
                        p = "[object Symbol]",
                        u = /^\s+|\s+$/g,
                        f = /^[-+]0x[0-9a-f]+$/i,
                        h = /^0b[01]+$/i,
                        m = /^0o[0-7]+$/i,
                        g = parseInt,
                        v = "object" == (void 0 === t ? "undefined" : l(t)) && t && t.Object === Object && t,
                        b = "object" == ("undefined" == typeof self ? "undefined" : l(self)) && self && self.Object === Object && self,
                        w = v || b || Function("return this")(),
                        y = Object.prototype.toString,
                        C = Math.max,
                        T = Math.min,
                        S = function() {
                            return w.Date.now()
                        };
                    e.exports = i
                }).call(t, function() {
                    return this
                }())
            }, function(e, t) {
                (function(t) {
                    "use strict";

                    function s(e, t, s) {
                        function n(t) {
                            var s = m,
                                i = g;
                            return m = g = void 0, x = t, b = e.apply(i, s)
                        }

                        function a(e) {
                            return x = e, w = setTimeout(c, t), E ? n(e) : b
                        }

                        function o(e) {
                            var s = t - (e - S);
                            return k ? C(s, v - (e - x)) : s
                        }

                        function d(e) {
                            var s = e - S;
                            return void 0 === S || s >= t || s < 0 || k && e - x >= v
                        }

                        function c() {
                            var e = T();
                            return d(e) ? p(e) : void(w = setTimeout(c, o(e)))
                        }

                        function p(e) {
                            return w = void 0, M && m ? n(e) : (m = g = void 0, b)
                        }

                        function u() {
                            void 0 !== w && clearTimeout(w), x = 0, m = S = g = w = void 0
                        }

                        function f() {
                            return void 0 === w ? b : p(T())
                        }

                        function h() {
                            var e = T(),
                                s = d(e);
                            if (m = arguments, g = this, S = e, s) {
                                if (void 0 === w) return a(S);
                                if (k) return w = setTimeout(c, t), n(S)
                            }
                            return void 0 === w && (w = setTimeout(c, t)), b
                        }
                        var m, g, v, b, w, S, x = 0,
                            E = !1,
                            k = !1,
                            M = !0;
                        if ("function" != typeof e) throw new TypeError(l);
                        return t = r(t) || 0, i(s) && (E = !!s.leading, v = (k = "maxWait" in s) ? y(r(s.maxWait) || 0, t) : v, M = "trailing" in s ? !!s.trailing : M), h.cancel = u, h.flush = f, h
                    }

                    function i(e) {
                        var t = void 0 === e ? "undefined" : o(e);
                        return !!e && ("object" == t || "function" == t)
                    }

                    function n(e) {
                        return !!e && "object" == (void 0 === e ? "undefined" : o(e))
                    }

                    function a(e) {
                        return "symbol" == (void 0 === e ? "undefined" : o(e)) || n(e) && w.call(e) == c
                    }

                    function r(e) {
                        if ("number" == typeof e) return e;
                        if (a(e)) return d;
                        if (i(e)) {
                            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                            e = i(t) ? t + "" : t
                        }
                        if ("string" != typeof e) return 0 === e ? e : +e;
                        e = e.replace(p, "");
                        var s = f.test(e);
                        return s || h.test(e) ? m(e.slice(2), s ? 2 : 8) : u.test(e) ? d : +e
                    }
                    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        },
                        l = "Expected a function",
                        d = NaN,
                        c = "[object Symbol]",
                        p = /^\s+|\s+$/g,
                        u = /^[-+]0x[0-9a-f]+$/i,
                        f = /^0b[01]+$/i,
                        h = /^0o[0-7]+$/i,
                        m = parseInt,
                        g = "object" == (void 0 === t ? "undefined" : o(t)) && t && t.Object === Object && t,
                        v = "object" == ("undefined" == typeof self ? "undefined" : o(self)) && self && self.Object === Object && self,
                        b = g || v || Function("return this")(),
                        w = Object.prototype.toString,
                        y = Math.max,
                        C = Math.min,
                        T = function() {
                            return b.Date.now()
                        };
                    e.exports = s
                }).call(t, function() {
                    return this
                }())
            }, function(e, t) {
                "use strict";

                function s(e) {
                    var t = void 0,
                        i = void 0;
                    for (t = 0; t < e.length; t += 1) {
                        if ((i = e[t]).dataset && i.dataset.aos) return !0;
                        if (i.children && s(i.children)) return !0
                    }
                    return !1
                }

                function i() {
                    return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
                }

                function n() {
                    return !!i()
                }

                function a(e, t) {
                    var s = window.document,
                        n = new(i())(r);
                    o = t, n.observe(s.documentElement, {
                        childList: !0,
                        subtree: !0,
                        removedNodes: !0
                    })
                }

                function r(e) {
                    e && e.forEach((function(e) {
                        var t = Array.prototype.slice.call(e.addedNodes),
                            i = Array.prototype.slice.call(e.removedNodes);
                        if (s(t.concat(i))) return o()
                    }))
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function() {};
                t.default = {
                    isSupported: n,
                    ready: a
                }
            }, function(e, t) {
                "use strict";

                function s(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                function i() {
                    return navigator.userAgent || navigator.vendor || window.opera || ""
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = function() {
                        function e(e, t) {
                            for (var s = 0; s < t.length; s++) {
                                var i = t[s];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }
                        return function(t, s, i) {
                            return s && e(t.prototype, s), i && e(t, i), t
                        }
                    }(),
                    a = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                    r = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                    o = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
                    l = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                    d = function() {
                        function e() {
                            s(this, e)
                        }
                        return n(e, [{
                            key: "phone",
                            value: function() {
                                var e = i();
                                return !(!a.test(e) && !r.test(e.substr(0, 4)))
                            }
                        }, {
                            key: "mobile",
                            value: function() {
                                var e = i();
                                return !(!o.test(e) && !l.test(e.substr(0, 4)))
                            }
                        }, {
                            key: "tablet",
                            value: function() {
                                return this.mobile() && !this.phone()
                            }
                        }]), e
                    }();
                t.default = new d
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = function(e, t, s) {
                        var i = e.node.getAttribute("data-aos-once");
                        t > e.position ? e.node.classList.add("aos-animate") : void 0 !== i && ("false" === i || !s && "true" !== i) && e.node.classList.remove("aos-animate")
                    },
                    i = function(e, t) {
                        var i = window.pageYOffset,
                            n = window.innerHeight;
                        e.forEach((function(e, a) {
                            s(e, n + i, t)
                        }))
                    };
                t.default = i
            }, function(e, t, s) {
                "use strict";

                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = i(s(12)),
                    a = function(e, t) {
                        return e.forEach((function(e, s) {
                            e.node.classList.add("aos-init"), e.position = (0, n.default)(e.node, t.offset)
                        })), e
                    };
                t.default = a
            }, function(e, t, s) {
                "use strict";

                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = i(s(13)),
                    a = function(e, t) {
                        var s = 0,
                            i = 0,
                            a = window.innerHeight,
                            r = {
                                offset: e.getAttribute("data-aos-offset"),
                                anchor: e.getAttribute("data-aos-anchor"),
                                anchorPlacement: e.getAttribute("data-aos-anchor-placement")
                            };
                        switch (r.offset && !isNaN(r.offset) && (i = parseInt(r.offset)), r.anchor && document.querySelectorAll(r.anchor) && (e = document.querySelectorAll(r.anchor)[0]), s = (0, n.default)(e).top, r.anchorPlacement) {
                            case "top-bottom":
                                break;
                            case "center-bottom":
                                s += e.offsetHeight / 2;
                                break;
                            case "bottom-bottom":
                                s += e.offsetHeight;
                                break;
                            case "top-center":
                                s += a / 2;
                                break;
                            case "bottom-center":
                                s += a / 2 + e.offsetHeight;
                                break;
                            case "center-center":
                                s += a / 2 + e.offsetHeight / 2;
                                break;
                            case "top-top":
                                s += a;
                                break;
                            case "bottom-top":
                                s += e.offsetHeight + a;
                                break;
                            case "center-top":
                                s += e.offsetHeight / 2 + a
                        }
                        return r.anchorPlacement || r.offset || isNaN(t) || (i = t), s + i
                    };
                t.default = a
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = function(e) {
                    for (var t = 0, s = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), s += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
                    return {
                        top: s,
                        left: t
                    }
                };
                t.default = s
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = function(e) {
                    return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, (function(e) {
                        return {
                            node: e
                        }
                    }))
                };
                t.default = s
            }])
        },
        39257: (e, t, s) => {
            "use strict";

            function i(e) {
                return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
            }

            function n(e = {}, t = {}) {
                Object.keys(t).forEach((s => {
                    void 0 === e[s] ? e[s] = t[s] : i(t[s]) && i(e[s]) && Object.keys(t[s]).length > 0 && n(e[s], t[s])
                }))
            }
            s.d(t, {
                pt: () => ae,
                W_: () => se,
                tl: () => ne,
                ZP: () => ee
            });
            const a = {
                body: {},
                addEventListener() {},
                removeEventListener() {},
                activeElement: {
                    blur() {},
                    nodeName: ""
                },
                querySelector: () => null,
                querySelectorAll: () => [],
                getElementById: () => null,
                createEvent: () => ({
                    initEvent() {}
                }),
                createElement: () => ({
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName: () => []
                }),
                createElementNS: () => ({}),
                importNode: () => null,
                location: {
                    hash: "",
                    host: "",
                    hostname: "",
                    href: "",
                    origin: "",
                    pathname: "",
                    protocol: "",
                    search: ""
                }
            };

            function r() {
                const e = "undefined" != typeof document ? document : {};
                return n(e, a), e
            }
            const o = {
                document: a,
                navigator: {
                    userAgent: ""
                },
                location: {
                    hash: "",
                    host: "",
                    hostname: "",
                    href: "",
                    origin: "",
                    pathname: "",
                    protocol: "",
                    search: ""
                },
                history: {
                    replaceState() {},
                    pushState() {},
                    go() {},
                    back() {}
                },
                CustomEvent: function() {
                    return this
                },
                addEventListener() {},
                removeEventListener() {},
                getComputedStyle: () => ({
                    getPropertyValue: () => ""
                }),
                Image() {},
                Date() {},
                screen: {},
                setTimeout() {},
                clearTimeout() {},
                matchMedia: () => ({}),
                requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
                cancelAnimationFrame(e) {
                    "undefined" != typeof setTimeout && clearTimeout(e)
                }
            };

            function l() {
                const e = "undefined" != typeof window ? window : {};
                return n(e, o), e
            }
            class d extends Array {
                constructor(e) {
                    "number" == typeof e ? super(e) : (super(...e || []), function(e) {
                        const t = e.__proto__;
                        Object.defineProperty(e, "__proto__", {
                            get: () => t,
                            set(e) {
                                t.__proto__ = e
                            }
                        })
                    }(this))
                }
            }

            function c(e = []) {
                const t = [];
                return e.forEach((e => {
                    Array.isArray(e) ? t.push(...c(e)) : t.push(e)
                })), t
            }

            function p(e, t) {
                return Array.prototype.filter.call(e, t)
            }

            function u(e, t) {
                const s = l(),
                    i = r();
                let n = [];
                if (!t && e instanceof d) return e;
                if (!e) return new d(n);
                if ("string" == typeof e) {
                    const s = e.trim();
                    if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                        let e = "div";
                        0 === s.indexOf("<li") && (e = "ul"), 0 === s.indexOf("<tr") && (e = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (e = "tr"), 0 === s.indexOf("<tbody") && (e = "table"), 0 === s.indexOf("<option") && (e = "select");
                        const t = i.createElement(e);
                        t.innerHTML = s;
                        for (let e = 0; e < t.childNodes.length; e += 1) n.push(t.childNodes[e])
                    } else n = function(e, t) {
                        if ("string" != typeof e) return [e];
                        const s = [],
                            i = t.querySelectorAll(e);
                        for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                        return s
                    }(e.trim(), t || i)
                } else if (e.nodeType || e === s || e === i) n.push(e);
                else if (Array.isArray(e)) {
                    if (e instanceof d) return e;
                    n = e
                }
                return new d(function(e) {
                    const t = [];
                    for (let s = 0; s < e.length; s += 1) - 1 === t.indexOf(e[s]) && t.push(e[s]);
                    return t
                }(n))
            }
            u.fn = d.prototype;
            const f = "resize scroll".split(" ");

            function h(e) {
                return function(...t) {
                    if (void 0 === t[0]) {
                        for (let t = 0; t < this.length; t += 1) f.indexOf(e) < 0 && (e in this[t] ? this[t][e]() : u(this[t]).trigger(e));
                        return this
                    }
                    return this.on(e, ...t)
                }
            }
            h("click"), h("blur"), h("focus"), h("focusin"), h("focusout"), h("keyup"), h("keydown"), h("keypress"), h("submit"), h("change"), h("mousedown"), h("mousemove"), h("mouseup"), h("mouseenter"), h("mouseleave"), h("mouseout"), h("mouseover"), h("touchstart"), h("touchend"), h("touchmove"), h("resize"), h("scroll");
            const m = {
                addClass: function(...e) {
                    const t = c(e.map((e => e.split(" "))));
                    return this.forEach((e => {
                        e.classList.add(...t)
                    })), this
                },
                removeClass: function(...e) {
                    const t = c(e.map((e => e.split(" "))));
                    return this.forEach((e => {
                        e.classList.remove(...t)
                    })), this
                },
                hasClass: function(...e) {
                    const t = c(e.map((e => e.split(" "))));
                    return p(this, (e => t.filter((t => e.classList.contains(t))).length > 0)).length > 0
                },
                toggleClass: function(...e) {
                    const t = c(e.map((e => e.split(" "))));
                    this.forEach((e => {
                        t.forEach((t => {
                            e.classList.toggle(t)
                        }))
                    }))
                },
                attr: function(e, t) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (let s = 0; s < this.length; s += 1)
                        if (2 === arguments.length) this[s].setAttribute(e, t);
                        else
                            for (const t in e) this[s][t] = e[t], this[s].setAttribute(t, e[t]);
                    return this
                },
                removeAttr: function(e) {
                    for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
                    return this
                },
                transform: function(e) {
                    for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
                    return this
                },
                transition: function(e) {
                    for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
                    return this
                },
                on: function(...e) {
                    let [t, s, i, n] = e;

                    function a(e) {
                        const t = e.target;
                        if (!t) return;
                        const n = e.target.dom7EventData || [];
                        if (n.indexOf(e) < 0 && n.unshift(e), u(t).is(s)) i.apply(t, n);
                        else {
                            const e = u(t).parents();
                            for (let t = 0; t < e.length; t += 1) u(e[t]).is(s) && i.apply(e[t], n)
                        }
                    }

                    function r(e) {
                        const t = e && e.target && e.target.dom7EventData || [];
                        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t)
                    }
                    "function" == typeof e[1] && ([t, i, n] = e, s = void 0), n || (n = !1);
                    const o = t.split(" ");
                    let l;
                    for (let e = 0; e < this.length; e += 1) {
                        const t = this[e];
                        if (s)
                            for (l = 0; l < o.length; l += 1) {
                                const e = o[l];
                                t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({
                                    listener: i,
                                    proxyListener: a
                                }), t.addEventListener(e, a, n)
                            } else
                                for (l = 0; l < o.length; l += 1) {
                                    const e = o[l];
                                    t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({
                                        listener: i,
                                        proxyListener: r
                                    }), t.addEventListener(e, r, n)
                                }
                    }
                    return this
                },
                off: function(...e) {
                    let [t, s, i, n] = e;
                    "function" == typeof e[1] && ([t, i, n] = e, s = void 0), n || (n = !1);
                    const a = t.split(" ");
                    for (let e = 0; e < a.length; e += 1) {
                        const t = a[e];
                        for (let e = 0; e < this.length; e += 1) {
                            const a = this[e];
                            let r;
                            if (!s && a.dom7Listeners ? r = a.dom7Listeners[t] : s && a.dom7LiveListeners && (r = a.dom7LiveListeners[t]), r && r.length)
                                for (let e = r.length - 1; e >= 0; e -= 1) {
                                    const s = r[e];
                                    i && s.listener === i || i && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === i ? (a.removeEventListener(t, s.proxyListener, n), r.splice(e, 1)) : i || (a.removeEventListener(t, s.proxyListener, n), r.splice(e, 1))
                                }
                        }
                    }
                    return this
                },
                trigger: function(...e) {
                    const t = l(),
                        s = e[0].split(" "),
                        i = e[1];
                    for (let n = 0; n < s.length; n += 1) {
                        const a = s[n];
                        for (let s = 0; s < this.length; s += 1) {
                            const n = this[s];
                            if (t.CustomEvent) {
                                const s = new t.CustomEvent(a, {
                                    detail: i,
                                    bubbles: !0,
                                    cancelable: !0
                                });
                                n.dom7EventData = e.filter(((e, t) => t > 0)), n.dispatchEvent(s), n.dom7EventData = [], delete n.dom7EventData
                            }
                        }
                    }
                    return this
                },
                transitionEnd: function(e) {
                    const t = this;
                    return e && t.on("transitionend", (function s(i) {
                        i.target === this && (e.call(this, i), t.off("transitionend", s))
                    })), this
                },
                outerWidth: function(e) {
                    if (this.length > 0) {
                        if (e) {
                            const e = this.styles();
                            return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                        }
                        return this[0].offsetWidth
                    }
                    return null
                },
                outerHeight: function(e) {
                    if (this.length > 0) {
                        if (e) {
                            const e = this.styles();
                            return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                        }
                        return this[0].offsetHeight
                    }
                    return null
                },
                styles: function() {
                    const e = l();
                    return this[0] ? e.getComputedStyle(this[0], null) : {}
                },
                offset: function() {
                    if (this.length > 0) {
                        const e = l(),
                            t = r(),
                            s = this[0],
                            i = s.getBoundingClientRect(),
                            n = t.body,
                            a = s.clientTop || n.clientTop || 0,
                            o = s.clientLeft || n.clientLeft || 0,
                            d = s === e ? e.scrollY : s.scrollTop,
                            c = s === e ? e.scrollX : s.scrollLeft;
                        return {
                            top: i.top + d - a,
                            left: i.left + c - o
                        }
                    }
                    return null
                },
                css: function(e, t) {
                    const s = l();
                    let i;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (i = 0; i < this.length; i += 1)
                                for (const t in e) this[i].style[t] = e[t];
                            return this
                        }
                        if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                        return this
                    }
                    return this
                },
                each: function(e) {
                    return e ? (this.forEach(((t, s) => {
                        e.apply(t, [t, s])
                    })), this) : this
                },
                html: function(e) {
                    if (void 0 === e) return this[0] ? this[0].innerHTML : null;
                    for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                    return this
                },
                text: function(e) {
                    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                    for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
                    return this
                },
                is: function(e) {
                    const t = l(),
                        s = r(),
                        i = this[0];
                    let n, a;
                    if (!i || void 0 === e) return !1;
                    if ("string" == typeof e) {
                        if (i.matches) return i.matches(e);
                        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
                        if (i.msMatchesSelector) return i.msMatchesSelector(e);
                        for (n = u(e), a = 0; a < n.length; a += 1)
                            if (n[a] === i) return !0;
                        return !1
                    }
                    if (e === s) return i === s;
                    if (e === t) return i === t;
                    if (e.nodeType || e instanceof d) {
                        for (n = e.nodeType ? [e] : e, a = 0; a < n.length; a += 1)
                            if (n[a] === i) return !0;
                        return !1
                    }
                    return !1
                },
                index: function() {
                    let e, t = this[0];
                    if (t) {
                        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                        return e
                    }
                },
                eq: function(e) {
                    if (void 0 === e) return this;
                    const t = this.length;
                    if (e > t - 1) return u([]);
                    if (e < 0) {
                        const s = t + e;
                        return u(s < 0 ? [] : [this[s]])
                    }
                    return u([this[e]])
                },
                append: function(...e) {
                    let t;
                    const s = r();
                    for (let i = 0; i < e.length; i += 1) {
                        t = e[i];
                        for (let e = 0; e < this.length; e += 1)
                            if ("string" == typeof t) {
                                const i = s.createElement("div");
                                for (i.innerHTML = t; i.firstChild;) this[e].appendChild(i.firstChild)
                            } else if (t instanceof d)
                            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
                        else this[e].appendChild(t)
                    }
                    return this
                },
                prepend: function(e) {
                    const t = r();
                    let s, i;
                    for (s = 0; s < this.length; s += 1)
                        if ("string" == typeof e) {
                            const n = t.createElement("div");
                            for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1) this[s].insertBefore(n.childNodes[i], this[s].childNodes[0])
                        } else if (e instanceof d)
                        for (i = 0; i < e.length; i += 1) this[s].insertBefore(e[i], this[s].childNodes[0]);
                    else this[s].insertBefore(e, this[s].childNodes[0]);
                    return this
                },
                next: function(e) {
                    return this.length > 0 ? e ? this[0].nextElementSibling && u(this[0].nextElementSibling).is(e) ? u([this[0].nextElementSibling]) : u([]) : this[0].nextElementSibling ? u([this[0].nextElementSibling]) : u([]) : u([])
                },
                nextAll: function(e) {
                    const t = [];
                    let s = this[0];
                    if (!s) return u([]);
                    for (; s.nextElementSibling;) {
                        const i = s.nextElementSibling;
                        e ? u(i).is(e) && t.push(i) : t.push(i), s = i
                    }
                    return u(t)
                },
                prev: function(e) {
                    if (this.length > 0) {
                        const t = this[0];
                        return e ? t.previousElementSibling && u(t.previousElementSibling).is(e) ? u([t.previousElementSibling]) : u([]) : t.previousElementSibling ? u([t.previousElementSibling]) : u([])
                    }
                    return u([])
                },
                prevAll: function(e) {
                    const t = [];
                    let s = this[0];
                    if (!s) return u([]);
                    for (; s.previousElementSibling;) {
                        const i = s.previousElementSibling;
                        e ? u(i).is(e) && t.push(i) : t.push(i), s = i
                    }
                    return u(t)
                },
                parent: function(e) {
                    const t = [];
                    for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (e ? u(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
                    return u(t)
                },
                parents: function(e) {
                    const t = [];
                    for (let s = 0; s < this.length; s += 1) {
                        let i = this[s].parentNode;
                        for (; i;) e ? u(i).is(e) && t.push(i) : t.push(i), i = i.parentNode
                    }
                    return u(t)
                },
                closest: function(e) {
                    let t = this;
                    return void 0 === e ? u([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
                },
                find: function(e) {
                    const t = [];
                    for (let s = 0; s < this.length; s += 1) {
                        const i = this[s].querySelectorAll(e);
                        for (let e = 0; e < i.length; e += 1) t.push(i[e])
                    }
                    return u(t)
                },
                children: function(e) {
                    const t = [];
                    for (let s = 0; s < this.length; s += 1) {
                        const i = this[s].children;
                        for (let s = 0; s < i.length; s += 1) e && !u(i[s]).is(e) || t.push(i[s])
                    }
                    return u(t)
                },
                filter: function(e) {
                    return u(p(this, e))
                },
                remove: function() {
                    for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                }
            };
            Object.keys(m).forEach((e => {
                Object.defineProperty(u.fn, e, {
                    value: m[e],
                    writable: !0
                })
            }));
            const g = u;

            function v(e, t = 0) {
                return setTimeout(e, t)
            }

            function b() {
                return Date.now()
            }

            function w(e, t = "x") {
                const s = l();
                let i, n, a;
                const r = function(e) {
                    const t = l();
                    let s;
                    return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
                }(e);
                return s.WebKitCSSMatrix ? (n = r.transform || r.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map((e => e.replace(",", "."))).join(", ")), a = new s.WebKitCSSMatrix("none" === n ? "" : n)) : (a = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = a.toString().split(",")), "x" === t && (n = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0
            }

            function y(e) {
                return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
            }

            function C(...e) {
                const t = Object(e[0]),
                    s = ["__proto__", "constructor", "prototype"];
                for (let n = 1; n < e.length; n += 1) {
                    const a = e[n];
                    if (null != a && (i = a, !("undefined" != typeof window && void 0 !== window.HTMLElement ? i instanceof HTMLElement : i && (1 === i.nodeType || 11 === i.nodeType)))) {
                        const e = Object.keys(Object(a)).filter((e => s.indexOf(e) < 0));
                        for (let s = 0, i = e.length; s < i; s += 1) {
                            const i = e[s],
                                n = Object.getOwnPropertyDescriptor(a, i);
                            void 0 !== n && n.enumerable && (y(t[i]) && y(a[i]) ? a[i].__swiper__ ? t[i] = a[i] : C(t[i], a[i]) : !y(t[i]) && y(a[i]) ? (t[i] = {}, a[i].__swiper__ ? t[i] = a[i] : C(t[i], a[i])) : t[i] = a[i])
                        }
                    }
                }
                var i;
                return t
            }

            function T(e, t, s) {
                e.style.setProperty(t, s)
            }

            function S({
                swiper: e,
                targetPosition: t,
                side: s
            }) {
                const i = l(),
                    n = -e.translate;
                let a, r = null;
                const o = e.params.speed;
                e.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(e.cssModeFrameID);
                const d = t > n ? "next" : "prev",
                    c = (e, t) => "next" === d && e >= t || "prev" === d && e <= t,
                    p = () => {
                        a = (new Date).getTime(), null === r && (r = a);
                        const l = Math.max(Math.min((a - r) / o, 1), 0),
                            d = .5 - Math.cos(l * Math.PI) / 2;
                        let u = n + d * (t - n);
                        if (c(u, t) && (u = t), e.wrapperEl.scrollTo({
                                [s]: u
                            }), c(u, t)) return e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
                            e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
                                [s]: u
                            })
                        })), void i.cancelAnimationFrame(e.cssModeFrameID);
                        e.cssModeFrameID = i.requestAnimationFrame(p)
                    };
                p()
            }
            let x, E, k;

            function M() {
                return x || (x = function() {
                    const e = l(),
                        t = r();
                    return {
                        smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                        touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                        passiveListener: function() {
                            let t = !1;
                            try {
                                const s = Object.defineProperty({}, "passive", {
                                    get() {
                                        t = !0
                                    }
                                });
                                e.addEventListener("testPassiveListener", null, s)
                            } catch (e) {}
                            return t
                        }(),
                        gestures: "ongesturestart" in e
                    }
                }()), x
            }

            function $(e = {}) {
                return E || (E = function({
                    userAgent: e
                } = {}) {
                    const t = M(),
                        s = l(),
                        i = s.navigator.platform,
                        n = e || s.navigator.userAgent,
                        a = {
                            ios: !1,
                            android: !1
                        },
                        r = s.screen.width,
                        o = s.screen.height,
                        d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
                    let c = n.match(/(iPad).*OS\s([\d_]+)/);
                    const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                        u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                        f = "Win32" === i;
                    let h = "MacIntel" === i;
                    return !c && h && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${r}x${o}`) >= 0 && (c = n.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), h = !1), d && !f && (a.os = "android", a.android = !0), (c || u || p) && (a.os = "ios", a.ios = !0), a
                }(e)), E
            }

            function O() {
                return k || (k = function() {
                    const e = l();
                    return {
                        isSafari: function() {
                            const t = e.navigator.userAgent.toLowerCase();
                            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                        }(),
                        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
                    }
                }()), k
            }
            const P = {
                on(e, t, s) {
                    const i = this;
                    if (!i.eventsListeners || i.destroyed) return i;
                    if ("function" != typeof t) return i;
                    const n = s ? "unshift" : "push";
                    return e.split(" ").forEach((e => {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t)
                    })), i
                },
                once(e, t, s) {
                    const i = this;
                    if (!i.eventsListeners || i.destroyed) return i;
                    if ("function" != typeof t) return i;

                    function n(...s) {
                        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy, t.apply(i, s)
                    }
                    return n.__emitterProxy = t, i.on(e, n, s)
                },
                onAny(e, t) {
                    const s = this;
                    if (!s.eventsListeners || s.destroyed) return s;
                    if ("function" != typeof e) return s;
                    const i = t ? "unshift" : "push";
                    return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
                },
                offAny(e) {
                    const t = this;
                    if (!t.eventsListeners || t.destroyed) return t;
                    if (!t.eventsAnyListeners) return t;
                    const s = t.eventsAnyListeners.indexOf(e);
                    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
                },
                off(e, t) {
                    const s = this;
                    return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => {
                        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i, n) => {
                            (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(n, 1)
                        }))
                    })), s) : s
                },
                emit(...e) {
                    const t = this;
                    if (!t.eventsListeners || t.destroyed) return t;
                    if (!t.eventsListeners) return t;
                    let s, i, n;
                    "string" == typeof e[0] || Array.isArray(e[0]) ? (s = e[0], i = e.slice(1, e.length), n = t) : (s = e[0].events, i = e[0].data, n = e[0].context || t), i.unshift(n);
                    return (Array.isArray(s) ? s : s.split(" ")).forEach((e => {
                        t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((t => {
                            t.apply(n, [e, ...i])
                        })), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach((e => {
                            e.apply(n, i)
                        }))
                    })), t
                }
            };
            const L = {
                updateSize: function() {
                    const e = this;
                    let t, s;
                    const i = e.$el;
                    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10), s = s - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
                        width: t,
                        height: s,
                        size: e.isHorizontal() ? t : s
                    }))
                },
                updateSlides: function() {
                    const e = this;

                    function t(t) {
                        return e.isHorizontal() ? t : {
                            width: "height",
                            "margin-top": "margin-left",
                            "margin-bottom ": "margin-right",
                            "margin-left": "margin-top",
                            "margin-right": "margin-bottom",
                            "padding-left": "padding-top",
                            "padding-right": "padding-bottom",
                            marginRight: "marginBottom"
                        } [t]
                    }

                    function s(e, s) {
                        return parseFloat(e.getPropertyValue(t(s)) || 0)
                    }
                    const i = e.params,
                        {
                            $wrapperEl: n,
                            size: a,
                            rtlTranslate: r,
                            wrongRTL: o
                        } = e,
                        l = e.virtual && i.virtual.enabled,
                        d = l ? e.virtual.slides.length : e.slides.length,
                        c = n.children(`.${e.params.slideClass}`),
                        p = l ? e.virtual.slides.length : c.length;
                    let u = [];
                    const f = [],
                        h = [];
                    let m = i.slidesOffsetBefore;
                    "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                    let g = i.slidesOffsetAfter;
                    "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                    const v = e.snapGrid.length,
                        b = e.slidesGrid.length;
                    let w = i.spaceBetween,
                        y = -m,
                        C = 0,
                        S = 0;
                    if (void 0 === a) return;
                    "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * a), e.virtualSize = -w, r ? c.css({
                        marginLeft: "",
                        marginBottom: "",
                        marginTop: ""
                    }) : c.css({
                        marginRight: "",
                        marginBottom: "",
                        marginTop: ""
                    }), i.centeredSlides && i.cssMode && (T(e.wrapperEl, "--swiper-centered-offset-before", ""), T(e.wrapperEl, "--swiper-centered-offset-after", ""));
                    const x = i.grid && i.grid.rows > 1 && e.grid;
                    let E;
                    x && e.grid.initSlides(p);
                    const k = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter((e => void 0 !== i.breakpoints[e].slidesPerView)).length > 0;
                    for (let n = 0; n < p; n += 1) {
                        E = 0;
                        const r = c.eq(n);
                        if (x && e.grid.updateSlide(n, r, p, t), "none" !== r.css("display")) {
                            if ("auto" === i.slidesPerView) {
                                k && (c[n].style[t("width")] = "");
                                const a = getComputedStyle(r[0]),
                                    o = r[0].style.transform,
                                    l = r[0].style.webkitTransform;
                                if (o && (r[0].style.transform = "none"), l && (r[0].style.webkitTransform = "none"), i.roundLengths) E = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
                                else {
                                    const e = s(a, "width"),
                                        t = s(a, "padding-left"),
                                        i = s(a, "padding-right"),
                                        n = s(a, "margin-left"),
                                        o = s(a, "margin-right"),
                                        l = a.getPropertyValue("box-sizing");
                                    if (l && "border-box" === l) E = e + n + o;
                                    else {
                                        const {
                                            clientWidth: s,
                                            offsetWidth: a
                                        } = r[0];
                                        E = e + t + i + n + o + (a - s)
                                    }
                                }
                                o && (r[0].style.transform = o), l && (r[0].style.webkitTransform = l), i.roundLengths && (E = Math.floor(E))
                            } else E = (a - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (E = Math.floor(E)), c[n] && (c[n].style[t("width")] = `${E}px`);
                            c[n] && (c[n].swiperSlideSize = E), h.push(E), i.centeredSlides ? (y = y + E / 2 + C / 2 + w, 0 === C && 0 !== n && (y = y - a / 2 - w), 0 === n && (y = y - a / 2 - w), Math.abs(y) < .001 && (y = 0), i.roundLengths && (y = Math.floor(y)), S % i.slidesPerGroup == 0 && u.push(y), f.push(y)) : (i.roundLengths && (y = Math.floor(y)), (S - Math.min(e.params.slidesPerGroupSkip, S)) % e.params.slidesPerGroup == 0 && u.push(y), f.push(y), y = y + E + w), e.virtualSize += E + w, C = E, S += 1
                        }
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, a) + g, r && o && ("slide" === i.effect || "coverflow" === i.effect) && n.css({
                            width: `${e.virtualSize+i.spaceBetween}px`
                        }), i.setWrapperSize && n.css({
                            [t("width")]: `${e.virtualSize+i.spaceBetween}px`
                        }), x && e.grid.updateWrapperSize(E, u, t), !i.centeredSlides) {
                        const t = [];
                        for (let s = 0; s < u.length; s += 1) {
                            let n = u[s];
                            i.roundLengths && (n = Math.floor(n)), u[s] <= e.virtualSize - a && t.push(n)
                        }
                        u = t, Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - a)
                    }
                    if (0 === u.length && (u = [0]), 0 !== i.spaceBetween) {
                        const s = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
                        c.filter(((e, t) => !i.cssMode || t !== c.length - 1)).css({
                            [s]: `${w}px`
                        })
                    }
                    if (i.centeredSlides && i.centeredSlidesBounds) {
                        let e = 0;
                        h.forEach((t => {
                            e += t + (i.spaceBetween ? i.spaceBetween : 0)
                        })), e -= i.spaceBetween;
                        const t = e - a;
                        u = u.map((e => e < 0 ? -m : e > t ? t + g : e))
                    }
                    if (i.centerInsufficientSlides) {
                        let e = 0;
                        if (h.forEach((t => {
                                e += t + (i.spaceBetween ? i.spaceBetween : 0)
                            })), e -= i.spaceBetween, e < a) {
                            const t = (a - e) / 2;
                            u.forEach(((e, s) => {
                                u[s] = e - t
                            })), f.forEach(((e, s) => {
                                f[s] = e + t
                            }))
                        }
                    }
                    if (Object.assign(e, {
                            slides: c,
                            snapGrid: u,
                            slidesGrid: f,
                            slidesSizesGrid: h
                        }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
                        T(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), T(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
                        const t = -e.snapGrid[0],
                            s = -e.slidesGrid[0];
                        e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s))
                    }
                    if (p !== d && e.emit("slidesLengthChange"), u.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== b && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !(l || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
                        const t = `${i.containerModifierClass}backface-hidden`,
                            s = e.$el.hasClass(t);
                        p <= i.maxBackfaceHiddenSlides ? s || e.$el.addClass(t) : s && e.$el.removeClass(t)
                    }
                },
                updateAutoHeight: function(e) {
                    const t = this,
                        s = [],
                        i = t.virtual && t.params.virtual.enabled;
                    let n, a = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const r = e => i ? t.slides.filter((t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e))[0] : t.slides.eq(e)[0];
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides)(t.visibleSlides || g([])).each((e => {
                            s.push(e)
                        }));
                        else
                            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                                const e = t.activeIndex + n;
                                if (e > t.slides.length && !i) break;
                                s.push(r(e))
                            } else s.push(r(t.activeIndex));
                    for (n = 0; n < s.length; n += 1)
                        if (void 0 !== s[n]) {
                            const e = s[n].offsetHeight;
                            a = e > a ? e : a
                        }(a || 0 === a) && t.$wrapperEl.css("height", `${a}px`)
                },
                updateSlidesOffset: function() {
                    const e = this,
                        t = e.slides;
                    for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
                },
                updateSlidesProgress: function(e = this && this.translate || 0) {
                    const t = this,
                        s = t.params,
                        {
                            slides: i,
                            rtlTranslate: n,
                            snapGrid: a
                        } = t;
                    if (0 === i.length) return;
                    void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                    let r = -e;
                    n && (r = e), i.removeClass(s.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (let e = 0; e < i.length; e += 1) {
                        const o = i[e];
                        let l = o.swiperSlideOffset;
                        s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                        const d = (r + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
                            c = (r - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
                            p = -(r - l),
                            u = p + t.slidesSizesGrid[e];
                        (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), i.eq(e).addClass(s.slideVisibleClass)), o.progress = n ? -d : d, o.originalProgress = n ? -c : c
                    }
                    t.visibleSlides = g(t.visibleSlides)
                },
                updateProgress: function(e) {
                    const t = this;
                    if (void 0 === e) {
                        const s = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * s || 0
                    }
                    const s = t.params,
                        i = t.maxTranslate() - t.minTranslate();
                    let {
                        progress: n,
                        isBeginning: a,
                        isEnd: r
                    } = t;
                    const o = a,
                        l = r;
                    0 === i ? (n = 0, a = !0, r = !0) : (n = (e - t.minTranslate()) / i, a = n <= 0, r = n >= 1), Object.assign(t, {
                        progress: n,
                        isBeginning: a,
                        isEnd: r
                    }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), a && !o && t.emit("reachBeginning toEdge"), r && !l && t.emit("reachEnd toEdge"), (o && !a || l && !r) && t.emit("fromEdge"), t.emit("progress", n)
                },
                updateSlidesClasses: function() {
                    const e = this,
                        {
                            slides: t,
                            params: s,
                            $wrapperEl: i,
                            activeIndex: n,
                            realIndex: a
                        } = e,
                        r = e.virtual && s.virtual.enabled;
                    let o;
                    t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`), o = r ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`) : t.eq(n), o.addClass(s.slideActiveClass), s.loop && (o.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`).addClass(s.slideDuplicateActiveClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`).addClass(s.slideDuplicateActiveClass));
                    let l = o.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
                    s.loop && 0 === l.length && (l = t.eq(0), l.addClass(s.slideNextClass));
                    let d = o.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
                    s.loop && 0 === d.length && (d = t.eq(-1), d.addClass(s.slidePrevClass)), s.loop && (l.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass), d.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)), e.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    const t = this,
                        s = t.rtlTranslate ? t.translate : -t.translate,
                        {
                            slidesGrid: i,
                            snapGrid: n,
                            params: a,
                            activeIndex: r,
                            realIndex: o,
                            snapIndex: l
                        } = t;
                    let d, c = e;
                    if (void 0 === c) {
                        for (let e = 0; e < i.length; e += 1) void 0 !== i[e + 1] ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2 ? c = e : s >= i[e] && s < i[e + 1] && (c = e + 1) : s >= i[e] && (c = e);
                        a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
                    }
                    if (n.indexOf(s) >= 0) d = n.indexOf(s);
                    else {
                        const e = Math.min(a.slidesPerGroupSkip, c);
                        d = e + Math.floor((c - e) / a.slidesPerGroup)
                    }
                    if (d >= n.length && (d = n.length - 1), c === r) return void(d !== l && (t.snapIndex = d, t.emit("snapIndexChange")));
                    const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                    Object.assign(t, {
                        snapIndex: d,
                        realIndex: p,
                        previousIndex: r,
                        activeIndex: c
                    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
                },
                updateClickedSlide: function(e) {
                    const t = this,
                        s = t.params,
                        i = g(e).closest(`.${s.slideClass}`)[0];
                    let n, a = !1;
                    if (i)
                        for (let e = 0; e < t.slides.length; e += 1)
                            if (t.slides[e] === i) {
                                a = !0, n = e;
                                break
                            } if (!i || !a) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(g(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            };
            const z = {
                getTranslate: function(e = (this.isHorizontal() ? "x" : "y")) {
                    const {
                        params: t,
                        rtlTranslate: s,
                        translate: i,
                        $wrapperEl: n
                    } = this;
                    if (t.virtualTranslate) return s ? -i : i;
                    if (t.cssMode) return i;
                    let a = w(n[0], e);
                    return s && (a = -a), a || 0
                },
                setTranslate: function(e, t) {
                    const s = this,
                        {
                            rtlTranslate: i,
                            params: n,
                            $wrapperEl: a,
                            wrapperEl: r,
                            progress: o
                        } = s;
                    let l, d = 0,
                        c = 0;
                    s.isHorizontal() ? d = i ? -e : e : c = e, n.roundLengths && (d = Math.floor(d), c = Math.floor(c)), n.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -c : n.virtualTranslate || a.transform(`translate3d(${d}px, ${c}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? d : c;
                    const p = s.maxTranslate() - s.minTranslate();
                    l = 0 === p ? 0 : (e - s.minTranslate()) / p, l !== o && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
                },
                minTranslate: function() {
                    return -this.snapGrid[0]
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function(e = 0, t = this.params.speed, s = !0, i = !0, n) {
                    const a = this,
                        {
                            params: r,
                            wrapperEl: o
                        } = a;
                    if (a.animating && r.preventInteractionOnTransition) return !1;
                    const l = a.minTranslate(),
                        d = a.maxTranslate();
                    let c;
                    if (c = i && e > l ? l : i && e < d ? d : e, a.updateProgress(c), r.cssMode) {
                        const e = a.isHorizontal();
                        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
                        else {
                            if (!a.support.smoothScroll) return S({
                                swiper: a,
                                targetPosition: -c,
                                side: e ? "left" : "top"
                            }), !0;
                            o.scrollTo({
                                [e ? "left" : "top"]: -c,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return 0 === t ? (a.setTransition(0), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, n), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, n), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function(e) {
                        a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, s && a.emit("transitionEnd"))
                    }), a.$wrapperEl[0].addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd))), !0
                }
            };

            function A({
                swiper: e,
                runCallbacks: t,
                direction: s,
                step: i
            }) {
                const {
                    activeIndex: n,
                    previousIndex: a
                } = e;
                let r = s;
                if (r || (r = n > a ? "next" : n < a ? "prev" : "reset"), e.emit(`transition${i}`), t && n !== a) {
                    if ("reset" === r) return void e.emit(`slideResetTransition${i}`);
                    e.emit(`slideChangeTransition${i}`), "next" === r ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`)
                }
            }
            const I = {
                slideTo: function(e = 0, t = this.params.speed, s = !0, i, n) {
                    if ("number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const a = this;
                    let r = e;
                    r < 0 && (r = 0);
                    const {
                        params: o,
                        snapGrid: l,
                        slidesGrid: d,
                        previousIndex: c,
                        activeIndex: p,
                        rtlTranslate: u,
                        wrapperEl: f,
                        enabled: h
                    } = a;
                    if (a.animating && o.preventInteractionOnTransition || !h && !i && !n) return !1;
                    const m = Math.min(a.params.slidesPerGroupSkip, r);
                    let g = m + Math.floor((r - m) / a.params.slidesPerGroup);
                    g >= l.length && (g = l.length - 1);
                    const v = -l[g];
                    if (o.normalizeSlideIndex)
                        for (let e = 0; e < d.length; e += 1) {
                            const t = -Math.floor(100 * v),
                                s = Math.floor(100 * d[e]),
                                i = Math.floor(100 * d[e + 1]);
                            void 0 !== d[e + 1] ? t >= s && t < i - (i - s) / 2 ? r = e : t >= s && t < i && (r = e + 1) : t >= s && (r = e)
                        }
                    if (a.initialized && r !== p) {
                        if (!a.allowSlideNext && v < a.translate && v < a.minTranslate()) return !1;
                        if (!a.allowSlidePrev && v > a.translate && v > a.maxTranslate() && (p || 0) !== r) return !1
                    }
                    let b;
                    if (r !== (c || 0) && s && a.emit("beforeSlideChangeStart"), a.updateProgress(v), b = r > p ? "next" : r < p ? "prev" : "reset", u && -v === a.translate || !u && v === a.translate) return a.updateActiveIndex(r), o.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== o.effect && a.setTranslate(v), "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)), !1;
                    if (o.cssMode) {
                        const e = a.isHorizontal(),
                            s = u ? v : -v;
                        if (0 === t) {
                            const t = a.virtual && a.params.virtual.enabled;
                            t && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), f[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => {
                                a.wrapperEl.style.scrollSnapType = "", a._swiperImmediateVirtual = !1
                            }))
                        } else {
                            if (!a.support.smoothScroll) return S({
                                swiper: a,
                                targetPosition: s,
                                side: e ? "left" : "top"
                            }), !0;
                            f.scrollTo({
                                [e ? "left" : "top"]: s,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return a.setTransition(t), a.setTranslate(v), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, i), a.transitionStart(s, b), 0 === t ? a.transitionEnd(s, b) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                        a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(s, b))
                    }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd)), !0
                },
                slideToLoop: function(e = 0, t = this.params.speed, s = !0, i) {
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const n = this;
                    let a = e;
                    return n.params.loop && (a += n.loopedSlides), n.slideTo(a, t, s, i)
                },
                slideNext: function(e = this.params.speed, t = !0, s) {
                    const i = this,
                        {
                            animating: n,
                            enabled: a,
                            params: r
                        } = i;
                    if (!a) return i;
                    let o = r.slidesPerGroup;
                    "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                    const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : o;
                    if (r.loop) {
                        if (n && r.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }
                    return r.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
                },
                slidePrev: function(e = this.params.speed, t = !0, s) {
                    const i = this,
                        {
                            params: n,
                            animating: a,
                            snapGrid: r,
                            slidesGrid: o,
                            rtlTranslate: l,
                            enabled: d
                        } = i;
                    if (!d) return i;
                    if (n.loop) {
                        if (a && n.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }

                    function c(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    const p = c(l ? i.translate : -i.translate),
                        u = r.map((e => c(e)));
                    let f = r[u.indexOf(p) - 1];
                    if (void 0 === f && n.cssMode) {
                        let e;
                        r.forEach(((t, s) => {
                            p >= t && (e = s)
                        })), void 0 !== e && (f = r[e > 0 ? e - 1 : e])
                    }
                    let h = 0;
                    if (void 0 !== f && (h = o.indexOf(f), h < 0 && (h = i.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (h = h - i.slidesPerViewDynamic("previous", !0) + 1, h = Math.max(h, 0))), n.rewind && i.isBeginning) {
                        const n = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                        return i.slideTo(n, e, t, s)
                    }
                    return i.slideTo(h, e, t, s)
                },
                slideReset: function(e = this.params.speed, t = !0, s) {
                    return this.slideTo(this.activeIndex, e, t, s)
                },
                slideToClosest: function(e = this.params.speed, t = !0, s, i = .5) {
                    const n = this;
                    let a = n.activeIndex;
                    const r = Math.min(n.params.slidesPerGroupSkip, a),
                        o = r + Math.floor((a - r) / n.params.slidesPerGroup),
                        l = n.rtlTranslate ? n.translate : -n.translate;
                    if (l >= n.snapGrid[o]) {
                        const e = n.snapGrid[o];
                        l - e > (n.snapGrid[o + 1] - e) * i && (a += n.params.slidesPerGroup)
                    } else {
                        const e = n.snapGrid[o - 1];
                        l - e <= (n.snapGrid[o] - e) * i && (a -= n.params.slidesPerGroup)
                    }
                    return a = Math.max(a, 0), a = Math.min(a, n.slidesGrid.length - 1), n.slideTo(a, e, t, s)
                },
                slideToClickedSlide: function() {
                    const e = this,
                        {
                            params: t,
                            $wrapperEl: s
                        } = e,
                        i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let n, a = e.clickedIndex;
                    if (t.loop) {
                        if (e.animating) return;
                        n = parseInt(g(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? a < e.loopedSlides - i / 2 || a > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), a = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), v((() => {
                            e.slideTo(a)
                        }))) : e.slideTo(a) : a > e.slides.length - i ? (e.loopFix(), a = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), v((() => {
                            e.slideTo(a)
                        }))) : e.slideTo(a)
                    } else e.slideTo(a)
                }
            };
            const D = {
                loopCreate: function() {
                    const e = this,
                        t = r(),
                        {
                            params: s,
                            $wrapperEl: i
                        } = e,
                        n = i.children().length > 0 ? g(i.children()[0].parentNode) : i;
                    n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
                    let a = n.children(`.${s.slideClass}`);
                    if (s.loopFillGroupWithBlank) {
                        const e = s.slidesPerGroup - a.length % s.slidesPerGroup;
                        if (e !== s.slidesPerGroup) {
                            for (let i = 0; i < e; i += 1) {
                                const e = g(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                                n.append(e)
                            }
                            a = n.children(`.${s.slideClass}`)
                        }
                    }
                    "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length), e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)), e.loopedSlides += s.loopAdditionalSlides, e.loopedSlides > a.length && e.params.loopedSlidesLimit && (e.loopedSlides = a.length);
                    const o = [],
                        l = [];
                    a.each(((e, t) => {
                        g(e).attr("data-swiper-slide-index", t)
                    }));
                    for (let t = 0; t < e.loopedSlides; t += 1) {
                        const e = t - Math.floor(t / a.length) * a.length;
                        l.push(a.eq(e)[0]), o.unshift(a.eq(a.length - e - 1)[0])
                    }
                    for (let e = 0; e < l.length; e += 1) n.append(g(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1) n.prepend(g(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
                },
                loopFix: function() {
                    const e = this;
                    e.emit("beforeLoopFix");
                    const {
                        activeIndex: t,
                        slides: s,
                        loopedSlides: i,
                        allowSlidePrev: n,
                        allowSlideNext: a,
                        snapGrid: r,
                        rtlTranslate: o
                    } = e;
                    let l;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    const d = -r[t] - e.getTranslate();
                    if (t < i) {
                        l = s.length - 3 * i + t, l += i;
                        e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
                    } else if (t >= s.length - i) {
                        l = -s.length + t + i, l += i;
                        e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
                    }
                    e.allowSlidePrev = n, e.allowSlideNext = a, e.emit("loopFix")
                },
                loopDestroy: function() {
                    const {
                        $wrapperEl: e,
                        params: t,
                        slides: s
                    } = this;
                    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index")
                }
            };

            function N(e) {
                const t = this,
                    s = r(),
                    i = l(),
                    n = t.touchEventsData,
                    {
                        params: a,
                        touches: o,
                        enabled: d
                    } = t;
                if (!d) return;
                if (t.animating && a.preventInteractionOnTransition) return;
                !t.animating && a.cssMode && a.loop && t.loopFix();
                let c = e;
                c.originalEvent && (c = c.originalEvent);
                let p = g(c.target);
                if ("wrapper" === a.touchEventsTarget && !p.closest(t.wrapperEl).length) return;
                if (n.isTouchEvent = "touchstart" === c.type, !n.isTouchEvent && "which" in c && 3 === c.which) return;
                if (!n.isTouchEvent && "button" in c && c.button > 0) return;
                if (n.isTouched && n.isMoved) return;
                const u = !!a.noSwipingClass && "" !== a.noSwipingClass,
                    f = e.composedPath ? e.composedPath() : e.path;
                u && c.target && c.target.shadowRoot && f && (p = g(f[0]));
                const h = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`,
                    m = !(!c.target || !c.target.shadowRoot);
                if (a.noSwiping && (m ? function(e, t = this) {
                        return function t(s) {
                            if (!s || s === r() || s === l()) return null;
                            s.assignedSlot && (s = s.assignedSlot);
                            const i = s.closest(e);
                            return i || s.getRootNode ? i || t(s.getRootNode().host) : null
                        }(t)
                    }(h, p[0]) : p.closest(h)[0])) return void(t.allowClick = !0);
                if (a.swipeHandler && !p.closest(a.swipeHandler)[0]) return;
                o.currentX = "touchstart" === c.type ? c.targetTouches[0].pageX : c.pageX, o.currentY = "touchstart" === c.type ? c.targetTouches[0].pageY : c.pageY;
                const v = o.currentX,
                    w = o.currentY,
                    y = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                    C = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                if (y && (v <= C || v >= i.innerWidth - C)) {
                    if ("prevent" !== y) return;
                    e.preventDefault()
                }
                if (Object.assign(n, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0
                    }), o.startX = v, o.startY = w, n.touchStartTime = b(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, a.threshold > 0 && (n.allowThresholdMove = !1), "touchstart" !== c.type) {
                    let e = !0;
                    p.is(n.focusableElements) && (e = !1, "SELECT" === p[0].nodeName && (n.isTouched = !1)), s.activeElement && g(s.activeElement).is(n.focusableElements) && s.activeElement !== p[0] && s.activeElement.blur();
                    const i = e && t.allowTouchMove && a.touchStartPreventDefault;
                    !a.touchStartForcePreventDefault && !i || p[0].isContentEditable || c.preventDefault()
                }
                t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", c)
            }

            function _(e) {
                const t = r(),
                    s = this,
                    i = s.touchEventsData,
                    {
                        params: n,
                        touches: a,
                        rtlTranslate: o,
                        enabled: l
                    } = s;
                if (!l) return;
                let d = e;
                if (d.originalEvent && (d = d.originalEvent), !i.isTouched) return void(i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", d));
                if (i.isTouchEvent && "touchmove" !== d.type) return;
                const c = "touchmove" === d.type && d.targetTouches && (d.targetTouches[0] || d.changedTouches[0]),
                    p = "touchmove" === d.type ? c.pageX : d.pageX,
                    u = "touchmove" === d.type ? c.pageY : d.pageY;
                if (d.preventedByNestedSwiper) return a.startX = p, void(a.startY = u);
                if (!s.allowTouchMove) return g(d.target).is(i.focusableElements) || (s.allowClick = !1), void(i.isTouched && (Object.assign(a, {
                    startX: p,
                    startY: u,
                    currentX: p,
                    currentY: u
                }), i.touchStartTime = b()));
                if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
                    if (s.isVertical()) {
                        if (u < a.startY && s.translate <= s.maxTranslate() || u > a.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
                    } else if (p < a.startX && s.translate <= s.maxTranslate() || p > a.startX && s.translate >= s.minTranslate()) return;
                if (i.isTouchEvent && t.activeElement && d.target === t.activeElement && g(d.target).is(i.focusableElements)) return i.isMoved = !0, void(s.allowClick = !1);
                if (i.allowTouchCallbacks && s.emit("touchMove", d), d.targetTouches && d.targetTouches.length > 1) return;
                a.currentX = p, a.currentY = u;
                const f = a.currentX - a.startX,
                    h = a.currentY - a.startY;
                if (s.params.threshold && Math.sqrt(f ** 2 + h ** 2) < s.params.threshold) return;
                if (void 0 === i.isScrolling) {
                    let e;
                    s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : f * f + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(f)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > n.touchAngle : 90 - e > n.touchAngle)
                }
                if (i.isScrolling && s.emit("touchMoveOpposite", d), void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)), i.isScrolling) return void(i.isTouched = !1);
                if (!i.startMoving) return;
                s.allowClick = !1, !n.cssMode && d.cancelable && d.preventDefault(), n.touchMoveStopPropagation && !n.nested && d.stopPropagation(), i.isMoved || (n.loop && !n.cssMode && s.loopFix(), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !n.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", d)), s.emit("sliderMove", d), i.isMoved = !0;
                let m = s.isHorizontal() ? f : h;
                a.diff = m, m *= n.touchRatio, o && (m = -m), s.swipeDirection = m > 0 ? "prev" : "next", i.currentTranslate = m + i.startTranslate;
                let v = !0,
                    w = n.resistanceRatio;
                if (n.touchReleaseOnEdges && (w = 0), m > 0 && i.currentTranslate > s.minTranslate() ? (v = !1, n.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** w)) : m < 0 && i.currentTranslate < s.maxTranslate() && (v = !1, n.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** w)), v && (d.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), n.threshold > 0) {
                    if (!(Math.abs(m) > n.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
                    if (!i.allowThresholdMove) return i.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, i.currentTranslate = i.startTranslate, void(a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                }
                n.followFinger && !n.cssMode && ((n.freeMode && n.freeMode.enabled && s.freeMode || n.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
            }

            function j(e) {
                const t = this,
                    s = t.touchEventsData,
                    {
                        params: i,
                        touches: n,
                        rtlTranslate: a,
                        slidesGrid: r,
                        enabled: o
                    } = t;
                if (!o) return;
                let l = e;
                if (l.originalEvent && (l = l.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", l), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && i.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
                i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                const d = b(),
                    c = d - s.touchStartTime;
                if (t.allowClick) {
                    const e = l.path || l.composedPath && l.composedPath();
                    t.updateClickedSlide(e && e[0] || l.target), t.emit("tap click", l), c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)
                }
                if (s.lastClickTime = b(), v((() => {
                        t.destroyed || (t.allowClick = !0)
                    })), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
                let p;
                if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, p = i.followFinger ? a ? t.translate : -t.translate : -s.currentTranslate, i.cssMode) return;
                if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({
                    currentPos: p
                });
                let u = 0,
                    f = t.slidesSizesGrid[0];
                for (let e = 0; e < r.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
                    const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                    void 0 !== r[e + t] ? p >= r[e] && p < r[e + t] && (u = e, f = r[e + t] - r[e]) : p >= r[e] && (u = e, f = r[r.length - 1] - r[r.length - 2])
                }
                let h = null,
                    m = null;
                i.rewind && (t.isBeginning ? m = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (h = 0));
                const g = (p - r[u]) / f,
                    w = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                if (c > i.longSwipesMs) {
                    if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (g >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? h : u + w) : t.slideTo(u)), "prev" === t.swipeDirection && (g > 1 - i.longSwipesRatio ? t.slideTo(u + w) : null !== m && g < 0 && Math.abs(g) > i.longSwipesRatio ? t.slideTo(m) : t.slideTo(u))
                } else {
                    if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                    t.navigation && (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl) ? l.target === t.navigation.nextEl ? t.slideTo(u + w) : t.slideTo(u) : ("next" === t.swipeDirection && t.slideTo(null !== h ? h : u + w), "prev" === t.swipeDirection && t.slideTo(null !== m ? m : u))
                }
            }

            function G() {
                const e = this,
                    {
                        params: t,
                        el: s
                    } = e;
                if (s && 0 === s.offsetWidth) return;
                t.breakpoints && e.setBreakpoint();
                const {
                    allowSlideNext: i,
                    allowSlidePrev: n,
                    snapGrid: a
                } = e;
                e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = n, e.allowSlideNext = i, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow()
            }

            function B(e) {
                const t = this;
                t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
            }

            function H() {
                const e = this,
                    {
                        wrapperEl: t,
                        rtlTranslate: s,
                        enabled: i
                    } = e;
                if (!i) return;
                let n;
                e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
                const a = e.maxTranslate() - e.minTranslate();
                n = 0 === a ? 0 : (e.translate - e.minTranslate()) / a, n !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
            }
            let F = !1;

            function q() {}
            const W = (e, t) => {
                const s = r(),
                    {
                        params: i,
                        touchEvents: n,
                        el: a,
                        wrapperEl: o,
                        device: l,
                        support: d
                    } = e,
                    c = !!i.nested,
                    p = "on" === t ? "addEventListener" : "removeEventListener",
                    u = t;
                if (d.touch) {
                    const t = !("touchstart" !== n.start || !d.passiveListener || !i.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    a[p](n.start, e.onTouchStart, t), a[p](n.move, e.onTouchMove, d.passiveListener ? {
                        passive: !1,
                        capture: c
                    } : c), a[p](n.end, e.onTouchEnd, t), n.cancel && a[p](n.cancel, e.onTouchEnd, t)
                } else a[p](n.start, e.onTouchStart, !1), s[p](n.move, e.onTouchMove, c), s[p](n.end, e.onTouchEnd, !1);
                (i.preventClicks || i.preventClicksPropagation) && a[p]("click", e.onClick, !0), i.cssMode && o[p]("scroll", e.onScroll), i.updateOnWindowResize ? e[u](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : e[u]("observerUpdate", G, !0)
            };
            const V = {
                    attachEvents: function() {
                        const e = this,
                            t = r(),
                            {
                                params: s,
                                support: i
                            } = e;
                        e.onTouchStart = N.bind(e), e.onTouchMove = _.bind(e), e.onTouchEnd = j.bind(e), s.cssMode && (e.onScroll = H.bind(e)), e.onClick = B.bind(e), i.touch && !F && (t.addEventListener("touchstart", q), F = !0), W(e, "on")
                    },
                    detachEvents: function() {
                        W(this, "off")
                    }
                },
                R = (e, t) => e.grid && t.grid && t.grid.rows > 1;
            const Y = {
                setBreakpoint: function() {
                    const e = this,
                        {
                            activeIndex: t,
                            initialized: s,
                            loopedSlides: i = 0,
                            params: n,
                            $el: a
                        } = e,
                        r = n.breakpoints;
                    if (!r || r && 0 === Object.keys(r).length) return;
                    const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in r ? r[o] : void 0) || e.originalParams,
                        d = R(e, n),
                        c = R(e, l),
                        p = n.enabled;
                    d && !c ? (a.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (a.addClass(`${n.containerModifierClass}grid`), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === n.grid.fill) && a.addClass(`${n.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => {
                        const s = n[t] && n[t].enabled,
                            i = l[t] && l[t].enabled;
                        s && !i && e[t].disable(), !s && i && e[t].enable()
                    }));
                    const u = l.direction && l.direction !== n.direction,
                        f = n.loop && (l.slidesPerView !== n.slidesPerView || u);
                    u && s && e.changeDirection(), C(e.params, l);
                    const h = e.params.enabled;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), p && !h ? e.disable() : !p && h && e.enable(), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", l), f && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                },
                getBreakpoint: function(e, t = "window", s) {
                    if (!e || "container" === t && !s) return;
                    let i = !1;
                    const n = l(),
                        a = "window" === t ? n.innerHeight : s.clientHeight,
                        r = Object.keys(e).map((e => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return {
                                    value: a * t,
                                    point: e
                                }
                            }
                            return {
                                value: e,
                                point: e
                            }
                        }));
                    r.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
                    for (let e = 0; e < r.length; e += 1) {
                        const {
                            point: a,
                            value: o
                        } = r[e];
                        "window" === t ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = a) : o <= s.clientWidth && (i = a)
                    }
                    return i || "max"
                }
            };
            const X = {
                addClasses: function() {
                    const e = this,
                        {
                            classNames: t,
                            params: s,
                            rtl: i,
                            $el: n,
                            device: a,
                            support: r
                        } = e,
                        o = function(e, t) {
                            const s = [];
                            return e.forEach((e => {
                                "object" == typeof e ? Object.keys(e).forEach((i => {
                                    e[i] && s.push(t + i)
                                })) : "string" == typeof e && s.push(t + e)
                            })), s
                        }(["initialized", s.direction, {
                            "pointer-events": !r.touch
                        }, {
                            "free-mode": e.params.freeMode && s.freeMode.enabled
                        }, {
                            autoheight: s.autoHeight
                        }, {
                            rtl: i
                        }, {
                            grid: s.grid && s.grid.rows > 1
                        }, {
                            "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                        }, {
                            android: a.android
                        }, {
                            ios: a.ios
                        }, {
                            "css-mode": s.cssMode
                        }, {
                            centered: s.cssMode && s.centeredSlides
                        }, {
                            "watch-progress": s.watchSlidesProgress
                        }], s.containerModifierClass);
                    t.push(...o), n.addClass([...t].join(" ")), e.emitContainerClasses()
                },
                removeClasses: function() {
                    const {
                        $el: e,
                        classNames: t
                    } = this;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            };
            const U = {
                init: !0,
                direction: "horizontal",
                touchEventsTarget: "wrapper",
                initialSlide: 0,
                speed: 300,
                cssMode: !1,
                updateOnWindowResize: !0,
                resizeObserver: !0,
                nested: !1,
                createElements: !1,
                enabled: !0,
                focusableElements: "input, select, option, textarea, button, video, label",
                width: null,
                height: null,
                preventInteractionOnTransition: !1,
                userAgent: null,
                url: null,
                edgeSwipeDetection: !1,
                edgeSwipeThreshold: 20,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                breakpoints: void 0,
                breakpointsBase: "window",
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerGroup: 1,
                slidesPerGroupSkip: 0,
                slidesPerGroupAuto: !1,
                centeredSlides: !1,
                centeredSlidesBounds: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                normalizeSlideIndex: !0,
                centerInsufficientSlides: !1,
                watchOverflow: !0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                allowTouchMove: !0,
                threshold: 0,
                touchMoveStopPropagation: !1,
                touchStartPreventDefault: !0,
                touchStartForcePreventDefault: !1,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                resistance: !0,
                resistanceRatio: .85,
                watchSlidesProgress: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                loopedSlidesLimit: !0,
                loopFillGroupWithBlank: !1,
                loopPreventsSlide: !0,
                rewind: !1,
                allowSlidePrev: !0,
                allowSlideNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                noSwipingSelector: null,
                passiveListeners: !0,
                maxBackfaceHiddenSlides: 10,
                containerModifierClass: "swiper-",
                slideClass: "swiper-slide",
                slideBlankClass: "swiper-slide-invisible-blank",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                runCallbacksOnInit: !0,
                _emitClasses: !1
            };

            function K(e, t) {
                return function(s = {}) {
                    const i = Object.keys(s)[0],
                        n = s[i];
                    "object" == typeof n && null !== n ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = {
                        auto: !0
                    }), i in e && "enabled" in n ? (!0 === e[i] && (e[i] = {
                        enabled: !0
                    }), "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {
                        enabled: !1
                    }), C(t, s)) : C(t, s)) : C(t, s)
                }
            }
            const Z = {
                    eventsEmitter: P,
                    update: L,
                    translate: z,
                    transition: {
                        setTransition: function(e, t) {
                            const s = this;
                            s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t)
                        },
                        transitionStart: function(e = !0, t) {
                            const s = this,
                                {
                                    params: i
                                } = s;
                            i.cssMode || (i.autoHeight && s.updateAutoHeight(), A({
                                swiper: s,
                                runCallbacks: e,
                                direction: t,
                                step: "Start"
                            }))
                        },
                        transitionEnd: function(e = !0, t) {
                            const s = this,
                                {
                                    params: i
                                } = s;
                            s.animating = !1, i.cssMode || (s.setTransition(0), A({
                                swiper: s,
                                runCallbacks: e,
                                direction: t,
                                step: "End"
                            }))
                        }
                    },
                    slide: I,
                    loop: D,
                    grabCursor: {
                        setGrabCursor: function(e) {
                            const t = this;
                            if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                            const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                            s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab"
                        },
                        unsetGrabCursor: function() {
                            const e = this;
                            e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
                        }
                    },
                    events: V,
                    breakpoints: Y,
                    checkOverflow: {
                        checkOverflow: function() {
                            const e = this,
                                {
                                    isLocked: t,
                                    params: s
                                } = e,
                                {
                                    slidesOffsetBefore: i
                                } = s;
                            if (i) {
                                const t = e.slides.length - 1,
                                    s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                                e.isLocked = e.size > s
                            } else e.isLocked = 1 === e.snapGrid.length;
                            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                        }
                    },
                    classes: X,
                    images: {
                        loadImage: function(e, t, s, i, n, a) {
                            const r = l();
                            let o;

                            function d() {
                                a && a()
                            }
                            g(e).parent("picture")[0] || e.complete && n ? d() : t ? (o = new r.Image, o.onload = d, o.onerror = d, i && (o.sizes = i), s && (o.srcset = s), t && (o.src = t)) : d()
                        },
                        preloadImages: function() {
                            const e = this;

                            function t() {
                                null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                            }
                            e.imagesToLoad = e.$el.find("img");
                            for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                                const i = e.imagesToLoad[s];
                                e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                            }
                        }
                    }
                },
                J = {};
            class Q {
                constructor(...e) {
                    let t, s;
                    if (1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? s = e[0] : [t, s] = e, s || (s = {}), s = C({}, s), t && !s.el && (s.el = t), s.el && g(s.el).length > 1) {
                        const e = [];
                        return g(s.el).each((t => {
                            const i = C({}, s, {
                                el: t
                            });
                            e.push(new Q(i))
                        })), e
                    }
                    const i = this;
                    i.__swiper__ = !0, i.support = M(), i.device = $({
                        userAgent: s.userAgent
                    }), i.browser = O(), i.eventsListeners = {}, i.eventsAnyListeners = [], i.modules = [...i.__modules__], s.modules && Array.isArray(s.modules) && i.modules.push(...s.modules);
                    const n = {};
                    i.modules.forEach((e => {
                        e({
                            swiper: i,
                            extendParams: K(s, n),
                            on: i.on.bind(i),
                            once: i.once.bind(i),
                            off: i.off.bind(i),
                            emit: i.emit.bind(i)
                        })
                    }));
                    const a = C({}, U, n);
                    return i.params = C({}, a, J, s), i.originalParams = C({}, i.params), i.passedParams = C({}, s), i.params && i.params.on && Object.keys(i.params.on).forEach((e => {
                        i.on(e, i.params.on[e])
                    })), i.params && i.params.onAny && i.onAny(i.params.onAny), i.$ = g, Object.assign(i, {
                        enabled: i.params.enabled,
                        el: t,
                        classNames: [],
                        slides: g(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: () => "horizontal" === i.params.direction,
                        isVertical: () => "vertical" === i.params.direction,
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: i.params.allowSlideNext,
                        allowSlidePrev: i.params.allowSlidePrev,
                        touchEvents: function() {
                            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                                t = ["pointerdown", "pointermove", "pointerup"];
                            return i.touchEventsTouch = {
                                start: e[0],
                                move: e[1],
                                end: e[2],
                                cancel: e[3]
                            }, i.touchEventsDesktop = {
                                start: t[0],
                                move: t[1],
                                end: t[2]
                            }, i.support.touch || !i.params.simulateTouch ? i.touchEventsTouch : i.touchEventsDesktop
                        }(),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            focusableElements: i.params.focusableElements,
                            lastClickTime: b(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: i.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), i.emit("_swiper"), i.params.init && i.init(), i
                }
                enable() {
                    const e = this;
                    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
                }
                disable() {
                    const e = this;
                    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
                }
                setProgress(e, t) {
                    const s = this;
                    e = Math.min(Math.max(e, 0), 1);
                    const i = s.minTranslate(),
                        n = (s.maxTranslate() - i) * e + i;
                    s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
                }
                emitContainerClasses() {
                    const e = this;
                    if (!e.params._emitClasses || !e.el) return;
                    const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
                    e.emit("_containerClasses", t.join(" "))
                }
                getSlideClasses(e) {
                    const t = this;
                    return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
                }
                emitSlidesClasses() {
                    const e = this;
                    if (!e.params._emitClasses || !e.el) return;
                    const t = [];
                    e.slides.each((s => {
                        const i = e.getSlideClasses(s);
                        t.push({
                            slideEl: s,
                            classNames: i
                        }), e.emit("_slideClass", s, i)
                    })), e.emit("_slideClasses", t)
                }
                slidesPerViewDynamic(e = "current", t = !1) {
                    const {
                        params: s,
                        slides: i,
                        slidesGrid: n,
                        slidesSizesGrid: a,
                        size: r,
                        activeIndex: o
                    } = this;
                    let l = 1;
                    if (s.centeredSlides) {
                        let e, t = i[o].swiperSlideSize;
                        for (let s = o + 1; s < i.length; s += 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > r && (e = !0));
                        for (let s = o - 1; s >= 0; s -= 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > r && (e = !0))
                    } else if ("current" === e)
                        for (let e = o + 1; e < i.length; e += 1) {
                            (t ? n[e] + a[e] - n[o] < r : n[e] - n[o] < r) && (l += 1)
                        } else
                            for (let e = o - 1; e >= 0; e -= 1) {
                                n[o] - n[e] < r && (l += 1)
                            }
                    return l
                }
                update() {
                    const e = this;
                    if (!e || e.destroyed) return;
                    const {
                        snapGrid: t,
                        params: s
                    } = e;

                    function i() {
                        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
                    }
                    let n;
                    s.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (i(), e.params.autoHeight && e.updateAutoHeight()) : (n = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), n || i()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }
                changeDirection(e, t = !0) {
                    const s = this,
                        i = s.params.direction;
                    return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.$el.removeClass(`${s.params.containerModifierClass}${i}`).addClass(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.each((t => {
                        "vertical" === e ? t.style.width = "" : t.style.height = ""
                    })), s.emit("changeDirection"), t && s.update()), s
                }
                changeLanguageDirection(e) {
                    const t = this;
                    t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
                }
                mount(e) {
                    const t = this;
                    if (t.mounted) return !0;
                    const s = g(e || t.params.el);
                    if (!(e = s[0])) return !1;
                    e.swiper = t;
                    const i = () => `.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;
                    let n = (() => {
                        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                            const t = g(e.shadowRoot.querySelector(i()));
                            return t.children = e => s.children(e), t
                        }
                        return s.children ? s.children(i()) : g(s).children(i())
                    })();
                    if (0 === n.length && t.params.createElements) {
                        const e = r().createElement("div");
                        n = g(e), e.className = t.params.wrapperClass, s.append(e), s.children(`.${t.params.slideClass}`).each((e => {
                            n.append(e)
                        }))
                    }
                    return Object.assign(t, {
                        $el: s,
                        el: e,
                        $wrapperEl: n,
                        wrapperEl: n[0],
                        mounted: !0,
                        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                        rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
                        wrongRTL: "-webkit-box" === n.css("display")
                    }), !0
                }
                init(e) {
                    const t = this;
                    if (t.initialized) return t;
                    return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
                }
                destroy(e = !0, t = !0) {
                    const s = this,
                        {
                            params: i,
                            $el: n,
                            $wrapperEl: a,
                            slides: r
                        } = s;
                    return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), n.removeAttr("style"), a.removeAttr("style"), r && r.length && r.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => {
                        s.off(e)
                    })), !1 !== e && (s.$el[0].swiper = null, function(e) {
                        const t = e;
                        Object.keys(t).forEach((e => {
                            try {
                                t[e] = null
                            } catch (e) {}
                            try {
                                delete t[e]
                            } catch (e) {}
                        }))
                    }(s)), s.destroyed = !0), null
                }
                static extendDefaults(e) {
                    C(J, e)
                }
                static get extendedDefaults() {
                    return J
                }
                static get defaults() {
                    return U
                }
                static installModule(e) {
                    Q.prototype.__modules__ || (Q.prototype.__modules__ = []);
                    const t = Q.prototype.__modules__;
                    "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
                }
                static use(e) {
                    return Array.isArray(e) ? (e.forEach((e => Q.installModule(e))), Q) : (Q.installModule(e), Q)
                }
            }
            Object.keys(Z).forEach((e => {
                Object.keys(Z[e]).forEach((t => {
                    Q.prototype[t] = Z[e][t]
                }))
            })), Q.use([function({
                swiper: e,
                on: t,
                emit: s
            }) {
                const i = l();
                let n = null,
                    a = null;
                const r = () => {
                        e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"))
                    },
                    o = () => {
                        e && !e.destroyed && e.initialized && s("orientationchange")
                    };
                t("init", (() => {
                    e.params.resizeObserver && void 0 !== i.ResizeObserver ? e && !e.destroyed && e.initialized && (n = new ResizeObserver((t => {
                        a = i.requestAnimationFrame((() => {
                            const {
                                width: s,
                                height: i
                            } = e;
                            let n = s,
                                a = i;
                            t.forEach((({
                                contentBoxSize: t,
                                contentRect: s,
                                target: i
                            }) => {
                                i && i !== e.el || (n = s ? s.width : (t[0] || t).inlineSize, a = s ? s.height : (t[0] || t).blockSize)
                            })), n === s && a === i || r()
                        }))
                    })), n.observe(e.el)) : (i.addEventListener("resize", r), i.addEventListener("orientationchange", o))
                })), t("destroy", (() => {
                    a && i.cancelAnimationFrame(a), n && n.unobserve && e.el && (n.unobserve(e.el), n = null), i.removeEventListener("resize", r), i.removeEventListener("orientationchange", o)
                }))
            }, function({
                swiper: e,
                extendParams: t,
                on: s,
                emit: i
            }) {
                const n = [],
                    a = l(),
                    r = (e, t = {}) => {
                        const s = new(a.MutationObserver || a.WebkitMutationObserver)((e => {
                            if (1 === e.length) return void i("observerUpdate", e[0]);
                            const t = function() {
                                i("observerUpdate", e[0])
                            };
                            a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
                        }));
                        s.observe(e, {
                            attributes: void 0 === t.attributes || t.attributes,
                            childList: void 0 === t.childList || t.childList,
                            characterData: void 0 === t.characterData || t.characterData
                        }), n.push(s)
                    };
                t({
                    observer: !1,
                    observeParents: !1,
                    observeSlideChildren: !1
                }), s("init", (() => {
                    if (e.params.observer) {
                        if (e.params.observeParents) {
                            const t = e.$el.parents();
                            for (let e = 0; e < t.length; e += 1) r(t[e])
                        }
                        r(e.$el[0], {
                            childList: e.params.observeSlideChildren
                        }), r(e.$wrapperEl[0], {
                            attributes: !1
                        })
                    }
                })), s("destroy", (() => {
                    n.forEach((e => {
                        e.disconnect()
                    })), n.splice(0, n.length)
                }))
            }]);
            const ee = Q;

            function te(e, t, s, i) {
                const n = r();
                return e.params.createElements && Object.keys(i).forEach((a => {
                    if (!s[a] && !0 === s.auto) {
                        let r = e.$el.children(`.${i[a]}`)[0];
                        r || (r = n.createElement("div"), r.className = i[a], e.$el.append(r)), s[a] = r, t[a] = r
                    }
                })), s
            }

            function se({
                swiper: e,
                extendParams: t,
                on: s,
                emit: i
            }) {
                function n(t) {
                    let s;
                    return t && (s = g(t), e.params.uniqueNavElements && "string" == typeof t && s.length > 1 && 1 === e.$el.find(t).length && (s = e.$el.find(t))), s
                }

                function a(t, s) {
                    const i = e.params.navigation;
                    t && t.length > 0 && (t[s ? "addClass" : "removeClass"](i.disabledClass), t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s), e.params.watchOverflow && e.enabled && t[e.isLocked ? "addClass" : "removeClass"](i.lockClass))
                }

                function r() {
                    if (e.params.loop) return;
                    const {
                        $nextEl: t,
                        $prevEl: s
                    } = e.navigation;
                    a(s, e.isBeginning && !e.params.rewind), a(t, e.isEnd && !e.params.rewind)
                }

                function o(t) {
                    t.preventDefault(), (!e.isBeginning || e.params.loop || e.params.rewind) && (e.slidePrev(), i("navigationPrev"))
                }

                function l(t) {
                    t.preventDefault(), (!e.isEnd || e.params.loop || e.params.rewind) && (e.slideNext(), i("navigationNext"))
                }

                function d() {
                    const t = e.params.navigation;
                    if (e.params.navigation = te(e, e.originalParams.navigation, e.params.navigation, {
                            nextEl: "swiper-button-next",
                            prevEl: "swiper-button-prev"
                        }), !t.nextEl && !t.prevEl) return;
                    const s = n(t.nextEl),
                        i = n(t.prevEl);
                    s && s.length > 0 && s.on("click", l), i && i.length > 0 && i.on("click", o), Object.assign(e.navigation, {
                        $nextEl: s,
                        nextEl: s && s[0],
                        $prevEl: i,
                        prevEl: i && i[0]
                    }), e.enabled || (s && s.addClass(t.lockClass), i && i.addClass(t.lockClass))
                }

                function c() {
                    const {
                        $nextEl: t,
                        $prevEl: s
                    } = e.navigation;
                    t && t.length && (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)), s && s.length && (s.off("click", o), s.removeClass(e.params.navigation.disabledClass))
                }
                t({
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                        hideOnClick: !1,
                        disabledClass: "swiper-button-disabled",
                        hiddenClass: "swiper-button-hidden",
                        lockClass: "swiper-button-lock",
                        navigationDisabledClass: "swiper-navigation-disabled"
                    }
                }), e.navigation = {
                    nextEl: null,
                    $nextEl: null,
                    prevEl: null,
                    $prevEl: null
                }, s("init", (() => {
                    !1 === e.params.navigation.enabled ? p() : (d(), r())
                })), s("toEdge fromEdge lock unlock", (() => {
                    r()
                })), s("destroy", (() => {
                    c()
                })), s("enable disable", (() => {
                    const {
                        $nextEl: t,
                        $prevEl: s
                    } = e.navigation;
                    t && t[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), s && s[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
                })), s("click", ((t, s) => {
                    const {
                        $nextEl: n,
                        $prevEl: a
                    } = e.navigation, r = s.target;
                    if (e.params.navigation.hideOnClick && !g(r).is(a) && !g(r).is(n)) {
                        if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === r || e.pagination.el.contains(r))) return;
                        let t;
                        n ? t = n.hasClass(e.params.navigation.hiddenClass) : a && (t = a.hasClass(e.params.navigation.hiddenClass)), i(!0 === t ? "navigationShow" : "navigationHide"), n && n.toggleClass(e.params.navigation.hiddenClass), a && a.toggleClass(e.params.navigation.hiddenClass)
                    }
                }));
                const p = () => {
                    e.$el.addClass(e.params.navigation.navigationDisabledClass), c()
                };
                Object.assign(e.navigation, {
                    enable: () => {
                        e.$el.removeClass(e.params.navigation.navigationDisabledClass), d(), r()
                    },
                    disable: p,
                    update: r,
                    init: d,
                    destroy: c
                })
            }

            function ie(e = "") {
                return `.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`
            }

            function ne({
                swiper: e,
                extendParams: t,
                on: s,
                emit: i
            }) {
                const n = "swiper-pagination";
                let a;
                t({
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: e => e,
                        formatFractionTotal: e => e,
                        bulletClass: `${n}-bullet`,
                        bulletActiveClass: `${n}-bullet-active`,
                        modifierClass: `${n}-`,
                        currentClass: `${n}-current`,
                        totalClass: `${n}-total`,
                        hiddenClass: `${n}-hidden`,
                        progressbarFillClass: `${n}-progressbar-fill`,
                        progressbarOppositeClass: `${n}-progressbar-opposite`,
                        clickableClass: `${n}-clickable`,
                        lockClass: `${n}-lock`,
                        horizontalClass: `${n}-horizontal`,
                        verticalClass: `${n}-vertical`,
                        paginationDisabledClass: `${n}-disabled`
                    }
                }), e.pagination = {
                    el: null,
                    $el: null,
                    bullets: []
                };
                let r = 0;

                function o() {
                    return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length
                }

                function l(t, s) {
                    const {
                        bulletActiveClass: i
                    } = e.params.pagination;
                    t[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`)
                }

                function d() {
                    const t = e.rtl,
                        s = e.params.pagination;
                    if (o()) return;
                    const n = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        d = e.pagination.$el;
                    let c;
                    const p = e.params.loop ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? (c = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup), c > n - 1 - 2 * e.loopedSlides && (c -= n - 2 * e.loopedSlides), c > p - 1 && (c -= p), c < 0 && "bullets" !== e.params.paginationType && (c = p + c)) : c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                        const i = e.pagination.bullets;
                        let n, o, p;
                        if (s.dynamicBullets && (a = i.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), d.css(e.isHorizontal() ? "width" : "height", a * (s.dynamicMainBullets + 4) + "px"), s.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (r += c - (e.previousIndex - e.loopedSlides || 0), r > s.dynamicMainBullets - 1 ? r = s.dynamicMainBullets - 1 : r < 0 && (r = 0)), n = Math.max(c - r, 0), o = n + (Math.min(i.length, s.dynamicMainBullets) - 1), p = (o + n) / 2), i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${s.bulletActiveClass}${e}`)).join(" ")), d.length > 1) i.each((e => {
                            const t = g(e),
                                i = t.index();
                            i === c && t.addClass(s.bulletActiveClass), s.dynamicBullets && (i >= n && i <= o && t.addClass(`${s.bulletActiveClass}-main`), i === n && l(t, "prev"), i === o && l(t, "next"))
                        }));
                        else {
                            const t = i.eq(c),
                                a = t.index();
                            if (t.addClass(s.bulletActiveClass), s.dynamicBullets) {
                                const t = i.eq(n),
                                    r = i.eq(o);
                                for (let e = n; e <= o; e += 1) i.eq(e).addClass(`${s.bulletActiveClass}-main`);
                                if (e.params.loop)
                                    if (a >= i.length) {
                                        for (let e = s.dynamicMainBullets; e >= 0; e -= 1) i.eq(i.length - e).addClass(`${s.bulletActiveClass}-main`);
                                        i.eq(i.length - s.dynamicMainBullets - 1).addClass(`${s.bulletActiveClass}-prev`)
                                    } else l(t, "prev"), l(r, "next");
                                else l(t, "prev"), l(r, "next")
                            }
                        }
                        if (s.dynamicBullets) {
                            const n = Math.min(i.length, s.dynamicMainBullets + 4),
                                r = (a * n - a) / 2 - p * a,
                                o = t ? "right" : "left";
                            i.css(e.isHorizontal() ? o : "top", `${r}px`)
                        }
                    }
                    if ("fraction" === s.type && (d.find(ie(s.currentClass)).text(s.formatFractionCurrent(c + 1)), d.find(ie(s.totalClass)).text(s.formatFractionTotal(p))), "progressbar" === s.type) {
                        let t;
                        t = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        const i = (c + 1) / p;
                        let n = 1,
                            a = 1;
                        "horizontal" === t ? n = i : a = i, d.find(ie(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`).transition(e.params.speed)
                    }
                    "custom" === s.type && s.renderCustom ? (d.html(s.renderCustom(e, c + 1, p)), i("paginationRender", d[0])) : i("paginationUpdate", d[0]), e.params.watchOverflow && e.enabled && d[e.isLocked ? "addClass" : "removeClass"](s.lockClass)
                }

                function c() {
                    const t = e.params.pagination;
                    if (o()) return;
                    const s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        n = e.pagination.$el;
                    let a = "";
                    if ("bullets" === t.type) {
                        let i = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                        e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && i > s && (i = s);
                        for (let s = 0; s < i; s += 1) t.renderBullet ? a += t.renderBullet.call(e, s, t.bulletClass) : a += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
                        n.html(a), e.pagination.bullets = n.find(ie(t.bulletClass))
                    }
                    "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`, n.html(a)), "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`, n.html(a)), "custom" !== t.type && i("paginationRender", e.pagination.$el[0])
                }

                function p() {
                    e.params.pagination = te(e, e.originalParams.pagination, e.params.pagination, {
                        el: "swiper-pagination"
                    });
                    const t = e.params.pagination;
                    if (!t.el) return;
                    let s = g(t.el);
                    0 !== s.length && (e.params.uniqueNavElements && "string" == typeof t.el && s.length > 1 && (s = e.$el.find(t.el), s.length > 1 && (s = s.filter((t => g(t).parents(".swiper")[0] === e.el)))), "bullets" === t.type && t.clickable && s.addClass(t.clickableClass), s.addClass(t.modifierClass + t.type), s.addClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass), "bullets" === t.type && t.dynamicBullets && (s.addClass(`${t.modifierClass}${t.type}-dynamic`), r = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && s.addClass(t.progressbarOppositeClass), t.clickable && s.on("click", ie(t.bulletClass), (function(t) {
                        t.preventDefault();
                        let s = g(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (s += e.loopedSlides), e.slideTo(s)
                    })), Object.assign(e.pagination, {
                        $el: s,
                        el: s[0]
                    }), e.enabled || s.addClass(t.lockClass))
                }

                function u() {
                    const t = e.params.pagination;
                    if (o()) return;
                    const s = e.pagination.$el;
                    s.removeClass(t.hiddenClass), s.removeClass(t.modifierClass + t.type), s.removeClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass), e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && s.off("click", ie(t.bulletClass))
                }
                s("init", (() => {
                    !1 === e.params.pagination.enabled ? f() : (p(), c(), d())
                })), s("activeIndexChange", (() => {
                    (e.params.loop || void 0 === e.snapIndex) && d()
                })), s("snapIndexChange", (() => {
                    e.params.loop || d()
                })), s("slidesLengthChange", (() => {
                    e.params.loop && (c(), d())
                })), s("snapGridLengthChange", (() => {
                    e.params.loop || (c(), d())
                })), s("destroy", (() => {
                    u()
                })), s("enable disable", (() => {
                    const {
                        $el: t
                    } = e.pagination;
                    t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass)
                })), s("lock unlock", (() => {
                    d()
                })), s("click", ((t, s) => {
                    const n = s.target,
                        {
                            $el: a
                        } = e.pagination;
                    if (e.params.pagination.el && e.params.pagination.hideOnClick && a && a.length > 0 && !g(n).hasClass(e.params.pagination.bulletClass)) {
                        if (e.navigation && (e.navigation.nextEl && n === e.navigation.nextEl || e.navigation.prevEl && n === e.navigation.prevEl)) return;
                        const t = a.hasClass(e.params.pagination.hiddenClass);
                        i(!0 === t ? "paginationShow" : "paginationHide"), a.toggleClass(e.params.pagination.hiddenClass)
                    }
                }));
                const f = () => {
                    e.$el.addClass(e.params.pagination.paginationDisabledClass), e.pagination.$el && e.pagination.$el.addClass(e.params.pagination.paginationDisabledClass), u()
                };
                Object.assign(e.pagination, {
                    enable: () => {
                        e.$el.removeClass(e.params.pagination.paginationDisabledClass), e.pagination.$el && e.pagination.$el.removeClass(e.params.pagination.paginationDisabledClass), p(), c(), d()
                    },
                    disable: f,
                    render: c,
                    update: d,
                    init: p,
                    destroy: u
                })
            }

            function ae({
                swiper: e,
                extendParams: t,
                on: s,
                emit: i
            }) {
                let n;

                function a() {
                    if (!e.size) return e.autoplay.running = !1, void(e.autoplay.paused = !1);
                    const t = e.slides.eq(e.activeIndex);
                    let s = e.params.autoplay.delay;
                    t.attr("data-swiper-autoplay") && (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(n), n = v((() => {
                        let t;
                        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), i("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? l() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), i("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), i("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), i("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? l() : (t = e.slideTo(0, e.params.speed, !0, !0), i("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), i("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && a()
                    }), s)
                }

                function o() {
                    return void 0 === n && (!e.autoplay.running && (e.autoplay.running = !0, i("autoplayStart"), a(), !0))
                }

                function l() {
                    return !!e.autoplay.running && (void 0 !== n && (n && (clearTimeout(n), n = void 0), e.autoplay.running = !1, i("autoplayStop"), !0))
                }

                function d(t) {
                    e.autoplay.running && (e.autoplay.paused || (n && clearTimeout(n), e.autoplay.paused = !0, 0 !== t && e.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach((t => {
                        e.$wrapperEl[0].addEventListener(t, p)
                    })) : (e.autoplay.paused = !1, a())))
                }

                function c() {
                    const t = r();
                    "hidden" === t.visibilityState && e.autoplay.running && d(), "visible" === t.visibilityState && e.autoplay.paused && (a(), e.autoplay.paused = !1)
                }

                function p(t) {
                    e && !e.destroyed && e.$wrapperEl && t.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach((t => {
                        e.$wrapperEl[0].removeEventListener(t, p)
                    })), e.autoplay.paused = !1, e.autoplay.running ? a() : l())
                }

                function u() {
                    e.params.autoplay.disableOnInteraction ? l() : (i("autoplayPause"), d()), ["transitionend", "webkitTransitionEnd"].forEach((t => {
                        e.$wrapperEl[0].removeEventListener(t, p)
                    }))
                }

                function f() {
                    e.params.autoplay.disableOnInteraction || (e.autoplay.paused = !1, i("autoplayResume"), a())
                }
                e.autoplay = {
                    running: !1,
                    paused: !1
                }, t({
                    autoplay: {
                        enabled: !1,
                        delay: 3e3,
                        waitForTransition: !0,
                        disableOnInteraction: !0,
                        stopOnLastSlide: !1,
                        reverseDirection: !1,
                        pauseOnMouseEnter: !1
                    }
                }), s("init", (() => {
                    if (e.params.autoplay.enabled) {
                        o();
                        r().addEventListener("visibilitychange", c), e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", u), e.$el.on("mouseleave", f))
                    }
                })), s("beforeTransitionStart", ((t, s, i) => {
                    e.autoplay.running && (i || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(s) : l())
                })), s("sliderFirstMove", (() => {
                    e.autoplay.running && (e.params.autoplay.disableOnInteraction ? l() : d())
                })), s("touchEnd", (() => {
                    e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && a()
                })), s("destroy", (() => {
                    e.$el.off("mouseenter", u), e.$el.off("mouseleave", f), e.autoplay.running && l();
                    r().removeEventListener("visibilitychange", c)
                })), Object.assign(e.autoplay, {
                    pause: d,
                    run: a,
                    start: o,
                    stop: l
                })
            }
        }
    }
]);

