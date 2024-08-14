import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import {countriesData} from "./data/CountriesData";

interface FormData {
    serviceName: string;
    planName: string;
    planDescription: string;
    planAmount: string;
    planCurrency: string;
    planType: string;
    typeSubscription: string;
    planFrequency: string;
    planBillingCycles: string;
    planPaymentDay: string;
    futureChargeAction: string;
    consumeUnits: string;
    externalUsageId: string;
    serviceId: string;
    customerEmail: string;
    customerCif: string;
    customerType: string;
    name: string;
    surname: string;
    companyName: string;
    prefix: string;
    phone: string;
    country: string;
    city: string;
    postalCode: string;
    address: string;
    customerNotEditable: boolean;
    externalProductId: string;
    externalCustomerId: string;
    externalOrderId: string;
}

function PaymentButtonForm() {
    const [formData, setFormData] = useState<FormData>({
        serviceName: '',
        planName: '',
        planDescription: '',
        planAmount: '',
        planCurrency: '',
        planType: '',
        typeSubscription: '',
        planFrequency: '',
        planBillingCycles: '',
        planPaymentDay: '',
        futureChargeAction: '',
        consumeUnits: '',
        externalUsageId: '',
        serviceId: '',
        customerEmail: '',
        customerCif: '',
        customerType: 'PERSON',
        name: '',
        surname: '',
        companyName: '',
        prefix: '',
        phone: '',
        country: 'ES',
        city: '',
        postalCode: '',
        address: '',
        customerNotEditable: false,
        externalProductId: '',
        externalCustomerId: '',
        externalOrderId: ''
    });

    const [buttonGenerated, setButtonGenerated] = useState<boolean>(false);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setButtonGenerated(true);
        const uelzWidget = (window as any).uelzWidget;
        if (uelzWidget) {
            uelzWidget.initializeComponent();
        }
        return () => {
            if (uelzWidget) {
                uelzWidget.unloadComponent(); // Asegura que el widget se desmonte cuando el componente se desmonte o la ruta cambie
            }
        };
    };

    const generateButtonProps = (): { [key: string]: string } => {
        return Object.keys(formData).reduce((acc: { [key: string]: string }, key: string) => {
            const value = (formData as any)[key];
            if (value) {
                acc[`data-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`] = value;
            }
            return acc;
        }, {});
    };

    return (
        <div>
            <nav>
                <Link to="/">Back to main</Link>
            </nav>
            <br/>
            <form onSubmit={handleSubmit}>
                <h1>Datos del plan</h1>
                <div>
                    <label>Service Name:</label>
                    <input
                        type="text"
                        name="serviceName"
                        value={formData.serviceName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plan Name:</label>
                    <input
                        type="text"
                        name="planName"
                        value={formData.planName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plan Description:</label>
                    <input
                        type="text"
                        name="planDescription"
                        value={formData.planDescription}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plan Amount:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="planAmount"
                        value={formData.planAmount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plan Currency:</label>
                    <input
                        type="text"
                        name="planCurrency"
                        value={formData.planCurrency}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plan Type:</label>
                    <select
                        name="planType"
                        value={formData.planType}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        <option value="Subscription">Subscription</option>
                        <option value="Unique">Unique</option>
                    </select>
                </div>
                <div>
                    <label>Type Subscription:</label>
                    <select
                        name="typeSubscription"
                        value={formData.typeSubscription}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        <option value="fixed">Fixed</option>
                        <option value="variable">Variable</option>
                    </select>
                </div>
                <div>
                    <label>Plan Frequency:</label>
                    <select
                        name="planFrequency"
                        value={formData.planFrequency}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        <option value="day">Daily</option>
                        <option value="week">Weekly</option>
                        <option value="month">Month</option>
                        <option value="quaterly">Quaterly</option>
                        <option value="semiannually">Semiannually</option>
                        <option value="year">Year</option>
                    </select>
                </div>
                <div>
                    <label>Plan Billing Cycles:</label>
                    <input
                        type="number"
                        name="planBillingCycles"
                        value={formData.planBillingCycles}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plan Payment Day:</label>
                    <input
                        type="number"
                        name="planPaymentDay"
                        value={formData.planPaymentDay}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Future Charge Action:</label>
                    <input
                        type="text"
                        name="futureChargeAction"
                        value={formData.futureChargeAction}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Consume Units:</label>
                    <input
                        type="number"
                        name="consumeUnits"
                        step="1"
                        value={formData.consumeUnits}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>External Usage ID:</label>
                    <input
                        type="text"
                        name="externalUsageId"
                        value={formData.externalUsageId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Service ID (only if you need to provide a service id):</label>
                    <input
                        type="text"
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                    />
                </div>
                {/* Datos del Cliente */}
                <h1>Datos del cliente</h1>
                <div>
                    <label>Customer Email:</label>
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Customer CIF:</label>
                    <input
                        type="text"
                        name="customerCif"
                        value={formData.customerCif}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Customer Type:</label>
                    <select
                        name="customerType"
                        value={formData.customerType}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        <option value="PERSON">PERSON</option>
                        <option value="COMPANY">COMPANY</option>
                    </select>
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Prefix:</label>
                    <input
                        type="text"
                        name="prefix"
                        value={formData.prefix}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        {countriesData.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                {/* Datos Adicionales */}
                <div>
                    <label>External Product ID:</label>
                    <input
                        type="text"
                        name="externalProductId"
                        value={formData.externalProductId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>External Customer ID:</label>
                    <input
                        type="text"
                        name="externalCustomerId"
                        value={formData.externalCustomerId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>External Order ID:</label>
                    <input
                        type="text"
                        name="externalOrderId"
                        value={formData.externalOrderId}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <button type="submit">Generate Payment Button</button>
            </form>

            {buttonGenerated && (
                <div>
                    <br/>
                    <button
                        className="uelz-button uelz-button-styles"
                        id="uelz-button"
                        {...generateButtonProps()}
                    >
                        Comprar
                    </button>
                </div>
            )}
        </div>
    );
}

export default PaymentButtonForm;
