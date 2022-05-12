import React from "react";
import { render, screen } from "@testing-library/react";
import {Provider} from 'react-redux';
import store from "../store/store.ts";
import Song from "./song";
import '@testing-library/jest-dom';


    it('should have select button', () => {
        render (
            <Provider store= {store} >
                    <Song
                        toggleSelect={[]}
                    /> 
                </Provider>
        );
        const selectButton = screen.getByRole("button",{name : /Select/i})

        expect(selectButton).toBeInTheDocument();
    }) 

