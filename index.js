
const events=["change","click","contextmenu","dblclick","mouseup","pointerup","reset","submit","touchend"];
let queue=[];
function init() {
    window.addEventListener("load",()=>setHandler(document.body));  
}
export function setHandler(element) {
    for (let e of events) {
        element.addEventListener(e, run);
    }
}
export function post(func) {
    queue.push({postedAt:Date.now(), func});
}
export function run(event) {
    if (!event) event={timeStamp:Date.now()};
    let q=queue;
    queue=[];
    for (let {postedAt,func} of q) {
        func({ postedAt, event });
    }
}
init();