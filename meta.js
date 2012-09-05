Ext.Loader.setConfig({
    paths : {
        'Ext.ux.touch.grid' : './Ext.ux.touch.grid'
    }
});

Ext.require([
    'Ext.ux.touch.grid.List',
    'Ext.ux.touch.grid.feature.Feature',
    'Ext.ux.touch.grid.feature.Sorter'
]);

Ext.define('Ux.data.reader.ColJson', {
    extend : 'Ext.data.reader.Json',
    alias  : 'reader.coljson',

    config : {
        columnProperty : 'columns'
    },

    /**
     * @private
     */
    columnAccessor : null,

    buildExtractors : function() {
        this.callParent(arguments);

        var columnProp = this.getColumnProperty();

        if (columnProp) {
            this.columnAccessor = this.createAccessor(columnProp);
        }
    },

    getColumns : function() {
        var accessor = this.columnAccessor,
            rawData  = this.rawData;

        return accessor(rawData);
    }
});

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
            url         : 'meta.php',
            reader      : {
                type           : 'coljson',
                rootProperty   : 'data',
                columnProperty : 'columns'
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
            autoLoad  : true,
            model     : 'TestModel',
            pageSize  : 5,
            listeners : {
                load : function(store) {
                    var proxy   = store.getProxy(),
                        reader  = proxy.getReader(),
                        columns = reader.getColumns();

                    grid.setColumns(columns);
                }
            }
        });

        var grid = Ext.create('Ext.ux.touch.grid.List', {
            fullscreen : true,
            store      : store,
            features   : [
                {
                    ftype    : 'Ext.ux.touch.grid.feature.Sorter',
                    launchFn : 'initialize'
                }
            ]
        });
    }
});