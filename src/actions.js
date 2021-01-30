
export const dismissPost = postId => ({
    type: 'DISMISS_POST',
    postId
})

export const activePost = activePost => ({
    type: 'ACTIVE_POST',
    activePost
})

export const toggleSpinner = toggle => ({
    type: 'REMOVE_SPINNER',
    toggle
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
