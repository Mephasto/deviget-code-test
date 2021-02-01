import { activePost } from "./actions"

const initialState = {
    posts: [],
    activePost: [],
    readPosts: [],
    dismissedPosts: [],
    sidebar: true
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case "LOAD_POSTS":
            return {
                ...state,
                posts: action.posts
            }
        case "DISMISS_POST":
            return {
                ...state,
                dismissedPosts: [ ...state.dismissedPosts, action.postId ]
            }
        case "DISMISS_ALL_POSTS":
            return {
                ...state,
                dismissedPosts: action.postsIds
            }
        case "ACTIVE_POST":
            return {
                ...state,
                activePost: action.activePost
            }
        case "POST_READ":
            return {
                ...state,
                readPosts: [ ...state.readPosts, action.postId ]
            }
        case "SIDEBAR_TOGGLED":
            return {
                ...state,
                sidebar: action.status
            }
        default:
            return state
    }
}

export default reducer