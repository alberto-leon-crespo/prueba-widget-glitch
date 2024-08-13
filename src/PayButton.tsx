import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const PayButton: React.FC = () => {

    const location = useLocation();
    useEffect(() => {
        (window as any).uelzWidget.initializeComponent();
        return () => {
            (window as any).uelzWidget.unloadComponent(); // Asegura que el widget se desmonte cuando el componente se desmonte o la ruta cambie
        };
    }, [location.pathname]);

    return (
        <div>
            <button className="uelz-button uelz-button-styles" data-service-id="clugt6j6e02k0pk01zsy80r2c">Comprar</button>
            <br/>
            <Link to="/">Counter</Link>
        </div>
    );
};

export default PayButton;
