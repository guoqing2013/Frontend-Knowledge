/**
 *  @brief  日期或时间小于0的前面加0
 */

module.exports = [function() {
    return function (i) {
        if (i < 10 && i >= 0) {
            i = '0' + i;
        }
        return i;
    };
}];

