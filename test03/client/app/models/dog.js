"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var animal_1 = require('./animal');
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog(name, type) {
        _super.call(this, name);
        this.type = type;
    }
    return Dog;
}(animal_1.Animal));
exports.Dog = Dog;
