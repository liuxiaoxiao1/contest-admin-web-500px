import _ from 'lodash';
import Api from './Api';


const DEFAULT_CONTEST_PARAMS = {
    page: 1,
    size: 20
};

export default class ContestApi {
    static getContest(id) {
        const params = {
            contestId: id,
        };

        return Api.get(`/contest/v4/back/editInfo`, params);
    }

    static updateContest(data={}) {
        const params = {
            data,
        };

        return Api.get('/photos', _.merge({}, DEFAULT_CONTEST_PARAMS, params));
    }

    static getContestList(page, size) {
        const params = {
            page,
            size
        }
        return Api.get('/contest/v4/back/list', _.merge({}, DEFAULT_CONTEST_PARAMS, params));
    }

    static setContestRating(contestId, value) {
        const params = {
            contestId: contestId,
            rating  : value
        }
        return Api.get('/contest/v4/back/setRating', _.merge({}, params));
    }

    static setContestListShow(contestId, value) {
        const params = {
            contestId: contestId,
            listShow  : value
        }
        return Api.get('/contest/v4/back/setListShow', _.merge({}, params));
    }

    static setContestOnline(contestId, value) {
        const params = {
            contestId: contestId,
            online  : value
        }
        return Api.get('/contest/v4/back/setOnline', _.merge({}, params));
    }

    static deleteContest(contestId) {
        const params = {
            contestId: contestId,
        }
        return Api.get('/contest/v4/back/delete', _.merge({}, params));
    }

    static newOrUpdateContest(params) {

        console.log('params', params);
        return Api.commonPost.postObject('/contest/v4/back/create/step1', params);
    }

    static updateContestThemes(params) {
        return Api.commonPost.postObject('/contest/v4/back/create/step2', params);
    }

    static updateContestColumns(params) {
        return Api.commonPost.postObject('/contest/v4/back/create/step3', params);
    }

    static updateContestPrizeCategories(params) {
        return Api.commonPost.postObject('/contest/v4/back/create/step4', params);
    }




    //以下是优秀作品和优秀摄影师API

    /**
     * 获取 优秀作品或优秀摄影师 列表
     * @param contestId   当前大赛id
     * @param selectType  user | works  优秀摄影师 或 优秀作品
     * @param page
     * @param size
     * @returns {*}
     */
    static getContestSelectList(contestId, selectType, page, size) {
        const params = {
            contestId,
            selectType,
            page,
            size
        }
        return Api.get('/contest/v4/back/selectList', _.merge({}, DEFAULT_CONTEST_PARAMS, params));
    }


    /**
     * 更新 优秀作品或优秀摄影师
     * @param contestId   当前大赛id
     * @param selectType  user | works  优秀摄影师 或 优秀作品
     * @param selectId
     * @param updateType  add | remove  添加或者删除
     * @returns {*}
     */
    static updateSelect(contestId, selectType, selectId, updateType) {
        const params = {
            contestId,
            selectType,
            selectId,
            updateType
        }
        return Api.get('/contest/v4/back/updateSelect', params);
    }


    /**
     * 获取大赛奖项配置信息
     * @param contestId 大赛id
     * @param prizeFlag 传true
     */
    static getContestPrizeConfig(contestId, prizeFlag = true) {
        const params = {
            contestId,
            prizeFlag,
        }
        return Api.get('/contest/v4/back/getShowConfig', params);
    }


    /**
     * 获取大赛 获奖记录
     * @param prizeId 传true
     */
    static getContestPrizeRecordList(prizeId) {
        const params = {
            prizeId,
        }
        return Api.get('/contest/v4/back/prizeRecordList', params);
    }



    /**
     * 添加 获奖记录  TODO: 给人颁奖报错  删除人的颁奖还没测
     * @param prizeId 奖项id
     * @param resId   作品或者用户id
     */
    static addPrizeRecord(prizeId, resId) {
        const params = {
            prizeId,
            resId
        }
        return Api.get('/contest/v4/back/addPrizeRecord', params);
    }


    /**
     * 删除 获奖记录
     * @param prizeRecordId 获奖记录id
     */
    static deletePrizeRecord(prizeRecordId) {
        const params = {
            prizeRecordId,
        }
        return Api.get('/contest/v4/back/deletePrizeRecord', params);
    }


    /**
     * 关联部落
     * @param contestId 大赛id
     * @param tribeId   部落id
     */
    static relatedTribeAndContest(contestId, tribeId) {
        const params = {
            contestId,
            tribeId
        }
        return Api.post('/community/tribe/admin/v4/relatedTribeAndContest', params);
    }


    /**
     * 删除 部落 活动关联
     * @param contestId 大赛id
     * @param tribeId   部落id
     */
    static deleteTribeContest(contestIds, tribeId) {
        const params = {
            contestIds,
            tribeId
        }
        return Api.commonPost.postObject('/community/tribe/admin/v4/deleteTribeContest', params);
    }










}
