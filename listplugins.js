Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext.ux.touch.grid' : './Ext.ux.touch.grid'
    }
});

Ext.require([
    'Ext.plugin.ListPaging',
    'Ext.plugin.PullRefresh',
    'Ext.ux.touch.grid.List',
    'Ext.ux.touch.grid.feature.Feature',
    'Ext.ux.touch.grid.feature.Sorter'
]);

Ext.define('TestModel', {
    extend : 'Ext.data.Model',

    config : {
        fields : [
            'company',
            'price',
            'change',
            'pct',
            'updated'
        ],

        proxy : {
            type        : 'ajax',
            url         : 'listplugins.php',
            reader      : {
                type         : 'json',
                rootProperty : 'data'
            },
            extraParams : {
                sleep : 2
            }
        }
    }
});

Ext.setup({
    onReady : function () {
        var store = Ext.create('Ext.data.Store', {
            autoLoad : true,
            model    : 'TestModel',
            pageSize : 5,
            grouper  : {
                groupFn : function (record) {
                    return record.get('company')[0];
                }
            }
        });

        Ext.create('Ext.ux.touch.grid.List', {
            fullscreen       : true,
            store            : store,
            onItemDisclosure : true,
            grouped          : true,
            indexBar         : true,
            plugins          : [
                {
                    xclass : 'Ext.plugin.ListPaging'
                },
                {
                    xclass : 'Ext.plugin.PullRefresh'
                }
            ],
            features         : [
                {
                    ftype    : 'Ext.ux.touch.grid.feature.Sorter',
                    launchFn : 'initialize'
                }
            ],
            columns          : [
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
        });
    }
});