
# user-gesture

Reserve calling function that is needed user gesture(or user activation)

## install

```
npm i install user-gesture
```
## build

```
npm run build
```

## test
```
npm run test
```

## Use case and Usage

Some events like `mousedown` or `touchstart` are NOT regarded as "user-gesture". If you want to some user-gesture-required action, for exmaple accessing clipboard.

You can use `UserGesture.post` to reserve to do some user-gesture-required actions like:

    document.querySelector("#copy").addEventListener("mousedown", (e)=>{
        // accessing to clipboard is not allowed in this context.
        console.log("Copying...");
        UserGesture.post(async () => {
            // accessing to clipboard is allowed in this context.
            await navigator.clipboard.writeText("test");
            console.log("Copyed!");
        });
    });

## Functions

- `post(action)`
    - Call function `action` at user-gesture context 
    - In default, `action` is called when either of following events is fired on `document.body`
        - change, click, contextmenu,dblclick, mouseup, pointerup,reset, submit, touchend
    - `action` can receive an object as argument that contains:
        - `postedAt`: The timestamp that called `post` in milliseconds   
        - `event`: The user-gesture event when `action` is called.
- `setHandler(element)`
    - Add an element that processes `action` in `post` function. 
    - It is mainly used for elements that call `stopPropagation` to the event object, that prevent process `post` on `document.body`
- `run()`
    - Force process `post`ed functions
    - Of course, it should be called user-gesture context.
