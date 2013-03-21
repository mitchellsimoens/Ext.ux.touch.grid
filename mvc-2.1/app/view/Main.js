Ext.define('mvc-2.1.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'mvc-2.1.view.Grid'
    ],
    config: {
        tabBarPosition: 'bottom',
        
        items: [{
                title: 'Grid Sample',
                iconCls: 'action',
                
                layout:'fit',
                
                items : [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Ext.ux.touch.grid MVC Example with Sencha Touch 2.1'
                },{
                    xtype : 'gridview'
                }]
            },{
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            }
        ]
    }
});