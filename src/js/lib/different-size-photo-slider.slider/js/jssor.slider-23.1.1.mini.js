﻿(function (global, factory) {
    //为了防止nodejs加载这个文件出错
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("history requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {


    (function (i, g, c, h, e, k, f) {/*! Jssor */
        new (function () {
        });
        var d = i.$Jease$ = {
            $Swing: function (a) {
                return -c.cos(a * c.PI) / 2 + .5
            }, $Linear: function (a) {
                return a
            }, $InQuad: function (a) {
                return a * a
            }, $OutQuad: function (a) {
                return -a * (a - 2)
            }, $InOutQuad: function (a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a : -1 / 2 * (--a * (a - 2) - 1)
            }, $InCubic: function (a) {
                return a * a * a
            }, $OutCubic: function (a) {
                return (a -= 1) * a * a + 1
            }, $InOutCubic: function (a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a * a : 1 / 2 * ((a -= 2) * a * a + 2)
            }, $InQuart: function (a) {
                return a * a * a * a
            }, $OutQuart: function (a) {
                return -((a -= 1) * a * a * a - 1)
            }, $InOutQuart: function (a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a * a * a : -1 / 2 * ((a -= 2) * a * a * a - 2)
            }, $InQuint: function (a) {
                return a * a * a * a * a
            }, $OutQuint: function (a) {
                return (a -= 1) * a * a * a * a + 1
            }, $InOutQuint: function (a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a * a * a * a : 1 / 2 * ((a -= 2) * a * a * a * a + 2)
            }, $InSine: function (a) {
                return 1 - c.cos(c.PI / 2 * a)
            }, $OutSine: function (a) {
                return c.sin(c.PI / 2 * a)
            }, $InOutSine: function (a) {
                return -1 / 2 * (c.cos(c.PI * a) - 1)
            }, $InExpo: function (a) {
                return a == 0 ? 0 : c.pow(2, 10 * (a - 1))
            }, $OutExpo: function (a) {
                return a == 1 ? 1 : -c.pow(2, -10 * a) + 1
            }, $InOutExpo: function (a) {
                return a == 0 || a == 1 ? a : (a *= 2) < 1 ? 1 / 2 * c.pow(2, 10 * (a - 1)) : 1 / 2 * (-c.pow(2, -10 * --a) + 2)
            }, $InCirc: function (a) {
                return -(c.sqrt(1 - a * a) - 1)
            }, $OutCirc: function (a) {
                return c.sqrt(1 - (a -= 1) * a)
            }, $InOutCirc: function (a) {
                return (a *= 2) < 1 ? -1 / 2 * (c.sqrt(1 - a * a) - 1) : 1 / 2 * (c.sqrt(1 - (a -= 2) * a) + 1)
            }, $InElastic: function (a) {
                if (!a || a == 1)return a;
                var b = .3, d = .075;
                return -(c.pow(2, 10 * (a -= 1)) * c.sin((a - d) * 2 * c.PI / b))
            }, $OutElastic: function (a) {
                if (!a || a == 1)return a;
                var b = .3, d = .075;
                return c.pow(2, -10 * a) * c.sin((a - d) * 2 * c.PI / b) + 1
            }, $InOutElastic: function (a) {
                if (!a || a == 1)return a;
                var b = .45, d = .1125;
                return (a *= 2) < 1 ? -.5 * c.pow(2, 10 * (a -= 1)) * c.sin((a - d) * 2 * c.PI / b) : c.pow(2, -10 * (a -= 1)) * c.sin((a - d) * 2 * c.PI / b) * .5 + 1
            }, $InBack: function (a) {
                var b = 1.70158;
                return a * a * ((b + 1) * a - b)
            }, $OutBack: function (a) {
                var b = 1.70158;
                return (a -= 1) * a * ((b + 1) * a + b) + 1
            }, $InOutBack: function (a) {
                var b = 1.70158;
                return (a *= 2) < 1 ? 1 / 2 * a * a * (((b *= 1.525) + 1) * a - b) : 1 / 2 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
            }, $InBounce: function (a) {
                return 1 - d.$OutBounce(1 - a)
            }, $OutBounce: function (a) {
                return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            }, $InOutBounce: function (a) {
                return a < 1 / 2 ? d.$InBounce(a * 2) * .5 : d.$OutBounce(a * 2 - 1) * .5 + .5
            }, $GoBack: function (a) {
                return 1 - c.abs(2 - 1)
            }, $InWave: function (a) {
                return 1 - c.cos(a * c.PI * 2)
            }, $OutWave: function (a) {
                return c.sin(a * c.PI * 2)
            }, $OutJump: function (a) {
                return 1 - ((a *= 2) < 1 ? (a = 1 - a) * a * a : (a -= 1) * a * a)
            }, $InJump: function (a) {
                return (a *= 2) < 1 ? a * a * a : (a = 2 - a) * a * a
            }, $Early: c.ceil, $Late: c.floor
        };
        i.$JssorEasing$ = {
            $EaseSwing: d.$Swing,
            $EaseLinear: d.$Linear,
            $EaseInQuad: d.$InQuad,
            $EaseOutQuad: d.$OutQuad,
            $EaseInOutQuad: d.$InOutQuad,
            $EaseInCubic: d.$InCubic,
            $EaseOutCubic: d.$OutCubic,
            $EaseInOutCubic: d.$InOutCubic,
            $EaseInQuart: d.$InQuart,
            $EaseOutQuart: d.$OutQuart,
            $EaseInOutQuart: d.$InOutQuart,
            $EaseInQuint: d.$InQuint,
            $EaseOutQuint: d.$OutQuint,
            $EaseInOutQuint: d.$InOutQuint,
            $EaseInSine: d.$InSine,
            $EaseOutSine: d.$OutSine,
            $EaseInOutSine: d.$InOutSine,
            $EaseInExpo: d.$InExpo,
            $EaseOutExpo: d.$OutExpo,
            $EaseInOutExpo: d.$InOutExpo,
            $EaseInCirc: d.$InCirc,
            $EaseOutCirc: d.$OutCirc,
            $EaseInOutCirc: d.$InOutCirc,
            $EaseInElastic: d.$InElastic,
            $EaseOutElastic: d.$OutElastic,
            $EaseInOutElastic: d.$InOutElastic,
            $EaseInBack: d.$InBack,
            $EaseOutBack: d.$OutBack,
            $EaseInOutBack: d.$InOutBack,
            $EaseInBounce: d.$InBounce,
            $EaseOutBounce: d.$OutBounce,
            $EaseInOutBounce: d.$InOutBounce,
            $EaseGoBack: d.$GoBack,
            $EaseInWave: d.$InWave,
            $EaseOutWave: d.$OutWave,
            $EaseOutJump: d.$OutJump,
            $EaseInJump: d.$InJump
        };
        var b = new function () {
            var j = this, yb = /\S+/g, K = 1, ib = 2, lb = 3, kb = 4, ob = 5, L, s = 0, l = 0, t = 0, A = 0, B = 0, E = navigator, tb = E.appName, o = E.userAgent, q = parseFloat;

            function Gb() {
                if (!L) {
                    L = {Ge: "ontouchstart"in i || "createTouch"in g};
                    var a;
                    if (E.pointerEnabled || (a = E.msPointerEnabled))L.re = a ? "msTouchAction" : "touchAction"
                }
                return L
            }

            function v(h) {
                if (!s) {
                    s = -1;
                    if (tb == "Microsoft Internet Explorer" && !!i.attachEvent && !!i.ActiveXObject) {
                        var e = o.indexOf("MSIE");
                        s = K;
                        t = q(o.substring(e + 5, o.indexOf(";", e)));
                        /*@cc_on A=@_jscript_version@*/
                        ;
                        l = g.documentMode || t
                    } else if (tb == "Netscape" && !!i.addEventListener) {
                        var d = o.indexOf("Firefox"), b = o.indexOf("Safari"), f = o.indexOf("Chrome"), c = o.indexOf("AppleWebKit");
                        if (d >= 0) {
                            s = ib;
                            l = q(o.substring(d + 8))
                        } else if (b >= 0) {
                            var j = o.substring(0, b).lastIndexOf("/");
                            s = f >= 0 ? kb : lb;
                            l = q(o.substring(j + 1, b))
                        } else {
                            var a = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);
                            if (a) {
                                s = K;
                                l = t = q(a[1])
                            }
                        }
                        if (c >= 0)B = q(o.substring(c + 12))
                    } else {
                        var a = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);
                        if (a) {
                            s = ob;
                            l = q(a[2])
                        }
                    }
                }
                return h == s
            }

            function r() {
                return v(K)
            }

            function hb() {
                return r() && (l < 6 || g.compatMode == "BackCompat")
            }

            function jb() {
                return v(lb)
            }

            function nb() {
                return v(ob)
            }

            function db() {
                return jb() && B > 534 && B < 535
            }

            function H() {
                v();
                return B > 537 || l > 42 || s == K && l >= 11
            }

            function fb() {
                return r() && l < 9
            }

            function eb(a) {
                var b, c;
                return function (g) {
                    if (!b) {
                        b = e;
                        var d = a.substr(0, 1).toUpperCase() + a.substr(1);
                        n([a].concat(["WebKit", "ms", "Moz", "O", "webkit"]), function (h, e) {
                            var b = a;
                            if (e)b = h + d;
                            if (g.style[b] != f)return c = b
                        })
                    }
                    return c
                }
            }

            function cb(b) {
                var a;
                return function (c) {
                    a = a || eb(b)(c) || b;
                    return a
                }
            }

            var M = cb("transform");

            function sb(a) {
                return {}.toString.call(a)
            }

            var pb = {};
            n(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (a) {
                pb["[object " + a + "]"] = a.toLowerCase()
            });
            function n(b, d) {
                var a, c;
                if (sb(b) == "[object Array]") {
                    for (a = 0; a < b.length; a++)if (c = d(b[a], a, b))return c
                } else for (a in b)if (c = d(b[a], a, b))return c
            }

            function G(a) {
                return a == h ? String(a) : pb[sb(a)] || "object"
            }

            function qb(a) {
                for (var b in a)return e
            }

            function C(a) {
                try {
                    return G(a) == "object" && !a.nodeType && a != a.window && (!a.constructor || {}.hasOwnProperty.call(a.constructor.prototype, "isPrototypeOf"))
                } catch (b) {
                }
            }

            function p(a, b) {
                return {x: a, y: b}
            }

            function wb(b, a) {
                setTimeout(b, a || 0)
            }

            function D(b, d, c) {
                var a = !b || b == "inherit" ? "" : b;
                n(d, function (c) {
                    var b = c.exec(a);
                    if (b) {
                        var d = a.substr(0, b.index), e = a.substr(b.index + b[0].length + 1, a.length - 1);
                        a = d + e
                    }
                });
                a = c + (!a.indexOf(" ") ? "" : " ") + a;
                return a
            }

            function R(b, a) {
                if (l < 9)b.style.filter = a
            }

            j.ng = Gb;
            j.pe = r;
            j.ag = jb;
            j.oe = nb;
            j.kg = H;
            j.bc = fb;
            eb("transform");
            j.be = function () {
                return l
            };
            j.gg = function () {
                v();
                return B
            };
            j.$Delay = wb;
            function Y(a) {
                a.constructor === Y.caller && a.ie && a.ie.apply(a, Y.caller.arguments)
            }

            j.ie = Y;
            j.kb = function (a) {
                if (j.Yf(a))a = g.getElementById(a);
                return a
            };
            function u(a) {
                return a || i.event
            }

            j.le = u;
            j.zc = function (b) {
                b = u(b);
                var a = b.target || b.srcElement || g;
                if (a.nodeType == 3)a = j.ke(a);
                return a
            };
            j.ee = function (a) {
                a = u(a);
                return {x: a.pageX || a.clientX || 0, y: a.pageY || a.clientY || 0}
            };
            function w(c, d, a) {
                if (a !== f)c.style[d] = a == f ? "" : a; else {
                    var b = c.currentStyle || c.style;
                    a = b[d];
                    if (a == "" && i.getComputedStyle) {
                        b = c.ownerDocument.defaultView.getComputedStyle(c, h);
                        b && (a = b.getPropertyValue(d) || b[d])
                    }
                    return a
                }
            }

            function ab(b, c, a, d) {
                if (a !== f) {
                    if (a == h)a = ""; else d && (a += "px");
                    w(b, c, a)
                } else return q(w(b, c))
            }

            function m(c, a) {
                var d = a ? ab : w, b;
                if (a & 4)b = cb(c);
                return function (e, f) {
                    return d(e, b ? b(e) : c, f, a & 2)
                }
            }

            function Bb(b) {
                if (r() && t < 9) {
                    var a = /opacity=([^)]*)/.exec(b.style.filter || "");
                    return a ? q(a[1]) / 100 : 1
                } else return q(b.style.opacity || "1")
            }

            function Db(b, a, f) {
                if (r() && t < 9) {
                    var h = b.style.filter || "", i = new RegExp(/[\s]*alpha\([^\)]*\)/g), e = c.round(100 * a), d = "";
                    if (e < 100 || f)d = "alpha(opacity=" + e + ") ";
                    var g = D(h, [i], d);
                    R(b, g)
                } else b.style.opacity = a == 1 ? "" : c.round(a * 100) / 100
            }

            var N = {
                $Rotate: ["rotate"],
                $RotateX: ["rotateX"],
                $RotateY: ["rotateY"],
                $SkewX: ["skewX"],
                $SkewY: ["skewY"]
            };
            if (!H())N = F(N, {$ScaleX: ["scaleX", 2], $ScaleY: ["scaleY", 2], $TranslateZ: ["translateZ", 1]});
            function O(d, a) {
                var c = "";
                if (a) {
                    if (r() && l && l < 10) {
                        delete a.$RotateX;
                        delete a.$RotateY;
                        delete a.$TranslateZ
                    }
                    b.a(a, function (d, b) {
                        var a = N[b];
                        if (a) {
                            var e = a[1] || 0;
                            if (P[b] != d)c += " " + a[0] + "(" + d + (["deg", "px", ""])[e] + ")"
                        }
                    });
                    if (H()) {
                        if (a.$TranslateX || a.$TranslateY || a.$TranslateZ != f)c += " translate3d(" + (a.$TranslateX || 0) + "px," + (a.$TranslateY || 0) + "px," + (a.$TranslateZ || 0) + "px)";
                        if (a.$ScaleX == f)a.$ScaleX = 1;
                        if (a.$ScaleY == f)a.$ScaleY = 1;
                        if (a.$ScaleX != 1 || a.$ScaleY != 1)c += " scale3d(" + a.$ScaleX + ", " + a.$ScaleY + ", 1)"
                    }
                }
                d.style[M(d)] = c
            }

            j.je = m("transformOrigin", 4);
            j.zf = m("backfaceVisibility", 4);
            j.Bf = m("transformStyle", 4);
            j.rf = m("perspective", 6);
            j.uf = m("perspectiveOrigin", 4);
            j.tf = function (a, b) {
                if (r() && t < 9 || t < 10 && hb())a.style.zoom = b == 1 ? "" : b; else {
                    var c = M(a), f = "scale(" + b + ")", e = a.style[c], g = new RegExp(/[\s]*scale\(.*?\)/g), d = D(e, [g], f);
                    a.style[c] = d
                }
            };
            j.hc = function (b, a) {
                return function (c) {
                    c = u(c);
                    var e = c.type, d = c.relatedTarget || (e == "mouseout" ? c.toElement : c.fromElement);
                    (!d || d !== a && !j.Df(a, d)) && b(c)
                }
            };
            j.f = function (a, c, d, b) {
                a = j.kb(a);
                if (a.addEventListener) {
                    c == "mousewheel" && a.addEventListener("DOMMouseScroll", d, b);
                    a.addEventListener(c, d, b)
                } else if (a.attachEvent) {
                    a.attachEvent("on" + c, d);
                    b && a.setCapture && a.setCapture()
                }
            };
            j.R = function (a, c, d, b) {
                a = j.kb(a);
                if (a.removeEventListener) {
                    c == "mousewheel" && a.removeEventListener("DOMMouseScroll", d, b);
                    a.removeEventListener(c, d, b)
                } else if (a.detachEvent) {
                    a.detachEvent("on" + c, d);
                    b && a.releaseCapture && a.releaseCapture()
                }
            };
            j.gc = function (a) {
                a = u(a);
                a.preventDefault && a.preventDefault();
                a.cancel = e;
                a.returnValue = k
            };
            j.Pf = function (a) {
                a = u(a);
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = e
            };
            j.H = function (d, c) {
                var a = [].slice.call(arguments, 2), b = function () {
                    var b = a.concat([].slice.call(arguments, 0));
                    return c.apply(d, b)
                };
                return b
            };
            j.Qf = function (a, b) {
                if (b == f)return a.textContent || a.innerText;
                var c = g.createTextNode(b);
                j.uc(a);
                a.appendChild(c)
            };
            j.Ib = function (d, c) {
                for (var b = [], a = d.firstChild; a; a = a.nextSibling)(c || a.nodeType == 1) && b.push(a);
                return b
            };
            function rb(a, c, e, b) {
                b = b || "u";
                for (a = a ? a.firstChild : h; a; a = a.nextSibling)if (a.nodeType == 1) {
                    if (V(a, b) == c)return a;
                    if (!e) {
                        var d = rb(a, c, e, b);
                        if (d)return d
                    }
                }
            }

            j.C = rb;
            function T(a, d, f, b) {
                b = b || "u";
                var c = [];
                for (a = a ? a.firstChild : h; a; a = a.nextSibling)if (a.nodeType == 1) {
                    V(a, b) == d && c.push(a);
                    if (!f) {
                        var e = T(a, d, f, b);
                        if (e.length)c = c.concat(e)
                    }
                }
                return c
            }

            function mb(a, c, d) {
                for (a = a ? a.firstChild : h; a; a = a.nextSibling)if (a.nodeType == 1) {
                    if (a.tagName == c)return a;
                    if (!d) {
                        var b = mb(a, c, d);
                        if (b)return b
                    }
                }
            }

            j.Ef = mb;
            function gb(a, c, e) {
                var b = [];
                for (a = a ? a.firstChild : h; a; a = a.nextSibling)if (a.nodeType == 1) {
                    (!c || a.tagName == c) && b.push(a);
                    if (!e) {
                        var d = gb(a, c, e);
                        if (d.length)b = b.concat(d)
                    }
                }
                return b
            }

            j.Ff = gb;
            j.Gf = function (b, a) {
                return b.getElementsByTagName(a)
            };
            function F() {
                var e = arguments, d, c, b, a, h = 1 & e[0], g = 1 + h;
                d = e[g - 1] || {};
                for (; g < e.length; g++)if (c = e[g])for (b in c) {
                    a = c[b];
                    if (a !== f) {
                        a = c[b];
                        var i = d[b];
                        d[b] = h && (C(i) || C(a)) ? F(h, {}, i, a) : a
                    }
                }
                return d
            }

            j.p = F;
            function Z(f, g) {
                var d = {}, c, a, b;
                for (c in f) {
                    a = f[c];
                    b = g[c];
                    if (a !== b) {
                        var e;
                        if (C(a) && C(b)) {
                            a = Z(a, b);
                            e = !qb(a)
                        }
                        !e && (d[c] = a)
                    }
                }
                return d
            }

            j.Tc = function (a) {
                return G(a) == "function"
            };
            j.Yf = function (a) {
                return G(a) == "string"
            };
            j.jc = function (a) {
                return !isNaN(q(a)) && isFinite(a)
            };
            j.a = n;
            j.id = C;
            function S(a) {
                return g.createElement(a)
            }

            j.ub = function () {
                return S("DIV")
            };
            j.sf = function () {
                return S("SPAN")
            };
            j.Rc = function () {
            };
            function W(b, c, a) {
                if (a == f)return b.getAttribute(c);
                b.setAttribute(c, a)
            }

            function V(a, b) {
                return W(a, b) || W(a, "data-" + b)
            }

            j.B = W;
            j.j = V;
            function y(b, a) {
                if (a == f)return b.className;
                b.className = a
            }

            j.Sc = y;
            function vb(b) {
                var a = {};
                n(b, function (b) {
                    if (b != f)a[b] = b
                });
                return a
            }

            function xb(b, a) {
                return b.match(a || yb)
            }

            function Q(b, a) {
                return vb(xb(b || "", a))
            }

            j.qf = xb;
            function bb(b, c) {
                var a = "";
                n(c, function (c) {
                    a && (a += b);
                    a += c
                });
                return a
            }

            function J(a, c, b) {
                y(a, bb(" ", F(Z(Q(y(a)), Q(c)), Q(b))))
            }

            j.ke = function (a) {
                return a.parentNode
            };
            j.S = function (a) {
                j.hb(a, "none")
            };
            j.E = function (a, b) {
                j.hb(a, b ? "none" : "")
            };
            j.xf = function (b, a) {
                b.removeAttribute(a)
            };
            j.Uf = function () {
                return r() && l < 10
            };
            j.cg = function (d, a) {
                if (a)d.style.clip = "rect(" + c.round(a.$Top || a.D || 0) + "px " + c.round(a.$Right) + "px " + c.round(a.$Bottom) + "px " + c.round(a.$Left || a.A || 0) + "px)"; else if (a !== f) {
                    var h = d.style.cssText, g = [new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i), new RegExp(/[\s]*cliptop: .*?[;]?/i), new RegExp(/[\s]*clipright: .*?[;]?/i), new RegExp(/[\s]*clipbottom: .*?[;]?/i), new RegExp(/[\s]*clipleft: .*?[;]?/i)], e = D(h, g, "");
                    b.Vb(d, e)
                }
            };
            j.T = function () {
                return +new Date
            };
            j.I = function (b, a) {
                b.appendChild(a)
            };
            j.Mb = function (b, a, c) {
                (c || a.parentNode).insertBefore(b, a)
            };
            j.Jb = function (b, a) {
                a = a || b.parentNode;
                a && a.removeChild(b)
            };
            j.jg = function (a, b) {
                n(a, function (a) {
                    j.Jb(a, b)
                })
            };
            j.uc = function (a) {
                j.jg(j.Ib(a, e), a)
            };
            j.ig = function (a, b) {
                var c = j.ke(a);
                b & 1 && j.v(a, (j.n(c) - j.n(a)) / 2);
                b & 2 && j.u(a, (j.m(c) - j.m(a)) / 2)
            };
            j.cc = function (b, a) {
                return parseInt(b, a || 10)
            };
            j.Vf = q;
            j.Df = function (b, a) {
                var c = g.body;
                while (a && b !== a && c !== a)try {
                    a = a.parentNode
                } catch (d) {
                    return k
                }
                return b === a
            };
            function X(d, c, b) {
                var a = d.cloneNode(!c);
                !b && j.xf(a, "id");
                return a
            }

            j.fb = X;
            j.Kb = function (d, f) {
                var a = new Image;

                function b(e, d) {
                    j.R(a, "load", b);
                    j.R(a, "abort", c);
                    j.R(a, "error", c);
                    f && f(a, d)
                }

                function c(a) {
                    b(a, e)
                }

                if (nb() && l < 11.6 || !d)b(!d); else {
                    j.f(a, "load", b);
                    j.f(a, "abort", c);
                    j.f(a, "error", c);
                    a.src = d
                }
            };
            j.Zf = function (d, a, e) {
                var c = d.length + 1;

                function b(b) {
                    c--;
                    if (a && b && b.src == a.src)a = b;
                    !c && e && e(a)
                }

                n(d, function (a) {
                    j.Kb(a.src, b)
                });
                b()
            };
            j.Cd = function (a, g, i, h) {
                if (h)a = X(a);
                var c = T(a, g);
                if (!c.length)c = b.Gf(a, g);
                for (var f = c.length - 1; f > -1; f--) {
                    var d = c[f], e = X(i);
                    y(e, y(d));
                    b.Vb(e, d.style.cssText);
                    b.Mb(e, d);
                    b.Jb(d)
                }
                return a
            };
            function Eb(a) {
                var l = this, p = "", r = ["av", "pv", "ds", "dn"], e = [], q, k = 0, h = 0, d = 0;

                function i() {
                    J(a, q, e[d || k || h & 2 || h]);
                    b.gb(a, "pointer-events", d ? "none" : "")
                }

                function c() {
                    k = 0;
                    i();
                    j.R(g, "mouseup", c);
                    j.R(g, "touchend", c);
                    j.R(g, "touchcancel", c)
                }

                function o(a) {
                    if (d)j.gc(a); else {
                        k = 4;
                        i();
                        j.f(g, "mouseup", c);
                        j.f(g, "touchend", c);
                        j.f(g, "touchcancel", c)
                    }
                }

                l.Dd = function (a) {
                    if (a === f)return h;
                    h = a & 2 || a & 1;
                    i()
                };
                l.$Enable = function (a) {
                    if (a === f)return !d;
                    d = a ? 0 : 3;
                    i()
                };
                l.$Elmt = a = j.kb(a);
                var m = b.qf(y(a));
                if (m)p = m.shift();
                n(r, function (a) {
                    e.push(p + a)
                });
                q = bb(" ", e);
                e.unshift("");
                j.f(a, "mousedown", o);
                j.f(a, "touchstart", o)
            }

            j.Yb = function (a) {
                return new Eb(a)
            };
            j.gb = w;
            j.jb = m("overflow");
            j.u = m("top", 2);
            j.v = m("left", 2);
            j.n = m("width", 2);
            j.m = m("height", 2);
            j.Ac = m("marginLeft", 2);
            j.Bc = m("marginTop", 2);
            j.z = m("position");
            j.hb = m("display");
            j.K = m("zIndex", 1);
            j.Ab = function (b, a, c) {
                if (a != f)Db(b, a, c); else return Bb(b)
            };
            j.Vb = function (a, b) {
                if (b != f)a.style.cssText = b; else return a.style.cssText
            };
            j.Be = function (b, a) {
                if (a === f) {
                    a = w(b, "backgroundImage") || "";
                    var c = /\burl\s*\(\s*["']?([^"'\r\n,]+)["']?\s*\)/gi.exec(a) || [];
                    return c[1]
                }
                w(b, "backgroundImage", a ? "url('" + a + "')" : "")
            };
            var U = {$Opacity: j.Ab, $Top: j.u, $Left: j.v, W: j.n, V: j.m, yb: j.z, Nh: j.hb, $ZIndex: j.K};

            function x(g, l) {
                var e = fb(), b = H(), d = db(), i = M(g);

                function k(b, d, a) {
                    var e = b.vb(p(-d / 2, -a / 2)), f = b.vb(p(d / 2, -a / 2)), g = b.vb(p(d / 2, a / 2)), h = b.vb(p(-d / 2, a / 2));
                    b.vb(p(300, 300));
                    return p(c.min(e.x, f.x, g.x, h.x) + d / 2, c.min(e.y, f.y, g.y, h.y) + a / 2)
                }

                function a(d, a) {
                    a = a || {};
                    var n = a.$TranslateZ || 0, p = (a.$RotateX || 0) % 360, q = (a.$RotateY || 0) % 360, u = (a.$Rotate || 0) % 360, l = a.$ScaleX, m = a.$ScaleY, g = a.Mh;
                    if (l == f)l = 1;
                    if (m == f)m = 1;
                    if (g == f)g = 1;
                    if (e) {
                        n = 0;
                        p = 0;
                        q = 0;
                        g = 0
                    }
                    var c = new Ab(a.$TranslateX, a.$TranslateY, n);
                    c.$RotateX(p);
                    c.$RotateY(q);
                    c.Je(u);
                    c.Ke(a.$SkewX, a.$SkewY);
                    c.$Scale(l, m, g);
                    if (b) {
                        c.$Move(a.A, a.D);
                        d.style[i] = c.xe()
                    } else if (!A || A < 9) {
                        var o = "", h = {x: 0, y: 0};
                        if (a.$OriginalWidth)h = k(c, a.$OriginalWidth, a.$OriginalHeight);
                        j.Bc(d, h.y);
                        j.Ac(d, h.x);
                        o = c.Le();
                        var s = d.style.filter, t = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g), r = D(s, [t], o);
                        R(d, r)
                    }
                }

                x = function (e, c) {
                    c = c || {};
                    var i = c.A, k = c.D, g;
                    n(U, function (a, b) {
                        g = c[b];
                        g !== f && a(e, g)
                    });
                    j.cg(e, c.$Clip);
                    if (!b) {
                        i != f && j.v(e, (c.Qd || 0) + i);
                        k != f && j.u(e, (c.Pd || 0) + k)
                    }
                    if (c.ef)if (d)wb(j.H(h, O, e, c)); else a(e, c)
                };
                j.ob = O;
                if (d)j.ob = x;
                if (e)j.ob = a; else if (!b)a = O;
                j.N = x;
                x(g, l)
            }

            j.ob = x;
            j.N = x;
            function Ab(j, k, o) {
                var d = this, b = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, j || 0, k || 0, o || 0, 1], i = c.sin, g = c.cos, l = c.tan;

                function f(a) {
                    return a * c.PI / 180
                }

                function n(a, b) {
                    return {x: a, y: b}
                }

                function m(b, c, f, g, i, l, n, o, q, t, u, w, y, A, C, F, a, d, e, h, j, k, m, p, r, s, v, x, z, B, D, E) {
                    return [b * a + c * j + f * r + g * z, b * d + c * k + f * s + g * B, b * e + c * m + f * v + g * D, b * h + c * p + f * x + g * E, i * a + l * j + n * r + o * z, i * d + l * k + n * s + o * B, i * e + l * m + n * v + o * D, i * h + l * p + n * x + o * E, q * a + t * j + u * r + w * z, q * d + t * k + u * s + w * B, q * e + t * m + u * v + w * D, q * h + t * p + u * x + w * E, y * a + A * j + C * r + F * z, y * d + A * k + C * s + F * B, y * e + A * m + C * v + F * D, y * h + A * p + C * x + F * E]
                }

                function e(c, a) {
                    return m.apply(h, (a || b).concat(c))
                }

                d.$Scale = function (a, c, d) {
                    if (a != 1 || c != 1 || d != 1)b = e([a, 0, 0, 0, 0, c, 0, 0, 0, 0, d, 0, 0, 0, 0, 1])
                };
                d.$Move = function (a, c, d) {
                    b[12] += a || 0;
                    b[13] += c || 0;
                    b[14] += d || 0
                };
                d.$RotateX = function (c) {
                    if (c) {
                        a = f(c);
                        var d = g(a), h = i(a);
                        b = e([1, 0, 0, 0, 0, d, h, 0, 0, -h, d, 0, 0, 0, 0, 1])
                    }
                };
                d.$RotateY = function (c) {
                    if (c) {
                        a = f(c);
                        var d = g(a), h = i(a);
                        b = e([d, 0, -h, 0, 0, 1, 0, 0, h, 0, d, 0, 0, 0, 0, 1])
                    }
                };
                d.Je = function (c) {
                    if (c) {
                        a = f(c);
                        var d = g(a), h = i(a);
                        b = e([d, h, 0, 0, -h, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                    }
                };
                d.Ke = function (a, c) {
                    if (a || c) {
                        j = f(a);
                        k = f(c);
                        b = e([1, l(k), 0, 0, l(j), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                    }
                };
                d.vb = function (c) {
                    var a = e(b, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c.x, c.y, 0, 1]);
                    return n(a[12], a[13])
                };
                d.xe = function () {
                    return "matrix3d(" + b.join(",") + ")"
                };
                d.Le = function () {
                    return "progid:DXImageTransform.Microsoft.Matrix(M11=" + b[0] + ", M12=" + b[4] + ", M21=" + b[1] + ", M22=" + b[5] + ", SizingMethod='auto expand')"
                }
            }

            new (function () {
                var a = this;

                function b(d, g) {
                    for (var j = d[0].length, i = d.length, h = g[0].length, f = [], c = 0; c < i; c++)for (var k = f[c] = [], b = 0; b < h; b++) {
                        for (var e = 0, a = 0; a < j; a++)e += d[c][a] * g[a][b];
                        k[b] = e
                    }
                    return f
                }

                a.$ScaleX = function (b, c) {
                    return a.nd(b, c, 0)
                };
                a.$ScaleY = function (b, c) {
                    return a.nd(b, 0, c)
                };
                a.nd = function (a, c, d) {
                    return b(a, [[c, 0], [0, d]])
                };
                a.vb = function (d, c) {
                    var a = b(d, [[c.x], [c.y]]);
                    return p(a[0][0], a[1][0])
                }
            });
            var P = {
                Qd: 0,
                Pd: 0,
                A: 0,
                D: 0,
                $Zoom: 1,
                $ScaleX: 1,
                $ScaleY: 1,
                $Rotate: 0,
                $RotateX: 0,
                $RotateY: 0,
                $TranslateX: 0,
                $TranslateY: 0,
                $TranslateZ: 0,
                $SkewX: 0,
                $SkewY: 0
            };
            j.Oc = function (c, d) {
                var a = c || {};
                if (c)if (b.Tc(c))a = {eb: a}; else if (b.Tc(c.$Clip))a.$Clip = {eb: c.$Clip};
                a.eb = a.eb || d;
                if (a.$Clip)a.$Clip.eb = a.$Clip.eb || d;
                return a
            };
            function ub(c, a) {
                var b = {};
                n(c, function (c, d) {
                    var e = c;
                    if (a[d] != f)if (j.jc(c))e = c + a[d]; else e = ub(c, a[d]);
                    b[d] = e
                });
                return b
            }

            j.df = ub;
            j.od = function (n, j, s, t, B, C, o) {
                var a = j;
                if (n) {
                    a = {};
                    for (var i in j) {
                        var D = C[i] || 1, z = B[i] || [0, 1], g = (s - z[0]) / z[1];
                        g = c.min(c.max(g, 0), 1);
                        g = g * D;
                        var x = c.floor(g);
                        if (g != x)g -= x;
                        var k = t.eb || d.$Linear, m, E = n[i], q = j[i];
                        if (b.jc(q)) {
                            k = t[i] || k;
                            var A = k(g);
                            m = E + q * A
                        } else {
                            m = b.p({Qb: {}}, n[i]);
                            var y = t[i] || {};
                            b.a(q.Qb || q, function (d, a) {
                                k = y[a] || y.eb || k;
                                var c = k(g), b = d * c;
                                m.Qb[a] = b;
                                m[a] += b
                            })
                        }
                        a[i] = m
                    }
                    var w = b.a(j, function (b, a) {
                        return P[a] != f
                    });
                    w && b.a(P, function (c, b) {
                        if (a[b] == f && n[b] !== f)a[b] = n[b]
                    });
                    if (w) {
                        if (a.$Zoom)a.$ScaleX = a.$ScaleY = a.$Zoom;
                        a.$OriginalWidth = o.$OriginalWidth;
                        a.$OriginalHeight = o.$OriginalHeight;
                        if (r() && l >= 11 && (j.A || j.D) && s != 0 && s != 1)a.$Rotate = a.$Rotate || 1e-8;
                        a.ef = e
                    }
                }
                if (j.$Clip && o.$Move) {
                    var p = a.$Clip.Qb, v = (p.$Top || 0) + (p.$Bottom || 0), u = (p.$Left || 0) + (p.$Right || 0);
                    a.$Left = (a.$Left || 0) + u;
                    a.$Top = (a.$Top || 0) + v;
                    a.$Clip.$Left -= u;
                    a.$Clip.$Right -= u;
                    a.$Clip.$Top -= v;
                    a.$Clip.$Bottom -= v
                }
                if (a.$Clip && b.Uf() && !a.$Clip.$Top && !a.$Clip.$Left && !a.$Clip.D && !a.$Clip.A && a.$Clip.$Right == o.$OriginalWidth && a.$Clip.$Bottom == o.$OriginalHeight)a.$Clip = h;
                return a
            }
        };

        function m() {
            var a = this, d = [];

            function h(a, b) {
                d.push({Ic: a, Jc: b})
            }

            function g(a, c) {
                b.a(d, function (b, e) {
                    b.Ic == a && b.Jc === c && d.splice(e, 1)
                })
            }

            a.$On = a.addEventListener = h;
            a.$Off = a.removeEventListener = g;
            a.l = function (a) {
                var c = [].slice.call(arguments, 1);
                b.a(d, function (b) {
                    b.Ic == a && b.Jc.apply(i, c)
                })
            }
        }

        var l = function (B, E, g, M, P, K) {
            B = B || 0;
            var a = this, q, n, o, v, C = 0, I, J, H, D, A = 0, j = 0, m = 0, z, l, d, f, p, y, w = [], x;

            function Q(a) {
                d += a;
                f += a;
                l += a;
                j += a;
                m += a;
                A += a
            }

            function u(o) {
                var h = o;
                if (p)if (!y && (h >= f || h < d) || y && h >= d)h = ((h - d) % p + p) % p + d;
                if (!z || v || j != h) {
                    var i = c.min(h, f);
                    i = c.max(i, d);
                    if (!z || v || i != m) {
                        if (K) {
                            var k = (i - l) / (E || 1);
                            if (g.$Reverse)k = 1 - k;
                            var n = b.od(P, K, k, I, H, J, g);
                            if (x)b.a(n, function (b, a) {
                                x[a] && x[a](M, b)
                            }); else b.N(M, n)
                        }
                        a.Kc(m - l, i - l);
                        var r = m, q = m = i;
                        b.a(w, function (b, c) {
                            var a = !z && y || h <= j ? w[w.length - c - 1] : b;
                            a.M(m - A)
                        });
                        j = h;
                        z = e;
                        a.oc(r, q)
                    }
                }
            }

            function F(a, b, e) {
                b && a.$Shift(f);
                if (!e) {
                    d = c.min(d, a.fc() + A);
                    f = c.max(f, a.mb() + A)
                }
                w.push(a)
            }

            var r = i.requestAnimationFrame || i.webkitRequestAnimationFrame || i.mozRequestAnimationFrame || i.msRequestAnimationFrame;
            if (b.ag() && b.be() < 7)r = h;
            r = r || function (a) {
                    b.$Delay(a, g.$Interval)
                };
            function L() {
                if (q) {
                    var d = b.T(), e = c.min(d - C, g.hd), a = j + e * o;
                    C = d;
                    if (a * o >= n * o)a = n;
                    u(a);
                    if (!v && a * o >= n * o)N(D); else r(L)
                }
            }

            function t(g, h, i) {
                if (!q) {
                    q = e;
                    v = i;
                    D = h;
                    g = c.max(g, d);
                    g = c.min(g, f);
                    n = g;
                    o = n < j ? -1 : 1;
                    a.jd();
                    C = b.T();
                    r(L)
                }
            }

            function N(b) {
                if (q) {
                    v = q = D = k;
                    a.ld();
                    b && b()
                }
            }

            a.$Play = function (a, b, c) {
                t(a ? j + a : f, b, c)
            };
            a.xd = t;
            a.nb = N;
            a.lf = function (a) {
                t(a)
            };
            a.ab = function () {
                return j
            };
            a.yd = function () {
                return n
            };
            a.xb = function () {
                return m
            };
            a.M = u;
            a.jf = function () {
                u(f, e)
            };
            a.$Move = function (a) {
                u(j + a)
            };
            a.$IsPlaying = function () {
                return q
            };
            a.Se = function (a) {
                p = a
            };
            a.$Shift = Q;
            a.P = function (a, b) {
                F(a, 0, b)
            };
            a.pc = function (a) {
                F(a, 1)
            };
            a.zd = function (a) {
                f += a
            };
            a.fc = function () {
                return d
            };
            a.mb = function () {
                return f
            };
            a.oc = a.jd = a.ld = a.Kc = b.Rc;
            a.Dc = b.T();
            g = b.p({$Interval: 16, hd: 50}, g);
            p = g.Cc;
            y = g.Oe;
            x = g.Xe;
            d = l = B;
            f = B + E;
            J = g.$Round || {};
            H = g.$During || {};
            I = b.Oc(g.$Easing)
        };
        var o = i.$JssorSlideshowFormations$ = new function () {
            var h = this, b = 0, a = 1, f = 2, d = 3, s = 1, r = 2, t = 4, q = 8, w = 256, x = 512, v = 1024, u = 2048, j = u + s, i = u + r, o = x + s, m = x + r, n = w + t, k = w + q, l = v + t, p = v + q;

            function y(a) {
                return (a & r) == r
            }

            function z(a) {
                return (a & t) == t
            }

            function g(b, a, c) {
                c.push(a);
                b[a] = b[a] || [];
                b[a].push(c)
            }

            h.$FormationStraight = function (f) {
                for (var d = f.$Cols, e = f.$Rows, s = f.$Assembly, t = f.mc, r = [], a = 0, b = 0, p = d - 1, q = e - 1, h = t - 1, c, b = 0; b < e; b++)for (a = 0; a < d; a++) {
                    switch (s) {
                        case j:
                            c = h - (a * e + (q - b));
                            break;
                        case l:
                            c = h - (b * d + (p - a));
                            break;
                        case o:
                            c = h - (a * e + b);
                        case n:
                            c = h - (b * d + a);
                            break;
                        case i:
                            c = a * e + b;
                            break;
                        case k:
                            c = b * d + (p - a);
                            break;
                        case m:
                            c = a * e + (q - b);
                            break;
                        default:
                            c = b * d + a
                    }
                    g(r, c, [b, a])
                }
                return r
            };
            h.$FormationSwirl = function (q) {
                var x = q.$Cols, y = q.$Rows, B = q.$Assembly, w = q.mc, A = [], z = [], u = 0, c = 0, h = 0, r = x - 1, s = y - 1, t, p, v = 0;
                switch (B) {
                    case j:
                        c = r;
                        h = 0;
                        p = [f, a, d, b];
                        break;
                    case l:
                        c = 0;
                        h = s;
                        p = [b, d, a, f];
                        break;
                    case o:
                        c = r;
                        h = s;
                        p = [d, a, f, b];
                        break;
                    case n:
                        c = r;
                        h = s;
                        p = [a, d, b, f];
                        break;
                    case i:
                        c = 0;
                        h = 0;
                        p = [f, b, d, a];
                        break;
                    case k:
                        c = r;
                        h = 0;
                        p = [a, f, b, d];
                        break;
                    case m:
                        c = 0;
                        h = s;
                        p = [d, b, f, a];
                        break;
                    default:
                        c = 0;
                        h = 0;
                        p = [b, f, a, d]
                }
                u = 0;
                while (u < w) {
                    t = h + "," + c;
                    if (c >= 0 && c < x && h >= 0 && h < y && !z[t]) {
                        z[t] = e;
                        g(A, u++, [h, c])
                    } else switch (p[v++ % p.length]) {
                        case b:
                            c--;
                            break;
                        case f:
                            h--;
                            break;
                        case a:
                            c++;
                            break;
                        case d:
                            h++
                    }
                    switch (p[v % p.length]) {
                        case b:
                            c++;
                            break;
                        case f:
                            h++;
                            break;
                        case a:
                            c--;
                            break;
                        case d:
                            h--
                    }
                }
                return A
            };
            h.$FormationZigZag = function (p) {
                var w = p.$Cols, x = p.$Rows, z = p.$Assembly, v = p.mc, t = [], u = 0, c = 0, e = 0, q = w - 1, r = x - 1, y, h, s = 0;
                switch (z) {
                    case j:
                        c = q;
                        e = 0;
                        h = [f, a, d, a];
                        break;
                    case l:
                        c = 0;
                        e = r;
                        h = [b, d, a, d];
                        break;
                    case o:
                        c = q;
                        e = r;
                        h = [d, a, f, a];
                        break;
                    case n:
                        c = q;
                        e = r;
                        h = [a, d, b, d];
                        break;
                    case i:
                        c = 0;
                        e = 0;
                        h = [f, b, d, b];
                        break;
                    case k:
                        c = q;
                        e = 0;
                        h = [a, f, b, f];
                        break;
                    case m:
                        c = 0;
                        e = r;
                        h = [d, b, f, b];
                        break;
                    default:
                        c = 0;
                        e = 0;
                        h = [b, f, a, f]
                }
                u = 0;
                while (u < v) {
                    y = e + "," + c;
                    if (c >= 0 && c < w && e >= 0 && e < x && typeof t[y] == "undefined") {
                        g(t, u++, [e, c]);
                        switch (h[s % h.length]) {
                            case b:
                                c++;
                                break;
                            case f:
                                e++;
                                break;
                            case a:
                                c--;
                                break;
                            case d:
                                e--
                        }
                    } else {
                        switch (h[s++ % h.length]) {
                            case b:
                                c--;
                                break;
                            case f:
                                e--;
                                break;
                            case a:
                                c++;
                                break;
                            case d:
                                e++
                        }
                        switch (h[s++ % h.length]) {
                            case b:
                                c++;
                                break;
                            case f:
                                e++;
                                break;
                            case a:
                                c--;
                                break;
                            case d:
                                e--
                        }
                    }
                }
                return t
            };
            h.$FormationStraightStairs = function (q) {
                var u = q.$Cols, v = q.$Rows, e = q.$Assembly, t = q.mc, r = [], s = 0, c = 0, d = 0, f = u - 1, h = v - 1, x = t - 1;
                switch (e) {
                    case j:
                    case m:
                    case o:
                    case i:
                        var a = 0, b = 0;
                        break;
                    case k:
                    case l:
                    case n:
                    case p:
                        var a = f, b = 0;
                        break;
                    default:
                        e = p;
                        var a = f, b = 0
                }
                c = a;
                d = b;
                while (s < t) {
                    if (z(e) || y(e))g(r, x - s++, [d, c]); else g(r, s++, [d, c]);
                    switch (e) {
                        case j:
                        case m:
                            c--;
                            d++;
                            break;
                        case o:
                        case i:
                            c++;
                            d--;
                            break;
                        case k:
                        case l:
                            c--;
                            d--;
                            break;
                        case p:
                        case n:
                        default:
                            c++;
                            d++
                    }
                    if (c < 0 || d < 0 || c > f || d > h) {
                        switch (e) {
                            case j:
                            case m:
                                a++;
                                break;
                            case k:
                            case l:
                            case o:
                            case i:
                                b++;
                                break;
                            case p:
                            case n:
                            default:
                                a--
                        }
                        if (a < 0 || b < 0 || a > f || b > h) {
                            switch (e) {
                                case j:
                                case m:
                                    a = f;
                                    b++;
                                    break;
                                case o:
                                case i:
                                    b = h;
                                    a++;
                                    break;
                                case k:
                                case l:
                                    b = h;
                                    a--;
                                    break;
                                case p:
                                case n:
                                default:
                                    a = 0;
                                    b++
                            }
                            if (b > h)b = h; else if (b < 0)b = 0; else if (a > f)a = f; else if (a < 0)a = 0
                        }
                        d = b;
                        c = a
                    }
                }
                return r
            };
            h.$FormationSquare = function (i) {
                var a = i.$Cols || 1, b = i.$Rows || 1, j = [], d, e, f, h, k;
                f = a < b ? (b - a) / 2 : 0;
                h = a > b ? (a - b) / 2 : 0;
                k = c.round(c.max(a / 2, b / 2)) + 1;
                for (d = 0; d < a; d++)for (e = 0; e < b; e++)g(j, k - c.min(d + 1 + f, e + 1 + h, a - d + f, b - e + h), [e, d]);
                return j
            };
            h.$FormationRectangle = function (f) {
                var d = f.$Cols || 1, e = f.$Rows || 1, h = [], a, b, i;
                i = c.round(c.min(d / 2, e / 2)) + 1;
                for (a = 0; a < d; a++)for (b = 0; b < e; b++)g(h, i - c.min(a + 1, b + 1, d - a, e - b), [b, a]);
                return h
            };
            h.$FormationRandom = function (d) {
                for (var e = [], a, b = 0; b < d.$Rows; b++)for (a = 0; a < d.$Cols; a++)g(e, c.ceil(1e5 * c.random()) % 13, [b, a]);
                return e
            };
            h.$FormationCircle = function (d) {
                for (var e = d.$Cols || 1, f = d.$Rows || 1, h = [], a, i = e / 2 - .5, j = f / 2 - .5, b = 0; b < e; b++)for (a = 0; a < f; a++)g(h, c.round(c.sqrt(c.pow(b - i, 2) + c.pow(a - j, 2))), [a, b]);
                return h
            };
            h.$FormationCross = function (d) {
                for (var e = d.$Cols || 1, f = d.$Rows || 1, h = [], a, i = e / 2 - .5, j = f / 2 - .5, b = 0; b < e; b++)for (a = 0; a < f; a++)g(h, c.round(c.min(c.abs(b - i), c.abs(a - j))), [a, b]);
                return h
            };
            h.$FormationRectangleCross = function (f) {
                for (var h = f.$Cols || 1, i = f.$Rows || 1, j = [], a, d = h / 2 - .5, e = i / 2 - .5, k = c.max(d, e) + 1, b = 0; b < h; b++)for (a = 0; a < i; a++)g(j, c.round(k - c.max(d - c.abs(b - d), e - c.abs(a - e))) - 1, [a, b]);
                return j
            }
        };
        i.$JssorSlideshowRunner$ = function (n, s, q, u, z) {
            var f = this, v, g, a, y = 0, x = u.$TransitionsOrder, r, i = 8;

            function t(a) {
                if (a.$Top)a.D = a.$Top;
                if (a.$Left)a.A = a.$Left;
                b.a(a, function (a) {
                    b.id(a) && t(a)
                })
            }

            function j(g, f) {
                var a = {
                    $Interval: f,
                    $Duration: 1,
                    $Delay: 0,
                    $Cols: 1,
                    $Rows: 1,
                    $Opacity: 0,
                    $Zoom: 0,
                    $Clip: 0,
                    $Move: k,
                    $SlideOut: k,
                    $Reverse: k,
                    $Formation: o.$FormationRandom,
                    $Assembly: 1032,
                    $ChessMode: {$Column: 0, $Row: 0},
                    $Easing: d.$Swing,
                    $Round: {},
                    lc: [],
                    $During: {}
                };
                b.p(a, g);
                t(a);
                a.mc = a.$Cols * a.$Rows;
                a.$Easing = b.Oc(a.$Easing, d.$Swing);
                a.kf = c.ceil(a.$Duration / a.$Interval);
                a.hf = function (c, b) {
                    c /= a.$Cols;
                    b /= a.$Rows;
                    var f = c + "x" + b;
                    if (!a.lc[f]) {
                        a.lc[f] = {W: c, V: b};
                        for (var d = 0; d < a.$Cols; d++)for (var e = 0; e < a.$Rows; e++)a.lc[f][e + "," + d] = {
                            $Top: e * b,
                            $Right: d * c + c,
                            $Bottom: e * b + b,
                            $Left: d * c
                        }
                    }
                    return a.lc[f]
                };
                if (a.$Brother) {
                    a.$Brother = j(a.$Brother, f);
                    a.$SlideOut = e
                }
                return a
            }

            function p(B, i, a, w, o, m) {
                var z = this, u, v = {}, j = {}, n = [], f, d, s, q = a.$ChessMode.$Column || 0, r = a.$ChessMode.$Row || 0, g = a.hf(o, m), p = C(a), D = p.length - 1, t = a.$Duration + a.$Delay * D, x = w + t, l = a.$SlideOut, y;
                x += 50;
                function C(a) {
                    var b = a.$Formation(a);
                    return a.$Reverse ? b.reverse() : b
                }

                z.wd = x;
                z.Tb = function (d) {
                    d -= w;
                    var e = d < t;
                    if (e || y) {
                        y = e;
                        if (!l)d = t - d;
                        var f = c.ceil(d / a.$Interval);
                        b.a(j, function (a, e) {
                            var d = c.max(f, a.mf);
                            d = c.min(d, a.length - 1);
                            if (a.qd != d) {
                                if (!a.qd && !l)b.E(n[e]); else d == a.cf && l && b.S(n[e]);
                                a.qd = d;
                                b.N(n[e], a[d])
                            }
                        })
                    }
                };
                i = b.fb(i);
                b.ob(i, h);
                if (b.bc()) {
                    var E = !i["no-image"], A = b.Ff(i);
                    b.a(A, function (a) {
                        (E || a["jssor-slider"]) && b.Ab(a, b.Ab(a), e)
                    })
                }
                b.a(p, function (h, i) {
                    b.a(h, function (G) {
                        var K = G[0], J = G[1], t = K + "," + J, n = k, p = k, x = k;
                        if (q && J % 2) {
                            if (q & 3)n = !n;
                            if (q & 12)p = !p;
                            if (q & 16)x = !x
                        }
                        if (r && K % 2) {
                            if (r & 3)n = !n;
                            if (r & 12)p = !p;
                            if (r & 16)x = !x
                        }
                        a.$Top = a.$Top || a.$Clip & 4;
                        a.$Bottom = a.$Bottom || a.$Clip & 8;
                        a.$Left = a.$Left || a.$Clip & 1;
                        a.$Right = a.$Right || a.$Clip & 2;
                        var C = p ? a.$Bottom : a.$Top, z = p ? a.$Top : a.$Bottom, B = n ? a.$Right : a.$Left, A = n ? a.$Left : a.$Right;
                        a.$Clip = C || z || B || A;
                        s = {};
                        d = {D: 0, A: 0, $Opacity: 1, W: o, V: m};
                        f = b.p({}, d);
                        u = b.p({}, g[t]);
                        if (a.$Opacity)d.$Opacity = 2 - a.$Opacity;
                        if (a.$ZIndex) {
                            d.$ZIndex = a.$ZIndex;
                            f.$ZIndex = 0
                        }
                        var I = a.$Cols * a.$Rows > 1 || a.$Clip;
                        if (a.$Zoom || a.$Rotate) {
                            var H = e;
                            if (b.bc())if (a.$Cols * a.$Rows > 1)H = k; else I = k;
                            if (H) {
                                d.$Zoom = a.$Zoom ? a.$Zoom - 1 : 1;
                                f.$Zoom = 1;
                                if (b.bc() || b.oe())d.$Zoom = c.min(d.$Zoom, 2);
                                var N = a.$Rotate || 0;
                                d.$Rotate = N * 360 * (x ? -1 : 1);
                                f.$Rotate = 0
                            }
                        }
                        if (I) {
                            var h = u.Qb = {};
                            if (a.$Clip) {
                                var w = a.$ScaleClip || 1;
                                if (C && z) {
                                    h.$Top = g.V / 2 * w;
                                    h.$Bottom = -h.$Top
                                } else if (C)h.$Bottom = -g.V * w; else if (z)h.$Top = g.V * w;
                                if (B && A) {
                                    h.$Left = g.W / 2 * w;
                                    h.$Right = -h.$Left
                                } else if (B)h.$Right = -g.W * w; else if (A)h.$Left = g.W * w
                            }
                            s.$Clip = u;
                            f.$Clip = g[t]
                        }
                        var L = n ? 1 : -1, M = p ? 1 : -1;
                        if (a.x)d.A += o * a.x * L;
                        if (a.y)d.D += m * a.y * M;
                        b.a(d, function (a, c) {
                            if (b.jc(a))if (a != f[c])s[c] = a - f[c]
                        });
                        v[t] = l ? f : d;
                        var D = a.kf, y = c.round(i * a.$Delay / a.$Interval);
                        j[t] = new Array(y);
                        j[t].mf = y;
                        j[t].cf = y + D - 1;
                        for (var F = 0; F <= D; F++) {
                            var E = b.od(f, s, F / D, a.$Easing, a.$During, a.$Round, {
                                $Move: a.$Move,
                                $OriginalWidth: o,
                                $OriginalHeight: m
                            });
                            E.$ZIndex = E.$ZIndex || 1;
                            j[t].push(E)
                        }
                    })
                });
                p.reverse();
                b.a(p, function (a) {
                    b.a(a, function (c) {
                        var f = c[0], e = c[1], d = f + "," + e, a = i;
                        if (e || f)a = b.fb(i);
                        b.N(a, v[d]);
                        b.jb(a, "hidden");
                        b.z(a, "absolute");
                        B.bf(a);
                        n[d] = a;
                        b.E(a, !l)
                    })
                })
            }

            function w() {
                var b = this, c = 0;
                l.call(b, 0, v);
                b.oc = function (d, b) {
                    if (b - c > i) {
                        c = b;
                        a && a.Tb(b);
                        g && g.Tb(b)
                    }
                };
                b.Nc = r
            }

            f.gf = function () {
                var a = 0, b = u.$Transitions, d = b.length;
                if (x)a = y++ % d; else a = c.floor(c.random() * d);
                b[a] && (b[a].pb = a);
                return b[a]
            };
            f.Fe = function (w, x, k, l, b) {
                r = b;
                b = j(b, i);
                var h = l.Ud, e = k.Ud;
                h["no-image"] = !l.Zb;
                e["no-image"] = !k.Zb;
                var m = h, o = e, u = b, d = b.$Brother || j({}, i);
                if (!b.$SlideOut) {
                    m = e;
                    o = h
                }
                var t = d.$Shift || 0;
                g = new p(n, o, d, c.max(t - d.$Interval, 0), s, q);
                a = new p(n, m, u, c.max(d.$Interval - t, 0), s, q);
                g.Tb(0);
                a.Tb(0);
                v = c.max(g.wd, a.wd);
                f.pb = w
            };
            f.zb = function () {
                n.zb();
                g = h;
                a = h
            };
            f.ye = function () {
                var b = h;
                if (a)b = new w;
                return b
            };
            if (b.bc() || b.oe() || z && b.gg() < 537)i = 16;
            m.call(f);
            l.call(f, -1e7, 1e7)
        };
        var j = i.$JssorSlider$ = function (q, jc) {
            var a = this;

            function Fc() {
                var b = this;
                l.call(b, -1e8, 2e8);
                b.og = function () {
                    var a = b.xb(), d = c.floor(a), f = t(d), e = a - c.floor(a);
                    return {pb: f, mg: d, yb: e}
                };
                b.oc = function (d, b) {
                    var f = c.floor(b);
                    if (f != b && b > d)f++;
                    Zb(f, e);
                    a.l(j.$EVT_POSITION_CHANGE, t(b), t(d), b, d)
                }
            }

            function Ec() {
                var a = this;
                l.call(a, 0, 0, {Cc: r});
                b.a(B, function (b) {
                    M & 1 && b.Se(r);
                    a.pc(b);
                    b.$Shift(gb / fc)
                })
            }

            function Dc() {
                var a = this, b = Yb.$Elmt;
                l.call(a, -1, 2, {$Easing: d.$Linear, Xe: {yb: dc}, Cc: r}, b, {yb: 1}, {yb: -2});
                a.Nb = b
            }

            function sc(n, m) {
                var b = this, d, f, g, i, c;
                l.call(b, -1e8, 2e8, {hd: 100});
                b.jd = function () {
                    Q = e;
                    S = h;
                    a.l(j.$EVT_SWIPE_START, t(x.ab()), x.ab())
                };
                b.ld = function () {
                    Q = k;
                    i = k;
                    var b = x.og();
                    a.l(j.$EVT_SWIPE_END, t(x.ab()), x.ab());
                    !b.yb && Hc(b.mg, s)
                };
                b.oc = function (h, e) {
                    var a;
                    if (i)a = c; else {
                        a = f;
                        if (g) {
                            var b = e / g;
                            a = o.$SlideEasing(b) * (f - d) + d
                        }
                    }
                    x.M(a)
                };
                b.Sb = function (a, e, c, h) {
                    d = a;
                    f = e;
                    g = c;
                    x.M(a);
                    b.M(0);
                    b.xd(c, h)
                };
                b.vf = function (a) {
                    i = e;
                    c = a;
                    b.$Play(a, h, e)
                };
                b.pf = function (a) {
                    c = a
                };
                x = new Fc;
                x.P(n);
                x.P(m)
            }

            function tc() {
                var c = this, a = bc();
                b.K(a, 0);
                b.gb(a, "pointerEvents", "none");
                c.$Elmt = a;
                c.bf = function (c) {
                    b.I(a, c);
                    b.E(a)
                };
                c.zb = function () {
                    b.S(a);
                    b.uc(a)
                }
            }

            function Cc(i, f) {
                var d = this, q, N, y, n, z = [], x, E, U, H, R, D, M, g, v, p;
                l.call(d, -w, w + 1, {});
                function F(a) {
                    q && q.ed();
                    T(i, a, 0);
                    D = e;
                    q = new I.$Class(i, I, b.Vf(b.j(i, "idle")) || rc, !u);
                    q.M(0)
                }

                function Y() {
                    q.Dc < I.Dc && F()
                }

                function P(p, r, m) {
                    if (!H) {
                        H = e;
                        if (n && m) {
                            var g = m.width, c = m.height, l = g, i = c;
                            if (g && c && o.$FillMode) {
                                if (o.$FillMode & 3 && (!(o.$FillMode & 4) || g > L || c > K)) {
                                    var h = k, q = L / K * c / g;
                                    if (o.$FillMode & 1)h = q > 1; else if (o.$FillMode & 2)h = q < 1;
                                    l = h ? g * K / c : L;
                                    i = h ? K : c * L / g
                                }
                                b.n(n, l);
                                b.m(n, i);
                                b.u(n, (K - i) / 2);
                                b.v(n, (L - l) / 2)
                            }
                            b.z(n, "absolute");
                            a.l(j.$EVT_LOAD_END, f)
                        }
                    }
                    b.S(r);
                    p && p(d)
                }

                function X(b, c, e, g) {
                    if (g == S && s == f && u)if (!Gc) {
                        var a = t(b);
                        C.Fe(a, f, c, d, e);
                        c.Lf();
                        V.$Shift(a - V.fc() - 1);
                        V.M(a);
                        A.Sb(b, b, 0)
                    }
                }

                function ab(b) {
                    if (b == S && s == f) {
                        if (!g) {
                            var a = h;
                            if (C)if (C.pb == f)a = C.ye(); else C.zb();
                            Y();
                            g = new zc(i, f, a, q);
                            g.Pc(p)
                        }
                        !g.$IsPlaying() && g.wc()
                    }
                }

                function G(a, e, k) {
                    if (a == f) {
                        if (a != e)B[e] && B[e].Uc(); else!k && g && g.Af();
                        p && p.$Enable();
                        var l = S = b.T();
                        d.Kb(b.H(h, ab, l))
                    } else {
                        var j = c.min(f, a), i = c.max(f, a), n = c.min(i - j, j + r - i), m = w + o.$LazyLoading - 1;
                        (!R || n <= m) && d.Kb()
                    }
                }

                function bb() {
                    if (s == f && g) {
                        g.nb();
                        p && p.$Quit();
                        p && p.$Disable();
                        g.qe()
                    }
                }

                function cb() {
                    s == f && g && g.nb()
                }

                function Z(b) {
                    !J && a.l(j.$EVT_CLICK, f, b)
                }

                function Q() {
                    p = v.pInstance;
                    g && g.Pc(p)
                }

                d.Kb = function (d, c) {
                    c = c || y;
                    if (z.length && !H) {
                        b.E(c);
                        if (!U) {
                            U = e;
                            a.l(j.$EVT_LOAD_START, f);
                            b.a(z, function (a) {
                                if (!b.B(a, "src")) {
                                    a.src = b.j(a, "src2") || "";
                                    b.hb(a, a["display-origin"])
                                }
                            })
                        }
                        b.Zf(z, n, b.H(h, P, d, c))
                    } else P(d, c)
                };
                d.dg = function () {
                    if (r == 1) {
                        d.Uc();
                        G(f, f)
                    } else if (C) {
                        var a = C.gf(r);
                        if (a) {
                            var g = S = b.T(), c = f + kb, e = B[t(c)];
                            return e.Kb(b.H(h, X, c, e, a, g), y)
                        }
                    } else Bb(kb)
                };
                d.qc = function () {
                    G(f, f, e)
                };
                d.Uc = function () {
                    p && p.$Quit();
                    p && p.$Disable();
                    d.fe();
                    g && g.lg();
                    g = h;
                    F()
                };
                d.Lf = function () {
                    b.S(i)
                };
                d.fe = function () {
                    b.E(i)
                };
                d.hg = function () {
                    p && p.$Enable()
                };
                function T(a, d, c, h) {
                    if (b.B(a, "jssor-slider"))return;
                    if (!D) {
                        if (a.tagName == "IMG") {
                            z.push(a);
                            if (!b.B(a, "src")) {
                                R = e;
                                a["display-origin"] = b.hb(a);
                                b.S(a)
                            }
                        }
                        var f = b.Be(a);
                        if (f) {
                            var g = new Image;
                            b.j(g, "src2", f);
                            z.push(g)
                        }
                        if (c) {
                            b.K(a, (b.K(a) || 0) + 1);
                            b.Bc(a, b.Bc(a) || 0);
                            b.Ac(a, b.Ac(a) || 0);
                            b.ob(a, {$TranslateZ: 0})
                        }
                    }
                    var i = b.Ib(a);
                    b.a(i, function (f) {
                        var i = f.tagName, j = b.j(f, "u");
                        if (j == "player" && !v) {
                            v = f;
                            if (v.pInstance)Q(); else b.f(v, "dataavailable", Q)
                        }
                        if (j == "caption") {
                            if (d) {
                                b.je(f, b.j(f, "to"));
                                b.zf(f, b.j(f, "bf"));
                                M && b.j(f, "3d") && b.Bf(f, "preserve-3d")
                            } else if (!b.pe()) {
                                var g = b.fb(f, k, e);
                                b.Mb(g, f, a);
                                b.Jb(f, a);
                                f = g;
                                d = e
                            }
                        } else if (!D && !c && !n) {
                            if (i == "A") {
                                if (b.j(f, "u") == "image")n = b.Ef(f, "IMG"); else n = b.C(f, "image", e);
                                if (n) {
                                    x = f;
                                    b.hb(x, "block");
                                    b.N(x, W);
                                    E = b.fb(x, e);
                                    b.z(x, "relative");
                                    b.Ab(E, 0);
                                    b.gb(E, "backgroundColor", "#000")
                                }
                            } else if (i == "IMG" && b.j(f, "u") == "image")n = f;
                            if (n) {
                                n.border = 0;
                                b.N(n, W)
                            }
                        }
                        T(f, d, c + 1, h)
                    });
                    !D && c
                }

                d.Kc = function (c, b) {
                    var a = w - b;
                    dc(N, a)
                };
                d.pb = f;
                m.call(d);
                M = b.j(i, "p");
                b.rf(i, M);
                b.uf(i, b.j(i, "po"));
                var O = b.C(i, "thumb", e);
                if (O) {
                    d.eg = b.fb(O);
                    b.S(O)
                }
                b.E(i);
                y = b.fb(db);
                b.K(y, 1e3);
                b.f(i, "click", Z);
                F(e);
                d.Zb = n;
                d.ne = E;
                d.Ud = i;
                d.Nb = N = i;
                b.I(N, y);
                a.$On(203, G);
                a.$On(28, cb);
                a.$On(24, bb)
            }

            function zc(z, g, p, q) {
                var c = this, n = 0, v = 0, h, i, f, d, m, t, r, o = B[g];
                l.call(c, 0, 0);
                function w() {
                    b.uc(P);
                    hc && m && o.ne && b.I(P, o.ne);
                    b.E(P, !m && o.Zb)
                }

                function x() {
                    c.wc()
                }

                function y(a) {
                    r = a;
                    c.nb();
                    c.wc()
                }

                c.wc = function () {
                    var b = c.xb();
                    if (!D && !Q && !r && s == g) {
                        if (!b) {
                            if (h && !m) {
                                m = e;
                                c.qe(e);
                                a.l(j.$EVT_SLIDESHOW_START, g, n, v, h, d)
                            }
                            w()
                        }
                        var k, p = j.$EVT_STATE_CHANGE;
                        if (b != d)if (b == f)k = d; else if (b == i)k = f; else if (!b)k = i; else k = c.yd();
                        a.l(p, g, b, n, i, f, d);
                        var l = u && (!E || F);
                        if (b == d)(f != d && !(E & 12) || l) && o.dg(); else(l || b != f) && c.xd(k, x)
                    }
                };
                c.Af = function () {
                    f == d && f == c.xb() && c.M(i)
                };
                c.lg = function () {
                    C && C.pb == g && C.zb();
                    var b = c.xb();
                    b < d && a.l(j.$EVT_STATE_CHANGE, g, -b - 1, n, i, f, d)
                };
                c.qe = function (a) {
                    p && b.jb(ib, a && p.Nc.$Outside ? "" : "hidden")
                };
                c.Kc = function (c, b) {
                    if (m && b >= h) {
                        m = k;
                        w();
                        o.fe();
                        C.zb();
                        a.l(j.$EVT_SLIDESHOW_END, g, n, v, h, d)
                    }
                    a.l(j.$EVT_PROGRESS_CHANGE, g, b, n, i, f, d)
                };
                c.Pc = function (a) {
                    if (a && !t) {
                        t = a;
                        a.$On($JssorPlayer$.Ze, y)
                    }
                };
                p && c.pc(p);
                h = c.mb();
                c.pc(q);
                i = h + q.te;
                d = c.mb();
                f = u ? h + q.ue : d
            }

            function Pb(a, c, d) {
                b.v(a, c);
                b.u(a, d)
            }

            function dc(c, b) {
                var a = y > 0 ? y : hb, d = Db * b * (a & 1), e = Eb * b * (a >> 1 & 1);
                Pb(c, d, e)
            }

            function Ub() {
                qb = Q;
                Nb = A.yd();
                G = x.ab()
            }

            function kc() {
                Ub();
                if (D || !F && E & 12) {
                    A.nb();
                    a.l(j.Ee)
                }
            }

            function ic(e) {
                if (!D && (F || !(E & 12)) && !A.$IsPlaying()) {
                    var b = x.ab(), a = c.ceil(G);
                    if (e && c.abs(H) >= o.$MinDragOffsetToSlide) {
                        a = c.ceil(b);
                        a += fb
                    }
                    if (!(M & 1))a = c.min(r - w, c.max(a, 0));
                    var d = c.abs(a - b);
                    d = 1 - c.pow(1 - d, 5);
                    if (!J && qb)A.lf(Nb); else if (b == a) {
                        ub.hg();
                        ub.qc()
                    } else A.Sb(b, a, d * Ab)
                }
            }

            function Lb(a) {
                !b.j(b.zc(a), "nodrag") && b.gc(a)
            }

            function wc(a) {
                cc(a, 1)
            }

            function cc(c, d) {
                c = b.le(c);
                var l = b.zc(c);
                if (!N && !b.j(l, "nodrag") && xc() && (!d || c.touches.length == 1)) {
                    D = e;
                    Cb = k;
                    S = h;
                    b.f(g, d ? "touchmove" : "mousemove", Fb);
                    b.T();
                    J = 0;
                    kc();
                    if (!qb)y = 0;
                    if (d) {
                        var i = c.touches[0];
                        wb = i.clientX;
                        xb = i.clientY
                    } else {
                        var f = b.ee(c);
                        wb = f.x;
                        xb = f.y
                    }
                    H = 0;
                    cb = 0;
                    fb = 0;
                    a.l(j.$EVT_DRAG_START, t(G), G, c)
                }
            }

            function Fb(d) {
                if (D) {
                    d = b.le(d);
                    var f;
                    if (d.type != "mousemove") {
                        var l = d.touches[0];
                        f = {x: l.clientX, y: l.clientY}
                    } else f = b.ee(d);
                    if (f) {
                        var j = f.x - wb, k = f.y - xb;
                        if (c.floor(G) != G)y = y || hb & N;
                        if ((j || k) && !y) {
                            if (N == 3)if (c.abs(k) > c.abs(j))y = 2; else y = 1; else y = N;
                            if (lb && y == 1 && c.abs(k) - c.abs(j) > 3)Cb = e
                        }
                        if (y) {
                            var a = k, i = Eb;
                            if (y == 1) {
                                a = j;
                                i = Db
                            }
                            if (!(M & 1)) {
                                if (a > 0) {
                                    var g = i * s, h = a - g;
                                    if (h > 0)a = g + c.sqrt(h) * 5
                                }
                                if (a < 0) {
                                    var g = i * (r - w - s), h = -a - g;
                                    if (h > 0)a = -g - c.sqrt(h) * 5
                                }
                            }
                            if (H - cb < -2)fb = 0; else if (H - cb > 2)fb = -1;
                            cb = H;
                            H = a;
                            tb = G - H / i / (ab || 1);
                            if (H && y && !Cb) {
                                b.gc(d);
                                if (!Q)A.vf(tb); else A.pf(tb)
                            }
                        }
                    }
                }
            }

            function nb() {
                uc();
                if (D) {
                    D = k;
                    b.T();
                    b.R(g, "mousemove", Fb);
                    b.R(g, "touchmove", Fb);
                    J = H;
                    J && u & 8 && (u = 0);
                    A.nb();
                    var c = x.ab();
                    a.l(j.$EVT_DRAG_END, t(c), c, t(G), G);
                    E & 12 && Ub();
                    ic(e)
                }
            }

            function oc(c) {
                if (J) {
                    b.Pf(c);
                    var a = b.zc(c);
                    while (a && v !== a) {
                        a.tagName == "A" && b.gc(c);
                        try {
                            a = a.parentNode
                        } catch (d) {
                            break
                        }
                    }
                } else u & 4 && (u = 0)
            }

            function Ob(a) {
                B[s];
                s = t(a);
                ub = B[s];
                Zb(a);
                return s
            }

            function Hc(c, d) {
                y = 0;
                Ob(c);
                var b = t(c);
                if (u & 2 && (kb > 0 && b == r - 1 || kb < 0 && !b))u = 0;
                a.l(j.$EVT_PARK, b, d)
            }

            function Zb(a, c) {
                O = a;
                b.a(T, function (b) {
                    b.Gc(t(a), a, c)
                })
            }

            function xc() {
                var b = j.ae || 0, a = Z;
                if (lb)a & 1 && (a &= 1);
                j.ae |= a;
                return N = a & ~b
            }

            function uc() {
                if (N) {
                    j.ae &= ~Z;
                    N = 0
                }
            }

            function bc() {
                var a = b.ub();
                b.N(a, W);
                b.z(a, "absolute");
                return a
            }

            function t(b, a) {
                a = a || r || 1;
                return (b % a + a) % a
            }

            function pb(c, a, b) {
                u & 8 && (u = 0);
                Ib(c, Ab, a, b)
            }

            function zb() {
                b.a(T, function (a) {
                    a.Fc(a.Ub.$ChanceToShow <= F)
                })
            }

            function mc() {
                if (!F) {
                    F = 1;
                    zb();
                    if (!D) {
                        E & 12 && ic();
                        E & 3 && B[s] && B[s].qc()
                    }
                }
            }

            function lc() {
                if (F) {
                    F = 0;
                    zb();
                    D || !(E & 12) || kc()
                }
            }

            function nc() {
                W = {W: L, V: K, $Top: 0, $Left: 0};
                b.a(U, function (a) {
                    b.N(a, W);
                    b.z(a, "absolute");
                    b.jb(a, "hidden");
                    b.S(a)
                });
                b.N(db, W)
            }

            function Bb(b, a) {
                Ib(b, a, e)
            }

            function Ib(h, g, l, m) {
                if (Wb && (!D && (F || !(E & 12)) || o.$NaviQuitDrag)) {
                    Q = e;
                    D = k;
                    A.nb();
                    if (g == f)g = Ab;
                    var d = Gb.xb(), b = h;
                    if (l) {
                        b = O + h;
                        if (h > 0)b = c.ceil(b); else b = c.floor(b)
                    }
                    var a = b;
                    if (!(M & 1))if (m)a = t(b); else {
                        a = c.max(0, c.min(b, r - w));
                        if (a == O)if (M & 2)a = a ? 0 : r - w
                    }
                    var j = (a - d) % r;
                    a = d + j;
                    var i = d == a ? 0 : g * c.abs(j);
                    i = c.min(i, g * w * 1.5);
                    A.Sb(d, a, i || 1)
                }
            }

            a.$PlayTo = Ib;
            a.$GoTo = function (a) {
                x.M(Ob(a))
            };
            a.$Next = function () {
                Bb(1)
            };
            a.$Prev = function () {
                Bb(-1)
            };
            a.$Pause = function () {
                u = 0
            };
            a.$Play = function () {
                a.$AutoPlay(u || 1)
            };
            a.$SetSlideshowTransitions = function (a) {
                o.$SlideshowOptions.$Transitions = a
            };
            a.$SetCaptionTransitions = function (a) {
                I.$Transitions = a;
                I.Dc = b.T()
            };
            a.$SlidesCount = function () {
                return U.length
            };
            a.$CurrentIndex = function () {
                return s
            };
            a.$AutoPlay = function (a) {
                if (a == f)return a;
                if (a != u) {
                    u = a;
                    u && B[s] && B[s].qc()
                }
            };
            a.$IsDragging = function () {
                return D
            };
            a.$IsSliding = function () {
                return Q
            };
            a.$IsMouseOver = function () {
                return !F
            };
            a.$LastDragSucceded = function () {
                return J
            };
            function Y() {
                return b.n(z || q)
            }

            function jb() {
                return b.m(z || q)
            }

            a.$OriginalWidth = a.$GetOriginalWidth = Y;
            a.$OriginalHeight = a.$GetOriginalHeight = jb;
            function Jb(c, d) {
                if (c == f)return b.n(q);
                if (!z) {
                    var a = b.ub(g);
                    b.Sc(a, b.Sc(q));
                    b.Vb(a, b.Vb(q));
                    b.hb(a, "block");
                    b.z(a, "relative");
                    b.u(a, 0);
                    b.v(a, 0);
                    b.jb(a, "visible");
                    z = b.ub(g);
                    b.z(z, "absolute");
                    b.u(z, 0);
                    b.v(z, 0);
                    b.n(z, b.n(q));
                    b.m(z, b.m(q));
                    b.je(z, "0 0");
                    b.I(z, a);
                    var i = b.Ib(q);
                    b.I(q, z);
                    b.gb(q, "backgroundImage", "");
                    b.a(i, function (c) {
                        b.I(b.j(c, "noscale") ? q : a, c);
                        b.j(c, "autocenter") && Qb.push(c)
                    })
                }
                ab = c / (d ? b.m : b.n)(z);
                b.tf(z, ab);
                var h = d ? ab * Y() : c, e = d ? c : ab * jb();
                b.n(q, h);
                b.m(q, e);
                b.a(Qb, function (a) {
                    var c = b.cc(b.j(a, "autocenter"));
                    b.ig(a, c)
                })
            }

            a.$ScaleHeight = a.$GetScaleHeight = function (a) {
                if (a == f)return b.m(q);
                Jb(a, e)
            };
            a.$ScaleWidth = a.$SetScaleWidth = a.$GetScaleWidth = Jb;
            a.Yd = function (a) {
                var d = c.ceil(t(gb / fc)), b = t(a - O + d);
                if (b > w) {
                    if (a - O > r / 2)a -= r; else if (a - O <= -r / 2)a += r
                } else a = O + b - d;
                return a
            };
            m.call(a);
            a.$Elmt = q = b.kb(q);
            var o = b.p({
                $FillMode: 0,
                $LazyLoading: 1,
                $ArrowKeyNavigation: 1,
                $StartIndex: 0,
                $AutoPlay: 0,
                $Loop: 1,
                $HWA: e,
                $NaviQuitDrag: e,
                $AutoPlaySteps: 1,
                $AutoPlayInterval: 3e3,
                $PauseOnHover: 1,
                $SlideDuration: 500,
                $SlideEasing: d.$OutQuad,
                $MinDragOffsetToSlide: 20,
                $SlideSpacing: 0,
                $Cols: 1,
                $Align: 0,
                $UISearchMode: 1,
                $PlayOrientation: 1,
                $DragOrientation: 1
            }, jc);
            o.$HWA = o.$HWA && b.kg();
            if (o.$Idle != f)o.$AutoPlayInterval = o.$Idle;
            if (o.$ParkingPosition != f)o.$Align = o.$ParkingPosition;
            var hb = o.$PlayOrientation & 3, eb = o.$SlideshowOptions, I = b.p({
                $Class: p,
                $PlayInMode: 1,
                $PlayOutMode: 1,
                $HWA: o.$HWA
            }, o.$CaptionSliderOptions);
            I.$Transitions = I.$Transitions || I.$CaptionTransitions;
            var rb = o.$BulletNavigatorOptions, X = o.$ArrowNavigatorOptions, bb = o.$ThumbnailNavigatorOptions, R = !o.$UISearchMode, z, v = b.C(q, "slides", R), db = b.C(q, "loading", R) || b.ub(g), Mb = b.C(q, "navigator", R), gc = b.C(q, "arrowleft", R), ec = b.C(q, "arrowright", R), Kb = b.C(q, "thumbnavigator", R), qc = b.n(v), pc = b.m(v), W, U = [], yc = b.Ib(v);
            b.a(yc, function (a) {
                a.tagName == "DIV" && !b.j(a, "u") && U.push(a);
                b.K(a, (b.K(a) || 0) + 1)
            });
            var s = -1, O, ub, r = U.length, L = o.$SlideWidth || qc, K = o.$SlideHeight || pc, ac = o.$SlideSpacing, Db = L + ac, Eb = K + ac, fc = hb & 1 ? Db : Eb, w = c.min(o.$Cols, r), ib, y, N, Cb, T = [], Vb, Xb, Tb, hc, Gc, u, kb = o.$AutoPlaySteps, E = o.$PauseOnHover, rc = o.$AutoPlayInterval, Ab = o.$SlideDuration, sb, vb, gb, Wb = w < r, M = Wb ? o.$Loop : 0, Z, J, F = 1, Q, D, S, wb = 0, xb = 0, H, cb, fb, Gb, x, V, A, Yb = new tc, ab, Qb = [];
            if (r) {
                if (o.$HWA)Pb = function (a, c, d) {
                    b.ob(a, {$TranslateX: c, $TranslateY: d})
                };
                u = o.$AutoPlay & 63;
                a.Ub = jc;
                nc();
                b.B(q, "jssor-slider", e);
                b.K(v, b.K(v) || 0);
                b.z(v, "absolute");
                ib = b.fb(v, e);
                b.Mb(ib, v);
                if (eb) {
                    hc = eb.$ShowLink;
                    sb = eb.$Class;
                    vb = w == 1 && r > 1 && sb && (!b.pe() || b.be() >= 8)
                }
                gb = vb || w >= r || !(M & 1) ? 0 : o.$Align;
                Z = (w > 1 || gb ? hb : -1) & o.$DragOrientation;
                var yb = v, B = [], C, P, Hb = b.ng(), lb = Hb.Ge, G, qb, Nb, tb;
                Hb.re && b.gb(yb, Hb.re, ([h, "pan-y", "pan-x", "none"])[Z] || "");
                V = new Dc;
                if (vb)C = new sb(Yb, L, K, eb, lb);
                b.I(ib, V.Nb);
                b.jb(v, "hidden");
                P = bc();
                b.gb(P, "backgroundColor", "#000");
                b.Ab(P, 0);
                b.Mb(P, yb.firstChild, yb);
                for (var ob = 0; ob < U.length; ob++) {
                    var Ac = U[ob], Bc = new Cc(Ac, ob);
                    B.push(Bc)
                }
                b.S(db);
                Gb = new Ec;
                A = new sc(Gb, V);
                b.f(v, "click", oc, e);
                b.f(q, "mouseout", b.hc(mc, q));
                b.f(q, "mouseover", b.hc(lc, q));
                if (Z) {
                    b.f(v, "mousedown", cc);
                    b.f(v, "touchstart", wc);
                    b.f(v, "dragstart", Lb);
                    b.f(v, "selectstart", Lb);
                    b.f(g, "mouseup", nb);
                    b.f(g, "touchend", nb);
                    b.f(g, "touchcancel", nb);
                    b.f(i, "blur", nb)
                }
                E &= lb ? 10 : 5;
                if (Mb && rb) {
                    Vb = new rb.$Class(Mb, rb, Y(), jb());
                    T.push(Vb)
                }
                if (X && gc && ec) {
                    X.$Loop = M;
                    X.$Cols = w;
                    Xb = new X.$Class(gc, ec, X, Y(), jb());
                    T.push(Xb)
                }
                if (Kb && bb) {
                    bb.$StartIndex = o.$StartIndex;
                    Tb = new bb.$Class(Kb, bb);
                    T.push(Tb)
                }
                b.a(T, function (a) {
                    a.xc(r, B, db);
                    a.$On(n.Rb, pb)
                });
                b.gb(q, "visibility", "visible");
                Jb(Y());
                zb();
                o.$ArrowKeyNavigation && b.f(g, "keydown", function (a) {
                    if (a.keyCode == 37)pb(-o.$ArrowKeyNavigation, e); else a.keyCode == 39 && pb(o.$ArrowKeyNavigation, e)
                });
                var mb = o.$StartIndex;
                if (!(M & 1))mb = c.max(0, c.min(mb, r - w));
                A.Sb(mb, mb, 0)
            }
        };
        j.$EVT_CLICK = 21;
        j.$EVT_DRAG_START = 22;
        j.$EVT_DRAG_END = 23;
        j.$EVT_SWIPE_START = 24;
        j.$EVT_SWIPE_END = 25;
        j.$EVT_LOAD_START = 26;
        j.$EVT_LOAD_END = 27;
        j.Ee = 28;
        j.$EVT_POSITION_CHANGE = 202;
        j.$EVT_PARK = 203;
        j.$EVT_SLIDESHOW_START = 206;
        j.$EVT_SLIDESHOW_END = 207;
        j.$EVT_PROGRESS_CHANGE = 208;
        j.$EVT_STATE_CHANGE = 209;
        var n = {Rb: 1};
        i.$JssorBulletNavigator$ = function (d, C) {
            var f = this;
            m.call(f);
            d = b.kb(d);
            var s, A, z, r, l = 0, a, o, j, w, x, i, g, q, p, B = [], y = [];

            function v(a) {
                a != -1 && y[a].Dd(a == l)
            }

            function t(a) {
                f.l(n.Rb, a * o)
            }

            f.$Elmt = d;
            f.Gc = function (a) {
                if (a != r) {
                    var d = l, b = c.floor(a / o);
                    l = b;
                    r = a;
                    v(d);
                    v(b)
                }
            };
            f.Fc = function (a) {
                b.E(d, a)
            };
            var u;
            f.xc = function (E) {
                if (!u) {
                    s = c.ceil(E / o);
                    l = 0;
                    var n = q + w, r = p + x, m = c.ceil(s / j) - 1;
                    A = q + n * (!i ? m : j - 1);
                    z = p + r * (i ? m : j - 1);
                    b.n(d, A);
                    b.m(d, z);
                    for (var f = 0; f < s; f++) {
                        var C = b.sf();
                        b.Qf(C, f + 1);
                        var k = b.Cd(g, "numbertemplate", C, e);
                        b.z(k, "absolute");
                        var v = f % (m + 1);
                        b.v(k, !i ? n * v : f % j * n);
                        b.u(k, i ? r * v : c.floor(f / (m + 1)) * r);
                        b.I(d, k);
                        B[f] = k;
                        a.$ActionMode & 1 && b.f(k, "click", b.H(h, t, f));
                        a.$ActionMode & 2 && b.f(k, "mouseover", b.hc(b.H(h, t, f), k));
                        y[f] = b.Yb(k)
                    }
                    u = e
                }
            };
            f.Ub = a = b.p({$SpacingX: 10, $SpacingY: 10, $Orientation: 1, $ActionMode: 1}, C);
            g = b.C(d, "prototype");
            q = b.n(g);
            p = b.m(g);
            b.Jb(g, d);
            o = a.$Steps || 1;
            j = a.$Rows || 1;
            w = a.$SpacingX;
            x = a.$SpacingY;
            i = a.$Orientation - 1;
            a.$Scale == k && b.B(d, "noscale", e);
            a.$AutoCenter && b.B(d, "autocenter", a.$AutoCenter)
        };
        i.$JssorArrowNavigator$ = function (a, g, i) {
            var c = this;
            m.call(c);
            var r, d, f, j;
            b.n(a);
            b.m(a);
            var p, o;

            function l(a) {
                c.l(n.Rb, a, e)
            }

            function t(c) {
                b.E(a, c);
                b.E(g, c)
            }

            function s() {
                p.$Enable(i.$Loop || d > 0);
                o.$Enable(i.$Loop || d < r - i.$Cols)
            }

            c.Gc = function (b, a, c) {
                if (c)d = a; else {
                    d = b;
                    s()
                }
            };
            c.Fc = t;
            var q;
            c.xc = function (c) {
                r = c;
                d = 0;
                if (!q) {
                    b.f(a, "click", b.H(h, l, -j));
                    b.f(g, "click", b.H(h, l, j));
                    p = b.Yb(a);
                    o = b.Yb(g);
                    q = e
                }
            };
            c.Ub = f = b.p({$Steps: 1}, i);
            j = f.$Steps;
            if (f.$Scale == k) {
                b.B(a, "noscale", e);
                b.B(g, "noscale", e)
            }
            if (f.$AutoCenter) {
                b.B(a, "autocenter", f.$AutoCenter);
                b.B(g, "autocenter", f.$AutoCenter)
            }
        };
        i.$JssorThumbnailNavigator$ = function (g, B) {
            var i = this, y, p, a, v = [], z, x, d, q, r, u, t, o, s, f, l;
            m.call(i);
            g = b.kb(g);
            function A(q, f) {
                var g = this, c, o, m;

                function r() {
                    o.Dd(p == f)
                }

                function j(g) {
                    if (g || !s.$LastDragSucceded()) {
                        var a = d - f % d, b = s.Yd((f + a) / d - 1), c = b * d + d - a;
                        i.l(n.Rb, c, k, e)
                    }
                }

                g.pb = f;
                g.md = r;
                m = q.eg || q.Zb || b.ub();
                g.Nb = c = b.Cd(l, "thumbnailtemplate", m, e);
                o = b.Yb(c);
                a.$ActionMode & 1 && b.f(c, "click", b.H(h, j, 0));
                a.$ActionMode & 2 && b.f(c, "mouseover", b.hc(b.H(h, j, 1), c))
            }

            i.Gc = function (b, e, f) {
                var a = p;
                p = b;
                a != -1 && v[a].md();
                v[b].md();
                !f && s.$PlayTo(s.Yd(c.floor(e / d)))
            };
            i.Fc = function (a) {
                b.E(g, a)
            };
            var w;
            i.xc = function (F, D) {
                if (!w) {
                    y = F;
                    c.ceil(y / d);
                    p = -1;
                    o = c.min(o, D.length);
                    var h = a.$Orientation & 1, m = u + (u + q) * (d - 1) * (1 - h), l = t + (t + r) * (d - 1) * h, B = m + (m + q) * (o - 1) * h, n = l + (l + r) * (o - 1) * (1 - h);
                    b.z(f, "absolute");
                    b.jb(f, "hidden");
                    a.$AutoCenter & 1 && b.v(f, (z - B) / 2);
                    a.$AutoCenter & 2 && b.u(f, (x - n) / 2);
                    b.n(f, B);
                    b.m(f, n);
                    var i = [];
                    b.a(D, function (l, g) {
                        var j = new A(l, g), e = j.Nb, a = c.floor(g / d), k = g % d;
                        b.v(e, (u + q) * k * (1 - h));
                        b.u(e, (t + r) * k * h);
                        if (!i[a]) {
                            i[a] = b.ub();
                            b.I(f, i[a])
                        }
                        b.I(i[a], e);
                        v.push(j)
                    });
                    var E = b.p({
                        $AutoPlay: 0,
                        $NaviQuitDrag: k,
                        $SlideWidth: m,
                        $SlideHeight: l,
                        $SlideSpacing: q * h + r * (1 - h),
                        $MinDragOffsetToSlide: 12,
                        $SlideDuration: 200,
                        $PauseOnHover: 1,
                        $PlayOrientation: a.$Orientation,
                        $DragOrientation: a.$NoDrag || a.$DisableDrag ? 0 : a.$Orientation
                    }, a);
                    s = new j(g, E);
                    w = e
                }
            };
            i.Ub = a = b.p({$SpacingX: 0, $SpacingY: 0, $Cols: 1, $Orientation: 1, $AutoCenter: 3, $ActionMode: 1}, B);
            z = b.n(g);
            x = b.m(g);
            f = b.C(g, "slides", e);
            l = b.C(f, "prototype");
            u = b.n(l);
            t = b.m(l);
            b.Jb(l, f);
            d = a.$Rows || 1;
            q = a.$SpacingX;
            r = a.$SpacingY;
            o = a.$Cols;
            a.$Scale == k && b.B(g, "noscale", e)
        };
        function p(e, d, c) {
            var a = this;
            l.call(a, 0, c);
            a.ed = b.Rc;
            a.te = 0;
            a.ue = c
        }

        i.$JssorCaptionSlideo$ = function (v, j, u, E) {
            var a = this, w, o = {}, p = j.$Transitions, s = j.$Controls, m = new l(0, 0), q = [], g = [], D = E, f = D ? 1e8 : 0;
            l.call(a, 0, 0);
            function r(d, c) {
                var a = {};
                b.a(d, function (d, f) {
                    var e = o[f];
                    if (e) {
                        if (b.id(d))d = r(d, c || f == "e"); else if (c)if (b.jc(d))d = w[d];
                        a[e] = d
                    }
                });
                return a
            }

            function t(d, e) {
                var a = [], c = b.Ib(d);
                b.a(c, function (c) {
                    var h = b.j(c, "u") == "caption";
                    if (h) {
                        var d = b.j(c, "t"), g = p[b.cc(d)] || p[d], f = {$Elmt: c, Nc: g};
                        a.push(f)
                    }
                    a = a.concat(t(c, e + 1))
                });
                return a
            }

            function n(c, e) {
                var a = q[c];
                if (a == h) {
                    a = q[c] = {ib: c, sc: [], vd: []};
                    var d = 0;
                    !b.a(g, function (a, b) {
                        d = b;
                        return a.ib > c
                    }) && d++;
                    g.splice(d, 0, a)
                }
                return a
            }

            function z(t, u, g) {
                var a, d;
                if (s) {
                    var o = b.j(t, "c");
                    if (o) {
                        var m = s[b.cc(o)];
                        if (m) {
                            a = n(m.r, 0);
                            a.Te = m.e || 0
                        }
                    }
                }
                b.a(u, function (i) {
                    var h = b.p(e, {}, r(i)), j = b.Oc(h.$Easing);
                    delete h.$Easing;
                    if (h.$Left) {
                        h.A = h.$Left;
                        j.A = j.$Left;
                        delete h.$Left
                    }
                    if (h.$Top) {
                        h.D = h.$Top;
                        j.D = j.$Top;
                        delete h.$Top
                    }
                    var o = {$Easing: j, $OriginalWidth: g.W, $OriginalHeight: g.V}, k = new l(i.b, i.d, o, t, g, h);
                    f = c.max(f, i.b + i.d);
                    if (a) {
                        if (!d)d = new l(i.b, 0);
                        d.P(k)
                    } else {
                        var m = n(i.b, i.b + i.d);
                        m.sc.push(k)
                    }
                    g = b.df(g, h)
                });
                if (a && d) {
                    d.jf();
                    var i = d, k, j = d.fc(), p = d.mb(), q = c.max(p, a.Te);
                    if (a.ib < p) {
                        if (a.ib > j) {
                            i = new l(j, a.ib - j);
                            i.P(d, e)
                        } else i = h;
                        k = new l(a.ib, q - j, {Cc: q - a.ib, Oe: e});
                        k.P(d, e)
                    }
                    i && a.sc.push(i);
                    k && a.vd.push(k)
                }
                return g
            }

            function y(a) {
                b.a(a, function (f) {
                    var a = f.$Elmt, e = b.n(a), d = b.m(a), c = {
                        $Left: b.v(a),
                        $Top: b.u(a),
                        A: 0,
                        D: 0,
                        $Opacity: 1,
                        $ZIndex: b.K(a) || 0,
                        $Rotate: 0,
                        $RotateX: 0,
                        $RotateY: 0,
                        $ScaleX: 1,
                        $ScaleY: 1,
                        $TranslateX: 0,
                        $TranslateY: 0,
                        $TranslateZ: 0,
                        $SkewX: 0,
                        $SkewY: 0,
                        W: e,
                        V: d,
                        $Clip: {$Top: 0, $Right: e, $Bottom: d, $Left: 0}
                    };
                    c.Qd = c.$Left;
                    c.Pd = c.$Top;
                    z(a, f.Nc, c)
                })
            }

            function B(f, d, g) {
                var c = f.b - d;
                if (c) {
                    var b = new l(d, c);
                    b.P(m, e);
                    b.$Shift(g);
                    a.P(b)
                }
                a.zd(f.d);
                return c
            }

            function A(e) {
                var c = m.fc(), d = 0;
                b.a(e, function (e, f) {
                    e = b.p({d: u}, e);
                    B(e, c, d);
                    c = e.b;
                    d += e.d;
                    if (!f || e.t == 2) {
                        a.te = c;
                        a.ue = c + e.d
                    }
                })
            }

            function i(k, d, e) {
                var g = d.length;
                if (g > 4)for (var m = c.ceil(g / 4), a = 0; a < m; a++) {
                    var h = d.slice(a * 4, c.min(a * 4 + 4, g)), j = new l(h[0].ib, 0);
                    i(j, h, e);
                    k.P(j)
                } else b.a(d, function (a) {
                    b.a(e ? a.vd : a.sc, function (a) {
                        e && a.zd(f - a.mb());
                        k.P(a)
                    })
                })
            }

            a.ed = function () {
                a.M(-1, e)
            };
            w = [d.$Linear, d.$Swing, d.$InQuad, d.$OutQuad, d.$InOutQuad, d.$InCubic, d.$OutCubic, d.$InOutCubic, d.$InQuart, d.$OutQuart, d.$InOutQuart, d.$InQuint, d.$OutQuint, d.$InOutQuint, d.$InSine, d.$OutSine, d.$InOutSine, d.$InExpo, d.$OutExpo, d.$InOutExpo, d.$InCirc, d.$OutCirc, d.$InOutCirc, d.$InElastic, d.$OutElastic, d.$InOutElastic, d.$InBack, d.$OutBack, d.$InOutBack, d.$InBounce, d.$OutBounce, d.$InOutBounce, d.$Early, d.$Late];
            var C = {
                $Top: "y",
                $Left: "x",
                $Bottom: "m",
                $Right: "t",
                $Rotate: "r",
                $RotateX: "rX",
                $RotateY: "rY",
                $ScaleX: "sX",
                $ScaleY: "sY",
                $TranslateX: "tX",
                $TranslateY: "tY",
                $TranslateZ: "tZ",
                $SkewX: "kX",
                $SkewY: "kY",
                $Opacity: "o",
                $Easing: "e",
                $ZIndex: "i",
                $Clip: "c"
            };
            b.a(C, function (b, a) {
                o[b] = a
            });
            y(t(v, 1));
            i(m, g);
            var x = j.$Breaks || [], k = [].concat(x[b.cc(b.j(v, "b"))] || []);
            k.push({b: f, d: k.length ? 0 : u});
            A(k);
            f = c.max(f, a.mb());
            i(a, g, e);
            a.M(-1)
        }
    })(window, document, Math, null, true, false)

}));