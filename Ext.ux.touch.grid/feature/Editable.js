Ext.define('Ext.ux.touch.grid.feature.Editable', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : 'Ext.ux.touch.grid.feature.Abstract',

    config : {
        events : {
            grid : {
                itemdoubletap : 'handleDoubleTap',
                itemtap       : 'handleTap'
            }
        }
    },

    handleDoubleTap : function(grid, index, rowEl, rec, e) {
        var target    = e.getTarget('div.x-grid-cell'),
            cellEl    = Ext.get(target);

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

        grid.activeEditor = Ext.ComponentManager.create(editor);
    },

    handleTap : function(grid, index, rowEl, rec, e) {
        var editor = grid.activeEditor;

        if (editor) {
            if (!e.getTarget('input') && !e.getTarget('div.x-clear-icon')) {
                var component = editor.getComponent(),
                    value     = component.getValue();

                editor.destroy();

                if (editor.isDirty()) {
                    editor.record.set(editor.getName(), value);
                } else {
                    editor.getRenderTo().setHtml(editor.htmlValue);
                }

                delete grid.activeEditor;
            }
        }
    },

    handleFieldDestroy: function(cellEl, htmlValue) {
        cellEl.setHtml(htmlValue);
    }
});