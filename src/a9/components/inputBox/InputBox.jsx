import React from 'react';
// import classNames from 'classnames';
import BaseComponent from '../../../core/components/BaseComponent';
/**
* Input principal de búsqueda.
*
* @class InputBox
* @extends BaseComponent
* @module src
*/
export default class InputBox extends BaseComponent {
    displayName : 'InputBox'
    constructor(props) {
        super(props);
        this._bind('_onChange',
        '_getEventTarGetValue',
        '_normalizedValue');

        this.state = {
            fieldValue: '',
        };

        this._refInputbox = null;
    }

    _normalizedValue(value) {
        return (value === null || value === undefined) ? '' : value + '';
    }

    _getEventTarGetValue(e) {
        const fieldValue = e.target.value + '';
        return this._normalizedValue(fieldValue);
    }

    _onChange(e) {
        const fieldValue = this._getEventTarGetValue(e);
        this.setState({
            fieldValue: fieldValue,
        });

        console.log('onChange', 'value:', fieldValue);
        if (this.props.onInputChange) this.props.onInputChange(e, fieldValue);

    }

    renderBaseComponent() {

        return (
            <div className="input-field ui-a9-input">
                <i className="material-icons md-25 md-light ui-a9-input-icon prefix">search</i>
                    <input ref={(item) => {this._refInputbox = item;} }
                      id="inputBox"
                      value={this.state.fieldValue}
                      onChange={this._onChange}
                      placeholder={"Introduzca el nombre del framework que quiera buscar"}
                      type="text" />
            </div>
        );


    }
}

InputBox.propTypes = {
    /**
    * Se llama cuando se produce un cambio en el input.
    *
    * @property onInputChange
    * @type Function
    * @default null
    */
    onInputChange: React.PropTypes.func,
};

InputBox.defaultProps = {
    onInputChange: () => {},
};
