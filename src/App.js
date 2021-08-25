import React from 'react'

import MainComponentContainer from "./Components/MainComponent";

import pageStyles from './Styles/Page.module.css'
import { Redirect , Route } from "react-router";
import SelectContainer from "./Components/Select";


const App = () => {
    return (
            <main className={pageStyles.wrapper}>
                <div className={ pageStyles.page + ' ' + pageStyles._container}>
                    <div className={ pageStyles.page__body }>
                        <Redirect from={'/'} to={'/home'}/>
                        <Route path={'/selection'} render={() => <SelectContainer/>}/>
                        <Route  path={ '/home' } render={ () => <MainComponentContainer/> }/>
                    </div>
                </div>
            </main>
    );
}

export default App;
