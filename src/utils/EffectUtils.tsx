// 自定义一个初始不更新的hook
import {useEffect, useRef} from "react";

export const useUpdateEffect = (fn: Function, inputs: any[]) => {
    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) fn();
        else didMountRef.current = true;
    }, inputs);
};