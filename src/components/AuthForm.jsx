import React from "react";
import Card from "./Card";

function AuthForm({ title, children, footer }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900">
            <Card className="w-full max-w-md p-8 text-center">
                <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">
                    {title}
                </h1>
                {children}
                {footer && <p className="mt-6 text-gray-600 dark:text-gray-300">{footer}</p>}
            </Card>
        </div>
    );
}

export default AuthForm;