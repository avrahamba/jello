let drag = false;
let startx,starty,diffx,diffy

let el;

const addEvent = (name, el, func) => {
    if (el.addEventListener) {
        el.addEventListener(name, func, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + name, func);
    } else {
        el[name] = func;
    }
}

const onMouseDown = (e) => {
     
    
    if(e.target!==el && !e.target.classList.contains('unit-task-list-container')) return;
    if (!e) { e = window.event; }
    if (e.target && e.target.nodeName === 'IMG') {
        e.preventDefault();
    } else if (e.srcElement && e.srcElement.nodeName === 'IMG') {
        e.returnValue = false;
    }
    startx = e.clientX + el.scrollLeft;
    starty = e.clientY + el.scrollTop;
    diffx = 0;
    diffy = 0;
    drag = true;
}
const onMouseMove=(e)=>{
    if (drag === true) {
        if (!e) { e = window.event; }
        diffx = (startx - (e.clientX + el.scrollLeft));
        el.scrollLeft += diffx;
    }
}
const onMouseUp = (e) => {
    if (!e) { e = window.event; }
    drag = false;
    var start = 1,
        animate = function () {
            var step = Math.sin(start);
            if (step <= 0) {
                window.cancelAnimationFrame(animate);
            } else {
                el.scrollLeft += diffx * step;
                el.scrollTop += diffy * step;
                start -= 0.02;
                window.requestAnimationFrame(animate);
            }
        };
    animate();
}



export const playDragScroll = (element)=>{
    el = element
    addEvent('mousedown', el, onMouseDown);
    addEvent('mousemove', el, onMouseMove);
    addEvent('mouseup', el, onMouseUp);

}