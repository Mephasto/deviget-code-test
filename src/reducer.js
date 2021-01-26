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
                posts: action.getPosts
            }
        default:
            return state
    }
}

export default reducer