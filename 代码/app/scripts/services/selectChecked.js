/**
 *  @brief  click事件后添加样式
 */

module.exports = [function() {
    return function (index, styleArr, className) {
        for(var i = 0, len = styleArr.length; i < len; i++) {
            if(i == index) {
                styleArr[i] = className;
            } else {
                styleArr[i] = '';
            }
        }
    };
}];

