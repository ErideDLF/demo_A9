import BaseStore from 'fluxible/addons/BaseStore';
import RouteStore from './RouteStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.pageTitle = '';
        this.response = '';
    }

    handlePageTitle(currentRoute) {
        this.dispatcher.waitFor(RouteStore, () => {
            if (currentRoute && currentRoute.title) {
                this.pageTitle = currentRoute.title;
                this.emitChange();
            }
        });
    }

    handleHomeSearch(serviceResult) {
        console.log('ApplicationStore handleHomeSearch ' + serviceResult);
        this.response = serviceResult.getResult().toString();
        this.emitChange();
    }

    getPageTitle() {
        return this.pageTitle;
    }

    getResponse() {
        return this.response;
    }

    dehydrate() {
        return {
            pageTitle: this.pageTitle
        };
    }
    rehydrate(state) {
        this.pageTitle = state.pageTitle;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle',
    'HOME_SEARCH_ACTION_SUCCESS': 'handleHomeSearch'
};

export default ApplicationStore;
