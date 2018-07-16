import _ from 'lodash';
import Api from './Api';


const DEFAULT_TRIBE_PARAMS = {
    page: 1,
    size: 20
};

export default class TribeApi {


    /**
     * 获取部落
     * @param page
     * @param size
     * @returns {*}
     */
    static getTribeList(page, size) {
        const params = {
            page,
            size,
            clientType: 'web',
            authentication: 'all',
            imgSize: 'p1,p2,p3,p4,p5,p6'
        }
        return Api.get('/community/tribe/home', _.merge({}, DEFAULT_TRIBE_PARAMS, params));
    }

    /**
     * 搜索 部落
     * @param page
     * @param size
     * @returns {*}
     */
    static searchTribeByKey(page, size, key = '') {
        const params = {
            page,
            size,
            key,
            searchType: 'tribe',
            imgSize: 'p1,p2,p3,p4,p5,p6'
        }
        return Api.get('/community/searchv2', _.merge({}, DEFAULT_TRIBE_PARAMS, params));
    }







}
