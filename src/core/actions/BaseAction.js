'use strict';

import BaseService from '../services/BaseService';

export default (actionConfig) => {
    const baseService = new BaseService(actionConfig);
    return baseService.execute.bind(baseService);
}
