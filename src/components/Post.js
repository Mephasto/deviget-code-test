import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'

class Post extends React.Component {
    render() {
        return(
            <li className="post" key={this.props.post.data.id} onClick={(e) => this.props.selectPost(e, this.props.post.data.id)}>
                <div className="post_header">
                    { !this.props.readPosts.includes(this.props.post.data.id) ? (
                        <div className="post_state_unread"></div>
                    ):(
                        <div className="post_state_read"></div>
                    )}
                    <div className="post_author">{this.props.post.data.author}</div>
                    <div className="post_age">
                        <Moment className="posts__list-time" fromNow>{this.props.post.data.created_utc * 1000}</Moment>
                    </div>
                </div>
                <div className="post_body">
                    {/* Show thumbnail if exists */}
                    {this.props.post.data.thumbnail === 'self' || this.props.post.data.thumbnail === 'default' ? (
                        ''
                    ) : (
                        <div className="thumbnail_placeholder">
                            <img src={this.props.post.data.thumbnail} title={this.props.post.data.title}></img>
                        </div>
                    )}
                    <p className="title">{this.props.post.data.title}</p>
                </div>
                <div className="post_footer">
                    <div className="post_dismiss" onClick={(e) => this.props.dismissPost(e, this.props.post.data.id)}>
                        <div className="dismiss_icon">x</div>
                        <span className="dismiss_label">Dismiss Post</span>
                    </div>
                    <div className="post_comments">
                        <span className="count">{this.props.post.data.num_comments} comments</span>
                    </div>
                </div>
            </li>
        )
    }
}

export default Post