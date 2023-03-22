import * as React from 'react';
import { InputWithLabel } from './InputWithLabel';
import { StyledSearchForm, StyledButtonLarge, StyledButtonSmall } from './StyledComponent';

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
  const [history, setHistory] = React.useState([]);

  const search = (e) => {
    onSearchSubmit(e);
    if (!history.includes(searchTerm)) {
      setHistory([...history].concat([searchTerm]).slice(-5));
    }
  }

  const backtrack = (e) => {
    onSearchInput(e);
  }

  return (
    <>
      <StyledSearchForm onSubmit={search}>

        <InputWithLabel
          id='search'
          value={searchTerm}
          onInputChange={onSearchInput}
        >
          <strong> Search: </strong>
        </InputWithLabel>

        <StyledButtonLarge type="submit" disabled={!searchTerm}>
          Submit
        </StyledButtonLarge>

      </StyledSearchForm>

      <div style={{ display: 'flex', gap: '10px' }} >
        {history.map(item =>
          <StyledButtonSmall key={item} value={item} onClick={backtrack} >
            {item}
          </StyledButtonSmall>)}
      </div>
    </>
  )
}

export { SearchForm };