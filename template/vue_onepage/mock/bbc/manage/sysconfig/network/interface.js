/**
 * Created by ued on 2017/1/17.
 */

exports.check = function () {
    return false;
}

exports.mockData = function (option) {
    return {
        success: true,
        data: {
            address: '1.1.1.1',
            netmask: '255.255.255.0',
            gateway: '1.1.1.2'
        }
    };
};
