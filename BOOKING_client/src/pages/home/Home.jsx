import React from 'react';
// Importamos Estilos CSS
import "./home.css"

// Importamos el componente Navbar Header
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/PropertyList';

// Declaramos un componente
const Home = () => {
    return (
        <div >
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />


            </div>
        </div>
    )
}

export default Home;