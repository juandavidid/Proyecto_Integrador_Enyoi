import './seachitem.css'

import img2hoteles from '../../img/img2hoteles.PNG'

// Definimos una funcion Componente
const Searchitem = () => {
    return (
        <div className="searchItem">
            <img
                src={img2hoteles}
                alt=""
                className="siImg">

            </img>

            <div className="siDesc">
                <h1 className="siTitle">Tower Street Apartments</h1>
                <span className="siDistance">500m from center</span>
                <span className="siTaxiOp"> Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">
                    Entire studio  1 bathroom 21m 1 full bed
                </span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today !
                </span>
            </div>
            <div className="siDestails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>

                <div className="siDetailTexts">
                    <span className="siPrice">$123</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <button className="siCheckButton">See availability</button>

                </div>


            </div>
        </div>
    )

}
export default Searchitem