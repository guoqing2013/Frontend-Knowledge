'use strict';


module.exports = [ 'HOST',
    function(HOST) {
        return {
            query: HOST + 'QueryHandler.ashx',
            order: HOST + 'OrderHandler.ashx',
            pay: HOST + 'PayHandler.ashx'
        }
    }
];