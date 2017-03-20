import BaseStore from 'fluxible/addons/BaseStore';

class HomeStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.data = {};
        this.requestId = 0;
        this.eventName = '';
    }

    _handleActionsSearchSuccess(serviceResult) {
        if (serviceResult.isError()) return;

        this.data.items = [];
        const resultsRaw = serviceResult.getResult();
        resultsRaw.items.forEach((item, index) => {
            const formattedItem = {
                id: item.id,
                name: item.name,
                avatarUrl: item.owner.avatar_url,
                description: item.description,
                url: item.html_url,
                score: item.score,
            }
            this.data.items.push(formattedItem);
        });
        this.requestId = serviceResult._payload.params.lr;
        this.eventName = 'onSearchSucces';
        this.emitChange();
    }

    _handleActionsSearchFails(serviceResult) {
      const resultsRaw = serviceResult.getResult();
      this.requestId = serviceResult._payload.params.lr;
      this.errorMessage = resultsRaw.message;
      this.eventName = 'onSearchFails';
      this.emitChange();
    }

    getData() {
        return this.data;
    }

    getRequestId() {
        return this.requestId;
    }

    getEventName() {
        return this.eventName;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    dehydrate() {
        return {
            data: this.data
        };
    }
    rehydrate(state) {
        this.data = state.data;
    }
}

HomeStore.storeName = 'HomeStore';
HomeStore.handlers = {
    'a9_ACTIONS_SEARCH_SUCCESS': '_handleActionsSearchSuccess',
    'a9_ACTIONS_SEARCH_FAIL': '_handleActionsSearchFails',
};

export default HomeStore;
