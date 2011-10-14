Ext.define('Ext.ux.touch.grid.feature.Abstract', {
    constructor: function(config) {
        config = config || {};

        var me = this;

        Ext.apply(me, config);

        me.callParent(arguments);
    }
});