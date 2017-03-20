'use strict';

import API from './API';
// const ENDPOINT = 'https://m-lean.com/'; Access-Control-Allow-Origin (CORS)
const MOCK_ENDPOINT = 'https://api.github.com/search/repositories';

export default class BaseService {
    constructor(actionConfig, params) {
        this._actionConfig = actionConfig || {};
    }

    execute(context, payload, done) {
        if (!this._actionConfig.apiRequest) {
            me.doSuccess(context, baseResult);
            me.doDone(context, baseResult);
            if (done) done();
        } else {
            const me = this;
            const url = MOCK_ENDPOINT + this._actionConfig.apiURL;
            const params = payload.params;
            API.get(url, params, (baseServiceOutput) => {
                baseServiceOutput.setPayload(payload);
                if (baseServiceOutput.isError()) {
                    me.doFail(context, baseServiceOutput);
                } else {
                    me.doSuccess(context, baseServiceOutput);
                }
                me.doDone(context, baseServiceOutput);
            });
        }
        return context;
    }

    doSuccess(actionContext, payload) {
        const actionEventName = this._actionConfig.name + '_SUCCESS';
        console.log('will dispatch ' + actionEventName);
        actionContext.dispatch(actionEventName, payload);
    }

    doFail(actionContext, payload) {
        const actionEventName = this._actionConfig.name + '_FAIL';
        console.log('will dispatch ' + actionEventName);
        actionContext.dispatch(actionEventName, payload);
    }

    doDone(actionContext, payload) {
        const actionEventName = this._actionConfig.name + '_DONE';
        console.log('will dispatch ' + actionEventName);
        actionContext.dispatch(actionEventName, payload);
    }
}
