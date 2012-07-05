<?php

$records = array(
    array('id' => 1,  'company' => '3m Co',                               'price' => 71.72, 'change' => 0.02,  'pct' => 0.03,  'updated' => '9/1/2012'),
    array('id' => 2,  'company' => 'Alcoa Inc',                           'price' => 29.01, 'change' => 0.42,  'pct' => 1.47,  'updated' => '9/1/2012'),
    array('id' => 3,  'company' => 'Altria Group Inc',                    'price' => 83.81, 'change' => 0.28,  'pct' => 0.34,  'updated' => '9/1/2012'),
    array('id' => 4,  'company' => 'American Express Company',            'price' => 52.55, 'change' => 0.01,  'pct' => 0.02,  'updated' => '9/1/2012'),
    array('id' => 5,  'company' => 'American International Group, Inc.',  'price' => 64.13, 'change' => 0.31,  'pct' => 0.49,  'updated' => '9/1/2012'),
    array('id' => 6,  'company' => 'AT&#38;T Inc.',                       'price' => 31.61, 'change' => -0.48, 'pct' => -1.54, 'updated' => '9/1/2012'),
    array('id' => 7,  'company' => 'Boeing Co.',                          'price' => 75.43, 'change' => 0.53,  'pct' => 0.71,  'updated' => '9/1/2012'),
    array('id' => 8,  'company' => 'Caterpillar Inc.',                    'price' => 67.27, 'change' => 0.92,  'pct' => 1.39,  'updated' => '9/1/2012'),
    array('id' => 9,  'company' => 'Citigroup, Inc.',                     'price' => 49.37, 'change' => 0.02,  'pct' => 0.04,  'updated' => '9/1/2012'),
    array('id' => 10, 'company' => 'E.I. du Pont de Nemours and Company', 'price' => 40.48, 'change' => 0.51,  'pct' => 1.28,  'updated' => '9/1/2012'),
    array('id' => 11, 'company' => 'Exxon Mobil Corp',                    'price' => 68.10, 'change' => -0.43, 'pct' => -0.64, 'updated' => '9/1/2012'),
    array('id' => 12, 'company' => 'General Electric Company',            'price' => 34.14, 'change' => -0.08, 'pct' => -0.23, 'updated' => '9/1/2012'),
    array('id' => 13, 'company' => 'General Motors Corporation',          'price' => 30.27, 'change' => 1.09,  'pct' => 3.74,  'updated' => '9/1/2012'),
    array('id' => 14, 'company' => 'Hewlett-Packard Co.',                 'price' => 36.53, 'change' => -0.03, 'pct' => -0.08, 'updated' => '9/1/2012'),
    array('id' => 15, 'company' => 'Honeywell Intl Inc',                  'price' => 38.77, 'change' => 0.05,  'pct' => 0.13,  'updated' => '9/1/2012'),
    array('id' => 16, 'company' => 'Intel Corporation',                   'price' => 19.88, 'change' => 0.31,  'pct' => 1.58,  'updated' => '9/1/2012'),
    array('id' => 17, 'company' => 'International Business Machines',     'price' => 81.41, 'change' => 0.44,  'pct' => 0.54,  'updated' => '9/1/2012'),
    array('id' => 18, 'company' => 'Johnson &#38; Johnson',               'price' => 64.72, 'change' => 0.06,  'pct' => 0.09,  'updated' => '9/1/2012'),
    array('id' => 19, 'company' => 'JP Morgan &#38; Chase &#38; Co',      'price' => 45.73, 'change' => 0.07,  'pct' => 0.15,  'updated' => '9/1/2012'),
    array('id' => 20, 'company' => 'McDonald\'s Corporation',             'price' => 36.76, 'change' => 0.86,  'pct' => 2.40,  'updated' => '9/1/2012'),
    array('id' => 21, 'company' => 'Merck &#38; Co., Inc.',               'price' => 40.96, 'change' => 0.41,  'pct' => 1.01,  'updated' => '9/1/2012'),
    array('id' => 22, 'company' => 'Microsoft Corporation',               'price' => 25.84, 'change' => 0.14,  'pct' => 0.54,  'updated' => '9/1/2012'),
    array('id' => 23, 'company' => 'Pfizer Inc',                          'price' => 27.96, 'change' => 0.40,  'pct' => 1.45,  'updated' => '9/1/2012'),
    array('id' => 24, 'company' => 'The Coca-Cola Company',               'price' => 45.07, 'change' => 0.26,  'pct' => 0.58,  'updated' => '9/1/2012'),
    array('id' => 25, 'company' => 'The Home Depot, Inc.',                'price' => 34.64, 'change' => 0.35,  'pct' => 1.02,  'updated' => '9/1/2012'),
    array('id' => 26, 'company' => 'The Procter &#38; Gamble Company',    'price' => 61.91, 'change' => 0.01,  'pct' => 0.02,  'updated' => '9/1/2012'),
    array('id' => 27, 'company' => 'United Technologies Corporation',     'price' => 63.26, 'change' => 0.55,  'pct' => 0.88,  'updated' => '9/1/2012'),
    array('id' => 28, 'company' => 'Verizon Communications',              'price' => 35.57, 'change' => 0.39,  'pct' => 1.11,  'updated' => '9/1/2012'),
    array('id' => 29, 'company' => 'Wal-Mart Stores, Inc.',               'price' => 45.45, 'change' => 0.73,  'pct' => 1.63,  'updated' => '9/1/2012')
);

if (isset($_REQUEST['sleep'])) {
    sleep($_REQUEST['sleep']);
}

$page = array_slice($records, $_REQUEST['start'], $_REQUEST['limit']);

$columns = array(
    array( 'header' => 'Company',      'dataIndex' => 'company', 'style' => 'padding-left: 1em;',                     'width' => '40%' ),
    array( 'header' => 'Price',        'dataIndex' => 'price',   'style' => 'text-align: center;',                    'width' => '15%' ),
    array( 'header' => 'Change',       'dataIndex' => 'change',  'cls'   => 'centered-cell redgreen-cell',            'width' => '15%' ),
    array( 'header' => '% Change',     'dataIndex' => 'pct',     'cls'   => 'centered-cell redgreen-cell',            'width' => '15%' ),
    array( 'header' => 'Last Updated', 'dataIndex' => 'updated', 'style' => 'text-align: right; padding-right: 1em;', 'width' => '15%' )
);

echo json_encode(
    array( 'success' => true, 'total' => count($records), 'data' => $page, 'columns' => $columns )
);

?>