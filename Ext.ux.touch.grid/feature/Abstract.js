Ext.define('Ext.ux.touch.grid.feature.Abstract', {
    config : {
        events : {}
    },

    constructor: function(config) {
        config = config || {};

        var me = this,
            grid, events, cls, clsEvents, eventName, eventFn, eventCfg;

        Ext.apply(me, config);

        me.callParent(arguments);

        grid   = me.grid;
        events = me.getEvents();

        for (cls in events) {
            clsEvents = events[cls];

            if (cls === 'grid') {
                cls = grid;
            } else if (cls === 'headerEl') {
                cls = grid.header.element;
            } else if (cls === 'gridBody') {
                cls = grid.element.down('div.x-body');
            } else if (cls === 'store') {
                cls = grid.getStore();
            } else {
                cls = grid[cls];
            }

            if (Ext.isObject(cls)) {
                for (eventName in clsEvents) {
                    eventFn = clsEvents[eventName];

                    if (Ext.isObject(eventFn)) {
                        eventCfg = Ext.apply({}, eventFn);

                        delete eventCfg.fn;

                        eventFn = eventFn.fn;
                    }

                    cls.on(eventName, me[eventFn], me, eventCfg || {});
                }
            } else {
                console.warn('Class could not be found in config.events Object');
            }
        }
    }
});