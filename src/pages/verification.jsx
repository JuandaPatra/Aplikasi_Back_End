import React from "react"
import {connect} from "react-redux"
import {verification} from "../redux/actions"

class Verification extends React.Component{
    componentDidMount(){
        // console.log(this.props.match.params.token)
        this.props.verification(this.props.match.params.token)
    }
    render(){
        return(
            <div>
                Verification 
            </div>
        )
    }
}

export default connect(null, {verification}) (Verification)