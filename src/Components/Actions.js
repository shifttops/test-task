import React from 'react'


import stylesActions from '../Styles/Actions.module.css'
import { NavLink } from "react-router-dom";

const Actions = (props) => {
    return(
        <div className={ stylesActions.actions }>
            <div className={ stylesActions.actions__body }>
                <NavLink to={'/home'} className={ stylesActions.actions__accept}>Применить</NavLink>
                <button onClick={props.onClear} className={ stylesActions.actions__clear}>Очистить</button>
            </div>
        </div>
    )
}

export default Actions