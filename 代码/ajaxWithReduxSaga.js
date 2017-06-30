const { applyMiddleware, createStore } = Redux;
const createSagaMiddleware = ReduxSaga.default;
const { put, call } = ReduxSaga.effects;
const { takeLatest } = ReduxSaga;
const { connect, Provider } = ReactRedux;

// GitHub API
const gitHubApi = (username) => {
  return fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      return response.json()
        .then(({ login, avatar_url, html_url }) =>  ({ login, avatar_url, html_url }));
    })
    .catch(error => {
      throw error;
    })
};

// Action
const getUserDetails = (payload) => {
  return {
    type: 'LOAD_USER_REQUEST',
    payload
  }
}

// Reducer
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_USER_SUCCESS':
      return action.user;
    default:
      return state;
  }
};

// Sagas
function* loadUserDetails({ payload }) {
  try {
    const user = yield call(gitHubApi, payload);
    yield put({type: 'LOAD_USER_SUCCESS', user}); // Yields effect to the reducer specifying the action type and user details
  } catch (error) {
    throw error;
  }
}

// Watches for LOAD_USER_REQUEST action type and call loadUserDetails with supplied arguments.
// takeEvery is a Saga helper API built using take and fork.
// take and fork are effect creators. 
// take instructs the middleware to wait for a specified action on the Store
// fork instructs the middleware to perform non blocking operation
function* watchRequest() {
  yield* takeLatest('LOAD_USER_REQUEST', loadUserDetails);
}

class UserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUserDetails('andela-rekemezie');
  }

   render() {
    const { user } = this.props;
    return (
      <div>
        { user ? <div>
            <h1> User Profile </h1>
            <img src={user.avatar_url}/>
            <p><a href={user.html_url} target="_blank">{user.login}</a></p>
        </div> : '...loading'}
      </div>
    )
  }
}

// Store setup
const sagaMiddleware = createSagaMiddleware();
const store = createStore(userReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchRequest);

// Map the store's state to component's props.
const mapStateToProps = (state) => ({ user: state }); 

// Wrap action creator with dispatch method. This way getUserDetails is passed in as props.
const mapDispatchToProps = (dispatch) => ({ getUserDetails: (username) => dispatch(getUserDetails(username)) }) 

// React-redux connect function connects our react component to redux store
const UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

const element = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <UserProfilePage />
  </Provider>,
  element
);