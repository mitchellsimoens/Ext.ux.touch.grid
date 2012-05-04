Ext.define('Grid.store.Grid', {
    extend : 'Ext.data.Store',

    requires : [
        'Grid.model.Grid'
    ],

    config : {
        model : 'Grid.model.Grid',
        data  : [
            { text : 'One',   amount : 1  },
            { text : 'Two',   amount : 2  },
            { text : 'Three', amount : 3  },
            { text : 'Four',  amount : 4  },
            { text : 'Five',  amount : 5  },
            { text : 'Six',   amount : 6  },
            { text : 'Seven', amount : 7  },
            { text : 'Eight', amount : 8  },
            { text : 'Nine',  amount : 9  },
            { text : 'Ten',   amount : 10 }
        ]
    }
});