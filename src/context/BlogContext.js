import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {

    switch (action.type) {

        case "get_blog_post":
            return action.payload;

        case "delete_blog_post":
            return state.filter(blog => blog.id !== action.payload)

        case "edit_blog_post":
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id) {
                    return action.payload
                } else {
                    return blogPost
                }
            })


        default:
            break;
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        //response.data===[]

        dispatch({ type: 'get_blog_post', payload: response.data })
    }
}

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        try {

            await jsonServer.post('/blogposts', { title, content });

            if (callback) {
                callback();
            }
        } catch (error) {

        }

    }
};

deleteBlogPost = (dispatch) => {
    return async (id) => {
        jsonServer.delete(`/blogposts/${id}`)
        dispatch({ type: 'delete_blog_post', payload: id })
    }
}

editBlogPost = dispatch => {
    return async (id, title, content, callback) => {

        jsonServer.put(`/blogposts/${id}`, { title, content })
        dispatch({
            type: 'edit_blog_post',
            payload: { id, title, content }
        })
        if (callback) {
            callback();
        }
    }
};





export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
)