import { useDispatch, useSelector } from 'react-redux';
import css from './CatalogFilter.module.css';
import {
  setEquipment,
  setType,
  setLocation,
  selectEquipment,
  selectLocation,
  selectType,
} from '../../redux/filterSlice';
import { useState } from 'react';
import {
  filterEquipmentOptions,
  filterTypeOptions,
  locations,
} from '../../utils/constants';
import { resetCurrentPage } from '../../redux/campersSlice';

const CatalogFilter = () => {
  const dispatch = useDispatch();
  const equipment = useSelector(selectEquipment);
  const location = useSelector(selectLocation);
  const type = useSelector(selectType);

  // Local state to hold temporary filter values
  const [localEquipment, setLocalEquipment] = useState(equipment);
  const [localLocation, setLocalLocation] = useState(location);
  const [localTypes, setLocalTypes] = useState([...type]);

  const handleEquipmentClick = (key, value) => {
    setLocalEquipment(prev => {
      const newEquipment = { ...prev };
      if (newEquipment.hasOwnProperty(key)) {
        delete newEquipment[key];
      } else {
        newEquipment[key] = value;
      }
      return newEquipment;
    });
  };

  const handleTypeClick = value => {
    setLocalTypes(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleLocationChange = event => {
    setLocalLocation(event.target.value);
  };

  const handleSearch = () => {
    dispatch(resetCurrentPage());
    dispatch(setEquipment(localEquipment));
    dispatch(setType(localTypes));
    dispatch(setLocation(localLocation));
  };

  return (
    <div className={css.filterContainer}>
      <div className={css.locationSection}>
        <label className={css.sectionTitle}>Location</label>
        <div
          className={`${css.locationBox} ${
            localLocation ? '' : css.emptyLocation
          }`}
        >
          <span
            className={`icon icon-map ${css.filterMapIcon}`}
            aria-hidden="true"
          ></span>
          <select
            className={css.locationSelect}
            value={localLocation ? localLocation : ''}
            onChange={handleLocationChange}
          >
            <option value="" hidden>
              City
            </option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={css.filterSection}>
        <h3 className={css.sectionTitle}>Filters</h3>

        <div className={css.filterBlock}>
          <h4 className={css.filterTitle}>Vehicle equipment</h4>
          <div className={css.equipmentContainer}>
            {filterEquipmentOptions.map(option => (
              <div
                key={option.key}
                className={`${css.equipmentItem} ${
                  localEquipment.hasOwnProperty(option.key) ? css.selected : ''
                }`}
                onClick={() => handleEquipmentClick(option.key, option.value)}
              >
                <span
                  className={`icon ${option.icon} ${css.filterOptionIcon}`}
                  aria-hidden="true"
                ></span>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={css.filterBlock}>
          <h4 className={css.filterTitle}>Vehicle type</h4>
          <div className={css.typeContainer}>
            {filterTypeOptions.map(option => (
              <div
                key={option.key}
                className={`${css.typeItem} ${
                  localTypes.includes(option.key) ? css.selected : ''
                }`}
                onClick={() => handleTypeClick(option.key)}
              >
                <span
                  className={`icon ${option.icon} ${css.filterOptionIcon}`}
                  aria-hidden="true"
                ></span>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className={css.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default CatalogFilter;
