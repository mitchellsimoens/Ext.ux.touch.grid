Ext.define('Ext.ux.touch.grid.feature.Feature', {
    extend: 'Ext.mixin.Mixin',

    mixinConfig: {
        id: 'feature'
    },

    initFeatures: function(features) {
        features = features || [];

        var me   = this,
            f    = 0,
            fNum = features.length,
            feature, cfg;

        me._features = Ext.create('Ext.util.MixedCollection');

        for (; f < fNum; f++) {
            feature = features[f];
            cfg     = {};

            if (typeof feature === 'object') {
                cfg     = feature;
                feature = feature.ftype;
                delete cfg.ftype;
            }

            feature = Ext.ClassManager.instantiate(feature);

            if (feature && typeof feature.init === 'function') {
                Ext.apply(feature, cfg);

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
    }
});
