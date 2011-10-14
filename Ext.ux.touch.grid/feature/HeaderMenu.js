Ext.define('Ext.ux.touch.grid.feature.HeaderMenu', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : 'Ext.ux.touch.grid.feature.Abstract',

    init: function(grid) {
        var me     = this,
            header = grid.header,
            el     = header.element;

        me.grid = grid;

        el.on({
            scope   : me,

            taphold : me.handleHeaderTapHold
        });
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

    handleHeaderTapHold: function(e, t) {
        e.stopEvent();

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
        var me  = this,
            cfg = Ext.apply({
            floating  : true,
            modal     : true,
            dataIndex : dataIndex,
            items     : []
        }, me.menu);

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

        return Ext.create('Ext.Panel', cfg);
    },

    closeMenu: function() {
        var me   = this,
            menu = me.menu;

        delete me.menu;

        menu.hide(false);
        menu.destroy();
    }
});