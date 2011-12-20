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

    handleDoubleTap : function(grid, index, rowEl, e) {
        var target    = e.getTarget('div.x-grid-cell'),
            cellEl    = Ext.get(target);

        if (!cellEl) {
            return;
        }

        var dataIndex = cellEl.getAttribute('dataindex'),
            column    = grid.getColumn(dataIndex),
            editor    = column.editor,
            store     = grid.getStore(),
            rec       = store.getAt(index),
            value     = rec.get(dataIndex),
            htmlValue = cellEl.getHTML();

        if (!editor) {
            return;
        }

        cellEl.update('');

        Ext.apply(editor, {
            renderTo     : cellEl,
            value        : value,
            defaultValue : value, //TODO remove when isDirty reports correctly
            htmlValue    : htmlValue,
            record       : rec,
            name         : dataIndex
        });

        grid.activeEditor = Ext.ComponentManager.create(editor);
    },

    handleTap : function(grid, index, rowEl, e) {
        var editor = grid.activeEditor;

        if (editor) {
            if (!e.getTarget('input')) {
                //TODO isDirty in PR3 always reports dirty
                //if (editor.isDirty()) {
                var component = editor.getComponent(),
                    value     = component.getValue();

                editor.destroy();

                if (editor.defaultValue !== value) {
                    editor.record.set(editor.getName(), value);
                } else {
                    editor.getRenderTo().update(editor.htmlValue);
                }

                delete grid.activeEditor;
            }
        }
    },

    handleFieldDestroy: function(cellEl, htmlValue) {
        cellEl.update(htmlValue);
    }
});