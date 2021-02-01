import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Post from './Post'
import getAllPostsIds from '../helpers/getAllPostsIds'
import { Swipeable } from 'react-swipeable'
import '../css/styles.css'

class App extends React.Component {

    componentDidMount() {
        // Fetch Posts
        this.props.dispatch(actions.fetchPosts())
    }

    dismissPost = (e, postId) => {
        // Select element add class for animation
        const postElement = e.currentTarget.parentElement.parentElement
        postElement.classList.add('post-exit')
        // wait for animation to stop then remove element
        setTimeout(() => {
            // save new state
            if (!this.props.dismissedPosts.includes(postId))
                this.props.dispatch(actions.dismissPost(postId))
        }, 600)
    }

    dismissAllPosts = (posts) => {
        // call helper to get an array of Ids from posts
        const postsIds = getAllPostsIds(posts)
        // select all posts (DOM) and add a class for remove animation
        let e = document.getElementsByClassName("post")
        for (var i = 0; i < e.length; i++){
            e[i].classList.add('all-post-exit')
        }
        // wait for animation to stop then remove element
        setTimeout(() => {
            // save new state
            this.props.dispatch(actions.dismissAllPosts(postsIds))
        }, 600)
    }

    selectPost = (e, postId) => {
        // prevent from activate post when the user clicks on dismiss buttons
        if(e.target.classList.contains('dismiss_label') || e.target.classList.contains('dismiss_icon'))
            return
        // activate the post
        const selectedPost = this.props.posts.filter(post => postId === post.data.id)[0].data
        this.props.dispatch(actions.activePost(selectedPost))
        // add Id to the readPosts state
        this.props.dispatch(actions.postRead(postId))
    }

    renderListPost = (post) => {
        if(!this.props.dismissedPosts.includes(post.data.id)) {
            return(
                <Post 
                    key={post.data.id}
                    post={post}
                    selectPost={this.selectPost}
                    dismissPost={this.dismissPost}
                    readPosts={this.props.readPosts}
                />
            )
        }else{
            return('')
        }
    }

    toggleSidebar = (status) => {
        console.log(status)
        this.props.dispatch(actions.toggleSidebar(status));
    }

    render() {
        const { posts, activePost, sidebar } = this.props
        return(
            <React.Fragment>
                <div className="layout">
                    <Swipeable className={`posts_nav ${sidebar ? 'expanded' : ''}`} trackMouse onSwipedRight={() => this.toggleSidebar(true)} onSwipedLeft={() => this.toggleSidebar(false)}>
                        <div class="wrapper">
                            <h1 className="nav_header">Reddit Posts</h1>
                            <ul className="nav_posts_list">
                            {posts.map((post) => (
                                this.renderListPost(post)
                            ))}
                            </ul>
                            <div className="nav_footer">
                                <div className="post_dismiss_all" onClick={() => this.dismissAllPosts(posts)}>
                                    <span className="dismiss_label">Dismiss All Posts</span>
                                </div>
                            </div>
                        </div>
                    </Swipeable>
                    <div className="active-post">
                        <h1 className="author">{activePost.author}</h1>
                        {activePost.url_overridden_by_dest !== null ? (
                            <a href={activePost.url_overridden_by_dest} target="_blank">
                                <img src={activePost.thumbnail} alt={activePost.title} />
                            </a>
                        ) : (
                            <img src={activePost.thumbnail} alt={activePost.title} />
                        )}
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
    activePost: state.activePost,
    readPosts: state.readPosts,
    sidebar: state.sidebar
})

connect(mapStateToProps)

export default connect(mapStateToProps)(App)