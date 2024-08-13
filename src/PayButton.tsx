import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const PayButton: React.FC = () => {

    const location = useLocation();
    useEffect(() => {
        const uelzWidget = (window as any).uelzWidget;
        if (uelzWidget) {
            uelzWidget.initializeComponent();
        }
        return () => {
            if (uelzWidget) {
                uelzWidget.unloadComponent(); // Asegura que el widget se desmonte cuando el componente se desmonte o la ruta cambie
            }
        };
    }, [location.pathname]);

    return (
        <div>
            <nav>
                <Link to="/">Back to main</Link>
            </nav>
            <br />
            <button className="uelz-button uelz-button-styles" data-service-id="clugt6j6e02k0pk01zsy80r2c">Comprar
            </button>
        </div>
    );
};

export default PayButton;
