import { useDispatch } from 'react-redux';
import css from './LoadMoreBtn.module.css';
import { incrementCurrentPage } from '../../redux/campersSlice';

const LoadMoreBtn = () => {
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    console.log('Load More clicked'); // Debug
    dispatch(incrementCurrentPage());
  };

  return (
    <button className={css.loadMoreBtn} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
