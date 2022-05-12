import React from "react";
import {render, screen, fireEvent, cleanup} from "@testing-library/react";
import {Provider} from 'react-redux';
import store from "../store/store.ts";
import '@testing-library/jest-dom';
import Searching from "./searching";
import userEvent from "@testing-library/user-event";

const theRender = () => render (
    <Provider store= {store} >
            <Searching
            /> 
        </Provider>
);

describe('should render the search bar component', () => {
    beforeEach(theRender);
    afterEach(cleanup)

    it('should empthy the input placeholder when search button clicked', () => {

        const InputElement = screen.getByPlaceholderText(/Type to search/i);
        const buttonSearch = screen.getByRole("button",{name : /Search/i})
       
        fireEvent.click(buttonSearch)
        expect(InputElement.value).toBe("");
    })


    it('if a user input the search bar, the button is enabled', async () => {

        userEvent.type(screen.getByPlaceholderText(/Type to search/i))
        const buttonSearch = await screen.findByRole ("button",{name : /Search/i})
        
        expect(buttonSearch).toBeEnabled();
    })

})
