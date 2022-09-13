import React from "react";

const styles = {
    transition: 'all 1s ease-out'
};

export class AnimationTest extends React.Component {
    constructor() {
        super();
        this.state = {
            slide: false,
            flip: false
        };
    }

    onSlide = (e)=>{
            this.setState({
                slide:true,
                flip:false
            })
    }

    onFlip = ()=>{
        this.setState({
            flip:true,
            slide:false
        })
    }

    render() {
        return (
            <div>
                <nav className={"navbar navbar-expand-lg navbar-dark bg-dark " + (this.state.slide? 'slide' : '') } style={{width:"50%",width:"50%",display:"flex",justifyContent: "center",marginLeft: "25%",marginTop: "25%"}}>
        
                        <button onClick={this.onSlide}>Click Here</button>
                </nav>
            </div>

        );
    }
}
export default AnimationTest