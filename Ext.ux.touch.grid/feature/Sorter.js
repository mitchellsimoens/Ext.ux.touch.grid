Ext.define('Ext.ux.touch.grid.feature.Sorter', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : 'Ext.ux.touch.grid.feature.Abstract',

    config : {
        events : {
            grid    : {
                sort : 'updateHeaderIcons'
            },
            headerEl : {
                tap        : 'handleHeaderTap'
            }
        }
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
        e.isStopped = true;

        var me        = this,
            grid      = me.grid,
            columns   = grid.getColumns(),
            c         = 0,
            cNum      = columns.length,
            store     = grid.getStore(),
            el        = Ext.get(t),
            dataIndex = el.getAttribute('dataindex'),
            dir       = store.sorters.get(dataIndex),
            column;

        for (; c < cNum; c++) {
            column = columns[c];

            if (column.dataIndex === dataIndex) {
                break;
            }
        }

        if (grid.fireEvent('beforesort', grid, column) == false || !me.isSortable(grid, column)) {
            return;
        }

        if (dir) {
            dir = dir.direction || 'DESC';
        }

        store.sort(dataIndex, dir === 'DESC' ? 'ASC' : 'DESC');

        grid.fireEvent('sort');
    },

    updateHeaderIcons: function() {
        var me       = this,
            grid     = me.grid,
            store    = grid.getStore(),
            sorters  = store.sorters,
            header   = grid.header,
            headerEl = header.element,
            columns  = grid.getColumns(),
            c        = 0,
            cNum     = columns.length,
            cls      = {
                ASC  : 'x-grid-sort-asc',
                DESC : 'x-grid-sort-desc'
            },
            column, dataIndex, colEl, sorter, dir;

        for (; c < cNum; c++) {
            column    = columns[c];
            dataIndex = column.dataIndex;
            colEl     = Ext.get(headerEl.query('div.x-grid-cell-hd[dataindex='+dataIndex+']')[0]);
            sorter    = sorters.get(dataIndex);

            if (sorter) {
                dir = sorter.direction;

                colEl.removeCls(cls[dir]).addCls(cls[dir === 'DESC' ? 'ASC' : 'DESC']);
            } else {
                colEl.removeCls(cls.ASC).removeCls(cls.DESC);
            }
        }
    }
});