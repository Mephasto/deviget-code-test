
export const dismissAllPosts = postsIds => ({
    type: 'DISMISS_ALL_POSTS',
    postsIds
})

export const dismissPost = postId => ({
    type: 'DISMISS_POST',
    postId
})

export const activePost = activePost => ({
    type: 'ACTIVE_POST',
    activePost
})

export const postRead = postId => ({
    type: 'POST_READ',
    postId
})

export const toggleSidebar = status => ({
    type: 'SIDEBAR_TOGGLED',
    status
})

export function fetchPosts() {
    return async(dispatch) => {
        // Fetch from reddit top posts
        let response = await fetch(`https://www.reddit.com/r/all/top.json?limit=50`, {
            method: "GET",
            headers: { }
        })
        let responseJSON = await response.json()

        // Format posts and dispatch them to reducer
        function dispatchPosts (result) {
            const posts = result.data.children // leave out extra data from json
            dispatch({ 
                type: 'LOAD_POSTS',
                posts
            })
        }
        return dispatchPosts( await responseJSON )
    }
}
