Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext.ux.touch.grid': './Ext.ux.touch.grid'
    }
});

Ext.require([
    'Ext.data.proxy.JsonP',
    'Ext.ux.touch.grid.List',
    'Ext.ux.touch.grid.feature.Feature',
    'Ext.ux.touch.grid.feature.Sorter'
]);

Ext.define('ForumThread', {
    extend : 'Ext.data.Model',

    config : {
        idProperty : 'threadid',
        fields     : [
            'title',
            'forumtitle',
            'forumid',
            'username',
            'lastposter',
            'excerpt',
            'threadid',
            {
                name : 'replycount',
                type : 'int'
            },
            {
                name       : 'lastpost',
                mapping    : 'lastpost',
                type       : 'date',
                dateFormat : 'timestamp'
            }
        ]
    }
});

Ext.setup({
    onReady: function() {
        var store = Ext.create('Ext.data.Store', {
            model             : 'ForumThread',
            autoLoad          : true,
            remoteGroup       : true,
            pageSize          : 1000,
            proxy             : {
                // load using script tags for cross domain, if the data in on the same domain as
                // this page, an Ajax proxy would be better
                type                : 'jsonp',
                url                 : 'http://www.sencha.com/forum/remote_topics/index.php',
                reader              : {
                    rootProperty  : 'topics',
                    totalProperty : 'totalCount'
                },
                // sends single sort as multi parameter
                simpleSortMode      : true,
                // sends single group as multi parameter
                simpleGroupMode     : true,

                // This particular service cannot sort on more than one field, so grouping === sorting.
                groupParam          : 'sort',
                groupDirectionParam : 'dir'
            },
            sorters           : [
                {
                    property  : 'threadid',
                    direction : 'ASC'
                }
            ]
        });

        Ext.create('Ext.ux.touch.grid.List', {
            fullscreen : true,
            store      : store,
            columns    : [
                {
                    header    : 'Title',
                    dataIndex : 'title',
                    style     : 'padding-left: 1em;',
                    width     : '40%'
                },
                {
                    header    : 'User',
                    dataIndex : 'username',
                    style     : 'text-align: center;',
                    width     : '15%'
                },
                {
                    header    : 'Forum',
                    dataIndex : 'forumtitle',
                    style     : 'text-align: center;',
                    width     : '15%'
                },
                {
                    header    : 'Replies',
                    dataIndex : 'replycount',
                    style     : 'text-align: center;',
                    width     : '15%'
                },
                {
                    header    : 'Last Post',
                    dataIndex : 'lastpost',
                    style     : 'text-align: right; padding-right: 1em;',
                    width     : '15%',
                    renderer  : function(date) {
                        return Ext.Date.format(date, 'M j Y g:ia');
                    }
                }
            ]
        });
    }
});