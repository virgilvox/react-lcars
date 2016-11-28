'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/moheebzara/Projects/react-lcars/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _button = require('../components/button');

var _button2 = _interopRequireDefault(_button);

var _topElbow = require('../components/top-elbow');

var _topElbow2 = _interopRequireDefault(_topElbow);

var _bottomElbow = require('../components/bottom-elbow');

var _bottomElbow2 = _interopRequireDefault(_bottomElbow);

var _css = require('/Users/moheebzara/Projects/react-lcars/node_modules/next/dist/lib/css.js');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: style },
    _react2.default.createElement(_topElbow2.default, null),
    _react2.default.createElement(_bottomElbow2.default, null)
  );
};

var style = (0, _css2.default)({
  'background-color': 'black',
  'height': '800px'
});
    if (module.hot) {
      module.hot.accept()

      var Component = module.exports.default || module.exports
      Component.__route = "/"

      if (module.hot.status() !== 'idle') {
        var components = next.router.components
        for (var r in components) {
          if (!components.hasOwnProperty(r)) continue

          if (components[r].Component.__route === "/") {
            next.router.update(r, Component)
          }
        }
      }
    }
  