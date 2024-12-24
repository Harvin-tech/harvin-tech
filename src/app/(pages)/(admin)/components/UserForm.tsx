'use client'
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import TabsNavigation from "./TabsNavigation";

const UserForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState("basicInfo");

    const tabs = [
        { value: "basicInfo", label: "Basic Info" },
        { value: "loginCredentials", label: "Login Credentials" },
        { value: "socialInformation", label: "Social Information" },
        { value: "finish", label: "Finish" },
    ];

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        biography: "",
        userImage: null,
        email: "",
        password: "",
        facebook: "",
        twitter: "",
        linkedin: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const files = (e.target as HTMLInputElement).files;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files?.[0] : value,
        }));
    };

    const handleTabChange = (direction: "next" | "previous") => {
        const currentIndex = tabs.findIndex(tab => tab.value === activeTab);
        const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < tabs.length) {
            setActiveTab(tabs[newIndex].value);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "basicInfo":
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                                Biography
                            </label>
                            <Textarea
                                id="biography"
                                name="biography"
                                placeholder="Write something..."
                                value={formData.biography}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="userImage" className="block text-sm font-medium text-gray-700">
                                User Image
                            </label>
                            <Input
                                id="userImage"
                                name="userImage"
                                type="file"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            case "loginCredentials":
                return (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                );
            case "socialInformation":
                return (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                                Facebook Profile
                            </label>
                            <Input
                                id="facebook"
                                name="facebook"
                                placeholder="Facebook URL"
                                value={formData.facebook}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                                Twitter Profile
                            </label>
                            <Input
                                id="twitter"
                                name="twitter"
                                placeholder="Twitter URL"
                                value={formData.twitter}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                                LinkedIn Profile
                            </label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                value={formData.linkedin}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            case "finish":
                return (
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
                        <h2 className="text-xl font-bold text-gray-800">Review Your Information</h2>
                        <p className="text-gray-600">Please review your details below before submitting.</p>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
                            <div className="p-4 bg-gray-50 rounded-md shadow">
                                <p>
                                    <span className="font-medium text-gray-700">First Name:</span> {formData.firstName}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Last Name:</span> {formData.lastName}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Biography:</span> {formData.biography || "N/A"}
                                </p>
                            </div>
                        </div>

                        {formData.userImage && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700">Profile Image</h3>
                                <img
                                    src={URL.createObjectURL(formData.userImage)}
                                    alt="User"
                                    className="w-20 h-20 object-cover rounded-full"
                                />
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700">Login Credentials</h3>
                            <div className="p-4 bg-gray-50 rounded-md shadow">
                                <p>
                                    <span className="font-medium text-gray-700">Email:</span> {formData.email}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Password:</span>
                                    <span className="text-gray-500 italic"> Hidden for security</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700">Social Profiles</h3>
                            <div className="p-4 bg-gray-50 rounded-md shadow">
                                <p>
                                    <span className="font-medium text-gray-700">Facebook:</span> {formData.facebook || "N/A"}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Twitter:</span> {formData.twitter || "N/A"}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">LinkedIn:</span> {formData.linkedin || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <Tabs value={activeTab} className="w-full">
                <TabsNavigation
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <TabsContent value={activeTab} className="mt-4">
                    {renderTabContent()}
                    <div className="flex justify-end space-x-4 mt-6">
                        {activeTab !== "basicInfo" && (
                            <button
                                onClick={() => handleTabChange("previous")}
                                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/90"
                            >
                                Previous
                            </button>
                        )}
                        {activeTab !== "finish" && (
                            <button
                                onClick={() => handleTabChange("next")}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                            >
                                Next
                            </button>
                        )}
                        {activeTab === "finish" && (
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                onClick={() => alert("Form Submitted")}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserForm;
