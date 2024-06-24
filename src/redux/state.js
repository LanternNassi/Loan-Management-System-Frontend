

const AppReducer = (state ={
    User : null,
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOZXNzaW0iLCJqdGkiOiJlNzc1Mjg1YS01ZjM5LTQ2MGMtZmZhMS0wOGRjOGZhNjcyOTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MTkyNDgwODQsImlzcyI6Ik11bHRpeC5jb20iLCJhdWQiOiJNdWx0aXguY29tIn0.VuuVxK0nrWqCV6v5tQiftMaW8haccxOmC8q1Yzqz5gs'
} , action) => {
    switch(action.type){
        case 'add_token' : {
            return {
                ...state,
                token : action.token
            }

        }

        case 'add_login_info' : {
            return {
                ...state,
                User : action.User
            }
        }

        default :
            return state
    }
}

export default AppReducer
