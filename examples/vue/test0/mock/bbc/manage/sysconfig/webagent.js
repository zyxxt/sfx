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
            primary_webagent: '1.1.1.1',
            secondary_webagent: '255.255.255.0',
            shared_passwd: '1.1.1.2',
            port: 1232
        }
    };
};

