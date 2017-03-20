import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import BaseComponent from './BaseComponent';
import pages from '../../configs/routes';
import ApplicationStore from '../stores/ApplicationStore';
import MainNavBar from '../../a9/components/mainNavBar/MainNavBar';


class Application extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            response: '',
        }
    }

    onStoreChange(store) {
        this.setState({
            response: store.getResponse(),
        });
    }

    getStores() {
        return [ApplicationStore];
    }

    renderBaseComponent() {
        var Handler = this.props.currentRoute.handler;

        return (
            <div>
                <MainNavBar currentRoute={this.props.currentRoute} links={pages} />
                <Handler />
                {this.state.response}
            </div>
        );
    }
}

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (context, props) {
        var appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
)));
