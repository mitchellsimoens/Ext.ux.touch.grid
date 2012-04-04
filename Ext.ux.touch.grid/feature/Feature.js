Ext.define('Ext.ux.touch.grid.feature.Feature', {
    extend: 'Ext.mixin.Mixin',

    mixinConfig: {
        id : 'feature'
    },

    initFeatures: function(features, launchFn) {
        var me = this;

        features = me.getFeatures(features, launchFn);

        var f    = 0,
            fNum = features.length,
            feature, cfg, cls;

        if (!me._features) {
            me._features = Ext.create('Ext.util.MixedCollection');
        }

        for (; f < fNum; f++) {
            feature = features[f];
            cfg     = {};

            if (typeof feature === 'object') {
                Ext.apply(cfg, feature);
                feature = cfg.ftype;
                delete cfg.ftype;
            }

            cfg.grid = me;

            feature = Ext.create(feature, cfg);

            me.addCls(feature.getExtraCls());

            if (feature && typeof feature.init === 'function') {
                me._features.add(feature);

                feature.init(me);

                me.on('beforedestroy', me.destroyFeatures, me, { single : true });
            }
        }
    },

    destroyFeatures: function() {
        var me       = this,
            features = me._features;

        features.each(function(feature) {
            if (typeof feature.onDestroy === 'function') {
                feature.onDestroy();
            }
        });
    },

    getFeatures: function(features, launchFn) {
        features = features || [];

        var f           = 0,
            fNum        = features.length,
            retFeatures = [],
            feature;

        for (; f < fNum; f++) {
            feature = features[f];

            if (feature.launchFn === launchFn) {
                retFeatures.push(feature);
            }
        }

        return retFeatures
    }
});
