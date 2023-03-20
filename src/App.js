import React from 'react';
import axios from 'axios';
import styles from './App.module.css'

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => localStorage.setItem(key, value), [value, key]);

  return [value, setValue];
}

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORIES':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      }
    default:
      throw new Error();
  }
}

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'Re');

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(() => {

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    axios.get(url)
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,
        });
      })
      .catch(() => {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      });

  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORIES',
      payload: item
    });
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  }

  return (
    <div className={styles.container} >
      <h1 className={styles.headlinePrimary} >My hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ?
        <p>Loading ...</p>
        :
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      }

    </div>
  );
}

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) =>
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />)}
    </ul>
  )
}

const Item = ({ item, onRemoveItem }) => (
  <li className={styles.item} >
    <span style={{ width: '40%' }} >
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }} >{item.author}</span>
    <span style={{ width: '10%' }} >{item.num_comments}</span>
    <span style={{ width: '10%' }} >{item.points}</span>
    <span style={{ width: '10%' }} >
      <button
        type='button'
        onClick={onRemoveItem.bind(null, item)}
        className={`${styles.button} ${styles.buttonSmall}`}
      >
        Dismiss
      </button>
    </span>
  </li>
);

const InputWithLabel = ({ id, type = 'text', value, onInputChange, children }) => (
  <>
    <label htmlFor={id} className={styles.label} > {children} </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
      className={styles.input}
      autoFocus
    />
  </>
)

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} className={styles.searchForm} >
    <InputWithLabel
      id='search'
      value={searchTerm}
      onInputChange={onSearchInput}
    >
      <strong> Search: </strong>
    </InputWithLabel>

    <button
      type='submit'
      disabled={!searchTerm}
      className={`${styles.button} ${styles.buttonLarge}`}
    >
      Submit
    </button>
  </form>
)

export default App;
