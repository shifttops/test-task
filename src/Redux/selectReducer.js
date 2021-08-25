let initialState = {
    selectedCount: 0 ,
    options: [
        {
            type: 'А' ,
            text: 'Продукция сельского хозяйства, лесного хозяйства, рыбоводства и рыболовства' ,
            depth: 0 ,
            isVisible: true ,
            isSelected: false ,
            id: 1 ,
            nestedFields: null ,
        } ,
        {
            type: 'О' ,
            text: 'Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию' ,
            depth: 0 ,
            isVisible: true ,
            isSelected: false ,
            id: 1321 ,
            nestedFields: [
                {
                    type: '84' ,
                    text: 'Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию' ,
                    depth: 1 ,
                    isVisible: false ,
                    id: 2 ,
                    isSelected: false ,
                    nestedFields: [
                        {
                            type: '84.1' ,
                            text: 'Услуги в области государственного управления общего характера и социально-экономической сфере' ,
                            depth: 2 ,
                            isVisible: false ,
                            id: 3 ,
                            isSelected: false ,
                            nestedFields: [
                                {
                                    type: '84.1.1' ,
                                    text: 'Услуги в области государственного управления общего характера' ,
                                    depth: 3 ,
                                    id: 4 ,
                                    isVisible: false ,
                                    isSelected: false ,
                                    nestedFields: null
                                } ,
                            ]
                        } ,
                        {
                            type: '84.1' ,
                            text: 'Услуги в области государственного управления общего характера и социально-экономической сфере' ,
                            depth: 2 ,
                            isVisible: false ,
                            id: 131 ,
                            isSelected: false ,
                            nestedFields: [
                                {
                                    type: '84.1.1' ,
                                    text: 'Услуги в области государственного управления общего характера' ,
                                    depth: 3 ,
                                    id: 345 ,
                                    isVisible: false ,
                                    isSelected: false ,
                                    nestedFields: null
                                } ,
                            ]
                        } ,
                    ]
                } ,
            ] ,
        } ,
        {
            type: 'О' ,
            text: 'Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию' ,
            depth: 0 ,
            isVisible: true ,
            isSelected: false ,
            id: 13211 ,
            nestedFields: [
                {
                    type: '84' ,
                    text: 'Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию' ,
                    depth: 1 ,
                    isVisible: false ,
                    id: 22 ,
                    isSelected: false ,
                    nestedFields: [
                        {
                            type: '84.1' ,
                            text: 'Услуги в области государственного управления общего характера и социально-экономической сфере' ,
                            depth: 2 ,
                            isVisible: false ,
                            id: 313 ,
                            isSelected: false ,
                            nestedFields: [
                                {
                                    type: '84.1.1' ,
                                    text: 'Услуги в области государственного управления общего характера' ,
                                    depth: 3 ,
                                    id: 451 ,
                                    isVisible: false ,
                                    isSelected: false ,
                                    nestedFields: null
                                } ,
                            ]
                        } ,
                        {
                            type: '84.1' ,
                            text: 'Услуги в области государственного управления общего характера и социально-экономической сфере' ,
                            depth: 2 ,
                            isVisible: false ,
                            id: 33253 ,
                            isSelected: false ,
                            nestedFields: [
                                {
                                    type: '84.1.1' ,
                                    text: 'Услуги в области государственного управления общего характера' ,
                                    depth: 3 ,
                                    id: 32432632 ,
                                    isVisible: false ,
                                    isSelected: false ,
                                    nestedFields: null
                                } ,
                            ]
                        } ,
                    ]
                } ,
            ] ,
        } ,

    ]
}

const SET_VISIBILITY = 'select/SET_VISIBILITY'
const SET_SELECTION = 'select/SET_SELECTION'
const INCREMENT_SELECTED_COUNT = 'select/INCREMENT_SELECTED_COUNT'
const CLEAR_ALL = 'select/CLEAR_ALL'

const selectReducer = (state = initialState , action) => {
    switch (action.type) {
        case INCREMENT_SELECTED_COUNT: {
            return {
                ...state ,
                selectedCount: action.payload
            }
        }
        case SET_VISIBILITY: {
            return {
                ...state ,
                options: state.options.map ( option => {
                    if (option.nestedFields) {
                        return {
                            ...option ,
                            nestedFields: editVisibility ( option , action.payload.shouldBeVisible , action.payload.depth , action.payload.id )
                        }
                    } else return option
                } )
            }
        }
        case SET_SELECTION: {
            return {
                ...state ,
                options: state.options.map ( option => {
                    if (option.nestedFields) {
                        if (option.id === action.payload.id) {
                            return {
                                ...option ,
                                isSelected: action.payload.shouldBeSelected ,
                                nestedFields: editSelection ( {
                                    ...option ,
                                    isSelected: action.payload.shouldBeSelected
                                } , action.payload.shouldBeSelected , action.payload.id )
                            }
                        } else {
                            return {
                                ...option ,
                                nestedFields: editSelection ( option , action.payload.shouldBeSelected , action.payload.id )
                            }
                        }
                    } else {
                        if (option.id === action.payload.id) {
                            return {
                                ...option ,
                                isSelected: action.payload.shouldBeSelected ,
                            }
                        }else return option
                    }
                } )
            }
        }
        case CLEAR_ALL: {
            return {
                ...state,
                options: state.options.map(option => {
                    if(option.nestedFields) {
                        return {...option , isSelected: false , nestedFields: clearAll ( option )}
                    }
                    else return {...option, isSelected: false}
                })
            }
        }
        default:
            return state;
    }
}

let checkId = (field , id) => {
    if (field.id === id) {
        return true
    }

    if (field.nestedFields) {
        for (const nestedField of field.nestedFields) {
            if (checkId ( nestedField , id )) {
                return true
            }
        }
    } else return false
}

let editVisibility = (option , shouldBeVisible , depth , id) => {
    let editFields = (nestedFields , highField) => {

        return nestedFields.map ( field => {
            return editField ( field , highField )
        } )
    }

    let editField = (field , highField) => {
        if (field.depth === depth) {
            return {...field , isVisible: shouldBeVisible}
        } else {
            if (field.nestedFields && checkId ( field , id )) return {
                ...field ,
                nestedFields: editFields ( field.nestedFields , highField )
            }
            else return field
        }
    }

    if (checkId ( option , id )) {
        return editFields ( option.nestedFields , option )
    } else return option.nestedFields
}

let editSelection = (option , shouldBeSelected , id) => {
    let editFields = (nestedFields , highField) => {
        return nestedFields.map ( field => {
            return editField ( field , highField )
        } )
    }

    let editField = (field , highField) => {
        if (field.id === id) {
            if (field.nestedFields) {
                return {
                    ...field ,
                    isSelected: shouldBeSelected ,
                    nestedFields: editFields ( field.nestedFields , {...field , isSelected: shouldBeSelected} )
                }
            } else {
                return {
                    ...field ,
                    isSelected: shouldBeSelected ,
                }
            }
        } else {
            if (highField.isSelected === shouldBeSelected) {
                if (field.nestedFields) {
                    return {
                        ...field ,
                        isSelected: shouldBeSelected ,
                        nestedFields: editFields ( field.nestedFields , {...field , isSelected: shouldBeSelected} )
                    }
                } else {
                    return {
                        ...field ,
                        isSelected: shouldBeSelected ,
                    }
                }
            } else {
                if (field.nestedFields) {
                    return {
                        ...field ,
                        nestedFields: editFields ( field.nestedFields , field )
                    }
                } else return field
            }
        }
    }


    if (checkId ( option , id )) {
        return editFields ( option.nestedFields , option )
    } else return option.nestedFields
}

let clearAll = (option) => {
    let clearFields = (fields) => {
        return fields.map(field => {
            return clearField(field)
        })
    }

    let clearField = (field) => {
        if(field.nestedFields) return {...field, isSelected: false, nestedFields: clearFields(field.nestedFields)}
        else return {...field, isSelected: false}
    }


    return clearFields(option.nestedFields)
}

export const setVisibility = (shouldBeVisible , depth , id) => ({
    type: SET_VISIBILITY ,
    payload: {shouldBeVisible , depth , id}
})
export const setSelection = (shouldBeSelected , id) => ({type: SET_SELECTION , payload: {shouldBeSelected , id}})
export const incrementSelectedCount = (count) => ({type: INCREMENT_SELECTED_COUNT , payload: count})
export const clearAllFields = () => ({type: CLEAR_ALL})

export default selectReducer;