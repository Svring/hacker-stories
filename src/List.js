import * as React from 'react'
import { ReactComponent as Apple } from './Apple.svg'
import { StyledItem, StyledColumn, StyledButtonSmall } from './StyledComponent';

const labels = {
  title: 'title', author: 'author', num_comments: 'num_comments', points: 'points'
}

const List = ({ list, onRemoveItem }) => {

  const [order, setOrder] = React.useState(labels.title);

  const [sortedList, setSortedList] = React.useState(list);

  const [changed, setChanged] = React.useState(true);

  const [reverse, setReverse] = React.useState(false);

  const reorder = (event) => {
    const name = event.target.attributes['name'].value;
    setOrder(name);
    setChanged(true);
  }

  const reverseOrder = () => {
    setReverse(!reverse);
    setChanged(true);
  }

  React.useEffect(() => {
    if (changed) {
      const newList = [...list].sort((a, b) => {
        if (typeof a[order] === 'string') {
          return a[order].toLowerCase() < b[order].toLowerCase() ? -1 : 1;
        }
        return a[order] < b[order] ? -1 : 1;
      })
      setSortedList(reverse ? newList.reverse() : newList);
      setChanged(false);
    }
  }, [order, changed, sortedList, reverse, list])

  return (
    <ul>
      <Label reorder={reorder} reverse={reverseOrder}/>
      {sortedList.map((item) =>
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} change={setChanged} />)}
    </ul>
  );
}

const Label = ({ reorder, reverse }) => (
  <StyledItem>
    <LabelCapsule width={'40%'} name={labels.title} onclick={reorder} />
    <LabelCapsule width={'30%'} name={labels.author} onclick={reorder} />
    <LabelCapsule width={'10%'} name={labels.num_comments} onclick={reorder} />
    <LabelCapsule width={'10%'} name={labels.points} onclick={reorder} />
    <StyledColumn width="10%">
      <StyledButtonSmall onClick={reverse}>
        Reverse
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
)

const LabelCapsule = ({ width, name, onclick }) => (
  <StyledColumn width={width} name={name} onClick={e => onclick(e)} style={{ cursor: 'pointer' }} >
    {name}
  </StyledColumn>
)

const Item = ({ item, onRemoveItem, change }) => (
  <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="30%">{item.author}</StyledColumn>
    <StyledColumn width="10%">{item.num_comments}</StyledColumn>
    <StyledColumn width="10%">{item.points}</StyledColumn>
    <StyledColumn width="10%">
      <StyledButtonSmall
        type="button"
        onClick={() => {
          onRemoveItem(item);
          change(true);
        }}>
        <Apple height="18px" width="18px" />
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);

export { List };