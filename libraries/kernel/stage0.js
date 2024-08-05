/****************************************
*                                       *
* Windows 96 - b13202.cff11448          *
* Copyright (c) SYSTEM 36 2024.         *
*                                       *
* All external licenses apply           *
*                                       *
*****************************************/
function S0_Start() {}
(function(target) {
    var testMap = {
        arrowFunc: function() {
            return 1 === eval("(()=>{ return 1; })()")
        },
        constVar: function() {
            return 1 === eval("const x = 1; x;")
        },
        es6Class: function() {
            return 1 === eval("class x { y() { return 1; } }; new x().y();")
        },
        stringInterpol: function() {
            return "1" === eval("`${1}`")
        },
        asyncFunc: function() {
            return eval("typeof (async function(){}) == 'function'")
        },
        webAssembly: function() {
            return "undefined" != typeof WebAssembly
        },
        promise: function() {
            return "undefined" != typeof Promise
        },
        indexedDb: function() {
            return "undefined" != typeof indexedDB
        },
        fetch: function() {
            return "undefined" != typeof fetch
        },
        ofLoop: function() {
            return 1 == eval("let r = 0; for(let x of [3,3,1,2]) { if(x == 1) r = 1; }; r;")
        },
        querySelector: function() {
            return void 0 !== document.querySelector
        }
    }
      , clMap = [{
        features: ["fetch", "querySelector"]
    }, {
        features: ["arrowFunc", "constVar", "ofLoop", "promise", "es6Class", "stringInterpol"]
    }, {
        features: ["asyncFunc"]
    }];
    function runTest(e) {
        if (!testMap[e])
            throw new Error("Invalid test name.");
        try {
            return testMap[e]()
        } catch (e) {
            return !1
        }
    }
    function determineCL() {
        for (var e = 0, t = 0; t < clMap.length; t++) {
            for (var n = 0; n < clMap[t].features.length; n++)
                if (!runTest(clMap[t].features[n]))
                    return e;
            e++
        }
        return e
    }
    target.kutil = {
        cl: {
            determineCL: determineCL,
            runTest: runTest
        }
    }
}
)(window),
function(e) {
    let t;
    try {
        if (t = localStorage,
        null == t)
            throw new Error;
        localStorage.getItem("Test")
    } catch (e) {
        t = {
            getItem: ()=>null,
            setItem: ()=>{}
            ,
            removeItem: ()=>{}
        }
    }
    function n() {
        const e = t.getItem("sysrom:$fm");
        return e || t.setItem("sysrom:$fm", "[]"),
        JSON.parse(e) || []
    }
    e.kutil.sysrom = {
        ls: n,
        exists: function(e) {
            return null != n().find((t=>t.n == e))
        },
        write: function(e, r) {
            const o = n();
            let s = o.find((t=>t.n == e));
            s && o.splice(o.indexOf(s), 1),
            o.push({
                n: e,
                l: r.length
            }),
            t.setItem("sysrom:" + e, r),
            t.setItem("sysrom:$fm", JSON.stringify(o))
        },
        read: function(e) {
            return t.getItem("sysrom:" + e) || ""
        },
        rm: function(e) {
            const r = n();
            let o = r.find((t=>t.n == e));
            o && (r.splice(r.indexOf(o), 1),
            t.removeItem("sysrom:" + e),
            t.setItem("sysrom:$fm", JSON.stringify(r)))
        }
    }
}(window),
function(e) {
    let t;
    try {
        t = null != localStorage["system-flags"] ? JSON.parse(localStorage.getItem("system-flags")) : []
    } catch (e) {
        t = []
    }
    e.kutil.sysflags = {
        has: function(e) {
            return t.includes(e)
        }
    }
}(window);
