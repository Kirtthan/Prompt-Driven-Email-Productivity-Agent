import React, { useState } from 'react';
import { Bell, Moon, Sun, Globe, Shield, User, Smartphone, Monitor } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';

const SettingsSection = ({ title, icon: Icon, children }) => (
    <Card className="p-6 mb-6 bg-white/50 backdrop-blur-sm border border-border-light shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-bg-tertiary text-accent-blue shadow-sm">
                <Icon size={20} />
            </div>
            <h3 className="text-lg font-bold text-text-primary font-display">{title}</h3>
        </div>
        {children}
    </Card>
);

const Toggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-border-light last:border-0">
        <div>
            <p className="text-text-primary font-medium">{label}</p>
            {description && <p className="text-sm text-text-secondary">{description}</p>}
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-accent-blue' : 'bg-bg-tertiary border border-border-light'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all shadow-sm ${checked ? 'left-7' : 'left-1'}`}></div>
        </button>
    </div>
);

const Settings = ({ theme, onThemeChange }) => {
    const [notifications, setNotifications] = useState({
        email: true,
        desktop: false,
        sound: true,
    });

    return (
        <div className="max-w-4xl mx-auto animate-fade-in font-sans">
            <h2 className="text-3xl font-bold text-text-primary mb-8 font-display">Settings</h2>

            <SettingsSection title="Appearance" icon={Moon}>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                        onClick={() => onThemeChange('dark')}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${theme === 'dark' ? 'bg-white border-accent-blue shadow-md transform -translate-y-0.5' : 'bg-bg-tertiary border-border-light text-text-secondary hover:bg-bg-hover'}`}
                    >
                        <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-accent-blue' : 'text-text-tertiary'}`} />
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-text-primary' : 'text-text-secondary'}`}>Dark</p>
                    </button>
                    <button
                        onClick={() => onThemeChange('light')}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${theme === 'light' ? 'bg-white border-accent-blue shadow-md transform -translate-y-0.5' : 'bg-bg-tertiary border-border-light text-text-secondary hover:bg-bg-hover'}`}
                    >
                        <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-accent-blue' : 'text-text-tertiary'}`} />
                        <p className={`text-sm font-medium ${theme === 'light' ? 'text-text-primary' : 'text-text-secondary'}`}>Light</p>
                    </button>
                    <button
                        onClick={() => onThemeChange('system')}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${theme === 'system' ? 'bg-white border-accent-blue shadow-md transform -translate-y-0.5' : 'bg-bg-tertiary border-border-light text-text-secondary hover:bg-bg-hover'}`}
                    >
                        <Monitor size={24} className={`mx-auto mb-2 ${theme === 'system' ? 'text-accent-blue' : 'text-text-tertiary'}`} />
                        <p className={`text-sm font-medium ${theme === 'system' ? 'text-text-primary' : 'text-text-secondary'}`}>System</p>
                    </button>
                </div>
                <Toggle
                    label="Reduced Motion"
                    description="Minimize animations throughout the interface"
                    checked={false}
                    onChange={() => { }}
                />
            </SettingsSection>

            <SettingsSection title="Notifications" icon={Bell}>
                <Toggle
                    label="Email Notifications"
                    description="Receive alerts for new emails"
                    checked={notifications.email}
                    onChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
                <Toggle
                    label="Desktop Push Notifications"
                    description="Show popup notifications on your desktop"
                    checked={notifications.desktop}
                    onChange={(checked) => setNotifications({ ...notifications, desktop: checked })}
                />
                <Toggle
                    label="Sound Effects"
                    description="Play sounds for new messages and actions"
                    checked={notifications.sound}
                    onChange={(checked) => setNotifications({ ...notifications, sound: checked })}
                />
            </SettingsSection>

            <SettingsSection title="Account" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input label="Full Name" defaultValue="Alex Morgan" className="bg-white border-border-light text-text-primary focus:border-accent-blue" />
                    <Input label="Email Address" defaultValue="alex@example.com" className="bg-white border-border-light text-text-primary focus:border-accent-blue" />
                </div>
                <Button variant="secondary" className="bg-white border-border-light text-text-secondary hover:text-text-primary hover:border-accent-sand">Update Profile</Button>
            </SettingsSection>

            <SettingsSection title="Language & Region" icon={Globe}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Language</label>
                        <select className="w-full bg-white border border-border-light rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all shadow-sm">
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                    </div>
                </div>
            </SettingsSection>
        </div>
    );
};

export default Settings;
