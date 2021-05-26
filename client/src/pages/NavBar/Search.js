import { useState } from "react"
import "./index.css"

const Search = ({history}) =>{


    const [keyword, setKeyword ] = useState('')


    const HandleSarch = e =>{

        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }

        console.log(keyword)

    }

    return(
        <form className="search" onSubmit={HandleSarch}>
           <input 
           className="search_1" 
           type="search" 
           placeholder="Search...."
           name="srarch_input"
           onChange={(e)=> setKeyword(e.target.value)}
           onKeyPress={e=> e.key === 'Enter' ? HandleSarch(e): null}
           />
           <span className="icons_search">
           <i className="fas fa-search"></i>
           </span>
          
        </form>
    )

}



export default Search