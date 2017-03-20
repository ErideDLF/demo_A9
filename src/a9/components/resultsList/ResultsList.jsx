import React from 'react';
import classNames from 'classnames';
import BaseComponent from '../../../core/components/BaseComponent';

import ItemCard from '../itemCard/ItemCard.jsx';

/**
* Tablero semanal de actividades
*
* @class ResultsList
* @extends BaseComponent
* @module Core
*/
export default class ResultsList extends BaseComponent {
    displayName : 'ResultsList'
    constructor(props) {
        super(props);
        this._bind();
        this.state = {
            items: this.props.items,
            isLoading: false,
        }
    }

    baseComponentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.props.items) {
          this.setState({
              items: nextProps.items,
              isLoading: nextProps.isLoading,
          });
      }
    }

    renderBaseComponent() {
        let itemsContainer = [];

        if (this.state.isLoading) {
          const imgStyle = {
              display: 'flex',
              margin: '100px auto 50px auto',
              width: '150px',
          };
          const divStyle = {
              display: 'flex',
              margin: 'auto',
              width: '300px',
          };
          itemsContainer = (
            <div className={'ui-a9-loader'}>
                <img className={'ui-a9-loader-img'}
                    style={imgStyle}
                    src={'http://findicons.com/files/icons/2813/flat_jewels/128/search.png'}/>
                <div className="ui-a9-loader-progress progress" style={divStyle}>
                    <div className="indeterminate"></div>
                </div>
            </div>
          );
        } else {
            if (this.props.errorMessage) {
                itemsContainer = (<div className="deep-orange darken-4 ui-a9-error">{this.props.errorMessage}</div>);
            } else {
                this.state.items.map((item, index) => {
                    itemsContainer.push(
                        <ItemCard
                            key={'item-' + index}
                            itemInfo={item}>
                        </ItemCard>
                    );
                });
            }
        }

        const resultsListContent = (
            <div
                key="results-list-content"
                className="ui-a9-results-list-column">
                {itemsContainer}
            </div>
        );

        return (
            <div className="ui-a9-results-list z-depth-1">{resultsListContent}</div>
        );
    }
}

ResultsList.propTypes = {
    /**
    * resultados de las búsquedas.
    *
    * @property items
    * @type array
    * @default []
    */
    items: React.PropTypes.array,
};

ResultsList.defaultProps = {
  items: [],
};
