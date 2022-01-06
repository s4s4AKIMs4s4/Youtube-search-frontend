import React from "react";
import {render,unmountComponentAtNode} from 'react-dom'
import { act } from "react-dom/test-utils";
import GeneratorList from "./cardGenerator";
import App from './input'

describe('CardGenerator tests',()=>{
  
  let container = null

  global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );

  beforeEach(()=>{
    container = document.createElement('div')
    document.body.appendChild(container)
    fetch.mockClear();
    })

    afterEach(() =>{
        container.remove()
        container = null
    })
    
    it('existing cards',async () => {
        
            const reset = false
            const query = 'Abstract'
            const currentQuery =[
                {
                    id:1,
                    name:'a',
                    address:'Abstract',
                },
                {
                    id:2,
                    name:'b',
                    address:'Abstract',
                },
            ]
        

        await act(async () => {
            render(<GeneratorList currentQuery = {currentQuery} reset = {reset} query = {query} />, container)
        })
        const ul = container.querySelector("ul")
        expect(ul.children.length).toBe(2)


    })


})