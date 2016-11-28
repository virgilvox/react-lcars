'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('/Users/moheebzara/Projects/react-lcars/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopLabel = function (_Component) {
  (0, _inherits3.default)(TopLabel, _Component);

  function TopLabel(props) {
    (0, _classCallCheck3.default)(this, TopLabel);
    return (0, _possibleConstructorReturn3.default)(this, (TopLabel.__proto__ || (0, _getPrototypeOf2.default)(TopLabel)).call(this, props));
  }

  (0, _createClass3.default)(TopLabel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: main },
        _react2.default.createElement('div', { className: leftCap }),
        _react2.default.createElement('div', { className: segment }),
        _react2.default.createElement(
          'div',
          { className: textArea },
          _react2.default.createElement(
            'h1',
            (0, _extends3.default)({ className: text }, (0, _glamor.style)({ fontFamily: family })),
            '01:06'
          )
        ),
        _react2.default.createElement('div', { className: rightCap })
      );
    }
  }]);
  return TopLabel;
}(_react.Component);

exports.default = TopLabel;


var segment = (0, _css2.default)({
  'background-color': '#cc99cc',
  'margin-left': '10px',
  'width': '100px',
  'height': '40px'
});

var text = (0, _css2.default)({
  'color': '#f90',
  'display': 'flex',
  'font-size': '250%'
});

var textArea = (0, _css2.default)({
  'background-color': 'black',
  'width': '80px',
  'height': '40px',
  'align-items': 'center',
  'display': 'flex',
  'justify-content': 'center'
});

var family = (0, _glamor.fontFace)({
  fontFamily: 'Okuda',
  fontStyle: 'normal',
  src: "url('https://s3-us-west-2.amazonaws.com/lcars-react/lcars.ttf')"
});

var main = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
});

var leftCap = (0, _css2.default)({
  'background-color': '#cc99cc',
  'width': '40px',
  'height': '40px',
  'margin-left': '10px',
  'border-bottom-left-radius': '2em',
  'border-top-left-radius': '2em'
});

var rightCap = (0, _css2.default)({
  'background-color': '#cc99cc',
  'width': '40px',
  'height': '40px',
  'border-bottom-right-radius': '2em',
  'border-top-right-radius': '2em'
});