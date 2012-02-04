Ext.define('Ext.ux.touch.grid.feature.HeaderMenu', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : [
        'Ext.ux.touch.grid.feature.Abstract',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.dataview.DataView'
    ],

    showFilter : true,
    showSort   : true,

    config : {
        events : {
            headerEl : {
                taphold : 'handleTapHold'
            }
        }
    },

    onDestroy: function() {
        var me     = this,
            grid   = me.grid,
            header = grid.header,
            el     = header.el;

        delete me.menu;

        el.un({
            scope   : me,
            taphold : me.handleHeaderTapHold
        });
    },

    handleTapHold: function(e, t) {
        e.isStopped = true;

        var me        = this,
            grid      = me.grid,
            el        = Ext.get(t),
            dataIndex = el.getAttribute('dataindex'),
            menu      = me.menu = me.buildMenu(dataIndex);

        grid.stopSort = true;

        menu.showBy({
            element : el
        });
    },

    buildMenu: function(dataIndex) {
        var me   = this,
            menu = me.menu;

        if (menu && menu.observableId) {
            menu.dataIndex = dataIndex;

            return menu;
        }

        var cfg = Ext.apply({
                floating       : true,
                modal          : true,
                dataIndex      : dataIndex,
                //tabBarPosition : 'bottom',
                height         : 300,
                width          : 200,
                items          : []
            }, me.menu),
            filterSort = me.buildFilterSortItems(dataIndex);

        if (filterSort) {
            cfg.items = cfg.items.concat(filterSort);
        }

        cfg.items.push({
            xtype  : 'toolbar',
            docked : 'bottom',
            items  : [
                {
                    text    : 'Close',
                    scope   : me,
                    handler : me.closeMenu
                },
                { xtype : 'component', flex : 1 },
                {
                    text    : 'Submit',
                    scope   : me,
                    handler : Ext.Function.createSequence(me.submitFn, me.closeMenu)
                }
            ]
        });

        menu = Ext.create('Ext.tab.Panel', cfg);

        menu.on('renderedchange', me.updateFilterStore, me, { buffer : 100 });
        menu.on('renderedchange', me.updateSort, me, { buffer : 100 });

        return menu;
    },

    closeMenu: function() {
        var menu = this.menu;

        menu.setActiveItem(0);

        menu.hide(false);
    },

    buildFilterSortItems: function(dataIndex) {
        var me         = this,
            grid       = me.grid,
            store      = grid.getStore(),
            filterSort = [],
            filterStore, sortStore;

        if (me.showFilter) {
            filterStore = Ext.create('Ext.data.Store', {
                fields : ['property', 'value']
            });

            filterSort.push({
                xtype : 'formpanel',
                title : 'Filter',
                items : [
                    {
                        xtype       : 'textfield',
                        placeHolder : 'Add Filter',
                        listeners   : {
                            scope  : me,
                            action : me.addFilter
                        }
                    },
                    {
                        xtype   : 'dataview',
                        store   : filterStore,
                        itemTpl : '{property} - {value}'
                    }
                ]
            });
        }

        if (me.showSort) {
            filterSort.push({
                xtype : 'formpanel',
                title : 'Sort',
                items : [
                    {
                        xtype      : 'radiofield',
                        name       : 'sort',
                        label      : 'Ascending',
                        labelAlign : 'top',
                        value      : 'ASC',
                        listeners  : {
                            scope   : me,
                            check   : me.addSort,
                            uncheck : me.removeSort
                        }
                    },
                    {
                        xtype      : 'radiofield',
                        name       : 'sort',
                        label      : 'Descending',
                        labelAlign : 'top',
                        value      : 'DESC',
                        listeners  : {
                            scope   : me,
                            check   : me.addSort,
                            uncheck : me.removeSort
                        }
                    }
                ]
            });
        }

        return filterSort
    },

    addFilter: function(field) {
        var me        = this,
            menu      = me.menu,
            dataIndex = menu.dataIndex,
            grid      = me.grid,
            store     = grid.getStore(),
            filters   = store.filters;

        filters.add(new Ext.util.Filter({
            property : dataIndex,
            root     : 'data',
            value    : field.getValue()
        }));

        field.setValue('');
        me.closeMenu();
    },

    addSort: function(field) {
        var me        = this,
            dir       = field.getValue(),
            grid      = me.grid,
            store     = grid.getStore(),
            dataIndex = me.menu.dataIndex;

        store.sort(dataIndex, dir);

        field.setValue(false);
        me.closeMenu();
    },

    removeSort: function(field) {
        var me        = this,
            dataIndex = me.menu.dataIndex,
            store     = me.grid.getStore(),
            sorter    = store.sorters.findBy(function(sort) {
                return dataIndex === sort.property;
            });

        if (sorter) {
            store.sorters.remove(sorter);
        }

        field.setValue(false);
        me.closeMenu();
    },

    updateFilterStore: function(menu) {
        menu = menu || this.menu;

        var me          = this,
            dataIndex   = menu.dataIndex,
            grid        = me.grid,
            store       = grid.getStore(),
            filters     = store.filters,
            filterTab   = menu.down('formpanel[title=Filter]'),
            filterView  = filterTab.down('componentview'),
            filterStore = filterView.getStore();

        filterStore.removeAll();

        filters.each(function(filter) {
            if (dataIndex === filter.property) {
                filterStore.add({
                    property : filter.property,
                    value    : filter.value
                });
            }
        });
    },

    updateSort: function(menu) {
        menu = menu || this.menu;

        var me        = this,
            dataIndex = menu.dataIndex,
            store     = me.grid.getStore(),
            sorter    = store.sorters.findBy(function(sort) {
                return dataIndex === sort.property;
            });

        if (sorter) {
            var sortTab   = menu.down('formpanel[title=Sort]'),
                sortField = sortTab.down('radiofield[value=' + sorter.direction + ']');

            sortField.setChecked(true);
        }
    }
});