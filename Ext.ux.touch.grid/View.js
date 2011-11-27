Ext.define('Ext.ux.touch.grid.View', {
    extend   : 'Ext.dataview.DataView',
    xtype    : 'touchgridpanel',

    requires : ['Ext.ux.touch.grid.feature.Feature'],
    mixins   : ['Ext.ux.touch.grid.feature.Feature'],

    config : {
        columns : [],
        cls     : 'touchgridpanel'
    },

    constructor: function(config) {
        var me       = this,
            columns = config.columns || me.config.columns || me.columns;

        Ext.apply(config, {
            itemTpl : me._buildTpl(columns, false)
        });

        if (typeof me.initFeatures === 'function' && typeof config.features === 'object') {
            me.initFeatures(config.features, 'constructor');
        }

        me.callParent(arguments);

        me.setWidth(me._buildWidth());
    },

    initialize: function() {
        var me = this;

        me.header = me.insert(0, {
            xtype  : 'container',
            cls    : 'x-grid-hd-row',
            docked : 'top',
            height : 40,
            html   : me._buildTpl(me.getColumns(), true)
        });

        if (typeof me.initFeatures === 'function' && typeof me.features === 'object') {
            me.initFeatures(me.features, 'initialize');
        }

        me.callParent(arguments);
    },

    _buildWidth: function() {
        var me       = this,
            columns  = me.getColumns(),
            c        = 0,
            cNum     = columns.length,
            retWidth = 0,
            stop     = false,
            column, width;

        //console.log(me.getCalcWidth());
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

    _defaultRenderer: function(value, values) {
        return value;
    },

    _buildTpl: function(columns, header) {
        var tpl        = [],
            c          = 0,
            cNum       = columns.length,
            basePrefix = Ext.baseCSSPrefix,
            renderers  = {},
            column, css, styles, attributes, width, renderer, rendererName, innerText;

        for (; c < cNum; c++) {
            column        = columns[c];
            css           = [basePrefix + 'grid-cell'],
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
            }

            if (width) {
                styles.push('width: ' + width + (Ext.isString(width) ? '' : 'px') + ';');
            }

            if (styles.length > 0) {
                attributes.push('style ="' + styles.join(' ') + '"');
            }

            renderers[rendererName] = renderer;

            tpl.push('<div class="' + css.join(' ') + '" ' + attributes.join('') + '>' + innerText + '</div>');
        }

        tpl = tpl.join('');

        if (!header) {
            return new Ext.XTemplate(tpl, renderers);
        }

        return tpl;
    },

    getColumn: function(dataIndex) {
        var me       = this,
            columns = me.columns,
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
    }
});