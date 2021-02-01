
function getAllPostsIds (posts) {
    let postsIds = []
    posts.map((post) => (
		postsIds.push(post.data.id)
	))
    return postsIds
}
export default getAllPostsIds