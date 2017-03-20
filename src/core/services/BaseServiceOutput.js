'use strict';

export default class BaseResult {

    constructor() {
        this.reset();
    }

    reset() {
        this._isError = false;
        this._errorMessage = '';
        this._result = {};
        this._payload = null;
    }

    setError(boolean, errorMessage) {
        this._isError = boolean;
        this._errorMessage = errorMessage;
    }

    setResult(result) {
        this._result = JSON.parse(result);
    }

    setPayload(payload) {
        this._payload = payload;
    }

    isError() {
        return this._isError;
    }

    getErrorMessage() {
        return this._errorMessage;
    }

    getPayload() {
        return this._Payload;
    }

    getResult() {
        return this._result;
    }

    dehydrate() {
        return JSON.stringify({
            isError: this._isError,
            errorMessage: this._errorMessage,
            result: this._result,
            payload: this._payload,
        });
    }

    rehydrate(stateJSON) {
        const state = JSON.parse(stateJSON);
        this._isError = state.isError;
        this._errorMessage = state._errorMessage;
        this._result = state.result;
        this._payload = state.payload;
    }
}
