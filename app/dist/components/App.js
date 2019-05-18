"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = App;

var _react = _interopRequireWildcard(require("react"));

var _ColumnSetup = _interopRequireDefault(require("./ColumnSetup"));

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var availableColumnsData = [{
  id: "startTime",
  name: "Start Time"
}, {
  id: "stopTime",
  name: "Stop Time"
}, {
  id: "perPoint",
  name: "Per Point"
}, {
  id: "initialMargin",
  name: "Initial Margin"
}];
var visibleColumnDatas = ["startTime", "stopTime"];

function App() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isColumnSetupDisplaying = _useState2[0],
      setColumnSetupDisplaying = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      availableColumns = _useState4[0],
      setAvailableColumns = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      visibleColumns = _useState6[0],
      setVisibleColumns = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      fixedColumns = _useState8[0],
      setfixedColumns = _useState8[1];

  var bottonText = isColumnSetupDisplaying ? 'Hide' : 'Show';
  (0, _react.useEffect)(function () {
    setAvailableColumns(availableColumnsData);
    setVisibleColumns(visibleColumnDatas);
  }, []);

  var onToggleColumnSetup = function onToggleColumnSetup(e) {
    e ? e.stopPropagation() : null;
    setColumnSetupDisplaying(!isColumnSetupDisplaying);
  };

  var onClose = function onClose() {
    setColumnSetupDisplaying(false);
  };

  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement("div", {
    className: "row p-5"
  }, _react["default"].createElement(_reactBootstrap.Button, {
    onClick: onToggleColumnSetup
  }, bottonText), isColumnSetupDisplaying ? _react["default"].createElement(_ColumnSetup["default"], {
    isShow: true,
    onModalClose: onClose,
    availableColumns: availableColumns,
    visibleColumns: visibleColumns,
    fixedColumns: fixedColumns
  }) : null, " "));
}