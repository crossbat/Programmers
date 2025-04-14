import { FC } from 'react'
import { IList } from '../../types'
import List from '../Lists/List'
import ActionButton from '../ActionButton/ActionButton';
import { listsConainer } from './ListsContainer.css';

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}

const ListsContainer: FC<TListsContainerProps> = ({ lists, boardId }) => {
  return (
    <div className={listsConainer}>
      {
        lists.map(list => (
          <List key={list.listId} list={list} boardId={boardId} />
        ))
      }
      <ActionButton boardId={boardId} listId={""} list />
    </div>
  )
}

export default ListsContainer
