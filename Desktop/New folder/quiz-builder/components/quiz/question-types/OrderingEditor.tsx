// components/quiz/question-types/OrderingEditor.tsx
import React from 'react';

/**
 * Interface representing a single sequence/ordering item.
 */
interface OrderItem {
  id: string;
  text: string;
}

/**
 * Props for the OrderingEditor component.
 */
interface OrderingEditorProps {
  questionData: {
    items?: OrderItem[];
  };
  onChange: (updatedData: { items: OrderItem[] }) => void;
}

export default function OrderingEditor({ questionData, onChange }: OrderingEditorProps) {
  // Fallback default sequence items if none exist yet
  const items = questionData?.items || [
    { id: '1', text: '' },
    { id: '2', text: '' },
  ];

  /**
   * Handles text changes for a specific sequence item ID.
   */
  const handleItemChange = (id: string, text: string) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, text } : item));
    onChange({ items: updatedItems });
  };

  /**
   * Adds a brand new sequence item to the list.
   */
  const handleAddItem = () => {
    const newItem = { id: String(items.length + 1), text: '' };
    onChange({ items: [...items, newItem] });
  };

  /**
   * Removes an existing sequence item by its ID.
   */
  const handleRemoveItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    onChange({ items: updatedItems });
  };

  /**
   * Handles moving an item up or down to reorder the sequence manually.
   */
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Boundary check
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    
    // Swap elements position
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    
    onChange({ items: newItems });
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 border rounded-xl bg-white shadow-sm w-full">
      {/* Section Header */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Ordering / Sequence Settings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Provide items in their <strong>correct sequence</strong>. Students will have to arrange them properly.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-xs sm:text-sm font-medium text-gray-600">Correct Order Sequence</label>
        
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 border sm:border-0 rounded-lg bg-gray-50/50 sm:bg-transparent"
          >
            <div className="flex items-center gap-2 sm:gap-3 w-full">
              {/* Index Badge */}
              <span className="text-xs font-bold bg-gray-100 px-2.5 py-1.5 rounded text-gray-600 text-center min-w-[32px]">
                #{index + 1}
              </span>

              {/* Item Text Input */}
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleItemChange(item.id, e.target.value)}
                placeholder={`Sequence item ${index + 1}`}
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Action Buttons Container (Move Up, Move Down, Remove) */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded transition-colors"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded transition-colors"
                  title="Move Down"
                >
                  ↓
                </button>
              </div>

              {items.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Sequence Item Button */}
      <button
        type="button"
        onClick={handleAddItem}
        className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center"
      >
        + Add Sequence Item
      </button>
    </div>
  );
}