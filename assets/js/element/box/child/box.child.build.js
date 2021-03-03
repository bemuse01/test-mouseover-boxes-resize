BOX.child.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new BOX.child.param()
        this.key = null
        this.set = true
        this.gsap = []
    }

    // create
    #create(){
        this.arr = []
        
        const halfWidth = window.innerWidth / 2
        const width = halfWidth / this.param.count
        const expanded = width * 4

        for(let i = 0; i < this.param.count; i++){
            const light = i * this.param.light 

            this.arr[i] = {
                key: i,
                param: {
                    width: width,
                    expanded: expanded
                },
                style: {
                    box: {
                        left: `${width * i}px`,
                        width: `${width}px`,
                        visibility: 'visible'
                    },
                    boxInner: {
                        width: `${expanded}px`,
                        zIndex: '1',
                        transform: 'translate(0, 0)'
                    },
                    boxInner1: {
                        background: `hsl(0, 0%, ${light}%)`,
                        transform: `translate(-${expanded * 0.75}px, 0)`
                    }
                },
                position: {
                    boxInner: new THREE.Vector2(),
                    boxInner1: new THREE.Vector2()
                },
                move: {
                    boxInner: new THREE.Vector2(),
                    boxInner1: new THREE.Vector2()
                }
            }
        }
    }

    // event
    onMouseenter(key, event){
        event.preventDefault()
        
        this.key = key

        const remaining = this.arr[0].param.width * this.arr.length - this.arr[0].param.expanded
        const skinny = Math.round(remaining / (this.arr.length - 1))

        // let x = (this.arr[0].param.width * this.arr.length - this.arr[0].param.width * this.arr.length) / 2
        let x = 0
        let divide = 0
        
        for(let i = 0; i < this.arr.length; i++) divide += Math.abs(i - key)

        for(var i = 0; i < this.arr.length; i++){
            const slice = this.arr[i]

            const moveX = -i * slice.param.width + x
            const perc = Math.abs(i - key) / divide

            // const width = Math.round(skinny * 1.8 - remaining * perc * 0.8)
            const width = skinny
            const w = key === i ? 0 : -slice.param.expanded + width
            slice.move.boxInner.set(moveX, 0)

            // if (i == e.index) slice.hoverIn()
            // else slice.hoverOut()

            if(i === key) {
                slice.move.boxInner1.set(0, 0)
                slice.style.boxInner.zIndex = '2'
            }

            x += key === i ? slice.param.expanded : width
        }
    }
    onMouseleave(key, event){
        event.preventDefault()

        for(let i = 0; i < this.arr.length; i++) {
            const slice = this.arr[i]

            slice.move.boxInner.set(0, 0)
            slice.move.boxInner1.set(slice.param.expanded * 0.75, 0)

            if(i === key) slice.style.boxInner.zIndex = '1'
        }
    }

    // animate
    animate(){
        if(this.set === true){
            this.set = false
        }

        for(let i = 0; i < this.arr.length; i++){
            const slice = this.arr[i]

            slice.position.boxInner.lerp(slice.move.boxInner, 0.12)
            slice.position.boxInner1.lerp(slice.move.boxInner1, 0.12)

            slice.style.boxInner.transform = `translate(${slice.position.boxInner.x}px, 0)`
            slice.style.boxInner1.transform = `translate(-${slice.position.boxInner1.x}px, 0)`
        }
    }

    // get
    getElement(){
        return this.arr
    }

    // resize
    resize(){
        this.set = true
    }
}