try {
    (function(e, t) {
        function a(e, t) {
            var n = decodeURI(e),
                i = s[t || !1 ? "strict" : "loose"].exec(n),
                a = {
                    attr: {},
                    param: {},
                    seg: {}
                },
                f = 14;
            while (f--) a.attr[r[f]] = i[f] || "";
            return a.param.query = {}, a.param.fragment = {}, a.attr.query.replace(o, function(e, t, n) {
                t && (a.param.query[t] = n)
            }), a.attr.fragment.replace(u, function(e, t, n) {
                t && (a.param.fragment[t] = n)
            }), a.seg.path = a.attr.path.replace(/^\/+|\/+$/g, "").split("/"), a.seg.fragment = a.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), a.attr.base = a.attr.host ? a.attr.protocol + "://" + a.attr.host + (a.attr.port ? ":" + a.attr.port : "") : "", a
        }

        function f(e) {
            var r = e.tagName;
            return r !== t ? n[r.toLowerCase()] : r
        }
        var n = {
                a: "href",
                img: "src",
                form: "action",
                base: "href",
                script: "src",
                iframe: "src",
                link: "href"
            },
            r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
            i = {
                anchor: "fragment"
            },
            s = {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            },
            o = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g,
            u = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;
        e.fn.url = function(t) {
            var n = "";
            return this.length && (n = e(this).attr(f(this[0])) || ""), e.url(n, t)
        }, e.url = function(e, n) {
            return arguments.length === 1 && e === !0 && (n = !0, e = t), n = n || !1, e = e || window.location.toString(), {
                data: a(e, n),
                attr: function(e) {
                    return e = i[e] || e, e !== t ? this.data.attr[e] : this.data.attr
                },
                param: function(e) {
                    return e !== t ? this.data.param.query[e] : this.data.param.query
                },
                fparam: function(e) {
                    return e !== t ? this.data.param.fragment[e] : this.data.param.fragment
                },
                segment: function(e) {
                    return e === t ? this.data.seg.path : (e = e < 0 ? this.data.seg.path.length + e : e - 1, this.data.seg.path[e])
                },
                fsegment: function(e) {
                    return e === t ? this.data.seg.fragment : (e = e < 0 ? this.data.seg.fragment.length + e : e - 1, this.data.seg.fragment[e])
                }
            }
        }
    })(jQuery),
    function() {
        var e = this,
            t = e.Backbone,
            n = [],
            r = n.push,
            i = n.slice,
            s = n.splice,
            o;
        typeof exports != "undefined" ? o = exports : o = e.Backbone = {}, o.VERSION = "1.0.0";
        var u = e._;
        !u && typeof require != "undefined" && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender || e.$, o.noConflict = function() {
            return e.Backbone = t, this
        }, o.emulateHTTP = !1, o.emulateJSON = !1;
        var a = o.Events = {
                on: function(e, t, n) {
                    if (!l(this, "on", e, [t, n]) || !t) return this;
                    this._events || (this._events = {});
                    var r = this._events[e] || (this._events[e] = []);
                    return r.push({
                        callback: t,
                        context: n,
                        ctx: n || this
                    }), this
                },
                once: function(e, t, n) {
                    if (!l(this, "once", e, [t, n]) || !t) return this;
                    var r = this,
                        i = u.once(function() {
                            r.off(e, i), t.apply(this, arguments)
                        });
                    return i._callback = t, this.on(e, i, n)
                },
                off: function(e, t, n) {
                    var r, i, s, o, a, f, c, h;
                    if (!this._events || !l(this, "off", e, [t, n])) return this;
                    if (!e && !t && !n) return this._events = {}, this;
                    o = e ? [e] : u.keys(this._events);
                    for (a = 0, f = o.length; a < f; a++) {
                        e = o[a];
                        if (s = this._events[e]) {
                            this._events[e] = r = [];
                            if (t || n)
                                for (c = 0, h = s.length; c < h; c++) i = s[c], (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && r.push(i);
                            r.length || delete this._events[e]
                        }
                    }
                    return this
                },
                trigger: function(e) {
                    if (!this._events) return this;
                    var t = i.call(arguments, 1);
                    if (!l(this, "trigger", e, t)) return this;
                    var n = this._events[e],
                        r = this._events.all;
                    return n && c(n, t), r && c(r, arguments), this
                },
                stopListening: function(e, t, n) {
                    var r = this._listeners;
                    if (!r) return this;
                    var i = !t && !n;
                    typeof t == "object" && (n = this), e && ((r = {})[e._listenerId] = e);
                    for (var s in r) r[s].off(t, n, this), i && delete this._listeners[s];
                    return this
                }
            },
            f = /\s+/,
            l = function(e, t, n, r) {
                if (!n) return !0;
                if (typeof n == "object") {
                    for (var i in n) e[t].apply(e, [i, n[i]].concat(r));
                    return !1
                }
                if (f.test(n)) {
                    var s = n.split(f);
                    for (var o = 0, u = s.length; o < u; o++) e[t].apply(e, [s[o]].concat(r));
                    return !1
                }
                return !0
            },
            c = function(e, t) {
                var n, r = -1,
                    i = e.length,
                    s = t[0],
                    o = t[1],
                    u = t[2];
                switch (t.length) {
                    case 0:
                        while (++r < i)(n = e[r]).callback.call(n.ctx);
                        return;
                    case 1:
                        while (++r < i)(n = e[r]).callback.call(n.ctx, s);
                        return;
                    case 2:
                        while (++r < i)(n = e[r]).callback.call(n.ctx, s, o);
                        return;
                    case 3:
                        while (++r < i)(n = e[r]).callback.call(n.ctx, s, o, u);
                        return;
                    default:
                        while (++r < i)(n = e[r]).callback.apply(n.ctx, t)
                }
            },
            h = {
                listenTo: "on",
                listenToOnce: "once"
            };
        u.each(h, function(e, t) {
            a[t] = function(t, n, r) {
                var i = this._listeners || (this._listeners = {}),
                    s = t._listenerId || (t._listenerId = u.uniqueId("l"));
                return i[s] = t, typeof n == "object" && (r = this), t[e](n, r, this), this
            }
        }), a.bind = a.on, a.unbind = a.off, u.extend(o, a);
        var p = o.Model = function(e, t) {
                var n, r = e || {};
                t || (t = {}), this.cid = u.uniqueId("c"), this.attributes = {}, u.extend(this, u.pick(t, d)), t.parse && (r = this.parse(r, t) || {});
                if (n = u.result(this, "defaults")) r = u.defaults({}, r, n);
                this.set(r, t), this.changed = {}, this.initialize.apply(this, arguments)
            },
            d = ["url", "urlRoot", "collection"];
        u.extend(p.prototype, a, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function(e) {
                return u.clone(this.attributes)
            },
            sync: function() {
                return o.sync.apply(this, arguments)
            },
            get: function(e) {
                return this.attributes[e]
            },
            escape: function(e) {
                return u.escape(this.get(e))
            },
            has: function(e) {
                return this.get(e) != null
            },
            set: function(e, t, n) {
                var r, i, s, o, a, f, l, c;
                if (e == null) return this;
                typeof e == "object" ? (i = e, n = t) : (i = {})[e] = t, n || (n = {});
                if (!this._validate(i, n)) return !1;
                s = n.unset, a = n.silent, o = [], f = this._changing, this._changing = !0, f || (this._previousAttributes = u.clone(this.attributes), this.changed = {}), c = this.attributes, l = this._previousAttributes, this.idAttribute in i && (this.id = i[this.idAttribute]);
                for (r in i) t = i[r], u.isEqual(c[r], t) || o.push(r), u.isEqual(l[r], t) ? delete this.changed[r] : this.changed[r] = t, s ? delete c[r] : c[r] = t;
                if (!a) {
                    o.length && (this._pending = !0);
                    for (var h = 0, p = o.length; h < p; h++) this.trigger("change:" + o[h], this, c[o[h]], n)
                }
                if (f) return this;
                if (!a)
                    while (this._pending) this._pending = !1, this.trigger("change", this, n);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(e, t) {
                return this.set(e, void 0, u.extend({}, t, {
                    unset: !0
                }))
            },
            clear: function(e) {
                var t = {};
                for (var n in this.attributes) t[n] = void 0;
                return this.set(t, u.extend({}, e, {
                    unset: !0
                }))
            },
            hasChanged: function(e) {
                return e == null ? !u.isEmpty(this.changed) : u.has(this.changed, e)
            },
            changedAttributes: function(e) {
                if (!e) return this.hasChanged() ? u.clone(this.changed) : !1;
                var t, n = !1,
                    r = this._changing ? this._previousAttributes : this.attributes;
                for (var i in e) {
                    if (u.isEqual(r[i], t = e[i])) continue;
                    (n || (n = {}))[i] = t
                }
                return n
            },
            previous: function(e) {
                return e == null || !this._previousAttributes ? null : this._previousAttributes[e]
            },
            previousAttributes: function() {
                return u.clone(this._previousAttributes)
            },
            fetch: function(e) {
                e = e ? u.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
                var t = this,
                    n = e.success;
                return e.success = function(r) {
                    if (!t.set(t.parse(r, e), e)) return !1;
                    n && n(t, r, e), t.trigger("sync", t, r, e)
                }, j(this, e), this.sync("read", this, e)
            },
            save: function(e, t, n) {
                var r, i, s, o = this.attributes;
                e == null || typeof e == "object" ? (r = e, n = t) : (r = {})[e] = t;
                if (r && (!n || !n.wait) && !this.set(r, n)) return !1;
                n = u.extend({
                    validate: !0
                }, n);
                if (!this._validate(r, n)) return !1;
                r && n.wait && (this.attributes = u.extend({}, o, r)), n.parse === void 0 && (n.parse = !0);
                var a = this,
                    f = n.success;
                return n.success = function(e) {
                    a.attributes = o;
                    var t = a.parse(e, n);
                    n.wait && (t = u.extend(r || {}, t));
                    if (u.isObject(t) && !a.set(t, n)) return !1;
                    f && f(a, e, n), a.trigger("sync", a, e, n)
                }, j(this, n), i = this.isNew() ? "create" : n.patch ? "patch" : "update", i === "patch" && (n.attrs = r), s = this.sync(i, this, n), r && n.wait && (this.attributes = o), s
            },
            destroy: function(e) {
                e = e ? u.clone(e) : {};
                var t = this,
                    n = e.success,
                    r = function() {
                        t.trigger("destroy", t, t.collection, e)
                    };
                e.success = function(i) {
                    (e.wait || t.isNew()) && r(), n && n(t, i, e), t.isNew() || t.trigger("sync", t, i, e)
                };
                if (this.isNew()) return e.success(), !1;
                j(this, e);
                var i = this.sync("delete", this, e);
                return e.wait || r(), i
            },
            url: function() {
                var e = u.result(this, "urlRoot") || u.result(this.collection, "url") || B();
                return this.isNew() ? e : e + (e.charAt(e.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(e, t) {
                return e
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return this.id == null
            },
            isValid: function(e) {
                return this._validate({}, u.extend(e || {}, {
                    validate: !0
                }))
            },
            _validate: function(e, t) {
                if (!t.validate || !this.validate) return !0;
                e = u.extend({}, this.attributes, e);
                var n = this.validationError = this.validate(e, t) || null;
                return n ? (this.trigger("invalid", this, n, u.extend(t || {}, {
                    validationError: n
                })), !1) : !0
            }
        });
        var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
        u.each(v, function(e) {
            p.prototype[e] = function() {
                var t = i.call(arguments);
                return t.unshift(this.attributes), u[e].apply(u, t)
            }
        });
        var m = o.Collection = function(e, t) {
                t || (t = {}), t.url && (this.url = t.url), t.model && (this.model = t.model), t.comparator !== void 0 && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, u.extend({
                    silent: !0
                }, t))
            },
            g = {
                add: !0,
                remove: !0,
                merge: !0
            },
            y = {
                add: !0,
                merge: !1,
                remove: !1
            };
        u.extend(m.prototype, a, {
            model: p,
            initialize: function() {},
            toJSON: function(e) {
                return this.map(function(t) {
                    return t.toJSON(e)
                })
            },
            sync: function() {
                return o.sync.apply(this, arguments)
            },
            add: function(e, t) {
                return this.set(e, u.defaults(t || {}, y))
            },
            remove: function(e, t) {
                e = u.isArray(e) ? e.slice() : [e], t || (t = {});
                var n, r, i, s;
                for (n = 0, r = e.length; n < r; n++) {
                    s = this.get(e[n]);
                    if (!s) continue;
                    delete this._byId[s.id], delete this._byId[s.cid], i = this.indexOf(s), this.models.splice(i, 1), this.length--, t.silent || (t.index = i, s.trigger("remove", s, this, t)), this._removeReference(s)
                }
                return this
            },
            set: function(e, t) {
                t = u.defaults(t || {}, g), t.parse && (e = this.parse(e, t)), u.isArray(e) || (e = e ? [e] : []);
                var n, i, o, a, f, l, c = t.at,
                    h = this.comparator && c == null && t.sort !== !1,
                    p = u.isString(this.comparator) ? this.comparator : null,
                    d = [],
                    v = [],
                    m = {};
                for (n = 0, i = e.length; n < i; n++) {
                    if (!(o = this._prepareModel(e[n], t))) continue;
                    (f = this.get(o)) ? (t.remove && (m[f.cid] = !0), t.merge && (f.set(o.attributes, t), h && !l && f.hasChanged(p) && (l = !0))) : t.add && (d.push(o), o.on("all", this._onModelEvent, this), this._byId[o.cid] = o, o.id != null && (this._byId[o.id] = o))
                }
                if (t.remove) {
                    for (n = 0, i = this.length; n < i; ++n) m[(o = this.models[n]).cid] || v.push(o);
                    v.length && this.remove(v, t)
                }
                d.length && (h && (l = !0), this.length += d.length, c != null ? s.apply(this.models, [c, 0].concat(d)) : r.apply(this.models, d)), l && this.sort({
                    silent: !0
                });
                if (t.silent) return this;
                for (n = 0, i = d.length; n < i; n++)(o = d[n]).trigger("add", o, this, t);
                return l && this.trigger("sort", this, t), this
            },
            reset: function(e, t) {
                t || (t = {});
                for (var n = 0, r = this.models.length; n < r; n++) this._removeReference(this.models[n]);
                return t.previousModels = this.models, this._reset(), this.add(e, u.extend({
                    silent: !0
                }, t)), t.silent || this.trigger("reset", this, t), this
            },
            push: function(e, t) {
                return e = this._prepareModel(e, t), this.add(e, u.extend({
                    at: this.length
                }, t)), e
            },
            pop: function(e) {
                var t = this.at(this.length - 1);
                return this.remove(t, e), t
            },
            unshift: function(e, t) {
                return e = this._prepareModel(e, t), this.add(e, u.extend({
                    at: 0
                }, t)), e
            },
            shift: function(e) {
                var t = this.at(0);
                return this.remove(t, e), t
            },
            slice: function(e, t) {
                return this.models.slice(e, t)
            },
            get: function(e) {
                return e == null ? void 0 : this._byId[e.id != null ? e.id : e.cid || e]
            },
            at: function(e) {
                return this.models[e]
            },
            where: function(e, t) {
                return u.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
                    for (var n in e)
                        if (e[n] !== t.get(n)) return !1;
                    return !0
                })
            },
            findWhere: function(e) {
                return this.where(e, !0)
            },
            sort: function(e) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return e || (e = {}), u.isString(this.comparator) || this.comparator.length === 1 ? this.models = this.sortBy(this.comparator, this) : this.models.sort(u.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
            },
            sortedIndex: function(e, t, n) {
                t || (t = this.comparator);
                var r = u.isFunction(t) ? t : function(e) {
                    return e.get(t)
                };
                return u.sortedIndex(this.models, e, r, n)
            },
            pluck: function(e) {
                return u.invoke(this.models, "get", e)
            },
            fetch: function(e) {
                e = e ? u.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
                var t = e.success,
                    n = this;
                return e.success = function(r) {
                    var i = e.reset ? "reset" : "set";
                    n[i](r, e), t && t(n, r, e), n.trigger("sync", n, r, e)
                }, j(this, e), this.sync("read", this, e)
            },
            create: function(e, t) {
                t = t ? u.clone(t) : {};
                if (!(e = this._prepareModel(e, t))) return !1;
                t.wait || this.add(e, t);
                var n = this,
                    r = t.success;
                return t.success = function(i) {
                    t.wait && n.add(e, t), r && r(e, i, t)
                }, e.save(null, t), e
            },
            parse: function(e, t) {
                return e
            },
            clone: function() {
                return new this.constructor(this.models)
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(e, t) {
                if (e instanceof p) return e.collection || (e.collection = this), e;
                t || (t = {}), t.collection = this;
                var n = new this.model(e, t);
                return n._validate(e, t) ? n : (this.trigger("invalid", this, e, t), !1)
            },
            _removeReference: function(e) {
                this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(e, t, n, r) {
                if ((e === "add" || e === "remove") && n !== this) return;
                e === "destroy" && this.remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], t.id != null && (this._byId[t.id] = t)), this.trigger.apply(this, arguments)
            }
        });
        var b = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
        u.each(b, function(e) {
            m.prototype[e] = function() {
                var t = i.call(arguments);
                return t.unshift(this.models), u[e].apply(u, t)
            }
        });
        var w = ["groupBy", "countBy", "sortBy"];
        u.each(w, function(e) {
            m.prototype[e] = function(t, n) {
                var r = u.isFunction(t) ? t : function(e) {
                    return e.get(t)
                };
                return u[e](this.models, r, n)
            }
        });
        var E = o.View = function(e) {
                this.cid = u.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            S = /^(\S+)\s*(.*)$/,
            x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        u.extend(E.prototype, a, {
            tagName: "div",
            $: function(e) {
                return this.$el.find(e)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function(e, t) {
                return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function(e) {
                if (!e && !(e = u.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var t in e) {
                    var n = e[t];
                    u.isFunction(n) || (n = this[e[t]]);
                    if (!n) continue;
                    var r = t.match(S),
                        i = r[1],
                        s = r[2];
                    n = u.bind(n, this), i += ".delegateEvents" + this.cid, s === "" ? this.$el.on(i, n) : this.$el.on(i, s, n)
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _configure: function(e) {
                this.options && (e = u.extend({}, u.result(this, "options"), e)), u.extend(this, u.pick(e, x)), this.options = e
            },
            _ensureElement: function() {
                if (!this.el) {
                    var e = u.extend({}, u.result(this, "attributes"));
                    this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className"));
                    var t = o.$("<" + u.result(this, "tagName") + ">").attr(e);
                    this.setElement(t, !1)
                } else this.setElement(u.result(this, "el"), !1)
            }
        }), o.sync = function(e, t, n) {
            var r = T[e];
            u.defaults(n || (n = {}), {
                emulateHTTP: o.emulateHTTP,
                emulateJSON: o.emulateJSON
            });
            var i = {
                type: r,
                dataType: "json"
            };
            n.url || (i.url = u.result(t, "url") || B()), n.data == null && t && (e === "create" || e === "update" || e === "patch") && (i.contentType = "application/json", i.data = JSON.stringify(n.attrs || t.toJSON(n))), n.emulateJSON && (i.contentType = "application/x-www-form-urlencoded", i.data = i.data ? {
                model: i.data
            } : {});
            if (n.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) {
                i.type = "POST", n.emulateJSON && (i.data._method = r);
                var s = n.beforeSend;
                n.beforeSend = function(e) {
                    e.setRequestHeader("X-HTTP-Method-Override", r);
                    if (s) return s.apply(this, arguments)
                }
            }
            i.type !== "GET" && !n.emulateJSON && (i.processData = !1), i.type === "PATCH" && window.ActiveXObject && (!window.external || !window.external.msActiveXFilteringEnabled) && (i.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var a = n.xhr = o.ajax(u.extend(i, n));
            return t.trigger("request", t, a, n), a
        };
        var T = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            "delete": "DELETE",
            read: "GET"
        };
        o.ajax = function() {
            return o.$.ajax.apply(o.$, arguments)
        };
        var N = o.Router = function(e) {
                e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            C = /\((.*?)\)/g,
            k = /(\(\?)?:\w+/g,
            L = /\*\w+/g,
            A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        u.extend(N.prototype, a, {
            initialize: function() {},
            route: function(e, t, n) {
                u.isRegExp(e) || (e = this._routeToRegExp(e)), u.isFunction(t) && (n = t, t = ""), n || (n = this[t]);
                var r = this;
                return o.history.route(e, function(i) {
                    var s = r._extractParameters(e, i);
                    n && n.apply(r, s), r.trigger.apply(r, ["route:" + t].concat(s)), r.trigger("route", t, s), o.history.trigger("route", r, t, s)
                }), this
            },
            navigate: function(e, t) {
                return o.history.navigate(e, t), this
            },
            _bindRoutes: function() {
                if (!this.routes) return;
                this.routes = u.result(this, "routes");
                var e, t = u.keys(this.routes);
                while ((e = t.pop()) != null) this.route(e, this.routes[e])
            },
            _routeToRegExp: function(e) {
                return e = e.replace(A, "\\$&").replace(C, "(?:$1)?").replace(k, function(e, t) {
                    return t ? e : "([^/]+)"
                }).replace(L, "(.*?)"), new RegExp("^" + e + "$")
            },
            _extractParameters: function(e, t) {
                var n = e.exec(t).slice(1);
                return u.map(n, function(e) {
                    return e ? decodeURIComponent(e) : null
                })
            }
        });
        var O = o.History = function() {
                this.handlers = [], u.bindAll(this, "checkUrl"), typeof window != "undefined" && (this.location = window.location, this.history = window.history)
            },
            M = /^[#\/]|\s+$/g,
            _ = /^\/+|\/+$/g,
            D = /msie [\w.]+/,
            P = /\/$/;
        O.started = !1, u.extend(O.prototype, a, {
            interval: 50,
            getHash: function(e) {
                var t = (e || this).location.href.match(/#(.*)$/);
                return t ? t[1] : ""
            },
            getFragment: function(e, t) {
                if (e == null)
                    if (this._hasPushState || !this._wantsHashChange || t) {
                        e = this.location.pathname;
                        var n = this.root.replace(P, "");
                        e.indexOf(n) || (e = e.substr(n.length))
                    } else e = this.getHash();
                return e.replace(M, "")
            },
            start: function(e) {
                if (O.started) throw new Error("Backbone.history has already been started");
                O.started = !0, this.options = u.extend({}, {
                    root: "/"
                }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var t = this.getFragment(),
                    n = document.documentMode,
                    r = D.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
                this.root = ("/" + this.root + "/").replace(_, "/"), r && this._wantsHashChange && (this.iframe = o.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? o.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? o.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = t;
                var i = this.location,
                    s = i.pathname.replace(/[^\/]$/, "$&/") === this.root;
                if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !s) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                this._wantsPushState && this._hasPushState && s && i.hash && (this.fragment = this.getHash().replace(M, ""), this.history.replaceState({}, document.title, this.root + this.fragment + i.search));
                if (!this.options.silent) return this.loadUrl()
            },
            stop: function() {
                o.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), O.started = !1
            },
            route: function(e, t) {
                this.handlers.unshift({
                    route: e,
                    callback: t
                })
            },
            checkUrl: function(e) {
                var t = this.getFragment();
                t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe)));
                if (t === this.fragment) return !1;
                this.iframe && this.navigate(t), this.loadUrl() || this.loadUrl(this.getHash())
            },
            loadUrl: function(e) {
                var t = this.fragment = this.getFragment(e),
                    n = u.any(this.handlers, function(e) {
                        if (e.route.test(t)) return e.callback(t), !0
                    });
                return n
            },
            navigate: function(e, t) {
                if (!O.started) return !1;
                if (!t || t === !0) t = {
                    trigger: t
                };
                e = this.getFragment(e || "");
                if (this.fragment === e) return;
                this.fragment = e;
                var n = this.root + e;
                if (this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
                else {
                    if (!this._wantsHashChange) return this.location.assign(n);
                    this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
                }
                t.trigger && this.loadUrl(e)
            },
            _updateHash: function(e, t, n) {
                if (n) {
                    var r = e.href.replace(/(javascript:|#).*$/, "");
                    e.replace(r + "#" + t)
                } else e.hash = "#" + t
            }
        }), o.history = new O;
        var H = function(e, t) {
            var n = this,
                r;
            e && u.has(e, "constructor") ? r = e.constructor : r = function() {
                return n.apply(this, arguments)
            }, u.extend(r, n, t);
            var i = function() {
                this.constructor = r
            };
            return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
        };
        p.extend = m.extend = N.extend = E.extend = O.extend = H;
        var B = function() {
                throw new Error('A "url" property or function must be specified')
            },
            j = function(e, t) {
                var n = t.error;
                t.error = function(r) {
                    n && n(e, r, t), e.trigger("error", e, r, t)
                }
            }
    }.call(this),
        function(e, t) {
            function n(e, n) {
                n = n || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: t
                };
                var r = document.createEvent("CustomEvent");
                return r.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), r
            }
            if (e.CustomEvent) return;
            n.prototype = e.Event.prototype, e.CustomEvent = n
        }(this),
        function(e, t, n) {
            var r = Object.prototype.hasOwnProperty;
            e.utils = e.utils || {}, e.utils.extend = function(e) {
                if (typeof e != "object") return e;
                var t, n;
                for (var i = 1, s = arguments.length; i < s; i++) {
                    t = arguments[i];
                    for (n in t) r.call(t, n) && (e[n] = t[n])
                }
                return e
            }, e.utils.find = function(e, t) {
                var n;
                for (var r = 0; l = e.length, r < l; r++) {
                    var i = e[r];
                    if (t(i, r, e)) {
                        n = i;
                        break
                    }
                }
                return n
            }, e.utils.uuid = function() {
                var e = (new Date).getTime(),
                    t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                        var n = (e + Math.random() * 16) % 16 | 0;
                        return e = Math.floor(e / 16), (t == "x" ? n : n & 3 | 8).toString(16)
                    });
                return t
            }, e.utils.serialize = function(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                return t.join("&")
            }
        }(window.rembeddit = window.rembeddit || {}, this),
        function(e, t, n) {
            function a(e) {
                if (!u.test(e.origin) && e.origin !== "null") return;
                try {
                    var n = JSON.parse(e.data),
                        r = new CustomEvent(n.type, {
                            detail: n.data
                        });
                    r.source = e.source, t.dispatchEvent(r)
                } catch (i) {}
            }

            function f(e) {
                return new RegExp("^http(s)?:\\/\\/" + e.join("|"), "i")
            }

            function l(e) {
                return s.test(e)
            }
            var r = "*",
                i = ".*",
                s = /\*/,
                o = [i],
                u = f(o);
            e.utils.extend(e, {
                postMessage: function(t, n, i, s) {
                    n += ".postMessage";
                    var o = {
                        targetOrigin: r,
                        delay: 100
                    };
                    s = e.utils.extend({}, o, s), t.postMessage(JSON.stringify({
                        type: n,
                        data: i
                    }), s.targetOrigin)
                },
                receiveMessage: function(e, n, r, i) {
                    typeof e == "string" && (i = r, r = n, n = e, e = null), n += ".postMessage", i = i || this;
                    var s = function(t) {
                        if (e && e !== t.source && e.contentWindow !== t.source) return;
                        r.apply(i, arguments)
                    };
                    return t.addEventListener(n, s), {
                        off: function() {
                            t.removeEventListener(n, s)
                        }
                    }
                },
                receiveMessageOnce: function(t, n, r, i) {
                    var s = e.receiveMessage(t, n, function() {
                        r && r.apply(this, arguments), s.off()
                    }, i);
                    return s
                },
                addPostMessageOrigin: function(t) {
                    l(t) ? o = [i] : o.indexOf(t) === -1 && (e.removePostMessageOrigin(i), o.push(t), u = f(o))
                },
                removePostMessageOrigin: function(e) {
                    var t = o.indexOf(e);
                    t !== -1 && (o.splice(t, 1), u = f(o))
                }
            }), t.addEventListener("message", a, !1)
        }(window.rembeddit = window.rembeddit || {}, this), ! function(e, t, n) {
            var r = e.PixelTracker = function(e) {
                this._pixelTrackingUrl = e.url, this._anonymousPixelTrackingUrl = e.anonymousUrl
            };
            r.prototype.send = function(t, n, r) {
                typeof n == "function" && (r = n, n = {}), n = n || {}, r = r || function() {};
                var i = n.anonymous ? this._anonymousPixelTrackingUrl : this._pixelTrackingUrl;
                if (!t || !i) {
                    r();
                    return
                }
                t.uuid = t.uuid || e.utils.uuid();
                var s = new Image,
                    o = Math.round(Math.random() * 2147483647);
                s.onload = r, s.src = i + "?r=" + o + "&data=" + encodeURIComponent(JSON.stringify(t))
            }
        }(window.rembeddit = window.rembeddit || {}, this),
        function(e, t, n) {
            function o(e, t, n) {
                for (var r = 0; r < e.length; r++) t.call(n, r, e[r])
            }

            function u(e) {
                return r.test(e.href) && i.test(e.pathname)
            }

            function a(e) {
                return u(e) && e.pathname.replace(/^\//, "")
            }

            function f(e, t) {
                var n;
                for (var r = 0, i = e.length; r < i; r++)
                    if (n = a(e[r])) break;
                return "//" + t + "/" + n
            }

            function l(e, t) {
                var n = 0,
                    r = t.getAttribute("data-embed-live");
                t.getAttribute("data-embed-parent") === "true" && n++;
                var i = "embed=true&context=" + n + "&depth=" + ++n + "&showedits=" + (r === "true") + "&created=" + t.getAttribute("data-embed-created") + "&showmore=false";
                return s + e.replace(/\/$/, "") + "?" + i
            }
            var r = /^https?:\/\//i,
                i = /\/?r\/[\w_]+\/comments\/(?:[\w_]+\/){2,}[\w_]+\/?/i,
                s = location.protocol === "file:" ? "https:" : "";
            e.init = function(t, n) {
                t = t || {}, n = n || function() {};
                var r = document.querySelectorAll(".reddit-embed");
                o(r, function(r, i) {
                    if (i.getAttribute("data-initialized")) return;
                    i.setAttribute("data-initialized", !0);
                    var s = document.createElement("iframe"),
                        o = i.getElementsByTagName("a"),
                        u = f(o, i.getAttribute("data-embed-media"));
                    if (!u) return;
                    e.addPostMessageOrigin(i.getAttribute("data-embed-media")), s.height = s.style.height = 0, s.width = s.style.width = "100%", s.scrolling = "no", s.frameBorder = 0, s.allowTransparency = !0, s.style.display = "none", s.style.maxWidth = "800px", s.style.minWidth = "220px", s.style.margin = "10px 0", s.style.borderRadius = "5px", s.style.boxShadow = "0 0 5px 0.5px rgba(0, 0, 0, 0.05)", s.style.borderColor = "rgba(199,199,199, 0.55)", s.style.borderWidth = "1px", s.style.borderStyle = "solid", s.style.boxSizing = "border-box", s.src = l(u, i), e.receiveMessageOnce(s, "ping", function(r) {
                        i.parentNode.removeChild(i), s.style.display = "block", n(r), e.postMessage(s.contentWindow, "pong", {
                            type: i.getAttribute("data-embed-parent") === "true" ? "comment_and_parent" : "comment",
                            location: location,
                            options: t
                        })
                    });
                    var a = e.receiveMessage(s, "resize", function(e) {
                        if (!s.parentNode) {
                            a.off();
                            return
                        }
                        s.height = s.style.height = e.detail + "px"
                    });
                    i.parentNode.insertBefore(s, i)
                })
            }, e.init()
        }(window.rembeddit = window.rembeddit || {}, this), ! function(e, t, n) {
            "use strict";
            var r = t.Model.extend({
                    duration: function() {
                        return this.get("end") - this.get("start")
                    },
                    isValid: function() {
                        return this.get("end") !== 0
                    }
                }),
                i = t.Collection.extend({
                    model: r,
                    comparator: "start",
                    initialize: function() {
                        this.on("reset", this.calculate, this)
                    },
                    calculate: function() {
                        this.startTime = this.min(function(e) {
                            return e.get("start")
                        }).get("start"), this.endTime = this.max(function(e) {
                            return e.get("end")
                        }).get("end"), this.duration = this.endTime - this.startTime
                    }
                }),
                s = i.extend({
                    fetch: function() {
                        function r(n, r, i) {
                            if (!e[r] || !e[i]) return;
                            t.push({
                                key: n,
                                start: e[r] / 1e3,
                                end: e[i] / 1e3
                            })
                        }
                        if (!window.performance || !window.performance.timing) return;
                        var e = window.performance.timing,
                            t = [];
                        r("redirect", "redirectStart", "redirectEnd"), r("start", "fetchStart", "domainLookupStart"), r("dns", "domainLookupStart", "domainLookupEnd"), r("tcp", "connectStart", "connectEnd"), r("https", "secureConnectionStart", "connectEnd"), r("request", "requestStart", "responseStart"), r("response", "responseStart", "responseEnd"), r("domLoading", "domLoading", "domInteractive"), r("domInteractive", "domInteractive", "domContentLoadedEventStart"), r("domContentLoaded", "domContentLoadedEventStart", "domContentLoadedEventEnd"), this.reset(n.values(t))
                    }
                });
            e.NavigationTimings = s, e.Timing = r, e.Timings = i
        }(r, Backbone, _), r.templating = {}, r.templating.TemplateSet = function() {
            this.index = {}
        }, r.templating.TemplateSet.prototype = {
            _templateSettings: {
                variable: "thing"
            },
            _key: function(e, t) {
                return e + "." + t
            },
            _create: function(e) {
                return _.template(e, null, this._templateSettings)
            },
            set: function(e) {
                _.each(e, function(e) {
                    r.config.uncompressedJS && (e = r.utils.unescapeJson(e));
                    var t = this._key(e.name, e.style);
                    this.index[t] = e.template
                }, this)
            },
            _defaultStyle: function(e) {
                return _.isArray(e) || (e = [e, r.config.renderstyle]), e
            },
            get: function(e) {
                e = this._defaultStyle(e);
                var t = this._key(e[0], e[1]);
                if (!this.index[t]) throw '"' + e[0] + "." + e[1] + '"' + " template not found.";
                return template = this.index[t], _.isFunction(template) || (template = this.index[t] = this._create(template)), template
            },
            make: function(e, t, n) {
                return html = this.get(e)(t), n && $(n).append(html), html
            }
        }, r.templates = new r.templating.TemplateSet, ! function(e, t) {
            e.ScrollUpdater = Backbone.View.extend({
                selector: null,
                startUpdate: function() {},
                update: function(e) {},
                endUpdate: function(e) {},
                start: function() {
                    return this._resetScrollState(), this._listen(), this
                },
                restart: function() {
                    return this._resetScrollState(), this
                },
                _resetScrollState: function() {
                    this._elements = this.$el.find(this.selector), _.sortBy(this._elements, function(e) {
                        return t(e).offset().top
                    }), this._curIndex = 0, this._lastScroll = null, this._toUpdate = [], this._totalTime = 0, _.defer(t.proxy(this, "_updateThings"))
                },
                _listen: function() {
                    var e = _.throttle(t.proxy(this, "_updateThings"), 20);
                    t(window).on("scroll", e)
                },
                _updateThings: function(e) {
                    if (!this._elements.length) return;
                    var n = new Date,
                        r = t(window),
                        i = r.height(),
                        s = r.scrollTop(),
                        o = s,
                        u = s + i;
                    s < this._lastScroll ? o = Math.max(o - Math.floor(i / 2), 0) : u += Math.ceil(i / 2);
                    var a = this._curIndex,
                        f = t(this._elements[a]);
                    if (f.offset().top < o)
                        while (a < this._elements.length - 1 && f.offset().top < o) f = t(this._elements[a]), a++;
                    else
                        while (a > 0 && f.offset().top > o) f = t(this._elements[a]), a--;
                    var l = 0;
                    do f = t(this._elements[a]), this._toUpdate.push(f), a++, l++; while (a <= this._elements.length - 1 && f.offset().top <= u);
                    this._curIndex = a - 1, this._lastScroll = s;
                    var c = new Date;
                    this._totalTime += c - n, this._doUpdates()
                },
                cutoff: 1e3 / 60,
                _doUpdates: function() {
                    this.startUpdate();
                    var e = new Date,
                        n = e,
                        r = 0,
                        i = [];
                    while (n - e < this.cutoff) {
                        if (!this._toUpdate.length) break;
                        var s = this._toUpdate.shift();
                        i.push(s), this.update(s), r++, n = new Date
                    }
                    this._totalTime += n - e, this._toUpdate.length && _.defer(t.proxy(this, "_doUpdates")), this.endUpdate(t(i))
                }
            })
        }(r, jQuery), ! function(e, t) {
            function i(e) {
                this.opts = _.defaults(e || {}, r), this.elCache = t([]), this.refresh = _.throttle(this._refresh, 1e3), setInterval(t.proxy(this.refresh, this), 2e4), this.refresh()
            }
            Date.now || (Date.now = function() {
                return (new Date).getTime()
            });
            var n = [
                    [31536e3, e.NP_("a year ago", "%(num)s years ago")],
                    [2592e3, e.NP_("a month ago", "%(num)s months ago")],
                    [86400, e.NP_("a day ago", "%(num)s days ago")],
                    [3600, e.NP_("an hour ago", "%(num)s hours ago")],
                    [60, e.NP_("a minute ago", "%(num)s minutes ago")]
                ],
                r = {
                    maxage: 86400
                };
            i.prototype._refresh = function() {
                var e = Date.now();
                this.elCache.each(t.proxy(function(t, n) {
                    this.refreshOne(n, e)
                }, this))
            }, i.prototype.updateCache = function(e) {
                this.elCache = e, this.refresh()
            }, i.prototype.refreshOne = function(n, r) {
                r || (r = Date.now());
                var i = t(n),
                    s = e.utils.parseTimestamp(i),
                    o, u;
                u = (r - s) / 1e3;
                if (this.opts.maxage !== !1 && u > this.opts.maxage) {
                    i.removeClass("live-timestamp");
                    return
                }
                o = this.formatTime(i, u, s, r), i.text(o)
            }, i.prototype.formatTime = function(r, i, s, o) {
                var u = e._("just now");
                return t.each(n, function(t, n) {
                    var r = Math.floor(i / n[0]),
                        s;
                    if (r > 0) return s = n[1], u = e.P_(s[0], s[1], r).format({
                        num: r
                    }), !1
                }), u
            }, e.TimeText = i
        }(r, jQuery), r.ui.init = function() {
            $.cookie("reddit_first") ? ($.cookie("reddit_first", null, {
                domain: r.config.cur_domain
            }), store.safeSet("ui.shown.welcome", !0)) : store.safeGet("ui.shown.welcome") != 1 && ($(".infobar.welcome").show(), store.safeSet("ui.shown.welcome", !0)), r.ui.initMWebBanner(), $(".help-bubble").each(function(e, t) {
                $(t).data("HelpBubble", new r.ui.Bubble({
                    el: t
                }))
            }), $(".submit_text").each(function(e, t) {
                $(t).data("SubredditSubmitText", new r.ui.SubredditSubmitText({
                    el: t
                }))
            }), r.config.new_window && (r.config.logged || !r.ui.isSmallScreen()) && $(document.body).on("click", "a.may-blank, .may-blank-within a", function(e) {
                if (!this.target) {
                    var t = _.contains(["http:", "https:"], this.protocol);
                    if (this.href && t && r.utils.onTrident()) {
                        var n = window.open(this.href, "_blank");
                        if (n !== null) return n.opener = null, e.preventDefault(), !1
                    }
                    this.target = "_blank", this.rel = "noreferrer"
                }
                return !0
            }), r.ui.PermissionEditor.init(), r.ui.initLiveTimestamps(), r.ui.initNewCommentHighlighting(), r.ui.initReadNext(), r.ui.initTimings(), r.ui.firePageTrackingPixel()
        }, r.ui.firePageTrackingPixel = function() {
            var e = r.config.tracker_url,
                t = {};
            if (!r.config.user_id) {
                var n = new redditlib.Tracker,
                    i = n.getTrackingData();
                i && i.loid && (t = {
                    loid: i.loid
                }, i.loidcreated && (t.loidcreated = i.loidcreated))
            }
            r.analytics.firePageTrackingPixel(e, t)
        }, r.ui.inMobileWebBlacklist = function() {
            return _.any(r.config.mweb_blacklist_expressions, function(e) {
                return (new RegExp(e)).test(window.location.pathname)
            })
        }, r.ui.isSmallScreen = function() {
            return window.matchMedia ? matchMedia("(max-device-width: 736px)").matches : $(window).width() < 736
        }, r.ui.TimeTextScrollListener = r.ScrollUpdater.extend({
            initialize: function(e) {
                this.timeText = e.timeText, this.timeText.updateCache($(this.selector))
            },
            selector: ".live-timestamp:visible",
            endUpdate: function(e) {
                this.timeText.updateCache(e)
            }
        }), r.ui.initMWebBanner = function() {
            if (!r.ui.isSmallScreen() || r.config.renderstyle == "compact") return;
            if ($.url().attr("path") != "/") return;
            if (r.ui.inMobileWebBlacklist()) return;
            var e = new Date(store.get("mweb-beta-banner.closed") || 0),
                t = (new Date).getTime();
            if (t < e) return;
            var n = "__cf_mob_redir",
                i = document.createElement("a");
            i.href = window.location, i.host = "m." + r.config.cur_domain, i.search += (i.search ? "&" : "?") + "ref=mobile_beta_banner&ref_source=desktop";
            var s = i.href,
                o = $(_.template('<div class="mobile-web-redirect-bar"><a href="<%- url %>" class="mobile-web-redirect"><%- callout %></a><a href="#" class="mobile-web-redirect-optout">&times;</a></div>', {
                    callout: r._("switch to mobile version"),
                    url: s,
                    close: r._("no thanks")
                }));
            o.find(".mobile-web-redirect-optout").on("click", function(e) {
                e.preventDefault();
                var t = (new Date).getTime() + 12096e5;
                store.set("mweb-beta-banner.closed", t), o.fadeOut()
            }), o.find(".mobile-web-redirect").on("click", function() {
                return $.cookie(n, "1", {
                    domain: r.config.cur_domain,
                    path: "/",
                    expires: 90
                }), !0
            }), $("#header").before(o)
        }, r.ui.initLiveTimestamps = function() {
            if ($(".sitetable").length) {
                var e = new r.ui.TimeTextScrollListener({
                    el: ".sitetable",
                    timeText: new r.TimeText
                });
                e.start(), $(document).on("new_things_inserted", function() {
                    e.restart()
                })
            }
        }, r.ui.initNewCommentHighlighting = function() {
            if (!$("body").hasClass("comments-page")) return;
            $visitSelector = $("#comment-visits");
            if ($visitSelector.length === 0) return;
            $(document).on("new_things_inserted", r.ui.highlightNewComments), $visitSelector.on("change", r.ui.highlightNewComments), r.ui.highlightNewComments()
        }, r.ui.highlightNewComments = function() {
            var e = $(".comment"),
                t = $("#comment-visits").val(),
                n;
            t && (n = Date.parse(t)), e.each(function() {
                var e = $(this),
                    t = e.find("> .entry .tagline time:first-of-type"),
                    i = r.utils.parseTimestamp(t),
                    s = !!n && i > n;
                e.toggleClass("new-comment", s)
            })
        }, r.ui.initReadNext = function() {
            var e = 12096e5,
                t = $(".read-next-container"),
                n = !!store.get("readnext.dismissed"),
                i = parseInt(store.get("readnext.expiration"), 10),
                s = Date.now();
            n && (i ? i < s && (store.set("readnext.dismissed", !1), n = !1) : (i = s + e, store.set("readnext.expiration", i)));
            var o = r.config.cur_link;
            if (n || !t.length) return;
            this.readNext = new r.ui.ReadNext({
                el: t,
                fixToBottom: !r.ui.isSmallScreen(),
                currentLinkFullname: o,
                ttl: e
            })
        }, r.ui.ReadNext = Backbone.View.extend({
            events: {
                "click .read-next-button.next": "next",
                "click .read-next-button.prev": "prev",
                "click .read-next-dismiss": "dismiss"
            },
            initialize: function() {
                this.$readNext = this.$el.find(".read-next"), this.$links = this.$readNext.find(".read-next-link"), this.numLinks = this.$links.length, this.state = new Backbone.Model({
                    fixed: !1,
                    index: -1
                }), this.state.on("change", this.render.bind(this)), this.options.fixToBottom && (this.updateScroll = this.updateScroll.bind(this), window.addEventListener("scroll", this.updateScroll), this.updateScroll());
                var e = "#read-next-link-" + this.options.currentLinkFullname,
                    t = this.$links.index($(e)) + 1;
                this.state.set({
                    index: t
                }), this.resetRefIndicies(t), this.$readNext.addClass("active")
            },
            resetRefIndicies: function(e) {
                var t = document.createElement("a");
                this.$links.toArray().forEach(function(n, r) {
                    var i = $.url(n.href),
                        s = i.param();
                    if (!s.ref) return;
                    var o = this.moduloIndex(r - e);
                    s.ref = s.ref.split("_")[0] + "_" + o, t.href = n.href, t.search = $.param(s), n.href = t.href
                }, this)
            },
            moduloIndex: function(e) {
                var t = this.numLinks;
                return (e + t) % t
            },
            next: function() {
                var e = this.state.get("index");
                this.state.set({
                    index: this.moduloIndex(e + 1)
                }), r.analytics.fireGAEvent("readnext", "nav-next")
            },
            prev: function() {
                var e = this.state.get("index"),
                    t = this.numLinks;
                this.state.set({
                    index: this.moduloIndex(e - 1)
                }), r.analytics.fireGAEvent("readnext", "nav-prev")
            },
            dismiss: function() {
                this.$el.fadeOut(), window.removeEventListener("scroll", this.updateScroll), r.analytics.fireGAEvent("readnext", "dismiss"), store.set("readnext.dismissed", !0);
                var e = Date.now() + this.options.ttl;
                store.set("readnext.expiration", e)
            },
            updateScroll: function() {
                var e = window.scrollY,
                    t = this.$el.position().top,
                    n = window.innerHeight,
                    r = this.$readNext.height();
                e += n, t += r, this.state.set({
                    fixed: e >= t
                })
            },
            render: function() {
                var e = this.state.get("index"),
                    t = this.state.get("fixed");
                this.$links.removeClass("active"), this.$links.eq(e).addClass("active"), t ? this.$readNext.addClass("fixed") : this.$readNext.removeClass("fixed")
            }
        }), r.ui.initTimings = function() {
            if (!r.config.pageInfo.actionName || !r.config.stats_domain) return;
            if (Math.random() > r.config.stats_sample_rate / 100) return;
            var e = new r.NavigationTimings;
            $(function() {
                _.defer(function() {
                    e.fetch();
                    var t = e.filter(function(e) {
                        return e.get("key") !== "start"
                    }).reduce(function(e, t) {
                        if (!t.isValid()) return e;
                        var n = t.duration();
                        if (n > 0) {
                            var r = t.get("key") + "Timing";
                            e[r] = n
                        }
                        return e
                    }, {});
                    t.actionName = r.config.pageInfo.actionName, t.verification = r.config.pageInfo.verification, $.ajax({
                        type: "POST",
                        url: r.config.stats_domain,
                        data: JSON.stringify({
                            rum: t
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    })
                })
            })
        }, r.ui.showWorkingDeferred = function(e, t) {
            if (!t) return;
            var n = 200,
                r = "_workingCount",
                i = $(e);
            i.data(r, (i.data(r) || 0) + 1);
            var s = setTimeout(function() {
                i.addClass("working")
            }, n);
            return t.always(function() {
                clearTimeout(s);
                var e = Math.max(0, i.data(r) - 1);
                i.data(r, e), e == 0 && i.removeClass("working")
            }), t
        }, r.ui.refreshListing = function() {
            var e = $.url(),
                t = e.param();
            return t.bare = "y", $.ajax({
                type: "GET",
                url: e.attr("base") + e.attr("path"),
                data: t
            }).done(function(e) {
                $("body > .content").html(e).find(".promotedlink.promoted:visible").trigger("onshow")
            })
        }, r.ui.Form = function(e) {
            r.ui.Base.call(this, e), this.$el.submit($.proxy(function(e) {
                e.preventDefault(), this.submit(e)
            }, this)), this.$el.find("[data-validate-url]").validator({
                https: !!r.config.https_endpoint
            }).on("initialize.validator", function(e) {
                var t = $(this);
                t.hasClass("c-has-error") && t.stateify("showError")
            }).on("valid.validator", function(e) {
                $(this).stateify("set", "success")
            }).on("invalid.validator", function(e, t) {
                if (t) {
                    var n = r.utils.parseError(t.errors[0]);
                    $(this).stateify("set", "error", n.message)
                }
            }).on("loading.validator", function(e) {
                $(this).stateify("set", "loading")
            }).on("cleared.validator", function(e) {
                $(this).stateify("clear")
            })
        }, r.ui.Form.prototype = $.extend(new r.ui.Base, {
            showStatus: function(e, t) {
                this.$el.find(".status, .c-alert").show().toggleClass("error", !!t).text(e)
            },
            showErrors: function(e) {
                var t = [];
                $.each(e, $.proxy(function(e, n) {
                    var i = r.utils.parseError(n),
                        s = this.$el.find(".error." + i.name + (i.field ? ".field-" + i.field : "")),
                        o = this.$el.filter(".form-v2").find('[name="' + i.field + '"]');
                    s.length ? s.show().text(i.message) : o.length ? o.stateify("set", "error", i.message) : t.push(i.message)
                }, this)), t.length && this.showStatus(t.join(", "), !0)
            },
            resetErrors: function() {
                this.$el.find(".error").hide()
            },
            checkCaptcha: function(e) {
                if (this.$el.has('input[name="captcha"]').length) {
                    var t = $.grep(e, function(e) {
                        return e[0] == "badCaptcha"
                    });
                    t && $.request("new_captcha", {
                        id: this.$el.attr("id")
                    })
                }
            },
            serialize: function() {
                return this.$el.serializeArray()
            },
            submit: function() {
                this.resetErrors(), r.ui.showWorkingDeferred(this.$el, this._submit()).done($.proxy(this, "handleResult")).fail($.proxy(this, "_handleNetError"))
            },
            _submit: function() {},
            handleResult: function(e) {
                this.checkCaptcha(e.json.errors), this._handleResult(e)
            },
            _handleResult: function(e) {
                this.showErrors(e.json.errors)
            },
            _handleNetError: function(e) {
                var t = r._("an error occurred (status: %(status)s)").format({
                    status: e.status
                });
                this.showStatus(t, !0)
            }
        }), r.ui.Bubble = Backbone.View.extend({
            showDelay: 150,
            hideDelay: 750,
            animateDuration: 150,
            initialize: function() {
                this.$parent = this.options.parent || this.$el.parent(), this.options.trackHover != 0 && (this.$el.hover($.proxy(this, "queueShow"), $.proxy(this, "queueHide")), this.$parent.hover($.proxy(this, "queueShow"), $.proxy(this, "queueHide")), this.$parent.click($.proxy(this, "queueShow")))
            },
            position: function() {
                var e = this.$parent.offset(),
                    t = $("body").offset(),
                    n, i;
                this.$el.is(".anchor-top") || this.$el.is(".anchor-top-centered") ? (n = this.$parent.outerWidth(!0) - this.$el.outerWidth(!0), i = this.$parent.outerHeight(!0) + 5, this.$el.css({
                    left: Math.max(e.left + n, 0),
                    top: e.top + i - t.top
                })) : this.$el.is(".anchor-top-left") ? (i = this.$parent.outerHeight(!0) + 5, this.$el.css({
                    left: e.left,
                    top: e.top + i - t.top
                })) : this.$el.is(".anchor-right-fixed") ? (n = 32, i = 0, e.top -= $(document).scrollTop(), e.left -= $(document).scrollLeft(), this.$el.css({
                    top: r.utils.clamp(e.top - i, 0, $(window).height() - this.$el.outerHeight()),
                    left: r.utils.clamp(e.left - n - this.$el.width(), 0, $(window).width())
                })) : this.$el.is(".anchor-left") ? (n = this.$parent.outerWidth(!0) + 16, i = 0, this.$el.css({
                    left: e.left + n,
                    top: e.top + i - t.top
                })) : (n = 16, i = 0, e.right = $(window).width() - e.left, this.$el.css({
                    right: e.right + n,
                    top: e.top + i - t.top
                }))
            },
            show: function() {
                this.cancelTimeout();
                if (this.$el.is(":visible")) return;
                this.trigger("show"), $("body").append(this.$el), this.$el.css("visibility", "hidden").show(), this.render(), this.position(), this.$el.css({
                    opacity: 1,
                    visibility: "visible"
                });
                var e = this.options.group && this.options.group.current && this.options.group.current != this;
                e ? this.options.group.current.hideNow() : this._animate("show"), this.options.group && (this.options.group.current = this)
            },
            hideNow: function() {
                this.cancelTimeout(), this.options.group && this.options.group.current == this && (this.options.group.current = null), this.$el.hide()
            },
            hide: function(e) {
                if (!this.$el.is(":visible")) {
                    e && e();
                    return
                }
                this._animate("hide", $.proxy(function() {
                    this.hideNow(), e && e()
                }, this))
            },
            _animate: function(e, t) {
                if (!this.animateDuration) {
                    t && t();
                    return
                }
                var n, r;
                this.$el.is(".anchor-top") || this.$el.is(".anchor-top-centered") || this.$el.is(".anchor-top-left") ? (n = "top", r = "-=5") : this.$el.is(".anchor-right-fixed") ? (n = "right", r = "-=5") : this.$el.is(".anchor-left") ? (n = "left", r = "+=5") : (n = "right", r = "-=5");
                var i = this.$el.css(n);
                hideProps = {
                    opacity: 0
                }, hideProps[n] = r, showProps = {
                    opacity: 1
                }, showProps[n] = i;
                var s, o;
                e == "show" ? (s = hideProps, o = showProps) : e == "hide" && (s = showProps, o = hideProps), this.$el.css(s).animate(o, this.animateDuration, t)
            },
            cancelTimeout: function() {
                this.timeout && (clearTimeout(this.timeout), this.timeout = null)
            },
            queueShow: function() {
                this.cancelTimeout(), this.timeout = setTimeout($.proxy(this, "show"), this.showDelay)
            },
            queueHide: function() {
                this.cancelTimeout(), this.timeout = setTimeout($.proxy(this, "hide"), this.hideDelay)
            }
        }), r.ui.PermissionEditor = function(e) {
            r.ui.Base.call(this, e);
            var t = {};
            this.$el.find('input[type="hidden"]').each(function(e, n) {
                t[n.name] = n.value
            });
            var n = t.type,
                i = t.name;
            this.form_id = n + "-permissions-" + i, this.permission_info = r.permissions[n], this.sorted_perm_keys = $.map(this.permission_info, function(e, t) {
                return t
            }), this.sorted_perm_keys.sort(), this.original_perms = this._parsePerms(t.permissions), this.embedded = this.$el.find("form").length == 0, this.$menu = null, this.embedded ? (this.$permissions_field = this.$el.find('input[name="permissions"]'), this.$menu_controller = this.$el.siblings(".permissions-edit")) : this.$menu_controller = this.$el.closest("tr").find(".permissions-edit"), this.$menu_controller.find("a").click($.proxy(this, "show")), this.updateSummary()
        }, r.ui.PermissionEditor.init = function() {
            function e(e) {
                $(e).find(".permissions").each(function(e, t) {
                    $(t).data("PermissionEditor", new r.ui.PermissionEditor(t))
                })
            }
            e("body");
            for (var t in r.permissions) $("." + t + "-table").on("insert-row", "tr", function(t) {
                e(this)
            })
        }, r.ui.PermissionEditor.prototype = $.extend(new r.ui.Base, {
            _parsePerms: function(e) {
                var t = {};
                return e.split(",").forEach(function(e) {
                    t[e.substring(1)] = e[0] == "+"
                }), t.all ? {
                    all: !0
                } : t
            },
            _serializePerms: function(e) {
                if (e.all) return "+all";
                var t = [];
                for (var n in e) t.push((e[n] ? "+" : "-") + n);
                return t.join(",")
            },
            _getNewPerms: function() {
                if (!this.$menu) return null;
                var e = {};
                return this.$menu.find('input[type="checkbox"]').each(function(t, n) {
                    e[$(n).attr("name")] = $(n).prop("checked")
                }), e
            },
            _makeMenuLabel: function(e) {
                var t = $.proxy(this, "updateSummary"),
                    n = this.permission_info[e],
                    i = $('<input type="checkbox">').attr("name", e).prop("checked", this.original_perms[e]),
                    s = $("<label>").append(i).click(function(e) {
                        e.stopPropagation()
                    });
                return e == "all" ? (i.change(function() {
                    var e = i.is(":checked");
                    s.siblings().toggleClass("disabled", e).find('input[type="checkbox"]').prop("disabled", e), t()
                }), s.append(document.createTextNode(r._("full permissions")))) : n && (i.change(t), s.append(document.createTextNode(r._(n.title))), s.attr("title", r._(n.description))), s
            },
            show: function(e) {
                close_menus(e), this.$menu = $('<div class="permission-selector drop-choices">'), this.$menu.append(this._makeMenuLabel("all"));
                for (var t in this.sorted_perm_keys) this.$menu.append(this._makeMenuLabel(this.sorted_perm_keys[t]));
                this.$menu.on("close_menu", $.proxy(this, "hide")).find("input").first().change().end();
                if (!this.embedded) {
                    var n = this.$el.find("form").clone();
                    n.attr("id", this.form_id), n.click(function(e) {
                        e.stopPropagation()
                    }), this.$menu.append("<hr>", n), this.$permissions_field = this.$menu.find('input[name="permissions"]')
                }
                return this.$menu_controller.parent().append(this.$menu), open_menu(this.$menu_controller[0]), !1
            },
            hide: function() {
                this.$menu && (this.embedded && (this.original_perms = this._getNewPerms(), this.$permissions_field.val(this._serializePerms(this.original_perms))), this.$menu.remove(), this.$menu = null, this.updateSummary())
            },
            _renderBit: function(e) {
                var t = this.permission_info[e],
                    n;
                e == "all" ? n = r._("full permissions") : t ? n = r._(t.title) : n = e;
                var i = $('<span class="permission-bit"/>').text(n);
                return t && i.attr("title", r._(t.description)), i
            },
            updateSummary: function() {
                var e = this._getNewPerms(),
                    t = [];
                if (e && e.all) t.push(this._renderBit("all").toggleClass("added", this.original_perms.all != 1));
                else {
                    if (this.original_perms.all && !e) t.push(this._renderBit("all"));
                    else if (!this.original_perms.all)
                        for (var n in this.original_perms) this.original_perms[n] && (this.embedded && (!e || !!e[n]) && t.push(this._renderBit(n)), this.embedded || t.push(this._renderBit(n).toggleClass("removed", e != null && !e[n])));
                    if (e)
                        for (var n in e) this.permission_info[n] && e[n] && !this.original_perms[n] && t.push(this._renderBit(n).toggleClass("added", !this.embedded))
                }
                t.length || t.push($('<span class="permission-bit">').text(r._("no permissions")).addClass("none"));
                var i = $('<div class="permission-summary">');
                for (var s = 0; s < t.length; s++) s > 0 && i.append(", "), i.append(t[s]);
                i.toggleClass("edited", this.$menu != null), this.$el.find(".permission-summary").replaceWith(i), e && this.$permissions_field && this.$permissions_field.val(this._serializePerms(e))
            },
            onCommit: function(e) {
                this.$el.find('input[name="permissions"]').val(e), this.original_perms = this._parsePerms(e), this.hide()
            }
        }), r.ui.scrollFixed = function(e) {
            this.$el = $(e), this.$standin = null, this.onScroll(), $(window).bind("scroll resize", _.bind(_.throttle(this.onScroll, 20), this))
        }, r.ui.scrollFixed.prototype = {
            onScroll: function() {
                if (!this.$el.is(".scroll-fixed")) {
                    var e = this.$el.outerHeight(!0) - this.$el.outerHeight(!1);
                    this.origTop = this.$el.offset().top - e
                }
                var t = this.$el.height() < $(window).height();
                t && $(window).scrollTop() > this.origTop ? this.$standin || (this.$standin = $("<" + this.$el.prop("nodeName") + ">").css({
                    width: this.$el.width(),
                    height: this.$el.height()
                }).attr("class", this.$el.attr("class")).addClass("scroll-fixed-standin"), this.$el.addClass("scroll-fixed").css({
                    position: "fixed",
                    top: 0
                }), this.$el.before(this.$standin)) : this.$standin && (this.$el.removeClass("scroll-fixed").css({
                    position: "",
                    top: ""
                }), this.$standin.remove(), this.$standin = null)
            }
        }, r.ui.ConfirmButton = Backbone.View.extend({
            confirmTemplate: _.template('<span class="confirmation"><span class="prompt"><%- are_you_sure %></span><button class="yes"><%- yes %></button> / <button class="no"><%- no %></button></div>'),
            events: {
                click: "click"
            },
            initialize: function() {
                this.$target = this.$el, this.$target.wrap("<span>"), this.setElement(this.$target.parent()), this.$el.attr("class", this.$target.attr("class")).addClass("confirm-button"), this.$target.attr("class", null)
            },
            click: function(e) {
                var t = $(e.target);
                this.$target.is(t) ? (this.$target.hide(), this.$el.append(this.confirmTemplate({
                    are_you_sure: r._("are you sure?"),
                    yes: r._("yes"),
                    no: r._("no")
                }))) : t.is(".no") ? (this.$(".confirmation").remove(), this.$target.show()) : t.is(".yes") && this.$target.trigger("confirm")
            }
        }), r.ui.SubredditSubmitText = Backbone.View.extend({
            initialize: function() {
                this.lookup = _.throttle(this._lookup, 500), this.cache = new r.utils.LRUCache, this.$input = $("#sr-autocomplete"), this.$input.on("sr-changed change input", _.bind(this.lookup, this)), this.$sr = this.$el.find(".sr").first(), this.$content = this.$el.find(".content").first(), this.$content.text().trim() && (this.$sr.text(r.config.post_site), this.show())
            },
            _lookup: function() {
                this.$content.empty();
                var e = this.$input.val();
                this.$sr.text(e), this.$el.addClass("working"), this.req && this.req.abort && this.req.abort(), this.req = this.cache.ajax(e, {
                    url: "/r/" + e + "/api/submit_text/.json",
                    dataType: "json"
                }).done(_.bind(this.settext, this, e)).fail(_.bind(this.error, this))
            },
            show: function() {
                this.$el.addClass("enabled")
            },
            hide: function() {
                this.$el.removeClass("enabled")
            },
            error: function() {
                delete this.req, this.hide()
            },
            settext: function(e, t) {
                delete this.req, !t.submit_text || !t.submit_text.trim() ? this.hide() : (this.$sr.text(e), this.$content.html($.unsafe(t.submit_text_html)), this.$el.removeClass("working"), this.show())
            }
        }),
        function(e, t, n, i, s) {
            var o = {
                    large: "modal-dialog-lg",
                    medium: "",
                    small: "modal-dialog-sm"
                },
                u = {
                    template: a,
                    animate: !0,
                    close: !0,
                    modal: !0,
                    shortcuts: !0,
                    footer: !1,
                    content: "",
                    className: "",
                    title: !1,
                    size: "medium"
                },
                a = n.template('<div class="modal <% if (animate) { %> fade <% } %> <%- className %>"><div class="modal-dialog <% if (size) { %><%- SIZE_CLASS_LOOKUP[size] %><% } %>"><div class="modal-content"><% if (title || close) { %><div class="modal-header"><% if (close) { %><a href="javascript: void 0;" class="c-close c-hide-text" data-dismiss="modal">' + n.escape(r._("close this window")) + "</a>" + "<% } %>" + "<% if (title) { %>" + "<%= title %>" + "<% } %>" + "</div>" + "<% } %>" + '<div class="modal-body">' + "<%= content %>" + "</div>" + "<% if (footer) { %>" + '<div class="modal-footer">' + "<%= footer %>" + "</div>" + "<% } %>" + "</div>" + "</div>" + "</div>"),
                f = e.Popup = function(e) {
                    e = n.extend({}, u, e, {
                        SIZE_CLASS_LOOKUP: o
                    });
                    var r = a(e),
                        i = this.listener = t({}),
                        s = this.$ = t(r);
                    s.modal({
                        show: !1,
                        backdrop: !!e.modal,
                        keyboard: e.shortcuts
                    }), [
                        ["show.bs.modal", "show.r.popup"],
                        ["shown.bs.modal", "opened.r.popup"],
                        ["hide.bs.modal", "hide.r.popup"],
                        ["hidden.bs.modal", "closed.r.popup"]
                    ].forEach(function(e) {
                        s.on(e[0], function() {
                            i.trigger(e[1])
                        })
                    })
                };
            ["show", "hide", "toggle"].forEach(function(e) {
                f.prototype[e] = function() {
                    this.$.modal(e)
                }
            }), [
                ["on", "on"],
                ["once", "one"],
                ["off", "off"]
            ].forEach(function(e) {
                f.prototype[e[0]] = function() {
                    this.listener[e[1]].apply(this.listener, arguments)
                }
            })
        }((this.r = this.r || {}) && (r.ui = r.ui || {}), this.jQuery, this._, this), r.login = {
            post: function(e, t) {
                var n = $('input[name="user"]', e.$el).val(),
                    i = r.config.https_endpoint || "http://" + r.config.ajax_domain,
                    s = i + "/api/" + t + "/" + n;
                if (r.config.currentOrigin == i || $.support.cors) {
                    var o = e.serialize();
                    return o.push({
                        name: "api_type",
                        value: "json"
                    }), $.ajax({
                        url: s,
                        type: "POST",
                        dataType: "json",
                        data: o,
                        xhrFields: {
                            withCredentials: !0
                        }
                    })
                }
                var u = $("<iframe>"),
                    a = e.$el.clone(!0),
                    f = ("resp" + Math.random()).replace(".", "");
                u.css("display", "none").attr("name", f).appendTo("body"), u[0].contentWindow.name = f, a.unbind().css("display", "none").attr("action", s).attr("target", f).appendTo("body"), $("<input>").attr({
                    type: "hidden",
                    name: "api_type",
                    value: "json"
                }).appendTo(a), $("<input>").attr({
                    type: "hidden",
                    name: "hoist",
                    value: r.login.hoist.type
                }).appendTo(a);
                var l = r.login.hoist.watch(t);
                return r.config.debug || l.done(function() {
                    u.remove(), a.remove()
                }), a.submit(), l
            }
        }, r.login.hoist = {
            type: "cookie",
            watch: function(e) {
                var t = "hoist_" + e,
                    n = new $.Deferred,
                    i = setInterval(function() {
                        data = $.cookie(t);
                        if (data) {
                            try {
                                data = JSON.parse(data)
                            } catch (e) {
                                data = null
                            }
                            $.cookie(t, null, {
                                domain: r.config.cur_domain,
                                path: "/"
                            }), clearInterval(i), n.resolve(data)
                        }
                    }, 100);
                return n
            }
        }, r.login.ui = {
            init: function() {
                r.config.logged || ($(".content .login-form, .content #login-form, .side .login-form").each(function(e, t) {
                    new r.ui.LoginForm(t)
                }), $(".content .register-form, .content #register-form").each(function(e, t) {
                    new r.ui.RegisterForm(t)
                }), this.popup = new r.ui.LoginPopup, $(document).delegate(".login-required", "click", $.proxy(this, "loginRequiredAction")))
            },
            _getActionDetails: function(e) {
                var t = $(e);
                return t.hasClass("up") ? {
                    eventName: "upvote",
                    description: r._("you need to be signed in to upvote stuff")
                } : t.hasClass("down") ? {
                    eventName: "downvote",
                    description: r._("you need to be signed in to downvote stuff")
                } : t.hasClass("arrow") ? {
                    eventName: "arrow",
                    description: r._("you need to be signed in to vote on stuff")
                } : t.hasClass("give-gold") ? {
                    eventName: "give-gold",
                    description: r._("you need to be signed in to give gold")
                } : t.parents("#header").length && t.attr("href").indexOf("login") !== -1 ? {
                    eventName: "login-or-register"
                } : t.parents(".subscribe-button").length ? {
                    eventName: "subscribe-button",
                    description: r._("you need to be signed in to subscribe to stuff")
                } : t.parents(".submit-link").length ? {
                    eventName: "submit-link",
                    description: r._("you need to be signed in to submit stuff")
                } : t.parents(".submit-text").length ? {
                    eventName: "submit-text",
                    description: r._("you need to be signed in to submit stuff")
                } : t.parents(".share-button").length ? {
                    eventName: "share-button",
                    description: r._("you need to be signed in to share stuff")
                } : {
                    eventName: t.attr("class"),
                    description: r._("you need to be signed in to do that")
                }
            },
            loginRequiredAction: function(e) {
                if (r.config.logged) return !0;
                var t = $(e.target),
                    n = t.attr("href"),
                    i = this._getActionDetails(t),
                    s;
                if (n && n != "#" && !/\/login\/?$/.test(n)) s = n;
                else {
                    var o = t.thing();
                    o.length && (s = o.find(".comments").attr("href"))
                }
                return this.popup.showLogin(i.description, s && $.proxy(function(e) {
                    var t = e.json.data.hsts_redir;
                    t && (s = t + encodeURIComponent(s)), window.location = s
                }, this)), r.analytics.fireGAEvent("login-required-popup", "opened", i.eventName), !1
            }
        }, r.ui.LoginForm = function() {
            r.ui.Form.apply(this, arguments)
        }, r.ui.LoginForm.prototype = $.extend(new r.ui.Form, {
            showErrors: function(e) {
                r.ui.Form.prototype.showErrors.call(this, e), e.length && this.$el.find(".recover-password").addClass("attention")
            },
            showStatus: function() {
                this.$el.find(".error").css("opacity", 1), r.ui.Form.prototype.showStatus.apply(this, arguments)
            },
            resetErrors: function() {
                if (this.$el.hasClass("login-form-side")) {
                    var e = this.$el.find(".error");
                    e.is(":visible") && e.fadeTo(100, .35)
                } else r.ui.Form.prototype.resetErrors.apply(this, arguments)
            },
            _submit: function() {
                return r.analytics.fireGAEvent("login-form", "submit"), r.login.post(this, "login")
            },
            _handleResult: function(e) {
                if (!e.json.errors.length)
                    if (this.successCallback) this.successCallback(e);
                    else {
                        this.$el.addClass("working");
                        var t = r.config.extension ? "/." + r.config.extension : "/",
                            n = /\/login\/?$/.test($.url().attr("path")) ? t : window.location,
                            i = this.$el.find('input[name="dest"]').val(),
                            s = e.json.data.hsts_redir,
                            o = i || n;
                        s && (o = s + encodeURIComponent(o)), window.location === o ? window.location.reload() : window.location = o
                    } else r.ui.Form.prototype._handleResult.call(this, e)
            },
            _handleNetError: function(e) {
                r.ui.Form.prototype._handleNetError.apply(this, arguments), e.status == 0 && r.config.currentOrigin != r.config.https_endpoint && $("<p>").append($("<a>").text(r._("try using our secure login form.")).attr("href", r.config.https_endpoint + "/login")).appendTo(this.$el.find(".status"))
            },
            focus: function() {
                this.$el.find('input[name="user"]').focus()
            }
        }), r.ui.RegisterForm = function() {
            r.ui.Form.apply(this, arguments), this.$user = this.$el.find('[name="user"]'), this.$user.is("[data-validate-url]") || (this.checkUsernameDebounced = _.debounce($.proxy(this, "checkUsername"), 500), this.$user.on("keyup", $.proxy(this, "usernameChanged"))), this.$el.find('[name="passwd2"]').on("keyup", $.proxy(this, "checkPasswordMatch")), this.$el.find('[name="passwd"][data-validate-url]').strengthMeter({
                related: ["#user_reg", "#email_reg"],
                delay: 0,
                trigger: "loaded.validator"
            }).on("score.strengthMeter", function(e, t) {
                var n = $(this);
                if (n.stateify("getCurrentState") === "error") return;
                var i;
                t > 90 ? i = r._("Password is strong") : t > 70 ? i = r._("Password is good") : t > 30 ? i = r._("Password is fair") : i = r._("Password is weak"), n.stateify("showMessage", i)
            }), this.$submit = this.$el.find(".submit button")
        }, r.ui.RegisterForm.prototype = $.extend(new r.ui.Form, {
            maxName: 0,
            usernameChanged: function() {
                var e = this.$user.val();
                if (e == this._priorName) return;
                this._priorName = e, this.$el.find(".error.field-user").hide(), this.$el.removeClass("name-checking name-available name-taken"), this.maxName = Math.max(this.maxName, e.length), e && this.maxName >= 3 && (this.$el.addClass("name-checking"), this.checkUsernameDebounced()), this.$submit.attr("disabled", !1)
            },
            checkPasswordMatch: _.debounce(function() {
                var e = this.$el.find('[name="passwd2"]'),
                    t = this.$el.find('[name="passwd"]'),
                    n = e.val(),
                    i = t.val();
                if (!n || t.stateify("getCurrentState") !== "success") {
                    e.stateify("clear");
                    return
                }
                n === i ? e.stateify("set", "success") : e.stateify("set", "error", r._("passwords do not match"))
            }, $.fn.validator.Constructor.DEFAULTS.delay),
            checkUsername: function() {
                var e = this.$user.val();
                e ? $.ajax({
                    url: "/api/username_available.json",
                    data: {
                        user: e
                    },
                    success: $.proxy(this, "displayUsernameStatus"),
                    complete: $.proxy(function() {
                        this.$el.removeClass("name-checking")
                    }, this)
                }) : this.$el.removeClass("name-available name-taken")
            },
            displayUsernameStatus: function(e) {
                e.json && e.json.errors ? (this.showErrors(e.json.errors), this.$submit.attr("disabled", !0)) : (this.$el.addClass(e ? "name-available" : "name-taken"), this.$submit.attr("disabled", e == 0))
            },
            _submit: function() {
                return r.analytics.fireGAEvent("register-form", "submit"), r.login.post(this, "register")
            },
            _handleResult: r.ui.LoginForm.prototype._handleResult,
            focus: r.ui.LoginForm.prototype.focus
        }), r.ui.LoginPopup = function() {
            var e = $("#login-popup").prop("innerHTML");
            r.ui.Popup.call(this, {
                size: "large",
                content: e,
                className: "login-modal"
            }), this.login = new r.ui.LoginForm(this.$.find("#login-form")), this.register = new r.ui.RegisterForm(this.$.find("#register-form"))
        }, r.ui.LoginPopup.prototype = _.extend({}, r.ui.Popup.prototype, {
            show: function(e, t) {
                return this.login.successCallback = t, this.register.successCallback = t, this.$.find("#cover-msg").text(e).toggle(!!e), r.ui.Popup.prototype.show.call(this), !1
            },
            showLogin: function() {
                var e = this.login;
                this.show.apply(this, arguments), this.once("opened.r.popup", function() {
                    e.focus()
                })
            },
            showRegister: function() {
                var e = this.register;
                this.show.apply(this, arguments), this.once("opened.r.popup", function() {
                    e.focus()
                })
            }
        }), r.newsletter = {
            post: function(e) {
                var t = $('input[name="email"]', e.$el).val(),
                    n = e.$el.attr("action"),
                    i = e.serialize();
                return i.push({
                    name: "api_type",
                    value: "json"
                }), r.ajax({
                    url: n,
                    type: "POST",
                    dataType: "json",
                    data: i,
                    xhrFields: {
                        withCredentials: !0
                    }
                })
            }
        }, r.newsletter.ui = {
            _setupNewsletterBar: function() {
                var e = !!store.get("newsletterbar.seen");
                if (e || r.ui.isSmallScreen()) return;
                $(".newsletterbar").show(), $(".newsletter-close").on("click", function() {
                    $(".newsletterbar").hide()
                }), store.set("newsletterbar.seen", !0)
            },
            _setupNewsletter: function() {
                if (!$("body").hasClass("newsletter")) return;
                $(".faq-toggle").click(function(e) {
                    e.preventDefault(), $(this).toggleClass("active"), $(".faq").slideToggle(), r.analytics.fireGAEvent("newsletter-form", "faq-toggle")
                })
            },
            init: function() {
                $(".newsletter-signup").each(function(e, t) {
                    new r.newsletter.ui.NewsletterForm(t)
                }), this._setupNewsletterBar(), this._setupNewsletter()
            }
        }, r.newsletter.ui.NewsletterForm = function() {
            r.ui.Form.apply(this, arguments)
        }, r.newsletter.ui.NewsletterForm.prototype = $.extend(new r.ui.Form, {
            showStatus: function() {
                this.$el.find(".error").css("opacity", 1), r.ui.Form.prototype.showStatus.apply(this, arguments)
            },
            _submit: function() {
                return r.analytics.fireGAEvent("newsletter-form", "submit"), r.newsletter.post(this)
            },
            _showSuccess: function() {
                var e = this.$el.parents(".newsletter-container");
                e.find(".result-message").text(r._("check your inbox to confirm your subscription")), e.addClass("success"), e.find("header").fadeTo(250, 1)
            },
            _handleResult: function(e) {
                if (e.json.errors.length) return r.ui.Form.prototype._handleResult.call(this, e);
                var t = this.$el.parents(".newsletter-container");
                t.find("header, form").fadeTo(250, 0, function() {
                    this._showSuccess()
                }.bind(this))
            }
        }), $(function() {
            function e(e) {
                $(e).parent().parent().addClass("edited"), $(e).parent().parent().find(".status").empty()
            }

            function t() {
                $(this).data("saved") != $(this).val() && e(this)
            }

            function n(e) {
                return e.preventDefault(), post_form(this.parentNode, e.data.action)
            }

            function i() {
                e(this)
            }

            function s(e) {
                return e.preventDefault(), $(this).removeClass("edited"), post_form(this, e.data.action)
            }

            function o() {
                return open_menu(this), $(this).addClass("active"), !1
            }

            function u(e) {
                return e.data("name") ? {
                    name: e.data("name")
                } : {
                    link: e.thing_id()
                }
            }

            function a(e) {
                $(".flairselector li").removeClass("selected"), $(this).addClass("selected");
                var t = $(this).parent().parent().siblings("form")[0];
                $(t).children('input[name="flair_template_id"]').val(this.id);
                var n = $(t).children(".customizer"),
                    r = n.children("input");
                $(this).hasClass("texteditable") ? (n.addClass("texteditable"), r.removeAttr("disabled"), r.css("display", "block"), r.val($.trim($(this).find(".flair, .linkflairlabel").text())).select(), r.keyup(function() {
                    $(".flairselection .flair, .flairselection .linkflairlabel").text($(r).val()).attr("title", $(r).val())
                })) : (n.removeClass("texteditable"), r.attr("disabled", "disabled").hide());
                var i = $(".flairselector .flairremove").detach();
                return $(".flairselection").html($(this).first().children().clone()).append(i), $(".flairselector .flairremove").css("display", "inline-block"), !1
            }

            function f(e) {
                var t = $(this).parent().parent();
                $(t).children('input[name="flair_template_id"]').val(""), $(t).children(".customizer").hide();
                var n = $(".flairselector .flairremove").detach();
                $(n).hide(), $(".flairselector li").removeClass("selected"), $(".flairselection").empty().append(n)
            }

            function l(e) {
                $(this).find(".status").html(reddit.status_msg.submitting).show();
                var t = $(this.parentNode.parentNode).find(".flairselectbtn");
                return simple_post_form(this, "selectflair", u(t)), !1
            }

            function c(e) {
                function i(e) {
                    var t = 1,
                        n = 3,
                        r = 150,
                        i = 10,
                        s = $(e).children().length,
                        o = Math.max(t, Math.min(n, Math.ceil(s / i))),
                        u = Math.ceil(s / o),
                        a = Math.max(r, $(e).width());
                    $(e).width(a);
                    if (o > 1) {
                        $(e).css("float", "left");
                        var f = o * u - s;
                        for (var l = 1; l < o; l++) {
                            var c = u;
                            l <= f && c--;
                            var h = s - c;
                            s -= c;
                            var p = $(e).children().slice(h).remove();
                            $(p).width(a), $(e).after($("<ul>").css("float", "left").append(p))
                        }
                    }
                    return o * (a + 5) + 50
                }

                function s(e) {
                    $(n).html(e);
                    var r = $(".flairselector ul"),
                        s = Math.max(200, r.length ? i(r) : $(".error").width() + 20),
                        o = Math.max(100, $(t).position().left + $(t).width() - s);
                    $(n).height("auto").width(s).css("left", o + "px").click(!1).find(".flairselection").click(!1).end().find("form").click(function(e) {
                        e.stopPropagation()
                    }).submit(l).end().find(".customizer input").attr("disabled", "disabled").end().find("li.selected").each(a).end().find("li:not(.error)").click(a).end().find(".flairremove").click(f).end()
                }
                close_menus(e);
                var t = this,
                    n = $(t).siblings(".flairselector")[0];
                $(n).html('<img class="flairthrobber" src="' + r.utils.staticURL("throbber.gif") + '" />').addClass("active").height(18).width(18).css("padding-left", 4).css("padding-top", 4).css("padding-bottom", 4).css("padding-right", 4).css("left", $(t).position().left + $(t).width() - 18 + "px").css("top", $(t).position().top + "px");
                var o = u($(this));
                return $.request("flairselector", o, s, !0, "html"), !1
            }
            $("#tabbedpane-grant").on("submit", ".flair-entry", {
                action: "flair"
            }, s), $("#tabbedpane-grant").on("click", ".flairdeletebtn", {
                action: "deleteflair"
            }, n), $("#tabbedpane-templates, #tabbedpane-link_templates").on("submit", ".flair-entry", {
                action: "flairtemplate"
            }, s), $("form.clearflairtemplates").on("submit", {
                action: "clearflairtemplates"
            }, s), $(".flairlist").on("focus", ".flaircell input", i).on("keyup", ".flaircell input", t).on("change", ".flaircell input", t).on("click", ".flairtemplate .flairdeletebtn", {
                action: "deleteflairtemplate"
            }, n), $(".flairtoggle").submit(function() {
                return post_form(this, "setflairenabled")
            }), $(".flairtoggle input").change(function() {
                $(this).parent().submit()
            }), $(document).on("click", ".tagline .flairselectbtn, .thing .flairselectbtn", c), $(".flairselector .dropdown").click(o)
        }), r.interestbar = {
            init: function() {
                new r.ui.InterestBar($(".sr-interest-bar"))
            }
        }, r.ui.InterestBar = function() {
            r.ui.Base.apply(this, arguments), this.$query = this.$el.find(".query"), this.queryChangedDebounced = _.debounce($.proxy(this, "queryChanged"), 500), this.$query.on("keyup", $.proxy(this, "keyPressed")), this.$query.on("focus", $.proxy(function() {
                this.$el.addClass("focus")
            }, this)).on("blur", $.proxy(function() {
                this.$el.removeClass("focus")
            }, this))
        }, r.ui.InterestBar.prototype = {
            keyPressed: function() {
                var e = this.$query.val();
                e = $.trim(e);
                if (e == this._lastQuery) return;
                this._lastQuery = e, this.queryChangedDebounced(e), e && e.length > 1 ? this.$el.addClass("working") : (this.hideResults(), this.$el.removeClass("working error"))
            },
            queryChanged: function(e) {
                e && e.length > 1 && $.ajax({
                    url: "/api/subreddits_by_topic.json",
                    data: {
                        query: e
                    },
                    success: $.proxy(this, "displayResults"),
                    error: $.proxy(this, "displayError")
                })
            },
            displayResults: function(e) {
                this.$el.removeClass("working error");
                var t = this.$el.find(".results li:first"),
                    n = this.$el.find(".results li:last"),
                    r = _.template('<li><a href="/r/<%= name %>" target="_blank">/r/<%= name %></a></li>');
                this.$el.find(".results").empty().append(t).append(_.map(e, r).join("")).append(n).slideDown(150)
            },
            hideResults: function() {
                this.$el.find(".results").slideUp(150)
            },
            displayError: function(e) {
                this.$el.removeClass("working").addClass("error").find(".error-caption").text(r._("an error occurred. please try again later! (status: %(status)s)").format({
                    status: e.status
                })), this.hideResults()
            }
        }, r.visited = {
            key: "visited",
            init: function() {
                this.sendVisits = _.throttle(this._sendVisits, 100), r.config.logged && r.config.store_visits && ($(".content").on("click mousedown keydown", ".link:not(.visited) a.title, .link:not(.visited) a.thumbnail", _.bind(this.onVisit, this)), $(".content").on("visit", ".link:not(.visited)", _.bind(this.onVisit, this)), this.sendVisits())
            },
            onVisit: function(e) {
                if (e.type === "keydown" && e.which !== 13) return;
                if (e.type === "mousedown")
                    if (e.which === 1 || e.which === 3) return;
                if (e.type === "click" && e.which !== 1) return;
                this.storeVisit($(e.target).closest(".thing").data("fullname")), this.sendVisits()
            },
            storeVisit: function(e) {
                var t = store.safeGet(this.key) || [];
                t.push(e), store.safeSet(this.key, t)
            },
            _sendVisits: function() {
                var e = store.safeGet(this.key) || [];
                if (!e.length) return;
                e = _.last(_.uniq(e), 100), r.ajax({
                    type: "POST",
                    url: "/api/store_visits",
                    data: {
                        links: e.join(",")
                    }
                }), store.safeSet(this.key, []), $.things.apply($, e).addClass("visited")
            }
        }, r.wiki = {
            request: function(e) {
                r.config.logged && (e.data.uh = r.config.modhash), e.data.page = r.config.wiki_page, $.ajax(e)
            },
            baseApiUrl: function() {
                return r.wiki.baseUrl(!0)
            },
            baseUrl: function(e) {
                var t = "";
                return e && (t += "/api"), t += "/wiki", r.config.is_fake || (t = "/r/" + r.config.post_site + t), t
            },
            init: function() {
                $("body.wiki-page").on("click", ".revision_hide", this.toggleHide), $("body.wiki-page").on("click", ".revision_delete", this.toggleDelete), $("body.wiki-page").on("click", ".toggle-source", this.toggleSource)
            },
            toggleSource: function(e) {
                e.preventDefault(), $(".wiki-page .source").toggle("slow")
            },
            toggleDelete: function(e) {
                e.preventDefault();
                var t = $(this),
                    n = r.wiki.baseApiUrl() + "/delete",
                    i = t.parents(".revision"),
                    s = i.hasClass("deleted");
                i.toggleClass("deleted"), r.wiki.request({
                    url: n,
                    type: "POST",
                    dataType: "json",
                    data: {
                        revision: t.data("revision"),
                        deleted: !s
                    },
                    error: function() {
                        i.toggleClass("deleted")
                    },
                    success: function(e) {
                        e.status ? i.addClass("deleted") : i.removeClass("deleted")
                    }
                })
            },
            toggleHide: function(e) {
                e.preventDefault();
                var t = $(this),
                    n = r.wiki.baseApiUrl() + "/hide",
                    i = t.parents(".revision");
                i.toggleClass("hidden"), r.wiki.request({
                    url: n,
                    type: "POST",
                    dataType: "json",
                    data: {
                        revision: t.data("revision")
                    },
                    error: function() {
                        i.toggleClass("hidden")
                    },
                    success: function(e) {
                        e.status ? i.addClass("hidden") : i.removeClass("hidden")
                    }
                })
            },
            addUser: function(e) {
                e.preventDefault(), $("#usereditallowerror").hide();
                var t = $(e.target),
                    n = r.wiki.baseApiUrl() + "/alloweditor/add";
                r.wiki.request({
                    url: n,
                    type: "POST",
                    data: {
                        username: t.find('[name="username"]').val()
                    },
                    dataType: "json",
                    error: function() {
                        $("#usereditallowerror").show()
                    },
                    success: function(e) {
                        location.reload()
                    }
                })
            },
            submitEdit: function(e) {
                e.preventDefault();
                var t = $(e.target),
                    n = r.wiki.baseApiUrl() + "/edit",
                    s = $("#wiki_edit_conflict"),
                    o = $("#wiki_special_error");
                s.hide(), o.hide(), params = r.utils.serializeForm(t), $("#wiki_save_button").attr("disabled", !0), t.addClass("working"), r.wiki.request({
                    url: n,
                    type: "POST",
                    dataType: "json",
                    data: params,
                    error: function() {
                        t.removeClass("working"), $("#wiki_save_button").removeAttr("disabled")
                    },
                    success: function() {
                        window.location = r.wiki.baseUrl() + "/" + r.config.wiki_page
                    },
                    statusCode: {
                        409: function(e) {
                            var n = JSON.parse(e.responseText),
                                r = t.children("#wiki_page_content"),
                                i = s.children("#yourdiff");
                            s.children("#youredit").val(r.val()), i.html($.unsafe(n.diffcontent)), t.children("#previous").val(n.newrevision), r.val(n.newcontent), s.fadeIn("slow")
                        },
                        415: function(e) {
                            var t = JSON.parse(e.responseText).special_errors,
                                n = o.children("#specials");
                            n.empty();
                            for (i in t) n.append($("<pre>").text($.unsafe(t[i])));
                            o.fadeIn("slow")
                        },
                        429: function(e) {
                            var t = JSON.parse(e.responseText).message,
                                n = o.children("#specials");
                            n.empty(), n.text(t), o.fadeIn("slow")
                        }
                    }
                })
            },
            goCompare: function() {
                v1 = $("input:radio[name=v1]:checked").val(), v2 = $("input:radio[name=v2]:checked").val(), url = r.wiki.baseUrl() + "/" + r.config.wiki_page + "?v=" + v1, v2 != v1 && (url += "&v2=" + v2), window.location = url
            },
            helpon: function(e) {
                $(e).parents("form").children(".markhelp:first").show()
            },
            helpoff: function(e) {
                $(e).parents("form").children(".markhelp:first").hide()
            }
        }, r.apps = {
            init: function() {
                $(".authorized-app").delegate(".app-permissions li", "mouseover mouseout", function(e) {
                    e.type == "mouseover" ? $(this).find(".app-scope").show() : $(this).find(".app-scope").hide()
                }), $("#developed-apps").delegate(".edit-app-button", "click", function() {
                    $(this).toggleClass("collapsed").closest(".developed-app").removeClass("collapsed").find(".app-developers").remove().end().find(".edit-app").slideToggle().removeClass("collapsed").end()
                }).delegate(".edit-app-icon-button", "click", function() {
                    $(this).toggleClass("collapsed").closest(".developed-app").find(".ajax-upload-form").show()
                }), $("#create-app-button").click(function() {
                    $(this).hide(), $("#create-app").fadeIn()
                })
            },
            revoked: function(e, t) {
                $(e).closest(".authorized-app").fadeOut()
            },
            deleted: function(e, t) {
                $(e).closest(".developed-app").fadeOut()
            }
        }, r.gold = {
            _inlineGilding: !1,
            _googleCheckoutAnalyticsLoaded: !1,
            init: function() {
                $("div.content").on("click", '[name="message"]', this._toggleGiftMessage.bind(this)), $("div.content").on("click", "a.give-gold, .gold-payment .close-button", this._toggleThingGoldForm.bind(this)), $("div.content").on("click", ".gold-button", this._setGildingProperties.bind(this)), $(".stripe-gold").click(function() {
                    $("#stripe-payment").slideToggle()
                }), $("#stripe-payment.charge .stripe-submit").on("click", function() {
                    r.gold.tokenThenPost("stripecharge/gold")
                }), $("#stripe-payment.modify .stripe-submit").on("click", function() {
                    r.gold.tokenThenPost("modify_subscription")
                }), $("h3.toggle").on("click", function() {
                    $(this).toggleClass("toggled"), $(this).siblings(".details").slideToggle()
                }), $("dt.toggle").on("click", function() {
                    $(this).toggleClass("toggled"), $(this).next("dd").slideToggle()
                }), $("body").hasClass("gold-signup") && r.gold.signupForm.init(), $("form.creddits-gold .remaining").each(r.gold._renderCredditsAmount), $(document.body).on("submit", "form.creddits-gold", function(e) {
                    return e.preventDefault(), e.stopPropagation(), r.gold._expendCreddits(), $(this).find(".gold-checkout:not(.creddits-gold)").hide(), post_form(this, "spendcreddits")
                })
            },
            _toggleGiftMessage: function(e) {
                var t = e.target,
                    n = t.checked,
                    r = $(e.target).parents(".gold-form").find('[name="giftmessage"]').attr("id"),
                    i = $("#" + r);
                i.toggleClass("hidden", !n)
            },
            _toggleThingGoldForm: function(e) {
                var t = $(e.target),
                    n = t.thing(),
                    i = t.thing_id(),
                    s = "gold_wrap_" + i,
                    o = $("#" + s),
                    u;
                if (o.length) return o.toggle(), !1;
                this._inlineGilding = !0, r.analytics.fireFunnelEvent("gold", "open-inline-form", {
                    tracker: "goldTracker"
                }), this._googleCheckoutAnalyticsLoaded || ($.getScript("//checkout.google.com/files/digital/ga_post.js"), this._googleCheckoutAnalyticsLoaded = !0), n.hasClass("link") ? u = "cloneable-link" : u = "cloneable-comment";
                var a = $(".gold-wrap." + u + ":first").clone(),
                    f = a.find(".gold-form"),
                    l = t.thing().find(".entry .author:first").text(),
                    c = f.find(".passthrough"),
                    h = f.find('[name="cbbaseurl"]').val(),
                    p = !f.find('[name="signed"]').is(":checked");
                a.removeClass(u).addClass("inline-gold").prop("id", s), f.find("p:first-child em").text(l), f.find("button").attr("disabled", ""), c.val(""), t.new_thing_child(a);
                var d = setTimeout(function() {
                    f.addClass("working"), f.find("button").addClass("disabled")
                }, 200);
                return $.request("generate_payment_blob.json", {
                    thing: i,
                    signed: p
                }, function(e) {
                    clearTimeout(d), f.removeClass("working"), c.val(e), f.find(".stripe-gold").on("click", function() {
                        window.open("/gold/creditgild/" + e)
                    }), f.find(".coinbase-gold").on("click", function() {
                        window.open(h + "?c=" + e)
                    }), f.find("button").removeAttr("disabled").removeClass("disabled")
                }), !1
            },
            _setGildingProperties: function(e) {
                var t = $(e.target),
                    n = t.thing_id();
                if (!n) {
                    t.parents("form").submit();
                    return
                }
                var i = "gold_wrap_" + n,
                    s = $("#" + i),
                    o = s.find(".passthrough"),
                    u = o.val(),
                    a = !s.find('[name="signed"]').is(":checked"),
                    f = s.find('[name="message"]').is(":checked"),
                    l = "";
                f && (l = s.find('[name="giftmessage"]').val());
                if (this._inlineGilding) {
                    var c = {
                        label: t.closest("[data-vendor]").data("vendor"),
                        tracker: "goldTracker"
                    };
                    r.analytics.fireFunnelEvent("gold", "checkout", c)
                }
                $.request("modify_payment_blob.json", {
                    code: u,
                    signed: a,
                    message: l
                }, function() {
                    t.parents("form").submit()
                })
            },
            _expendCreddits: function() {
                $(".cloneable-comment, .cloneable-link").find("form.creddits-gold .remaining").each(function() {
                    var e = $(this),
                        t = parseInt(e.data("current"), 10),
                        n = parseInt(e.data("total"), 10),
                        i = n - t;
                    i < t ? e.parents("form.creddits-gold").remove() : ($(this).data("total", i), r.gold._renderCredditsAmount.apply(this))
                })
            },
            _renderCredditsAmount: function() {
                var e = $(this),
                    t = e.data("template");
                e.html(_.template(t, _.omit(e.data(), "template")))
            },
            gildThing: function(e, t, n) {
                var r = $(".id-" + e);
                if (!r.length) {
                    console.log("couldn't gild thing " + e);
                    return
                }
                var i = r.children(".entry").find("p.tagline"),
                    s = i.find(".gilded-icon"),
                    o;
                n != null ? o = n : (o = s.data("count") || 0, o++), r.addClass("gilded user-gilded"), s.length || (s = $("<span>").addClass("gilded-icon"), i.append(s)), s.attr("title", t).data("count", o), o > 1 && s.text("x" + o), r.children(".entry").find(".give-gold").parent().remove()
            },
            tokenThenPost: function(e) {
                var t = function(t, n) {
                    var r = $("#stripe-payment"),
                        i = r.find(".stripe-submit"),
                        s = r.find(".status"),
                        o = r.find('[name="stripeToken"]');
                    n.error ? (i.removeAttr("disabled"), s.html(n.error.message)) : (o.val(n.id), post_form(r, e))
                };
                r.gold.makeStripeToken(t)
            },
            makeStripeToken: function(e) {
                var t = $("#stripe-payment"),
                    n = t.find('[name="stripePublicKey"]').val(),
                    i = t.find(".stripe-submit"),
                    s = t.find(".status"),
                    o = t.find('[name="stripeToken"]'),
                    u = t.find(".card-name").val(),
                    a = t.find(".card-number").val(),
                    f = t.find(".card-cvc").val(),
                    l = t.find(".card-expiry-month").val(),
                    c = t.find(".card-expiry-year").val(),
                    h = t.find(".card-address_line1").val(),
                    p = t.find(".card-address_line2").val(),
                    d = t.find(".card-address_city").val(),
                    v = t.find(".card-address_state").val(),
                    m = t.find(".card-address_country").val(),
                    g = t.find(".card-address_zip").val();
                Stripe.setPublishableKey(n);
                var y = function(e, n) {
                    t.find(".status").addClass("error").text(n), $(e).focus()
                };
                return u ? Stripe.validateCardNumber(a) ? Stripe.validateExpiry(l, c) ? Stripe.validateCVC(f) ? h ? d ? m ? (s.removeClass("error").text(reddit.status_msg.submitting), i.attr("disabled", "disabled"), Stripe.createToken({
                    name: u,
                    number: a,
                    cvc: f,
                    exp_month: l,
                    exp_year: c,
                    address_line1: h,
                    address_line2: p,
                    address_city: d,
                    address_state: v,
                    address_country: m,
                    address_zip: g
                }, e)) : y(".card-address_country", r._("missing country")) : y(".card-address_city", r._("missing city")) : y(".card-address_line1", r._("missing address")) : y(".card-cvc", r._("invalid cvc")) : y(".card-expiry-month", r._("invalid expiration date")) : y(".card-number", r._("invalid credit card number")) : y(".card-name", r._("missing name")), !1
            }
        }, r.gold.signupForm = function() {
            function e() {
                var e = $("#goldtype").val(),
                    t = ["goldtype"];
                switch (e) {
                    case "autorenew":
                        t.push("period");
                        break;
                    case "onetime":
                        t.push("months");
                        break;
                    case "code":
                        t.push("months", "email");
                        break;
                    case "gift":
                        t.push("months", "recipient", "signed", "giftmessage");
                        break;
                    case "creddits":
                        t.push("num_creddits")
                }
                return t
            }

            function t(e) {
                var t = $(e);
                if (t.is(":radio") && !t.is(":checked")) throw "Unchecked radio button has no value";
                return t.is(":checkbox") ? value = t.is(":checked") ? t.val() : null : t.is("select") ? value = t.find("option:selected").val() : value = t.val(), value
            }

            function n() {
                var n = $("<a />").get(0),
                    r = e(),
                    i = {};
                if (!("replaceState" in window.history)) return;
                $("form.gold-form").find(":input").each(function() {
                    var e = $(this);
                    if (!_.contains(r, this.name)) return;
                    try {
                        i[this.name] = t(this)
                    } catch (n) {
                        return
                    }
                }), i.edit = !0, n.href = window.location.href, n.search = $.param(i), window.history.replaceState({}, "", n.href)
            }

            function r() {
                var e = $('input[name="gifttype"]:checked'),
                    t = $(".tab.active"),
                    r = $("#gift").is(":checked"),
                    i;
                t.prop("id") == "autorenew" ? i = "autorenew" : t.prop("id") == "creddits" ? i = "creddits" : r && e.length > 0 ? i = e.val() : i = "onetime", $("#goldtype").val(i), n()
            }

            function i(e) {
                $("#form-options, #payment-options").show(), $(".active").removeClass("active"), $("#redeem-a-code, .question").hide(), $(e).addClass("active"), $(e.hash).addClass("active"), r()
            }

            function s(t) {
                t.stopPropagation(), t.preventDefault(), $("#giftmessage, #recipient").each(function() {
                    var e = $(this);
                    e.val() === e.attr("placeholder") && e.val("")
                });
                var n = $("form.gold-form").serializeArray(),
                    r = _.object(_.pluck(n, "name"), _.pluck(n, "value")),
                    i = _.pick(r, e());
                window.location = "/gold/payment?" + $.param(i)
            }

            function o() {
                var e = $("form.gold-form");
                $("a.tab-toggle").on("click", function(e) {
                    e.stopPropagation(), e.preventDefault(), i(this)
                }), $('input[name="gift"]').change(function() {
                    $("#gifting-details").slideToggle($(this).val()), r()
                }), $(".gold-dropdown").on("change", function() {
                    $(this).find("[selected]").removeAttr("selected"), $(this).find(":selected").get(0).setAttribute("selected", "selected")
                });
                var t = "placeholder" in document.createElement("input");
                $('input[name="gifttype"]').change(function() {
                    $("#gifttype-details-gift").toggleClass("hidden", this.value !== "gift"), t && $("#gifttype-details-gift :input:eq(0)").focus(), r()
                }), $("#giftmessage").on("keyup", function() {
                    $("#message").prop("checked", $(this).val() !== "")
                }), e.on("submit", s), e.find(":input").on("change", n), $('input[name="code"]').on("focus", function() {
                    $(".redeem-submit").slideDown()
                })
            }
            return {
                init: o
            }
        }(), ! function(e) {
            e.gild_thing = function(t, n) {
                r.gold.gildThing(t, n), e("#gold_wrap_" + t).fadeOut(400)
            }
        }(jQuery), r.multi = {
            init: function() {
                this.multis = new r.multi.GlobalMultiCache, this.mine = new r.multi.MyMultiCollection, this.mine.fetch = _.throttle(this.mine.fetch, 6e4);
                var e = $(".multi-details");
                if (e.length) {
                    var t = this.multis.touch(e.data("path"));
                    t.fetch();
                    var n = (new r.multi.MultiDetails({
                            model: t,
                            el: e
                        })).render(),
                        i = new r.multi.SubredditList({
                            model: t,
                            el: e
                        });
                    location.hash == "#created" && n.focusAdd();
                    var s = $("#multi-recs");
                    s.length && n.initRecommendations(s)
                }
                var o = {};
                $(".subscribe-button").each(function(e, t) {
                    new r.multi.SubscribeButton({
                        el: t,
                        bubbleGroup: o
                    })
                }), $(".listing-chooser").each(function(e, t) {
                    new r.multi.ListingChooser({
                        el: t
                    })
                })
            }
        }, r.multi.MultiRedditList = Backbone.Collection.extend({
            model: Backbone.Model.extend({
                initialize: function() {
                    this.id = this.get("name").toLowerCase()
                }
            }),
            comparator: function(e) {
                return e.id
            },
            getByName: function(e) {
                return this.get(e.toLowerCase())
            }
        }), r.multi.MultiReddit = Backbone.Model.extend({
            idAttribute: "path",
            url: function() {
                return r.utils.joinURLs("/api/multi", this.id)
            },
            defaults: {
                visibility: "private"
            },
            initialize: function(e, t) {
                this.uncreated = t && !!t.isNew, this.subreddits = new r.multi.MultiRedditList(this.get("subreddits"), {
                    url: this.url() + "/r/",
                    parse: !0
                }), this.on("change:subreddits", function(e, t) {
                    this.subreddits.set(t, {
                        parse: !0
                    })
                }, this), this.subreddits.on("request", function(e, t, n) {
                    this.trigger("request", e, t, n)
                }, this)
            },
            parse: function(e) {
                return e.data
            },
            toJSON: function() {
                return data = Backbone.Model.prototype.toJSON.apply(this), data.subreddits = this.subreddits.toJSON(), data
            },
            isNew: function() {
                return this.uncreated
            },
            name: function() {
                return this.get("path").split("/").pop()
            },
            sync: function(e, t, n) {
                var r = Backbone.sync.apply(this, arguments);
                return e == "create" && r.done(_.bind(function() {
                    this.uncreated = !1
                }, this)), r
            },
            addSubreddit: function(e, t) {
                e = r.utils.tup(e);
                if (e.length == 1) this.subreddits.create({
                    name: e[0]
                }, t);
                else {
                    var n = this.subreddits,
                        i = n.clone();
                    i.add(_.map(e, function(e) {
                        return {
                            name: e
                        }
                    })), this.subreddits = i, this.save(null, t), this.subreddits = n
                }
            },
            removeSubreddit: function(e, t) {
                this.subreddits.getByName(e).destroy(t)
            },
            _copyOp: function(e, t, n) {
                var i = new $.Deferred;
                return Backbone.ajax({
                    type: "POST",
                    url: "/api/multi/" + e,
                    data: {
                        from: this.get("path"),
                        to: t.pathByName(n)
                    },
                    success: _.bind(function(n) {
                        e == "rename" && this.trigger("destroy", this, this.collection);
                        var s = r.multi.multis.reify(n);
                        t.add(s), i.resolve(s)
                    }, this),
                    error: _.bind(i.reject, i)
                }), i
            },
            copyTo: function(e, t) {
                return this._copyOp("copy", e, t)
            },
            renameTo: function(e, t) {
                return this._copyOp("rename", e, t)
            },
            getSubredditNames: function() {
                return this.subreddits.pluck("name")
            }
        }), r.multi.MyMultiCollection = Backbone.Collection.extend({
            url: "/api/multi/mine",
            model: r.multi.MultiReddit,
            comparator: function(e) {
                return e.get("path").toLowerCase()
            },
            parse: function(e) {
                return _.map(e, function(e) {
                    return r.multi.multis.reify(e)
                })
            },
            pathByName: function(e) {
                return "/user/" + r.config.logged + "/m/" + e
            }
        }), r.multi.GlobalMultiCache = Backbone.Collection.extend({
            model: r.multi.MultiReddit,
            touch: function(e) {
                var t = this.get(e);
                return t || (t = new this.model({
                    path: e
                }), this.add(t)), t
            },
            reify: function(e) {
                var t = this.model.prototype.parse(e),
                    n = this.touch(t.path);
                return n.set(t), n
            }
        }), r.multi.MultiSubredditItem = Backbone.View.extend({
            tagName: "li",
            template: _.template('<a href="/r/<%- sr_name %>">/r/<%- sr_name %></a><button class="remove-sr">x</button>'),
            events: {
                "click .remove-sr": "removeSubreddit"
            },
            render: function() {
                return this.$el.append(this.template({
                    sr_name: this.model.get("name")
                })), r.config.logged && (this.bubble = new r.multi.MultiSubscribeBubble({
                    parent: this.$el,
                    group: this.options.bubbleGroup,
                    srName: this.model.get("name")
                })), this
            },
            remove: function() {
                this.bubble && this.bubble.remove(), Backbone.View.prototype.remove.apply(this)
            },
            removeSubreddit: function(e) {
                this.options.multi.removeSubreddit(this.model.get("name"))
            }
        }), r.multi.SubredditList = Backbone.View.extend({
            events: {
                "submit .add-sr": "addSubreddit"
            },
            initialize: function() {
                this.listenTo(this.model.subreddits, "add", this.addOne), this.listenTo(this.model.subreddits, "remove", this.removeOne), this.listenTo(this.model.subreddits, "sort", this.resort), new r.ui.ConfirmButton({
                    el: this.$("button.delete")
                }), this.listenTo(this.model.subreddits, "add remove", function() {
                    r.ui.showWorkingDeferred(this.$el, r.ui.refreshListing())
                }), this.model.on("request", function(e, t) {
                    r.ui.showWorkingDeferred(this.$el, t)
                }, this), this.itemView = this.options.itemView || r.multi.MultiSubredditItem, this.itemViews = {}, this.bubbleGroup = {}, this.$(".subreddits").empty(), this.model.subreddits.each(this.addOne, this)
            },
            addOne: function(e) {
                var t = new this.itemView({
                    model: e,
                    multi: this.model,
                    bubbleGroup: this.bubbleGroup
                });
                this.itemViews[e.id] = t, this.$(".subreddits").append(t.render().$el)
            },
            resort: function() {
                this.model.subreddits.each(function(e) {
                    this.itemViews[e.id].$el.appendTo(this.$(".subreddits"))
                }, this)
            },
            removeOne: function(e) {
                this.itemViews[e.id].remove(), delete this.itemViews[e.id]
            },
            addSubreddit: function(e) {
                e.preventDefault();
                var t = this.$(".add-sr .sr-name"),
                    n = t.val();
                n = n.split(/[+,\-\s]+/), n = n.map(function(e) {
                    return e.replace(/^\/?r\//, "")
                }), n = _.compact(n);
                if (!n.length) return;
                t.val(""), this.$(".add-error").css("visibility", "hidden"), this.model.addSubreddit(n, {
                    wait: !0,
                    success: _.bind(function() {
                        this.$(".add-error").hide()
                    }, this),
                    error: _.bind(function(e, t) {
                        var n = JSON.parse(t.responseText);
                        this.$(".add-error").text(n.explanation).css("visibility", "visible").show()
                    }, this)
                })
            }
        }), r.multi.MultiDetails = Backbone.View.extend({
            events: {
                'change [name="visibility"]': "setVisibility",
                'change [name="key_color"]': "setKeyColor",
                'change [name="icon_name"]': "setIconName",
                "click .show-copy": "showCopyMulti",
                "click .show-rename": "showRenameMulti",
                "click .edit-description": "editDescription",
                "click .edit-display-name": "editDisplayName",
                "submit .description": "saveDescription",
                "submit .display-name": "saveDisplayName",
                "confirm .delete": "deleteMulti"
            },
            initialize: function() {
                this.listenTo(this.model, "change", this.render), this.listenTo(this.model.subreddits, "add remove reset", this.render), this.addBubble = new r.multi.MultiAddNoticeBubble({
                    parent: this.$(".add-sr .sr-name"),
                    trackHover: !1
                })
            },
            initRecommendations: function(e) {
                var t = new r.recommend.RecommendationList;
                this.recsView = new r.recommend.RecommendationsView({
                    collection: t,
                    el: e
                }), this.model.subreddits.isEmpty() || t.fetchForSrs(this.model.getSubredditNames()), this.listenTo(this.model.subreddits, "add remove reset", function() {
                    var e = this.model.getSubredditNames();
                    t.fetchForSrs(e)
                }), this.recsView.bind("recs:select", function(e) {
                    this.model.addSubreddit(e.srName)
                }, this)
            },
            render: function() {
                var e = this.model.get("can_edit");
                return e && (this.model.subreddits.isEmpty() ? this.addBubble.show() : this.addBubble.hide()), this.$el.toggleClass("readonly", !e), this.$el.toggleClass("public", this.model.get("visibility") == "public"), this.model.has("description_html") && this.$(".description .usertext-body").html(this.model.get("description_html")), this.$(".count").text(this.model.subreddits.length), this
            },
            setVisibility: function() {
                this.model.save({
                    visibility: this.$('[name="visibility"]:checked').val()
                })
            },
            setKeyColor: function() {
                this.model.save({
                    key_color: this.$('[name="key_color"]').val()
                })
            },
            setIconName: function() {
                this.model.save({
                    icon_name: this.$('[name="icon_name"]').val()
                })
            },
            showCopyMulti: function() {
                this.$("form.rename-multi").hide();
                var e = this.$("form.copy-multi");
                e.show().find(".multi-name").val(this.model.name()).select().focus(), this.copyForm || (this.copyForm = new r.multi.MultiCopyForm({
                    el: e,
                    navOnCreate: !0,
                    sourceMulti: this.model
                }))
            },
            showRenameMulti: function() {
                this.$("form.copy-multi").hide();
                var e = this.$("form.rename-multi");
                e.show().find(".multi-name").val(this.model.name()).select().focus(), this.renameForm || (this.renameForm = new r.multi.MultiRenameForm({
                    el: e,
                    navOnCreate: !0,
                    sourceMulti: this.model
                }))
            },
            deleteMulti: function() {
                this.model.destroy({
                    success: function() {
                        window.location = "/"
                    }
                })
            },
            editDescription: function() {
                show_edit_usertext($(".description"))
            },
            saveDescription: function(e) {
                e.preventDefault(), this.model.save({
                    description_md: this.$(".description textarea").val()
                }, {
                    success: _.bind(function() {
                        hide_edit_usertext($(".description"))
                    }, this)
                })
            },
            editDisplayName: function() {
                show_edit_usertext($(".display-name"))
            },
            saveDisplayName: function(e) {
                e.preventDefault(), this.model.save({
                    display_name: this.$(".display-name textarea").val()
                }, {
                    success: _.bind(function() {
                        hide_edit_usertext($(".display-name"))
                    }, this)
                })
            },
            focusAdd: function() {
                this.$(".add-sr .sr-name").focus()
            }
        }), r.multi.MultiAddNoticeBubble = r.ui.Bubble.extend({
            className: "multi-add-notice hover-bubble anchor-right",
            template: _.template("<h3><%- awesomeness_goes_here %></h3><p><%- add_multi_sr %></p>"),
            render: function() {
                this.$el.html(this.template({
                    awesomeness_goes_here: r._("awesomeness goes here"),
                    add_multi_sr: r._("add a subreddit to your multi.")
                }))
            }
        }), r.multi.SubscribeButton = Backbone.View.extend({
            events: {
                mouseenter: "createBubble"
            },
            createBubble: function() {
                if (this.bubble) return;
                this.bubble = new r.multi.MultiSubscribeBubble({
                    parent: this.$el,
                    group: this.options.bubbleGroup,
                    srName: String(this.$el.data("sr_name"))
                });
                var e = this.$el.data("bubble_class");
                e && (this.bubble.$el.removeClass("anchor-right"), this.bubble.$el.addClass(e)), this.bubble.queueShow()
            }
        }), r.multi.MultiSubscribeBubble = r.ui.Bubble.extend({
            className: "multi-selector hover-bubble anchor-right",
            template: _.template('<div class="title"><strong><%- title %></strong><a class="sr" href="/r/<%- sr_name %>">/r/<%- sr_name %></a></div><div class="throbber"></div>'),
            itemTemplate: _.template('<label><input class="add-to-multi" type="checkbox" data-path="<%- path %>" <%- checked %>><%- name %><a href="<%- path %>" target="_blank" title="<%- open_multi %>">&rsaquo;</a></label>'),
            itemCreateTemplate: _.template('<label><form class="create-multi"><input type="text" class="multi-name" placeholder="<%- create_msg %>"><div class="error create-multi-error"></div></form></label>'),
            events: {
                "click .add-to-multi": "toggleSubscribed"
            },
            initialize: function() {
                this.listenTo(this, "show", this.load), this.listenTo(r.multi.mine, "reset add", _.debounce(this.render, 100)), r.ui.Bubble.prototype.initialize.apply(this)
            },
            load: function() {
                r.ui.showWorkingDeferred(this.$el, r.multi.mine.fetch())
            },
            render: function() {
                this.$el.html(this.template({
                    title: r._("categorize"),
                    sr_name: this.options.srName
                }));
                var e = $('<div class="multi-list">');
                r.multi.mine.chain().sortBy(function(e) {
                    return e.subreddits.getByName(this.options.srName)
                }, this).each(function(t) {
                    e.append(this.itemTemplate({
                        name: t.get("name"),
                        path: t.get("path"),
                        checked: t.subreddits.getByName(this.options.srName) ? "checked" : "",
                        open_multi: r._("open this multi")
                    }))
                }, this), e.append(this.itemCreateTemplate({
                    create_msg: r._("create a new multi")
                })), this.$el.append(e), this.createForm = new r.multi.MultiCreateForm({
                    el: this.$("form.create-multi")
                })
            },
            toggleSubscribed: function(e) {
                var t = $(e.target),
                    n = r.multi.mine.get(t.data("path"));
                t.is(":checked") ? n.addSubreddit(this.options.srName) : n.removeSubreddit(this.options.srName)
            }
        }), r.multi.MultiCreateForm = Backbone.View.extend({
            events: {
                submit: "createMulti"
            },
            createMulti: function(e) {
                e.preventDefault();
                var t = this.$("input.multi-name").val();
                t = $.trim(t);
                if (!t) return;
                var n = this._createMulti(t);
                n.done(_.bind(function(e) {
                    this.trigger("create", e), this.options.navOnCreate && (window.location = e.get("path") + "#created")
                }, this)).fail(_.bind(function(e) {
                    var t = JSON.parse(e.responseText);
                    this.showError(t.explanation)
                }, this)), r.ui.showWorkingDeferred(this.$el, n)
            },
            _createMulti: function(e) {
                var t = new r.multi.MultiReddit({
                        path: r.multi.mine.pathByName(e)
                    }, {
                        isNew: !0
                    }),
                    n = new $.Deferred;
                return r.multi.mine.create(t, {
                    wait: !0,
                    success: _.bind(n.resolve, n),
                    error: function(e, t) {
                        n.reject(t)
                    }
                }), n
            },
            showError: function(e) {
                this.$(".error").text(_.unescape(e)).show()
            },
            focus: function() {
                this.$(".multi-name").focus()
            }
        }), r.multi.MultiCopyForm = r.multi.MultiCreateForm.extend({
            _createMulti: function(e) {
                return this.options.sourceMulti.copyTo(r.multi.mine, e)
            }
        }), r.multi.MultiRenameForm = r.multi.MultiCopyForm.extend({
            _createMulti: function(e) {
                return this.options.sourceMulti.renameTo(r.multi.mine, e)
            }
        }), r.multi.ListingChooser = Backbone.View.extend({
            events: {
                "click .create button": "createClick",
                "click .grippy": "toggleCollapsed"
            },
            initialize: function() {
                this.$el.addClass("initialized"), store.safeGet("ui.collapse.listingchooser") == 1 && this.toggleCollapsed(!0), store.safeSet("ui.collapse.listingchooser");
                var e = this.$(".contents").height(),
                    t = $("body").height();
                e > t && $("body").css("padding-bottom", e - t + 100)
            },
            createClick: function(e) {
                this.$(".create").is(".expanded") || (e.preventDefault(), this.$(".create").addClass("expanded"), this.createForm = new r.multi.MultiCreateForm({
                    el: this.$(".create form"),
                    navOnCreate: !0
                }), this.createForm.focus())
            },
            toggleCollapsed: function(e) {
                $("body").toggleClass("listing-chooser-collapsed", e), Backbone.ajax({
                    type: "POST",
                    url: "/api/set_left_bar_collapsed.json",
                    data: {
                        collapsed: $("body").is(".listing-chooser-collapsed")
                    }
                })
            }
        }), r.filter = {}, r.filter.init = function() {
            var e = $(".filtered-details");
            if (e.length) {
                var t = new r.filter.Filter({
                    path: e.data("path")
                });
                e.find(".subreddits a").each(function(e, n) {
                    t.subreddits.add({
                        name: $(n).data("name")
                    })
                }), t.fetch({
                    error: _.bind(r.multi.mine.create, r.multi.mine, t, {
                        wait: !0
                    })
                });
                var n = (new r.multi.SubredditList({
                    model: t,
                    itemView: r.filter.FilteredSubredditItem,
                    el: e
                })).render()
            }
        }, r.filter.Filter = r.multi.MultiReddit.extend({
            url: function() {
                return r.utils.joinURLs("/api/filter", this.id)
            }
        }), r.filter.FilteredSubredditItem = r.multi.MultiSubredditItem.extend({
            render: function() {
                return this.$el.append(this.template({
                    sr_name: this.model.get("name")
                })), this
            }
        }), r.recommend = {
            init: function() {
                $(".explore-item").each(function(e, t) {
                    new r.recommend.ExploreItem({
                        el: t
                    })
                })
            }
        }, r.recommend.Recommendation = Backbone.Model.extend(), r.recommend.RecommendationList = Backbone.Collection.extend({
            model: r.recommend.Recommendation,
            srNames: [],
            dismissed: [],
            fetchForSrs: function(e) {
                if (!e.length) {
                    this.srNames = [], this.reset([]);
                    return
                }
                this.srNames = e, this.fetchRecs()
            },
            fetchNewRecs: function() {
                var e = this.pluck("sr_name");
                this.dismissed = _.union(this.dismissed, e), this.fetchRecs()
            },
            fetchRecs: function() {
                var e = "/api/recommend/sr/" + this.srNames.join(",");
                this.fetch({
                    url: e,
                    data: {
                        omit: this.dismissed.join(",")
                    },
                    reset: !0,
                    error: _.bind(function() {
                        this.reset([])
                    }, this)
                })
            },
            clearHistory: function() {
                this.dismissed = []
            }
        }), r.recommend.RecommendationsView = Backbone.View.extend({
            collection: r.recommend.RecommendationList,
            tagName: "div",
            itemTemplate: _.template('<li class="rec-item"><a href="/r/<%- sr_name %>" title="<%- sr_name %>" target="_blank">/r/<%- sr_name %></a><button class="add add-rec" data-srname="<%- sr_name %>"></button></li>'),
            initialize: function() {
                this.listenTo(this.collection, "add remove reset", this.render)
            },
            events: {
                "click .add-rec": "onAddClick",
                "click .more": "showMore",
                "click .reset": "resetRecommendations"
            },
            render: function() {
                this.$(".recommendations").empty();
                if (this.collection.models.length > 0) {
                    this.$(".recs").show(), this.$(".endoflist").hide();
                    var e = this.$el,
                        t = this;
                    this.collection.each(function(e) {
                        this.$(".recommendations").append(t.itemTemplate({
                            sr_name: e.get("sr_name")
                        }))
                    }, this), this.$el.css({
                        opacity: 1
                    })
                } else this.collection.dismissed.length > 0 ? (this.$(".recs").hide(), this.$(".endoflist").show()) : this.$el.css({
                    opacity: 0
                });
                return this
            },
            resetRecommendations: function() {
                this.collection.clearHistory(), this.collection.fetchRecs()
            },
            onAddClick: function(e) {
                var t = $(e.target).data("srname");
                this.trigger("recs:select", {
                    srName: t
                })
            },
            showMore: function(e) {
                this.collection.fetchNewRecs()
            }
        }), r.recommend.ExploreItem = Backbone.View.extend({
            events: {
                "click .explore-feedback-dismiss": "dismissSubreddit",
                "click a": "recordClick"
            },
            dismissSubreddit: function(e) {
                var t = $(e.target).closest(".explore-item"),
                    n = t.data("sr_name"),
                    i = t.data("src");
                r.ajax({
                    type: "POST",
                    url: "/api/recommend/feedback",
                    data: {
                        type: "dis",
                        srnames: n,
                        src: i,
                        page: "explore"
                    }
                }), this.$(".explore-feedback-dismiss").css({
                    "font-weight": "bold"
                }), $(this.el).fadeOut("fast")
            },
            recordClick: function(e) {
                var t = $(e.target).closest(".explore-item"),
                    n = t.data("sr_name"),
                    i = t.data("src");
                r.ajax({
                    type: "POST",
                    url: "/api/recommend/feedback",
                    data: {
                        type: "clk",
                        srnames: n,
                        src: i,
                        page: "explore"
                    }
                })
            }
        }), r.actionForm = {
            init: function() {
                $("div.content").on("click", ".action-thing, .cancel-action-thing", this.toggleActionForm.bind(this)), $("div.content").on("submit", ".action-form", this.submitAction.bind(this))
            },
            toggleActionForm: function(e) {
                var t = e.target,
                    n = $(t),
                    r = n.thing(),
                    i = r.find("> .entry .action-form"),
                    s = n.data("action-form");
                e.stopPropagation(), e.preventDefault();
                if (i.length > 0) n.parents(".drop-choices").length ? i.show() : i.toggle();
                else {
                    var o = $(s),
                        u = o.clone(),
                        a = r.find("> .entry .buttons"),
                        f = r.thing_id();
                    u.attr("id", "action-thing-" + f), u.find('input[name="thing_id"]').val(f), u.insertAfter(a), u.show()
                }
            },
            submitAction: function(e) {
                var t = $(e.target).thing().find(".action-form"),
                    n = t.data("form-action");
                return post_pseudo_form(t, n)
            }
        }, r.fraud = {
            init: function() {
                $("div.content").on("click", ".action-thing", this.showReason.bind(this)), $("div.content").on("change", ".fraud-action-form input", this.validate.bind(this))
            },
            validate: function(e) {
                var t = $(e.target),
                    n = t.parents("form"),
                    r = n.find('[type="submit"]'),
                    i = n.find("input[name=refund]"),
                    s = n.find("input[name=fraud]:checked").val(),
                    o = s === "True";
                o ? i.removeAttr("disabled").focus() : i.prop("checked", !1).attr("disabled", "disabled"), s ? r.removeAttr("disabled") : r.attr("disabled", "disabled")
            },
            showReason: function(e) {
                var t = $(e.target),
                    n = t.thing(),
                    r = n.find("> .entry .action-form"),
                    i = r.find(".fraud-reason"),
                    s = t.attr("title");
                i.text(s)
            }
        }, r.report = {
            init: function() {
                $("div.content").on("change", ".report-action-form input", this.validate.bind(this)), $("div.content").on("click", ".reported-stamp.has-reasons", this.toggleReasons.bind(this))
            },
            toggleReasons: function(e) {
                $(e.target).parent().find(".report-reasons").toggle()
            },
            validate: function(e) {
                var t = $(e.target).thing(),
                    n = t.find("> .entry .report-action-form"),
                    r = n.find('[type="submit"]'),
                    i = n.find("[name=reason]:checked"),
                    s = n.find('[name="other_reason"]'),
                    o = i.val() === "other";
                r.removeAttr("disabled"), o ? s.removeAttr("disabled").focus() : s.attr("disabled", "disabled")
            }
        }, $(function() {
            r.actionForm.init(), r.fraud.init(), r.report.init()
        }),
        function(e, t) {
            function u(e) {
                return /^https?:\/\//.test(e) ? e : "https://" + location.host + "/" + e.replace(/^\//, "")
            }

            function a(e) {
                var t = {
                    live: !0,
                    parent: !1,
                    media: location.host,
                    created: (new Date).toISOString()
                };
                return e = _.defaults({}, e, t), e.comment = u(e.comment), e.link = u(e.link), _.extend({
                    html: n(e)
                }, e)
            }

            function f(e) {
                return JSON.stringify(_.pick(e, "live", "parent"))
            }

            function l(e, t) {
                var n = e.$.find("#embed-preview"),
                    r = typeof t != "string" ? f(t) : t;
                window.rembeddit.init({
                    track: !1
                }, function() {
                    var e = 0,
                        t = setInterval(function() {
                            var i = n.find("iframe:last-child"),
                                s = i.height();
                            e !== s ? e = s : (clearInterval(t), n.find("iframe").hide().last().show().attr("data-options", r), n.css("height", "auto"))
                        }, 100)
                })
            }
            var n = _.template(_.unescape(r.config.embed_inject_template), !1, {
                    escape: /%\(([^\n\)]+)\)s/g
                }),
                i = _.template('<h4  class="modal-title">' + _.escape(r._("Embed preview:")) + "</h4>" + '<div id="embed-preview">' + "<%= html %>" + "</div>" + "<% if (!root) { %>" + '<div class="c-checkbox">' + '<label class="remember">' + '<input type="checkbox" name="parent" <% if (parent) { %> checked <% } %>>' + _.escape(r._("Include parent comment.")) + "</label>" + "</div>" + "<% } %>" + '<div class="c-checkbox">' + '<input type="checkbox" name="live" <% if (!live) { %> checked <% } %> data-rerender="false" id="live-edits">' + '<label for="live-edits">' + _.escape(r._("Do not show comment if edited.")) + "&nbsp;" + '<a href="javascript: void 0;" class="c-toggle" data-toggle="#live-help">' + _.escape(r._("Learn more")) + "</a>" + "</label>" + '<div id="live-help" class="c-help-block c-toggle-content">' + "<p>" + _.escape(r._("When checked, if an embedded comment is later edited, the embedded comment text will be replaced by a link back to the current version of the comment on reddit.")) + "</p>" + "<p>" + '<a href="https://www.reddit.com/r/reddit.com/wiki/embeds">' + _.escape(r._("This parameter can be changed after embedding.")) + "</a>" + "</p>" + "</div>" + "</div>"),
                s = _.template('<h4 class="modal-title"><label for="embed-code">' + _.escape(r._("Copy this code and paste it into your website:")) + "</label>" + "</h4>" + '<textarea class="c-form-control" id="embed-code" rows="3" readonly>' + "<%- html %>" + "</textarea>"),
                o = _.template('<div class="reddit-embed"  data-embed-media="<%- media %>" <% if (parent) { %> data-embed-parent="true" <% } %><% if (live) { %> data-embed-live="true" <% } %> data-embed-created="<%- new Date().toISOString() %>"><a href="<%- comment %>">Comment</a> from discussion <a href="<%- link %>"><%- title %></a>.</div>'),
                c = new window.rembeddit.PixelTracker({
                    url: r.config.eventtracker_url
                });
            e("body").on("click", ".embed-comment", function(n) {
                var o = e(n.target),
                    u = o.data(),
                    h = a(u),
                    p = new r.ui.Popup({
                        className: "embed-modal",
                        content: i(h),
                        footer: s(h)
                    }),
                    d = p.$.find("textarea"),
                    v = p.$.find("#embed-preview"),
                    m = !1;
                p.$.find("[data-toggle]").togglable(), p.$.on("change", '[type="checkbox"]', function(n) {
                    var i = n.target.name,
                        s = e(n.target),
                        u = o.data(i);
                    u === t && (u = h[i]), o.data(n.target.name, !u);
                    var c = o.data(),
                        m = a(c),
                        g = f(m),
                        y = m.html,
                        b = v.height();
                    d.val(y);
                    if (s.data("rerender") !== !1) {
                        var w = '[data-options="' + r.utils.escapeSelector(g) + '"]',
                            E = v.find(w);
                        E.length ? E.show().siblings().hide() : (v.height(b).append(e(y).hide()), l(p, g))
                    }
                }), d.on("focus", function(t) {
                    e(this).select().one("mouseup", function(e) {
                        e.preventDefault()
                    });
                    if (!m) {
                        var n = o.data(),
                            i = a(n),
                            s = new Date,
                            u = s.getTime();
                        c.send({
                            event_topic: "embed",
                            event_name: "embed_create",
                            event_ts: u,
                            event_ts_utc_offset: s.getTimezoneOffset() / -60,
                            embed_type: i.parent ? "comment_and_parent" : "comment",
                            user_agent: navigator.userAgent,
                            user_id: r.config.user_id,
                            logged_in_status: !!r.config.logged,
                            sr_id: r.utils.fullnameToId(r.config.cur_site),
                            sr_name: r.config.post_site,
                            embed_id: r.utils.fullnameToId(o.thing_id()),
                            embed_created_ts: u,
                            embed_control: i.live,
                            embed_host_url: location.href,
                            embed_version: window.rembeddit.VERSION
                        }), m = !0
                    }
                }), p.on("closed.r.popup", function() {
                    p.$.remove()
                }), p.on("show.r.popup", function() {
                    v.find(".reddit-embed").hide()
                }), p.on("opened.r.popup", function() {
                    l(p, h)
                }), p.show()
            })
        }(window.jQuery), ! function(e) {
            "use strict";

            function i(e, t) {
                var n = document.createElement("a"),
                    r = $.url(e),
                    i = r.param();
                return Object.keys(t).forEach(function(e) {
                    i[e] = t[e]
                }), n.href = e, n.search = $.param(i), n.href
            }
            var t = _.template('<div class="post-sharing-option post-sharing-option-<%- name %>" data-post-sharing-option="<%- name %>"><div class="c-tooltip" role="tooltip"><div class="tooltip-arrow bottom"></div><div class="tooltip-inner"><%- tooltip %></div></div></div>'),
                n = _.template('<div class="c-form-control-feedback-wrapper" ref="<%- ref %>"><span class="c-form-control-feedback c-form-control-feedback-throbber"></span><span class="c-form-control-feedback c-form-control-feedback-error"></span><span class="c-form-control-feedback c-form-control-feedback-success"></span></div>'),
                r = _.template('<a href="javascript: void 0;" class="c-close c-hide-text">' + _.escape(e._("close this window")) + "</a>" + '<div class="post-sharing-main post-sharing-form" ref="$mainForm">' + "<% if (options) { %>" + '<div class="c-form-group">' + '<div class="post-sharing-label">' + _.escape(e._("Share with:")) + "</div>" + '<div class="post-sharing-options">' + "<% options.forEach(function(option) { %>" + "<%= option %>" + "<% }) %>" + "</div>" + "</div>" + "<% } %>" + "<% if (link) { %>" + '<div class="c-form-group">' + '<div class="post-sharing-label">' + _.escape(e._("Link:")) + "</div>" + '<input class="post-sharing-link-input c-form-control" ' + 'ref="$postSharingLinkInput" ' + 'name="link" ' + 'type="text" ' + "readonly " + 'value="<%- link %>">' + "</div>" + "<% } %> " + "</div>" + '<div class="post-sharing-email-form post-sharing-form" ref="$emailForm">' + '<p class="post-sharing-label">' + _.escape(e._("Share via email as %(username)s").format({
                    username: e.config.logged
                })) + "</p>" + '<div class="c-form-group">' + '<input class="post-sharing-recipient-input c-form-control" ' + 'ref="$shareTo" ' + 'name="recipient" type="text" ' + 'placeholder="name@example.com, name@example.com">' + n({
                    ref: "$shareToFeedback"
                }) + "</div>" + '<div class="c-form-group">' + '<textarea class="post-sharing-message-input c-form-control" ' + 'ref="$shareMessage" ' + 'name="message" ' + 'placeholder="' + _.escape(e._("add optional message")) + '"></textarea>' + n({
                    ref: "$messageFeedback"
                }) + "</div>" + '<div class="c-form-group">' + '<div class="post-sharing-buttons">' + '<button class="post-sharing-submit c-btn c-btn-primary c-pull-right">' + _.escape(e._("send")) + "</button>" + '<button class="post-sharing-cancel c-btn c-btn-secondary c-pull-right">' + _.escape(e._("cancel")) + "</button>" + "</div>" + n({
                    ref: "$requestStateFeedback"
                }) + '<div class="post-sharing-shareplane" ref="$shareplane">' + _.escape(e._("sent!")) + "</div>" + "</div>" + "</div>"),
                s = Backbone.Model.extend({
                    defaults: function() {
                        return {
                            errors: [],
                            options: null,
                            requestState: "UNSENT",
                            selectedOption: null,
                            link: null
                        }
                    }
                });
            e.ui.PostSharing = Backbone.View.extend({
                animationSpeed: 200,
                _template: r,
                _model: s,
                events: {
                    "click .post-sharing-link-input": "selectLinkInputText",
                    "copy .post-sharing-link-input": "fireCopyEvent",
                    "click .post-sharing-option": "setPostSharingOption",
                    "click .post-sharing-cancel": "clearPostSharingOption",
                    "click .post-sharing-submit": "shareToEmail",
                    "click .c-close": "close"
                },
                initialize: function() {
                    var e = this.options.$thing,
                        t = e.data("fullname"),
                        n = t.split("_")[1],
                        r = e.find(".entry a.title").text(),
                        i = e.find(".entry a.comments").attr("href");
                    this.thingData = {
                        fullname: t,
                        title: r,
                        link: i
                    };
                    var s = this.options.props || {};
                    s.link = this.getShareLink("link"), this.state = new this._model(s), this.listenTo(this.state, "change", this.render), this.initialRender()
                },
                initialRender: function() {
                    var e = this.state.toJSON();
                    e.options && (e.options = e.options.map(t)), this.$el.html(this._template(e)), this.refs = {};
                    var n = this.$el.find("[ref]");
                    n.toArray().forEach(function(e) {
                        var t = $(e),
                            n = t.attr("ref");
                        this.refs[n] = t
                    }, this), this.refs.$mainForm.css("display", "block"), this.render()
                },
                show: function() {
                    this.$el.slideDown(this.animationSpeed, "swing", function() {
                        this.trigger("show", this)
                    }.bind(this))
                },
                hide: function() {
                    this.$el.slideUp(this.animationSpeed, "swing", function() {
                        this.trigger("hide")
                    }.bind(this))
                },
                unmount: function() {
                    this.remove(), this.trigger("unmount", this)
                },
                close: function() {
                    this.once("hide", this.unmount.bind(this)), this.hide(), this.trigger("close")
                },
                setPostSharingOption: function(e) {
                    var t = $(e.target).closest(".post-sharing-option"),
                        n = t.data("post-sharing-option");
                    switch (n) {
                        case "email":
                            return this.state.set({
                                selectedOption: n
                            });
                        case "facebook":
                            return this.shareToFacebook();
                        case "twitter":
                            return this.shareToTwitter();
                        default:
                            this.close()
                    }
                },
                getShareLink: function(e) {
                    var t = {
                        ref: "share",
                        ref_source: e
                    };
                    return i(this.thingData.link, t)
                },
                shareToFacebook: function() {
                    var t = this.getShareLink("facebook"),
                        n = e.config.currentOrigin + "/share/close",
                        r = {
                            app_id: e.config.facebook_app_id,
                            display: "popup",
                            link: t,
                            description: this.thingData.title,
                            redirect_uri: n
                        },
                        s = i("https://www.facebook.com/dialog/feed", r);
                    this.openWebIntent(s, "facebook")
                },
                shareToTwitter: function() {
                    var e = this.getShareLink("twitter"),
                        t = "reddit",
                        n = this.thingData.title,
                        r = 25,
                        s = [n, "via", "@" + t].join(" "),
                        o = s.length + r,
                        u = 140,
                        a = 10,
                        f = n.length - (o - u) - 1;
                    s.length > u && (n = n.slice(0, Math.max(a, f)), n = n.trim() + "…");
                    var l = {
                            url: e,
                            text: n,
                            via: t
                        },
                        c = i("https://twitter.com/intent/tweet", l);
                    this.openWebIntent(c, "twitter")
                },
                openWebIntent: function(e, t) {
                    var n = window.innerWidth,
                        r = window.innerHeight,
                        i = 550,
                        s = 420,
                        o = {
                            height: s,
                            width: i,
                            left: n / 2 - i / 2,
                            top: r / 2 - s / 2
                        },
                        u = Object.keys(o).map(function(e) {
                            return e + "=" + o[e]
                        }).join(",");
                    window.open(e, t, u), this.trigger("web-intent", t)
                },
                shareToEmail: function() {
                    this.state.set({
                        requestState: "LOADING"
                    }), $.request("share", {
                        share_from: "",
                        replyto: "",
                        share_to: this.refs.$shareTo.val(),
                        message: this.refs.$shareMessage.val(),
                        parent: this.thingData.fullname,
                        api_type: "json"
                    }, function(e) {
                        if (this.state.get("requestState") !== "LOADING") return;
                        var t = e.json;
                        if (!t) throw "share api response error";
                        t.errors.length ? this.state.set({
                            errors: t.errors,
                            requestState: "DONE"
                        }) : (this.state.set({
                            errors: [],
                            requestState: "DONE"
                        }), setTimeout(function() {
                            this.close()
                        }.bind(this), 1500))
                    }.bind(this))
                },
                clearPostSharingOption: function(e) {
                    this.state.set({
                        requestState: "UNSENT",
                        selectedOption: null
                    })
                },
                selectLinkInputText: function() {
                    this.refs.$postSharingLinkInput.select(), this.trigger("link", "focus")
                },
                fireCopyEvent: function() {
                    this.trigger("link", "copy")
                },
                getFeedbackRef: function(e) {
                    switch (e) {
                        case "BAD_EMAIL":
                        case "BAD_EMAILS":
                        case "NO_EMAILS":
                            return this.refs.$shareToFeedback;
                        case "TOO_LONG":
                            return this.refs.$messageFeedback;
                        default:
                            return this.refs.$requestStateFeedback
                    }
                },
                render: function() {
                    var e = this.state.get("requestState"),
                        t = this.state.get("errors"),
                        n = this.state.changed,
                        r = this.state.get("selectedOption");
                    "selectedOption" in n && (r === "email" ? (this.refs.$mainForm.slideUp("fast"), this.refs.$emailForm.slideDown("fast")) : (this.refs.$mainForm.slideDown("fast"), this.refs.$emailForm.slideUp("fast"))), r === "email" && (this.refs.$shareToFeedback.stateify("clear"), this.refs.$messageFeedback.stateify("clear"), this.refs.$requestStateFeedback.stateify("clear"), t.length && t.forEach(function(e) {
                        var t = e[0],
                            n = e[1],
                            r = this.getFeedbackRef(t);
                        r.stateify("set", "error", n)
                    }, this), e === "LOADING" ? this.refs.$requestStateFeedback.stateify("set", "loading") : e === "DONE" && !t.length && (this.refs.$requestStateFeedback.stateify("set", "success"), this.refs.$emailForm.addClass("shared")))
                }
            }), $(function() {
                $("body").on("click", ".post-sharing-button", function(t) {
                    t.preventDefault();
                    var n = $(t.target),
                        r = n.closest(".thing"),
                        i = r.thing_id();
                    if (e.ui.activeShareMenu && e.ui.activeShareMenu.$el.is(":visible")) {
                        var s = e.ui.activeShareMenu.options.$thing[0] === r[0];
                        e.ui.activeShareMenu.close();
                        if (s) return
                    }
                    var o = [{
                        name: "facebook",
                        tooltip: e._("Share to %(name)s").format({
                            name: "Facebook"
                        })
                    }, {
                        name: "twitter",
                        tooltip: e._("Share to %(name)s").format({
                            name: "Twitter"
                        })
                    }];
                    e.config.logged && o.push({
                        name: "email",
                        tooltip: e._("Email to a Friend")
                    });
                    var u = new e.ui.PostSharing({
                        className: "post-sharing",
                        $thing: r,
                        props: {
                            options: o
                        }
                    });
                    r.find(".entry .buttons").after(u.el), e.ui.activeShareMenu = u, u.on("show", function() {
                        e.analytics.fireGAEvent("post-sharing", "open", i)
                    }), u.on("unmount", function() {
                        e.ui.activeShareMenu = null
                    }), u.on("close", function() {
                        var t = u.state.get("selectedOption") ? "close" : "cancel";
                        e.analytics.fireGAEvent("post-sharing", t, i)
                    }), u.on("web-intent", function(t) {
                        e.analytics.fireGAEvent("post-sharing", "share-to-" + t, i)
                    }), u.on("link", function(t) {
                        e.analytics.fireGAEvent("post-sharing", "link-" + t, i)
                    }), u.show()
                })
            })
        }(r), ! function(e) {
            function t(e) {
                return e.tagName === "A"
            }
            var n = Backbone.View.extend({
                    buttonSelector: ".expando-button",
                    expandoSelector: ".expando",
                    expanded: !1,
                    events: {
                        "click .expando-button": "toggleExpando"
                    },
                    constructor: function() {
                        Backbone.View.prototype.constructor.apply(this, _.toArray(arguments)), this.afterInitialize()
                    },
                    initialize: function() {
                        this.$button = this.$el.find(this.buttonSelector), this.$expando = this.$el.find(this.expandoSelector)
                    },
                    afterInitialize: function() {
                        this.options.expanded && this.expand()
                    },
                    toggleExpando: function(e) {
                        if (t(e.target)) return;
                        this.expanded ? this.collapse() : this.expand()
                    },
                    expand: function() {
                        this.$button.addClass("expanded").removeClass("collapsed"), this.expanded = !0, this.show()
                    },
                    show: function() {
                        this.$expando.show()
                    },
                    collapse: function() {
                        this.$button.addClass("collapsed").removeClass("expanded"), this.expanded = !1, this.hide()
                    },
                    hide: function() {
                        this.$expando.hide()
                    }
                }),
                r = n.extend({
                    events: _.extend({}, n.prototype.events, {
                        "click .open-expando": "expand"
                    }),
                    initialize: function() {
                        n.prototype.initialize.call(this), this.cachedHTML = this.$expando.data("cachedhtml"), this.loaded = !!this.cachedHTML, this.id = this.$el.thing_id(), $(document).on("hide_thing_" + this.id, function() {
                            this.collapse()
                        }.bind(this))
                    },
                    show: function() {
                        this.loaded ? this.$expando.html(this.cachedHTML) : $.request("expando", {
                            link_id: this.id
                        }, function(e) {
                            var t = $.unsafe(e);
                            this.cachedHTML = t, this.$expando.html(t), this.loaded = !0
                        }.bind(this), !1, "html", !0), this.$expando.show()
                    },
                    hide: function() {
                        this.$expando.hide().empty()
                    }
                }),
                i = n.extend({
                    buttonSelector: ".search-expando-button",
                    expandoSelector: ".search-expando",
                    events: {
                        "click .search-expando-button": "toggleExpando"
                    },
                    afterInitialize: function() {
                        var e = this.$expando.innerHeight(),
                            t = this.$expando.find(".search-result-body").innerHeight();
                        t <= e ? (this.$button.remove(), this.$expando.removeClass("collapsed"), this.undelegateEvents()) : this.options.expanded && this.expand()
                    },
                    show: function() {
                        this.$expando.removeClass("collapsed")
                    },
                    hide: function() {
                        this.$expando.addClass("collapsed")
                    }
                });
            $(function() {
                var e = [".linklisting", ".organic-listing", ".selfserve-subreddit-links"];
                $(e.join(",")).on("click", ".expando-button", function(e) {
                    if (t(e.target)) return;
                    var n = $(this).closest(".thing");
                    if (n.data("expando")) return;
                    n.data("expando", !0);
                    var i = new r({
                        el: n[0],
                        expanded: !0
                    })
                });
                var n = $(".search-expando-button").closest(".search-result-link");
                n.each(function() {
                    new i({
                        el: this
                    })
                })
            })
        }(r), r.saved = {}, r.saved.SaveCategories = Backbone.Collection.extend({
            model: Backbone.Model.extend({
                idAttribute: "category"
            }),
            url: "/api/saved_categories.json",
            fetchOnce: function() {
                return this._fetched || (this._fetched = this.fetch()), this._fetched
            },
            comparator: function(e) {
                return e.get("category")
            },
            parse: function(e) {
                return e.categories
            }
        }), r.saved.SaveDialog = r.ui.Bubble.extend({
            tagName: "form",
            className: "hover-bubble anchor-left save-selector",
            confirmTemplate: _.template('<label for="savedcategory"><%- label %></label><span class="throbber"></span><select><option value=""><%- placeholder %></option></select><input maxlength="20" class="savedcategory"  name="savedcategory" placeholder="<%- textplaceholder %>"><input type="submit" value="<%- save %>"><div class="error"></div>'),
            events: {
                click: "clicked",
                submit: "save",
                mouseout: "mouseout",
                mouseover: "cancelTimeout",
                "change select": "change"
            },
            mouseout: function() {
                this.$el.find("select, .savedcategory").is(":focus") || this.queueHide()
            },
            clicked: function(e) {
                e.stopPropagation()
            },
            initialize: function(e) {
                this.options = e, this.options.trackHover = !1, r.ui.Bubble.prototype.initialize.apply(this), r.saved.categories.fetchOnce().then(_.bind(this.show, this)), $("body").on("click.savedialog", _.bind(this.hideNow, this))
            },
            hideNow: function() {
                r.ui.Bubble.prototype.hideNow.apply(this), $("body").off("click.savedialog"), this.remove()
            },
            error: function() {
                this.$el.find("select, .savedcategory").attr("disabled", !1), this.$el.removeClass("working"), this.$el.find(".error").text(r._("Invalid category name"))
            },
            change: function(e) {
                var t = this.$el.find(".savedcategory"),
                    n = this.$el.find("option:selected").val();
                t.val(n).focus()
            },
            success: function() {
                var e = this.$parent.parents(".thing").find(".save-category");
                e.length && this.category ? (e.text("category: " + this.category), e.attr("href", "/user/" + r.config.logged + "/saved/" + this.category), e.show()) : e.hide(), r.saved.SaveButton.setSaved(this.$parent), this.category && (r.saved.categories.add({
                    category: this.category
                }), r.saved.categories.sort()), this.hide()
            },
            save: function(e) {
                e.preventDefault(), this.category = this.$el.find(".savedcategory").val(), this.$el.find("select, .savedcategory").attr("disabled", !0);
                if (!this.category) return this.success();
                this.$el.addClass("working"), r.ajax({
                    type: "POST",
                    url: "/api/save",
                    data: {
                        id: this.$parent.thing_id(),
                        category: this.category
                    },
                    success: this.success,
                    error: this.error,
                    context: this
                })
            },
            addCategory: function(e) {
                var t = e.get("category");
                this.$el.find("select").append($("<option>").val(t).text(t))
            },
            show: function() {
                r.ui.Bubble.prototype.show.apply(this), this.$el.find(".savedcategory").focus()
            },
            render: function() {
                this.$el.html(this.confirmTemplate({
                    label: r._("save category"),
                    placeholder: r._("no category"),
                    save: r._("save"),
                    textplaceholder: r._("new category")
                })), r.saved.categories.each(this.addCategory, this), this.$el.find("select").first().prop("selected", !0)
            }
        }), r.saved.SaveButton = {
            request: function(e, t, n) {
                r.ajax({
                    type: "POST",
                    url: "/api/" + t,
                    data: {
                        id: e.thing_id()
                    },
                    success: _.bind(n, this, e)
                })
            },
            toggleSaved: function(e) {
                this.isSaved(e) ? this.unsave(e) : this.save(e)
            },
            unsave: function(e) {
                this.request(e, "unsave", this.setUnsaved)
            },
            save: function(e) {
                this.request(e, "save", this.setSaved), r.config.gold && new r.saved.SaveDialog({
                    parent: e,
                    group: r.saved.SaveButton
                })
            },
            isSaved: function(e) {
                return e.thing().hasClass("saved")
            },
            setUnsaved: function(e) {
                var t = e.parents(".thing").find(".save-category").hide();
                e.text(r._("save")), e.thing().removeClass("saved")
            },
            setSaved: function(e) {
                e.text(r._("unsave")), e.thing().addClass("saved")
            }
        }, r.saved.categories = new r.saved.SaveCategories, r.saved.init = function() {
            $("body").on("click", ".save-button a, a.save-button", function(e) {
                e.stopPropagation(), e.preventDefault(), r.saved.SaveButton.toggleSaved($(this))
            })
        }, r.resAdvisory = {}, r.resAdvisory.minResVersion = [4, 3, 2, 1], r.resAdvisory.checkRESClick = function(e) {
            if (e.target.id == "viewImagesButton" || $(e.target).hasClass("expando-button")) r.resAdvisory.checkRESVersion() ? document.body.removeEventListener("click", r.resAdvisory.checkRESClick, !0) : (e.preventDefault(), e.stopPropagation(), alert("The version of Reddit Enhancement Suite you are using has a bug which makes expanding posts insecure to use. Please update Reddit Enhancement Suite to continue using post expandos.  Please visit /r/Enhancement for more information."))
        }, r.resAdvisory.checkRESVersion = _.memoize(function() {
            var e = $("#RESMainGearOverlay").length;
            if (!e) return !0;
            var t = $("#RESConsoleVersion").text();
            return t ? (t = t.substring(1).split("."), t = _.map(t, function(e) {
                return parseInt(e)
            }), t >= r.resAdvisory.minResVersion) : !1
        }), r.resAdvisory.init = function() {
            document.body.addEventListener && document.body.addEventListener("click", r.resAdvisory.checkRESClick, !0)
        }, ! function(e, t, n) {
            "use strict";

            function i() {
                return s(2)
            }

            function s(e) {
                var t = "",
                    n = "abcdefghijklmnopqrstuvwxyz0123456789";
                for (var r = 0; r < e; r++) t += n.charAt(Math.floor(Math.random() * n.length));
                return t
            }
            var r = "pc";
            n.cachePoisoning = {}, n.cachePoisoning.updateCanaryCookie = function() {
                var e = t.cookie(r);
                e || (e = i()), t.cookie(r, null, {
                    secure: n.config.https_forced,
                    domain: n.config.cur_domain
                }), t.cookie(r, e, {
                    secure: n.config.https_forced,
                    domain: n.config.cur_domain,
                    path: "/",
                    expires: 365
                })
            }, n.cachePoisoning.checkPoisoned = function() {
                var e = t.cookie(r);
                return e && n.config.poisoning_canary && e !== n.config.poisoning_canary ? !0 : !1
            }, n.cachePoisoning._parseHeaders = function(e) {
                var t = /^(.*?):[ \t]*([^\r\n]*)$/mg,
                    n = {},
                    r;
                while (r = t.exec(e)) {
                    var i = r[1].toLowerCase();
                    n[i] === undefined && (n[i] = []), n[i].push(r[2])
                }
                return n
            }, n.cachePoisoning.logPoisoning = function() {
                var e = {
                    report_mac: n.config.poisoning_report_mac,
                    poisoner_name: n.config.logged,
                    poisoner_id: n.config.user_id,
                    cache_policy: n.config.cache_policy,
                    poisoner_canary: n.config.poisoning_canary,
                    victim_canary: t.cookie(r),
                    render_time: n.config.server_time,
                    route_name: n.config.pageInfo.actionName,
                    source: "web",
                    url: window.location.href || "",
                    resp_headers: {}
                };
                t.ajax({
                    url: window.location.href,
                    xhr: function() {
                        var e = jQuery.ajaxSettings.xhr(),
                            t = e.setRequestHeader;
                        return e.setRequestHeader = function(e, n) {
                            if (e === "X-Requested-With") return;
                            t.call(this, e, n)
                        }, e
                    },
                    complete: function(t) {
                        if ((t.responseText || "").indexOf(n.config.modhash) !== -1) {
                            var r = t.getAllResponseHeaders();
                            e.resp_headers = n.cachePoisoning._parseHeaders(r)
                        }
                        e.resp_headers = JSON.stringify(e.resp_headers), n.ajax({
                            type: "POST",
                            url: "/web/poisoning.json",
                            data: e,
                            headers: {
                                "X-Loggit": !0
                            },
                            success: function() {
                                n.log("Sent cache poisoning report to server")
                            },
                            error: function(e, t, r) {
                                n.warn("Error sending cache poisoning report to server")
                            }
                        })
                    }
                })
            }, n.cachePoisoning.init = function() {
                n.config.logged && n.cachePoisoning.checkPoisoned() && n.cachePoisoning.logPoisoning(), n.cachePoisoning.updateCanaryCookie()
            }
        }(window, jQuery, r), r.messages = {}, r.messages.pollUnread = _.debounce(function(e) {
            e = e + 1 || 1;
            if (e > 20) {
                document.location = "/message/unread";
                return
            }
            r.ajax({
                type: "GET",
                url: "/api/me.json",
                success: function(t) {
                    t.data.has_mail ? r.messages.pollUnread(e) : document.location = "/message/unread"
                }
            })
        }, 2e3), r.messages.init = function() {
            $("a.mark-all-read").on("click", function(e) {
                var t = $(this);
                e.preventDefault(), e.stopPropagation();
                if (t.hasClass("disabled")) return;
                t.addClass("disabled"), t.parent().addClass("working"), r.ajax({
                    type: "POST",
                    url: "/api/read_all_messages",
                    data: {},
                    success: r.messages.pollUnread
                })
            })
        }, r.permissions = _.extend(r.permissions || {}, {
            moderator: {
                wiki: {
                    description: r.N_("manage the wiki and access to the wiki"),
                    title: r.N_("wiki")
                },
                access: {
                    description: r.N_("manage the lists of contributors and banned users"),
                    title: r.N_("access")
                },
                mail: {
                    description: r.N_("read and reply to moderator mail"),
                    title: r.N_("mail")
                },
                config: {
                    description: r.N_("edit settings, sidebar, css, images, and AutoModerator config"),
                    title: r.N_("config")
                },
                posts: {
                    description: r.N_("use the approve, remove, spam, distinguish, and nsfw buttons"),
                    title: r.N_("posts")
                },
                flair: {
                    description: r.N_("manage user flair, link flair, and flair templates"),
                    title: r.N_("flair")
                }
            },
            moderator_invite: {
                wiki: {
                    description: r.N_("manage the wiki and access to the wiki"),
                    title: r.N_("wiki")
                },
                access: {
                    description: r.N_("manage the lists of contributors and banned users"),
                    title: r.N_("access")
                },
                mail: {
                    description: r.N_("read and reply to moderator mail"),
                    title: r.N_("mail")
                },
                config: {
                    description: r.N_("edit settings, sidebar, css, images, and AutoModerator config"),
                    title: r.N_("config")
                },
                posts: {
                    description: r.N_("use the approve, remove, spam, distinguish, and nsfw buttons"),
                    title: r.N_("posts")
                },
                flair: {
                    description: r.N_("manage user flair, link flair, and flair templates"),
                    title: r.N_("flair")
                }
            }
        }), $(function() {
            if (!r.config.cursed) return;
            $(".midcol .arrow").on("mouseover", function(e) {
                var t = $(e.target),
                    n = t.clone().css("position", "absolute").css("margin", 0).css(t.offset()).appendTo(t.parents(".content"));
                t.css("opacity", 0), n.on("mouseover", function() {
                    var e = Math.PI * 2 * Math.random();
                    n.animate({
                        "margin-left": "+=" + 20 * Math.cos(e),
                        "margin-top": "+=" + 20 * Math.sin(e)
                    }, 100)
                })
            }), $(".buttons a, form button, .pretty-form button").prop("onclick", null).on("click focus", function(e) {
                return $(e.currentTarget).blur().prop("tabindex", "9999").css("white-space", "nowrap").animate({
                    "font-size": 0,
                    width: 0,
                    height: 0,
                    opacity: 0
                }, 200), !1
            })
        }), r.WebSocket = function(e) {
            this._url = e, this._connectionAttempts = 0, this.on({
                "message:refresh": this._onRefresh
            }, this)
        }, _.extend(r.WebSocket.prototype, Backbone.Events, {
            _backoffTime: 2e3,
            _maximumRetries: 9,
            _retryJitterAmount: 3e3,
            start: function() {
                var e = "WebSocket" in window;
                e && this._connect()
            },
            _connect: function() {
                r.debug("websocket: connecting"), this.trigger("connecting"), this._connectionStart = Date.now(), this._socket = new WebSocket(this._url), this._socket.onopen = _.bind(this._onOpen, this), this._socket.onmessage = _.bind(this._onMessage, this), this._socket.onclose = _.bind(this._onClose, this), this._connectionAttempts += 1
            },
            _sendStats: function(e) {
                if (!r.config.stats_domain) return;
                $.ajax({
                    type: "POST",
                    url: r.config.stats_domain,
                    data: JSON.stringify(e),
                    contentType: "application/json; charset=utf-8"
                })
            },
            _onOpen: function(e) {
                r.debug("websocket: connected"), this.trigger("connected"), this._connectionAttempts = 0, this._sendStats({
                    websocketPerformance: {
                        connectionTiming: Date.now() - this._connectionStart
                    }
                })
            },
            _onMessage: function(e) {
                var t = JSON.parse(e.data);
                r.debug('websocket: received "' + t.type + '" message'), this.trigger("message message:" + t.type, t.payload)
            },
            _onRefresh: function() {
                var e = Math.random() * 300 * 1e3;
                setTimeout(function() {
                    location.reload()
                }, e)
            },
            _onClose: function(e) {
                if (this._connectionAttempts < this._maximumRetries) {
                    var t = this._backoffTime * Math.pow(2, this._connectionAttempts),
                        n = Math.random() * this._retryJitterAmount - this._retryJitterAmount / 2,
                        i = Math.round(t + n);
                    r.debug("websocket: connection lost, reconnecting in " + i + "ms"), r.debug("(can't connect? Make sure you've allowed https access in your browser.)"), this.trigger("reconnecting", i), setTimeout(_.bind(this._connect, this), i)
                } else r.debug("websocket: maximum retries exceeded. bailing out"), this.trigger("disconnected");
                this._sendStats({
                    websocketError: {
                        error: 1
                    }
                })
            }
        }), r.thebutton = {
            _setTimer: function(e) {
                var t = "00000",
                    n = (e > 0 ? e : 0).toString(),
                    i = t.substring(0, t.length - n.length) + n;
                for (var s = 0; s < 4; s++) r.thebutton._timerTextNodes[s].nodeValue = i[s];
                e % 100 === 0 && r.thebutton._drawPie(e, 6e4)
            },
            _countdown: function() {
                r.thebutton._setTimer(r.thebutton._msLeft), r.thebutton._msLeft = Math.max(0, r.thebutton._msLeft - 10)
            },
            init: function() {
                if ($("#thebutton").length === 0) return;
                this._chart = new google.visualization.PieChart($(".thebutton-pie").get(0)), this._msLeft = 0, this._msgSecondsLeft = 0, this._tickTime = "", this._tickMac = "", this._lastMsLeft = Infinity, this._timerTextNodes = [$("#thebutton-s-10s").get(0).childNodes[0], $("#thebutton-s-1s").get(0).childNodes[0], $("#thebutton-s-100ms").get(0).childNodes[0], $("#thebutton-s-10ms").get(0).childNodes[0]], r.debug("in r.thebutton.init()"), this._started = !1, r.config.thebutton_websocket ? (r.debug("got thebutton_websocket"), this._websocket = new r.WebSocket(r.config.thebutton_websocket), this._websocket.on({
                    "message:expired": this._onExpired,
                    "message:not_started": this._onNotStarted,
                    "message:just_expired": this._onJustExpired,
                    "message:ticking": this._onTicking
                }, this), this._websocket.start()) : r.debug("didn't get thebutton_websocket");
                var e = $("#thebutton").parent();
                e.on("click", function(e) {
                    var t = $(this);
                    t.is(".active.locked") && (t.addClass("unlocking").removeClass("locked"), setTimeout(function() {
                        t.removeClass("unlocking").addClass("unlocked")
                    }, 300))
                }), $("#thebutton").on("click", function(t) {
                    t.preventDefault(), t.stopPropagation();
                    if (e.hasClass("pressed")) return;
                    r.thebutton._countdownInterval = window.clearInterval(r.thebutton._countdownInterval), r.thebutton._setTimer(6e4);
                    var n = {
                        seconds: $("#thebutton-timer").val(),
                        prev_seconds: r.thebutton._msgSecondsLeft,
                        tick_time: r.thebutton._tickTime,
                        tick_mac: r.thebutton._tickMac
                    };
                    $.request("press_button", n, function(e) {
                        console.log(e)
                    }), e.addClass("pressed").removeClass("unlocked"), r.thebutton.pulse()
                })
            },
            _drawPie: function(e, t) {
                var n = t - e,
                    r = google.visualization.arrayToDataTable([
                        ["", ""],
                        ["gone", n],
                        ["remaining", e]
                    ]),
                    i = {
                        chartArea: {
                            top: 0,
                            left: 0,
                            width: 70,
                            height: 70
                        },
                        pieSliceBorderColor: "transparent",
                        legend: "none",
                        pieSliceText: "none",
                        slices: {
                            0: {
                                color: "#C8C8C8"
                            },
                            1: {
                                color: "#4A4A4A"
                            }
                        },
                        enableInteractivity: !1
                    };
                this._chart.draw(r, i)
            },
            _onExpired: function(e) {
                var t = e.seconds_elapsed;
                r.debug("timer expired " + t + " ago"), $(".thebutton-wrap").removeClass("active").addClass("complete"), r.thebutton._countdownInterval = window.clearInterval(r.thebutton._countdownInterval), r.thebutton._setTimer(0)
            },
            _onNotStarted: function(e) {
                r.debug("timer hasn't started")
            },
            _onJustExpired: function(e) {
                r.debug("timer just expired"), $(".thebutton-wrap").removeClass("active").addClass("complete"), $el = $("#thebutton").parent(), $el.removeClass("unlocked locked logged-out pressed too-new not-active").addClass("denied has-expired")
            },
            _onTicking: function(e) {
                if (!r.thebutton._started) {
                    var t = $("#thebutton").parent();
                    t.is(".not-active, .locked") && t.removeClass("denied not-active").addClass("active locked"), r.thebutton._started = !0, r.thebutton._countdownInterval = window.setInterval(r.thebutton._countdown, 10)
                }
                var n = e.seconds_left;
                this._tickTime = e.now_str, this._msgSecondsLeft = n, this._tickMac = e.tick_mac;
                var i = e.participants_text,
                    s = n * 1e3;
                s > r.thebutton._lastMsLeft && this.pulse2(), r.thebutton._lastMsLeft = s, r.thebutton._msLeft = n * 1e3, r.thebutton._countdownInterval || (this._countdownInterval = window.setInterval(r.thebutton._countdown, 10)), r.debug(n + " seconds remaining"), r.debug(i + " users have pushed the button"), $("#thebutton-timer").val(parseInt(e.seconds_left, 10)), $(".thebutton-participants").text(e.participants_text)
            },
            pulse: function() {
                $els = $(".thebutton-container, .thebutton-pie-container"), $els.removeClass("pulse pulse2"), setTimeout(function() {
                    $els.addClass("pulse")
                }, 1)
            },
            pulse2: function() {
                var e = $(".thebutton-pie-container"),
                    t = this;
                e.removeClass("pulse pulse2"), setTimeout(function() {
                    e.addClass("pulse2")
                }, 1)
            },
            _testState: function(e, t) {
                t = t || 6e4, $el = $("#thebutton").parent();
                var n = "denied logged-out too-new has-expired pressed locked unlocked";
                $el.removeClass(n), r.thebutton._msLeft = t, r.thebutton.pulse();
                switch (e) {
                    case "logged-out":
                        $el.addClass("denied logged-out");
                        break;
                    case "too-new":
                        $el.addClass("denied too-new");
                        break;
                    case "has-expired":
                        $el.addClass("denied has-expired");
                        break;
                    case "pressed":
                        $el.addClass("pressed");
                        break;
                    case "unlocked":
                        $el.addClass("unlocked");
                        break;
                    case "locked":
                    default:
                        $el.addClass("locked")
                }
            }
        }, $(function() {
            r.thebutton.init()
        })
} catch (err) {
    r.sendError("Error running module", "reddit.js", ":", err)
};
r.i18n.addMessages({
    "wiki": [null, "wiki"],
    "full permissions": [null, "full permissions"],
    "you need to be signed in to vote on stuff": [null, "you need to be logged in to vote on things"],
    "invalid cvc": [null, "invalid cvc"],
    "missing city": [null, "missing city"],
    "an hour ago": [null, "an hour ago", "%(num)s hours ago"],
    "just now": [null, "just now"],
    "cancel": [null, "cancel"],
    "Learn more": [null, "Learn more"],
    "save category": [null, "save category"],
    "Embed preview:": [null, "Embed preview:"],
    "This parameter can be changed after embedding.": [null, "This parameter can be changed after embedding."],
    "an error occurred (status: %(status)s)": [null, "an error occurred (status: %(status)s)"],
    "categorize": [null, "categorize"],
    "yes": [null, "yes"],
    "add a subreddit to your multi.": [null, "add a subreddit to your multi"],
    "new category": [null, "new category"],
    "awesomeness goes here": [null, "awesomeness goes here"],
    "passwords do not match": [null, "passwords do not match"],
    "open this multi": [null, "open this multi"],
    "a day ago": [null, "a day ago", "%(num)s days ago"],
    "no permissions": [null, "no permissions"],
    "use the approve, remove, spam, distinguish, and nsfw buttons": [null, "use the approve, remove, spam, distinguish, and nsfw buttons"],
    "Copy this code and paste it into your website:": [null, "Copy this code and paste it into your website:"],
    "a month ago": [null, "a month ago", "%(num)s months ago"],
    "you need to be signed in to upvote stuff": [null, "you need to be logged in to upvote things"],
    "create a new multi": [null, "create a new multi"],
    "invalid expiration date": [null, "invalid expiration date"],
    "access": [null, "access"],
    "manage the lists of contributors and banned users": [null, "manage the lists of contributors and banned users"],
    "read and reply to moderator mail": [null, "read and reply to moderator mail"],
    "a minute ago": [null, "a minute ago", "%(num)s minutes ago"],
    "mail": [null, "mail"],
    "you need to be signed in to share stuff": [null, "you need to be logged in to share things"],
    "are you sure?": [null, "are you sure?"],
    "close this window": [null, "close this window"],
    "missing address": [null, "missing address"],
    "missing country": [null, "missing country"],
    "you need to be signed in to do that": [null, "you need to be logged in to do that"],
    "Password is fair": [null, "Password is okay"],
    "Password is weak": [null, "Password is weak"],
    "missing name": [null, "missing name"],
    "you need to be signed in to submit stuff": [null, "you need to be logged in to submit things"],
    "Password is good": [null, "Password is good"],
    "a year ago": [null, "a year ago", "%(num)s years ago"],
    "config": [null, "config"],
    "Do not show comment if edited.": [null, "Do not show comment if edited."],
    "invalid credit card number": [null, "invalid credit card number"],
    "edit settings, sidebar, css, images, and AutoModerator config": [null, "edit settings, sidebar, css, images, and AutoModerator config"],
    "Include parent comment.": [null, "Include parent comment."],
    "save": [null, "save"],
    "you need to be signed in to give gold": [null, "you need to be logged in to give reddit gold"],
    "try using our secure login form.": [null, "try using our secure login form."],
    "you need to be signed in to downvote stuff": [null, "you need to be logged in to downvote things"],
    "unsave": [null, "unsave"],
    "you need to be signed in to subscribe to stuff": [null, "you need to be logged in to subscribe to subreddits"],
    "no": [null, "no"],
    "posts": [null, "posts"],
    "manage user flair, link flair, and flair templates": [null, "manage user flair, link flair, and flair templates"],
    "check your inbox to confirm your subscription": [null, "check your inbox to confirm your subscription"],
    "manage the wiki and access to the wiki": [null, "manage the wiki and access to the wiki"],
    "Password is strong": [null, "Password is strong"],
    "an error occurred. please try again later! (status: %(status)s)": [null, "an error occurred. please try again later! (status: %(status)s)"],
    "Invalid category name": [null, "Invalid category name"],
    "flair": [null, "flair"],
    "no category": [null, "no category"],
    "send": [null, "send"],
    "When checked, if an embedded comment is later edited, the embedded comment text will be replaced by a link back to the current version of the comment on reddit.": [null, "When checked, if an embedded comment is later edited, the embedded comment text will be replaced by a link back to the current version of the comment on reddit."]
});