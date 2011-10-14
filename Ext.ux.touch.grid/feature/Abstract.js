Ext.define('Ext.ux.touch.grid.feature.Abstract', {
    config : {
        events : {}
    },

    constructor: function(config) {
        config = config || {};

        var me = this,
            grid, events, cls, clsEvents, eventName, eventObj;

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
            } else {
                cls = grid[cls];

                console.log(cls);
            }

            if (Ext.isObject(cls)) {
                eventObj = {
                    scope : me
                };

                for (eventName in clsEvents) {
                    eventObj[eventName] = me[clsEvents[eventName]];
                }

                cls.on(eventObj);
            } else {
                console.warn('Class could not be found in config.events Object');
            }
        }
    }
});