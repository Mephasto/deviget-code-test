import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Post from './Post'
import '../css/styles.css'

class App extends React.Component {
    // On load
    componentDidMount() {
        // Fetch Posts
        this.props.dispatch(actions.fetchPosts())
    }
    // Post Dismiss
    dismissPost = (e, postId) => {
        const postElement = e.currentTarget.parentElement.parentElement
        postElement.classList.add('post-exit')
        // wait for animation to stop then remove element
        setTimeout(() => {
            postElement.remove()
        }, 600)
        // save new state
        if (!this.props.dismissedPosts.includes(postId))
            this.props.dispatch(actions.dismissPost(postId))
    }
    // Post selection
    selectPost = (e, postId) => {
        const postElement = e.currentTarget.parentElement.parentElement
        const activePost = this.props.posts.filter(post => postId === post.data.id)[0]
        this.props.dispatch(actions.activePost(activePost.data))
    }

    renderPost = (post) => {
        if(!this.props.dismissedPosts.includes(post.data.id)) {
            return(
                <Post 
                    post={post}
                    selectPost={this.selectPost}
                    dismissPost={this.dismissPost}
                />
            )
        }else{
            return('')
        } 
    }

    render() {
        const { posts, activePost, dismissedPosts } = this.props
        return(
            <React.Fragment>
                <div className="layout">
                    <div className="posts_nav">
                        <h1 className="nav_header">Reddit Posts</h1>
                        <ul className="nav_posts_list">
                        {posts.map((post) => (
                            // this.props.readPosts.includes(postId)
                            this.renderPost(post)
                        ))}
                        </ul>
                        <div className="nav_footer">
                            <div className="post_dismiss_all">
                                <span className="dismiss_label">Dismiss All Posts</span>
                            </div>
                        </div>
                    </div>
                    <div className="active-post">
                        <h1 className="author">{activePost.author}</h1>
                        <img src={activePost.thumbnail} alt={activePost.title} />
                        <p className="title">{activePost.title}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    dismissedPosts: state.dismissedPosts,
    activePost: state.activePost
})

connect(mapStateToProps)

export default connect(mapStateToProps)(App)