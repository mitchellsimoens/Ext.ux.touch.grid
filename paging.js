Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext.ux.touch.grid': './Ext.ux.touch.grid'
    }
});

Ext.require([
    'Ext.ux.touch.grid.View',
    'Ext.ux.touch.grid.feature.Feature',
    'Ext.ux.touch.grid.feature.Paging',
    'Ext.ux.touch.grid.feature.Sorter'
]);

Ext.define('TestModel', {
    extend : 'Ext.data.Model',

    config : {
        fields : [
            'firstName',
            'lastName',
            {
                name    : 'fullName',
                convert : function(val, rec) {
                    var data = rec.data;
                    return data.lastName + ', ' + data.firstName;
                }
            }
        ],

        proxy : {
            type   : 'ajax',
            url    : 'data.php',
            reader : {
                type         : 'json',
                rootProperty : 'data'
            }
        }
    }
});

Ext.setup({
    onReady: function() {
        var store = Ext.create('Ext.data.Store', {
			model    : 'TestModel',
            autoLoad : true
		});

        Ext.create('Ext.ux.touch.grid.View', {
            fullscreen : true,
            store      : store,

            features   : [
                {
                    ftype    : 'Ext.ux.touch.grid.feature.Paging',
                    launchFn : 'initialize'
                }
            ],
            columns   : [
                {
                    header    : 'First Name',
                    dataIndex : 'firstName',
                    style     : 'padding-left: 1em;',
                    width     : '30%',
                    filter    : { type : 'string' }
                },
                {
                    header    : 'Last Name',
                    dataIndex : 'lastName',
                    style     : 'padding-left: 1em;',
                    width     : '30%',
                    filter    : { type : 'numeric' }
                },
                {
                    header    : 'Full Name',
                    dataIndex : 'fullName',
                    style     : 'padding-left: 1em;',
                    width     : '40%'
                }
            ]
        });
    }
});