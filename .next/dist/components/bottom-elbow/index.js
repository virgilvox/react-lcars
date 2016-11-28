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

var BottomElbow = function (_Component) {
  (0, _inherits3.default)(BottomElbow, _Component);

  function BottomElbow(props) {
    (0, _classCallCheck3.default)(this, BottomElbow);
    return (0, _possibleConstructorReturn3.default)(this, (BottomElbow.__proto__ || (0, _getPrototypeOf2.default)(BottomElbow)).call(this, props));
  }

  (0, _createClass3.default)(BottomElbow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: main },
        _react2.default.createElement(
          'div',
          { className: topBar },
          _react2.default.createElement('div', { className: elbow }),
          _react2.default.createElement('div', { className: square }),
          _react2.default.createElement('div', { className: segment1 }),
          _react2.default.createElement('div', { className: segment2 }),
          _react2.default.createElement('div', { className: segment3 }),
          _react2.default.createElement('div', { className: end })
        ),
        _react2.default.createElement(
          'div',
          { className: topBar },
          _react2.default.createElement(
            'div',
            { className: secondary },
            _react2.default.createElement('div', { className: firstButton }),
            _react2.default.createElement('div', { className: secondButton }),
            _react2.default.createElement('div', { className: thirdButton }),
            _react2.default.createElement('div', { className: fourthButton })
          ),
          _react2.default.createElement('div', { className: corner })
        )
      );
    }
  }]);
  return BottomElbow;
}(_react.Component);

exports.default = BottomElbow;


var firstButton = (0, _css2.default)({
  'background-color': '#cc6666',
  'width': '100px',
  'height': '80px'
});

var secondButton = (0, _css2.default)({
  'background-color': '#cc6666',
  'width': '100px',
  'height': '180px',
  'margin-top': '10px'
});

var thirdButton = (0, _css2.default)({
  'background-color': '#FFA600',
  'width': '100px',
  'height': '30px',
  'margin-top': '10px'
});

var fourthButton = (0, _css2.default)({
  'background-color': '#cc6666',
  'width': '100px',
  'height': '100px',
  'margin-top': '10px'
});

var elbow = (0, _css2.default)({
  'background-color': '#cc6666',
  'width': '200px',
  'height': '30px',
  'border-top-left-radius': '2em'
});

var segment1 = (0, _css2.default)({
  'background-color': '#cc6666',
  'margin-left': '10px',
  'width': '100px',
  'height': '10px'
});

var segment2 = (0, _css2.default)({
  'background-color': '#fc6',
  'margin-left': '10px',
  'width': '300px',
  'height': '30px'
});

var segment3 = (0, _css2.default)({
  'background-color': '#f90',
  'margin-left': '10px',
  'width': '120px',
  'height': '30px'
});

var square = (0, _css2.default)({
  'background-color': '#f90',
  'margin-left': '10px',
  'width': '30px',
  'height': '30px'
});
var main = (0, _css2.default)({
  'display': 'flex',
  'margin-top': '10px',
  'flex-direction': 'column'
});

var secondary = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'column'
});

var topBar = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-start'
});

var corner = (0, _css2.default)({
  'background-color': 'black',
  'width': '30px',
  'height': '30px',
  'border-bottom-left-radius': '2em'
});

var end = (0, _css2.default)({
  'background-color': '#fc6',
  'width': '60px',
  'height': '30px',
  'margin-left': '10px',
  'border-bottom-right-radius': '2em',
  'border-top-right-radius': '2em'
});