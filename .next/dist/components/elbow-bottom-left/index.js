'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('/Users/moheebzara/Projects/react-lcars/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/moheebzara/Projects/react-lcars/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/moheebzara/Projects/react-lcars/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/moheebzara/Projects/react-lcars/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/Users/moheebzara/Projects/react-lcars/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/Users/moheebzara/Projects/react-lcars/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _css = require('/Users/moheebzara/Projects/react-lcars/node_modules/next/dist/lib/css.js');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ElbowBottomLeft = function (_Component) {
  (0, _inherits3.default)(ElbowBottomLeft, _Component);

  function ElbowBottomLeft(props) {
    (0, _classCallCheck3.default)(this, ElbowBottomLeft);
    return (0, _possibleConstructorReturn3.default)(this, (ElbowBottomLeft.__proto__ || (0, _getPrototypeOf2.default)(ElbowBottomLeft)).call(this, props));
  }

  (0, _createClass3.default)(ElbowBottomLeft, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: mainElbow },
        _react2.default.createElement(
          'div',
          { className: elbowContainer },
          _react2.default.createElement('div', { className: button }),
          _react2.default.createElement(
            'div',
            { className: corner },
            _react2.default.createElement('div', { className: concave })
          )
        ),
        _react2.default.createElement('div', { className: elbow })
      );
    }
  }]);
  return ElbowBottomLeft;
}(_react.Component);

exports.default = ElbowBottomLeft;


var button = (0, _css2.default)({
  'background-color': '#99ccff',
  'width': '100px',
  'height': '80px',
  'margin-top': '10px'
});

var elbow = (0, _css2.default)({
  'background-color': '#99ccff',
  'width': '200px',
  'height': '30px',
  'border-bottom-left-radius': '2em'
});

var mainElbow = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'column',
  'width': '200px'
});

var elbowContainer = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
});

var corner = (0, _css2.default)({
  'background-color': '#99ccff',
  'width': '30px',
  'height': '30px',
  'position': 'relative',
  'display': 'flex'
});
var concave = (0, _css2.default)({
  'background-color': 'black',
  'width': '30px',
  'height': '30px',
  'border-bottom-left-radius': '2em',
  'top': 0,
  'right': 0
});