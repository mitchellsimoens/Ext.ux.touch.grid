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

        activeEditor : null
    },

    handleDoubleTap : function(grid, index, rowEl, rec, e) {
        var target = e.getTarget('div.x-grid-cell'),
            cellEl = Ext.get(target);

        if (!cellEl) {
            return;
        }

        var dataIndex = cellEl.getAttribute('dataindex'),
            column    = grid.getColumn(dataIndex),
            editor    = column.editor,
            value     = rec.get(dataIndex),
            htmlValue = cellEl.getHtml();

        if (!editor) {
            return;
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

        this.setActiveEditor(editor);
    },

    handleTap : function(grid, index, rowEl, rec, e) {
        var editor = this.getActiveEditor();

        if (editor) {
            if (!e.getTarget('input') && !e.getTarget('div.x-clear-icon')) {
                var field     = editor.field,
                    component = field.getComponent(),
                    value     = component.getValue();

                field.destroy();

                if (field.isDirty()) {
                    editor.record.set(field.getName(), value);
                } else {
                    field.getRenderTo().setHtml(editor.htmlValue);
                }

                this.setActiveEditor(null);
            }
        }
    },

    handleFieldDestroy: function(cellEl, htmlValue) {
        cellEl.setHtml(htmlValue);
    }
});