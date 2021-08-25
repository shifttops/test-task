import React , { useCallback , useEffect , useState } from 'react'

import stylesMain from '../Styles/MainComponent.module.css'
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { incrementSelectedCount } from "../Redux/selectReducer";

const MainComponent = ({...props}) => {
    let counter = 0;

    let [selectedDataText] = useState ( [] )

    const createSelectedData = (optionsData) => {
        let checkFields = (fields) => {
            for (let field of fields) {
                checkField(field)
            }
        }

        let checkField = (field) => {
            if (field.isSelected) {
                selectedDataText.push ( `[${ field.type }] - ${ field.text }; ` )
            }
            if (field.nestedFields) return checkFields ( field.nestedFields )
            else if (field.nestedFields) return checkFields ( field.nestedFields )
        }

        checkFields(optionsData)
    }

    useEffect(() => {
        if (props.selectedCount !== 0) {
            createSelectedData ( props.optionsData )
        }
    }, [])

    let setCount = (useCallback ( (optionsData) => {
        for (const option of optionsData) {
            if (option.isSelected) {
                counter++
            }
            if (option.nestedFields) {
                setCount ( option.nestedFields )
            } else props.incrementSelectedCount ( counter )
        }
    } , [props.optionsData] ))

    useEffect ( () => {
        setCount ( props.optionsData )
        createSelectedData ( props.optionsData )
    } , [props.optionsData , setCount] )

    return (
        <div className={ stylesMain.mainComponent }>
            <div className={ stylesMain.mainComponent__body }>
                <div className={ stylesMain.mainComponent__text }>
                    { props.selectedCount !== 0 ? 'Тендеры в роли Заказчика' : 'Тендеры в роли Поставщика' }
                </div>
                <NavLink to={ '/selection' }
                         className={ stylesMain.input + ' ' + (props.selectedCount !== 0 && stylesMain.input__sl) }>
                    { props.selectedCount !== 0 ? selectedDataText : 'Код ОКРБ или наименование закупаемой продукции' }
                </NavLink>
                { props.selectedCount !== 0 &&
                <NavLink to={ '/selection' } className={ stylesMain.mainComponent__showBtn }>
                    Показать выбранное({ props.selectedCount })
                </NavLink> }
            </div>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        optionsData: state.select.options ,
        selectedCount: state.select.selectedCount ,
    }
}

export default connect ( MapStateToProps , {incrementSelectedCount} ) ( MainComponent )