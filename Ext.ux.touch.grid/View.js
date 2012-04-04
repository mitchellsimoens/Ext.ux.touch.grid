Ext.define('Ext.ux.touch.grid.View', {
    extend   : 'Ext.dataview.DataView',
    xtype    : 'touchgridpanel',

    requires : ['Ext.ux.touch.grid.feature.Feature'],
    mixins   : ['Ext.ux.touch.grid.feature.Feature'],

    config : {
        columns : [],
        cls     : 'touchgridpanel',
        header  : {
            xtype  : 'toolbar',
            docked : 'top',
            cls    : 'x-grid-header'
        },
        itemTpl : false
    },

    constructor: function(config) {
        var me       = this,
            features = me.features = config.features || me.config.features || me.features;

        if (typeof me.initFeatures === 'function' && typeof config.features === 'object') {
            me.initFeatures(features, 'constructor');
        }

        me.callParent([config]);

        me.setWidth(me._buildWidth());
    },

    initialize: function() {
        var me = this;

        me.callParent();

        if (typeof me.initFeatures === 'function' && typeof me.features === 'object') {
            me.initFeatures(me.features, 'initialize');
        }
    },

    refreshScroller : function() {
        var scroller = this.getScrollable().getScroller();

        scroller.refresh();
    },

    applyHeader : function(config) {
        Ext.apply(config, {
            docked : 'top',
            cls    : 'x-grid-header'
        });

        return Ext.factory(config, Ext.Toolbar);
    },

    updateHeader : function(header) {
        this.insert(0, header);
    },

    _buildWidth: function() {
        var me       = this,
            columns  = me.getColumns(),
            c        = 0,
            cNum     = columns.length,
            retWidth = 0,
            stop     = false,
            column, width;

        for (; c < cNum; c++) {
            column = columns[c];
            width  = column.width;

            if (!Ext.isNumber(width)) {
                stop = true;
                break;
            }

            retWidth += width;
        }

        return stop ? undefined : retWidth;
    },

    _defaultRenderer: function(value) {
        return value;
    },

    applyItemTpl : function(tpl) {
        if (!tpl) {
            tpl = this._buildTpl(this.getColumns(), false);
        }

        if (!(tpl instanceof Ext.XTemplate)) {
            tpl = Ext.create('Ext.XTemplate', tpl.tpl, tpl.renderers);
        }

        return tpl;
    },

    updateItemTpl : function() {
        var header = this.getHeader(),
            html   = this._buildTpl(this.getColumns(), true);

        header.setHtml(html.tpl);
    },

    _buildTpl: function(columns, header) {
        var tpl        = [],
            c          = 0,
            cNum       = columns.length,
            basePrefix = Ext.baseCSSPrefix,
            renderers  = {},
            column, hidden, css, styles, attributes, width, renderer, rendererName, innerText;

        for (; c < cNum; c++) {
            column = columns[c];
            hidden = column.hidden;

            if (hidden) {
                continue;
            }

            css           = [basePrefix + 'grid-cell'];
            styles        = [];
            attributes    = ['dataindex="' + column.dataIndex + '"'];
            width         = column.width;
            renderer      = column.renderer || this._defaultRenderer;
            rendererName  = column.dataIndex + '_renderer';

            if (header) {
                css.push(basePrefix + 'grid-cell-hd');
                innerText = column.header;
            } else {
                innerText = '{[this.' + rendererName + '(values.' + column.dataIndex + ', values)]}';

                if (column.style) {
                    styles.push(column.style);
                }

                if (column.cls) {
                    css.push(column.cls);
                }

                renderers[rendererName] = renderer;
            }

            if (width) {
                styles.push('width: ' + width + (Ext.isString(width) ? '' : 'px') + ';');
            }

            if (styles.length > 0) {
                attributes.push('style ="' + styles.join(' ') + '"');
            }

            tpl.push('<div class="' + css.join(' ') + '" ' + attributes.join('') + '>' + innerText + '</div>');
        }

        tpl = tpl.join('');

        return {
            tpl       : tpl,
            renderers : renderers
        };
    },

    getColumn: function(dataIndex) {
        var me       = this,
            columns  = me.getColumns(),
            c        = 0,
            cNum     = columns.length,
            column;

        for (; c < cNum; c++) {
            column = columns[c];

            if (column.dataIndex === dataIndex) {
                break;
            }
        }

        return column;
    },

    toggleColumn : function(index, hide) {
        var columns = this.getColumns(),
            column  = columns[index],
            itemTpl;

        if (!Ext.isDefined(hide)) {
            hide = !column.hidden;
        }

        column.hidden = hide;

        this.setItemTpl(null); //trigger new tpl on items and header
        this.refresh();
    },

    hideColumn : function(index) {
        this.toggleColumn(index, true);
    },

    showColumn : function(index) {
        this.toggleColumn(index, false);
    }
});