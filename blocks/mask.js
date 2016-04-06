'use strict';

goog.provide('Blockly.Blocks.mask');

//goog.require('Blockly.Variable');
//goog.require('Blockly.Blocks');
//goog.require('Blockly.Blocks.variables');
//goog.require('Blockly.Blocks.procedures');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.mask.HUE = 0;

Blockly.Blocks['save_object'] = {
    init: function() {
        this.input_ = this.appendValueInput("VALUE")
            .appendField("Save")
            .setCheck('Object');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['mask_show'] = {
    init: function () {
        var thisarg = this;

        this.setColour(Blockly.Blocks.mask.HUE);

        var fieldType = new Blockly.FieldType(function (e) {
            thisarg.setOutput(true, e);
            thisarg.input_.setCheck(e);
        });

        this.appendDummyInput()
            .appendField("Type")
            .appendField(fieldType, "TYPE");
        this.appendStatementInput("MASK")
            .setCheck("Mask");
        this.input_ = this.appendValueInput("VALUE")
            .setCheck(fieldType.getValue())
            .appendField("Value");

        this.setOutput(true, fieldType.getValue());

        //this.setTooltip('');
        //this.setHelpUrl('http://www.example.com/');
    },

    getType: function () {
        return this.getFieldValue('TYPE');
    }
};

Blockly.Blocks['mask_item'] = {
    init: function () {
        this.setColour(Blockly.Blocks.mask.HUE);

        this.fieldFieldref_ = new Blockly.FieldFieldref();

        this.appendDummyInput()
            .appendField(this.fieldFieldref_, "FIELD");
        this.setPreviousStatement(true, "Mask");
        this.setNextStatement(true, "Mask");

        //this.setTooltip('');
        //this.setHelpUrl('http://www.example.com/');
    },

    onchange: function () {
        var mask = this.getSurroundParent();
        if (!mask) {
            this.fieldFieldref_.setType(null);
            return;
        }

        var typeName = mask.getType();
        if (!typeName) return;
            
        var type = Blockly.Types.getType(typeName);
        if (!type) return;

        this.fieldFieldref_.setType(type);
    }
};