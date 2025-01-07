import { useState, useEffect, useRef } from 'react';

export default function ArticleForm() {
    const [formData, setFormData] = useState({
        'title-long': '',
        'desc-text': '',
        'image-url': 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
        'cta-text': 'Watch Live',
        'link-out-url': 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'
    });

    const [showPreview, setShowPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const titleInputRef = useRef(null);

    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);
    const validateField = (name, value) => {
        const trimmeredValue = value.trim();

        switch (name) {
            case 'title-long':
                return trimmeredValue.length > 0 && trimmeredValue.length <= 40;
            case 'desc-text':
                return trimmeredValue.length > 0 && trimmeredValue.length <= 150;
            case 'image-url':
            case 'link-out-url':
                return trimmeredValue.length > 0 && /^https?:\/\/.+/.test(trimmeredValue);
            default:
                return true;
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        const isFieldValid = validateField(name, value);

        setValidationErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            if (isFieldValid) {
                delete newErrors[name];
            } else {
                newErrors[name] = `${name.replace(/-/g, ' ')} is required`;
            }

            return newErrors;
        });
    };


    const validateForm = (formData) => {
        const errors = {};
        const requiredFields = ['title-long', 'desc-text', 'image-url', 'link-out-url'];

        requiredFields.forEach(field => {
            const isValid = validateField(field, formData[field]);

            if (!isValid) {
                errors[field] = `${field.replace(/-/g, ' ')} is required`;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { isValid, errors } = validateForm(formData);

        if (isValid) {
            setShowPreview(true);
        } else {
            setValidationErrors(errors);
        }
    };

    const getCharsLeft = (field) => {
        const limits = {
            'title-long': 40,
            'desc-text': 150
        };
        return limits[field] - formData[field].length;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <fieldset className="bg-white rounded-lg shadow p-6">
                                <legend className="font-bold text-gray-700 px-2">
                                    Article Input Form
                                </legend>

                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="title-long"
                                            className="block font-bold text-gray-700 mb-1"
                                        >
                                            Long title
                                        </label>
                                        <input
                                            ref={titleInputRef}
                                            type="text"
                                            id="title-long"
                                            name="title-long"
                                            value={formData['title-long']}
                                            onChange={handleInputChange}
                                            placeholder="this is title"
                                            maxLength={40}
                                            className={`w-full p-2 border rounded focus:outline-none 
                                                ${validationErrors['title-long']
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-300 focus:border-gray-600'}`}
                                        />
                                        <span className="text-sm text-gray-500 mt-1 block">
                                            Characters left: {getCharsLeft('title-long')}
                                        </span>
                                        {validationErrors['title-long'] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {validationErrors['title-long']}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="desc-text"
                                            className="block font-bold text-gray-700 mb-1"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="desc-text"
                                            name="desc-text"
                                            value={formData['desc-text']}
                                            onChange={handleInputChange}
                                            placeholder="type something"
                                            maxLength={150}
                                            className={`w-full p-2 border rounded min-h-[80px] resize-y focus:outline-none 
                                                ${validationErrors['desc-text']
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-300 focus:border-gray-600'}`}
                                        />
                                        <span className="text-sm text-gray-500 mt-1 block">
                                            Characters left: {getCharsLeft('desc-text')}
                                        </span>
                                        {validationErrors['desc-text'] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {validationErrors['desc-text']}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="image-url"
                                            className="block font-bold text-gray-700 mb-1"
                                        >
                                            Image Url
                                        </label>
                                        <input
                                            type="url"
                                            id="image-url"
                                            name="image-url"
                                            value={formData['image-url']}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.jpg"
                                            className={`w-full p-2 border rounded focus:outline-none 
                                                ${validationErrors['image-url']
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-300 focus:border-gray-600'}`}
                                        />
                                        {validationErrors['image-url'] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {validationErrors['image-url']}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="cta-text"
                                            className="block font-bold text-gray-700 mb-1"
                                        >
                                            CTA Text
                                        </label>
                                        <select
                                            id="cta-text"
                                            name="cta-text"
                                            value={formData['cta-text']}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:border-gray-600 focus:outline-none"
                                        >
                                            <option>Watch Live</option>
                                            <option>Breaking News</option>
                                            <option>Read More</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="link-out-url"
                                            className="block font-bold text-gray-700 mb-1"
                                        >
                                            Click Url
                                        </label>
                                        <input
                                            type="url"
                                            id="link-out-url"
                                            name="link-out-url"
                                            value={formData['link-out-url']}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                            className={`w-full p-2 border rounded focus:outline-none 
                                                ${validationErrors['link-out-url']
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-300 focus:border-gray-600'}`}
                                        />
                                        {validationErrors['link-out-url'] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {validationErrors['link-out-url']}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </fieldset>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            >
                                Preview
                            </button>
                        </form>
                    </div>

                    <div className="flex-1">
                        <fieldset className="bg-white rounded-lg shadow p-6 h-full">
                            <legend className="font-bold text-gray-700 px-2">
                                Preview Panel
                            </legend>

                            {showPreview && (
                                <div className="relative overflow-hidden rounded-lg shadow group cursor-pointer">
                                    <a
                                        href={formData['link-out-url']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <div className="relative">
                                            <img
                                                src={formData['image-url']}
                                                alt="預覽圖片"
                                                className="w-full transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/50 p-6">
                                                <div className="w-4/5">
                                                    <h2 className="text-2xl font-bold text-white mb-4 leading-tight drop-shadow">
                                                        {formData['title-long']}
                                                    </h2>
                                                    <p className="text-white mb-6 leading-relaxed drop-shadow">
                                                        {formData['desc-text']}
                                                    </p>
                                                    <button
                                                        className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium uppercase tracking-wide hover:bg-red-700 transition-colors"
                                                    >
                                                        {formData['cta-text']}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

