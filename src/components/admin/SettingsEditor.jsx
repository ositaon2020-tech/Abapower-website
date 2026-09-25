import React, { useEffect, useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { ResourceIcon, IconSave, IconRefresh } from './AdminIcons';

/* Reuse the field controls from the resource form. */
import ResourceForm from './FieldEditors';

const settingKey = (fullKey) => fullKey.replace(/^settings\./, '');

export default function SettingsEditor({ resource }) {
    const { getSettings, updateSettings, log } = useContent();
    const key = settingKey(resource.key);
    const current = getSettings(key);

    const [draft, setDraft] = useState(current);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setDraft(getSettings(key));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource.key]);

    const handleSubmit = (values) => {
        updateSettings(key, values);
        log('update', `Updated settings: ${resource.label}`);
        setDraft(values);
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-start gap-4 mb-7">
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

            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <ResourceForm
                    resource={resource}
                    initialValues={draft}
                    onSubmit={handleSubmit}
                    onCancel={() => setDraft(current)}
                />
            </div>

            {saved && (
                <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-2xl bg-[#0b2a4a] px-5 py-3.5 text-sm font-bold text-white shadow-2xl">
                    <IconSave className="w-4 h-4 text-[#F5B800]" /> Settings saved
                </div>
            )}
        </div>
    );
}

export { IconRefresh };
