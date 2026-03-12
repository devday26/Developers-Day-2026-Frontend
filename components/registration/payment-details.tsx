"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function PaymentDetails() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };
    return (
        <div className="bg-dark-red border border-gray-800 p-4 md:p-5 space-y-3">
            <p className="text-red-primary text-xs font-mono">PAYMENT_ACCOUNT_DETAILS</p>
            <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between gap-4">
                    <span className="text-gray-500">BANK: </span>
                    <span className="text-white font-medium text-right">
                        AL_HABIB_LIMITED
                    </span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-gray-500">ACCOUNT_TITLE: </span>
                    <span className="text-white font-medium text-right">
                        NEHA_AAMIR
                    </span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-gray-500">ACCOUNT_NO: </span>
                    <span className="text-white font-medium text-right">
                        5017-1860-010439-01-4
                    </span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-gray-500">IBAN: </span>
                    <span className="text-white font-medium text-right">
                        PK85BAHL5017186001043901
                    </span>
                </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                    onClick={() => handleCopy("5017-1860-010439-01-4", "account")}
                    className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono py-2 transition-colors"
                >
                    {copiedField === "account" ? (
                        <>
                            <FiCheck className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">COPIED</span>
                        </>
                    ) : (
                        <>
                            <FiCopy className="w-4 h-4" />
                            <span>COPY_ACCOUNT_NO</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => handleCopy("PK85BAHL5017186001043901", "iban")}
                    className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono py-2 transition-colors"
                >
                    {copiedField === "iban" ? (
                        <>
                            <FiCheck className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">COPIED</span>
                        </>
                    ) : (
                        <>
                            <FiCopy className="w-4 h-4" />
                            <span>COPY_IBAN</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}