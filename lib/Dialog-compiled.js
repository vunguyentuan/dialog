'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var domAlign = require('dom-align');
var RcUtil = require('rc-util');
var Dom = RcUtil.Dom;
var assign = require('object-assign');

function prefixClsFn(prefixCls) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.map(function (s) {
    if (!s) {
      return prefixCls;
    }
    return prefixCls + '-' + s;
  }).join(' ');
}

function buffer(fn, ms) {
  var timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, ms);
  };
}

var Dialog = React.createClass({
  displayName: 'Dialog',

  align: function align() {
    var align = this.props.align;
    domAlign(React.findDOMNode(this.refs.dialog), align.node || window, align);
  },

  monitorWindowResize: function monitorWindowResize() {
    if (!this.resizeHandler) {
      this.resizeHandler = Dom.addEventListener(window, 'resize', buffer(this.align, 80));
    }
  },

  unMonitorWindowResize: function unMonitorWindowResize() {
    if (this.resizeHandler) {
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  },

  componentDidMount: function componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate: function componentDidUpdate() {
    var props = this.props;
    if (props.visible) {
      this.monitorWindowResize();
      // first show
      if (!this.lastVisible) {
        this.align();
        React.findDOMNode(this.refs.dialog).focus();
      } else {
        if (props.align !== this.lastAlign) {
          this.align();
        }
      }
    } else {
      this.unMonitorWindowResize();
    }
    this.lastVisible = props.visible;
    this.lastAlign = props.align;
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unMonitorWindowResize();
  },

  render: function render() {
    var props = this.props;
    var visible = props.visible;
    var prefixCls = props.prefixCls;
    var className = [prefixClsFn(prefixCls, 'wrap')];
    var closable = props.closable;
    if (!visible) {
      className.push(prefixClsFn(prefixCls, 'wrap-hidden'));
    }
    var dest = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }
    if (props.zIndex !== undefined) {
      dest.zIndex = props.zIndex;
    }

    var style = assign({}, props.style, dest);

    var maskProps = {};
    if (closable) {
      maskProps.onClick = this.props.onClose;
    }
    if (style.zIndex) {
      maskProps.style = { zIndex: style.zIndex };
    }
    return React.createElement(
      'div',
      { className: className.join(' ') },
      props.mask !== false ? React.createElement('div', _extends({}, maskProps, { className: prefixClsFn(prefixCls, 'mask') })) : null,
      React.createElement(
        'div',
        { className: [prefixClsFn(prefixCls, ''), props.className].join(' '), tabIndex: '0', role: 'dialog', ref: 'dialog', style: style },
        React.createElement(
          'div',
          { className: prefixClsFn(prefixCls, 'content') },
          React.createElement(
            'div',
            { className: prefixClsFn(prefixCls, 'header') },
            closable ? React.createElement(
              'a',
              { tabIndex: '0', onClick: this.props.onClose, className: [prefixClsFn(prefixCls, 'close')].join('') },
              React.createElement(
                'span',
                { className: prefixClsFn(prefixCls, 'close-x') },
                '×'
              )
            ) : null,
            React.createElement(
              'div',
              { className: prefixClsFn(prefixCls, 'title') },
              props.title
            )
          ),
          React.createElement(
            'div',
            { className: prefixClsFn(prefixCls, 'body') },
            props.children
          )
        )
      )
    );
  }
});

module.exports = Dialog;
