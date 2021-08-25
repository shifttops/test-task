import React , { useState } from 'react'

import styled from "styled-components";
import stylesSelect from '../Styles/Select.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'antd/dist/antd.css';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from "antd";

const StyledOption = styled.div`
    transition: all 0.3s ease 0s;
    margin-left: ${ props => props.depth * 15 }px;
    display: ${ props => props.isVisible ? 'block' : 'none' };
`
const StyledBody = styled.div`
    padding: ${ props => props.visibility && '6px 20px' };
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 30px;
    align-items: center;
`

const StyledButton = styled ( Checkbox )`
    .ant-checkbox-checked .ant-checkbox-inner{
         background-color: #035B77;
         border-color: #035B77;
    }
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus+.ant-checkbox-inner{
         border-color: #035B77;
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner::after {
        background-color: #035B77;
    }
    .ant-checkbox-wrapper{
        border-color: #035B77;
    }
`

const OptionComponent = ({setVisibility , setSelection , isVisible , visibility , depth , id , text , type , ...props}) => {
    const onClick = () => {
        if (isVisible !== null) {
            setVisibility ( !isVisible , depth + 1 , id )
        }
    }

    let onChange = (e) => {
        setSelection ( e.target.checked , id )
    }

    let [clicked, setClicked] = useState(false)


    return (
        <li className={ stylesSelect.select__option + ' ' + (visibility && stylesSelect.select__option__visible) + ' ' + (props.isSelected && stylesSelect.select__option__selected) }>
            <StyledBody visibility={ visibility }>
                { visibility && <StyledButton className={ stylesSelect.select__selectBtn } checked={ props.isSelected }
                                              onChange={ onChange }/> }
                <div onClick={ onClick } className={ stylesSelect.select__option__content + ' ' + (props.isSelected && stylesSelect.select__option__content__selected) }>
                    <StyledOption onClick={() => setClicked(!clicked)} id={ props.id } depth={ depth } value="" isVisible={ visibility }>
                        { props.hasNested &&
                        <FontAwesomeIcon className={ stylesSelect.select__option__content__icon + ' ' + (clicked && stylesSelect.select__option__content__icon__clicked)}
                                         icon={ faAngleDown }/> }
                        [{ type }] - { text }
                    </StyledOption>
                </div>
            </StyledBody>
        </li>
    )
}

export default OptionComponent