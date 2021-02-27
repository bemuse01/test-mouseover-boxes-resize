new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                box: new BOX.build()
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },

        // event
        onWindowResize(){
            this.element.box.resize()
        },

        // render
        render(){
            TWEEN.update()
            this.element.box.animate()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})