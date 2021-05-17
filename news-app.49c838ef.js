parcelRequire = (function (e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && 'string' == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = 'MODULE_NOT_FOUND'), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    '2iMt': [
      function (require, module, exports) {
        module.exports = {
          header: '_header_a2b22',
          header__avatar: '_header__avatar_a2b22',
          flex__center: '_flex__center_a2b22',
          flex__start: '_flex__start_a2b22',
          flex__space_between: '_flex__space_between_a2b22',
          main: '_main_a2b22',
          news__picture: '_news__picture_a2b22',
          width_100: '_width_100_a2b22',
          width_80: '_width_80_a2b22',
          border_bottom: '_border_bottom_a2b22',
        };
      },
      {},
    ],
    Focm: [
      function (require, module, exports) {
        'use strict';
        var e = n(require('./style.css'));
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        module.hot && module.hot.accept();
        const t =
            'https://free-news.p.rapidapi.com/v1/search?q=*&lang=uk&country=ua&page_size=100&',
          o = document.querySelector('.app-root'),
          a = {
            q: '*',
            topic: 'default',
            lang: 'default',
            country: 'default',
            page_size: '75',
            from: '',
          };
        function i(e) {
          return window.localStorage.getItem(`${e}`);
        }
        function l(e, n) {
          return window.localStorage.setItem(e, n);
        }
        Object.keys(a).forEach(e => {
          l(e, a[e]);
        });
        const r = e => ('' === e.trim() ? '*' : e.trim()),
          u = e => {
            l(e.target.id, r(e.target.value)),
              e.target.value &&
                (e.target.querySelector(`option[value=${e.target.value}]`).selected = !0);
          };
        window.setValueInLocalStorage = u;
        const s = e => {
            e.preventDefault(), window.setValueInLocalStorage(e);
          },
          p = e => (0 != i(`${e}`) && 'default' !== i(`${e}`) ? `${e}=${i(`${e}`)}&` : ''),
          d = () => {
            let e = 'https://free-news.p.rapidapi.com/v1/search?';
            return (
              Object.keys(a)
                .filter(e => 'from' !== e)
                .map(n => (e += p(n))),
              '' !== i('from') ? (e += `&from=${i('from').replaceAll('-', '/')}`) : e
            );
          },
          c = (e = t) => {
            fetch(`${e}`, {
              method: 'GET',
              headers: {
                'x-rapidapi-key': '49eea92340msheec5dc13140a88ap1ce853jsn5615cee3407b',
                'x-rapidapi-host': 'free-news.p.rapidapi.com',
              },
            })
              .then(e => e.json())
              .catch(e => {})
              .then(e => {
                L(e.articles);
              });
          };
        c();
        const v = e => 'function' == typeof e,
          f = e => (null === e ? '' : e),
          m = () => 'https://via.placeholder.com/450x250.png?text=NoImage',
          h = e =>
            f(e).includes('https')
              ? f(e)
              : f(e).includes('http')
              ? f(e).replace('http', 'https')
              : 'https://via.placeholder.com/450x250.png?text=NoImage',
          g = () => {
            c(d());
          },
          w = e => {
            e.preventDefault(), window.someHamdler();
          },
          $ = e => (v(e) ? e() : e),
          y = e => {
            if (e) return e.replace(' ', 'T');
          },
          b = (e, n) => Date.parse(y(n.published_date)) - Date.parse(y(e.published_date)),
          _ = e => Date.parse(y(e.published_date)) <= Date.now();
        function S(e) {
          e.preventDefault(),
            Object.keys(a).forEach(e => {
              'q' !== e && 'page_size' !== e && 'from' !== e && l(e, 'default'),
                'q' === e && l(e, '*'),
                'from' === e && l(e, '');
            });
        }
        (window.someHamdler = g), (window.resetFilters = S), (window.setSelectedFilters = I);
        const q = e => {
          window.resetFilters(e), window.setSelectedFilters();
        };
        function k(e) {
          l(e.target.id, e.target.value);
        }
        window.queryParamFromHandler = k;
        const x = e => {
          e.preventDefault(), window.queryParamFromHandler(e);
        };
        function C(e) {
          l(e.target.id, e.target.value);
        }
        window.pageSizeHandler = C;
        const D = e => {
            e.preventDefault(), window.pageSizeHandler(e);
          },
          j = e => e.sort(b).filter(_);
        function z(n) {
          return `\n    <header class="\n    ${e.default.header}\n    ">\n    <div class="${
            e.default.flex__center
          } ${e.default.width_100} ${e.default.border_bottom}">\n      <div class="${
            e.default.flex__space_between
          } ${
            e.default.width_80
          }">\n        <img style=" height: 50px;" src="https://archive.org/download/news-logo/news-logo.png" alt="logo"/>\n        ${
            n.length > 0 ? n.map(e => $(e)).join('') : ''
          }\n      </div>\n    </div>\n    <form>\n    <div class="">\n    <label>Keyword <input type="text" name="search" value="*" id="q" onChange="(${s})(event)"/></label>\n    </div>\n    <div class="">\n    <label>Category <select name="topic" id="topic" default="default" onChange="(${s})(event)">\n    <option value="default">Any</option>\n    <option value="business">Business</option>\n    <option value="beauty">Beauty</option>\n    <option value="entertainment">Entertainment</option>\n    <option value="economics">Economics</option>\n    <option value="finance">Finance</option>\n    <option value="food">Food</option>\n    <option value="news">General</option>\n    <option value="music">Music</option>\n    <option value="politics">Politics</option>\n    <option value="science">Science</option>\n    <option value="sport">Sport</option>\n    <option value="tech">Technology</option>\n    <option value="travel">Travel</option>\n    <option value="world">World</option>\n    </select></label>\n    </div>\n    <div class="">\n    <label>Language <select name="lang" id="lang" default="default" onChange="(${s})(event)">\n    <option value="default">Any</option>\n    <option value="uk">Ukrainian </option>\n    <option value="de">German</option>\n    <option value="en">English</option>\n    <option value="ru">Russian</option>\n    <option value="it">Italian </option>\n    <option value="lt">Lithuanian </option>\n    <option value="pt">Portuguese</option>\n    <option value="es">Espanian</option>\n    <option value="cn">Chinese</option>\n    </select></label>\n    </div>\n    <div class="">\n    <label>Country <select name="country" default="default" id="country" onChange="(${s})(event)">\n    <option value="default">Any</option>\n    <option value="ua">Ukraine</option>\n    <option value="us">USA</option>\n    <option value="ru">Russia</option>\n    <option value="de">Germany</option>\n    <option value="gb">Great Britain</option>\n    <option value="it">Italy</option>\n    <option value="lt">Lithuania</option>\n    <option value="pt">Portugal</option>\n    <option value="sp">Spain</option>\n    <option value="ch">China</option>\n    </select></label>\n    </div>\n    <div class="">\n    <label>Page size <input style="width: 7vw" type="range" min="25" max="100" value="50" name="page_size" id="page_size"\n    onChange="(${D})(event)"></label>\n    </div>\n    <div class="">\n    <label>From date <input type="date" name="from" id="from" value="" onChange="(${x})(event)"></label>\n    </div>\n    <div class="">\n    <input style="background-color: #C8E6C9;" type="submit" value="Search" onClick="(${w})(event)"/>\n    <button style="background-color: #ffcdd2;" onClick="(${q})(event)">Reset</button>\n    </div>\n    </form>\n    </header>\n  `;
        }
        function E() {
          return `\n  <div class="${e.default.flex__space_between}">\n    <div>\n    <img class="${e.default.header__avatar}" src="https://img2.freepng.ru/20180720/ivv/kisspng-computer-icons-user-profile-avatar-job-icon-5b521c567f49d7.5742234415321078625214.jpg" alt="user">\n    </div>  \n    <button>Log In</button>\n  </div>\n  `;
        }
        function F(n) {
          return `\n  <main class="${e.default.main}">\n  ${
            void 0 === n
              ? '<h3>No matches for your search</h3>'
              : j(n).length > 0
              ? j(n)
                  .map(
                    n =>
                      `\n              <div class=" ${
                        e.default.flex__start
                      }">\n                <img class="${e.default.news__picture}" src="${h(
                        n.media,
                      )}">\n                <div>\n                  <h2><a href="${
                        n.link
                      }" target="_blank">${n.title}</a></h2>\n                  <div>${new Date(
                        f(n.published_date),
                      ).toLocaleDateString()} \n                       ${new Date(
                        f(n.published_date),
                      ).toLocaleTimeString()}\n                   </div>\n                  <div class="${
                        e.default.flex__space_between
                      }">\n                    <div>Автор: <strong>${f(
                        n.author,
                      )}</strong></div>\n                    <div><strong>${f(
                        n.clean_url,
                      )}</strong></div>\n                  </div><br/>\n                    <div>${f(
                        n.summary,
                      )}</div>\n                </div>\n              </div>\n              `,
                  )
                  .join('')
              : '<h3>No matches for your search</h3>'
          }\n</main>`;
        }
        function I() {
          Object.keys(a).forEach(e => {
            'q' !== e &&
              'page_size' !== e &&
              'from' !== e &&
              (document
                .querySelector(`#${e}`)
                .querySelector(`option[value=${i(e)}]`).selected = !0),
              'q' === e &&
                ('' !== i(e)
                  ? (document.querySelector(`#${e}`).value = `${i(e)}`)
                  : (document.querySelector(`#${e}`).value = '*')),
              (document.querySelector(`#${e}`).value = i(`${e}`));
          });
        }
        function L(e) {
          (o.innerHTML = `\n    ${z([E])}\n    ${F(e)}\n`), I();
        }
      },
      { './style.css': '2iMt' },
    ],
  },
  {},
  ['Focm'],
  null,
);
//# sourceMappingURL=news-app.49c838ef.js.map
