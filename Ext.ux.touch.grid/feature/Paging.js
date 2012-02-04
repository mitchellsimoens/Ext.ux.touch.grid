Ext.define('Ext.ux.touch.grid.feature.Paging', {
    extend   : 'Ext.ux.touch.grid.feature.Abstract',
    requires : [
        'Ext.ux.touch.grid.feature.Abstract',
        'Ext.dataview.List'
    ],

    config : {
        events : {
            store : {
                load : 'handleGridPaint'
            }
        },

        backButton    : {
            text : 'Previous Page',
            ui   : 'back'
        },
        forwardButton : {
            text : 'Next Page',
            ui   : 'forward'
        },
        goToButton    : {
            text : 'Go to page...'
        },

        pager         : {
            xtype  : 'toolbar',
            docked : 'top',
            layout : {
                type : 'hbox'
            }
        },

        pageListTpl : 'Page {page}',
        goToPicker  : null,
        pages       : 0
    },

    backText : 'back',

    init : function(grid) {
        var me         = this,
            backBtn    = me.getBackButton(),
            forwardBtn = me.getForwardButton(),
            goToBtn    = me.getGoToButton(),
            pager      = me.getPager();

        Ext.apply(backBtn, {
            action   : 'back',
            disabled : true,
            scope    : this,
            handler  : 'handleBackButton'
        });

        Ext.apply(forwardBtn, {
            action   : 'forward',
            disabled : true,
            scope    : this,
            handler  : 'handleForwardButton'
        });

        Ext.apply(goToBtn, {
            action   : 'goTo',
            disabled : true,
            scope    : this,
            handler  : 'handleGoToButton'
        });

        Ext.apply(pager, {
            items  : [
                backBtn,
                {
                    xtype : 'spacer'
                },
                goToBtn,
                {
                    xtype : 'spacer'
                },
                forwardBtn
            ]
        });

        me.setPager(
            pager = grid.insert(0, pager)
        );

        me.setBackButton(
            pager.down('button[action=back]')
        );
        me.setForwardButton(
            pager.down('button[action=forward]')
        );
        me.setGoToButton(
            pager.down('button[action=goTo]')
        );

        grid.on('painted', 'handleGridPaint', this, { buffer : 50 });
    },

    handleGridPaint : function(grid) {
        if (!(grid instanceof Ext.ux.touch.grid.View)) {
            grid = this.getGrid();
        }

        var me    = this,
            store = grid.getStore();

        if (store.isLoading()) {
            store.on('load', 'handleGridPaint', this, { single : true });
            return;
        }

        var total         = store.getTotalCount(),
            currentPage   = store.currentPage,
            pages         = Math.ceil(total / store.getPageSize()),
            backButton    = me.getBackButton(),
            forwardButton = me.getForwardButton(),
            goToButton    = me.getGoToButton();

        me.setPages(pages);

        backButton   .setDisabled(currentPage == 1);
        forwardButton.setDisabled(currentPage == pages);
        goToButton   .setDisabled(pages       == 0);
    },

    handleBackButton : function() {
        var grid  = this.getGrid(),
            store = grid.getStore();

        store.previousPage();
    },

    handleForwardButton : function() {
        var grid  = this.getGrid(),
            store = grid.getStore();

        store.nextPage();
    },

    handleGoToButton : function(btn) {
        var me     = this,
            picker = me.getGoToPicker(),
            pages  = me.getPages(),
            i      = 1,
            data   = [];

        if (!picker) {
            picker = me.buildPicker();
        }

        var store = picker.down('list').getStore();

        store.removeAll();

        for (; i <= pages; i++) {
            data.push({ page : i });
        }

        store.add(data);

        picker.showBy(btn);
    },

    buildPicker : function() {
        return Ext.create('Ext.Panel', {
            centered : true,
            modal    : true,
            width    : 200,
            height   : 200,
            layout   : 'fit',
            items    : [
                {
                    xtype   : 'list',
                    itemTpl : this.getPageListTpl(),
                    store   : Ext.create('Ext.data.Store', {
                        fields : [
                            'page'
                        ]
                    }),
                    listeners : {
                        scope   : this,
                        itemtap : 'handlePageSelect'
                    }
                }
            ]
        });
    },

    handlePageSelect : function(list, index) {
        var panel = list.up('panel'),
            store = this.getGrid().getStore(),
            page  = index + 1;

        store.loadPage(page);

        panel.hide();
    }
});