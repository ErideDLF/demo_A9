import React from 'react';
import BaseComponent from '../../../core/components/BaseComponent';
import HomeStore from '../../stores/home/HomeStore';
import A9ActionsSearchAction from '../../actions/Home/A9ActionsSearchAction';
import InputBox from '../inputBox/InputBox';
import ResultsList from '../resultsList/ResultsList';


export default class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind('_onInputChange', '_onNewSearch');
        this.state = {
            data: {items: []},
            showWeekBoard: false,
            errorMessage: false,
        }
        this.lastRequestId = 0;
    }

    baseComponentWillMount() {
      const params = {q: 'react-native', page: 1, per_page: 10, sort: 'stars', order:'desc', lr: 0 };
      this.executeAction(A9ActionsSearchAction, params);
    }

    onStoreChange(store) {
        const eventName = store.getEventName();
        if (this.lastRequestId !== store.getRequestId()) return;
        if (eventName === 'onSearchSucces') {
            this.setState({
                data: store.getData(),
                isLoading: false,
                errorMessage: false,
            });
        } else if (eventName === 'onSearchFails') {
          this.setState({
              data: [],
              isLoading: false,
              errorMessage: store.getErrorMessage(),
          });
        }
    }

    getStores() {
        return [HomeStore];
    }

    _onInputChange(e, fieldValue) {
        this.lastRequestId++;
        const currentLastRequestId = this.lastRequestId;
        setTimeout(() => {this._onNewSearch(currentLastRequestId, fieldValue)}, 500);
    }

    _onNewSearch(requestId, fieldValue) {
        if (requestId !== this.lastRequestId) return;
        const query = 'framework+language:' + fieldValue;
        const params = {q: query, page: 1, per_page: 10, sort: 'stars', order:'desc', lr: this.lastRequestId };
        this.executeAction(A9ActionsSearchAction, params);
        this.setState({
          isLoading: true,
        });
    }

    renderBaseComponent() {
        const wrapper = (<div>
            <div className={'ui-a9-search-header'}>
                <InputBox onInputChange={this._onInputChange}/>
            </div>
            <div className={'ui-a9-home'}>
                <ResultsList
                    items={this.state.data.items}
                    isLoading={this.state.isLoading}
                    errorMessage={this.state.errorMessage}/>
            </div>
          </div>);
        return wrapper;
    }
};
