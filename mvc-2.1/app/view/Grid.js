Ext.define('mvc-2.1.view.Grid', {
    extend: 'Ext.ux.touch.grid.List',
    xtype: 'gridview',
    requires: [
        'Ext.ux.touch.grid.List',
        'Ext.ux.touch.grid.feature.Feature',
        'Ext.ux.touch.grid.feature.Sorter'
    ],
    config: {
        store      : 'TestStore',
        features   : [
            {
                ftype    : 'Ext.ux.touch.grid.feature.Sorter',
                launchFn : 'initialize'
            }
        ],
        columns   : [
            {
                header    : 'Company',
                dataIndex : 'company',
                style     : 'padding-left: 1em;',
                width     : '40%',
                filter    : { type : 'string' }
            },
            {
                header    : 'Price',
                dataIndex : 'price',
                style     : 'text-align: center;',
                width     : '15%',
                filter    : { type : 'numeric' }
            },
            {
                header    : 'Change',
                dataIndex : 'change',
                cls       : 'centered-cell redgreen-cell',
                width     : '15%',
                renderer  : function (value) {
                    var cls = (value > 0) ? 'green' : 'red';

                    return '<span class="' + cls + '">' + value + '</span>';
                }
            },
            {
                header    : '% Change',
                dataIndex : 'pct',
                cls       : 'centered-cell redgreen-cell',
                width     : '15%',
                renderer  : function (value) {
                    var cls = (value > 0) ? 'green' : 'red';

                    return '<span class="' + cls + '">' + value + '</span>';
                }
            },
            {
                header    : 'Last Updated',
                dataIndex : 'updated',
                hidden    : true,
                style     : 'text-align: right; padding-right: 1em;',
                sortable  : false,
                width     : '15%'
            }
        ]
    }
});
