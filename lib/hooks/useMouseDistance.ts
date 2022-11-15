import { MutableRefObject, useEffect } from "react";
import { useMouse } from "react-use";

export const useMouseDistance = (ref: MutableRefObject<any>, f: (d: number) => void) => {
  const { docX, docY } = useMouse(ref)

  useEffect(() => {
    if( !ref.current) return
    const { offsetTop, offsetLeft, clientWidth, clientHeight } = ref.current 
    const d = Math.sqrt( (docX-offsetLeft-clientWidth/2)**2 + (docY-offsetTop-clientHeight/2)**2 )
    f(d)
  }, [docX, docY])
}
