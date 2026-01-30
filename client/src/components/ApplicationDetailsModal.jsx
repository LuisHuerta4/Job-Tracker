import { useEffect, useRef } from "react";
import gsap from "gsap";

const ApplicationDetailsModal = ({ app, onClose }) => {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2 }
        );
    }, []);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.97,
            duration: 0.2,
            onComplete: onClose,
        });

        gsap.to(backdropRef.current, {
            opacity: 0,
            duration: 0.2,
        });
    };

    if (!app) return null;

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="card w-full max-w-lg space-y-5 "
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-medium tracking-wide heading">
                            {app.company}
                        </h2>
                        <p className="text-sm subtle-text">{app.role}</p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="text-(--color-text-secondary) hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3 text-sm">
                    {app.jobLink && (
                        <div>
                            <p className="text-xs uppercase subtle-text">Job Link</p>
                            <a
                                href={app.jobLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline break-all"
                            >
                                {app.jobLink}
                            </a>
                        </div>
                    )}

                    {app.followUpDate && (
                        <div>
                            <p className="text-xs uppercase subtle-text">Follow Up Date</p>
                            <p>
                                {new Date(app.followUpDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    {app.notes && (
                        <div>
                            <p className="text-xs uppercase subtle-text">Notes</p>
                            <p className="whitespace-pre-wrap text-(--color-text-secondary)">
                                {app.notes}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-2">
                    <button onClick={handleClose} className="app-action">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;
