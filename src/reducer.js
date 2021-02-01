import { activePost } from "./actions"

const initialState = {
    posts: [],
    activePost: [],
    readPosts: [],
    dismissedPosts: [],
    sidebar: false
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
            // make a clean array of ids
            let allPosts=[]
            action.postsIds.map((postId) => { allPosts.push(postId) })
            return {
                ...state,
                dismissedPosts: allPosts
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