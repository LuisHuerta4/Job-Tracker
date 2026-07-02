import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { updateApplication } from "../api/applications.api";
import { STATUSES } from "../../constants/statuses";
import { statusColors } from "../../constants/statuses";

const ApplicationDetailsModal = ({ app, onClose, onChange }) => {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        company: app.company || "",
        role: app.role || "",
        status: app.status || "Applied",
        followUpDate: app.followUpDate
            ? app.followUpDate.slice(0, 10)
            : "",
        notes: app.notes || "",
        jobLink: app.jobLink || "",
    });

    useEffect(() => {
        gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2 }
        );

        gsap.to(
            modalRef.current,
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
            }
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await updateApplication(app._id, form);
        setEditing(false);
        onChange?.();
        handleClose();
    };

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
            onMouseDown={handleClose}
        >
            <div
                ref={modalRef}
                onMouseDown={(e) => e.stopPropagation()}
                className="card w-full max-w-lg mx-4 relative scale-[0.5] transition-transform duration-200"
            >

                <div className="flex justify-between items-start">
                    <div>
                        {editing ? (
                            <>
                                <p className="text-xs uppercase subtle-text my-2">
                                    Company
                                </p>
                                <input
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    className="auth-input text-lg font-medium"
                                />

                                <p className="text-xs uppercase subtle-text mt-2">
                                    Role
                                </p>
                                <input
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    className="auth-input mt-2"
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-medium heading">
                                    {app.company}
                                </h2>
                                <p className="text-sm subtle-text">{app.role}</p>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handleClose}
                        className="text-(--color-text-secondary) hover:text-white cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4 text-sm">
                    <div>
                        <p className="text-xs uppercase subtle-text mt-4 mb-1">
                            Status
                        </p>
                        {editing ? (
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="select-dark w-full"
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s} className="bg-bg-secondary text-white">
                                        {s}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className={`${statusColors[app.status]} pointer-events-none`}>{app.status}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs uppercase subtle-text mb-1">
                            Job Link
                        </p>

                        {editing ? (
                            <input
                                name="jobLink"
                                value={form.jobLink}
                                onChange={handleChange}
                                className="auth-input"
                                placeholder="https://..."
                                autoComplete="off"
                            />
                        ) : app.jobLink &&
                          (() => {
                              try {
                                  return ["http:", "https:"].includes(
                                      new URL(app.jobLink).protocol
                                  );
                              } catch {
                                  return false;
                              }
                          })() ? (
                            <a
                                href={app.jobLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline break-all"
                            >
                                {app.jobLink}
                            </a>
                        ) : app.jobLink ? (
                            <p className="text-(--color-text-secondary) break-all">
                                {app.jobLink}
                            </p>
                        ) : (
                            <p className="text-(--color-text-secondary)">—</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs uppercase subtle-text mb-1">
                            Follow Up Date
                        </p>

                        {editing ? (
                            <input
                                type="date"
                                name="followUpDate"
                                value={form.followUpDate}
                                onChange={handleChange}
                                className="auth-input"
                            />
                        ) : app.followUpDate ? (
                            <p>
                                {new Date(app.followUpDate).toLocaleDateString("en-US", {
                                    timeZone: "UTC",
                                })}
                            </p>
                        ) : (
                            <p className="text-(--color-text-secondary)">—</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs uppercase subtle-text mb-1">
                            Notes
                        </p>
                        {editing ? (
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                rows={4}
                                className="auth-input resize-none"
                            />
                        ) : (
                            <p className="whitespace-pre-wrap text-(--color-text-secondary)">
                                {app.notes || "—"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                    {editing ? (
                        <>
                            <button
                                onClick={() => setEditing(false)}
                                className="app-action"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="auth-button w-auto px-4"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="app-action"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;