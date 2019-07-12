var cfg = {

    dev: '/api', //测试服--代理
    dev_img: '/api',
    dev_download: '/api',
    // pro:'http://172.16.10.34:9091',
    // pro_img: 'http://172.16.10.34:9091',
    // pro_download: 'http://172.16.10.34:9091',
    pro:'http://32.252.35.238:9091',
    pro_img: 'http://32.252.35.238:9091',
    pro_download: 'http://32.252.35.238:9091',
    // pro:'http://116.236.220.216:9091',
    // pro_img: 'http://116.236.220.216:9091',
    // pro_download: 'http://116.236.220.216:9091',
    // pro:'https://corp.syrcbank.com/customer',  // 甲方生产外网
    // pro_img: 'https://corp.syrcbank.com/customer',
    // pro_download: 'https://corp.syrcbank.com/customer'
};

var base_url = '';
var base_url_img = '';
var base_url_downloads = '';
switch (process.env.NODE_ENV) {
    case "development":
        base_url = cfg.dev;
        base_url_img = cfg.dev_img;
        base_url_downloads = cfg.dev_download;
        break;
    case "testing":
        base_url = cfg.dev;
        base_url_download = cfg.dev_download;
        break;
    case "production":
        base_url = cfg.pro;
        base_url_img = cfg.pro_img;
        base_url_downloads = cfg.pro_download;
        break;
}

export const baseURL = base_url
export const baseURLImg = base_url_img
export const baseURLDownloads = base_url_downloads
