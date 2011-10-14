Ext.define('Ext.ux.touch.grid.feature.Sorter', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : 'Ext.ux.touch.grid.feature.Abstract',

    clearSorters : false,

    init: function(grid) {
        var me     = this,
            header = grid.header,
            el     = header.element;

        el.on({
            scope : me,

            tap   : me.handleHeaderTap
        });

        grid.on({
            scope : me,

            beforesort : me.isSortable,
            sort       : me.updateHeaderIcons
        });
    },

    onDestroy: function() {
        var me     = this,
            grid   = me.grid,
            header = grid.header,
            el     = header.el;

        el.un({
            scope : me,
            tap   : me.handleHeaderTap
        });

        grid.un({
            scope : me,
            sort  : me.updateHeaderIcons
        });
    },

    isSortable: function(grid, column) {
        return !(grid.stopSort || column.sortable == false);
    },

    handleHeaderTap: function(e, t) {
        var me        = this,
            grid      = me.grid,
            colModel  = grid.colModel,
            c         = 0,
            cNum      = colModel.length,
            store     = grid.getStore(),
            el        = Ext.get(t),
            dataIndex = el.getAttribute('dataindex'),
            sorters   = store.sorters,
            dir       = sorters.get(dataIndex),
            column;

        for (; c < cNum; c++) {
            column = colModel[c];

            if (column.dataIndex === dataIndex) {
                break;
            }
        }

        if (grid.fireEvent('beforesort', grid, column) == false) {
            return;
        }

        if (dir) {
            dir = dir.direction || 'DESC';
        }

        if (me.clearSorters) {
            sorters.removeAll();
        }

        sorters.add(new Ext.util.Sorter({
            property  : dataIndex,
            direction : dir === 'DESC' ? 'ASC' : 'DESC'
        }));

        grid.fireEvent('sort');
    },

    updateHeaderIcons: function() {
        var me       = this,
            grid     = me.grid,
            store    = grid.getStore(),
            sorters  = store.sorters,
            header   = grid.header,
            headerEl = header.element,
            colModel = grid.colModel,
            c        = 0,
            cNum     = colModel.length,
            cls      = {
                ASC  : 'x-grid-sort-asc',
                DESC : 'x-grid-sort-desc'
            },
            column, dataIndex, colEl, sorter, dir;

        for (; c < cNum; c++) {
            column    = colModel[c];
            dataIndex = column.dataIndex;
            colEl     = Ext.get(headerEl.query('div.x-grid-cell-hd[dataindex='+dataIndex+']')[0]);
            sorter    = sorters.get(dataIndex);

            if (sorter) {
                dir = sorter.direction;

                colEl.removeCls(cls[dir]).addCls(cls[dir === 'DESC' ? 'ASC' : 'DESC']);
            }
        }
    }
});