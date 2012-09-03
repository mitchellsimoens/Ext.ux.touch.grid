/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha */

Ext.define('Ext.ux.touch.grid.feature.Editable2', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : 'Ext.ux.touch.grid.feature.Abstract',

    config : {
        events : {
            grid : {
                itemdoubletap : 'handleDoubleTap',
                itemtap       : 'handleTap'
            }
        },

        extraCls : 'editable',

        activeEditor : null
    },

    handleDoubleTap : function(grid, index, rowEl, rec, e) {
        this.handleTap(grid, index, rowEl, rec, e); // do the same
    },

    handleTap : function(grid, index, rowEl, rec, e) {
        var editor = this.getActiveEditor();

        if (editor) {
            if (!e.getTarget('.x-field')) {
                this.endEdit(grid);
            }
        }



        var target = e.getTarget('div.x-grid-cell'),
            cellEl = Ext.get(target);

        if (!cellEl) {
            return;
        }

        this.startEdit(grid, cellEl, rec);
    },

    onFieldBlur : function (field, e) {
        this.endEdit();
    },


    handleFieldDestroy: function(cellEl, htmlValue) {
        cellEl.setHtml(htmlValue);
    },

    startEdit: function(grid, cellEl, rec) {
        var dataIndex = cellEl.getAttribute('dataindex'),
            column    = grid.getColumn(dataIndex),
            editor    = column.editor,
            value     = rec.get(dataIndex),
            htmlValue = cellEl.getHtml();

        if (!editor) {
            return;
        }

        if(this.getActiveEditor()) {
            // close the currently active editor first
            this.endEdit(grid);
        }

        cellEl.setHtml('');

        Ext.apply(editor, {
            renderTo  : cellEl,
            value     : value,
            htmlValue : htmlValue,
            record    : rec,
            name      : dataIndex
        });

        editor.field = Ext.ComponentManager.create(editor);

        editor.field.on({
            scope  : this,
            blur   : 'onFieldBlur'
        });

        this.setActiveEditor(editor);

        // focus on the editor field
        if(Ext.isFunction(editor.field.focus)) {
            editor.field.focus();
        }
        // if it's a select field open the picker
        if(Ext.isFunction(editor.field.showPicker)) {
            editor.field.showPicker();
        }

        grid.fireEvent('editstart', grid, this, editor, dataIndex, rec);
    },

    endEdit: function(grid) {
        if (!grid) {
            grid = this.getGrid();
        }

        var editor    = this.getActiveEditor(),
            field     = editor.field,
            value     = field.getValue(),
            isDirty   = field.isDirty(),
            renderTo  = field.getRenderTo(),
            column    = grid.getColumn(editor.name),
            index, nextField;


        if(!editor) {
            return; // if there's no active editor, nothing to do here
        }


        // if the editor das a jumpToNext:true config open the next editor
        // if(column.editNext) {
        //     //find the next field before the field is dstroyed
        //     index = grid.getColumns().indexOf(column);
        //     nextField = Ext.get(editor.renderTo.getParent().query('.x-grid-cell')[index]);
        // }

        // bug fix workaround, not sure if this is a bug in sencha or in this code
        try {
            field.destroy();
        } catch(e) {
            // just ignore
        }

        if (isDirty) {
            editor.record.set(field.getName(), value);
            grid.refresh();

            grid.fireEvent('editend', grid, this, editor, value);
        } else {
            renderTo.setHtml(editor.htmlValue);

            grid.fireEvent('editcancel', grid, this, editor, value);
        }

        this.setActiveEditor(null);

        // if(nextField) {
        //     HOW TO DO THIS?
        //     this.startEdit(grid, nextField,  editor.record);
        // }
    }
});

//eof
