import { useEffect, useRef } from "react";

export function useInterval(callback, time) {
  const callbackRef = useRef();

  useEffect(()=>{
    callbackRef.current = callback;
  }, [callback]);

  useEffect(()=>{
    function tick(){
      callbackRef.current()
    }
    if(time !== null){
      let nowTime = setInterval(tick, time)
      return () => clearInterval(nowTime)
    }
  }, [time])
}