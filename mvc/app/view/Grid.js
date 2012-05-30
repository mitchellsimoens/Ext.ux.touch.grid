Ext.define('Grid.view.Grid', {
    extend : 'Ext.ux.touch.grid.View',
    xtype  : 'grid-grid',

    requires : [
        'Ext.ux.touch.grid.feature.Feature',
        'Ext.ux.touch.grid.feature.Sorter'
    ],

    config : {
        title   : 'Grid',
        store   : 'Grid',
        columns : [
            {
                header    : 'Text',
                dataIndex : 'text',
                width     : '90%'
            },
            {
                header    : 'Amount',
                dataIndex : 'amount',
                width     : '10%'
            }
        ],
        features : [
            {
                ftype    : 'Ext.ux.touch.grid.feature.Sorter',
                launchFn : 'initialize'
            }
        ]
    }
});