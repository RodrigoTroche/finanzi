import React from "react";

// Componente para mostrar un mensaje de éxito
function SuccessMessage(props) {
    return (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
            {props.message}
        </div>
    );
}

// Componente para mostrar un mensaje de error
function ErrorMessage(props) {
    return (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {props.message}
        </div>
    );
}

// Componente para mostrar un mensaje de advertencia
function WarningMessage(props) {
    return (
        <div className="bg-yellow-500 text-white p-4 rounded-lg mb-4">
            {props.message}
        </div>
    );
}

// Ejemplo de uso
function FlashMessages({ flash }) {
    return (
        <>
            {flash && flash.success && (
                <SuccessMessage message={flash.success} />
            )}
            {flash && flash.error && <ErrorMessage message={flash.error} />}
            {flash && flash.warning && (
                <WarningMessage message={flash.warning} />
            )}
        </>
    );
}

export default FlashMessages;
