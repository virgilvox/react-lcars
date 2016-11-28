'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/moheebzara/Projects/react-lcars/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    'WHOA!'
  );
};
    if (module.hot) {
      module.hot.accept()

      var Component = module.exports.default || module.exports
      Component.__route = "/other/yo"

      if (module.hot.status() !== 'idle') {
        var components = next.router.components
        for (var r in components) {
          if (!components.hasOwnProperty(r)) continue

          if (components[r].Component.__route === "/other/yo") {
            next.router.update(r, Component)
          }
        }
      }
    }
  