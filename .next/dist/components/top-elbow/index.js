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

var _topLabel = require('./top-label');

var _topLabel2 = _interopRequireDefault(_topLabel);

var _elbowBottomLeft = require('../elbow-bottom-left');

var _elbowBottomLeft2 = _interopRequireDefault(_elbowBottomLeft);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopElbow = function (_Component) {
  (0, _inherits3.default)(TopElbow, _Component);

  function TopElbow(props) {
    (0, _classCallCheck3.default)(this, TopElbow);
    return (0, _possibleConstructorReturn3.default)(this, (TopElbow.__proto__ || (0, _getPrototypeOf2.default)(TopElbow)).call(this, props));
  }

  (0, _createClass3.default)(TopElbow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: main },
        _react2.default.createElement(
          'div',
          { className: firstButton },
          _react2.default.createElement(
            'a',
            (0, _extends3.default)({ className: text }, (0, _glamor.style)({ fontFamily: family })),
            'Button 1'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: elbowAndNav },
          _react2.default.createElement(_elbowBottomLeft2.default, null),
          _react2.default.createElement(
            'div',
            { className: navBar },
            _react2.default.createElement('div', { className: segment1 }),
            _react2.default.createElement('div', { className: segment2 }),
            _react2.default.createElement('div', { className: segment3 }),
            _react2.default.createElement('div', { className: end })
          )
        )
      );
    }
  }]);
  return TopElbow;
}(_react.Component);

exports.default = TopElbow;


var firstButton = (0, _css2.default)({
  'background-color': '#cc99cc',
  'width': '100px',
  'height': '40px',
  'margin-right': '400px'
});

var segment1 = (0, _css2.default)({
  'background-color': '#FFA600',
  'margin-left': '50px',
  'width': '100px',
  'height': '10px'
});

var segment2 = (0, _css2.default)({
  'background-color': '#cc6666',
  'margin-left': '10px',
  'width': '300px',
  'height': '30px'
});

var segment3 = (0, _css2.default)({
  'background-color': '#cc99cc',
  'margin-left': '10px',
  'width': '120px',
  'height': '30px'
});

var main = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'column'
});

var navBar = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
});

var elbowAndNav = (0, _css2.default)({
  'display': 'flex',
  'flex-direction': 'row',
  'align-items': 'flex-end'
});

var end = (0, _css2.default)({
  'background-color': '#fc6',
  'width': '60px',
  'height': '30px',
  'margin-left': '10px',
  'border-bottom-right-radius': '2em',
  'border-top-right-radius': '2em'
});

var text = (0, _css2.default)({
  'color': 'black',
  'display': 'flex',
  'font-size': '160%'
});

var family = (0, _glamor.fontFace)({
  fontFamily: 'Okuda',
  fontStyle: 'normal',
  src: "url('https://s3-us-west-2.amazonaws.com/lcars-react/lcars.ttf')"
});