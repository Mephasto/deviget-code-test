
export const dismissPost = postId => ({
    type: 'DISMISS_POST',
    postId
})

export function fetchPosts() {
    return async(dispatch) => {
        // Fetch from reddit top posts
        let response = await fetch(`https://www.reddit.com/r/all/top.json?limit=50`, {
            method: "GET",
            headers: { }
        })
        let responseJSON = await response.json()

        // format posts and dispatch them to reducer
        function dispatchPosts (result) {
            const posts = result.data.children // trim non posts data from json
            dispatch({ 
                type: 'LOAD_POSTS',
                posts
            })
        }
        return dispatchPosts( await responseJSON )
    }
}
