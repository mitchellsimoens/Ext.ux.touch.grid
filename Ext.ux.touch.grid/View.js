Ext.define('Ext.ux.touch.grid.View', {
    extend   : 'Ext.DataView',
    xtype    : 'touchgridpanel',
    requires : ['Ext.ux.touch.grid.feature.Feature'],
    mixins   : ['Ext.ux.touch.grid.feature.Feature'],

    config : {
        cls : 'touchgridpanel'
    },

    constructor: function(config) {
        var me = this;

        Ext.apply(config, {
            itemTpl : me._buildTpl(config.colModel, false)
        });

        if (typeof me.initFeatures === 'function') {
            me.initFeatures(config.features.constructorFn);
        }

        me.callParent(arguments);
    },

    initialize: function() {
        var me = this;

        header = me.header = me.insert(0, {
            xtype  : 'container',
            cls    : 'x-grid-hd-row',
            docked : 'top',
            height : 40,
            html   : me._buildTpl(this.colModel, true)
        });

        if (typeof me.initFeatures === 'function') {
            me.initFeatures(me.features.initializeFn);
        }

        me.callParent(arguments);
    },

    _defaultRenderer: function(value, values) {
        return value;
    },

    _buildTpl: function(colModel, header) {
        var tpl        = [],
            c          = 0,
            cNum       = colModel.length,
            basePrefix = Ext.baseCSSPrefix,
            renderers  = {},
            column, css, styles, attributes, width, renderer, rendererName, rendererStart, rendererEnd, innerText;

        for (; c < cNum; c++) {
            column        = colModel[c];
            css           = [basePrefix + 'grid-cell'],
            styles        = [];
            attributes    = ['dataindex="' + column.dataIndex + '"'];
            width         = column.width;
            renderer      = column.renderer || this._defaultRenderer;
            rendererName  = column.dataIndex + '_renderer';
            rendererStart = '';
            rendererEnd   = '';

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
    }
});