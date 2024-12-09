import React, { useState } from 'react';

interface TruncatedTextProps {
    text: string;
    maxLength?: number; 
  }

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength = 50 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => setIsExpanded(!isExpanded);

    const displayedText = isExpanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');

    return (
        <div>
        <p className="description-text">{displayedText}</p>
        {text.length > maxLength && (
            <p className="description-text button" onClick={toggleText}>
            {isExpanded ? 'Collapse' : 'Expand'}
            </p>
        )}
        </div>
    );
};

export default TruncatedText;
