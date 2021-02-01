// Returns an Array of Ids , extracted from posts object
function getAllPostsIds (posts) {
    let postsIds = []
    posts.map((post) => (
		postsIds.push(post.data.id)
	))
    return postsIds
}
export default getAllPostsIds