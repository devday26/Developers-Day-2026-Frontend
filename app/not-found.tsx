"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { HomeIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <section className="min-h-[calc(100vh-5rem)] bg-dark-red text-white flex items-center justify-center px-6 sm:px-8 py-16 overflow-hidden">
            <div className="max-w-xl mx-auto w-full text-center">
                <div className="inline-block border-2 border-red-primary bg-red-primary/15 px-4 py-2 mb-8">
                    <p className="text-red-primary text-xs md:text-sm font-mono tracking-wider">
                        ERROR_404
                    </p>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-4 font-mono tracking-wide">
                    PAGE_NOT_FOUND
                </h1>

                <div className="w-20 h-1 bg-red-primary mx-auto mb-6" />

                <p className="text-gray-400 text-sm md:text-base font-mono tracking-wider mb-10">
                    THE_PAGE_YOU_ARE_LOOKING_FOR_DOES_NOT_EXIST. <br />
                    Contact Us if you believe this is an erorr.
                </p>

                <div className="mx-auto w-4/5 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                    <Button
                        as={Link}
                        href="/"
                        className="bg-red-primary hover:bg-red-700 text-white font-bold"
                        radius="none"
                        endContent={<HomeIcon className="w-5 h-5" />}
                    >
                        GO_HOME
                    </Button>
                    <Button
                        as={Link}
                        href="/contact-us"
                        className="bg-red-primary hover:bg-red-700 text-white font-bold"
                        radius="none"
                        endContent={<EnvelopeIcon className="w-5 h-5" />}
                    >
                        CONTACT_US
                    </Button>

                </div>
            </div>
        </section >
    );
}