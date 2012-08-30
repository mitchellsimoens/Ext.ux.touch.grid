Ext.define('Ext.ux.touch.grid.feature.Editable', {
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
        var target = e.getTarget('div.x-grid-cell'),
            cellEl = Ext.get(target);

        if (!cellEl) {
            return;
        }

        this.startEdit(grid, cellEl, rec);
    },

    handleTap : function(grid, index, rowEl, rec, e) {
        var editor = this.getActiveEditor();

        if (editor) {
            if (!e.getTarget('.x-field')) {
                this.endEdit(grid);
            }
        }
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

    endEdit : function(grid) {
        if (!grid) {
            grid = this.getGrid();
        }

        var editor    = this.getActiveEditor(),
            field     = editor.field,
            component = field.getComponent(),
            value     = component.getValue(),
            isDirty   = field.isDirty(),
            renderTo  = field.getRenderTo();

        field.destroy();

        if (isDirty) {
            editor.record.set(field.getName(), value);
            grid.refresh();

            grid.fireEvent('editend', grid, this, editor, value);
        } else {
            renderTo.setHtml(editor.htmlValue);

            grid.fireEvent('editcancel', grid, this, editor, value);
        }

        this.setActiveEditor(null);
    }
});