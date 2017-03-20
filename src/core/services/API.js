import BaseServiceOutput from '../services/BaseServiceOutput';
import request from 'superagent';
let requestNumber = 0;

class API {
    static get(url, params, callback) {
        const rqNumber = requestNumber++;
        console.log('[' + rqNumber + '] Get Url: ' + url);
        request
          .get(url)
          .query(params)
          .end(function(err, res) {
            const baseServiceOutput = new BaseServiceOutput();
            if (err) {
                console.log('[' + rqNumber + '] get: Error: ' + err);
                baseServiceOutput.setError(true, 'Error de comunicación con el servidor');
                baseServiceOutput.setResult(res.text);
            } else {
                baseServiceOutput.setResult(res.text);
            }
            if (callback) callback(baseServiceOutput)
        });
    }

}

export default API;
