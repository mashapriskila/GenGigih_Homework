import React from "react";
import { render, screen } from "@testing-library/react";
import Searching from "./searching";
import {Provider} from 'react-redux';
import configureStore from "../storeData/store";


it('Searching component rendered', () => {
    render(<Provider store= {configureStore} ><Searching/> </Provider>);

    const searchInput = screen.getByTestId('search-song-input');
    const searchButton = screen.getByTestId('search-song-button');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
}); 