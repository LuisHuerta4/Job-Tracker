import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";

const CardView = ({ applications, onChange }) => {
    const [selectedApp, setSelectedApp] = useState(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        const cards = gridRef.current?.querySelectorAll(".app-card");
        if (!cards?.length) return;
        gsap.fromTo(cards,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.1, stagger: 0.04, ease: "power2.out" }
        );
    }, { scope: gridRef, dependencies: [applications.length] });

    return (
        <>
            <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 styled-scroll max-h-[70vh]">
                {applications.map((app) => (
                    <ApplicationCard
                        key={app._id}
                        app={app}
                        onChange={onChange}
                        onView={() => setSelectedApp(app)}
                    />
                ))}
            </div>

            {selectedApp && (
                <ApplicationDetailsModal
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    onChange={onChange}
                />
            )}
        </>
    );
};

export default CardView;