import React from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.fetchPosts())
    }

    render() {
        return("Hello World!")
    }
}

const mapStateToProps = state => ({
    posts: state.posts
})

connect(mapStateToProps)

export default connect(mapStateToProps)(App);