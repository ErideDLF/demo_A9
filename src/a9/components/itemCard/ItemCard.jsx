import React from 'react';
import classNames from 'classnames';
import BaseComponent from '../../../core/components/BaseComponent';

/**
* Tarjetas con la informaciónd e las tareas.
*
* @class ItemCard
* @extends BaseComponent
* @module src
*/
export default class ItemCard extends BaseComponent {
    displayName : 'ItemCard'
    constructor(props) {
        super(props);
    }

    renderBaseComponent() {
        const itemInfo = this.props.itemInfo;
        const itemInfoItemClasses = classNames({
            'ui-a9-item-card': true,
            'z-depth-1': true,
            'ui-a9-activity-car-type-0': true,
        });

        return (
          <div className={itemInfoItemClasses}>
              <div className="ui-a9-item-card-avatar">
                  <img className="ui-a9-item-card-avatar-img"
                      src={itemInfo.avatarUrl}/>
                    <div className="ui-a9-item-card-avatar-score">{itemInfo.score}</div>
              </div>
              <div className="ui-a9-item-card-info">
                  <div className="ui-a9-item-card-row ui-a9-item-card-border-row">
                      <span className="ui-a9-item-card-title"> Nombre: </span>
                      <span className="ui-a9-item-card-text"> {itemInfo.name}</span>
                  </div>
                  <div className="ui-a9-item-card-row">
                      <span className="ui-a9-item-card-title"> Descripción: </span>
                      <span className="ui-a9-item-card-text"> {itemInfo.description}</span>
                  </div>
                  <div className="ui-a9-item-card-row">
                      <span className="ui-a9-item-card-title"> Repositorio: </span>
                      <span className="ui-a9-item-card-link"> <a href={itemInfo.url}>ver</a></span>
                      <div className="clearfix"></div>
                  </div>
              </div>
          </div>

        );


    }
}

ItemCard.propTypes = {

    /**
    * Información a mostrar del resultado.
    *
    * @property itemInfo
    * @type Object
    * @default {}
    */
    itemInfo: React.PropTypes.object,

    /**
    * Filtro para saber si debe mostrarse la tarjeta o no.
    *
    * @property filterName
    * @type Number
    * @default null
    */
    filterName: React.PropTypes.number,


};

ItemCard.defaultProps = {
    itemInfo: {},
    filterName: null,
};
