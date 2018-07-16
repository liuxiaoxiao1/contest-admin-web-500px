import _ from 'lodash';
import Api from './Api';


const DEFAULT_CONTEST_PARAMS = {
    page: 1,
    size: 20
};

export default class UploadApi {
    static getOssInfo(originalNames, uploadType) {
        const params = {
            originalNames,
            uploadType // || photo。groupPhoto  默认groupPhoto
        }
        return Api.get('/community/v2/upload/ossInfo', _.merge({}, params));
    }

    static uploadFileWithOss(ossServerUrl, uploadParam) {

        return Api.upload.postWithMultipart(ossServerUrl, uploadParam);
    }

    static  commonUpload(uploadParams) {

        return Api.upload.postWithMultipart('/community/v2/upload/photo', uploadParams);
    }



}
