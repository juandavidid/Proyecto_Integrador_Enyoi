import React from 'react';
// Importamos Estilos CSS
import "./home.css"

// Importamos el componente Navbar Header
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/PropertyList';
import FeaturedPropeties from '../../components/featuredProperties/FeaturedProperties';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer'
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
                <h1 className="homeTitle">Homes guests love</h1>
                <FeaturedPropeties />
                <MailList />
                <Footer />




            </div>
        </div>
    )
}

export default Home;