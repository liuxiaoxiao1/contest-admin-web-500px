import _ from 'lodash';
import Api from './Api';


const DEFAULT_CONTEST_PARAMS = {
    page: 1,
    size: 20
};

export default class MessageApi {


    /**
     * 大赛上线后的 微信群提醒：
     * TODO: 可以再抽象一层，一个通用发消息的接口。 算了吧 暂时没需求
     * @param msgContent
     * @returns {*}
     */
    static sendMessageToWechat(msgContent) {
        const params = {
            recId: '48205cf6740edafe4c91d7db0c8636725', //发往特定账号（张汝泉账号），会推送到微信群（社区大群）
            message: encodeURIComponent(msgContent),
            json: 0,
            version:4
        };

        return Api.get(`/community/sitemessage/v3/insertMessage`, params);
    }












}
