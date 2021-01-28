const initialState = {
    posts: [],
    activePost: [],
    readPosts: [],
    dismissedPosts: []
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
        default:
            return state
    }
}

export default reducer