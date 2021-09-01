import React from 'react'
import { useState,useEffect } from 'react'


export default function GeneratorList({query, reset,currentQuery}){
  
  const [ listCard,SetListCard] = useState([])

  useEffect(()=>{
    if(!query || query === '') {SetListCard([]); return}

    if(reset === true)
      SetListCard([])
    else{
      document.addEventListener('keydown', handleKeyDown)
      SetListCard(currentQuery)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [query,reset])

  
 

  function handleKeyDown(e){
    e.stopPropagation()
    if(!(e.keyCode === 38 || e.keyCode === 40 ) ) return
    const allLi = document.querySelector('ul').children

    let targetIndex = null   
      for(let i  = 0; i < allLi.length ; i++){
        if(allLi[i].className === 'listCard__card_hovered' )
        {
          targetIndex = i
          deleteLight()
          if ( e.keyCode === 38) addLight(allLi[i-1]) 
          else addLight(allLi[i+1])
          break;
        }
      }
    if(targetIndex === null){
      addLight(allLi[0])
    }
  }
  
  
  
  function deleteLight(){
    const coveredLi = document.querySelector('.listCard__card_hovered')
    if(!coveredLi) return
    coveredLi.classList = 'listCard__card'
  }
  
  const addLight = (liElement) => {
    if(liElement)
    liElement.className = 'listCard__card_hovered'
  }
  
  const clickToList  = (e) =>{
    e.stopPropagation()
    let li = e.target.closest('li')
    if(!li) return
    deleteLight()
    addLight(li)
  }
  
  
  function stopBubling(e){
    e.stopPropagation()
  }


  const listItems =  listCard.map( (val) =>
  <li key= {val.id} className = 'listCard__card'>
           <div> <strong> {val.name} </strong></div>
            <small> {val.address} </small>
        </li>
    )
  return(
    <div className = 'listCard'>
           <ul onMouseOver = {clickToList}  onClick= {stopBubling} >
               {listItems}
           </ul>
        </div>

)
} 