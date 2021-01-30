const initialState = {
    posts: [],
    activePost: [],
    readPosts: [],
    dismissedPosts: [],
    spinner: 'show'
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
        case "ACTIVE_POST":
            return {
                ...state,
                activePost: action.activePost
            }
        case "TOGGLE_SPINNER":
            return {
                ...state,
                spinner: action.toggle
            }
        default:
            return state
    }
}

export default reducer