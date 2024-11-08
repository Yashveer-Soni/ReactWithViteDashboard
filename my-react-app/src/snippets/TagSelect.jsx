import React, { useState, useRef,useEffect } from 'react';

const TagSelect = ({ onChangeTags,onUpdateValue }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null); 

    useEffect(() => {
        if (onUpdateValue) {
            setTags(onUpdateValue);
        }
      }, [onUpdateValue]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault(); 
            if (!tags.includes(inputValue.trim())) { 
                const newTags = [...tags, inputValue.trim()];
                setTags(newTags);
                onChangeTags(newTags); 
                setInputValue('');
                inputRef.current.focus(); 
            }
        } else if (event.key === 'Backspace' && !inputValue && tags.length) {
            const newTags = tags.slice(0, -1);
            setTags(newTags);
            onChangeTags(newTags);
        }
    };

    const handleTagRemove = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        onChangeTags(newTags);
    };

    return (
        <div className="flex mt-2 gap-2 border border-gray-600 flex-wrap items-center rounded-md shadow-sm p-2.5 px-3 dark:bg-gray-700">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="flex text-sm py-1 font-medium items-center bg-black text-white rounded-full px-3"
                >
                    <span>{tag}</span>
                    <button
                       type='button'
                        className="ml-2 text-white hover:text-white focus:outline-none"
                        onClick={() => handleTagRemove(tag)}
                        aria-label={`Remove tag ${tag}`}
                    >
                        &times;
                    </button>
                </div>
            ))}
            <input
                ref={inputRef} // Focus reference
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag..."
                className="flex-1 text-sm border-none p-0 font-medium focus:ring-0 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
        </div>
    );
};

export default TagSelect;
