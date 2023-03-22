import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: #83a4d4; /* Comment, awesome right? */
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`

const StyledItem = styled.li` 
  display: flex; 
  align-items: center; 
  padding-bottom: 5px;
`;

const StyledColumn = styled.span` 
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  a{
    color: inherit;
  }
  width: ${(props) => props.width};
`;

const StyledButton = styled.button` 
  background: transparent;
  border: 1px solid #171212; 
  padding: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;

const StyledButtonSmall = styled(StyledButton)` 
  padding: 5px;
`;

const StyledButtonLarge = styled(StyledButton)` 
  padding: 8px;
`;

const StyledSearchForm = styled.form` 
  padding: 10px 0 20px 0;
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label` 
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input` 
  border: none;
  border-bottom: 1px solid #171212; 
  background-color: transparent;
  font-size: 24px;
  width: 15%;
`;

export { 
    StyledButton, StyledButtonLarge, 
    StyledButtonSmall, StyledColumn, StyledHeadlinePrimary,
    StyledContainer, StyledItem, StyledSearchForm,
    StyledLabel, StyledInput
}