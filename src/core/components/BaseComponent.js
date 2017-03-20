import React from 'react';
import events from 'events';

/**
* Componente base de todos los componentes.
*/
export default class BaseComponent extends React.Component {
    constructor(props, opts = {}) {
        super(props);
        this._bind('_onStoreChange');
        this.constructor.displayName = this.constructor.name;
        if (typeof emitter === 'undefined') {
            global.emitter = new events.EventEmitter();
        }
        if (!emitter._auiEventHolding) {
            emitter._auiEventHolding = {};
        }

        this.stores = this.getStores(opts);
    }

    componentWillMount() {
        this.baseComponentWillMount();
    }

    componentDidMount() {
        this.stores.forEach( (store) => {
            this.context.getStore(store).addChangeListener(this._onStoreChange);
        });
        this.baseComponentDidMount();
    }

    componentWillReceiveProps(nextProps) {
        this.baseComponentWillReceiveProps(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.shouldBaseComponentUpdate(nextProps, nextState);
    }

    componentDidUpdate() {
        this.baseComponentDidUpdate();
    }

    componentWillUnmount() {
        this.stores.forEach( (store) => {
            this.context.getStore(store).removeChangeListener(this._onStoreChange);
        });
        this.baseComponentWillUnmount();
    }

    baseComponentWillMount() {}
    baseComponentDidMount() {}
    baseComponentWillReceiveProps() {}
    baseComponentDidUpdate() {}
    baseComponentWillUnmount() {}

    shouldBaseComponentUpdate(nextProps, nextState) {
        return true;
    }


    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }

    getStores() {
        return [];
    }

    _onStoreChange(store) {
        this.onStoreChange(store);
    }

    executeAction(action, params = {}) {
        if (!this.context.executeAction) return;
        const servicePayLoad = {
            params: params,
        };
        this.context.executeAction(action, servicePayLoad);
    }

    goTo(options) {
        // TODO transicciones entre rutas
    }

    render() {
        return this.renderBaseComponent();
    }

    _getKey(labels) {
        return this.displayName + labels.join('_');
    }

}

BaseComponent.prototype.getName = () => {
    return this.constructor.displayName || '';
};

BaseComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired,
};

BaseComponent.propTypes = {};

BaseComponent.defaultProps = {};
