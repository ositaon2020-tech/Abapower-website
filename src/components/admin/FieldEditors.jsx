import React, { useEffect, useRef, useState } from 'react';
import { IconPlus, IconTrash, IconUp, IconDown, IconRefresh, IconSave, IconUpload } from './AdminIcons';
import { isSupabaseConfigured } from '../../lib/supabase';
import { uploadMedia } from '../../lib/cmsApi';

/* ------------------------------------------------------------ primitives */
const label = 'block text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-2';

const inputBase =
    'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0b2a4a] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0072CE] focus:ring-2 focus:ring-[#0072CE]/20';

function cx(...parts) {
    return parts.filter(Boolean).join(' ');
}

function FieldShell({ field, error, children }) {
    return (
        <div className="mb-5">
            <div className="flex items-baseline justify-between gap-3">
                <label className={label}>{field.label || field.name}</label>
                {field.required && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Required</span>
                )}
            </div>
            {children}
            {field.help && <p className="text-xs text-slate-400 mt-1.5">{field.help}</p>}
            {error && <p className="text-xs font-semibold text-rose-500 mt-1.5">{error}</p>}
        </div>
    );
}

/* --------------------------------------------------------- string array */
function StringListEditor({ items = [], onChange, placeholder = 'Add an item…' }) {
    const [draft, setDraft] = useState('');

    const add = () => {
        const value = draft.trim();
        if (!value) return;
        onChange([...items, value]);
        setDraft('');
    };

    const move = (index, delta) => {
        const target = index + delta;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        const [removed] = next.splice(index, 1);
        next.splice(target, 0, removed);
        onChange(next);
    };

    return (
        <div>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div
                        key={`${index}-${item.slice(0, 12)}`}
                        className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                        <span className="mt-1.5 text-[10px] font-bold text-slate-400 w-5">{index + 1}</span>
                        <textarea
                            rows={1}
                            value={item}
                            onChange={(e) => {
                                const next = [...items];
                                next[index] = e.target.value;
                                onChange(next);
                            }}
                            className="flex-1 resize-y bg-transparent text-sm text-[#0b2a4a] outline-none"
                        />
                        <div className="flex items-center gap-1 pt-1">
                            <button
                                type="button"
                                onClick={() => move(index, -1)}
                                disabled={index === 0}
                                className="p-1 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                                aria-label="Move up"
                            >
                                <IconUp />
                            </button>
                            <button
                                type="button"
                                onClick={() => move(index, 1)}
                                disabled={index === items.length - 1}
                                className="p-1 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                                aria-label="Move down"
                            >
                                <IconDown />
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange(items.filter((_, i) => i !== index))}
                                className="p-1 rounded-md text-rose-400 hover:bg-rose-50 hover:text-rose-600"
                                aria-label="Remove item"
                            >
                                <IconTrash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 mt-3">
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            add();
                        }
                    }}
                    placeholder={placeholder}
                    className={cx(inputBase, 'border-slate-200')}
                />
                <button
                    type="button"
                    onClick={add}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2a4a] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123a63] whitespace-nowrap"
                >
                    <IconPlus className="w-4 h-4" /> Add
                </button>
            </div>
        </div>
    );
}

/* ---------------------------------------------------------- contacts */
function ContactsEditor({ items = [], onChange }) {
    const update = (index, patch) => {
        onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };

    return (
        <div className="space-y-4">
            {items.map((contact, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Contact {index + 1}
                        </span>
                        <button
                            type="button"
                            onClick={() => onChange(items.filter((_, i) => i !== index))}
                            className="p-1.5 rounded-md text-rose-400 hover:bg-rose-50 hover:text-rose-600"
                            aria-label="Remove contact"
                        >
                            <IconTrash className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            value={contact.label || ''}
                            onChange={(e) => update(index, { label: e.target.value })}
                            placeholder="Label"
                            className={cx(inputBase, 'border-slate-200')}
                        />
                        <input
                            value={contact.value || ''}
                            onChange={(e) => update(index, { value: e.target.value })}
                            placeholder="Displayed value"
                            className={cx(inputBase, 'border-slate-200')}
                        />
                        <input
                            value={contact.tel || ''}
                            onChange={(e) => update(index, { tel: e.target.value })}
                            placeholder="tel: link (optional)"
                            className={cx(inputBase, 'border-slate-200')}
                        />
                        <input
                            value={contact.note || ''}
                            onChange={(e) => update(index, { note: e.target.value })}
                            placeholder="Note"
                            className={cx(inputBase, 'border-slate-200')}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => onChange([...items, { label: '', value: '', tel: '', note: '' }])}
                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#0072CE]/50 px-4 py-2.5 text-sm font-bold text-[#0072CE] hover:bg-[#e8f3fc]"
            >
                <IconPlus className="w-4 h-4" /> Add contact card
            </button>
        </div>
    );
}

/* ---------------------------------------------------------- sections */
function SectionsEditor({ items = [], onChange }) {
    const update = (index, patch) => {
        onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };

    const move = (index, delta) => {
        const target = index + delta;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        const [removed] = next.splice(index, 1);
        next.splice(target, 0, removed);
        onChange(next);
    };

    return (
        <div className="space-y-4">
            {items.map((section, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Section {index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => move(index, -1)}
                                disabled={index === 0}
                                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                                aria-label="Move section up"
                            >
                                <IconUp />
                            </button>
                            <button
                                type="button"
                                onClick={() => move(index, 1)}
                                disabled={index === items.length - 1}
                                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                                aria-label="Move section down"
                            >
                                <IconDown />
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange(items.filter((_, i) => i !== index))}
                                className="p-1.5 rounded-md text-rose-400 hover:bg-rose-50 hover:text-rose-600"
                                aria-label="Remove section"
                            >
                                <IconTrash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <input
                        value={section.heading || ''}
                        onChange={(e) => update(index, { heading: e.target.value })}
                        placeholder="Section heading"
                        className={cx(inputBase, 'border-slate-200 font-semibold mb-3')}
                    />

                    <StringListEditor
                        items={section.bullets || []}
                        onChange={(bullets) => update(index, { bullets })}
                        placeholder="Add a bullet point…"
                    />
                </div>
            ))}

            <button
                type="button"
                onClick={() => onChange([...items, { heading: '', bullets: [] }])}
                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#0072CE]/50 px-4 py-2.5 text-sm font-bold text-[#0072CE] hover:bg-[#e8f3fc]"
            >
                <IconPlus className="w-4 h-4" /> Add section
            </button>
        </div>
    );
}

/* ----------------------------------------------------------- image field */
/**
 * Image picker that uploads straight into the public Supabase `cms-media`
 * bucket. A URL can still be typed by hand for assets that live elsewhere
 * (CDN, /assets, …) — uploading simply replaces the value with the public URL
 * Supabase returns.
 */
function ImageControl({ value, onChange }) {
    const fileRef = useRef(null);
    const [status, setStatus] = useState('idle'); // idle | uploading | error
    const [message, setMessage] = useState('');

    const handleFile = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setStatus('error');
            setMessage('Please choose an image file.');
            return;
        }
        // Keep uploads comfortably inside the default per-object limit.
        if (file.size > 8 * 1024 * 1024) {
            setStatus('error');
            setMessage('That image is larger than 8 MB. Please compress it first.');
            return;
        }

        setStatus('uploading');
        setMessage('Uploading to the media bucket…');
        const result = await uploadMedia(file, 'images');

        if (result.ok && result.url) {
            onChange(result.url);
            setStatus('idle');
            setMessage('Uploaded to Supabase storage.');
        } else {
            setStatus('error');
            setMessage(result.error || 'Upload failed. Please try again.');
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <input
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://… or /assets/image.png"
                    className={cx(inputBase, 'border-slate-200')}
                />
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={status === 'uploading' || !isSupabaseConfigured}
                    title={
                        isSupabaseConfigured
                            ? 'Upload an image to the Supabase media bucket'
                            : 'Connect Supabase to enable uploads'
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <IconUpload className="w-4 h-4" />
                    {status === 'uploading' ? 'Uploading…' : 'Upload'}
                </button>
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
            />

            {message && (
                <p
                    className={cx(
                        'text-xs mt-1.5',
                        status === 'error' ? 'font-semibold text-rose-500' : 'text-slate-400',
                    )}
                >
                    {message}
                </p>
            )}

            {value ? (
                <div className="mt-3 h-32 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={value} alt="Preview" className="h-full w-full object-cover" />
                </div>
            ) : null}
        </div>
    );
}

/* ------------------------------------------------------- single field */
function FieldControl({ field, value, onChange, onSlugFrom }) {
    switch (field.type) {
        case 'textarea':
            return (
                <textarea
                    rows={field.rows || 4}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className={cx(inputBase, 'border-slate-200 resize-y')}
                />
            );

        case 'number':
            return (
                <input
                    type="number"
                    value={value ?? ''}
                    min={field.min}
                    step={field.step}
                    onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                    className={cx(inputBase, 'border-slate-200')}
                />
            );

        case 'select':
            return (
                <select
                    value={value ?? field.default ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={cx(inputBase, 'border-slate-200')}
                >
                    {(field.options || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );

        case 'checkbox':
            return (
                <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(value)}
                    onClick={() => onChange(!value)}
                    className={cx(
                        'relative inline-flex h-7 w-12 items-center rounded-full transition-colors',
                        value ? 'bg-[#0072CE]' : 'bg-slate-300',
                    )}
                >
                    <span
                        className={cx(
                            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
                            value ? 'translate-x-6' : 'translate-x-1',
                        )}
                    />
                </button>
            );

        case 'image':
            return <ImageControl value={value} onChange={onChange} />;

        case 'url':
            return (
                <input
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder || '#section or https://…'}
                    className={cx(inputBase, 'border-slate-200')}
                />
            );

        case 'slug':
            return (
                <div>
                    <div className="flex items-center gap-2">
                        <input
                            value={value ?? ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="my-topic-slug"
                            className={cx(inputBase, 'border-slate-200')}
                        />
                        <button
                            type="button"
                            onClick={onSlugFrom}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 whitespace-nowrap"
                            title="Generate from title"
                        >
                            <IconRefresh className="w-4 h-4" /> From title
                        </button>
                    </div>
                    {value && (
                        <p className="text-xs text-slate-400 mt-1.5">
                            Route: <code className="text-[#0072CE]">#/health-safety/{value}</code>
                        </p>
                    )}
                </div>
            );

        case 'list':
            return <StringListEditor items={value || []} onChange={onChange} />;

        case 'contacts':
            return <ContactsEditor items={value || []} onChange={onChange} />;

        case 'sections':
            return <SectionsEditor items={value || []} onChange={onChange} />;

        case 'text':
        default:
            return (
                <input
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className={cx(inputBase, 'border-slate-200')}
                />
            );
    }
}

/* ------------------------------------------------------ resource form */
export function slugify(value = '') {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
}

/**
 * Renders a create/edit form for any resource from its schema.
 * `initialValues` is the item being edited, or null when creating.
 */
export default function ResourceForm({ resource, initialValues, onSubmit, onCancel }) {
    const buildInitial = () => {
        const values = {};
        resource.fields.forEach((field) => {
            if (initialValues && initialValues[field.name] !== undefined) {
                values[field.name] = initialValues[field.name];
            } else if (field.type === 'checkbox') {
                values[field.name] = field.default ?? false;
            } else if (field.type === 'select') {
                values[field.name] = field.default ?? field.options?.[0]?.value ?? '';
            } else if (['list', 'contacts', 'sections'].includes(field.type)) {
                values[field.name] = field.type === 'list' ? [] : [];
            } else {
                values[field.name] = '';
            }
        });
        return values;
    };

    const [values, setValues] = useState(buildInitial);
    const [errors, setErrors] = useState({});

    // Rebuild the draft whenever the resource or target item changes.
    useEffect(() => {
        setValues(buildInitial());
        setErrors({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource.key, initialValues?.id]);

    const setField = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextErrors = {};
        resource.fields.forEach((field) => {
            if (!field.required) return;
            const value = values[field.name];
            const empty =
                value === undefined ||
                value === null ||
                (typeof value === 'string' && value.trim() === '') ||
                (Array.isArray(value) && value.length === 0);
            if (empty) nextErrors[field.name] = `${field.label || field.name} is required`;
        });
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            {resource.fields.map((field) => {
                // Conditional field (e.g. image only for the image card variant).
                if (field.showWhen) {
                    const dep = values[field.showWhen.field];
                    if (dep !== field.showWhen.equals) return null;
                }
                return (
                    <FieldShell key={field.name} field={field} error={errors[field.name]}>
                        <FieldControl
                            field={field}
                            value={values[field.name]}
                            onChange={(v) => setField(field.name, v)}
                            onSlugFrom={() => {
                                const source = field.source ? values[field.source] : '';
                                setField(field.name, slugify(source || ''));
                            }}
                        />
                    </FieldShell>
                );
            })}

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 mt-2">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0072CE] px-6 py-3 text-sm font-bold text-white hover:bg-[#005fb3]"
                >
                    <IconSave className="w-4 h-4" />
                    {initialValues ? 'Save changes' : 'Create'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
