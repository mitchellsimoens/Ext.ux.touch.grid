Ext.define('Ext.ux.touch.grid.feature.Filter', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : 'Ext.ux.touch.grid.feature.Abstract',

    config : {
        events : {
            gridBody : {
                taphold : 'handleTapHold'
            }
        }
    },

    handleTapHold: function(e, t) {
        e.isStopped = true;

        console.log(t);
    }
});