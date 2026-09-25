import React, { useMemo, useState } from 'react';
import { useContent } from '../../context/ContentContext';
import {
    ResourceIcon,
    IconPlus,
    IconEdit,
    IconTrash,
    IconUp,
    IconDown,
    IconCopy,
    IconSave,
    IconX,
} from './AdminIcons';
import ResourceForm from './FieldEditors';

/* Small coloured chip for boolean / enum badge fields. */
function Badge({ field, value }) {
    if (field === 'published' || typeof value === 'boolean') {
        const on = Boolean(value);
        return (
            <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${on ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
            >
                <span className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                {on ? 'Published' : 'Draft'}
            </span>
        );
    }

    const toneMap = {
        blue: 'bg-[#0072CE]/12 text-[#005fb3]',
        gold: 'bg-[#F5B800]/25 text-[#8a6300]',
        dark: 'bg-[#0b2a4a]/10 text-[#0b2a4a]',
    };
    const cls = toneMap[value] || 'bg-slate-100 text-slate-600';
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${cls}`}>
            {value}
        </span>
    );
}

export default function ResourceManager({ resource }) {
    const {
        getCollection,
        createItem,
        updateItem,
        deleteItem,
        duplicateItem,
        moveItem,
        log,
    } = useContent();

    const items = getCollection(resource.key);
    const [search, setSearch] = useState('');
    // editing: null | 'new' | item id
    const [editing, setEditing] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [toast, setToast] = useState('');

    const flash = (message) => {
        setToast(message);
        setTimeout(() => setToast(''), 2200);
    };

    const filtered = useMemo(() => {
        if (!search.trim()) return items;
        const q = search.toLowerCase();
        return items.filter((item) =>
            Object.values(item)
                .filter((v) => typeof v === 'string' || typeof v === 'number')
                .some((v) => String(v).toLowerCase().includes(q)),
        );
    }, [items, search]);

    const activeItem =
        editing && editing !== 'new' ? items.find((i) => i.id === editing) : null;

    const titleOf = (item) => item[resource.titleField] || '(untitled)';
    const subtitleOf = (item) =>
        resource.subtitleField ? item[resource.subtitleField] : '';

    const handleCreate = (values) => {
        const created = createItem(resource.key, values);
        log('create', `Created ${resource.label}: ${titleOf(created)}`);
        setEditing(null);
        flash('Item created');
    };

    const handleUpdate = (values) => {
        updateItem(resource.key, activeItem.id, values);
        log('update', `Updated ${resource.label}: ${titleOf(values)}`);
        setEditing(null);
        flash('Changes saved');
    };

    const confirmDelete = (item) => {
        deleteItem(resource.key, item.id);
        log('delete', `Deleted ${resource.label}: ${titleOf(item)}`);
        setPendingDelete(null);
        flash('Item deleted');
    };

    const handleDuplicate = (item) => {
        duplicateItem(resource.key, item.id);
        log('duplicate', `Duplicated ${resource.label}: ${titleOf(item)}`);
        flash('Item duplicated');
    };

    const handleMove = (item, delta) => {
        const didMove = moveItem(resource.key, item.id, delta);
        if (didMove) log('reorder', `Reordered ${resource.label}`);
    };

    return (
        <div className="relative">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0072CE]/12 text-[#0072CE]">
                        <ResourceIcon name={resource.icon} className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                            {resource.label}
                        </h2>
                        <p className="text-sm text-slate-500 max-w-xl">{resource.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search…"
                        className="w-full sm:w-56 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#0072CE] focus:ring-2 focus:ring-[#0072CE]/20"
                    />
                    <button
                        type="button"
                        onClick={() => setEditing('new')}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#F5B800] px-4 py-2.5 text-sm font-extrabold text-[#0b2a4a] hover:bg-[#e0a800] whitespace-nowrap shadow-sm"
                    >
                        <IconPlus className="w-4 h-4" /> New
                    </button>
                </div>
            </div>

            {/* Stats strip */}
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold text-slate-500">
                <span className="rounded-full bg-white px-3 py-1.5 border border-slate-200">
                    {items.length} total
                </span>
                {search && (
                    <span className="rounded-full bg-white px-3 py-1.5 border border-slate-200">
                        {filtered.length} match{filtered.length === 1 ? '' : 'es'}
                    </span>
                )}
            </div>

            {/* List */}
            <div className="space-y-3">
                {filtered.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
                        <p className="text-sm font-semibold text-slate-500">
                            {items.length === 0
                                ? 'Nothing here yet. Create the first item.'
                                : 'No items match your search.'}
                        </p>
                    </div>
                )}

                {filtered.map((item, index) => (
                    <div
                        key={item.id}
                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm hover:border-[#0072CE]/40 hover:shadow-md transition-all"
                    >
                        {/* reorder */}
                        <div className="flex flex-col">
                            <button
                                type="button"
                                onClick={() => handleMove(item, -1)}
                                disabled={index === 0}
                                className="rounded-md p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
                                aria-label="Move up"
                            >
                                <IconUp />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleMove(item, 1)}
                                disabled={index === items.length - 1}
                                className="rounded-md p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
                                aria-label="Move down"
                            >
                                <IconDown />
                            </button>
                        </div>

                        {/* thumbnail / index */}
                        {item.image ? (
                            <img
                                src={item.image}
                                alt=""
                                className="h-12 w-16 flex-shrink-0 rounded-lg object-cover border border-slate-200"
                            />
                        ) : (
                            <span className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-400">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        )}

                        {/* text */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-bold text-[#0b2a4a]">{titleOf(item)}</p>
                            {subtitleOf(item) && (
                                <p className="truncate text-xs text-slate-500">{subtitleOf(item)}</p>
                            )}
                        </div>

                        {/* badge */}
                        {resource.badgeField && (
                            <div className="hidden sm:block">
                                <Badge field={resource.badgeField} value={item[resource.badgeField]} />
                            </div>
                        )}

                        {/* actions */}
                        <div className="flex items-center gap-1">
                            {pendingDelete === item.id ? (
                                <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-2 py-1.5">
                                    <span className="text-xs font-bold text-rose-600">Delete?</span>
                                    <button
                                        type="button"
                                        onClick={() => confirmDelete(item)}
                                        className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-rose-700"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPendingDelete(null)}
                                        className="rounded-lg px-2 py-1 text-xs font-bold text-slate-500 hover:bg-white"
                                    >
                                        No
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleDuplicate(item)}
                                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                        title="Duplicate"
                                    >
                                        <IconCopy />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(item.id)}
                                        className="rounded-lg p-2 text-slate-400 hover:bg-[#0072CE]/10 hover:text-[#0072CE]"
                                        title="Edit"
                                    >
                                        <IconEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPendingDelete(item.id)}
                                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                        title="Delete"
                                    >
                                        <IconTrash className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Editor slide-over */}
            {editing && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <button
                        type="button"
                        aria-label="Close editor"
                        onClick={() => setEditing(null)}
                        className="absolute inset-0 bg-[#030f1e]/50 backdrop-blur-sm"
                    />
                    <div className="relative h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0072CE]/12 text-[#0072CE]">
                                    <ResourceIcon name={resource.icon} className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-extrabold text-[#0b2a4a]">
                                        {editing === 'new' ? `New ${resource.label.replace(/s$/, '')}` : `Edit ${resource.label.replace(/s$/, '')}`}
                                    </p>
                                    <p className="text-[11px] text-slate-400">Fields are generated from the schema</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditing(null)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Close"
                            >
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-6 py-6">
                            <ResourceForm
                                resource={resource}
                                initialValues={activeItem}
                                onSubmit={editing === 'new' ? handleCreate : handleUpdate}
                                onCancel={() => setEditing(null)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-2xl bg-[#0b2a4a] px-5 py-3.5 text-sm font-bold text-white shadow-2xl">
                    <IconSave className="w-4 h-4 text-[#F5B800]" />
                    {toast}
                </div>
            )}
        </div>
    );
}
