import React from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import * as actions from '../actions'
import '../css/styles.css'

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.fetchPosts())
    }
    dismissPost = (e, postId) => {
        if (!this.props.dismissedPosts.includes(postId)) {
            e.currentTarget.parentElement.parentElement.classList.add('dismissed')
            this.props.dispatch(actions.dismissPost(postId))
        }
    }
    render() {
        const { posts } = this.props
        return(
            <React.Fragment>
                <div className="posts_nav">
                    <h1 className="nav_header">Reddit Posts</h1>
                    <ul className="nav_posts_list">
                    {posts.map((post, index) => (
                        <li className="post" key={post.data.id}>
                            <div className="post_header">
                                <div className="post_state"></div>
                                <div className="post_author">{post.data.author}</div>
                                <div className="post_age">
                                    <Moment className="posts__list-time" fromNow>{post.data.created_utc * 1000}</Moment>
                                </div>
                            </div>
                            <div className="post_body">
                                {post.data.thumbnail === 'self' || post.data.thumbnail === 'default' ? (
                                    ''
                                ) : (
                                    <div className="thumbnail_placeholder">
                                        <img src={post.data.thumbnail} title={post.data.title}></img>
                                    </div>
                                )}
                                <p className="title">{post.data.title}</p>
                            </div>
                            <div className="post_footer">
                                <div className="post_dismiss" onClick={(e) => this.dismissPost(e, post.data.id)}>
                                    <div className="dismiss_icon">x</div>
                                    <span className="dismiss_label">Dismiss Post</span>
                                </div>
                                <div className="post_comments">
                                    <span className="count">{post.data.num_comments} comments</span>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                    <div className="nav_footer">
                        <div className="post_dismiss_all">
                            <span className="dismiss_label">Dismiss All Posts</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    dismissedPosts: state.dismissedPosts
})

connect(mapStateToProps)

export default connect(mapStateToProps)(App)