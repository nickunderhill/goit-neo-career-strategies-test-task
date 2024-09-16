import css from './CamperCards.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredCampers } from '../../redux/campersSlice';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import CamperCard from '../CamperCard/CamperCard';

const CamperCards = () => {
  const campers = useSelector(selectFilteredCampers);
  const currentPage = useSelector(state => state.campers.currentPage);
  const itemsPerPage = useSelector(state => state.campers.itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageCampers = campers.slice(0, endIndex);

  return (
    <div className={css.campersContainer}>
      <ul className={css.campersList}>
        {currentPageCampers.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>
      {endIndex < campers.length && <LoadMoreBtn />}
    </div>
  );
};

export default CamperCards;
