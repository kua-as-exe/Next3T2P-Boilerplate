import { MutableRefObject, useEffect } from "react"

const useFocus = ( 
  ref: MutableRefObject<any>,
  b: boolean | ( () => boolean ),
  deps: any[]
) => {
  useEffect( ()=> {
    if( typeof b === 'boolean' ? b : b() ) ref.current.focus()
  }, deps) 
}

export default useFocus
