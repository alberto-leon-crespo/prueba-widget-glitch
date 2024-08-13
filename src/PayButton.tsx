import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const uelzWidget = (window as any).uelzWidget;

const PayButton: React.FC = () => {

    const location = useLocation();
    useEffect(() => {
        const initializeWidget = async () => {
            if (!uelzWidget.widgetRoot) {
                try {
                    await uelzWidget.init(); // Espera a que el widget se inicialice
                } catch (error) {
                    console.error("Error al inicializar el widget:", error);
                }
            }
        };

        const unloadWidget = async () => {
            if (uelzWidget.widgetRoot) {
                try {
                    await uelzWidget.unload(); // Espera a que el widget se desmonte
                } catch (error) {
                    console.error("Error al desmontar el widget:", error);
                }
            }
        };

        unloadWidget();
        initializeWidget();

        return () => {
            unloadWidget(); // Asegura que el widget se desmonte cuando el componente se desmonte o la ruta cambie
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
