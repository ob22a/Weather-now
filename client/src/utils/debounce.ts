export const debounce = (func: (...args:unknown[])=>void, timeout: number)=>{
    let timer: null|number = null;
    return (...args:unknown[])=>{
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            func(...args)
        }, timeout);
    }
}