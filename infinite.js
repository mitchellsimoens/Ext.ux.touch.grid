Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext.ux.touch.grid': './Ext.ux.touch.grid'
    }
});

Ext.require([
    'Ext.ux.touch.grid.List',
    'Ext.ux.touch.grid.feature.Feature',
    'Ext.ux.touch.grid.feature.Sorter'
]);

Ext.setup({
    onReady: function() {
        /**
         * Coming soon!
         */
    }
});