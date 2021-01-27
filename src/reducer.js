const initialState = {
    posts: [],
    activePost: [],
    readPosts: [],
    dismissedPosts: []
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case "LOAD_POSTS":
            console.log('Posts loaded!')
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state
    }
}

export default reducer