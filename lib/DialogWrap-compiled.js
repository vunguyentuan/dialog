'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = require('react');
var Dialog = require('./Dialog-compiled');

function noop() {}

function copy(obj, fields) {
  var ret = {};
  fields.forEach(function (f) {
    if (obj[f] !== undefined) {
      ret[f] = obj[f];
    }
  });
  return ret;
}

var DialogWrap = (function (_React$Component) {
  function DialogWrap(props) {
    _classCallCheck(this, DialogWrap);

    _get(Object.getPrototypeOf(DialogWrap.prototype), 'constructor', this).call(this, props);
    this.state = {
      visible: this.props.visible
    };
    this.requestClose = this.requestClose.bind(this);
  }

  _inherits(DialogWrap, _React$Component);

  _createClass(DialogWrap, [{
    key: 'getDialogContainer',
    value: function getDialogContainer() {
      if (!this.dialogContainer) {
        this.dialogContainer = document.createElement('div');
        document.body.appendChild(this.dialogContainer);
      }
      return this.dialogContainer;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.state.visible !== props.visible) {
        if (props.visible) {
          this.show();
        } else {
          this.close();
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.visible && !nextState.visible) {
        return false;
      }
      return true;
    }
  }, {
    key: 'show',
    value: function show() {
      if (!this.state.visible) {
        var props = this.props;
        this.setState({
          visible: true
        }, function () {
          props.onShow();
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.state.visible) {
        var props = this.props;
        this.setState({
          visible: false
        }, function () {
          props.onClose();
        });
      }
    }
  }, {
    key: 'requestClose',
    value: function requestClose() {
      if (this.props.onBeforeClose(this) !== false) {
        this.close();
      }
    }
  }, {
    key: 'renderDialog',
    value: function renderDialog() {
      var props = this.props;
      var dialogProps = copy(props, ['className', 'closable', 'align', 'prefixCls', 'style', 'width', 'height', 'zIndex']);
      var dialogElement = React.createElement(
        Dialog,
        _extends({
          visible: this.state.visible
        }, dialogProps, {
          onClose: this.requestClose }),
        props.children
      );
      this.dialogInstance = React.render(dialogElement, this.getDialogContainer());
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
      if (this.state.visible) {
        this.props.onShow();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.dialogInstance || this.state.visible) {
        this.renderDialog();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.dialogContainer) {
        React.unmountComponentAtNode(this.getDialogContainer());
      }
    }
  }]);

  return DialogWrap;
})(React.Component);

DialogWrap.defaultProps = {
  className: '',
  align: {
    points: ['tc', 'tc'],
    offset: [0, 100]
  },
  closable: true,
  prefixCls: 'rc-dialog',
  visible: false,
  onBeforeClose: noop,
  onShow: noop,
  onClose: noop
};

module.exports = DialogWrap;
