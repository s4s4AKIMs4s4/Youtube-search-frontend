import React from "react";
import {render,unmountComponentAtNode} from 'react-dom'
import { act } from "react-dom/test-utils";
import App from './input'

describe('Input tests',()=>{
  
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
    
    it('existing input',async () => {
        const fakeUser = {
            name: "Joni Baez",
            age: "32",
            address: "123, Charming Avenue"
          };

        await act( async () =>{
            render( <App/> , container );
        })

        expect(container.querySelector("input").textContent).toBe('');
    })

    it('check input value', async () => {

      await act( async () =>{
          render( <App/> , container );
      })
      
      const input = container.querySelector("input")
      input.value = 'e'
      
      expect(input.value).toBe('e')

  })


})