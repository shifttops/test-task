import React , { useState } from 'react'

import stylesSelect from '../Styles/Select.module.css'
import OptionComponent from "./OptionComonent";
import { clearAllFields , setSelection , setVisibility } from "../Redux/selectReducer";
import { connect } from "react-redux";
import Actions from "./Actions";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Select = ({focus , optionsData , ...props}) => {
    let [searchedWords , setSearchedWords] = useState ( '' )
    let [highId] = useState ( [] )

    let createAllOptions = (allOptionsData) => {
        let allOptionsArray = []
        let createOptions = (option , componentsArray = []) => {
            highId.push ( {id: option.id , depth: option.depth + 1} )

            if (searchedWords) {
                option.text.toLowerCase ().includes ( searchedWords.toLowerCase () ) && componentsArray.push (
                    <OptionComponent { ...props }
                                     id={ option.id }
                                     visibility={ option.isVisible }
                                     isVisible={ option.nestedFields ? option.nestedFields[0].isVisible : null }
                                     type={ option.type }
                                     text={ option.text }
                                     depth={ option.depth }
                                     searchedWords={ searchedWords }
                                     isSelected={ option.isSelected }
                                     hasNested={!!option.nestedFields}
                    /> )
            } else componentsArray.push ( <OptionComponent { ...props }
                                                           id={ option.id }
                                                           visibility={ option.isVisible }
                                                           isVisible={ option.nestedFields ? option.nestedFields[0].isVisible : null }
                                                           type={ option.type }
                                                           text={ option.text }
                                                           depth={ option.depth }
                                                           searchedWords={ searchedWords }
                                                           isSelected={ option.isSelected }
                                                           hasNested={!!option.nestedFields}
            /> )
            if (option.nestedFields) {
                for (let option1 of option.nestedFields) {
                    createOptions ( option1 , componentsArray )
                }
            }
            return componentsArray
        }

        for (let option of allOptionsData) {
            highId.push ( option.id )
            allOptionsArray.push ( createOptions ( option ) )
        }

        return allOptionsArray
    }
    let createdOptionsData = createAllOptions ( optionsData )


    let onChange = (e) => {
        setSearchedWords ( e.target.value )
    }

    let onFocus = () => {
        for (let obj of highId) {
            props.setVisibility ( true , obj.depth , obj.id )
        }
    }

    let onBlur = () => {
        for (let obj of highId) {
            props.setVisibility ( false , obj.depth , obj.id )
        }
    }


    return (
        <div className={ stylesSelect.select }>
            <div className={ stylesSelect.select__head }>
                <NavLink className={ stylesSelect.select__head__link } to={ '/home' }>
                    <FontAwesomeIcon icon={ faArrowLeft }/> Реализуемые товары
                </NavLink>
                <input onChange={ onChange } onFocus={ onFocus } onBlur={ onBlur }
                       className={ stylesSelect.select__head__search } type="search"
                       placeholder={'Поиск...'}
                />
            </div>
            <div className={ stylesSelect.select__content }>
                <ul>
                    { createdOptionsData }
                </ul>
            </div>
            <Actions onClear={props.clearAllFields}/>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        optionsData: state.select.options ,
    }

}

export default connect ( MapStateToProps , {setVisibility , setSelection, clearAllFields} ) ( Select )