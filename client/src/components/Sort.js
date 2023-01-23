import './Sort.css';
import FilterCollection from './FilterCollection';
import SortCollection from './SortCollection';


const Sort = () => {
    return(
      <div className="sort">
        <FilterCollection />
        <SortCollection />
      </div>
    )
  }

  export default Sort;
