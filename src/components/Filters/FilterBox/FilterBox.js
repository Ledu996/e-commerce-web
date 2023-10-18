import { useState } from "react";
import "./style.css";

export function FilterBox ({categories}) {
    const [range, setRangeState] = useState(40);

    const manipulateRange = (e) => {
        console.log('Range manipulate ', e.target.value);
        setRangeState(e.target.value)
    }
    return (
        <div className="filter__box">
            <span style={{fontSize: '18px', fontWeight: 'bold'}}>Filters</span>
            <div class="category-checkbox">
                <h4>Category</h4>
                {categories.map(category => {
                    return (
                        <>
                          <div class="checkbox-label">
                          <input type="checkbox" name="category1" />
                          <label for="category1">{category}</label>
                          </div>
                        </>   
                    )
                })}
                
            </div>
            <h5>Price</h5>
            <div className="input__range">
                <input type="range" onInput={manipulateRange} />
                <div className="range__values">
                    <span>0</span>
                    <span>500</span>
                </div>
            </div>
            <div className="star__rating">
                <h5>Rating</h5>
            </div>
        </div>
    )
}