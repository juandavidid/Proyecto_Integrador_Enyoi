import './featuredProperties.css'

import imgHotel from '../../img/imgHotel.PNG'
import useFetch from '../../hooks/useFetch'

// Funcion componente

const FeaturedPropeties = () => {
    const { data, loading, error } = useFetch("/api/hotels/countByType")
    return (
        <div className="fp">

            <div className="fpItem">
                <img src={imgHotel} alt="" className="fpImg" />
                <span className="fpName">Aparthotel Stare Miasto</span>
                <span className="fpCity">Madrid</span>
                <span className="fpPrice">Starting from $120</span>
                <div className="fpRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>



            <div className="fpItem">
                <img src={imgHotel} alt="" className="fpImg" />
                <span className="fpName">Aparthotel Stare Miasto</span>
                <span className="fpCity">Madrid</span>
                <span className="fpPrice">Starting from $120</span>
                <div className="fpRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>

            <div className="fpItem">
                <img src={imgHotel} alt="" className="fpImg" />
                <span className="fpName">Aparthotel Stare Miasto</span>
                <span className="fpCity">Madrid</span>
                <span className="fpPrice">Starting from $120</span>
                <div className="fpRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>
            <div className="fpItem">
                <img src={imgHotel} alt="" className="fpImg" />
                <span className="fpName">Aparthotel Stare Miasto</span>
                <span className="fpCity">Madrid</span>
                <span className="fpPrice">Starting from $120</span>
                <div className="fpRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>


        </div>
    )
}
export default FeaturedPropeties;