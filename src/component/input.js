import React from 'react'
import CardGenerator from './cardGenerator'
import { useState, useEffect } from 'react'
import {get} from '../webAbstraction/webServer'

  
function filter(allCards, query){
    const topics = ['name','address']
    const sortedQuery = []
    topics.forEach((val) =>
    {
        for(let i = 0; i < allCards.length; i++){
            if(allCards[i][val].includes(query))
                {
                    sortedQuery.push(allCards[i])
                    break
                } 
        }
    })
    return sortedQuery
}

export default function input(){
    const [query, SetQuery] = useState('')
    const [reset, SetReset] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [currentQuery, setCurrentCards] = useState([])

    function cancelCards(e){
        SetReset(true)
    }

    function handlerInputClick(e){
        e.stopPropagation()
        SetReset(false)
    }
    
    useEffect(() => {
        get().then(response => {
            setAllCards(response)
            document.addEventListener('click', cancelCards)
        })
        
        return () => {
            document.removeEventListener('click', cancelCards)
        }
    },[])

    function handleInput(e){
        SetQuery(e.target.value)
        setCurrentCards(filter(allCards, e.target.value))
    }


    return(
        <>
            <input onChange = {handleInput} onClick = {handlerInputClick}
                type="text" 
                placeholder="Type a query..."
            />
            <CardGenerator query = {query} reset = {reset} currentQuery = {currentQuery}/>
        </>

        )
    }